<script setup>
import { ref, onMounted, onUnmounted } from 'vue' // Removed reactive as timeLineData is now ref
import navigateBar from '../components/navigateBar.vue';

import highschoolImg from '../assets/images/highschool.jpg'
import universityImg from '../assets/images/hdu.jpg'
import morganstanleyImg from '../assets/images/MS.jpg'
import supconImg from '../assets/images/supcon.png'
import chinamobileImg from '../assets/images/chinamb.png'
import shihuaImg from '../assets/images/shihua.jpg'
import hkuImg from '../assets/images/hku.jpg'

const currentIndex = ref(0)
const totalTimelineItems = ref(0)
const timeLineLength = ref(13) 

const timeLineData = ref([
  {
    id: 0,
    date: '09.2025',
    img: hkuImg,
    contentTitle: 'The University of Hong Kong',
    content: 'I am currently pursuing my master\'s degree in ECIC at The University of Hong Kong. This program has provided me with a solid foundation in advanced computer science concepts and practical skills.',
  },
  {
    id: 1,
    date: '03.2025',
    img:  morganstanleyImg,
    contentTitle: 'Morgan Stanley',
    content: 'I started my internship at Morgan Stanley as Developer Intern. I am responsible for developing and maintaining internal tools to improve the efficiency of the team.',
  },
  {
    id: 2,
    date: '11.2024',
    img:  supconImg,
    contentTitle: 'SUPCON',
    content: 'It was a great experience to work at SUPCON as a data labeling intern. I was responsible for data annotation and quality control, which helped me to understand the importance of data in machine learning.',
  },
  {
    id: 3,
    date: '08.2024',
    img:  chinamobileImg,
    contentTitle: 'China Mobile',
    content: 'I worked as a front-end intern at China Mobile. I was responsible for developing and maintaining the company\'s internal web applications, which helped me to improve my front-end development skills.',
  },
  {
    id: 4,
    date: '04.2024',
    img: shihuaImg,
    contentTitle: 'Hangzhou Shihua Technology Co., Ltd.',
    content: 'This was my first internship as a front-end intern. I was responsible for developing and maintaining the company\'s internal web applications, which helped me to improve my front-end development skills.',
  },
  {
    id: 5,
    date: '09.2021',
    img: universityImg,
    contentTitle: 'Hangzhou Dianzi University',
    content: 'I started my undergraduate studies at Hangzhou Dianzi University, majoring in Information Management and Information System. I learned the basics of programming and software development during my studies.',
  },
  {
    id: 6,
    date: '09.2018',
    img: highschoolImg,
    contentTitle: 'Wenzhou High School',
    content: 'I attended high school at Wenzhou High School.',
  }
  ])

const checkScreenSize = () => {
  let newTimeLineLength;
  if (window.innerWidth <= 480) {
    newTimeLineLength = 3;
  } else if (window.innerWidth <= 768) {
    newTimeLineLength = 5;
  } else if (window.innerWidth <= 1024) {
    newTimeLineLength = 7;
  } else if (window.innerWidth <= 1280) {
    newTimeLineLength = 9;
  } else if (window.innerWidth <= 1440) {
    newTimeLineLength = 11;
  } else if (window.innerWidth <= 1920) {
    newTimeLineLength = 13;
  } else {
    newTimeLineLength = 15;
  }

  if (timeLineLength.value !== newTimeLineLength) {
    timeLineLength.value = newTimeLineLength;
    initialLocaiton(true); 
  }
}

const initialLocaiton = (isResize = false) => {
  totalTimelineItems.value = timeLineData.value.length;
  const markElement = document.querySelector('.mark');
  const timeLineWrapperElement = document.querySelector('.time-line-wrapper');

  if (!markElement || !timeLineWrapperElement) return;

  timeLineWrapperElement.style.width = `${timeLineLength.value * 140}px`;

  let newCurrentIndex;
  if (totalTimelineItems.value % 2 !== 0){ 
      markElement.style.left = `${(timeLineLength.value / 2 - 1) * 140 + 70}px`;
      newCurrentIndex = (totalTimelineItems.value - 1) / 2;
    } else { 
      markElement.style.left = `${Math.floor(timeLineLength.value / 2) * 140 - 70 }px`;
      newCurrentIndex = (totalTimelineItems.value - 2) / 2;
    }

  if (!isResize) {
    currentIndex.value = newCurrentIndex;
  }
  moveBy(currentIndex.value);
}


