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

                    <!-- 显示相同命途的星神 -->
                    <div class="related-section" v-if="relatedGods.length > 1">
                        <h4>同命途星神</h4>
                        <div class="related-gods">
                            <div v-for="god in relatedGods" :key="god.id" class="related-god-card"
                                :class="{ 'current': god.id === currentGod.id }" @click="selectGod(god)">
                                <div class="related-god-icon">
                                    <div class="fallback-icon">{{ god.symbol }}</div>
                                </div>
                                <div class="related-god-name">{{ god.name }}</div>
                            </div>
                        </div>
                    </div>

                    <!-- 显示相关派系 -->
                    <div class="related-section" v-if="relatedFactions.length > 0">
                        <h4>相关派系</h4>
                        <div class="related-factions">
                            <div v-for="faction in relatedFactions" :key="faction.id" class="related-faction-card"
                                @click="goToFaction(faction)">
                                <div class="related-faction-icon">
                                    <div class="fallback-icon">{{ faction.symbol }}</div>
                                </div>
                                <div class="related-faction-name">{{ faction.name }}</div>
                            </div>
                        </div>
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
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const router = useRouter()

const allFactions = [
    { id: 1, name: '星穹列车', symbol: '🚂', path: '开拓', route: 'astral-trailblazers' },
    { id: 2, name: '仙舟联盟', symbol: '⛩️', path: '巡猎', route: 'xianzhou-alliance' },
    { id: 3, name: '星核猎手', symbol: '🎯', path: '终末', route: 'stellaron-hunters' },
    { id: 4, name: '星际和平公司', symbol: '🏢', path: '存护', route: 'ipc' },
    { id: 5, name: '无名客', symbol: '🚀', path: '开拓', route: 'nameless' },
    { id: 6, name: '巡海游侠', symbol: '🏹', path: '巡猎', route: 'xianzhou-hunters' },
    { id: 7, name: '混沌医师', symbol: '⚕️', path: '虚无', route: 'chaos-doctors' },
    { id: 8, name: '第IX机关', symbol: '9️⃣', path: '虚无', route: 'ninth-ix' },
    { id: 9, name: '自灭者', symbol: '💣', path: '虚无', route: 'self-annihilators' },
    { id: 10, name: '丰饶之民', symbol: '🌱', path: '丰饶', route: 'abundance-folk' },
    { id: 11, name: '求药使', symbol: '💊', path: '丰饶', route: 'medicine-seekers' },
    { id: 12, name: '反物质军团', symbol: '⚛️', path: '毁灭', route: 'anti-matter-army' },
    { id: 13, name: '泯灭帮', symbol: '🔥', path: '毁灭', route: 'merger-gang' },
    { id: 14, name: '家族', symbol: '👨‍👩‍👧‍👦', path: '同谐', route: 'families' },
    { id: 15, name: '天才俱乐部', symbol: '🧠', path: '智识', route: 'genius-society' },
    { id: 16, name: '博识学会', symbol: '📚', path: '智识', route: 'lore-seeking-society' },
    { id: 17, name: '源究森林', symbol: '🌳', path: '智识', route: 'origin-forest' },
    { id: 18, name: '筑城者', symbol: '🏗️', path: '存护', route: 'city-builders' },
    { id: 19, name: '石心十人', symbol: '💎', path: '存护', route: 'stone-hearts' },
    { id: 20, name: '虫群', symbol: '🐛', path: '繁育', route: 'swarm' },
    { id: 21, name: '流光忆庭', symbol: '💭', path: '记忆', route: 'memory-garden' },
    { id: 22, name: '焚化工', symbol: '🔥', path: '记忆', route: 'incinerators' },
    { id: 23, name: '悲悼伶人', symbol: '🎭', path: '欢愉', route: 'mournful-performers' },
    { id: 24, name: '假面愚者', symbol: '🃏', path: '欢愉', route: 'masked-fools' },
    { id: 25, name: '揽镜人', symbol: '🪞', path: '纯美', route: 'mirror-gazers' },
    { id: 26, name: '纯美骑士团', symbol: '🐴', path: '纯美', route: 'purebeast-knights' },
    { id: 27, name: '虚构史学家', symbol: '📜', path: '神秘', route: 'fiction-historians' },
    { id: 28, name: '谜语人', symbol: '❓', path: '神秘', route: 'riddle-keepers' },
    { id: 29, name: '仲裁官', symbol: '⚖️', path: '均衡', route: 'arbiters' },
    { id: 30, name: '丹轮寺', symbol: '🛕', path: '均衡', route: 'danlun-temple' },
    { id: 31, name: '天外合唱班', symbol: '🎵', path: '秩序', route: 'heavenly-choir' },
    { id: 32, name: '厄兆先锋', symbol: '⚔️', path: '终末', route: 'doom-harbinger' },
    { id: 33, name: '葬仪知宾', symbol: '⚰️', path: '终末', route: 'funeral-ushers' }
];

