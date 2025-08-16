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
        section: 'primordial',
        date: '历史诞生前',
        title: '龙祖游弋',
        description: '龙祖游弋于初启的混沌，"不朽"龙已存在。'
    },
    {
        id: 2,
        section: 'ancient',
        date: '太古时期',
        title: '古兽游弋',
        description: '宇宙诞生至星神诞生之间，古兽在宇宙中游弋。'
    },
    {
        id: 3,
        section: 'amber',
        date: '琥珀纪前',
        title: '黄昏战争',
        description: '人们与古兽之间爆发了大规模战争，史称黄昏战争。'
    },
    {
        id: 4,
        section: 'amber',
        date: '琥珀元纪',
        title: '克里珀登神',
        description: '克里珀在黄昏战争中登神"存护"，并将古兽杀灭至仅剩"贪饕"奥博洛斯。'
    },
    {
        id: 5,
        section: 'star-gods',
        date: '琥珀未知纪',
        title: '星神诞生',
        description: '黄昏战争后，"秩序"太一、"均衡"互、"开拓"阿基维利等十二星神相继诞生，具体顺序无从得知。'
    },
    {
        id: 6,
        section: 'prosperity',
        date: '琥珀990纪前',
        title: '第一次繁荣',
        description: '阿基维利基本贯通宇宙，实现了宇宙的第一次繁荣。'
    },
    {
        id: 7,
        section: 'company',
        date: '琥珀1300纪',
        title: '后援队建立',
        description: '"公司"前身琥珀王后援队建立，在帮助琥珀王收集材料的同时不断壮大。'
    },
    {
        id: 8,
        section: 'crisis',
        date: '琥珀13xx纪',
        title: '寰宇蝗灾',
        description: '虫潮出现，"秩序"太一未能压制，开启寰宇蝗灾时期，持续约5纪，影响三分之二银河。'
    },
    {
        id: 9,
        section: 'crisis',
        date: '寰宇蝗灾末期',
        title: '繁育终结',
        description: '"秩序"与"存护"达成交易后，秩序与贪饕一同消失，秩序命途被"同协"吞并，最终在"存护"干预下，"繁育"被封印。'
    },
    {
        id: 10,
        section: 'company',
        date: '约琥珀1388纪',
        title: '公司成立',
        description: '后援队改组成立星际和平公司，推出信用点体系作为全宇宙通用货币。'
    },
    {
        id: 11,
        section: 'conflict',
        date: '琥珀1400纪',
        title: '边星贸易战争',
        description: '因公司资本发展，星际贫富分化加剧，特劳拉-法恩莎与柯拉帕乌引爆边星贸易战争。'
    },
    {
        id: 12,
        section: 'conflict',
        date: '琥珀1400纪',
        title: '第一次机械帝皇战争',
        description: '德-维恩试图抢占无机世界，引发第一次机械帝皇战争，持续约10个纪后被平定。'
    },
    {
        id: 13,
        section: 'prosperity',
        date: '血锦之纪',
        title: '第二次繁荣',
        description: '随着联觉信标推广，第二次繁荣来临，史称"血锦之纪"，持续近五百琥珀纪。'
    },
    {
        id: 14,
        section: 'prosperity',
        date: '血锦之纪期间',
        title: '重要星神诞生',
        description: '"智识"停止思考，"丰饶"药师诞生（存疑），"巡猎"岚出现，"毁灭"纳努克诞生，"开拓"陨落。'
    },
    {
        id: 15,
        section: 'xianzhou',
        date: '琥珀2100纪',
        title: '仙舟启航',
        description: '九艘仙舟启航寻找丰饶，经历内战、金人叛乱、魔阴身等灾难后看清丰饶本质，成立仙舟联盟。'
    },
    {
        id: 16,
        section: 'xianzhou',
        date: '琥珀2100纪',
        title: '巡猎司命',
        description: '岚在战场上帮助仙舟，被视作帝弓司命，仙舟获得巡猎的力量。'
    },
    {
        id: 17,
        section: 'conflict',
        date: '琥珀2110纪',
        title: '第二次反有机战争',
        description: '鲁珀特二世引发第二次反有机帝皇战争，被平定后公司决定对无机生命进行灭绝。'
    },
    {
        id: 18,
        section: 'company',
        date: '琥珀2110纪',
        title: '天才俱乐部介入',
        description: '因螺丝咕姆加入天才俱乐部，公司改变对无机生命的灭绝政策，转而献好。'
    },
    {
        id: 19,
        section: 'major-events',
        date: '琥珀2140纪',
        title: '星核出现',
        description: '星核出现，星穹列车开始向受灾地区提供帮助，后来又失去踪迹。'
    },
    {
        id: 20,
        section: 'conflict',
        date: '琥珀2147纪',
        title: '边陲独立战争',
        description: '囚犯哈努努掀起声势浩大的战火并获得胜利，公司称其为"边陲战争"，阿斯德纳人称其为"独立战争"。'
    },

    {
        id: 22,
        section: 'major-events',
        date: '琥珀2157纪',
        title: '星穹列车再启航',
        description: '星穹列车再次发车，琥珀王瞥视开拓者后开启新纪元。'
    },
    {
        id: 23,
        section: 'present',
        date: '琥珀2158纪',
        title: '星际和平指南发布',
        description: '《星际和平指南》第一版发布，现世流传。'
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