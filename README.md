# MEIZHIHAN Personal Blog Website

A personal Blog Website built with Vue 3 and Vite. It includes pages for About Me, Blog, Blog Details, Timeline, and Bulletin Board. The site supports blog search, Markdown rendering with code highlighting, mobile navigation.

You can visit it at [www.peakfound.com](https://www.peakfound.com/).

**Based on this project, you can build your own personal blog website with simple modifications.**

## Features
- Top navigation bar with responsive desktop/mobile menu
- Blog list with fuzzy search (title, summary, tags, date, slug)
- Blog detail page: Markdown rendering + highlight.js code highlighting + copy buttons
- Blog metadata managed via `public/posts/blog.yaml` driving static Markdown posts

## Build Your Own Website by this Repository
1. Clone this repository:
   ```bash
   git clone https://github.com/BAIGUANGMEI/Personal-Blog.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
   - Open: `http://localhost:5174/`

4. Change the information in each file to fit your own website.
    - `public/index.html`: Change the title, description, and social media links.
    - `src/views/AboutMe.vue`: Change the introduction, contact information, and social media links.
    - `src/views/TimeLine.vue`: Change the timeline events to fit your own timeline.
    - `src/views/BulletinBoard.vue`: Change the API endpoint to fit your backend.
    - `public/posts/blog.yaml`: Change the blog metadata to fit your own blog posts.
    - `public/posts/`: Add your own blog Markdown files, filename must match `slug`.

## Blog Content Management
- Metadata file: `public/posts/blog.yaml`
  - Example:
    ```yaml
    post:
      - slug: "vuedeployment"
        title: "Deploying a Vue Project"
        date: August 20, 2025
        tags: ["Tech","Vue","Nginx"]
        summary: "A guide on how to deploy a Vue.js project with Nginx."
    ```
- Markdown files: placed under `public/posts/`, filename must match `slug`, e.g.:
  - `slug: vuedeployment` → `public/posts/vuedeployment.md`
- Details page load path: `/posts/${slug}.md` (see `src/views/BlogPreview.vue`)

## Markdown & Code Highlighting
- Uses `markdown-it` to render Markdown; `highlight.js` for code highlighting
- Registered languages include `bash` and `nginx`; add more in `BlogPreview.vue` if needed
- Copy-to-clipboard button appears on code blocks