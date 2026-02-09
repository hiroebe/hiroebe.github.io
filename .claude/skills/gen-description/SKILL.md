---
name: gen-description
description: Generate a description for a blog post from its content
argument-hint: "[post-slug]"
allowed-tools: Read, Edit, Glob
---

Generate a `description` for a blog post in `src/content/blog/`.

1. If `$ARGUMENTS` is provided, read `src/content/blog/$ARGUMENTS.md`. Otherwise, find all posts with an empty `description: ''` and process each.
2. Read the post content (body below the frontmatter).
3. Write a concise summary in Japanese (1 sentence, under 80 characters) for the `description` field.
4. Update the frontmatter `description` in the file.
