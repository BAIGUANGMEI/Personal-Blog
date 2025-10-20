<script setup>
import { ref, reactive, computed, onMounted } from 'vue' // Added computed
import navigateBar from '../components/navigateBar.vue';
import { Api } from '../api/api';

const name = ref('');
const content = ref('');
const isLoading = ref(false);

const bulletins = reactive([]);

const currentPage = ref(1);
const itemsPerPage = ref(5);

const paginatedBulletins = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return bulletins.slice(start, end);
});

const totalPages = computed(() => {
  return Math.ceil(bulletins.length / itemsPerPage.value);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const goToPage = (pageNumber) => {
  if (pageNumber >= 1 && pageNumber <= totalPages.value) {
    currentPage.value = pageNumber;
  }
};

const pageNumbers = computed(() => {
  const current = currentPage.value;
  const last = totalPages.value;
  const delta = 1; // Number of pages to show around the current page
  const left = current - delta;
  const right = current + delta + 1;
  const range = [];
  const rangeWithDots = [];
  let l;

  if (last <= 1) { // No pagination needed for 0 or 1 page
    return [];
  }

  for (let i = 1; i <= last; i++) {
    if (i === 1 || i === last || (i >= left && i < right)) {
      range.push(i);
    }
  }

  for (let i of range) {
    if (l) {
      if (i - l === 2) {
        rangeWithDots.push(l + 1);
      } else if (i - l !== 1) {
        rangeWithDots.push('...');
      }
    }
    rangeWithDots.push(i);
    l = i;
  }
  return rangeWithDots;
});


const submitMessage = async() => {
  if (!name.value.trim() && !content.value.trim()) {
    alert('Please enter both name and content.');
    return;
  } 

  isLoading.value = true;

  try{

    const response = await Api.addBulletin(name.value, content.value);

    if (response.status !== 200) {
      throw new Error('Failed to submit message');
    }

    name.value = '';
    content.value = '';

    alert('Message submitted successfully!');

    window.location.reload();

  } catch{
    console.error('Failed to submit message:', error);
  } finally {
    isLoading.value = true;
  }
  
};

onMounted(async () => {
  isLoading.value = true;

  try {
    const response = await Api.getBulletins();
    response.data.data.forEach(item => {
      bulletins.push({
        id: item.ID,
        userName: item.author,
        messageContent: item.content,
        messageDate: new Date(item.UpdatedAt).toLocaleString()
      });
    });
  } catch (error) {
    console.error('Failed to fetch bulletins:', error);
  } finally {
    isLoading.value = false;
  }
});

</script>

<template>
  <div class="page-container">
    <navigateBar />

    <div class="bulletin-board-content">
      <div class="bulletin-display">
        <div v-if="paginatedBulletins.length === 0 && bulletins.length > 0" class="no-messages">
          No messages on this page.
        </div>
        <div v-else-if="bulletins.length === 0" class="no-messages">
          No messages yet. Be the first to post!
        </div>
        <div class="bulletin-item" v-for="item in paginatedBulletins" :key="item.id">
          <div class="item-header">
            <span class="user-name">{{ item.userName }}</span>
            <span class="message-date">{{ item.messageDate }}</span>
          </div>
          <p class="message-content">{{ item.messageContent }}</p>
        </div>
      </div>

      <div class="pagination-controls" v-if="totalPages > 1">
        <button @click="prevPage" :disabled="currentPage === 1" class="pagination-btn prev-next-btn">
          &laquo; Previous
        </button>
        <template v-for="(pageNumber, index) in pageNumbers" :key="index">
          <button
            v-if="typeof pageNumber === 'number'"
            @click="goToPage(pageNumber)"
            :class="{ 'active-page': currentPage === pageNumber }"
            class="pagination-btn page-number-btn"
          >
            {{ pageNumber }}
          </button>
          <span v-else class="pagination-ellipsis">{{ pageNumber }}</span>
        </template>
        <button @click="nextPage" :disabled="currentPage === totalPages" class="pagination-btn prev-next-btn">
          Next &raquo;
        </button>
      </div>

      <div class="bulletin-form-section">
        <h2 class="form-title">Leave a Message</h2>
        <div class="bulletin-form">
          <div class="form-group">
            <label class="form-label" for="name">Name:</label>
            <input type="text" id="name" v-model="name" placeholder="Enter your name" class="form-input" />
          </div>
          <div class="form-group">
            <label class="form-label" for="content">Content:</label>
            <textarea id="content" v-model="content" placeholder="Enter your message" class="form-textarea"></textarea>
          </div>
          <div class="submit-button-container">
            <button class="submit-btn" @click="submitMessage" :disabled="isLoading">Submit Message</button>
          </div>
        </div>
      </div>
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

.bulletin-board-content {
  flex-grow: 1;
  padding: 60px 40px;
  max-width: 900px; 
  margin: 0 auto;
  width: 100%;
  opacity: 0;
  animation: fadeInUp 0.8s ease forwards;
}


.bulletin-display {
  margin-bottom: 20px; /* Reduced margin to accommodate pagination */
  width: 100%;
  min-height: 300px; /* Ensure a minimum height even if few items */
  /* max-height: 500px; Removed max-height as pagination handles item count */
  /* overflow-y: auto; Removed overflow as pagination handles item count */
  border: 1px solid #e0e0e0; 
  border-radius: 8px;
  background-color: #f9f9f9; 
  padding: 10px; 
}

.no-messages {
  padding: 20px;
  text-align: center;
  color: #777;
  font-style: italic;
  min-height: 100px; /* Ensure it takes some space */
  display: flex;
  align-items: center;
  justify-content: center;
}

.bulletin-item {
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.bulletin-item:last-child {
  border-bottom: none;
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 10px;
}

.user-name {
  font-size: 18px; 
  font-weight: bold;
  color: #3498db; 
}

.message-content {
  font-size: 16px; 
  color: #444; 
  line-height: 1.6;
  white-space: pre-line;
}

.message-date {
  font-size: 14px; 
  color: #777;    
}

/* Pagination Styles */
.pagination-controls {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 40px; /* Space before the form */
  gap: 8px;
  flex-wrap: wrap; /* Allow wrapping on small screens */
}

.pagination-btn {
  padding: 8px 12px;
  font-size: 14px;
  color: #555;
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease;
  font-weight: 500;
}

.pagination-btn:hover:not(:disabled) {
  background-color: #f0f4f8;
  color: #3498db;
  border-color: #3498db;
}

.pagination-btn:disabled {
  color: #aaa;
  background-color: #f9f9f9;
  cursor: not-allowed;
  border-color: #eee;
}

.pagination-btn.page-number-btn.active-page {
  background-color: #3498db;
  color: #fff;
  border-color: #3498db;
  font-weight: bold;
}

.pagination-ellipsis {
  padding: 8px 4px;
  color: #777;
  font-size: 14px;
}


.bulletin-form-section {
  margin-top: 30px;
  padding: 25px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  background-color: #fff;
}

.form-title {
  font-size: 24px;
  font-weight: bold;
  color: #333;
  margin-bottom: 25px;
  text-align: left;
}

.bulletin-form {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.form-label {
  font-size: 16px; 
  font-weight: 500; 
  color: #333;
  margin-bottom: 8px;
}

.form-input,
.form-textarea {
  width: 100%;
  padding: 12px 15px;
  font-size: 16px; 
  border: 1px solid #ccc;
  border-radius: 6px; 
  font-family: inherit; 
  box-sizing: border-box;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;
}

.form-input:focus,
.form-textarea:focus {
  border-color: #3498db;
  box-shadow: 0 0 0 0.2rem rgba(52, 152, 219, 0.25);
  outline: none;
}

.form-textarea {
  min-height: 120px; 
  resize: vertical; 
}

.submit-button-container {
  display: flex;
  justify-content: flex-end; 
  margin-top: 10px;
}

.submit-btn {
  padding: 10px 25px;
  font-size: 16px; 
  color: #fff;
  background-color: #3498db; 
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
  font-weight: 500;
}

.submit-btn:hover {
  background-color: #2980b9;
  transform: translateY(-1px);
}

.submit-btn:active {
  transform: translateY(0);
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

@media screen and (max-width: 768px) {
  .page-container {
    min-height: calc(100vh - 60px);
    margin-top: 60px; /* Adjusted for smaller header */
  }

  .bulletin-board-content {
    padding: 40px 20px;
  }
  /* .page-title is not present in this component, remove if not used elsewhere */
  /* .page-title {
    font-size: 28px;
    margin-bottom: 25px;
  } */
  .bulletin-display {
    /* max-height: 400px; */ /* Removed */
    min-height: 250px;
  }
  .user-name {
    font-size: 17px;
  }
  .message-content {
    font-size: 15px;
  }
  .message-date {
    font-size: 13px;
  }
  .form-title {
    font-size: 22px;
  }
  .form-label, .form-input, .form-textarea, .submit-btn {
    font-size: 15px;
  }
  .form-textarea {
    min-height: 100px;
  }
  .pagination-btn {
    padding: 7px 10px;
    font-size: 13px;
  }
  .pagination-ellipsis {
    font-size: 13px;
  }
}

@media screen and (max-width: 480px) {
  .bulletin-board-content {
    padding: 30px 15px;
  }
  /* .page-title {
    font-size: 24px;
  } */
  .bulletin-display {
    min-height: 200px;
  }
  .user-name {
    font-size: 16px;
  }
  .message-content {
    font-size: 14px;
  }
  .message-date {
    font-size: 12px;
  }
  .form-title {
    font-size: 20px;
  }
  .form-label, .form-input, .form-textarea, .submit-btn {
    font-size: 14px;
  }
  .submit-button-container {
    justify-content: center; 
  }
  .submit-btn {
    width: 100%; 
    padding: 12px 20px;
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
  .pagination-controls {
    gap: 5px;
  }
  .pagination-btn {
    padding: 6px 8px;
    font-size: 12px;
  }
  .pagination-ellipsis {
    font-size: 12px;
  }
}
</style>