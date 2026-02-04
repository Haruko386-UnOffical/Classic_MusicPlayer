# 🎵 Classic Music Player

> 一个基于 Vue 3 + Vite 的高保真复古黑胶唱片机与音频可视化网站。

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Vue](https://img.shields.io/badge/Vue.js-3.x-4FC08D?logo=vue.js)
![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)

🔗 **仓库地址**: [https://github.com/Dimon0000000/Classic_MusicPlayer.git](https://github.com/Dimon0000000/Classic_MusicPlayer.git)

## ✨ 特点

* **🎧 拟真黑胶交互**：
    * 支持唱臂（Tonearm）点击交互（抬起/放下）。
    * CSS 3D 透视效果，模拟唱机厚度与光影。
    * 精确的物理旋转动画与唱臂跟随逻辑。
* **📊 实时频谱可视化 (Waterfall)**：
    * 基于 Canvas 的高性能渲染。
    * 动态流光与倒影效果，不仅是柱状图，更是一种氛围灯效。
* **🎛️ 专业音频控制**：
    * **平滑过渡**：播放/暂停时的音量淡入淡出（Fade In/Out），避免爆音。
    * **复古控件**：定制化的暗金色进度条与音量推杆。
    * **本地解析**：支持上传本地音频文件并自动解析元数据。
* **🎨 黑金美学**：
    * 全站采用 "Black & Gold" 配色。
    * Glassmorphism（玻璃拟态）控制面板。

## 📸 项目展示

![image](/public/image.png)

## 🛠️ 运行环境

* **核心框架**: Vue: ^3.5.24
* **构建工具**: Vite: ^5.4.10
* **语言**: TypeScript: ~5.9.3
* **音频处理**: Web Audio API (AudioContext, AnalyserNode, GainNode)
* **图形渲染**: HTML5 Canvas API
* **样式**: CSS3 (Variables, 3D Transforms, Animations)

## 🚀 如何运行

### 环境要求
* Node.js (建议v22.22.0)
* npm 或 yarn

### 安装步骤

1.  **克隆仓库**
    ```bash
    git clone https://github.com/Dimon0000000/Classic_MusicPlayer.git
    cd Classic_MusicPlayer
    ```

2.  **安装依赖**
    ```bash
    npm install
    ```

3.  **启动开发服务器**
    ```bash
    npm run dev
    ```

## 📂 目录结构

```text
src/
├── components/
│   ├── Turntable.vue   # 黑胶唱机核心组件 (含3D逻辑)
│   └── Waterfall.vue   # Canvas 频谱可视化组件
├── composables/
│   └── useAudio.ts     # 音频逻辑封装 (单例模式、淡入淡出、状态管理)
├── App.vue             # 主应用布局与UI整合
├── style.css           # 全局样式与字体
└── main.ts             # 入口文件
```

## 📄 License
> [!CAUTION]
>
> 本项目基于MIT License © 2024 Dimon0000000

