<template>
    <Waterfall />

    <div class="app-container">
        <header>
            <h1>Classic Music Player</h1>
            <p class="track-name">{{ currentTrack || 'Select a Vinyl Record' }}</p>
        </header>

        <main>
            <Turntable :playing="playing" @toggle="toggle" />
        </main>

        <div class="progress-bar-container" v-if="isLoaded">
            <span class="time-label">{{ formatTime(currentTime) }}</span>
            <input type="range" min="0" :max="duration || 100" :value="currentTime" @input="handleSeek"
                class="gold-slider progress-slider" />
            <span class="time-label">{{ formatTime(duration) }}</span>
        </div>

        <div class="controls-deck">
            <input type="file" id="audio-upload" accept="audio/*" @change="load" class="hidden-input" />
            <label for="audio-upload" class="icon-btn" title="Select Record">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="11" stroke="#bfa36a" stroke-width="2" fill="#1a1a1a" />
                    <circle cx="12" cy="12" r="7" stroke="#bfa36a" stroke-width="1" stroke-opacity="0.5" />
                    <circle cx="12" cy="12" r="3" fill="#bfa36a" />
                </svg>
            </label>

            <button @click="toggle" class="play-btn" :disabled="!isLoaded">
                <svg v-if="!playing" width="32" height="32" viewBox="0 0 24 24" fill="#0b0b0c">
                    <path d="M8 5v14l11-7z" />
                </svg>
                <svg v-else width="32" height="32" viewBox="0 0 24 24" fill="#0b0b0c">
                    <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                </svg>
            </button>

            <div class="volume-control">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#bfa36a" stroke-width="2">
                    <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                </svg>
                <input type="range" min="0" max="1" step="0.01" v-model="volume" @input="updateVolume"
                    class="gold-slider volume-slider" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import Turntable from './components/Turntable.vue'
import Waterfall from './components/Waterfall.vue'
import { useAudio } from './composables/useAudio'

const { audio, setVolume, currentTime, duration, seek, isEnded, fadeInPlay, fadeOutPause } = useAudio()
const playing = ref(false)
const isLoaded = ref(false)
const currentTrack = ref('')
const volume = ref(0.8)

watch(isEnded, (val) => { if (val) playing.value = false })

function load(e: any) {
    const file = e.target.files[0]
    if (!file) return
    currentTrack.value = file.name.replace(/\.[^/.]+$/, "")
    audio.src = URL.createObjectURL(file)
    isLoaded.value = true
    isEnded.value = false

    playing.value = true
    fadeInPlay()
}

async function toggle() {
    if (!isLoaded.value) return

    if (playing.value) {
        fadeOutPause()
        playing.value = false
    } else {
        if (isEnded.value) {
            seek(0)
            isEnded.value = false
        }
        await fadeInPlay()
        playing.value = true
    }
}

function updateVolume() { setVolume(volume.value) }

function handleSeek(e: Event) {
    const target = e.target as HTMLInputElement
    const time = parseFloat(target.value)
    seek(time)
}

function formatTime(seconds: number) {
    if (!seconds || isNaN(seconds)) return '00:00'
    const m = Math.floor(seconds / 60)
    const s = Math.floor(seconds % 60)
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
}
</script>

<style scoped>
.app-container {
    position: relative;
    z-index: 10;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;
    padding-bottom: 50px;
}

header {
    text-align: center;
    color: #bfa36a;
}

h1 {
    font-size: 1.5rem;
    letter-spacing: 4px;
    font-weight: 400;
    opacity: 0.8;
    margin: 0;
}

.track-name {
    margin-top: 10px;
    font-size: 1.2rem;
    color: #e5d8b0;
    font-style: italic;
    text-shadow: 0 0 10px rgba(191, 163, 106, 0.3);
}

.progress-bar-container {
    display: flex;
    align-items: center;
    gap: 15px;
    width: 360px;
    background: rgba(0, 0, 0, 0.3);
    padding: 10px 20px;
    border-radius: 30px;
}

.time-label {
    font-size: 0.9rem;
    color: #bfa36a;
    font-family: 'Georgia', serif;
    font-variant-numeric: tabular-nums;
    opacity: 0.9;
    width: 50px;
    text-align: center;
}

.gold-slider {
    -webkit-appearance: none;
    height: 4px;
    background: rgba(191, 163, 106, 0.3);
    border-radius: 2px;
    outline: none;
    cursor: pointer;
}

.progress-slider {
    flex: 1;
}

.volume-slider {
    width: 80px;
}

.gold-slider::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    background: #bfa36a;
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.5);
    margin-top: -4px;
}

.controls-deck {
    background: rgba(20, 20, 20, 0.8);
    backdrop-filter: blur(12px);
    padding: 15px 30px;
    border-radius: 50px;
    display: flex;
    align-items: center;
    gap: 25px;
    border: 1px solid rgba(191, 163, 106, 0.3);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.6);
}

.hidden-input {
    display: none;
}

.icon-btn,
.play-btn {
    display: flex;
    cursor: pointer;
    transition: transform 0.2s;
}

.icon-btn:hover {
    transform: scale(1.1);
}

.play-btn {
    width: 60px;
    height: 60px;
    background: radial-gradient(circle, #d4af37, #bfa36a);
    border: none;
    border-radius: 50%;
    align-items: center;
    justify-content: center;
    box-shadow: 0 0 15px rgba(191, 163, 106, 0.5);
}

.play-btn:disabled {
    background: #333;
    cursor: not-allowed;
    box-shadow: none;
}

.volume-control {
    display: flex;
    align-items: center;
    gap: 10px;
}
</style>