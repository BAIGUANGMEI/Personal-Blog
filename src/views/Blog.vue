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

onMounted(async () => {
  const res = await fetch(`/posts/blog.yaml?v=${__BUILD_ID__}`, { cache: 'no-store' });
  const yamlText = await res.text();
  const blogdata = yaml.load(yamlText) || {};
  posts.value = Array.isArray(blogdata.post) ? blogdata.post : [];
  
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
                <div v-if="post.tags && post.tags.length > 0" class="blog-tags">
                  <span v-for="tag in post.tags" :key="tag" class="blog-tag blog-tag-green">
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
  font-size: 0.9rem;
  color: #ffffff;
  background-color: rgba(92, 92, 92, 0.5);
  padding: 5px 12px;
  border-radius: 8px;
  font-weight: 500;
  transition: all 0.2s ease;
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
