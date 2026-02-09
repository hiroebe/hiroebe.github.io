---
name: review-post
description: Review a blog post for typos, structure, and proper nouns
argument-hint: "[post-slug]"
allowed-tools: Read, Glob
---

Review the blog post at `src/content/blog/$ARGUMENTS.md`. The post is written in Japanese.

Check the following and report any issues:

1. **Typos**: Kanji misconversions, typos, okurigana errors, etc.
2. **Overall structure**: Whether the flow of text is natural and paragraph breaks are appropriate
3. **Proper noun spelling**: Whether service/product names use their official spelling (e.g. GitHub, Claude Code, ChatGPT, JavaScript, TypeScript, Astro, VS Code, etc.)

List all issues found with suggested fixes.
