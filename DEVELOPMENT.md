# RepoVerse Development Guide

## Project Structure

```
repoverse/
├── src/
│   ├── components/          # React components
│   │   ├── URLInput.tsx      # Repository URL input form
│   │   ├── RepositoryView.tsx # Main repository display
│   │   ├── FileTree.tsx       # Interactive file tree
│   │   ├── LanguageStats.tsx  # Language visualization
│   │   ├── ContributorsList.tsx # Contributors grid
│   │   ├── CommitsList.tsx    # Recent commits list
│   │   └── ErrorDisplay.tsx   # Error messages
│   ├── api/
│   │   └── github.ts          # GitHub API integration
│   ├── types/
│   │   └── index.ts           # TypeScript types
│   ├── App.tsx                # Main app component
│   ├── main.tsx               # Entry point
│   └── index.css              # Global styles
├── index.html                 # HTML entry point
├── vite.config.ts             # Vite build configuration
├── tsconfig.json              # TypeScript configuration
├── package.json               # Dependencies
├── vercel.json                # Vercel deployment config
├── .gitignore                 # Git ignore rules
└── README.md                  # User documentation
```

## Setup Instructions

### Prerequisites

- **Node.js** 18+ and npm
- **Git**
- Modern web browser

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/pratyushmishra9920-ship-it/repoverse.git
   cd repoverse
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```
   Navigate to `http://localhost:3000`

### Building

**Development build with type checking:**
```bash
npm run type-check
```

**Production build:**
```bash
npm run build
```

Output will be in the `dist/` directory.

**Preview production build locally:**
```bash
npm run preview
```

## Architecture

### Data Flow

```
URLInput (user enters URL)
    ↓
fetchRepositoryData (GitHub API)
    ├→ Metadata (repo info, stats)
    ├→ FileTree (recursive structure)
    ├→ Languages (byte counts)
    ├→ Contributors (top 10)
    └→ RecentCommits (last 10)
    ↓
RepositoryView (display data with tabs)
    ├→ Overview (metadata, summary)
    ├→ Files (interactive tree)
    ├→ Languages (stats visualization)
    ├→ Contributors (avatars, links)
    └→ Commits (timeline view)
```

### API Integration

**Base URL:** `https://api.github.com`

**Endpoints Used:**
- `GET /repos/{owner}/{repo}` - Repository metadata
- `GET /repos/{owner}/{repo}/languages` - Language breakdown
- `GET /repos/{owner}/{repo}/contributors?per_page=10` - Top contributors
- `GET /repos/{owner}/{repo}/commits?per_page=10` - Recent commits
- `GET /repos/{owner}/{repo}/git/trees/{sha}?recursive=0` - File tree structure

**Rate Limits:** 60 requests/hour (unauthenticated)

## Features Implemented

### ✅ Core Functionality
- [x] URL parsing (multiple formats supported)
- [x] Concurrent API requests
- [x] Error handling and messaging
- [x] Rate limit detection
- [x] File tree pagination (1000 items max)

### ✅ UI Components
- [x] Responsive layout (mobile/desktop)
- [x] Dark theme with futuristic styling
- [x] Smooth animations with reduced-motion support
- [x] Keyboard navigation
- [x] Loading states and spinners
- [x] Error messages with icons

### ✅ Data Visualization
- [x] Language breakdown with progress bars
- [x] Contributor cards with avatars
- [x] Commit timeline
- [x] File tree with expand/collapse
- [x] Repository statistics cards

### ✅ Accessibility
- [x] ARIA labels and roles
- [x] Keyboard-navigable UI
- [x] Screen reader support
- [x] High contrast text
- [x] Focus indicators
- [x] Reduced motion preferences

### ✅ Performance
- [x] Concurrent API requests
- [x] Tree depth limiting (3 levels)
- [x] Item count limiting (1000 max)
- [x] CSS module scoping
- [x] Minimal dependencies

### ✅ Deployment
- [x] Vite configuration
- [x] Vercel configuration
- [x] Optimized build output
- [x] Static file serving

## Styling System

### CSS Modules
Each component has its own scoped CSS module preventing style conflicts.

### Color Palette
- **Primary Blue:** `#60a5fa`
- **Purple Accent:** `#a78bfa`
- **Dark Background:** `#0f172a`
- **Text Light:** `#e2e8f0`
- **Text Muted:** `#94a3b8`

### Responsive Breakpoints
- **Desktop:** 1024px+
- **Tablet:** 768px - 1023px
- **Mobile:** Below 768px

## Error Handling

**Error Types:**
1. **INVALID_URL** - URL format validation failed
2. **INVALID_REPO** - Repository doesn't exist
3. **RATE_LIMIT** - GitHub API rate limit exceeded
4. **API_ERROR** - Generic API error
5. **NETWORK_ERROR** - Network request failed

**User Messaging:**
- Clear error descriptions
- Actionable suggestions (e.g., "check the URL")
- Rate limit information with retry timing

## Testing

### Manual Testing Checklist

- [ ] Desktop view (1920px+)
- [ ] Tablet view (768px)
- [ ] Mobile view (375px)
- [ ] URL input validation
- [ ] Loading states
- [ ] Error scenarios
- [ ] File tree expansion
- [ ] Tab navigation
- [ ] External link clicks
- [ ] Keyboard navigation

### Example Repositories for Testing

- `facebook/react` - Large, well-maintained
- `vuejs/vue` - Multiple languages
- `torvalds/linux` - Huge repository
- `github/gitignore` - Documentation repo
- `twitter/bootstrap` - Popular UI library

## Deployment

### Vercel (Recommended)

1. **Connect repository:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New..." → "Project"
   - Select repository
   - Import project

2. **Configure settings:**
   - Framework: Vite
   - Build command: `npm run build`
   - Output directory: `dist`

3. **Deploy:**
   Click deploy. Vercel auto-detects Vite configuration.

### Netlify

1. Connect repository
2. Build command: `npm run build`
3. Publish directory: `dist`
4. Deploy

### Static Host (GitHub Pages, AWS S3, etc.)

```bash
npm run build
# Upload contents of dist/ to your host
```

## Environment Variables

Currently, no environment variables are required. The app uses the public GitHub REST API.

### Future Enhancement (Optional)

To support authenticated requests with higher rate limits:
```bash
VITE_GITHUB_TOKEN=ghp_xxxxx
```

## Performance Optimization

### Current Optimizations
- Concurrent API requests (Promise.all)
- Tree depth limiting (max 3 levels)
- Item count limiting (max 1000 items)
- CSS modules (zero runtime overhead)
- Minimal dependencies
- Vite-optimized build

### Potential Improvements
- Caching with localStorage
- GitHub token support (unauthenticated)
- Virtual scrolling for large lists
- Service worker for offline support
- Image optimization

## Common Issues

**Issue:** "Module not found" error
- **Solution:** Run `npm install` and ensure all dependencies are installed

**Issue:** Build fails with TypeScript errors
- **Solution:** Run `npm run type-check` to see detailed errors

**Issue:** Rate limit exceeded
- **Solution:** Wait 1 hour or fork the project and add a GitHub token

**Issue:** Private repository error
- **Solution:** RepoVerse only supports public repositories

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make changes and test thoroughly
4. Run type-check: `npm run type-check`
5. Commit with clear messages
6. Push and create a Pull Request

## License

MIT - See LICENSE file
