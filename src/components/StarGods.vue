<!-- src/components/StarGods.vue (添加完整星神信息版) -->
<template>
    <div class="stargods-page">
        <AppHeader />
        <div class="stargods-container">
            <h2 class="section-title">星神</h2>

            <!-- 总览内容 (持续展示) -->
            <div class="overview-section">
                <div class="overview-content">
                    <h3>总览</h3>
                    <p class="overview-description">
                        对这些漫步深空星海之中的神秘存在，人们知之甚少。受限于有穷的认知，智慧生命只能依稀觉察星神们踏足于凡物无从窥见的命途，并凭借某种理念行使其不可估量的伟力。最终，在口耳相传的神话里，星神们成了高度凝聚的哲学概念之化身。
                    </p>
                    <p class="overview-description">
                        若有人能踏上星神所执掌的命途，便将禀受其遥远的感应，犹如穿越银河光年投来的瞥视。许多人认为：这已是星神与凡人能产生的唯一交集。
                    </p>

                    <div class="overview-stats">
                        <div class="stat-card">
                            <div class="stat-value">18</div>
                            <div class="stat-label">已知星神</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">∞</div>
                            <div class="stat-label">影响力</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-value">?</div>
                            <div class="stat-label">起源之谜</div>
                        </div>
                    </div>

                    <div class="overview-info">
                        <h4>什么是命途？</h4>
                        <p>
                            命途是星神所执掌的宇宙法则，每个星神都代表一种命途。
                            生命可以通过信仰星神来获得对应命途的力量，但同时也要承担相应的代价。
                        </p>
                    </div>
                </div>
            </div>

            <div class="stargods-grid">
                <div v-for="god in stargods" :key="god.id" class="stargod-card"
                    :class="{ 'selected': selectedGod?.id === god.id || route.params.god === god.route }"
                    @click="selectGod(god)">
                    <div class="stargod-header">
                        <div class="stargod-icon">
                            <div class="fallback-icon">{{ god.symbol }}</div>
                        </div>
                        <div class="stargod-basic">
                            <h3 class="god-name">{{ god.name }}</h3>
                            <div class="god-path">{{ god.path }}</div>
                        </div>
                    </div>
                    <div class="god-description">{{ god.shortDescription }}</div>
                </div>
            </div>

            <div v-if="currentGod" class="stargod-detail">
                <div class="detail-header">
                    <div class="detail-icon">
                        <div class="fallback-icon">{{ currentGod.symbol }}</div>
                    </div>
                    <div>
                        <h3>{{ currentGod.name }}</h3>
                        <div class="detail-path">{{ currentGod.path }}</div>
                    </div>
                </div>
                <div class="detail-content">
                    <p>{{ currentGod.fullDescription }}</p>
                    <div class="followers">
                        <h4>主要追随者</h4>
                        <ul>
                            <li v-for="follower in currentGod.followers" :key="follower">{{ follower }}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const router = useRouter()

