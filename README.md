# 🌌 RepoVerse

**Turn any GitHub repository into a living interactive universe.**

Built during **OSEN Lucknow: GitHub Copilot Dev Days** on October 1, 2026, using **GitHub Copilot** for AI-assisted planning, implementation, debugging, and iteration.

🔗 **Live Demo:** https://repoverse-kappa.vercel.app

---

## 🚀 About

RepoVerse transforms any public GitHub repository into an interactive visual experience.

Enter a GitHub repository URL and explore its **files, directories, languages, contributors, commits, repository statistics, and activity** through a futuristic interface.

The project was built as a hands-on demonstration of **AI-assisted software development with GitHub Copilot** during OSEN Lucknow: Copilot Dev Days.

---

## ✨ Features

* **Repository Metadata** — View stars, forks, watchers, description, and key statistics
* **Interactive File Explorer** — Explore repository directories and files
* **Language Statistics** — Visual breakdown of programming languages
* **Contributors** — View top contributors and contribution counts
* **Recent Commits** — Explore recent commits with author and date information
* **Interactive Universe UI** — Transform repository data into a visual experience
* **Demo Data Fallback** — Remains usable when the GitHub API rate limit is reached
* **Retry GitHub API** — Retry live GitHub data when the API becomes available
* **Responsive Design** — Works across desktop and mobile screens
* **Accessibility** — Keyboard navigation and reduced-motion support
* **Error Handling** — Handles invalid repositories, API errors, and rate limits gracefully

---

## 🔧 How It Works

1. Enter any public GitHub repository URL.
2. RepoVerse parses the repository information.
3. It fetches repository data using the **GitHub REST API**.
4. The data is processed and displayed through the RepoVerse interface.
5. Explore repository structure, languages, contributors, commits, and statistics.
6. When GitHub's API rate limit is reached, RepoVerse automatically switches to clearly labelled **Demo Data** so the experience remains usable.

---

## 📡 GitHub API

RepoVerse currently uses the public GitHub REST API.

* **Public repositories:** Supported
* **Authentication:** Not required for normal usage
* **Unauthenticated rate limit:** 60 requests/hour
* **Rate-limit fallback:** Built-in demo dataset
* **Retry:** Available after the API becomes available

The application does **not** expose or require a GitHub token.

---

## 🌐 Deployment

### Vercel

RepoVerse is deployed on **Vercel**.

**Live Demo:**
https://repoverse-kappa.vercel.app

To deploy your own instance:

1. Fork or clone the repository.
2. Install dependencies.
3. Build the project.
4. Connect the repository to Vercel.
5. Deploy.

Vercel automatically detects the Vite application.

---

## 🛠️ Tech Stack

* **React 18** — UI framework
* **TypeScript** — Type-safe development
* **Vite** — Development server and build tool
* **CSS Modules** — Scoped styling
* **GitHub REST API** — Repository data source
* **Vercel** — Deployment platform
* **GitHub Copilot** — AI-assisted development

---

## 🤖 Built with GitHub Copilot

RepoVerse was developed during **OSEN Lucknow: GitHub Copilot Dev Days** using GitHub Copilot as an AI development partner.

Copilot was used for:

* Project planning and architecture
* React/TypeScript implementation
* GitHub API integration
* UI development
* Error handling
* Debugging and build fixes
* Rate-limit fallback implementation
* Type checking and production build verification

The development workflow included **planning → implementation → testing → debugging → GitHub → Vercel deployment**.

---

## 🎨 UI/UX

* Futuristic dark interface
* Responsive design
* Smooth animations and transitions
* Reduced-motion support
* Keyboard-friendly navigation
* Mobile-friendly layout
* Clear loading and error states

---

## 💻 Local Development

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development server

```bash
npm run dev
```

The application will be available at:

```text
http://localhost:3000
```

### 3. Type check

```bash
npm run type-check
```

### 4. Build for production

```bash
npm run build
```

---

## 🐛 Troubleshooting

### Repository not found

Check that:

* The GitHub URL is correct.
* The repository is public.
* The repository still exists.

### GitHub API rate limit exceeded

RepoVerse automatically switches to **Demo Data** so the visualization remains available.

Use **Retry GitHub API** to attempt loading the live repository data again.

### API error

The GitHub API may be temporarily unavailable. Retry the request later.

---

## 📁 Project Structure

```text
repoverse/
├── src/
├── public/
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json
└── README.md
```

---

## 🏆 Event

### OSEN Lucknow — GitHub Copilot Dev Days

**Date:** October 1, 2026
**Project:** RepoVerse
**Built with:** GitHub Copilot
**Deployment:** Vercel

RepoVerse was created as a hands-on project during the **OSEN Lucknow: Copilot Dev Days** event to demonstrate how GitHub Copilot can assist with building, testing, debugging, and deploying a real-world application.
