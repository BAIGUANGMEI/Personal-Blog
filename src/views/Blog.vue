<script setup>
import { ref, onMounted, computed } from "vue";
import navigateBar from "../components/navigateBar.vue";
import yaml from "js-yaml";

const posts = ref([]);
const query = ref("");
const filteredPosts = computed(() => {
  const q = query.value.trim().toLowerCase();
  if (!q) return posts.value;
  return (posts.value || []).filter(post => {
    const title = String(post.title || "").toLowerCase();
    const summary = String(post.summary || "").toLowerCase();
    const slug = String(post.slug || "").toLowerCase();
    const date = String(post.date || "").toLowerCase();
    const tags = Array.isArray(post.tags) ? post.tags.map(t => String(t).toLowerCase()) : [];
    return (
      title.includes(q) ||
      summary.includes(q) ||
      slug.includes(q) ||
      date.includes(q) ||
      tags.some(t => t.includes(q))
    );
  });
});
const clearSearch = () => { query.value = ""; };

/** Tag color class mapping（与 AboutMe 统一） */
const mapTagClass = (tag) => {
  const t = String(tag || "").toLowerCase();
  if (["tech"].includes(t)) return "tag-tech";
  if (["vue"].includes(t)) return "tag-vue";
  if (["nginx"].includes(t)) return "tag-nginx";
  if (["statistics"].includes(t)) return "tag-statistics";
  if (["travel"].includes(t)) return "tag-travel";
  if (["photo"].includes(t)) return "tag-photo";
  if (["academic"].includes(t)) return "tag-academic";
  return "tag-default";
};