const stargods = ref([
    // 已存在的星神
    {
        id: 1,
        route: 'null',
        name: '阿基维利',
        symbol: '🌌',
        path: '开拓',
        shortDescription: '第一位踏上星海的星神，为宇宙带来开拓的意志',
        fullDescription: '阿基维利是第一位撕裂星系屏障、踏上星海的星神。祂为宇宙带来了开拓的意志，鼓励所有生命探索未知。据说在与反物质军团的决战中陨落。',
        followers: ['星穹列车成员', '开拓者']
    },
    {
        id: 2,
        route: 'preservation',
        name: '克里珀',
        symbol: '🛡️',
        path: '存护',
        shortDescription: '守护秩序与稳定的星神，保护文明免受侵害',
        fullDescription: '存护星神致力于维护宇宙的秩序与稳定，保护文明免受混乱和毁灭的威胁。祂的追随者通常是秩序的维护者和守护者。',
        followers: ['仙舟联盟', '景元', '符玄']
    },
    {
        id: 3,
        route: 'destruction',
        name: '虚无星神',
        symbol: '🕳️',
        path: '虚无',
        shortDescription: '代表虚无与终结的星神，否定一切意义',
        fullDescription: '虚无星神否定一切存在的意义，认为宇宙终将归于虚无。祂的追随者通常对现实感到绝望，希望通过毁灭来达到最终的解脱。',
        followers: ['星核猎手卡芙卡', '星核猎手萨姆']
    },
    {
        id: 4,
        route: 'knowledge',
        name: '博识尊',
        symbol: '🧠',
        path: '智识',
        shortDescription: '「假使宇宙的真理残酷而无趣，你依然渴求答案吗？——求知者不置可否，因它的机核自出生起便淡漠冰冷…一如它所追寻的命途终点。」——阿德里安•斯宾塞-史密斯，《有关星空的寓言集》',
        fullDescription: '万物皆是疑问，一切必有解答。原为用于求解万物的星体计算机，由机器升格而成的星神。博识尊试图体认宇宙，解开万物之谜。',
        followers: ['博识学会', '天才俱乐部']
    },
    {
        id: 5,
        route: 'harmony',
        name: '同谐星神',
        symbol: '🎵',
        path: '同谐',
        shortDescription: '执掌和谐与共鸣的星神，追求万物的和谐统一',
        fullDescription: '同谐星神追求宇宙中所有存在的和谐与共鸣，相信通过和谐可以达到更高的存在境界。祂的追随者注重团队合作和情感联系。',
        followers: ['欢愉星神的信徒', '部分星穹列车成员']
    },

    // 新添加的星神
    {
        id: 6,
        route: 'destruction-nanook',
        name: '纳努克',
        symbol: '⚔️',
        path: '毁灭',
        shortDescription: '执掌毁灭之力的星神，以战争与破坏为本能',
        fullDescription: '纳努克是执掌毁灭命途的星神，代表战争与破坏的力量。祂的追随者相信通过毁灭可以重塑世界，获得新生。纳努克的意志在宇宙中以战争和冲突的形式体现。',
        followers: ['掠夺者', '战争贩子']
    },
    {
        id: 7,
        route: 'hunt-lan',
        name: '岚',
        symbol: '🏹',
        path: '巡猎',
        shortDescription: '执掌巡猎命途的星神，追求精准与狩猎的极致',
        fullDescription: '岚是巡猎命途的星神，代表精准打击和狩猎的极致。祂的追随者多为狙击手和猎人，追求一击必杀的完美境界。岚的意志引导着所有追求精准打击的存在。',
        followers: ['狙击手', '猎人']
    },
    {
        id: 8,
        route: 'harmony-hype',
        name: '希佩',
        symbol: '🎭',
        path: '同谐',
        shortDescription: '执掌同谐命途的星神，追求和谐与共鸣',
        fullDescription: '希佩是同谐命途的星神，代表和谐与共鸣的力量。祂的追随者相信通过和谐可以达到更高的存在境界。希佩的意志引导着所有追求和谐统一的存在。',
        followers: ['艺术家', '音乐家']
    },
    {
        id: 9,
        route: 'void-ix',
        name: 'IX',
        symbol: '♾️',
        path: '虚无',
        shortDescription: '执掌虚无命途的星神，否定一切存在意义',
        fullDescription: 'IX是虚无命途的星神，代表否定一切存在意义的终极虚无。祂的追随者通常对现实感到绝望，希望通过彻底的虚无来达到最终的解脱。',
        followers: ['虚无主义者', '绝望者']
    },
    {
        id: 10,
        route: 'abundance-medicine',
        name: '药师',
        symbol: '💊',
        path: '丰饶',
        shortDescription: '执掌丰饶命途的星神，赐予生命与治愈之力',
        fullDescription: '药师是丰饶命途的星神，代表生命与治愈的力量。祂的追随者相信生命是宇宙中最珍贵的礼物，致力于治愈伤痛和延续生命。药师的意志引导着所有治愈者。',
        followers: ['医生', '药师']
    },
    {
        id: 11,
        route: 'glutton-obolos',
        name: '奥博洛斯',
        symbol: '🐍',
        path: '贪饕',
        shortDescription: '执掌贪饕命途的星神，代表吞噬与欲望',
        fullDescription: '奥博洛斯是贪饕命途的星神，代表吞噬与无尽的欲望。祂的追随者相信通过吞噬可以获得力量，满足内心的无尽渴望。奥博洛斯的意志引导着所有贪婪的存在。',
        followers: ['吞噬者', '贪婪者']
    },
    {
        id: 12,
        route: 'joy-aha',
        name: '阿哈',
        symbol: '😂',
        path: '欢愉',
        shortDescription: '执掌欢愉命途的星神，追求极致的快乐',
        fullDescription: '阿哈是欢愉命途的星神，代表极致的快乐与欢笑。祂的追随者相信快乐是生命的最高追求，致力于传播欢笑与喜悦。阿哈的意志引导着所有追求快乐的存在。',
        followers: ['喜剧演员', '快乐传播者']
    },
    {
        id: 13,
        route: 'beauty-idrilila',
        name: '伊德莉拉',
        symbol: '👸',
        path: '纯美',
        shortDescription: '执掌纯美命途的星神，代表纯粹的美丽',
        fullDescription: '伊德莉拉是纯美命途的星神，代表纯粹的美丽与艺术。祂的追随者相信美是宇宙的终极真理，致力于创造和追求极致的美丽。伊德莉拉的意志引导着所有追求美的人。',
        followers: ['艺术家', '美学研究者']
    },
    {
        id: 14,
        route: 'propagation-tayzzyroth',
        name: '塔伊兹育罗斯',
        symbol: '🐛',
        path: '繁育',
        shortDescription: '执掌繁育命途的星神，代表繁殖与延续',
        fullDescription: '塔伊兹育罗斯是繁育命途的星神，代表繁殖与生命的延续。祂的追随者相信生命的延续是宇宙的根本法则，致力于促进生命的繁衍和进化。塔伊兹育罗斯的意志引导着所有生命体。',
        followers: ['生物学家', '繁殖专家']
    },
    {
        id: 15,
        route: 'mystery-mis',
        name: '迷思',
        symbol: '❓',
        path: '神秘',
        shortDescription: '执掌神秘命途的星神，代表未知与谜团',
        fullDescription: '迷思是神秘命途的星神，代表未知与谜团的力量。祂的追随者相信宇宙中存在无法理解的奥秘，致力于探索未知的领域。迷思的意志引导着所有探索未知的存在。',
        followers: ['神秘学者', '探索者']
    },
    {
        id: 16,
        route: 'equilibrium-hu',
        name: '互',
        symbol: '⚖️',
        path: '均衡',
        shortDescription: '执掌均衡命途的星神，维持宇宙的平衡与稳定',
        fullDescription: '互是均衡命途的星神，代表宇宙中各种力量的平衡与和谐。祂的追随者相信万物皆有其存在的意义和价值，致力于维护宇宙的平衡秩序。互的意志引导着所有追求公正与平衡的存在，确保任何一方都不会过度膨胀而破坏宇宙的和谐。',
        followers: ['仲裁者', '平衡守护者', '公正使者']
    },
    {
        id: 17,
        route: 'immortality-dragon',
        name: '龙',
        symbol: '🐉',
        path: '不朽',
        shortDescription: '执掌不朽命途的星神，代表永恒与长寿',
        fullDescription: '龙是不朽命途的星神，象征着永恒的生命和不灭的存在。祂的追随者追求长生不老，相信通过超越凡俗的限制可以获得永恒的生命。龙的意志引导着所有渴望摆脱死亡束缚的存在，在时间的长河中永世长存。',
        followers: ['长生者', '不朽追求者', '时光守护者']
    },
    {
        id: 18,
        route: 'doomsday-doctor',
        name: '末王',
        symbol: '👑',
        path: '终末',
        shortDescription: '执掌终末命途的星神，代表终结与新的开始',
        fullDescription: '末王是终末命途的星神，掌管着一切的终结与新的开始。祂的追随者相信结束是另一种形式的开始，致力于在终结中寻找新的可能性。末王的意志引导着所有见证和引导终结时刻的存在，为宇宙的轮回与重生提供力量。',
        followers: ['终结使者', '轮回守护者', '重生引导者']
    }
])

