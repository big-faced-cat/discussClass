<template>
    <div class="s01_VideoControls">
        <el-slider :value="currentTime" :max="maxDuration" disabled color="#fdb045"
                   :height="4 * 480 / (1200 * 12)+'rem'" :format-tooltip="progressTip"
                   tooltip-class="s01_tooltip"></el-slider>
        <i class="iconfont s01_play" @click="playVideo">{{!isPlayed?'&#xe624;':'&#xe650;'}}</i>

        <div style="float:right;height:100%;">
            <!--人类识别-->
            <div class="s01_face_s" :class="{active:isFaceAnalysis}" @click="openFaceAnalysis">
                <i class="iconfont s01_little_pont">&#xec1e;</i>
                <span class="s01_face_s_title">人脸识别</span>
            </div>
            <!--人类识别-->

            <!--全屏-->
            <i class="iconfont s01_face_s_open" title="全屏"
               @click="showScreen">{{!isFullScreen?"&#xe7b0;":"&#xe794;"}}</i>
            <!--全屏-->
        </div>


    </div>
</template>

<script>
    export default {
        name: "VideoControls",
        props: [
            "isPlayed",
            "isFaceAnalysis",
            "isFullScreen",
            "currentTime",
            "maxDuration"
        ],
        data() {
            return {}
        },
        methods: {
            /**
             * 播放视频
             */
            playVideo() {
                this.$emit("play")
            },
            /**
             * 开启人脸识别
             */
            openFaceAnalysis() {
                console.log('人脸识别');
                this.$emit("faceAnalysis")
            },
            /**
             * 全屏操作
             */
            showScreen() {
                this.$emit("fullScreen")
            },
            /**
             * 格式化提示的进度信息
             */
            progressTip(value) {
                value = value === null ? 0 : value;
                return Math.floor(value / 60) + ":" + Math.floor((value - Math.floor(value / 60) * 60))
            }

        }
    }
</script>

<style lang="scss">
    .s01_tooltip {
        z-index: 9999999999999999999!important;
    }

    .s01_VideoControls {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.25);
        height: 37rem * 480 / (1200 * 12);
        z-index: 100;
text-align:left;
        .el-slider {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 4rem * 480 / (1200 * 12) !important;

            .el-slider__runway {
                height: 100%;
                margin: 0;
            }

            .el-slider__runway.disabled .el-slider__button {
                vertical-align: top;
                margin-top: 11px;
            }

            .el-slider__button {
                width: 14px;
                height: 14px;
            }

            .el-slider__runway.disabled .el-slider__bar {
                background-color: #fdb045;
            }

            .el-slider__button-wrapper {
                width: 14px;
                height: 14px;
            }
        }

        .el-progress-bar__outer {
            -webkit-border-radius: 0;
            -moz-border-radius: 0;
            border-radius: 0;
            background-color: rgba(255, 255, 255, 0.8);

            .el-progress-bar__inner {
                -webkit-border-radius: 0 100px 100px 0;
                -moz-border-radius: 0 100px 100px 0;
                border-radius: 0 100px 100px 0;
            }
        }

        .s01_progress {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;

            .el-progress-bar__outer {
                height: 4rem * 480 / (1200 * 12) !important;
            }
        }

        .s01_play {
            color: #fff;
            font-size: 13rem * 480 / (1200 * 12);
            vertical-align: middle;
            margin-left: 10rem * 480 / (1200 * 12);
            cursor: pointer;
        }

        .s01_face_s {
            float: left;
            background: #b3b3b3;
            border-radius: 10rem * 480 / (1200 * 12);;
            width: 74rem * 480 / (1200 * 12);;
            height: 20rem * 480 / (1200 * 12);
            line-height: 20rem * 480 / (1200 * 12);
            color: #585858;
            font-size: 10rem * 480 / (1200 * 12);
            cursor: pointer;
            margin-top: 9rem * 480 / (1200 * 12);

            .iconfont {
                line-height: 20rem * 480 / (1200 * 12);
                font-size: 15rem * 480 / (1200 * 12);
                padding-left: 4rem * 480 / (1200 * 12);
                vertical-align: middle;
            }

            .s01_face_s_title {
                position: relative;
                left: -6rem * 480 / (1200 * 12);
                vertical-align: baseline;
            }

            &.active {
                color: #ff561f;
            }
        }

        .s01_face_s_open {
            float: left;
            color: #fff;
            font-size: 16rem * 480 / (1200 * 12);
            vertical-align: middle;
            cursor: pointer;
            height: 100%;
            line-height: 35rem * 480 / (1200 * 12);
            padding: 4rem * 480 / (1200 * 12) 17rem * 480 / (1200 * 12) 0 20rem * 480 / (1200 * 12);

        }
    }
</style>