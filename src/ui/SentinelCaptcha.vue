<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

const props = withDefaults(defineProps<{
    sitekey?: string,
    width?: string,
    height?: string,
    radius?: string,
    lang?: string,
    product?: "float" | "popup"
}>(), {
    sitekey: "CSDEMO",
    width: "260px",
    height: "50px",
    radius: "4px",
    lang: "zh-cn",
    product: "float"
})
const emit = defineEmits(["reload", "success", "error"])

const st = ref<any>(null)
const loading = ref(true)
const captchaContainerRef = ref<HTMLDivElement | null>(null)
const currentLocalId = ref("")

const reload = async (isFirstLoad = false) => {
    loading.value = true
    if (!isFirstLoad) {
        emit("reload")
    }
    const genLocalId = `${new Date().getTime()}${Math.random().toString(16).substring(2)}`
    currentLocalId.value = genLocalId
    st.value = await (window as any).initSentinel({
        sitekey: props.sitekey,
        width: props.width,
        height: props.height,
        radius: props.radius,
        lang: props.lang,
        product: props.product,
        onMount: () => {
            if (currentLocalId.value !== genLocalId) {
                return
            }
            loading.value = false
        },
        onUnmonut: () => {
            if (currentLocalId.value !== genLocalId) {
                return
            }
            loading.value = true
        }
    })
    st.value.onVerify((captchaOutput: any) => {
        if (currentLocalId.value !== genLocalId) {
            return
        }
        emit("success", captchaOutput)
    })
    st.value.onError((error: any) => {
        if (currentLocalId.value !== genLocalId) {
            return
        }
        emit("error", error)
    })
    if (currentLocalId.value == genLocalId) {
        st.value.appendTo(captchaContainerRef.value)
    }
}

onMounted(() => reload(true))
watch(props, () => reload())
</script>

<template>
    <div class="captcha-box" :style="{ 'width': width }">
        <div class="wait" :class="{ show: loading }" :style="{ 'height': height, 'border-radius': radius }">
            <div class="loading">
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
                <div class="loading-dot"></div>
            </div>
        </div>
        <div class="captcha" :key="currentLocalId" ref="captchaContainerRef"></div>
    </div>
</template>

<style scoped lang="scss">
.captcha-box {
    .wait {
        display: none;
    }

    .wait.show {
        display: block;
        text-align: center;
        background-color: #f3f3f3;

        .loading {
            margin: auto;
            width: 50px;
            height: 20px;

            &-dot {
                float: left;
                width: 8px;
                height: 8px;
                margin: 21px 4px;
                background: #ccc;
                border-radius: 50%;
                opacity: 0;
                animation: loadingFade 1s infinite;

                &:nth-child(1) {
                    animation-delay: 0s;
                }

                &:nth-child(2) {
                    animation-delay: .1s;
                }

                &:nth-child(3) {
                    animation-delay: .2s;
                }

                @keyframes loadingFade {
                    0% {
                        opacity: 0;
                    }

                    50% {
                        opacity: .8;
                    }

                    100% {
                        opacity: 0;
                    }
                }
            }
        }
    }
}
</style>
