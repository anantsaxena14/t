// export async function getGithubContributions(username: string) {
//   const res = await fetch(
//     `https://github-contributions-api.jogruber.de/v4/${username}?y=last`,
//     { next: { revalidate: 3600 } }
//   );

//   if (!res.ok) throw new Error(`Failed to fetch contributions for "${username}"`);

//   const json = await res.json();

//   const days: { date: string; count: number }[] = json.contributions.map(
//     (d: any) => ({ date: d.date, count: d.count })
//   );

//   return {
//     total: json.total.lastYear as number,
//     days,
//   };
// }

export interface GithubStats {
  // Contributions
  total: number;
  days: { date: string; count: number }[];

  // Profile
  name: string;
  avatarUrl: string;
  bio: string;
  location: string;
  profileUrl: string;

  // Counts
  publicRepos: number;
  followers: number;
  following: number;

  // Aggregated repo stats (across all public repos)
  totalStars: number;
  totalForks: number;
  totalWatchers: number;

  // Top repos by stars
  topRepos: {
    name: string;
    description: string | null;
    stars: number;
    forks: number;
    language: string | null;
    url: string;
  }[];

  // Languages used across repos (sorted by repo count)
  topLanguages: { language: string; count: number }[];
}

export async function getGithubContributions(username: string): Promise<GithubStats> {
  const HEADERS = {
    Accept: "application/vnd.github+json",
    // Add token if available — raises rate limit from 60 to 5000 req/hr
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
  };

  // Run all fetches in parallel
  const [contribRes, profileRes, reposRes] = await Promise.all([
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
      next: { revalidate: 3600 },
    }),
    fetch(`https://api.github.com/users/${username}`, {
      headers: HEADERS,
      next: { revalidate: 3600 },
    }),
    // Fetch up to 100 repos sorted by stars to get meaningful aggregates
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
      headers: HEADERS,
      next: { revalidate: 3600 },
    }),
  ]);

  if (!contribRes.ok)
    throw new Error(`Contributions API failed for "${username}": ${contribRes.status}`);
  if (!profileRes.ok)
    throw new Error(`GitHub profile not found for "${username}": ${profileRes.status}`);
  if (!reposRes.ok)
    throw new Error(`GitHub repos fetch failed for "${username}": ${reposRes.status}`);

  const [contribJson, profile, repos] = await Promise.all([
    contribRes.json(),
    profileRes.json(),
    reposRes.json(),
  ]);

  // ── Contributions ──────────────────────────────────────────────────────────
  const days: { date: string; count: number }[] = contribJson.contributions.map(
    (d: any) => ({ date: d.date, count: d.count })
  );

  // ── Repo aggregates ────────────────────────────────────────────────────────
  // Exclude forks so stats reflect original work
  const ownRepos: any[] = repos.filter((r: any) => !r.fork);

  const totalStars = ownRepos.reduce((sum: number, r: any) => sum + r.stargazers_count, 0);
  const totalForks = ownRepos.reduce((sum: number, r: any) => sum + r.forks_count, 0);
  const totalWatchers = ownRepos.reduce((sum: number, r: any) => sum + r.watchers_count, 0);

  const topRepos = [...ownRepos]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, 6)
    .map((r: any) => ({
      name: r.name,
      description: r.description ?? null,
      stars: r.stargazers_count,
      forks: r.forks_count,
      language: r.language ?? null,
      url: r.html_url,
    }));

  // Language frequency across own repos
  const langCounts: Record<string, number> = {};
  for (const r of ownRepos) {
    if (r.language) langCounts[r.language] = (langCounts[r.language] ?? 0) + 1;
  }
  const topLanguages = Object.entries(langCounts)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6)
    .map(([language, count]) => ({ language, count }));
 
  return {
    total: contribJson.total.lastYear as number,
    days,

    name: profile.name ?? username,
    avatarUrl: profile.avatar_url,
    bio: profile.bio ?? "",
    location: profile.location ?? "",
    profileUrl: profile.html_url,

    publicRepos: profile.public_repos,
    followers: profile.followers,
    following: profile.following,

    totalStars,
    totalForks,
    totalWatchers,

    topRepos,
    topLanguages,
  };
}