const moveBy = (index) => {
  currentIndex.value = index;

  const container = document.querySelector('.time-line-content');
  if (!container) return;

  let offset;
  if (totalTimelineItems.value % 2 !== 0){ // Odd
    offset = (index - (totalTimelineItems.value - 1) / 2) * 140;
  } else { // Even
    offset = (index - (totalTimelineItems.value - 2) / 2) * 140;
  }
  container.style.transform = `translateX(${-offset}px)`;
}


onMounted(() => {
  initialLocaiton(); 
  checkScreenSize(); 
  window.addEventListener('resize', checkScreenSize);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
});

// 年份解析工具：从日期字符串中提取年份
const getYear = (dateStr) => {
  const m = String(dateStr || '').match(/(\d{4})/);
  return m ? m[1] : '';
};
</script>

<template>
  <div class="page-container">
    <navigateBar />

  <div class="timeline-section-wrapper">

      <section class="vertical-timeline">
        <div class="vt-container">
          <template v-for="(item, idx) in timeLineData" :key="item.id">

            <div v-if="idx === 0 || getYear(item.date) !== getYear(timeLineData[idx-1]?.date)" class="vt-year">{{ getYear(item.date) }}</div>

            <div class="vt-item">
              <div class="vt-marker"></div>
              <div class="vt-card">
                <div class="vt-card-header">
                  <h3 class="vt-title">{{ item.contentTitle }}</h3>
                  <span class="vt-date">{{ item.date }}</span>
                </div>
                <div class="vt-card-body">
                  <img class="vt-img" :src="item.img" :alt="item.contentTitle" loading="lazy" decoding="async" />
                  <p class="vt-detail">{{ item.content }}</p>
                </div>
              </div>
            </div>
          </template>
        </div>
      </section>
    </div>
  </div>
  <div class="footer">
      <span class="footer-content">© 2025 Mei Zhihan. All rights reserved.  <a class="ICP" href="https://beian.miit.gov.cn/" target="_blank" rel="noopener">浙ICP备2025170599号</a></span>
  </div>
</template>

<style scoped>
.page-container {
  margin-top: 100px;
  width: 100%;
  min-height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  background-color: #fff;
}

.timeline-section-wrapper {
  flex-grow: 1;
  padding: 60px 40px;
  max-width: 1100px;
  margin: 0 auto;
  width: 100%;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}

.time-line {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-x: hidden;
  margin-bottom: 50px;
}

.time-line-wrapper{
  position: relative;
  display: flex;
  justify-content: center; 
}

.line-wrapper{ 
  width: 100%; 
  height: 6px; 
  position: relative;
  margin-top: 15px; 
}

.line {
  width: 100%;
  height: 100%;
  background-color: #eee;
  border-radius: 3px;
  position: absolute;
  top: 0;
  left: 0;
}

.mark{
  width: 140px; 
  height: 100%;
  background-color: #3498db; 
  border-radius: 3px;
  position: absolute;
  top: 0;
  transition: background-color 0.3s ease;
}

.time-line-content{ 
  display: flex;
  height: auto; 
  transition: transform 0.4s cubic-bezier(0.25, 0.8, 0.25, 1);
}

.time-line-item{
  width: 140px; /* Fixed width, crucial for JS calculations */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  padding: 5px 0;
  text-align: center;
}

.date {
  font-size: 18px;
  color: #555;    
  font-weight: 500; 
  transition: color 0.3s ease, transform 0.3s ease;
}

.time-line-item.active .date {
  color: #3498db;
  font-weight: bold;
  transform: scale(1.1); 
}

.main-content{
  width: 100%;
  display: flex;
  gap: 50px;
  align-items: flex-start; 

}

