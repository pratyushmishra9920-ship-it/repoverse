#!/bin/bash
# Build script for RepoVerse
# This is a reference build script for local development

set -e

echo "🔨 Building RepoVerse..."
echo "Installing dependencies..."
npm install

echo "🔍 Type checking..."
npm run type-check

echo "📦 Building for production..."
npm run build

echo "✅ Build complete! Output is in dist/"
echo "📡 Ready to deploy to Vercel, Netlify, or any static host"