const stargods = ref([
    // 已存在的星神
    {
        id: 1,
        route: 'pioneer',
        name: '阿基维利（已陨）',
        symbol: '🌌',
        path: '开拓',
        shortDescription: '「无数流星划过今夜的天空…如果选中了正确的那一颗，它将把你的愿望带向千百个世界。」——阿德里安·斯宾塞-史密斯《有关星空的寓言集》',
        fullDescription: '命运的罗盘上标着三个方向：未知、已知和不可知。可以忍受「未知」，却绝不能屈服于「不可知」。阿基维利离开孤绝世界裴伽纳，不断开拓着宇宙未知的边界，试图找寻存在之树的端点。但祂的命运因意外而终结。',
        followers: ['星穹列车', '无名客']
    },
    {
        id: 2,
        route: 'preservation',
        name: '克里珀',
        symbol: '🛡️',
        path: '存护',
        shortDescription: '「哲思者仰望星河，探求文明的终极目标——『筑墙，』雄浑的回声响彻脑海：『筑墙。』」——阿德里安·斯宾塞-史密斯《有关星空的寓言集》',
        fullDescription: '天彗星墙、亚空晶壁、巨引源基盘的砌造者，崇拜者称其「琥珀王」。其为更古老的「黄昏战争」的幸存者。祂知晓大敌的吞噬迫在眉睫。因此不得不以光年为单位铸造障壁加以封印，隔绝保护尚有生机的世界。',
        followers: ['星际和平公司', '筑城者']
    },
    {
        id: 3,
        route: 'memory-fuli',
        name: '浮离',
        symbol: '💭',
        path: '记忆',
        shortDescription: '「时间——世上最勤劳的窃贼。它不断偷走我们的当下，随手扔进名为『记忆』的仓库。有人沉溺于招领失物…有人对遗失毫不在乎。」——佚名《此生苦短》',
        fullDescription: '世间再无比纯粹的记忆更加包容的存在：它记录一切，不嫌恶，不偏爱；它无私地保留每个基本的事实，每种绮丽的姿态；它是绵延的生命汇聚成的河流，是亘古的智慧堆砌成的宝藏。——而浮黎是溯游的鱼群，亦是宝库的钥匙。祂禅坐于净土中央，静观世间万物不知疲倦地重蹈覆辙。传说一切归于终寂之后，浮黎将以宇宙的记忆为蓝图，令诸界复生。',
        followers: ['流光忆庭', '焚化工']
    },
    {
        id: 4,
        route: 'knowledge',
        name: '博识尊',
        symbol: '🧠',
        path: '智识',
        shortDescription: '「假使宇宙的真理残酷而无趣，你依然渴求答案吗？——求知者不置可否，因它的机核自出生起便淡漠冰冷…一如它所追寻的命途终点。」——阿德里安•斯宾塞-史密斯，《有关星空的寓言集》',
        fullDescription: '万物皆是疑问，一切必有解答。原为用于求解万物的星体计算机，由机器升格而成的星神。博识尊试图体认宇宙，解开万物之谜。',
        followers: ['博识学会', '天才俱乐部', '源究森林']
    },
    {
        id: 5,
        route: 'order-taiyi',
        name: '太一（已陨）',
        symbol: '☯️',
        path: '秩序',
        shortDescription: '执掌「秩序」命途的古老星神，试图扭转万物不可避免的结局——走向无序。',
        fullDescription: '天外合唱班随祂而生，永世奏响着秩序的谐音。但当「秩序」被更为广义的「同谐」吸收时，天外合唱班失去了信仰，那曾经庄严井然的唱声也随之黯然，令群星沉默无言。仅有少数几张由爱好者录制的唱片仍流传于世，将它放入特制的唱机中，你将听见来自宇宙彼端的歌唱，饱含秩序的美好。',
        followers: ['天外合唱班']
    },
    {
        id: 6,
        route: 'destruction-nanook',
        name: '纳努克',
        symbol: '⚔️',
        path: '毁灭',
        shortDescription: '「如果熵增是宇宙不可逆转的法则，热寂是物质世界难以逃避的命运，那我们又何苦挣扎？燃烧，聚变，然后湮灭。若想迎接新生，就必先投身终结。」——收集自某位科学家按下核爆的按钮前，琥珀2152纪',
        fullDescription: '宇宙的诞生是一种错谬；文明若是浩瀚群星中悄然兴起的癌症，纷争即智慧生灵间唯一通行的语言。为了修正如是错误，抹去宇宙的污点，纳努克成为熵之化身。',
        followers: ['反物质军团', '泯灭帮']
    },
    {
        id: 7,
        route: 'hunt-lan',
        name: '岚',
        symbol: '🏹',
        path: '巡猎',
        shortDescription: '「仇忾无涯，征逐无疆，猎君几多愁？辰矢在弦，金瞳炽焱，帝弓莫回首。」——仙舟《寰宇通鉴》',
        fullDescription: '被称为帝弓司命的游弋星神，无止尽地游荡于诸世界之间，铲除曾荼毒其家园的不死孽物。岚的游猎从来不计代价，其拯救和破坏也几无差别。',
        followers: ['仙舟联盟', '巡海游侠']
    },
    {
        id: 8,
        route: 'harmony-hype',
        name: '希佩',
        symbol: '🎭',
        path: '同谐',
        shortDescription: '「普世同谐，群星共熠，无上功德颂神主！世人同袍，万物同根，赐福之风拂大地！」——《谐乐颂》第一乐章',
        fullDescription: '来自多个谐乐天体世界的集群星神。千面一体的希佩，宣唱着和谐一致的喜乐。为了对抗宇宙无情的法则，智慧生命需要抹煞孱弱的私欲与个体的差别，融入同一阙谐乐中——以强援弱，以死护生。',
        followers: ['家族']
    },
    {
        id: 9,
        route: 'void-ix',
        name: 'IX',
        symbol: '♾️',
        path: '虚无',
        shortDescription: '你尽可仰望璀璨的繁星，但切忌凝视虚无的深渊…那片黑雾中空无一物，仅一瞥便足以令凡人摒弃理智。」——混沌医师慕榕',
        fullDescription: '「虚无」的存在是一个谜，祂的形象被层层叠叠的迷雾包裹着。IX不与其它星神往来，祂相信多宇宙的本质乃是虚无，因而存在毫无价值。',
        followers: ['混沌医师', '自灭者', '第IX机关']
    },
    {
        id: 10,
        route: 'abundance-medicine',
        name: '药师',
        symbol: '💊',
        path: '丰饶',
        shortDescription: '「花儿肆意绽放，迎向无法逃避的凋零；鸟儿展翼啼唱，飞向无法逃避的坠落；溪儿潺潺淙淙，淌向无法逃避的干涸——缘何万物必要消亡？宇宙间必有一方灵药，足以医治名为『短寿』的顽疾。」——佚名《此生苦短》',
        fullDescription: '令诸有情，所求皆得。药师是众生哺育者，乐土之神，旨在令生命兴盛不熄。祂是从不拒绝祈愿，不忍视衰亡和病痛的星神。',
        followers: ['丰饶之民', '求药使']
    },
    {
        id: 11,
        route: 'glutton-obolos',
        name: '奥博洛斯',
        symbol: '🐍',
        path: '贪饕',
        shortDescription: '「虫蚁之于飞禽，野兔之于狼犬，星尘之于黑洞，诸界之于贪饕。」——仙舟《寰宇通鉴》',
        fullDescription: '诸界渴饮者，永无餍足的吞噬者，会思考的黑洞。既是星神，又是古兽的双重存在。在奥博洛斯看来，生命是虚空海洋中明灭的浮藻，终将随着诞生它们的星辰归于黑暗——这片黑暗就在祂的口中。',
        followers: []
    },
    {
        id: 12,
        route: 'joy-aha',
        name: '阿哈',
        symbol: '😂',
        path: '欢愉',
        shortDescription: '「智识是坨废铁，存护是个呆子；巡猎毫无幽默感，毁灭像个疯子。星神都一根筋，阿哈真没面子！」——某位通晓天文（自称）的假面愚者',
        fullDescription: '懂得欢乐是智慧生灵独有的权利。顽石与星辰都无从体察生命的幽默。寻求棋逢对手的敌人，寻求消磨光阴的游戏，寻求不问胜负的结局。寻求捧腹绝倒的笑谈，寻求阴差阳错的误会，寻求神思飞舞的歌谣。',
        followers: ['假面愚者', '悲悼怜人']
    },
    {
        id: 13,
        route: 'beauty-idrilila',
        name: '伊德莉拉（missing）',
        symbol: '👸',
        path: '纯美',
        shortDescription: '「几尺布绸为美，几行散诗为美，几串音符为美——欢迎来到『美』之赞誉一文不值的年代！庸俗，无奈，悲哀！」——《银河潮流指南》主编米舍利娜·冯·塔伦蒂诺',
        fullDescription: '在诡丽变幻的宇宙图景中，伊德莉拉窥见了世界存在的终极意义：人们谓之「美」的存在。星神「纯美」在某一日突然失踪，祂的消失与其诞生一样神秘。',
        followers: ['纯美骑士团', '揽镜人']
    },
    {
        id: 14,
        route: 'propagation-tayzzyroth',
        name: '塔伊兹育罗斯',
        symbol: '🐛',
        path: '繁育',
        shortDescription: '「如果正午的天边浮现了黑影，闭紧你的房门——那不是提前到来的夜色，而是饥肠辘辘的虫群。」——阿德里安·斯宾塞-史密斯《有关星空的寓言集》',
        fullDescription: '又称「虫皇」、「沙王」，寰宇蝗灾的创造者。作为统治大地的鞘翅目的最后一员，孤独的渴望点燃了祂的命途。塔伊兹育罗斯化为自我复制的恐怖，无尽繁衍的荒潮。祂——或者说——祂们横行诸界，直到命运以某种方式阻止了祂的前进。',
        followers: ['虫群']
    },
    {
        id: 15,
        route: 'mystery-mis',
        name: '迷思',
        symbol: '❓',
        path: '神秘',
        shortDescription: '「放弃追问如同豪雨放弃星辰的虔诚，放任隐喻的洪流穿过你的身体。你将看到星空尽头的真相，空萦玫瑰色的迷霁。」——星之桂冠诗人（自称）沙伦·莱德',
        fullDescription: '万物皆可体认乃是一派妄言，生命仅凭对规律的有限把握便开始推算未解之事，殊不知宇宙不可穷解，真理实是幻觉。为防止智识的确定性毁灭可能的变量，迷思降下思想之雾和感官之雨，通过色相、叠嶂、谜语、幻象，向世人昭示不可概述的真理。',
        followers: ['虚构史学家', '谜语人']
    },
    {
        id: 16,
        route: 'equilibrium-hu',
        name: '互',
        symbol: '⚖️',
        path: '均衡',
        shortDescription: '「我偷偷拿走金色的砝码，为激起的涟漪洋洋得意；祂总能看穿我的诡计，星星又将砝码归零。」——阿德里安·斯宾塞-史密斯《有关星空的寓言集》',
        fullDescription: '凡人挂于唇齿的因果链条，不过是对事态背后繁杂拓扑的粗略概括——「互」将自身的意志溶于宇宙运移逻辑的脉络之中，永恒维系着世间万物的平衡、稳固。好事者孜孜不倦地寻找系统中的纰漏，以为智慧凌驾于星神之上；殊不知自身早已沦为被监视的数串，逃不出祂编织的精密网络。',
        followers: ['仲裁官', '丹轮寺']
    },
    {
        id: 17,
        route: 'immortality-dragon',
        name: '龙（已陨）',
        symbol: '🐉',
        path: '不朽',
        shortDescription: '执掌「不朽」的古老星神，已陨。',
        fullDescription: '过去多以巨龙的形态现身，曾留下数目众多的子嗣，即「龙裔」。',
        followers: ['持明']
    },
    {
        id: 18,
        route: 'doomsday-doctor',
        name: '末王',
        symbol: '👑',
        path: '终末',
        shortDescription: '逆时而行的生物，执掌「终末」命途的星神，穿行于宙域之间的幽灵，喃喃宣布着必将实现的预言。',
        fullDescription: '末王的崇拜者致力于从末王意义不明的话语中解读末日的预言，等待着一生仅有一次的相遇。',
        followers: ['星核猎手', '葬仪知宾', '厄兆先锋']
    }
])

