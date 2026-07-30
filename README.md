# Portfolio Template — a hand-finished developer portfolio you can fork

A polished, animated single-page portfolio built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS** — designed to be forked. All of the content lives in **one config file**, so you can make it yours without touching a single component.

Fork it, edit `src/config/portfolio.ts`, drop in your logo + résumé, set your GitHub username, and deploy.

> **Take the tour.** Run the app and click the **“Customize”** button (bottom-right). A guided walkthrough spotlights every section and tells you exactly which config key controls it. It also runs automatically the first time the site loads.

---

## ✨ What you get

- **Scroll-through hero** — an animated terminal (`git log`), an architecture diagram, and a peer quote, next to your name + pitch.
- **Selected Work** — project rows with a story, tags, a repo link, and a decorative code/CLI/metrics demo.
- **Essays gallery** — a rotated, hand-pinned card grid for your writing.
- **Peer Signal** — testimonials plus a **live GitHub contribution heatmap** and stats.
- **Newsletter / CTA** — a closing call-to-action (demo form, ready to wire up).
- **In-app tour** — onboarding overlay that documents what to change (great for forkers).

---

## 🚀 Quick start

1. **Fork** this repo on GitHub (top-right), then clone your fork:
   ```bash
   git clone https://github.com/<you>/<your-fork>.git
   cd <your-fork>
   ```
2. **Install & run:**
   ```bash
   npm install
   npm run dev
   ```
3. Open **[http://localhost:4028](http://localhost:4028)** and click **“Customize”** to take the tour.

---

## 🎯 Make it yours — one file

Open **[`src/config/portfolio.ts`](src/config/portfolio.ts)**. Every visible string, link, and list is here, grouped and commented. Edit the values; the components read from them automatically.

| Section on the page      | Config key(s)                                   |
| ------------------------ | ----------------------------------------------- |
| Browser tab & SEO        | `site` (`brand`, `title`, `description`, `logo`) |
| Name, role, bio, skills  | `person`                                        |
| Social links + GitHub    | `social` (`githubUsername` powers the heatmap)  |
| Hero animation content   | `hero` (`terminalCommits`, `diagram`, `quote`)  |
| Selected Work rows        | `projects[]`                                    |
| Essays gallery           | `essays[]`, `essaysMeta`                         |
| Testimonials             | `testimonials[]`                                |
| Newsletter / closing CTA | `newsletter`                                    |
| Header & footer links    | `nav`                                           |

### Replace the assets

Drop your own files into `public/assets/` and point the config at them:

- **Logo / favicon** → `public/assets/images/app_logo.png` (referenced by `site.logo`)
- **Résumé** → `public/assets/resume/resume.pdf` (referenced by `person.resumeUrl`)
- **Favicons** → `public/assets/favicon/` (optional; regenerate at [realfavicongenerator.net](https://realfavicongenerator.net))

### Live GitHub stats

Set `social.githubUsername` and the **Peer Signal** section fetches your real contribution graph, repo count, stars, followers, and location. The public GitHub API is rate-limited to 60 requests/hour — add a token to raise it to 5,000:

```bash
cp .env.example .env.local
# then set GITHUB_TOKEN in .env.local (a classic PAT with no scopes is enough for public data)
```

### Removing a section

Don’t write essays? Delete `<EssayGallery />` from [`src/app/home/page.tsx`](src/app/home/page.tsx). The same works for any section (`<PeerSignal />`, `<WaitlistSection />`, etc.). To hide the header CTA or the newsletter’s “star the repo” button, set their label / URL to `''` in the config.

### The newsletter form

`WaitlistSection.tsx` ships a **demo** form with no backend — it just animates. Wire the `handleSubmit` function to your provider (Buttondown, ConvertKit, Resend, a serverless route, …), or repurpose the section as a plain contact CTA.

---

## 🧭 The in-app tour

The **“Customize”** button (and the first-visit auto-run) is powered by [`src/components/tour/AppTour.tsx`](src/components/tour/AppTour.tsx). It’s dependency-free and reads a `STEPS` array — edit that array to change the walkthrough, or remove `<AppTour />` from `page.tsx` before you ship to your own audience.

Sections are targeted via `data-tour="…"` attributes already placed on each component.

---

## 📦 Scripts

| Command             | What it does                          |
| ------------------- | ------------------------------------- |
| `npm run dev`       | Dev server on port **4028**           |
| `npm run build`     | Production build                      |
| `npm run start`     | Serve the production build            |
| `npm run lint`      | Lint with ESLint                      |
| `npm run format`    | Format with Prettier                  |
| `npm run type-check`| TypeScript check (`tsc --noEmit`)     |

---

## 📱 Deploy

Works anywhere Next.js runs:

- **Vercel** — import the repo, accept defaults, deploy. Add `GITHUB_TOKEN` under *Settings → Environment Variables* (optional).
- **Netlify** — this repo already includes `@netlify/plugin-nextjs`; connect the repo and deploy.

---

## 🛠 Tech stack

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS 3 · JetBrains Mono / Fraunces / DM Sans.

---

## 📄 License

[MIT](LICENSE) — fork it, ship it, make it yours. Attribution appreciated but not required.
