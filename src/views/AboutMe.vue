<script setup>
import { ref, onMounted, reactive } from "vue";
import navigateBar from "../components/navigateBar.vue";
import yaml from "js-yaml";
import { useRouter } from "vue-router";

import avatarImg from "../assets/images/avatar.jpg";

const data = reactive({
  myinfo: {
    name: "Mei Zhihan",
    avatar: avatarImg,
    greeting: "Hi There! I'm",
    role: "Bachelor in HDU | Master in HKU",
    link: [
      {
        name: "GitHub",
        img: "/github.svg",
        url: "https://github.com/BAIGUANGMEI",
      },
      {
        name: "Instagram",
        img: "/ins.svg",
        url: "https://www.instagram.com/",
      },
    ],
    description:
      "My name is Mei Zhihan, just graduated from Hangzhou Dianzi University. I majored in Information Management and Information System. I am passionate about web development and have experience in both front-end and back-end technologies.\n\n I am going to pursue my master's degree in Electronic Commerce and Internet Computing at The University of Hong Kong, where I aim to deepen my knowledge and skills in software development and data science.\n\n Warmly welcome to connect with me on GitHub or Instagram!",
  },
});

const posts = ref([]);

onMounted(async () => {
  try {
    const res = await fetch(`/posts/blog.yaml?v=${__BUILD_ID__}`, { cache: 'no-store' });
    const yamlText = await res.text();
    const blogdata = yaml.load(yamlText) || {};
    const arr = Array.isArray(blogdata.post) ? blogdata.post : [];
    posts.value = arr.slice().sort((a, b) => new Date(b.date) - new Date(a.date));
  } catch (e) {
    console.error('Failed to load blog.yaml', e);
    posts.value = [];
  }
});

const copied = ref(null);
const copyEmail = async (email, id) => {
  try {
    await navigator.clipboard.writeText(email);
    copied.value = id;
    setTimeout(() => { copied.value = null; }, 1500);
  } catch (e) {
    console.error('Failed to copy email:', e);
  }
};

const gotopage = (url) => {
  if (url) {
    window.open(url, "_blank");
  } else {
    console.error("No URL provided for navigation");
  }
};

const router = useRouter();
const gotoPost = (slug) => {
  if (slug) router.push(`/blog/${slug}`);
};

/** Tag color class mapping for preview cards */
const mapTagClass = (tag) => {
  const t = String(tag || "").toLowerCase();
  if (t === "tech") return "tag-tech";
  if (t === "vue") return "tag-vue";
  if (t === "nginx") return "tag-nginx";
  return "tag-default";
};
</script>

