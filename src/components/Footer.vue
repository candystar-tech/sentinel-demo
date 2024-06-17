<script setup lang="ts">
import { inject } from 'vue'
import type { Ref } from 'vue'

const lang = inject('lang') as Ref<string>
</script>

<template>
    <div class="footer">
        <div class="left" v-if="lang == 'zh-cn'">
            <a href="https://startest.top" target="_blank">星验官网</a>
            <a href="https://candystar.top" target="_blank">糖星官网</a>
        </div>
        <div class="left" v-else-if="lang == 'en-us'">
            <a href="https://startest.top" target="_blank">Star Test Website</a>
            <a href="https://candystar.top" target="_blank">Candy Star Website</a>
        </div>
        <div class="right">
            COPYRIGHT &copy; 2023-{{ new Date().getFullYear() }} STARTEST, INC.
        </div>
    </div>
</template>

<style scoped lang="scss">
.footer {
    max-width: 1100px;
    margin: 0 auto 20px;
    padding: 0 2%;
    width: 90%;
    display: flex;
    justify-content: space-between;
    align-items: center;

    @media screen and (max-width: 481px) {
        flex-direction: column;
        align-items: flex-start;

        div {
            margin-bottom: 10px;

            &:last-child {
                margin-bottom: 0;
            }
        }
    }

    .left {
        color: #202533;
        font-size: 14px;
        flex: 1;
        display: flex;

        a {
            cursor: pointer;
            text-decoration: none;
            color: #17b0dd;
            margin-right: 15px;

            &:last-child {
                margin-right: 0;
            }
        }
    }

    .right {
        font-size: 12px;
        display: inline-block;
        color: #20253366;
    }
}
</style>
