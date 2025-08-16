<!-- src/components/AppHeader.vue (修改版) -->
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
                <!-- 时间线部分改为直接链接 -->
                <router-link v-if="section.id === 'timeline'" to="/timeline" class="section-trigger direct-link"
                    @click="activeSection = null">
                    <span class="section-title">{{ section.title }}</span>
                </router-link>

                <div class="section-trigger" @click="toggleSection(section.id)" v-else-if="section.id !== 'glossary'">
                    <span class="section-title">{{ section.title }}</span>
                    <span class="arrow" :class="{ 'rotated': activeSection === section.id }">▼</span>
                </div>

                <!-- 名词解释部分改为直接链接 -->
                <router-link v-else to="/glossary" class="section-trigger direct-link" @click="activeSection = null">
                    <span class="section-title">{{ section.title }}</span>
                </router-link>

                <transition name="slide">
                    <div v-show="activeSection === section.id && section.id !== 'timeline' && section.id !== 'glossary'"
                        class="section-content">
                        <ul class="section-list">
                            <li v-for="item in section.items" :key="item.id" class="section-item">
                                <router-link :to="item.link" class="section-link" @click="activeSection = null">
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
        title: '时间线'
        // 不再需要 items 数组，因为改为直接链接
    },
    {
        id: 'factions',
        title: '派系',
        items: [
            { id: 1, name: '星穹列车', link: '/factions/astral-trailblazers' },
            { id: 2, name: '仙舟联盟', link: '/factions/xianzhou-alliance' },
            { id: 3, name: '星核猎手', link: '/factions/stellaron-hunters' },
            { id: 4, name: '星际和平公司', link: '/factions/ipc' },
            { id: 5, name: '无名客', link: '/factions/nameless' },
            { id: 6, name: '巡海游侠', link: '/factions/xianzhou-hunters' },
            { id: 7, name: '混沌医师', link: '/factions/chaos-doctors' },
            { id: 8, name: '第IX机关', link: '/factions/ninth-ix' },
            { id: 9, name: '自灭者', link: '/factions/self-annihilators' },
            { id: 10, name: '丰饶之民', link: '/factions/abundance-folk' },
            { id: 11, name: '求药使', link: '/factions/medicine-seekers' },
            { id: 12, name: '反物质军团', link: '/factions/anti-matter-army' },
            { id: 13, name: '泯灭帮', link: '/factions/merger-gang' },
            { id: 14, name: '家族', link: '/factions/families' },
            { id: 15, name: '天才俱乐部', link: '/factions/genius-society' },
            { id: 16, name: '博识学会', link: '/factions/lore-seeking-society' },
            { id: 17, name: '源究森林', link: '/factions/origin-forest' },
            { id: 18, name: '筑城者', link: '/factions/city-builders' },
            { id: 19, name: '石心十人', link: '/factions/stone-hearts' },
            { id: 20, name: '虫群', link: '/factions/swarm' },
            { id: 21, name: '流光忆庭', link: '/factions/memory-garden' },
            { id: 22, name: '焚化工', link: '/factions/incinerators' },
            { id: 23, name: '悲悼伶人', link: '/factions/mournful-performers' },
            { id: 24, name: '假面愚者', link: '/factions/masked-fools' },
            { id: 25, name: '揽镜人', link: '/factions/mirror-gazers' },
            { id: 26, name: '纯美骑士团', link: '/factions/purebeast-knights' },
            { id: 27, name: '虚构史学家', link: '/factions/fiction-historians' },
            { id: 28, name: '谜语人', link: '/factions/riddle-keepers' },
            { id: 29, name: '仲裁官', link: '/factions/arbiters' },
            { id: 30, name: '丹轮寺', link: '/factions/danlun-temple' },
            { id: 31, name: '天外合唱班', link: '/factions/heavenly-choir' },
            { id: 32, name: '厄兆先锋', link: '/factions/doom-harbinger' },
            { id: 33, name: '葬仪知宾', link: '/factions/funeral-ushers' }
        ]
    },
    {
        id: 'stargods',
        title: '星神',
        items: [
            { id: 1, name: '阿基维利', link: '/stargods/null' },
            { id: 2, name: '克里珀', link: '/stargods/preservation' },
            { id: 3, name: '虚无星神', link: '/stargods/destruction' },
            { id: 4, name: '博识尊', link: '/stargods/knowledge' },
            { id: 5, name: '同谐星神', link: '/stargods/harmony' },
            { id: 6, name: '纳努克', link: '/stargods/destruction-nanook' },
            { id: 7, name: '岚', link: '/stargods/hunt-lan' },
            { id: 8, name: '希佩', link: '/stargods/harmony-hype' },
            { id: 9, name: 'IX', link: '/stargods/void-ix' },
            { id: 10, name: '药师', link: '/stargods/abundance-medicine' },
            { id: 11, name: '奥博洛斯', link: '/stargods/glutton-obolos' },
            { id: 12, name: '阿哈', link: '/stargods/joy-aha' },
            { id: 13, name: '伊德莉拉', link: '/stargods/beauty-idrilila' },
            { id: 14, name: '塔伊兹育罗斯', link: '/stargods/propagation-tayzzyroth' },
            { id: 15, name: '迷思', link: '/stargods/mystery-mis' },
            { id: 16, name: '互', link: '/stargods/equilibrium-hu' },
            { id: 17, name: '龙', link: '/stargods/immortality-dragon' },
            { id: 18, name: '末王', link: '/stargods/doomsday-doctor' },
            { id: 19, name: '浮离', link: '/stargods/memory-fuli' },
            { id: 20, name: '太一', link: '/stargods/order-taiyi' }
        ]
    },
    {
        id: 'glossary',
        title: '名词解释',
        items: [] // 不再需要子项
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

/* 添加新的样式 */
.direct-link {
    text-decoration: none;
    color: #a0a0c0;
}

.direct-link:hover {
    color: #ffffff;
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
    flex-wrap: wrap;
    padding: 15px 0;
    margin: 0;
    list-style: none;
    gap: 20px;
    max-width: 1200px;
    margin: 0 auto;
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
    white-space: nowrap;
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