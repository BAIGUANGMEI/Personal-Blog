<script setup>
import { ref } from 'vue'

const isMobileMenuOpen = ref(false)

const toggleMobileMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value
}

const closeMobileMenu = () => {
  isMobileMenuOpen.value = false
}


</script>

<template>
    <div class="nav-bar" :class="{ 'mobile-menu-active': isMobileMenuOpen }">
        <router-link to="/" class="nav-bar-title-link">
            <div class="nav-bar-title">MEIZHIHAN</div>
        </router-link>

        <div class="nav-bar-list desktop">
            <router-link to="/" class="nav-bar-item" active-class="active-link" exact-active-class="exact-active-link">About Me</router-link>
            <router-link to="/timeline" class="nav-bar-item" active-class="active-link" exact-active-class="exact-active-link">Time Line</router-link>
            <router-link to="/blog" class="nav-bar-item" active-class="active-link" exact-active-class="exact-active-link">Blog</router-link>
            <router-link to="/bulletinboard" class="nav-bar-item" active-class="active-link" exact-active-class="exact-active-link">Bulletin Board</router-link>
        </div>

        <div class="mobile-menu-btn" @click="toggleMobileMenu" :class="{ 'open': isMobileMenuOpen }">
            <span></span>
            <span></span>
            <span></span>
        </div>

        <div class="nav-bar-list mobile" :class="{ 'open': isMobileMenuOpen }">
            <router-link to="/" class="nav-bar-item" @click="closeMobileMenu" active-class="active-link" exact-active-class="exact-active-link">About Me</router-link>
            <router-link to="/timeline" class="nav-bar-item" @click="closeMobileMenu" active-class="active-link" exact-active-class="exact-active-link">Time Line</router-link>
            <router-link to="/blog" class="nav-bar-item" @click="closeMobileMenu" active-class="active-link" exact-active-class="exact-active-link">Blog</router-link>
            <router-link to="/bulletinboard" class="nav-bar-item" @click="closeMobileMenu" active-class="active-link" exact-active-class="exact-active-link">Bulletin Board</router-link>
        </div>
    </div>

    <div
        class="mobile-overlay"
        :class="{ 'active': isMobileMenuOpen }"
        @click="closeMobileMenu"
    ></div>
</template>

<style scoped>
.nav-bar {
    width: 100%;
    height: 60px; /* Standard height */
    background-color: #ffffff; /* Light background */
    display: flex;
    justify-content: space-between; /* Align title to left, links/button to right */
    align-items: center;
    padding: 0 30px; /* Adjusted padding */
    position: fixed; /* Make navbar sticky */
    top: 0;
    left: 0;
    z-index: 1000;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1); /* Softer shadow */
    transition: background-color 0.3s ease; /* For potential future theme changes */
}

.nav-bar-title-link {
    text-decoration: none;
}

.nav-bar-title {
    font-size: 28px; /* Reduced font size */
    color: #3498db; /* Primary color */
    font-weight: bold;
    letter-spacing: 1px;
}

.nav-bar-list {
    display: flex;
    align-items: center;
}

.nav-bar-item {
    color: #555555; /* Darker grey for better readability */
    text-decoration: none;
    font-size: 17px; /* Reduced font size */
    margin-left: 30px; /* Adjusted spacing */
    padding: 8px 12px; /* Add padding for better click area */
    border-radius: 6px;
    transition: color 0.3s ease, background-color 0.3s ease;
    font-weight: 500;
}

.nav-bar-item:hover {
    color: #3498db;
    background-color: #f0f4f8;
}

.nav-bar-item.exact-active-link { /* Style for the exactly active link */
    color: #3498db;
    font-weight: bold;
    /* background-color: #e9f5ff; */
    position: relative;
}

.nav-bar-item.exact-active-link::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 50%;
    transform: translateX(-50%);
    width: 60%;
    height: 2px;
    background-color: #3498db;
    border-radius: 1px;
}