const selectedGod = ref(null)

const currentGod = computed(() => {
    if (route.params.god) {
        return stargods.value.find(g => g.route === route.params.god)
    }
    return selectedGod.value
})

// 计算相同命途的星神
const relatedGods = computed(() => {
    if (!currentGod.value) return []
    return stargods.value.filter(god => god.path === currentGod.value.path)
})

// 计算相关派系
const relatedFactions = computed(() => {
    if (!currentGod.value) return []
    return allFactions.filter(faction => faction.path === currentGod.value.path)
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
            // 修复这里的变量名错误：g.route 应该是 god.route
            selectedGod.value = stargods.value.find(god => god.route === newGod) || null
        } else {
            selectedGod.value = null
        }
    },
    { immediate: true }
)

// 添加跳转到派系详情的函数
const goToFaction = (faction) => {
    router.push(`/factions/${faction.route}`)
}

</script>

<style scoped>
.stargods-page {
    padding-top: 60px;
    min-height: 100vh;
    background: linear-gradient(to bottom, #0a0a1a, #1a1a3a);
}

/* 添加跳转链接样式 */
.related-god-card,
.related-faction-card {
    background: rgba(50, 50, 100, 0.3);
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(100, 100, 255, 0.2);
    min-width: 120px;
}

.related-god-card:hover,
.related-faction-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(100, 100, 255, 0.3);
    border-color: rgba(120, 120, 255, 0.5);
}

