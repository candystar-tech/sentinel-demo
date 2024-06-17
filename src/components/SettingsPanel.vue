<script setup lang="ts">
import { inject, ref } from 'vue'
import type { Ref } from 'vue'

const lang = inject('lang') as Ref<string>

const captchaType = inject('captchaType') as Ref<string>
const product = inject('product') as Ref<"float" | "popup" | "bind">
const showPanel = ref(false)
</script>

<template>
    <div class="panel">
        <div class="showBtn" :class="{ hide: showPanel }" @click="showPanel = !showPanel">
            <div v-if="lang == 'zh-cn'">配置</div>
            <div v-if="lang == 'en-us'">Settings</div>
            <div class="settings-icon"></div>
        </div>
        <div class="panelContent" :class="{ hide: !showPanel }">
            <div class="title">
                <div class="left">
                    <div class="settings-icon"></div>
                    <span v-if="lang == 'zh-cn'">行为验配置</span>
                    <span v-if="lang == 'en-us'">CAPTCHA Settings</span>
                </div>
                <div class="right">
                    <div class="close-icon" @click="showPanel = !showPanel"></div>
                </div>
            </div>
            <div class="container">
                <div class="item product" v-if="lang == 'zh-cn'">
                    <span class="item-title">弹出样式选择</span>
                    <div class="card">
                        <label><input type="radio" v-model="product" value="float" /> 浮动式</label>
                        <span>由按钮直接变化为验证面板</span>
                    </div>
                    <div class="card">
                        <label><input type="radio" v-model="product" value="popup" /> 弹出式</label>
                        <span>以页面居中弹出验证面板</span>
                    </div>
                    <div class="card">
                        <label><input type="radio" v-model="product" value="bind" /> 按钮绑定</label>
                        <span>由客户指定的按钮来触发验证</span>
                    </div>
                </div>
                <div class="item product" v-if="lang == 'en-us'">
                    <span class="item-title">Popup Style</span>
                    <div class="card">
                        <label><input type="radio" v-model="product" value="float" /> Float</label>
                        <span>Directly change from a button to a verification panel</span>
                    </div>
                    <div class="card">
                        <label><input type="radio" v-model="product" value="popup" /> Popup</label>
                        <span>Pop up verification panel centered on the page</span>
                    </div>
                    <div class="card">
                        <label><input type="radio" v-model="product" value="bind" /> Bind</label>
                        <span>Triggering verification by the button specified by the customer</span>
                    </div>
                </div>
                <div class="item product" v-if="lang == 'zh-cn'">
                    <span class="item-title">验证形式选择</span>
                    <div class="card">
                        <label><input type="radio" v-model="captchaType" value="AI" /> 智能组合验证</label>
                        <span>根据用户历史行为数据和环境信息，智能展示对应的验证形式</span>
                    </div>
                    <div class="card">
                        <label><input type="radio" v-model="captchaType" value="SLIDE" /> 滑动拼图验证</label>
                        <span>验证过程实时收集行为数据，智能进行人机识别</span>
                    </div>
                    <div class="card">
                        <label><input type="radio" v-model="captchaType" value="VTT" /> 空间语义验证</label>
                        <span>空间验证相较于其他验证形式更复杂，安全性更高</span>
                    </div>
                </div>
                <div class="item product" v-if="lang == 'en-us'">
                    <span class="item-title">Verify Forms</span>
                    <div class="card">
                        <label><input type="radio" v-model="captchaType" value="AI" /> AI</label>
                        <span>Intelligent display of corresponding verification forms based on user historical behavior data and environmental information</span>
                    </div>
                    <div class="card">
                        <label><input type="radio" v-model="captchaType" value="SLIDE" /> Slide Puzzle</label>
                        <span>Real time collection of behavioral data during the verification process for intelligent human-machine recognition</span>
                    </div>
                    <div class="card">
                        <label><input type="radio" v-model="captchaType" value="VTT" /> Spatial semantic verification</label>
                        <span>Space verification is more complex and secure compared to other forms of verification</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.settings-icon {
    width: 18px;
    height: 18px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAYAAACM/rhtAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAPYSURBVHgBzVldTttAEJ5dJ1XVAgo3CCcoPDSA+lByAxCEqi9NfALSE4ScADiBE16qElB6A/JSUUIlcgN8g0airao69nbG+cE2ttldI9HvJZY9O/52d3bmG4dBBljWdQHmRsupRj9zA9NcGYImcpABxrzTFQAbaTZs3unhTxk0wSEDkNzyY9ikQZug1cXtBShImBb8UNCE/go6TlHa9uVvedsI9AlyUZQ3zmtvcyxB6+TrsvX5+2baQIPxtyAJw4BUW6tztWF9uijGPWNxN9tn/RuM7iI+tdGg5/51m+b7dXvqzGCi8dDpjXmT7bnQNHdLLd8PxmVuYbTnCVGHcSwPvdv8UjQlsfvkrhogxP59/9CjlwgBNcgAxqBFk4+doBDNamV1P/LeO9Ay87xxA0+Hoee4K9PdIoRi0HhmNOBpUTDyhhW8MVtB66S/zDlcw38AT7hls7Leo+vZCnIDupANFNw2xtZgcq0NDsbB9NpfQVy9Gq6eBRpAQj0h8JRPZjyF1bnY4MBreCqqoAFPeB/NytphbkJZK5FOncQ9mxDuWZ1vA874ASgCxxTH1MjZTqmO+aip4iCNXJjo2iHZghqOqsiJLsJp5uQCt9rf/9Tijtvaqu2UTFDA8Wn/XCK5D3EyzeDEQ2nG3F1vUR6ihJzmBWOuDYpwMU5TDajSeE45uiuxpY7KGWfiPMHVEJd/ETTQPu3/gITd8VyxZb5b/RK9H69mxKgIybBBH8nph7FY4upyi0mJ1KTByvkxniDnyY5EFoIqGnJCJXqDtCBnLC1vFSgJgyIoriElO2Ala8RpwhDBdre/x3n+3NeCKTCYuqgwuEivKPhOUlKY2OvB2+NSh+LRWBg1xFg8SkE2URNo4uCClK1PionDD9urfnIfr+C8s69Czh+I5Ss628cgRxCC1TEl+WPGtVh4NjD1A00kj8/6r1yPtc3K617w2aw1cBVbgwk8z1dFd4kaGZMWzNJkDzGO7Ekaku2Z44FVpbpdWqLL2bKhSFQt6FEU0DFNsAhZyBEXz53V+RlBkkd+Y/TEICES1JahwHMdn3kmNZwVwgmLirCawW4KdeFR7EBaXSGUVUyMn5ZI2inUpMGO7h5BH7lndLynqzgkIYsN9SLqvzL2rDU/Ppi6YCBS1AyRjiRfKOuW/AlPfdHBiPTE49sx8EtODorRPiOIdueypdBvzBRy7PtOLzfBG9nm7psByBCUwUR9SzVaSVpPBhk+YBoDaVM2skET+gTzeVva9tcLedsItLeYkCbhA9BuEQiZvlGz8VeEzDZpyPSV373Nb8Hcnwf+hnieieA/ukWTZ5Y+EFIAAAAASUVORK5CYII=);
    background-size: 100%;
    margin-left: 8px;
    pointer-events: none;
}

