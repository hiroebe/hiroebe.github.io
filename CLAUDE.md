# CLAUDE.md

## Project overview

Personal blog at hiroebe.net. Built with Astro, deployed to GitHub Pages via GitHub Actions.

## Tech stack

- **Framework**: Astro (static site generation)
- **Content**: Markdown files in `src/content/blog/`
- **Package manager**: pnpm
- **Deployment**: GitHub Actions → GitHub Pages

## Blog post frontmatter schema

```yaml
title: string       # required
description: string  # required
pubDate: YYYY-MM-DD  # required
updatedDate: YYYY-MM-DD  # optional
heroImage: image path    # optional
tags: Tag[]              # optional, defined in src/consts.ts
```

## Custom skills

- `/new-post [title]` — Create a new blog post file from a Japanese title. Translates to an English slug.
- `/gen-description [post-slug]` — Generate description from post content. Omit slug to process all empty ones.
- `/review-post [post-slug]` — Review a post for typos, structure, and proper noun spelling.

## Key conventions

- Blog posts are written in Japanese
- File names (slugs) are in English
- Lang attribute is `ja` on all pages
