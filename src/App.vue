<script setup lang="ts">
import { provide, ref } from 'vue'
import Header from './components/Header.vue'
import Demo from './components/Demo.vue'
import Footer from './components/Footer.vue'
import SettingsPanel from './components/SettingsPanel.vue'

const lang = ref("zh-cn")
provide("lang", lang)

const captchaType = ref("AI")
provide("captchaType", captchaType)

const product = ref("float")
provide("product", product)
</script>

<template>
    <div class="app-container">
        <Header />
        <Demo />
        <Footer />
        <SettingsPanel />
    </div>
</template>

<style scoped lang="scss">
.app-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    background: #f1f4fb;
}
</style>
