<!-- src/components/Glossary.vue (更新版) -->
<template>
    <div class="glossary-page">
        <AppHeader />
        <div class="glossary-container">
            <h2 class="section-title">名词解释</h2>
            <div class="search-box">
                <input type="text" v-model="searchTerm" placeholder="搜索名词..." class="search-input">
            </div>

            <div class="glossary-list">
                <div v-for="term in filteredTerms" :key="term.id" class="glossary-item"
                    :class="{ 'expanded': expandedTerms.includes(term.id) || route.params.term === term.route }"
                    @click="toggleTerm(term.id)">
                    <div class="term-header">
                        <h3 class="term-name">{{ term.name }}</h3>
                        <span class="expand-indicator">{{ expandedTerms.includes(term.id) || route.params.term ===
                            term.route ? '−' : '+' }}</span>
                    </div>
                    <div v-show="expandedTerms.includes(term.id) || route.params.term === term.route"
                        class="term-definition">
                        <p>{{ term.definition }}</p>
                        <div v-if="term.example" class="term-example">
                            <strong>示例：</strong>{{ term.example }}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

const route = useRoute()
const searchTerm = ref('')
const expandedTerms = ref([])

const glossaryTerms = ref([
    {
        id: 1,
        route: 'stellaron',
        name: '星核',
        definition: '一种神秘的宇宙现象，会在星球上随机出现并带来毁灭性后果。星核拥有强大的能量，会吸引星神的注意。',
        example: '贝洛伯格星球就是因为星核的出现而被毁灭的威胁笼罩。'
    },
    {
        id: 2,
        route: 'aether',
        name: '以太',
        definition: '构成宇宙的基本能量形式，是驱动各种科技和神秘力量的基础。',
        example: '星穹列车的引擎就是以太驱动的。'
    },
    {
        id: 3,
        route: 'constellation',
        name: '星宿',
        definition: '在占星术中具有特殊意义的星体排列，被认为会影响命运。',
        example: '占星师会根据星宿的位置来预测未来。'
    },
    {
        id: 4,
        route: 'path',
        name: '命途',
        definition: '星神所执掌的宇宙法则，每个星神都代表一种命途。生命可以通过信仰星神来获得对应命途的力量。',
        example: '开拓命途、毁灭命途、存护命途等都是不同的命途类型。'
    }
])

const filteredTerms = computed(() => {
    if (!searchTerm.value) return glossaryTerms.value

    const term = searchTerm.value.toLowerCase()
    return glossaryTerms.value.filter(item =>
        item.name.toLowerCase().includes(term) ||
        item.definition.toLowerCase().includes(term)
    )
})

const toggleTerm = (termId) => {
    const index = expandedTerms.value.indexOf(termId)
    if (index > -1) {
        expandedTerms.value.splice(index, 1)
    } else {
        expandedTerms.value.push(termId)
    }
}

// 监听路由变化
watch(
    () => route.params.term,
    (newTerm) => {
        if (newTerm) {
            const term = glossaryTerms.value.find(t => t.route === newTerm)
            if (term && !expandedTerms.value.includes(term.id)) {
                expandedTerms.value.push(term.id)
            }
        }
    },
    { immediate: true }
)
</script>

<style scoped>
.glossary-page {
    padding-top: 60px;
    min-height: 100vh;
    background: linear-gradient(to bottom, #0a0a1a, #1a1a3a);
}

.glossary-container {
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

.search-box {
    margin-bottom: 30px;
    text-align: center;
}

.search-input {
    width: 100%;
    max-width: 400px;
    padding: 12px 20px;
    font-size: 16px;
    border-radius: 30px;
    border: 2px solid rgba(100, 100, 255, 0.3);
    background: rgba(20, 20, 40, 0.7);
    color: #ffffff;
    outline: none;
    transition: all 0.3s ease;
}

.search-input:focus {
    border-color: #6a6aff;
    box-shadow: 0 0 15px rgba(106, 106, 255, 0.5);
}

.glossary-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.glossary-item {
    background: rgba(30, 30, 60, 0.6);
    border-radius: 12px;
    overflow: hidden;
    transition: all 0.3s ease;
    border: 1px solid rgba(100, 100, 255, 0.2);
    cursor: pointer;
}

.glossary-item:hover {
    border-color: rgba(120, 120, 255, 0.5);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

.glossary-item.expanded {
    background: rgba(40, 40, 80, 0.8);
    border-color: #6a6aff;
    box-shadow: 0 0 20px rgba(106, 106, 255, 0.4);
}

.term-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px;
}

.term-name {
    color: #c0c0ff;
    margin: 0;
    font-size: 20px;
}

.expand-indicator {
    font-size: 24px;
    color: #8080ff;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.term-definition {
    padding: 0 20px 20px;
    border-top: 1px solid rgba(100, 100, 255, 0.2);
}

.term-definition p {
    color: #a0a0d0;
    line-height: 1.7;
    margin: 15px 0;
}

.term-example {
    color: #9090c0;
    font-style: italic;
    padding: 10px;
    background: rgba(50, 50, 100, 0.2);
    border-radius: 8px;
    margin-top: 10px;
}

@media (max-width: 768px) {
    .glossary-page {
        padding-top: 120px;
    }
}
</style>