.mobile-menu-btn {
    display: none;
    flex-direction: column;
    cursor: pointer;
    width: 28px; /* Adjusted size */
    height: 22px; /* Adjusted size */
    justify-content: space-between;
    position: relative; /* For absolute positioning of spans if needed for complex animations */
}

.mobile-menu-btn span {
    width: 100%;
    height: 3px;
    background-color: #333333; /* Darker color for light background */
    border-radius: 1.5px;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1); /* Smoother transition */
    transform-origin: center;
}

/* Hamburger to X animation */
.mobile-menu-btn.open span:nth-child(1) {
    transform: translateY(9.5px) rotate(45deg);
}

.mobile-menu-btn.open span:nth-child(2) {
    opacity: 0;
    transform: translateX(-10px); /* Optional: slide out */
}

.mobile-menu-btn.open span:nth-child(3) {
    transform: translateY(-9.5px) rotate(-45deg);
}

.nav-bar-list.mobile {
    display: none; /* Initially hidden, controlled by JS/CSS */
    position: fixed;
    top: 60px; /* Match navbar height */
    right: -100%; /* Start off-screen */
    width: 280px; /* Slightly wider */
    height: calc(100vh - 60px);
    background-color: #ffffff;
    flex-direction: column;
    justify-content: flex-start;
    align-items: stretch; /* Make items take full width */
    padding: 20px 0; /* Padding top/bottom, items will have horizontal padding */
    transition: right 0.35s cubic-bezier(0.23, 1, 0.32, 1); /* Smoother slide */
    box-shadow: -3px 0 15px rgba(0, 0, 0, 0.15);
    border-top: 1px solid #eee;
}

.nav-bar-list.mobile.open {
    right: 0; /* Slide in */
}

.nav-bar-list.mobile .nav-bar-item {
    margin: 0; /* Reset margin */
    padding: 15px 30px; /* More padding for touch targets */
    font-size: 18px; /* Slightly larger for mobile */
    width: 100%;
    border-bottom: 1px solid #f0f0f0; /* Softer separator */
    border-radius: 0; /* No border radius for full-width items */
    color: #333;
}
.nav-bar-list.mobile .nav-bar-item:last-child {
    border-bottom: none;
}

.nav-bar-list.mobile .nav-bar-item:hover {
    background-color: #f0f4f8;
    color: #3498db;
}

.nav-bar-list.mobile .nav-bar-item.exact-active-link {
    background-color: #e9f5ff;
    color: #3498db;
    font-weight: bold;
}
.nav-bar-list.mobile .nav-bar-item.exact-active-link::after {
    display: none; /* No underline for mobile items, background is enough */
}


.mobile-overlay {
    display: none;
    position: fixed;
    top: 0; /* Cover entire screen */
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Slightly darker overlay */
    z-index: 999; /* Below mobile menu, above page content */
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s ease, visibility 0.3s ease;
}

.mobile-overlay.active {
    opacity: 1;
    visibility: visible;
}

@media screen and (max-width: 768px) {
    .nav-bar {
        padding: 0 20px; /* Adjust padding for smaller screens */
        /* height: 55px; Optional: slightly smaller navbar on mobile */
    }
    .nav-bar-title {
        font-size: 24px; /* Adjust title size */
    }
    .nav-bar-list.desktop {
        display: none;
    }
    .mobile-menu-btn {
        display: flex;
    }
    .nav-bar-list.mobile {
        display: flex; /* Needs to be flex to be positioned by 'right' */
        top: 60px; /* Ensure this matches nav-bar height */
        /* If navbar height changes for mobile, update this too */
    }
    .mobile-overlay {
        display: block; /* Always block on mobile, visibility controlled by .active */
    }
}

@media screen and (max-width: 480px) {
    .nav-bar-list.mobile {
        width: 250px; /* Adjust width for very small screens */
    }
    .nav-bar-list.mobile .nav-bar-item {
        font-size: 17px;
        padding: 12px 25px;
    }
    .nav-bar-title {
        font-size: 22px;
    }
}
</style>