.main-content-left{
  flex: 0 0 40%; 
  max-width: 450px; 
  min-height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.main-content-img{
  width: 100%; 
  height: auto;
  min-height: 100px;
  max-height: 350px; 
  object-fit:contain; /* Ensures image covers the area without distortion */
  border-radius: 8px; 
  border: 3px solid #eee;
  box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
}

.main-content-right{
  flex: 1;
  display: flex;
  flex-direction: column;
}

.content-title { 
  font-size: 28px;
  font-weight: bold;
  color: #333;
  margin-bottom: 15px;
  padding-bottom: 10px;
  border-bottom: 2px solid #eee; 
}

.main-content-detail{
  font-size: 17px;
  color: #444; 
  line-height: 1.75; 
  margin-top: 0; 
  white-space: pre-line; 
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

/* Responsive Adjustments */
@media screen and (max-width: 992px) {
  .page-container {
    min-height: calc(100vh - 60px);
    margin-top: 60px; /* Adjusted for smaller header */
  }

  .timeline-section-wrapper {
    padding: 50px 30px;
  }
  .main-content {
    gap: 30px;
  }
  .main-content-left {
    flex: 0 0 45%;
  }
  .content-title {
    font-size: 26px;
  }
  .main-content-detail {
    font-size: 16px;
  }
  .date {
    font-size: 17px;
  }
}

@media screen and (max-width: 768px) {
  .timeline-section-wrapper {
    padding: 40px 20px;
  }
  .time-line {
    margin-bottom: 40px;
  }
  .main-content{
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }

  .main-content-left,
  .main-content-right{
    width: 100%;
    max-width: 500px;
    flex-basis: auto;
  }
  .main-content-right {
    text-align: center;
  }
  .content-title {
    font-size: 24px;
  }
  .main-content-detail {
    font-size: 15px;
  }
  .date {
    font-size: 16px;
  }
  .time-line-item.active .date {
    transform: scale(1.05);
  }
}

@media screen and (max-width: 480px) {
  .timeline-section-wrapper {
    padding: 30px 15px;
  }
  .date {
    font-size: 14px;
  }
  .content-title {
    font-size: 20px;
  }
  .main-content-detail {
    font-size: 14px;
  }
  .footer-content{
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
/* ---- Vertical Timeline styles ---- */
.vertical-timeline { position: relative; }
.vt-container { position: relative; }
.vt-container::before {
  content: "";
  position: absolute;
  top: 0; bottom: 0; left: 16px;
  width: 4px; border-radius: 2px;
  background: linear-gradient(180deg, #e3effb 0%, #eaeef3 100%);
}
.vt-item { position: relative; margin-bottom: 40px; opacity: 1; transform: translateY(0); transition: opacity .5s ease, transform .5s ease; }
.vt-item.inview { opacity: 1; transform: translateY(0); }
.vt-marker {
  position: absolute; left: 10px; top: 16px;
  width: 16px; height: 16px; border-radius: 999px;
  background: #3498db; border: 2px solid #fff; box-shadow: 0 0 0 2px #cfe5f7;
}

/* 年份分隔标签 */
.vt-year {
  display: inline-flex; align-items: center; position: relative;
  margin: 12px 0 14px 44px; padding: 4px 12px;
  font-weight: 600; font-size: 20px; color: #0f172a;
  background: #fff; border: 1px solid #eaeef3; border-radius: 999px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
}
.vt-year::before {
  content: ""; position: absolute; left: -28px; top: 50%; transform: translateY(-50%);
  width: 20px; height: 1px; background: #eaeef3;
}

.vt-card {
  background: #fff;
  border: 1px solid #eaeef3;
  border-radius: 12px;
  padding: 18px;
  box-shadow: 0 3px 12px rgba(0,0,0,0.06);
  transition: transform .2s ease, box-shadow .2s ease, border-color .2s ease;
}
.vt-card:hover { box-shadow: 0 8px 20px rgba(0,0,0,0.08); }

.vt-card-header { display: flex; align-items: baseline; gap: 10px; margin-bottom: 10px; padding-left: 20px;}

.vt-date { color: #64748b; font-weight: 600; font-size: 14px; }
.vt-title { font-size: 20px; font-weight: 700; color: #0f172a; margin: 0; }
.vt-card-body { display: grid; grid-template-columns: 260px 1fr; gap: 16px; align-items: start; }
.vt-img {
  width: 100%; height: 180px; object-fit: contain; border-radius: 8px;
  border: 2px solid #eee; box-shadow: 0 3px 10px rgba(0,0,0,0.08);
  transition: transform 6s ease, filter .3s ease;
}
.vt-item.active .vt-img { transform: scale(1.03); }
.vt-detail { font-size: 15px; color: #334155; line-height: 1.7; }

@media screen and (max-width: 992px) {
  .vt-card-body { grid-template-columns: 220px 1fr; }
  .vt-img { height: 160px; }
}
@media screen and (max-width: 768px) {
  .vt-card-body { grid-template-columns: 1fr; }
  .vt-img { height: 220px; }
}
@media screen and (max-width: 480px) {
  .vt-img { height: 180px; }
}
/* Active state visuals */
.vt-item.active .vt-card { border-color: #cfe7ff; box-shadow: 0 8px 20px rgba(52,152,219,0.12); }
.vt-item.active .vt-marker { background: #2563eb; box-shadow: 0 0 0 3px #93c5fd; }


</style>