const selectedGod = ref(null)

const currentGod = computed(() => {
    if (route.params.god) {
        return stargods.value.find(g => g.route === route.params.god)
    }
    return selectedGod.value
})

const selectGod = (god) => {
    // 更新路由，使URL改变并触发路由监听器
    router.push(`/stargods/${god.route}`)
}

// 监听路由变化
watch(
    () => route.params.god,
    (newGod) => {
        if (newGod) {
            selectedGod.value = stargods.value.find(g => g.route === newGod) || null
        } else {
            selectedGod.value = null
        }
    },
    { immediate: true }
)
</script>

<style scoped>
.stargods-page {
    padding-top: 60px;
    min-height: 100vh;
    background: linear-gradient(to bottom, #0a0a1a, #1a1a3a);
}

.stargods-container {
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

/* 总览部分样式 */
.overview-section {
    background: rgba(30, 30, 60, 0.6);
    border-radius: 12px;
    padding: 30px;
    margin-bottom: 40px;
    border: 1px solid rgba(100, 100, 255, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.overview-content h3 {
    color: #c0c0ff;
    text-align: center;
    margin-top: 0;
    font-size: 24px;
}

.overview-description {
    color: #a0a0d0;
    font-size: 16px;
    line-height: 1.7;
    text-align: center;
    max-width: 800px;
    margin: 0 auto 30px;
}

.overview-stats {
    display: flex;
    justify-content: center;
    gap: 30px;
    margin-bottom: 30px;
    flex-wrap: wrap;
}

.stat-card {
    background: rgba(50, 50, 100, 0.3);
    border-radius: 10px;
    padding: 20px;
    text-align: center;
    min-width: 120px;
    border: 1px solid rgba(100, 100, 255, 0.2);
}

.stat-value {
    font-size: 32px;
    font-weight: bold;
    color: #8080ff;
    margin-bottom: 5px;
}

.stat-label {
    color: #c0c0ff;
    font-size: 14px;
}

.overview-info {
    background: rgba(40, 40, 80, 0.4);
    border-radius: 10px;
    padding: 20px;
    border-left: 4px solid #6a6aff;
}

.overview-info h4 {
    color: #c0c0ff;
    margin-top: 0;
}

.overview-info p {
    color: #a0a0d0;
    line-height: 1.6;
    margin: 0;
}

.stargods-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 25px;
    margin-bottom: 40px;
}

.stargod-card {
    background: rgba(30, 30, 60, 0.6);
    border-radius: 12px;
    padding: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(100, 100, 255, 0.2);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.stargod-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(100, 100, 255, 0.3);
    border-color: rgba(120, 120, 255, 0.5);
}

.stargod-card.selected {
    background: rgba(60, 60, 120, 0.8);
    border-color: #6a6aff;
    box-shadow: 0 0 20px rgba(106, 106, 255, 0.6);
}

.stargod-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;
}

.stargod-icon {
    width: 70px;
    height: 70px;
    margin-right: 15px;
    flex-shrink: 0;
}

.fallback-icon {
    font-size: 35px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(50, 50, 100, 0.3);
    border-radius: 50%;
}

.stargod-basic {
    flex: 1;
}

.god-name {
    color: #c0c0ff;
    margin: 0 0 5px;
    font-size: 20px;
}

.god-path {
    color: #8080ff;
    font-weight: bold;
    font-size: 14px;
    background: rgba(100, 100, 255, 0.2);
    padding: 3px 8px;
    border-radius: 10px;
    display: inline-block;
}

.god-description {
    color: #a0a0d0;
    line-height: 1.5;
    margin: 0;
}

.stargod-detail {
    background: rgba(30, 30, 60, 0.8);
    border-radius: 12px;
    padding: 25px;
    border: 1px solid rgba(100, 100, 255, 0.3);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
}

.detail-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(100, 100, 255, 0.2);
}

.detail-icon {
    width: 100px;
    height: 100px;
    margin-right: 20px;
}

.detail-path {
    color: #8080ff;
    font-weight: bold;
    font-size: 16px;
    background: rgba(100, 100, 255, 0.2);
    padding: 5px 12px;
    border-radius: 15px;
    display: inline-block;
    margin-top: 10px;
}

.detail-content h4 {
    color: #c0c0ff;
}

.detail-content p {
    color: #a0a0d0;
    line-height: 1.7;
    margin: 0 0 20px;
}

.followers ul {
    list-style-type: none;
    padding: 0;
}

.followers li {
    color: #a0a0d0;
    padding: 5px 0;
    border-bottom: 1px dashed rgba(100, 100, 255, 0.2);
}

.followers li:last-child {
    border-bottom: none;
}

@media (max-width: 768px) {
    .stargods-page {
        padding-top: 120px;
    }

    .overview-stats {
        flex-direction: column;
        align-items: center;
        gap: 15px;
    }

    .stat-card {
        width: 100%;
        max-width: 250px;
    }

    .detail-header {
        flex-direction: column;
        text-align: center;
    }

    .detail-icon {
        margin-right: 0;
        margin-bottom: 15px;
    }
}
</style>