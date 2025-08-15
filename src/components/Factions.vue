<!-- src/components/Factions.vue (更新版) -->
<template>
    <div class="factions-page">
        <AppHeader />
        <div class="factions-container">
            <h2 class="section-title">派系</h2>
            <div class="factions-grid">
                <div v-for="faction in factions" :key="faction.id" class="faction-card" @click="selectFaction(faction)"
                    :class="{ 'selected': selectedFaction?.id === faction.id || route.params.faction === faction.route }">
                    <div class="faction-icon">
                        <div class="fallback-icon">{{ faction.symbol }}</div>
                    </div>
                    <div class="faction-info">
                        <h3 class="faction-name">{{ faction.name }}</h3>
                        <p class="faction-description">{{ faction.shortDescription }}</p>
                    </div>
                </div>
            </div>

            <div v-if="currentFaction" class="faction-detail">
                <h3>{{ currentFaction.name }}详细介绍</h3>
                <p>{{ currentFaction.fullDescription }}</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()

const factions = ref([
    {
        id: 1,
        route: 'astRA-trailblazers',
        name: '星穹列车',
        symbol: '🚂',
        shortDescription: '穿越银河的传奇列车，承载着开拓者们的梦想',
        fullDescription: '星穹列车是宇宙中唯一能够穿越星门的交通工具，由列车长阿兰领导。列车上的成员都是各行各业的精英，他们共同探索未知的世界，寻找星核的踪迹。'
    },
    {
        id: 2,
        route: 'xianzhou-alliance',
        name: '仙舟联盟',
        symbol: '⛩️',
        shortDescription: '古老的生命星球组成的联盟，追求长生不老',
        fullDescription: '仙舟联盟是由六艘仙舟组成的星际文明，每艘仙舟都是一个完整的生态系统。联盟成员追求长生不老，通过药王秘传和各种仙术延续生命。'
    },
    {
        id: 3,
        route: 'stellaron-hunters',
        name: '星核猎手',
        symbol: '🎯',
        shortDescription: '专门追踪和消除星核威胁的神秘组织',
        fullDescription: '星核猎手是一群专门追踪和消除星核威胁的神秘人物。他们不受任何势力约束，以自己的方式维护宇宙的平衡。'
    },
    {
        id: 4,
        route: 'ipc',
        name: '星际和平公司',
        symbol: '🏢',
        shortDescription: '控制着星际贸易的巨型商业帝国',
        fullDescription: '星际和平公司是宇宙中最强大的商业组织，控制着大部分星际贸易路线。公司以维护星际和平为名，实际上追求利益最大化。'
    }
])

const selectedFaction = ref(null)

const currentFaction = computed(() => {
    if (route.params.faction) {
        return factions.value.find(f => f.route === route.params.faction)
    }
    return selectedFaction.value
})

const selectFaction = (faction) => {
    selectedFaction.value = selectedFaction.value?.id === faction.id ? null : faction
}

// 监听路由变化
watch(
    () => route.params.faction,
    (newFaction) => {
        if (newFaction) {
            selectedFaction.value = factions.value.find(f => f.route === newFaction) || null
        }
    },
    { immediate: true }
)
</script>

<style scoped>
.factions-page {
    padding-top: 60px;
    min-height: 100vh;
    background: linear-gradient(to bottom, #0a0a1a, #1a1a3a);
}

.factions-container {
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.section-title {
    text-align: center;
    color: #a0a0ff;
    font-size: 28px;
    margin-bottom: 30px;
    text-shadow: 0 0 10px rgba(160, 160, 255, 0.5);
}

.factions-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.faction-card {
    background: rgba(30, 30, 60, 0.6);
    border-radius: 12px;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(100, 100, 255, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.faction-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(100, 100, 255, 0.3);
    border-color: rgba(120, 120, 255, 0.5);
}

.faction-card.selected {
    background: rgba(60, 60, 120, 0.8);
    border-color: #6a6aff;
    box-shadow: 0 0 20px rgba(106, 106, 255, 0.6);
}

.faction-icon {
    width: 100px;
    height: 100px;
    margin: 0 auto 15px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.fallback-icon {
    font-size: 50px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(50, 50, 100, 0.3);
    border-radius: 50%;
}

.faction-name {
    color: #c0c0ff;
    margin: 0 0 10px;
    font-size: 20px;
}

.faction-description {
    color: #a0a0d0;
    font-size: 14px;
    line-height: 1.5;
    margin: 0;
}

.faction-detail {
    background: rgba(30, 30, 60, 0.8);
    border-radius: 12px;
    padding: 25px;
    border: 1px solid rgba(100, 100, 255, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.faction-detail h3 {
    color: #c0c0ff;
    margin-top: 0;
}

.faction-detail p {
    color: #a0a0d0;
    line-height: 1.7;
    margin: 0;
}

@media (max-width: 768px) {
    .factions-page {
        padding-top: 120px;
    }
}
</style>