/** 估算阅读时长（按 200 wpm） */
const estimateReadingMinutes = (text) => {
  const words = String(text || "")
    .replace(/[$\\`*#_~<>\-]+/g, " ")
    .replace(/[\r\n]+/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const wpm = 200;
  return Math.max(1, Math.round(words / wpm));
};

onMounted(async () => {
  const res = await fetch(`/posts/blog.yaml?v=${__BUILD_ID__}`, { cache: 'no-store' });
  const yamlText = await res.text();
  const blogdata = yaml.load(yamlText) || {};
  posts.value = Array.isArray(blogdata.post) ? blogdata.post : [];
  // 计算所有文章的阅读时长
  await Promise.all((posts.value || []).map(async (p) => {
    try {
      const file = p.file || `${p.slug}.md`;
      const r = await fetch(`/posts/${file}?v=${__BUILD_ID__}`, { cache: 'no-store' });
      const t = await r.text();
      p.readingTime = estimateReadingMinutes(t);
    } catch {}
  }));
  
});
</script>

<template>
  <div class="page-container">
    <navigateBar />

    <div class="blog-search">
      <input
        class="search-input"
        type="text"
        v-model="query"
        placeholder="Search posts by title, summary or tags..."
      />
      <button v-if="query" class="clear-btn" @click="clearSearch">Clear</button>
    </div>

    <div class="blog-content">
        <div v-if="filteredPosts.length === 0" class="empty-hint">No articles found. </div>
        <div v-for="post in filteredPosts" :key="post.slug" class="blog-post">
            <h2 class="blog-title">{{ post.title }}</h2>
            <p class="blog-summary">{{ post.summary }}</p>

            <router-link class="read-more" :to="`/blog/${post.slug}`">
                Read More →
            </router-link>

            <div class="blog-meta">
                <span class="blog-date">{{ post.date }}</span>
                <span v-if="post.readingTime" class="blog-readtime">· ~{{ post.readingTime }} min read</span>
                <div v-if="post.tags && post.tags.length > 0" class="blog-tags">
                  <span v-for="tag in post.tags" :key="tag" class="blog-tag" :class="mapTagClass(tag)">
                      {{ tag }}
                  </span>
                </div>
            </div>
        </div>
    </div>
  </div>

  <div class="footer">
    <span class="footer-content">
      © 2025 Mei Zhihan. All rights reserved.
      <a
        class="ICP"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener"
        >浙ICP备2025170599号</a
      >
    </span>
  </div>
</template>

<style scoped>
.page-container {
  margin-top: 100px;
  width: 100%;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.blog-search {
  padding: 0 20px;
  max-width: 900px;
  width: 100%;
  display: flex;
  align-items: center;
  gap: 10px;
}
.search-input {
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  font-size: 14px;
  outline: none;
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}
.search-input:focus {
  border-color: #93c5fd;
  box-shadow: 0 0 0 4px rgba(147, 197, 253, 0.25);
}
.clear-btn {
  padding: 8px 12px;
  font-size: 13px;
  border: 1px solid #d7e3f2;
  border-radius: 8px;
  background: #fff;
  color: #0f172a;
  cursor: pointer;
  transition: all 0.2s ease;
}
.clear-btn:hover {
  background: #f8fafc;
  transform: translateY(-1px);
}
.empty-hint {
  padding: 0 20px;
  max-width: 900px;
  width: 100%;
  color: #64748b;
  font-size: 14px;
}

.blog-content {
  padding: 20px;
  max-width: 900px;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 24px;
  animation: fadeInUp 0.8s ease forwards;
}

.blog-post {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-post:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.blog-title {
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 12px;
  color: #333;
  transition: color 0.2s;
}

.blog-title:hover {
  color: #3498db;
}


.blog-summary {
  font-size: 1rem;
  color: #555;
  margin-bottom: 16px;
  line-height: 1.6;
}

.read-more {
  display: inline-block;
  padding: 8px 16px;
  font-size: 0.95rem;
  font-weight: 500;
  color: #fff;
  background: #3498db;
  border-radius: 6px;
  text-decoration: none;
  transition: background 0.2s;
}

.read-more:hover {
  background: #005b96;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 14px;
  flex-wrap: wrap;
}

.blog-date {
  font-size: 0.85rem;
  color: #777;
  display: flex;
  align-items: center;
}

.blog-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.blog-tag {
  display: inline-block;
  padding: 4px 10px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid transparent;
}

/* Tag color mapping（统一 AboutMe） */
.blog-tag.tag-tech {
  color: #2563eb;
  background: #ecf2ff;
  border-color: #dbe7ff;
}
.blog-tag.tag-vue {
  color: #16a34a;
  background: #eaf9f0;
  border-color: #cdeeda;
}
.blog-tag.tag-nginx {
  color: #059669;
  background: #eafaf5;
  border-color: #cdeee3;
}
.blog-tag.tag-statistics {
  color: #7c3aed;
  background: #efe7ff;
  border-color: #e2d9ff;
}
.blog-tag.tag-travel {
  color: #f97316;
  background: #fff3e8;
  border-color: #fde3cd;
}
.blog-tag.tag-photo {
  color: #dc2626;
  background: #fde2e2;
  border-color: #f9caca;
}
.blog-tag.tag-academic {
  color: #0ea5e9;
  background: #e6f6ff;
  border-color: #cdeeff;
}
.blog-tag.tag-default {
  color: #475569;
  background: #f1f5f9;
  border-color: #e2e8f0;
}

.blog-readtime {
  font-size: 0.85rem;
  color: #6b7280;
}


.footer {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e0e0e0;
  background-color: #fff;
}

.footer-content {
  font-size: 14px;
  color: #737373;
}

.ICP {
  color: #737373;
  text-decoration: none;
  margin-left: 10px;
}

.ICP:hover {
  text-decoration: underline;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 响应式优化 */
@media screen and (max-width: 992px) {
  .page-container {
    min-height: calc(100vh - 60px);
    margin-top: 60px;
  }

  .blog-search{
    padding: 30px 20px 0 20px;
  }
}

@media screen and (max-width: 480px) {
  .blog-title {
    font-size: 1.3rem;
  }
  .blog-summary {
    font-size: 0.9rem;
  }
  .read-more {
    font-size: 0.85rem;
    padding: 6px 12px;
  }
  .footer-content {
    font-size: 12px;
    text-align: center;
    padding: 0 10px;
  }
  .ICP {
    display: block;
    margin-left: 0;
    margin-top: 5px;
  }
}
</style>
