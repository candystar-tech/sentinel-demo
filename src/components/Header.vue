<script setup lang="ts">
import { computed, inject, nextTick, onUnmounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import BaselineKeyboardArrowDown from '../icons/BaselineKeyboardArrowDown.vue'
import BaselineLanguage from '../icons/BaselineLanguage.vue'

const lang = inject('lang') as Ref<string>
const langs = [
    { name: '简体中文', value: 'zh-cn' },
    { name: 'English', value: 'en-us' }
]

const langSelectShow = ref(false)
const currentLang = computed(() => {
    return langs.find(l => lang.value === l.value)
})

const hideLangSelect = () => langSelectShow.value = false

watch(langSelectShow, (show) => {
    nextTick(() => {
        setTimeout(() => {
            if (show) {
                document.addEventListener("click", hideLangSelect)
            } else {
                document.removeEventListener("click", hideLangSelect)
            }
        }, 1)
    })
})
onUnmounted(() => {
    document.removeEventListener("click", hideLangSelect)
})
</script>

<template>
    <div class="header">
        <div class="logo">
            <img src="../assets/startest.svg" class="corp" />
            <div class="line"></div>
            <img src="../assets/sentinel.png" class="logo" />
        </div>
        <div class="lang">
            <div class="selector-text" @click="langSelectShow = !langSelectShow">
                <BaselineLanguage />
                <span>{{ currentLang?.name }}</span>
                <BaselineKeyboardArrowDown :class="{ 'iconup': langSelectShow }" />
            </div>
            <ul class="select-list" v-if="langSelectShow">
                <li v-for="item in langs" @click="lang = item.value">{{ item.name }}</li>
            </ul>
        </div>
    </div>
</template>

<style scoped lang="scss">
.header {
    width: 90%;
    height: 30px;
    margin: 20px auto;
    max-width: 1100px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;

        img {
            height: 100%;
            width: auto;
        }

        .corp {
            height: 28px;
        }

        .line {
            width: 1px;
            height: 15px;
            background-color: #afafaf;
            margin: 0 15px;
        }

        .logo {
            height: 25px;
        }
    }

    .lang {
        position: relative;
        white-space: nowrap;

        .selector-text {
            cursor: pointer;
            color: #737373;
            display: flex;
            align-items: center;
            white-space: normal;

            svg:first-child {
                margin-right: 4px;
            }

            svg:last-child {
                margin-left: 8px;
            }

            svg.iconup {
                transform: rotate(180deg);
            }
        }

        .select-list {
            position: absolute;
            overflow: auto;
            min-width: 100%;
            top: calc(100% + 2px);
            left: 0;
            max-height: 200px;
            font-size: 14px;
            -webkit-box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
            box-shadow: 0 0 10px 0 rgba(0, 0, 0, .1);
            border-radius: 0 0 4px 4px;
            white-space: nowrap;
            background-color: #fff;
            z-index: 999;
            line-height: 30px;
            padding: 10px 0;
            list-style: none;

            li {
                padding: 0 20px;
                cursor: pointer;
                color: #737373;

                &:hover {
                    color: #333;
                    background-color: #f5f5f5;
                }
            }
        }
    }
}
</style>
