<template>
    <div class="scene">
        <div class="turntable-base">
            <div class="base-side"></div>

            <div class="platter">
                <div class="disc" :class="{ playing }">
                    <div class="grooves"></div>
                    <div class="label">
                        <div class="hole"></div>
                    </div>
                </div>
            </div>

            <div class="arm-mechanism" @click="handleArmClick" title="Lift/Drop Needle">
                <div class="counterweight"></div>
                <div class="bearing"></div>
                <div class="arm" :class="{ playing }">
                    <div class="headshell"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps<{ playing: boolean }>()
const emit = defineEmits(['toggle'])
function handleArmClick() { emit('toggle') }
</script>

<style scoped>
.scene {
    perspective: 1000px;
    width: 400px;
    height: 400px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.turntable-base {
    position: relative;
    width: 320px;
    height: 320px;
    background: linear-gradient(145deg, #1a1a1a, #0d0d0d);
    border-radius: 20px;
    transform: rotateX(25deg);
    transform-style: preserve-3d;
    box-shadow:
        inset 0 0 0 2px #333,
        0 20px 50px rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.5s ease;
}

.scene:hover .turntable-base {
    transform: rotateX(20deg) scale(1.02);
}

.base-side {
    position: absolute;
    inset: 0;
    border-radius: 20px;
    transform: translateZ(-15px);
    background: #050505;
    box-shadow: 0 15px 10px rgba(0, 0, 0, 0.5);
}

.platter {
    width: 280px;
    height: 280px;
    background: #000;
    border-radius: 50%;
    transform: translateZ(2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.5);
    display: flex;
    align-items: center;
    justify-content: center;
}

.disc {
    position: relative;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: #111;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.8);
    display: flex;
    align-items: center;
    justify-content: center;
}

.disc.playing {
    animation: spin 3s linear infinite;
}

.grooves {
    position: absolute;
    inset: 4px;
    border-radius: 50%;
    background: repeating-radial-gradient(#111 0, #111 2px, #222 3px, #222 4px);
    mask-image: radial-gradient(white, white);
    opacity: 0.9;
}

.grooves::after {
    content: '';
    position: absolute;
    inset: 0;
    border-radius: 50%;
    background: conic-gradient(transparent 0deg, rgba(255, 255, 255, 0.15) 40deg, transparent 80deg, transparent 180deg, rgba(255, 255, 255, 0.15) 220deg, transparent 260deg);
}

.label {
    position: relative;
    z-index: 10;
    width: 90px;
    height: 90px;
    background: radial-gradient(circle, #bfa36a 0%, #8c7340 100%);
    border-radius: 50%;
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
}

.hole {
    width: 10px;
    height: 10px;
    background: #000;
    border-radius: 50%;
}

.arm-mechanism {
    position: absolute;
    right: 15px;
    top: 15px;
    width: 60px;
    height: 60px;
    z-index: 20;
    cursor: pointer;
    transform: translateZ(10px);
    transform-style: preserve-3d;
}

.bearing {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: radial-gradient(#444, #111);
    box-shadow: 0 5px 5px rgba(0, 0, 0, 0.5);
}

.counterweight {
    position: absolute;
    top: 5px;
    right: 5px;
    width: 30px;
    height: 40px;
    background: #333;
    border-radius: 5px;
    transform: translateZ(5px);
}

.arm {
    position: absolute;
    top: 28px;
    right: 30px;
    width: 190px;
    height: 8px;
    background: linear-gradient(to bottom, #d4d4d4, #999);
    transform-origin: 175px center;
    transform: rotateZ(-30deg) rotateX(-5deg);
    transition: transform 1s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 4px;
    box-shadow: 5px 10px 10px rgba(0, 0, 0, 0.3);
}

.arm.playing {
    transform: rotateZ(10deg) rotateX(0deg);
}

.headshell {
    position: absolute;
    left: 0;
    top: -3px;
    width: 32px;
    height: 14px;
    background: #222;
    transform: rotate(15deg);
    border-radius: 2px;
}

@keyframes spin {
    to {
        transform: rotate(360deg);
    }
}
</style>