<!-- src/components/Timeline.vue (更新版) -->
<template>
    <div class="timeline-page">
        <AppHeader />
        <div class="timeline-container">
            <h2 class="section-title">时间线</h2>
            <div class="timeline-content">
                <div v-for="(event, index) in filteredEvents" :key="event.id" class="timeline-item"
                    :class="{ 'even': index % 2 === 0, 'odd': index % 2 === 1 }">
                    <div class="timeline-date">{{ event.date }}</div>
                    <div class="timeline-marker"></div>
                    <div class="timeline-info">
                        <h3 class="event-title">{{ event.title }}</h3>
                        <p class="event-description">{{ event.description }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()

const timelineEvents = ref([
    {
        id: 1,
        section: 'beginning',
        date: '宇宙诞生之初',
        title: '虚无创生',
        description: '在宇宙诞生的瞬间，虚无星神阿基维利撕裂了奇点，为宇宙带来了最初的秩序。'
    },
    {
        id: 2,
        section: 'star-gods',
        date: '星历元年',
        title: '星神降临',
        description: '十二星神相继降临宇宙，各自执掌不同的命途，为宇宙带来多样性。'
    },
    {
        id: 3,
        section: 'civilizations',
        date: '星历500年',
        title: '文明兴起',
        description: '首批智慧文明在星神的引导下开始探索宇宙，建立星际文明。'
    },
    {
        id: 4,
        section: 'major-events',
        date: '星历800年',
        title: '星核危机',
        description: '星核在多个星球上出现，引发了一系列毁灭性事件，星核猎手组织成立。'
    }
])

const filteredEvents = computed(() => {
    if (!route.params.section) return timelineEvents.value
    return timelineEvents.value.filter(event => event.section === route.params.section)
})
</script>

<style scoped>
.timeline-page {
    padding-top: 60px;
    min-height: 100vh;
    background: linear-gradient(to bottom, #0a0a1a, #1a1a3a);
}

.timeline-container {
    padding: 20px;
    max-width: 800px;
    margin: 0 auto;
}

.section-title {
    text-align: center;
    color: #a0a0ff;
    font-size: 28px;
    margin-bottom: 30px;
    text-shadow: 0 0 10px rgba(160, 160, 255, 0.5);
}

.timeline-content {
    position: relative;
}

.timeline-content::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #4a4aff, #8a4fff);
    left: 50%;
    transform: translateX(-50%);
}

.timeline-item {
    display: flex;
    margin-bottom: 50px;
    position: relative;
}

.timeline-item.even {
    flex-direction: row-reverse;
}

.timeline-date {
    width: 40%;
    padding: 15px;
    text-align: center;
    font-weight: bold;
    color: #d0d0ff;
    background: rgba(70, 70, 150, 0.2);
    border-radius: 8px;
    align-self: center;
}

.timeline-marker {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #6a6aff;
    border: 4px solid #1a1a4a;
    box-shadow: 0 0 10px rgba(106, 106, 255, 0.8);
    z-index: 1;
}

.timeline-info {
    width: 40%;
    padding: 20px;
    background: rgba(30, 30, 60, 0.6);
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    border: 1px solid rgba(100, 100, 255, 0.2);
}

.event-title {
    color: #c0c0ff;
    margin-top: 0;
    margin-bottom: 10px;
    font-size: 20px;
}

.event-description {
    color: #a0a0d0;
    line-height: 1.6;
    margin: 0;
}

@media (max-width: 768px) {
    .timeline-page {
        padding-top: 120px;
    }

    .timeline-content::before {
        left: 30px;
    }

    .timeline-item {
        flex-direction: row !important;
    }

    .timeline-date,
    .timeline-info {
        width: calc(100% - 80px);
    }

    .timeline-date {
        margin-left: 50px;
    }

    .timeline-info {
        margin-left: 50px;
    }

    .timeline-marker {
        left: 30px;
    }
}
</style>