<template>
  <div class="page-container">
    <navigateBar />

    <div class="about-me-content">
      <div class="two-column-container">


        <main class="right-column">


          <!-- Hero section -->
          <section class="hero animated-item" style="animation-delay: 0.2s">
            <img class="avatar-img" :src="data.myinfo.avatar" alt="Mei Zhihan Avatar" />
            <h1 class="hero-title">MEIZHIHAN</h1>
            <p class="hero-subtitle">“Keep silence before you succeed”</p>
            <div class="hero-socials">
              <a href="https://github.com/BAIGUANGMEI" target="_blank" rel="noopener" aria-label="GitHub">
                <img src="/github.svg" alt="GitHub" class="hero-social-img" />
              </a>
              <a href="https://x.com/meizhihan111" target="_blank" rel="noopener" aria-label="X">
                <img src="/x.svg" alt="X" class="hero-social-img" />
              </a>
              <a href="https://www.linkedin.com/in/zhihan-mei-599008374/" target="_blank" rel="noopener" aria-label="LinkedIn">
                <img src="/linkedin.svg" alt="LinkedIn" class="hero-social-img" />
              </a>
            </div>
          </section>

          <!-- Blog preview section on homepage -->
          <section
            class="profile-section blog-preview-section animated-item"
            style="animation-delay: 0.6s"
          >
            <h2 class="section-title">Latest Blog</h2>
            <div class="blog-grid">
              <div
                v-for="post in posts.slice(0,3)"
                :key="post.slug"
                class="blog-item animated-item"
                role="button"
                tabindex="0"
                @click="gotoPost(post.slug)"
                @keydown.enter="gotoPost(post.slug)"
              >
                <h3 class="blog-title">{{ post.title }}</h3>
                <p class="blog-summary">{{ post.summary }}</p>

                <div class="blog-bottom">
                  <div class="blog-meta">
                    <span class="blog-date">{{ post.date }}</span>
                    <div v-if="post.tags && post.tags.length > 0" class="blog-tags">
                      <span v-for="tag in post.tags" :key="tag" class="blog-tag" :class="mapTagClass(tag)">
                        {{ tag }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <router-link to="/blog" class="view-all-link">View All Blog →</router-link>
          </section>

          <section
            class="profile-section contact-section animated-item"
            style="animation-delay: 0.7s"
          >
            <h2 class="section-title">Get in Touch</h2>
            <div class="contact-list">
              <div class="contact-item">
                <div class="contact-label">Personal Email</div>
                <a :href="'mailto:meizhihan111@outlook.com'" class="contact-value">meizhihan111@outlook.com</a>
                <div class="contact-actions">
                  <button class="btn outline sm" @click="copyEmail('meizhihan111@outlook.com','personal')" :class="{ success: copied==='personal' }">{{ copied==='personal' ? 'Copied' : 'Copy' }}</button>
                  <a :href="'mailto:meizhihan111@outlook.com'" class="btn primary sm">Send a Email</a>
                </div>
              </div>
              <div class="contact-item">
                <div class="contact-label">University Email</div>
                <a :href="'mailto:henry.mei@connect.hku.hk'" class="contact-value">henry.mei@connect.hku.hk</a>
                <div class="contact-actions">
                  <button class="btn outline sm" @click="copyEmail('henry.mei@connect.hku.hk','university')" :class="{ success: copied==='university' }">{{ copied==='university' ? 'Copied' : 'Copy' }}</button>
                  <a :href="'mailto:henry.mei@connect.hku.hk'" class="btn primary sm">Send a Email</a>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  </div>
  <div class="footer">
    <span class="footer-content"
      >© 2025 Mei Zhihan. All rights reserved.
      <a
        class="ICP"
        href="https://beian.miit.gov.cn/"
        target="_blank"
        rel="noopener"
        >浙ICP备2025170599号</a
      ></span
    >
  </div>
</template>

<style scoped>
.page-container {
  margin-top: 100px;
  width: 100%;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
}

.about-me-content {
  flex-grow: 1;
  padding: 40px 40px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
}

.two-column-container {
  display: flex;
  gap: 50px; 
}

.left-column {
  flex: 0 0 300px; 
  display: flex;
  flex-direction: column;
  align-items: center; 
  text-align: center;
}

.right-column {
  flex: 1; 
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.avatar-img {
  width: 180px; 
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #eee;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px; 
}

.greeting-title {
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 8px;
}

.name {
  color: #3498db;
}

.role-subtitle {
  font-size: 18px;
  color: #555;
  margin-bottom: 20px;
}

.links {
  display: flex;
  align-items: center;
  gap: 20px; /* Increased gap for better spacing */
}

.link-img {
  width: 40px; /* Slightly larger icons */
  height: 40px;
  cursor: pointer;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.link-img:hover {
  transform: scale(1.15);
  opacity: 0.7;
}

.section-title {
  font-size: 28px;
  font-weight: bold;
  margin-bottom: 20px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee;
  color: #333;
}

.description-text {
  font-size: 17px;
  line-height: 1.75;
  color: #444;
  white-space: pre-line;
}

.skills-section .skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}


.skill-logo {
  height: 48px;
}

/* Hero styles */
.hero {
  position: relative;
  background: linear-gradient(135deg, #f7fbff 0%, #eaf3ff 100%);
  border: 1px solid #e5eef8;
  border-radius: 16px;
  padding: 28px 24px;
  text-align: center;
  margin-bottom: 22px;
  box-shadow: 0 8px 24px rgba(17, 24, 39, 0.06);
  overflow: hidden;
}
.hero::after {
  content: "";
  position: absolute;
  inset: -40% -10% auto auto;
  width: 280px;
  height: 280px;
  background: radial-gradient(45% 45% at 50% 50%, rgba(52,152,219,0.20) 0%, rgba(52,152,219,0) 60%);
  filter: blur(40px);
  pointer-events: none;
}
.hero .avatar-img {
  width: 120px;
  height: 120px;
  border-radius: 50%;
  object-fit: cover;
  border: 3px solid #fff;
  outline: 3px solid #e5eef8;
  box-shadow: 0 10px 22px rgba(0,0,0,0.08);
  margin-bottom: 12px;
}
.hero-title {
  font-size: 32px;
  font-weight: 800;
  letter-spacing: .5px;
  background: linear-gradient(90deg, #0f172a 0%, #334155 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.hero-subtitle {
  font-size: 16px;
  color: #556;
  margin: 8px 0 14px;
}
.hero-actions {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}
.hero-socials {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 12px;
}
.hero-social-img {
  width: 28px;
  height: 28px;
  border-radius: 6px;
  transition: transform .2s ease, box-shadow .2s ease;
}
.hero-socials a:hover .hero-social-img {
  transform: translateY(-1px) scale(1.05);
  box-shadow: 0 8px 20px rgba(0,0,0,0.08);
}
.btn {
  display: inline-block;
  padding: 8px 14px;
  border-radius: 8px;
  font-weight: 600;
  font-size: 14px;
  text-decoration: none;
  transition: all .2s ease;
}
.btn.primary {
  color: #fff;
  background: #3498db;
  box-shadow: 0 6px 16px rgba(52,152,219,0.25);
}
.btn.outline {
  color: #246;
  background: #fff;
  border: 1px solid #d7e3f2;
}
.btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 10px 20px rgba(0,0,0,0.06);
}

/* Blog preview styles */
.blog-preview-section .blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.blog-item {
  position: relative;
  display: flex;
  flex-direction: column;
  background: #fff;
  border: 1px solid #eaeef3;
  border-radius: 12px;
  padding: 16px;
  box-shadow: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease;
}
.blog-item::before {
  content: "";
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 3px;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  background: linear-gradient(90deg, #3498db 0%, #7ab7e6 100%);
  opacity: .0;
  transition: opacity .2s ease;
}
.blog-item:hover {
  border-color: #d8e1ec;
  box-shadow: 0 6px 18px rgba(0,0,0,0.06);
  transform: translateY(-2px);
}
.blog-item:hover::before { opacity: .8; }

.blog-title {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
  color: #0f172a;
}

.blog-summary {
  font-size: 14px;
  color: #475569;
  margin-bottom: 8px;
  line-height: 1.65;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.blog-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-top: auto;
}

.blog-meta {
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
  font-size: 12px;
  color: #64748b;
}

.blog-date {
  font-size: 0.85rem;
  color: #777;
}

.blog-tags {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
}

.blog-tag {
  display: inline-block;
  padding: 4px 10px;
  background: #ecf2f9;
  color: #2563eb;
  border: 1px solid #dbe7f5;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 500;
}

/* 统一使用通用按钮风格 */
.read-more-btn {
  /* 继承 .btn.primary.sm */
  position: relative;
  z-index: 2;
}

/* Tag color mapping */
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
.blog-tag.tag-default {
  color: #475569;
  background: #f1f5f9;
  border-color: #e2e8f0;
}

/* Make whole card clickable but keep inner buttons usable */
.blog-item { cursor: pointer; }
.blog-item:focus-visible {
  outline: 2px solid #93c5fd;
  outline-offset: 2px;
  box-shadow: 0 0 0 4px rgba(147,197,253,0.4);
}

.view-all-link {
  display: inline-block;
  margin-top: 8px;
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.view-all-link:hover {
  text-decoration: underline;
}

.contact-section {
  margin-top: 20px;
  border: 1px solid #e5eef8;
  border-radius: 14px;
  background: linear-gradient(180deg, #f9fbff 0%, #ffffff 100%);
  padding: 18px 16px;
}

.contact-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.contact-item {
  display: grid;
  grid-template-columns: minmax(120px, 150px) 1fr auto;
  align-items: center;
  gap: 12px;
  padding: 8px 10px;
  border-bottom: 1px solid #eef2f7;
}
.contact-item:last-child { border-bottom: none; }

.contact-label { font-weight: 600; color: #334155; }
.contact-value { color: #0066cc; text-decoration: none; font-weight: 500; }
.contact-value:hover { text-decoration: underline; }

.contact-actions { display: flex; gap: 8px; }

.btn.sm { padding: 6px 10px; font-size: 13px; border-radius: 6px; }
.btn.success { color: #fff; background: #22c55e; box-shadow: 0 6px 16px rgba(34,197,94,0.25); }

@media (max-width: 768px) {
  .contact-item { grid-template-columns: 1fr; align-items: flex-start; }
  .contact-actions { margin-top: 6px; }
}

.footer {
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-top: 1px solid #e0e0e0;
  background-color: #f9f9f9;
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

/* Animation */
.animated-item {
  opacity: 0;
  transform: translateY(20px);
  animation: fadeInUp 0.7s ease forwards;
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


@media screen and (max-width: 992px) {

  .page-container {
    margin-top: 60px; 
  }

  .about-me-content {
    padding: 40px 30px;
  }
  .two-column-container {
    gap: 30px;
  }
  .left-column {
    flex: 0 0 250px; 
  }
  .avatar-img {
    width: 150px;
    height: 150px;
  }
  .greeting-title {
    font-size: 28px;
  }
  .role-subtitle {
    font-size: 17px;
  }
  .link-img {
    width: 35px;
    height: 35px;
  }
  .section-title {
    font-size: 26px;
  }
  .description-text,
  .contact-section .email-text{
    font-size: 14px;
  }
}

@media screen and (max-width: 768px) {
  .about-me-content {
    padding: 40px 20px;
  }

  .two-column-container {
    flex-direction: column; 
    align-items: center; 
    gap: 40px;
  }

  .left-column {
    flex-basis: auto; 
    width: 100%; 
    max-width: 400px; 
    align-items: center; 
    text-align: center;
    margin-bottom: 0;
  }

  .right-column {
    width: 100%;
    align-items: stretch;
  }

  .avatar-img {
    width: 130px;
    height: 130px;
    margin-bottom: 20px;
  }

  .greeting-title {
    font-size: 26px;
  }

  .role-subtitle {
    font-size: 16px;
  }

  .hero-title {
    font-size: 26px;
  }

  .hero-subtitle {
    font-size: 14px;
  }

  .section-title {
    font-size: 24px;
  }

  .blog-preview-section .blog-grid {
    grid-template-columns: 1fr;
  }

  .description-text,
  .contact-section .email-text {
    font-size: 15px;
  }

}

@media screen and (max-width: 480px) {
  .about-me-content {
    padding: 30px 15px;
  }
  .greeting-title {
    font-size: 22px;
  }
  .role-subtitle {
    font-size: 15px;
  }
  .link-img {
    width: 30px;
    height: 30px;
    gap: 15px;
  }
  .section-title {
    font-size: 20px;
  }
  .description-text,
  .contact-section .email-text {
    font-size: 14px;
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