.close-icon {
    width: 14px;
    height: 14px;
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAAACXBIWXMAABYlAAAWJQFJUiTwAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAE0SURBVHgBrdZRUoMwEAbg3VVv5NTx0SvY0UchJ0voo1rv0CdHxislkaSNAwM0m7D/ExCSbzaEAMAlh89ed1+/DQgnjHk49jqdY8I8QBuvELXN830HAokFOGcihGDe9juFEyxFAB1jKQEl6+xpdvdw45bpXcJCLMApTql+/26JbvSsZ0Wla5hDUGq/M5guSKA5LBzjuGELysFmYC3KxRbBUrQEWwW5aCl2Fcyh55HLsCx4FV1IDmOBXJSDscEcysVCCJih2zu/2obkgRlWhWurcarydqQsyMIKUKrBwjNzzqpZB8ZXBmuwtEBqtkGsxVJKUdyC1aC4FStFUQIrQVEK46IoiXFQAmufJLEQ9fpoFt/TwTpP6cePGX4aGwlsnEml3nfNy0P73xhQfexbEE5AY0GX/AFhQjf0Klg25QAAAABJRU5ErkJggg==);
    background-size: 100%;
    cursor: pointer;
}

.panel {
    position: fixed;
    height: 100%;
    width: 0;

    .showBtn {
        position: absolute;
        top: 10%;
        min-width: 80px;
        height: 40px;
        box-sizing: border-box;
        display: flex;
        flex-direction: row;
        align-items: center;
        font-size: 14px;
        padding: 10px 14px 10px 10px;
        background: #ffffff;
        border: 1px solid #d8dce2;
        box-shadow: 0 2px 10px -1px #0000000d;
        border-radius: 0 100px 100px 0;
        cursor: pointer;
        transition: transform .5s ease;
        transform: translate(0);

        &.hide {
            transform: translate(-150px);
        }
    }

    .panelContent {
        width: 410px;
        max-width: 100vw;
        height: 100%;
        background: #ffffff;
        border: 1px solid #d8dce2;
        box-shadow: 2px 0 10px -1px #0000000d;
        transition: transform .5s ease;

        &.hide {
            transform: translate(-102%);
        }

        .title {
            position: sticky;
            top: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 17.5px 30px;
            background: #f9fbfd;
            box-shadow: 0 1px #d8dce2;

            .left {
                display: flex;
                align-items: center;
                font-size: 16px;

                .settings-icon {
                    margin-left: 0;
                    margin-right: 8px;
                }
            }
        }

        .container {
            padding: 20px 30px;
            overflow: scroll;
            height: calc(100% - 57px);
            box-sizing: border-box;

            .item {
                background: #eff3fb;
                border-radius: 6px;
                padding: 20px;
                margin-bottom: 10px;
                color: #202533;

                .item-title {
                    margin-bottom: 14px;
                    display: inline-block;
                }
            }

            .product {
                .card {
                    &:nth-child(3) {
                        margin: 14px 0;
                    }

                    label {
                        font-size: 14px;
                        margin-right: 12px;

                        input {
                            margin-left: 0;
                        }
                    }

                    span {
                        color: #20253399;
                        font-size: 12px;
                    }
                }
            }
        }
    }
}
</style>
