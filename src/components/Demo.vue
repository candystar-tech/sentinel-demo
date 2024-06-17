<script setup lang="ts">
import DemoForm from './DemoForm.vue'
import { inject } from 'vue'
import type { Ref } from 'vue'

const lang = inject('lang') as Ref<string>
</script>

<template>
    <div class="demo-box">
        <div class="demo-box__bg">
            <div class="demo-box__bg--tip" v-if="lang == 'zh-cn'">此为验证产品的 Demo 展示页面，非星验后台</div>
            <div class="demo-box__bg--tip" v-else-if="lang == 'en-us'">This is a demo, not the StarTest Console</div>
        </div>
        <div class="demo-box__form">
            <DemoForm />
        </div>
    </div>
</template>

<style scoped lang="scss">
.demo-box {
    max-width: 1000px;
    background: #ffffff;
    box-shadow: 0 4px 10px -1px #0000000d;
    border-radius: 10px;
    margin: 0 auto;
    width: 90%;
    position: relative;
    display: flex;

    &__bg {
        width: 50%;
        position: relative;
        background-image: url(../assets/demobg.png);
        background-size: 100%;
        padding-bottom: 57.9%;

        &--tip {
            position: absolute;
            bottom: 20px;
            left: 20px;
            padding: 8px 10px;
            border-radius: 6px;
            background-color: #f1f4fb;
            color: #20253399;
            font-size: 13px;
        }

        @media screen and (max-width: 750px) {
            display: none;
        }
    }

    &__form {
        width: 50%;
        padding-bottom: 57.9%;
        position: relative;

        @media screen and (max-width: 750px) {
            width: 100%;
        }

        @media screen and (max-width: 620px) {
            padding-bottom: 100%;
        }

        @media screen and (max-width: 370px) {
            padding-bottom: 0;
        }
    }
}
</style>
