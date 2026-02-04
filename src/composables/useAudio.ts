import { ref } from 'vue'

const audio = new Audio()
const ctx = new AudioContext()
const gainNode = ctx.createGain()
const source = ctx.createMediaElementSource(audio)
const analyser = ctx.createAnalyser()

analyser.fftSize = 512
source.connect(gainNode)
gainNode.connect(analyser)
analyser.connect(ctx.destination)

gainNode.gain.value = 0

const dataArray = new Uint8Array(analyser.frequencyBinCount)
const currentTime = ref(0)
const duration = ref(0)
const isEnded = ref(false)

audio.ontimeupdate = () => { currentTime.value = audio.currentTime }
audio.onloadedmetadata = () => { duration.value = audio.duration }
audio.onended = () => { isEnded.value = true }

const FADE_TIME = 0.8
let targetVolume = 0.8 // 记忆用户设定的音量

export function useAudio() {
    const ensureContext = async () => {
        if (ctx.state === 'suspended') await ctx.resume()
    }

    function getFrequency() {
        analyser.getByteFrequencyData(dataArray)
        return dataArray
    }

    function setVolume(val: number) {
        targetVolume = val
        // 如果正在播放，立即平滑过渡到新音量
        if (!audio.paused) {
            gainNode.gain.cancelScheduledValues(ctx.currentTime)
            gainNode.gain.linearRampToValueAtTime(val, ctx.currentTime + 0.1)
        }
    }

    function seek(time: number) {
        audio.currentTime = time
        currentTime.value = time
    }

    async function fadeInPlay() {
        await ensureContext()
        if (audio.paused) {
            audio.play()
            // 从当前值 (可能是0) 在 FADE_TIME 秒内过渡到 targetVolume
            gainNode.gain.cancelScheduledValues(ctx.currentTime)
            gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime)
            gainNode.gain.linearRampToValueAtTime(targetVolume, ctx.currentTime + FADE_TIME)
        }
    }

    function fadeOutPause() {
        if (!audio.paused) {
            // 在 FADE_TIME 秒内过渡到 0
            gainNode.gain.cancelScheduledValues(ctx.currentTime)
            gainNode.gain.setValueAtTime(gainNode.gain.value, ctx.currentTime)
            gainNode.gain.linearRampToValueAtTime(0, ctx.currentTime + FADE_TIME)

            setTimeout(() => {
                audio.pause()
            }, FADE_TIME * 1000)
        }
    }

    return {
        audio,
        ctx,
        currentTime,
        duration,
        isEnded,
        getFrequency,
        ensureContext,
        setVolume,
        seek,
        fadeInPlay,
        fadeOutPause
    }
}