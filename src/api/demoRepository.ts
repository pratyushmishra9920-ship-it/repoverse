import type { RepositoryData } from '../types'

export const DEMO_REPOSITORY: RepositoryData = {
  metadata: {
    name: 'cosmic-atlas',
    owner: 'repoverse-demo',
    url: 'https://github.com/repoverse-demo/cosmic-atlas',
    description: 'An interactive map of the stars, built by a community of curious explorers.',
    stars: 2847,
    forks: 386,
    watchers: 94,
    topics: ['astronomy', 'typescript', 'visualization', 'open-data'],
    homepage: 'https://example.com/cosmic-atlas',
    language: 'TypeScript',
  },
  fileTree: {
    name: 'cosmic-atlas',
    path: '',
    type: 'dir',
    children: [
      {
        name: 'src',
        path: 'src',
        type: 'dir',
        children: [
          {
            name: 'components',
            path: 'src/components',
            type: 'dir',
            children: [
              { name: 'GalaxyMap.tsx', path: 'src/components/GalaxyMap.tsx', type: 'file', size: 8420 },
              { name: 'StarCard.tsx', path: 'src/components/StarCard.tsx', type: 'file', size: 3210 },
            ],
          },
          {
            name: 'data',
            path: 'src/data',
            type: 'dir',
            children: [
              { name: 'catalog.ts', path: 'src/data/catalog.ts', type: 'file', size: 12940 },
            ],
          },
          { name: 'App.tsx', path: 'src/App.tsx', type: 'file', size: 4750 },
          { name: 'main.tsx', path: 'src/main.tsx', type: 'file', size: 580 },
        ],
      },
      {
        name: 'public',
        path: 'public',
        type: 'dir',
        children: [
          { name: 'constellations.json', path: 'public/constellations.json', type: 'file', size: 27600 },
        ],
      },
      { name: 'README.md', path: 'README.md', type: 'file', size: 3912 },
      { name: 'package.json', path: 'package.json', type: 'file', size: 880 },
      { name: 'tsconfig.json', path: 'tsconfig.json', type: 'file', size: 620 },
    ],
  },
  languages: {
    TypeScript: 68420,
    JavaScript: 12600,
    CSS: 9320,
    HTML: 2840,
  },
  contributors: [
    {
      login: 'nova-coder',
      avatarUrl: 'https://avatars.githubusercontent.com/u/583231?v=4',
      contributions: 186,
      profileUrl: 'https://github.com/nova-coder',
    },
    {
      login: 'orbit-builder',
      avatarUrl: 'https://avatars.githubusercontent.com/u/9919?v=4',
      contributions: 112,
      profileUrl: 'https://github.com/orbit-builder',
    },
    {
      login: 'starlight-dev',
      avatarUrl: 'https://avatars.githubusercontent.com/u/810438?v=4',
      contributions: 74,
      profileUrl: 'https://github.com/starlight-dev',
    },
    {
      login: 'cosmic-qa',
      avatarUrl: 'https://avatars.githubusercontent.com/u/129804?v=4',
      contributions: 38,
      profileUrl: 'https://github.com/cosmic-qa',
    },
  ],
  recentCommits: [
    {
      sha: 'a41c9e2',
      message: 'Add spectral filters to the galaxy explorer',
      author: 'Nova Coder',
      date: '10/1/2026',
      url: 'https://github.com/repoverse-demo/cosmic-atlas/commit/a41c9e2',
    },
    {
      sha: '7bd35f1',
      message: 'Improve constellation loading performance',
      author: 'Orbit Builder',
      date: '9/29/2026',
      url: 'https://github.com/repoverse-demo/cosmic-atlas/commit/7bd35f1',
    },
    {
      sha: 'c908aa4',
      message: 'Document public catalog data format',
      author: 'Starlight Dev',
      date: '9/27/2026',
      url: 'https://github.com/repoverse-demo/cosmic-atlas/commit/c908aa4',
    },
    {
      sha: 'e6f2b10',
      message: 'Fix focus handling in star details panel',
      author: 'Cosmic QA',
      date: '9/24/2026',
      url: 'https://github.com/repoverse-demo/cosmic-atlas/commit/e6f2b10',
    },
  ],
}
