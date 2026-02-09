---
name: new-post
description: Create a new blog post markdown file from a Japanese title
argument-hint: "[title in Japanese]"
allowed-tools: Write, Bash
---

Create a new blog post file at `src/content/blog/` with the following rules:

1. **Filename**: Translate/romanize the Japanese title `$ARGUMENTS` into a concise English slug using lowercase and hyphens. Drop particles and filler words.

2. **Frontmatter**: Use this template with today's date:
   ```
   ---
   title: '$ARGUMENTS'
   description: ''
   pubDate: <today's date in YYYY-MM-DD>
   ---
   ```

3. **Body**: Leave empty (the user will write the content).

4. After creating the file, report the created file path.
