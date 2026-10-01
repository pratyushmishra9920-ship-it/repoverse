# RepoVerse

Turn any GitHub repository into a living interactive universe.

## 🚀 Quick Start

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start dev server:**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`

3. **Build for production:**
   ```bash
   npm run build
   ```

### Type Checking

```bash
npm run type-check
```

## 📋 Features

- **Repository Metadata**: View stars, forks, watchers, and description
- **File Tree Explorer**: Interactive recursive directory and file browser
- **Language Statistics**: Visual breakdown of repository languages
- **Contributors**: Top contributors with contribution counts
- **Recent Commits**: Latest commits with author and date information
- **Responsive Design**: Works seamlessly on desktop and mobile
- **Accessibility**: Full keyboard navigation and screen reader support
- **Performance**: Optimized concurrent API requests with proper error handling

## 🔧 How It Works

1. Enter any public GitHub repository URL (e.g., `owner/repo` or `https://github.com/owner/repo`)
2. RepoVerse fetches data via the public GitHub REST API (no authentication required)
3. Explore the repository's structure, languages, contributors, and recent activity
4. Click on GitHub links to view the original repository

## 📡 API Limits

- **Rate Limit**: 60 requests/hour (unauthenticated)
- **Data Scope**: Public repositories only
- **Concurrent Requests**: Optimized to reduce API calls

## 🌐 Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Connect repository to Vercel at [vercel.com](https://vercel.com)
3. Vercel automatically detects Vite and deploys

**Manual Vercel deployment:**
```bash
npm i -g vercel
vercel
```

### Other Platforms

The build output is in the `dist/` directory and can be deployed to:
- **Netlify**: Upload `dist/` folder
- **GitHub Pages**: Upload `dist/` folder
- **Any static host**: Copy contents of `dist/`

## 🛠️ Tech Stack

- **React 18**: UI framework
- **TypeScript**: Type safety
- **Vite**: Build tool and dev server
- **CSS Modules**: Scoped styling
- **GitHub REST API**: Data source (public endpoints)

## 🎨 UI/UX

- **Responsive**: Mobile-first design
- **Dark Theme**: Eye-friendly futuristic interface
- **Animations**: Smooth transitions with motion-reduced support
- **Accessibility**: WCAG 2.1 compliant with keyboard navigation

## 📝 Configuration

### Environment Variables

No authentication required. The app works with the public GitHub API.

For higher rate limits (unauthenticated: 60/hour):
- Create a GitHub token at [github.com/settings/tokens](https://github.com/settings/tokens)
- The app could be extended to accept tokens in future versions

## 🐛 Troubleshooting

**"Repository not found"**: Check the URL and ensure the repository is public

**"Rate limit exceeded"**: Wait an hour or use a GitHub authentication token

**"API error"**: The GitHub API might be temporarily unavailable

## 📄 License

MIT
