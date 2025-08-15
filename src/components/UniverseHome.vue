<template>
    <AppHeader />
    <div class="infinite-scroll-container">
        <div ref="containerRef" class="photos" @mousedown="handleMouseDown" @mousemove="handleMouseMove"
            @mouseup="handleMouseUp" @mouseleave="handleMouseLeave">
            <!-- 15个交互图标 -->
            <div v-for="(icon, index) in interactiveIcons" :key="index" class="interactive-icon"
                :class="{ 'is-moving': isMoving }" :style="{
                    left: icon.x + 'px',
                    top: icon.y + 'px'
                }" @click="handleIconClick(icon)" @mouseenter="handleIconHover(icon, true)"
                @mouseleave="handleIconHover(icon, false)">
                <img :src="icon.image" :alt="icon.alt" class="icon-image" :class="{
                    'hovered': icon.isHovered,
                    'pulsing': !icon.isHovered
                }" v-if="icon.image && icon.imageLoaded !== false" />
                <!-- 如果图片加载失败或没有图片，显示默认符号 -->
                <div v-else class="fallback-icon" :class="{
                    'hovered': icon.isHovered,
                    'pulsing': !icon.isHovered
                }">
                    {{ icon.fallbackSymbol || '⭐' }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'
import { useRouter } from 'vue-router'
import AppHeader from '@/components/AppHeader.vue'

// 导入图片
import ahaImage from '@/assets/aha.webp'
import boshijunImage from '@/assets/boshijun.webp'
import cunhuImage from '@/assets/cunhu.webp'
import fanyuImage from '@/assets/fanyu.webp'
import fengraoImage from '@/assets/fengrao.webp'
import fuliImage from '@/assets/fuli.webp'
import huImage from '@/assets/hu.webp'
import huimieImage from '@/assets/huimie.webp'
import longImage from '@/assets/long.jpeg'
import misiImage from '@/assets/misi.webp'
import tantaoImage from '@/assets/tantao.webp'
import tongxieImage from '@/assets/tongxie.webp'
import xunlieImage from '@/assets/xunlie.webp'
import xuwuImage from '@/assets/xuwu.webp'
import zhixuImage from '@/assets/zhixu.webp'
import backgroundImage from '@/assets/background.jpg'

const containerRef = ref(null)
const router = useRouter()
const isMoving = ref(false)

// 交互图标数据 - 使用固定位置和导入的图片
const interactiveIcons = reactive([
    {
        id: 1,
        image: ahaImage,
        alt: 'Universe',
        page: '/universe',
        x: 1000,
        y: 10,
        imageLoaded: true,
        fallbackSymbol: '🌌'
    },
    { id: 2, image: boshijunImage, alt: 'Boshijun', page: '/stargods/knowledge', x: 40, y: 100, imageLoaded: true, fallbackSymbol: '🚀' },
    { id: 3, image: cunhuImage, alt: 'Cunhu', page: '/planets', x: 700, y: 0, imageLoaded: true, fallbackSymbol: '🪐' },
    { id: 4, image: fanyuImage, alt: 'Fanyu', page: '/meteors', x: 200, y: 300, imageLoaded: true, fallbackSymbol: '🌠' },
    { id: 5, image: fengraoImage, alt: 'Fengrao', page: '/stars', x: 600, y: 350, imageLoaded: true, fallbackSymbol: '⭐' },
    { id: 6, image: fuliImage, alt: 'Fuli', page: '/earth', x: 300, y: 550, imageLoaded: true, fallbackSymbol: '🌍' },
    { id: 7, image: huImage, alt: 'Hu', page: '/aliens', x: 1500, y: 700, imageLoaded: true, fallbackSymbol: '👽' },
    { id: 8, image: huimieImage, alt: 'Huimie', page: '/telescope', x: 700, y: 800, imageLoaded: true, fallbackSymbol: '🔭' },
    { id: 9, image: longImage, alt: 'Long', page: '/moon', x: 1550, y: 40, imageLoaded: true, fallbackSymbol: '🌙' },
    { id: 10, image: misiImage, alt: 'Misi', page: '/sun', x: 250, y: 2050, imageLoaded: true, fallbackSymbol: '🌞' },
    { id: 11, image: tantaoImage, alt: 'Tantao', page: '/comets', x: 375, y: 70, imageLoaded: true, fallbackSymbol: '☄️' },
    { id: 12, image: tongxieImage, alt: 'Tongxie', page: '/satellites', x: 1400, y: 400, imageLoaded: true, fallbackSymbol: '🛰️' },
    { id: 13, image: xunlieImage, alt: 'Xunlie', page: '/galaxies', x: 950, y: 250, imageLoaded: true, fallbackSymbol: '🌌' },
    { id: 14, image: xuwuImage, alt: 'Xuwu', page: '/observatory', x: 400, y: 750, imageLoaded: true, fallbackSymbol: '🔭' },
    { id: 15, image: zhixuImage, alt: 'Zhixu', page: '/ufo', x: 1100, y: 500, imageLoaded: true, fallbackSymbol: '🛸' }
])

// 状态管理
const photobox = reactive({
    containerWidth: 0,
    containerHeight: 0,
    isMovable: false,
    mouseX: 0,
    mouseY: 0,
    standardWidth: 1440,
    scaleNums: 1
})

// 初始化
const init = () => {
    resize()
}

// 调整大小
const resize = () => {
    if (!containerRef.value) return

    photobox.containerWidth = containerRef.value.offsetWidth
    photobox.containerHeight = containerRef.value.offsetHeight
    photobox.scaleNums = document.body.offsetWidth / photobox.standardWidth
}

// 鼠标事件处理
const handleMouseDown = (event) => {
    photobox.isMovable = true
    isMoving.value = true
    photobox.mouseX = event.clientX
    photobox.mouseY = event.clientY
    event.preventDefault()
}

const handleMouseMove = (event) => {
    if (!photobox.isMovable) return
    move(event.clientX, event.clientY)
    event.preventDefault()
}

const handleMouseUp = () => {
    photobox.isMovable = false
    isMoving.value = false
}

const handleMouseLeave = () => {
    photobox.isMovable = false
    isMoving.value = false
}

// 图标悬停处理
const handleIconHover = (icon, isHovered) => {
    icon.isHovered = isHovered
}

// 移动处理
let moveAnimationFrame = null

const move = (x, y) => {
    // 使用 requestAnimationFrame 优化性能
    if (moveAnimationFrame) {
        cancelAnimationFrame(moveAnimationFrame)
    }

    moveAnimationFrame = requestAnimationFrame(() => {
        if (!photobox.isMovable) return

        const distanceX = (x - photobox.mouseX) / photobox.scaleNums
        const distanceY = (y - photobox.mouseY) / photobox.scaleNums

        // 移动图标
        interactiveIcons.forEach(icon => {
            icon.x += distanceX
            icon.y += distanceY

            // 图标无限滚动
            if (photobox.containerWidth > 0 && photobox.containerHeight > 0) {
                if (icon.x > photobox.containerWidth) {
                    icon.x -= photobox.containerWidth + 200
                }
                if (icon.x < -200) {
                    icon.x += photobox.containerWidth + 200
                }
                if (icon.y > photobox.containerHeight) {
                    icon.y -= photobox.containerHeight + 200
                }
                if (icon.y < -200) {
                    icon.y += photobox.containerHeight + 200
                }
            }
        })

        photobox.mouseX = x
        photobox.mouseY = y
    })
}

// 图标点击处理
const handleIconClick = (icon) => {
    router.push(icon.page)
}

// 窗口大小调整处理
const handleResize = () => {
    resize()
}

onMounted(() => {
    init()
    window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
    window.removeEventListener('resize', handleResize)
    if (moveAnimationFrame) {
        cancelAnimationFrame(moveAnimationFrame)
    }
})
</script>

<style scoped>
* {
    padding: 0;
    margin: 0;
}

.infinite-scroll-container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100vh;
    background-color: #171717;
    overflow: hidden;
    background-image: url('@/assets/background.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
}

div {
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
}

.photos {
    position: absolute;
    width: 100%;
    height: 100%;
    overflow: hidden;
    cursor: grab;
    transform-origin: center center;
}

.photos:active {
    cursor: grabbing;
}

.interactive-icon {
    position: absolute;
    width: 200px;
    height: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    z-index: 10;
    transition: transform 0.3s ease;
    transform-origin: center;
    will-change: transform;
}

.interactive-icon:hover {
    transform: scale(1.15);
    z-index: 20;
}

/* 脉冲动画 */
@keyframes pulse {
    0% {
        transform: scale(1);
        filter: brightness(1);
    }

    50% {
        transform: scale(1.05);
        filter: brightness(1.2);
    }

    100% {
        transform: scale(1);
        filter: brightness(1);
    }
}


/* 漂浮动画 */
@keyframes float {
    0% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-10px);
    }

    100% {
        transform: translateY(0px);
    }
}