.related-god-card.current {
    background: rgba(60, 60, 120, 0.8);
    border-color: #6a6aff;
    box-shadow: 0 0 15px rgba(106, 106, 255, 0.6);
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
    margin-bottom: 40px;
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

/* 相关内容区域 */
.related-section {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid rgba(100, 100, 255, 0.2);
}

.related-section h4 {
    color: #c0c0ff;
    margin-top: 0;
    margin-bottom: 15px;
}

.related-gods,
.related-factions {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
}

.related-god-card,
.related-faction-card {
    background: rgba(50, 50, 100, 0.3);
    border-radius: 8px;
    padding: 15px;
    text-align: center;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(100, 100, 255, 0.2);
    min-width: 120px;
}

.related-god-card:hover,
.related-faction-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(100, 100, 255, 0.3);
    border-color: rgba(120, 120, 255, 0.5);
}

.related-god-card.current {
    background: rgba(60, 60, 120, 0.8);
    border-color: #6a6aff;
    box-shadow: 0 0 15px rgba(106, 106, 255, 0.6);
}

.related-god-icon,
.related-faction-icon {
    width: 50px;
    height: 50px;
    margin: 0 auto 10px;
}

.related-god-icon .fallback-icon,
.related-faction-icon .fallback-icon {
    font-size: 25px;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: rgba(50, 50, 100, 0.3);
    border-radius: 50%;
}

.related-god-name,
.related-faction-name {
    color: #c0c0ff;
    font-size: 14px;
    font-weight: 500;
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

    .related-god-card,
    .related-faction-card {
        min-width: 100px;
        padding: 10px;
    }
}
</style>