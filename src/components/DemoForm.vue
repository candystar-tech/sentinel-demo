<script setup lang="ts">
import { computed, inject, ref } from 'vue'
import type { Ref } from 'vue'
import SentinelCaptcha from '../ui/SentinelCaptcha.vue'
import StarBtn from '../ui/StarBtn.vue'
import axios from 'axios'

const lang = inject('lang') as Ref<string>
const captchaType = inject('captchaType') as Ref<string>
const product = inject('product') as Ref<"float" | "popup" | "bind">

// 站点密钥，后台获取
// 这里用DEMO密钥
const sitekey = computed(() => {
    if (captchaType.value == "AI") {
        return "CSDEMO"
    } else if (captchaType.value == "VTT") {
        return "CSDEMOVTT"
    } else if (captchaType.value == "SLIDE") {
        return "CSDEMOSLIDE"
    }
})

// 站点私钥，后台获取
// 这里用DEMO密钥
const secretkey = computed(() => {
    if (captchaType.value == "AI") {
        return ""
    } else if (captchaType.value == "VTT") {
        return "VTT"
    } else if (captchaType.value == "SLIDE") {
        return "SLIDE"
    }
})

const strings = computed(() => {
    if (lang.value === 'en-us') {
        return {
            login: "Login",
            verifyFail: "Verify Fail",
            pleaseCompleteVerify: "Please complete the security verification",
            downgrade: "Star Test maybe down, please try again later",
            passStatus: "Verify Pass Status: ",
            passed: "Pass",
            notPassed: "Not Pass",
            statusCode: "Status Code: ",
            score: "Visitor Score: ",
            verifyType: "Verify Type: "
        }
    } else {
        return {
            login: "登录",
            verifyFail: "验证失败",
            pleaseCompleteVerify: "请完成安全验证",
            downgrade: "星验可能已宕机，验证码提示容灾降级",
            passStatus: "验证通过状态：",
            passed: "通过",
            notPassed: "未通过",
            statusCode: "状态码：",
            score: "访客分值：",
            verifyType: "验证类型："
        }
    }
})

const captchaOutput = ref('')
const isChecking = ref(false)

const twoStepCheck = async () => {
    if (isChecking.value) {
        return
    }

    if (product.value == "bind") {
        // 按钮绑定验证
        const st = await (window as any).initSentinel({
            sitekey: sitekey.value,
            product: "bind"
        })
        const verifyResult = await st.verify()
        if (verifyResult.error) {
            alert(`${strings.value.verifyFail}\n${JSON.stringify(verifyResult.error)}`)
            return
        }
        captchaOutput.value = verifyResult.result
    }

    // 服务端二次验证
    // 本demo使用的是演示siteverify接口 /v0/xapi/demo/verify
    // 演示接口有ip和安全限制，线上中无法使用
    // 在您的项目中，
    // 请参考文档使用正式siteverify接口 /v0/siteverify
    if (captchaOutput.value == "") {
        alert(strings.value.pleaseCompleteVerify)
        return
    }
    if (captchaOutput.value == ".DOWNGRADE") {
        // 出现此信息，或验证码返回结果不存在或者为空时
        // 在服务端应进行一次siteverify，传入参数全部为空
        // 如果确实是星验宕机（状态码非200），业务端应一键放行
        alert(strings.value.downgrade)
        return
    }
    // 这里为了演示只尝试使用一个域名来验证
    // 在您的项目中使用，可参考文档使用多个域名
    // 以免因星验部分域名出现解析异常导致验证码无法验证
    try {
        const outputJson = JSON.parse(captchaOutput.value)
        isChecking.value = true
        const response = await axios.post("https://sentinel-api.startest.top/v0/xapi/demo/verify", {
            lot_number: outputJson?.lot_number || "",
            redeem_token: outputJson?.redeem_token || "",
            secretkey: secretkey.value
        })
        isChecking.value = false
        if (response.status !== 200) {
            throw new Error("status code not 200")
        }
        alert(`${strings.value.passStatus}${response.data.success ? strings.value.passed : strings.value.notPassed}\n${strings.value.statusCode}${response.data.code}\n${strings.value.score}${response.data.score}\n${strings.value.verifyType}${response.data.verify_method}`)
        return
    } catch {
        isChecking.value = false
        alert(strings.value.downgrade)
        return
    }
}
</script>

<template>
    <form class="demoform">
        <div class="inp">
            <div class="user"></div>
            <input type="email" autocomplete="off" placeholder="hello@candystar.top" disabled />
        </div>
        <div class="inp">
            <div class="pass"></div>
            <input type="password" autocomplete="off" placeholder="********" disabled />
        </div>
        <SentinelCaptcha :lang="lang" :sitekey="sitekey" :product="product" v-if="product !== 'bind'"
            @success="(r) => captchaOutput = r" @reload="captchaOutput = ''" />
        <StarBtn class="btn" :class="{ 'disabled': isChecking }" @click="twoStepCheck()">{{ strings["login"] }}
        </StarBtn>
    </form>
</template>

