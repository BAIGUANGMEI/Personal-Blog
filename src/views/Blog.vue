<script setup>
import { ref, onMounted } from "vue";
import navigateBar from "../components/navigateBar.vue";
import yaml from "js-yaml";

const posts = ref([]);

onMounted(async () => {
  const res = await fetch(`/posts/blog.yaml?v=${__BUILD_ID__}`, { cache: 'no-store' });
  const yamlText = await res.text();
  const blogdata = yaml.load(yamlText);
  posts.value = blogdata.post;
  
});
</script>

<template>
  <div class="page-container">
    <navigateBar />

    <div class="blog-content">
        <div v-for="post in posts" :key="post.slug" class="blog-post">
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
