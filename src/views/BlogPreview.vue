<script setup>
import { ref, onMounted, nextTick } from "vue";
import { useRoute } from "vue-router";
import navigateBar from "../components/navigateBar.vue";
import MarkdownIt from "markdown-it";
import hljs from 'highlight.js/lib/core';
import bash from 'highlight.js/lib/languages/bash';
import nginx from 'highlight.js/lib/languages/nginx';
import 'highlight.js/styles/github.min.css'

const route = useRoute();
const md = new MarkdownIt({
  highlight: (str, lang) => {
    hljs.registerLanguage('bash', bash);
    hljs.registerLanguage('nginx', nginx);
    try {
      if (lang && hljs.getLanguage(lang)) {
        const { value } = hljs.highlight(str, { language: lang, ignoreIllegals: true });
        return `<pre class="hljs"><code class="language-${lang}">${value}</code></pre>`;
      }
      const { value, language } = hljs.highlightAuto(str);
      return `<pre class="hljs"><code class="language-${language || 'text'}">${value}</code></pre>`;
    } catch {
      return `<pre class="hljs"><code class="hljs">${md.utils.escapeHtml(str)}</code></pre>`;
    }
  }
});
const content = ref("");

const addCopyButton = () =>{
  const codeBlocks = document.querySelectorAll('pre code');
  codeBlocks.forEach(codeEl => {
    const pre = codeEl.parentElement;
    if (!pre || pre.querySelector('.code-copy-btn')) return;

    pre.style.position = pre.style.position || 'relative';
    const button = document.createElement('button');
    button.className = 'code-copy-btn';
    button.type = 'button';
    button.textContent = 'Copy';
    button.addEventListener('click', async (e) => {
      e.stopPropagation();
      try {
        await navigator.clipboard.writeText(codeEl.textContent || '');
        button.textContent = 'Copied!';
        setTimeout(() => (button.textContent = 'Copy'), 1000);
      } catch {
        button.textContent = 'Failed';
        setTimeout(() => (button.textContent = 'Copy'), 1000);
      }
    });
    pre.appendChild(button);
  });
};

const render = async () => {
  const res = await fetch(`/posts/${route.params.slug}.md?v=${__BUILD_ID__}`, { cache: 'no-store' });
  const text = await res.text();
  content.value = md.render(text);

  await nextTick(() => {
    addCopyButton();
  });
};

onMounted(() => {
  render();
});
</script>

<template>
  <div class="page-container">
    <navigateBar />

    <div class="content">
        <div class="back-button">
            <button type="button" @click="$router.go(-1)">
                Back
            </button>
        </div>
      <div class="prose mx-auto" v-html="content"></div>
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
  </div>
</template>

<style>
.page-container {
  margin-top: 100px;
  width: 100%;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  align-items: center;
}

.content {
  padding: 20px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  animation: fadeInUp 0.5s ease-out 0s 1 normal forwards;
  border: 1px solid #eee;
  border-radius: 8px;
  margin: 20px;
  max-width: 900px;
}

.back-button {
  margin-bottom: 20px;
}

.back-button button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 8px 20px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.back-button button:hover {
  background-color: #005b96;
}

.prose {
  min-height: calc(100vh - 160px);
}

.prose img {
  max-width: 100%;
  height: auto;
}

pre {
  background-color: #f6f8fa;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 12px 16px;
  overflow: auto;
  position: relative;
}

pre code {
  font-size: 14px;
  line-height: 1.5;
}

p code{
  font-size: 14px;
  line-height: 1.5;
  background-color: #f6f8fa;
  border: 1px solid #eee;
  border-radius: 6px;
  padding: 4px 6px;
}

.code-copy-btn {
  position: absolute;
  top: 8px;
  right: 8px;
  padding: 4px 10px;
  font-size: 12px;
  border: 1px solid rgba(0,0,0,.1);
  background: rgba(255,255,255,.9);
  border-radius: 6px;
  cursor: pointer;
  transition: all .2s ease;
}
.code-copy-btn:hover { background: #fff; transform: translateY(-1px); }

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

@media screen and (max-width: 992px) {
  .page-container {
    min-height: calc(100vh - 60px);
    margin-top: 60px;
  }

  .content{
    max-width: calc(100vw - 40px);
  }
}

@media screen and (max-width: 480px) {
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
