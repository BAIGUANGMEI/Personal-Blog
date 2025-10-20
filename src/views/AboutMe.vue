<script setup>
import { onMounted, reactive } from "vue";
import navigateBar from "../components/navigateBar.vue";

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

const gotopage = (url) => {
  if (url) {
    window.open(url, "_blank");
  } else {
    console.error("No URL provided for navigation");
  }
};
</script>

<template>
  <div class="page-container">
    <navigateBar />

    <div class="about-me-content">
      <div class="two-column-container">
        <aside class="left-column">
          <img
            :src="data.myinfo.avatar"
            alt="My Avatar"
            class="avatar-img animated-item"
          />
          <h1
            class="greeting-title animated-item"
            style="animation-delay: 0.2s"
          >
            {{ data.myinfo.greeting }}
            <span class="name">{{ data.myinfo.name }}</span>
          </h1>
          <p class="role-subtitle animated-item" style="animation-delay: 0.3s">
            {{ data.myinfo.role }}
          </p>
          <div class="links animated-item" style="animation-delay: 0.4s">
            <img
              v-for="link in data.myinfo.link"
              :key="link.name"
              class="link-img"
              :src="link.img"
              :alt="link.name"
              @click="gotopage(link.url)"
              :title="link.name"
            />
          </div>
        </aside>

        <main class="right-column">
          <section
            class="profile-section about-section animated-item"
            style="animation-delay: 0.5s"
          >
            <h2 class="section-title">About Me</h2>
            <p class="description-text">{{ data.myinfo.description }}</p>
          </section>

          <section
            class="profile-section skills-section animated-item"
            style="animation-delay: 0.6s"
          >
            <h2 class="section-title">My Skills</h2>
            <div class="skills-list">
              <img
                src="https://www.vectorlogo.zone/logos/python/python-ar21.svg"
                alt="Python Logo"
                class="skill-logo"
              />
              <img
                src="https://www.vectorlogo.zone/logos/javascript/javascript-ar21.svg"
                alt="JavaScript Logo"
                class="skill-logo"
              />
              <img
                src="https://www.vectorlogo.zone/logos/typescriptlang/typescriptlang-ar21.svg"
                alt="TypeScript Logo"
                class="skill-logo"
              />
              <img
                src="https://www.vectorlogo.zone/logos/java/java-ar21.svg"
                alt="Java Logo"
                class="skill-logo"
              />
              <img
                src="https://www.vectorlogo.zone/logos/golang/golang-ar21.svg"
                alt="Go Logo"
                class="skill-logo"
              />
              <img
                src="https://www.vectorlogo.zone/logos/mysql/mysql-ar21.svg"
                alt="MySQL Logo"
                class="skill-logo"
              />
              
            </div>
            <div class="skills-list">
             <img
               src="https://www.vectorlogo.zone/logos/vuejs/vuejs-ar21.svg"
               alt="Vue.js Logo"
               class="skill-logo"
             />
             <img
               src="https://www.vectorlogo.zone/logos/palletsprojects_flask/palletsprojects_flask-ar21.svg"
               alt="Flask Logo"
               class="skill-logo"
             />
             <img
               src="https://www.vectorlogo.zone/logos/git-scm/git-scm-ar21.svg"
               alt="Git Logo"
               class="skill-logo"
             />
            </div>
          </section>

          <section
            class="profile-section contact-section animated-item"
            style="animation-delay: 0.7s"
          >
            <h2 class="section-title">Get in Touch</h2>
            <p class="email-text">
              Personal Email: <a :href="'mailto:meizhihan111@outlook.com'" class="email-link">meizhihan111@outlook.com</a>
              <br />
              University Email: <a :href="'mailto:henry.mei@connect.hku.hk'" class="email-link">henry.mei@connect.hku.hk</a>
            </p>
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
  padding: 60px 40px;
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

.contact-section .email-text {
  font-size: 17px;
  color: #444;
}

.email-link {
  color: #3498db;
  text-decoration: none;
  font-weight: 500;
}

.email-link:hover {
  text-decoration: underline;
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
  .section-title {
    font-size: 24px;
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