<style scoped lang="scss">
.demoform {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-sizing: content-box;
    width: 260px;

    .inp {
        background: #fff;
        border: 1px solid #d1d6e0;
        box-sizing: border-box;
        border-radius: 4px;
        margin: 20px 0px;
        font-size: 0;
        position: relative;

        .user {
            margin: 15px 0 15px 13px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJWSURBVHgB7ZhPbhMxFMY/24QFElKOEE5AkVCrigXpCQiqaMWGMEfoCaAngBu4LQtE/wh6gqYLVNEgNUeYI8w6wX7YA5FoZshM8kxngPlJURJnJuPPfs/+/ICGhv8bgcDoo2FXSeoToeu+dtJGwkhIjMw3eRptP/yEgAQToN9fdFRLaULa8XlPjO3YbETP12MEIIgAffh5RcrWmfvYLnlLYu1kI9p6NAITtgA/8rKlrlC+81MSOzEPuDMhwUTeVouM/K+0fciBCUuAPv7ScwnawZL4fNFHF10wYAlQQjwBEyFVHwxYAojECpiIolWrAGYOEFsAJwQ97CSuGq6AGHxYewFLgCU6BxOqUoCTsAcmZOgUDNg78cHx5Rktu5I4X9TfXL0HBuwkNhMTubcEi5N4UwcmbAHey3hjhsVE/DBzARxpkGXUu0pvzHxIFF3rwm2QmrgATtQT/kDj/JEk9EiI++7PpxtdTAIDsmY/erY+QENDQzBKJbHWV23cHXe9/yfrElOkJ7DpKxSx8N7KrWTG4DzaWt0rc1OhAP3ha08q649+ITtbjK9eGOwWCZm7DxycDN+4zn/ETXfe484JUkK/Oxm+mnfZb2dg399I9Bo1QAh6+2JzbSf3t7xGfXj50qtHjbCGnkbba5mqXm4ISYW501YFUgmdLiaz7bMNfvS559Q/RBt3xt3ZxowApfAYNUXcypZxsiFUz9FPEYRMFSQjgFBfAT830GvkJXEHdYXKCagzf72ADI2AqvknBSxT47kZcqoeGQHWmp0y5ZEKSCywi4aGhmt8B70PvI07m/rAAAAAAElFTkSuQmCC);
            background-size: 100%;
            width: 20px;
            height: 20px;
            display: inline-block;
        }

        .pass {
            margin: 15px 13px;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAJ/SURBVHgB7Zm9ixNBGMafdza3Gw+LFFaCJnCdIAFzqS0sxY/zigPxFLS/4npTxNrmegVJZRX3T7jaOzGN2Ah3glYWCxfE5My8zhgP9yPB3UmW3ZX9QSD77gfzzLxfO0vMbKHACBScCpZIv/+xNsTJDhjX1co2AKr/OeURYQBi17LPufdvXj3GkqBluNDrN4eNsZQvWA08zvVC4JWwq91lCFlYQK9/sMOSO+pvLdGNII8Eutsb63tYgIUE9PqHHZaygwWYimh3YYhxEE9nfsbgGfskaLdSra493GxX9E/YoiXIeqxORlyGJTr6WTDEaAW0z48m8gBBt1EuQf90iV7/nRI+CbkceZWq0zKJCaMVOGX5FKHBq1m+Eceftzeu7elr9T1/rVz7OfrxEgYkFqBnX0o88tv0zD+41RrEfYa+loQV9HuVwXQaRkISCxgz3w4YCEcmmUSvhLp3328bypPEsZDchZjvBI/pGQwhIjf4qHh1xE9iAapYNf3HDtF7GLJqO27IVEdCTII44Kdb9+L7fpjNcNZhNJCQwjdzpYCsKQVkTeEFzGzmfC8oOucnLu/LhkCuVXV2ZzV7EQFzOs0cMLtjjbjQiPk5cjd4zeyONRoDMtTr5AmmZthUsCDmiGeUaTRryp25eazVL6DdvITx6QSDD1/x6fgb0iC1FWheuQh7pYLzq44SchlpkZoAPfAz7JX0NsDLIM6aUkDWlALmofP/GcPvY6RFagLeDj7/Hvi0kH1BWqRWiXXlTav6+iljIGv+SwEeCkRUgP4gnVP09krYFhHgCPEE+VwFT+8NhY0RAVt3W0eOJdbVC7SLfODpT7fqs20r1sZW0Sh8FvoFgWPpQHWp1X8AAAAASUVORK5CYII=);
            background-size: 100%;
            width: 20px;
            height: 20px;
            display: inline-block;
        }

        input {
            width: 213px;
            font-size: 14px;
            position: absolute;
            top: 7px;
            left: 45px;
            height: 36px;
            border: none;
            border-left: 1px solid #d1d6e0;
            background-color: rgba(186, 177, 187, 0) !important;
            outline: rgba(0, 0, 0, 0);
            text-indent: 5px;
            padding-left: 6px;
        }
    }

    .btn {
        margin: 20px 0px;
    }
}
</style>
