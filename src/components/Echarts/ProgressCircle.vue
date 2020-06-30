<template>
    <EchartsBox :title="title" :width="defaultWidth" :height="defaultHeight" style="float:right;">
        <div class="s01_ProgressCircle">
            <div class="s01_ProgressCircle_combs s01_ProgressCircle_combs01">
                <span class="s01_ProgressCircle_combs_title">波动率</span>
                <el-progress type="circle" :percentage="25" :width="progressWidth" :stroke-width="10"
                             color="#62c4c8"></el-progress>
            </div>
            <div class="s01_ProgressCircle_combs s01_ProgressCircle_combs02">
                <span class="s01_ProgressCircle_combs_title">平均值</span>
                <el-progress type="circle" :percentage="25" :width="progressWidth" :stroke-width="10"
                             color="#47a4f8"></el-progress>
            </div>
            <div class="s01_ProgressCircle_combs s01_ProgressCircle_combs03">
                <span class="s01_ProgressCircle_combs_title">最高值</span>
                <el-progress type="circle" :percentage="25" :width="progressWidth" :stroke-width="10"
                             color="#fdc9a6"></el-progress>
            </div>
            <div class="s01_ProgressCircle_combs s01_ProgressCircle_combs04">
                <span class="s01_ProgressCircle_combs_title">最低值</span>
                <el-progress type="circle" :percentage="25" :width="progressWidth" :stroke-width="10"
                             color="#ee8967"></el-progress>
            </div>
        </div>
    </EchartsBox>
</template>

<script>
    import EchartsBox from "./EchartsBox.vue"

    /**
     * 环形表
     */
    export default {
        name: "ProgressCircle",
        components: {EchartsBox},
        props: ["title", "width", "height"],
        data() {
            return {
                defaultWidth: this.width ? this.width : "100%",
                defaultHeight: this.height ? this.height : "100%",
            }
        },
        computed: {
            fontSize() {
                return this.$store.state.fontSize
            },
            /**
             * 环形表的宽度
             * 妈的必须为number
             */
            progressWidth() {
                return this.fontSize * (80 * 480 / (1200 * 12))
            }
        }
    }
</script>

<style scoped lang="scss">
    .s01_ProgressCircle {
        margin-left: ((430 - 288) *100% /2)/430;
        width: 288%*100/430;
        margin-top: 30rem * 480 / (1200 * 12);
        text-align: center;

        .s01_ProgressCircle_combs {
            display: inline-block;
            height: 80rem * 480 / (1200 * 12);
            vertical-align: top;

            .s01_ProgressCircle_combs_title {
                font-size: 14rem * 480 / (1200 * 12);
                -webkit-writing-mode: vertical-rl;
                writing-mode: vertical-rl;
                display: inline-block;
                height: 100%;
                text-align: center;
            }
        }

        .s01_ProgressCircle_combs03 {
            clear: left;
        }

        .s01_ProgressCircle_combs01, .s01_ProgressCircle_combs03 {
            margin-right: 38rem * 480 / (1200 * 12);
            margin-bottom: 21rem * 480 / (1200 * 12);
            float: left;
        }

        .s01_ProgressCircle_combs02, .s01_ProgressCircle_combs04 {
            float: right;
        }
    }

    /*响应式*/

    /*响应式*/
</style>