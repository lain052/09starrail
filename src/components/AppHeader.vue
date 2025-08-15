<!-- src/components/AppHeader.vue -->
<template>
    <header class="app-header">
        <div class="header-content">
            <!-- 首页链接 -->
            <div class="header-section home-section">
                <router-link to="/" class="home-link">
                    <span class="home-title">🌟 星穹列车宇宙</span>
                </router-link>
            </div>

            <div class="header-section" v-for="section in sections" :key="section.id">
                <div class="section-trigger" @click="toggleSection(section.id)">
                    <span class="section-title">{{ section.title }}</span>
                    <span class="arrow" :class="{ 'rotated': activeSection === section.id }">▼</span>
                </div>
                <transition name="slide">
                    <div v-show="activeSection === section.id" class="section-content">
                        <ul class="section-list">
                            <li v-for="item in section.items" :key="item.id" class="section-item">
                                <router-link :to="item.link" class="section-link">
                                    {{ item.name }}
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </transition>
            </div>
        </div>
    </header>
</template>

<script setup>
import { ref } from 'vue'

const activeSection = ref(null)

const sections = [
    {
        id: 'timeline',
        title: '时间线',
        items: [
            { id: 1, name: '宇宙诞生', link: '/timeline/beginning' },
            { id: 2, name: '星神降临', link: '/timeline/star-gods' },
            { id: 3, name: '文明兴起', link: '/timeline/civilizations' },
            { id: 4, name: '重大事件', link: '/timeline/major-events' }
        ]
    },
    {
        id: 'factions',
        title: '派系',
        items: [
            { id: 1, name: '星穹列车', link: '/factions/astRA-trailblazers' },
            { id: 2, name: '仙舟联盟', link: '/factions/xianzhou-alliance' },
            { id: 3, name: '星核猎手', link: '/factions/stellaron-hunters' },
            { id: 4, name: '星际和平公司', link: '/factions/ipc' }
        ]
    },
    {
        id: 'stargods',
        title: '星神',
        items: [
            { id: 1, name: '开拓', link: '/stargods/null' },
            { id: 2, name: '存护', link: '/stargods/preservation' },
            { id: 3, name: '虚无', link: '/stargods/destruction' },
            { id: 4, name: '智识', link: '/stargods/knowledge' },
            { id: 5, name: '同谐', link: '/stargods/harmony' }
        ]
    },
    {
        id: 'glossary',
        title: '名词解释',
        items: [
            { id: 1, name: '星核', link: '/glossary/stellaron' },
            { id: 2, name: '以太', link: '/glossary/aether' },
            { id: 3, name: '星宿', link: '/glossary/constellation' },
            { id: 4, name: '命途', link: '/glossary/path' }
        ]
    }
]

const toggleSection = (sectionId) => {
    if (activeSection.value === sectionId) {
        activeSection.value = null
    } else {
        activeSection.value = sectionId
    }
}
</script>

<style scoped>
.app-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background: rgba(10, 10, 20, 0.9);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    z-index: 1000;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
}

.header-content {
    display: flex;
    justify-content: space-around;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
}

.header-section {
    flex: 1;
    text-align: center;
}

/* 首页部分样式 */
.home-section {
    flex: 0 0 auto;
    text-align: left;
    padding-left: 10px;
}

.home-link {
    display: flex;
    align-items: center;
    height: 100%;
    text-decoration: none;
    color: #c0c0ff;
    font-size: 18px;
    font-weight: bold;
    padding: 15px 0;
    transition: all 0.3s ease;
}

.home-link:hover {
    color: #ffffff;
}

.home-title {
    display: flex;
    align-items: center;
}

/* 其他部分样式保持不变 */
.section-trigger {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 15px 10px;
    cursor: pointer;
    transition: all 0.3s ease;
    color: #a0a0c0;
}

.section-trigger:hover {
    color: #ffffff;
    background: rgba(255, 255, 255, 0.05);
}

.section-title {
    font-size: 16px;
    font-weight: 500;
    margin-right: 8px;
    letter-spacing: 1px;
}

.arrow {
    font-size: 12px;
    transition: transform 0.3s ease;
}

.arrow.rotated {
    transform: rotate(180deg);
}

.section-content {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    background: rgba(20, 20, 40, 0.95);
    border-bottom: 1px solid rgba(100, 100, 200, 0.3);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.3);
    z-index: 1001;
}

.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s ease;
}

.slide-enter-from {
    opacity: 0;
    transform: translateY(-10px);
}

.slide-leave-to {
    opacity: 0;
    transform: translateY(-10px);
}

.section-list {
    display: flex;
    justify-content: center;
    padding: 15px 0;
    margin: 0;
    list-style: none;
    gap: 30px;
}

.section-item {
    margin: 0;
}

.section-link {
    color: #c0c0e0;
    text-decoration: none;
    font-size: 14px;
    padding: 8px 12px;
    border-radius: 4px;
    transition: all 0.2s ease;
}

.section-link:hover {
    color: #ffffff;
    background: rgba(100, 100, 200, 0.2);
}

@media (max-width: 768px) {
    .header-content {
        flex-direction: column;
    }

    .header-section {
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .home-section {
        text-align: center;
        padding-left: 0;
    }

    .section-trigger {
        justify-content: space-between;
    }

    .section-content {
        position: relative;
        top: 0;
    }

    .section-list {
        flex-direction: column;
        gap: 0;
        padding: 0;
    }

    .section-item {
        padding: 5px 0;
    }
}
</style>