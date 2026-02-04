<template>
    <canvas ref="canvas"></canvas>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useAudio } from '../composables/useAudio'

const { getFrequency } = useAudio()
const canvas = ref<HTMLCanvasElement>()

onMounted(() => {
    const c = canvas.value!
    const ctx = c.getContext('2d')!

    const resize = () => {
        c.width = window.innerWidth
        c.height = window.innerHeight
    }
    window.addEventListener('resize', resize)
    resize()

    function draw() {
        const freq = getFrequency()
        const w = c.width
        const h = c.height

        ctx.fillStyle = 'rgba(11, 11, 12, 0.2)'
        ctx.fillRect(0, 0, w, h)

        const dataLength = Math.floor(freq.length * 0.7)
        const barWidth = w / dataLength

        for (let i = 0; i < dataLength; i++) {
            const value = freq[i] ?? 0
            const percent = value / 255
            const barHeight = h * percent * 0.6

            const hue = 40 + (i / dataLength) * 20
            const light = 20 + percent * 60

            ctx.fillStyle = `hsl(${hue}, 80%, ${light}%)`
            ctx.fillRect(i * barWidth, h - barHeight, barWidth + 1, barHeight)

            ctx.fillStyle = `hsla(${hue}, 80%, ${light}%, 0.1)`
            ctx.fillRect(i * barWidth, h - barHeight - 10, barWidth + 1, -barHeight * 0.5)
        }

        requestAnimationFrame(draw)
    }

    draw()
})
</script>

<style scoped>
canvas {
    position: fixed;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    opacity: 0.6;
}
</style>