/* 悬停效果 */
.icon-image.hovered,
.fallback-icon.hovered {
    animation: rotate 2s linear infinite;
    filter: drop-shadow(0 0 10px rgba(255, 255, 255, 0.8));
}

/* 脉冲效果（非悬停时） */
.icon-image.pulsing,
.fallback-icon.pulsing {
    animation: pulse 2s infinite;
}

/* 移动时的效果 */
.interactive-icon.is-moving .icon-image,
.interactive-icon.is-moving .fallback-icon {
    animation: float 3s ease-in-out infinite;
}

.icon-image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    transition: all 0.3s ease;
}

.fallback-icon {
    font-size: 80px;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #ffffff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
    transition: all 0.3s ease;
}

/* 特殊图标效果 */
.interactive-icon:nth-child(3n+1) .icon-image.pulsing,
.interactive-icon:nth-child(3n+1) .fallback-icon.pulsing {
    animation: pulse 1.5s infinite;
}

.interactive-icon:nth-child(3n+2) .icon-image.pulsing,
.interactive-icon:nth-child(3n+2) .fallback-icon.pulsing {
    animation: pulse 2s infinite 0.5s;
}

.interactive-icon:nth-child(3n+3) .icon-image.pulsing,
.interactive-icon:nth-child(3n+3) .fallback-icon.pulsing {
    animation: pulse 2.5s infinite 1s;
}
</style>