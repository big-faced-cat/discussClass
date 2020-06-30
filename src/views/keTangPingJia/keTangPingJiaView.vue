<template>
    <div class="s01_keTangPingJiaList">
        <ContentTitle>课堂评价</ContentTitle>
        <ListCondition>
            <router-link :to="{name:'classEvalView'}" class="s01_content_link">课堂评价</router-link>
            <router-link :to="{name:'stuEvuList'}" class="s01_content_link">学生评价</router-link>
            <el-button type="success"  style="float: right; margin-right: 30px" size="medium" @click="backPage">
                返回
            </el-button>
        </ListCondition>
        <div class="s01_keTangPingJia_view_echarts">
            <!--视频-->
            <div class="s01_show_part1">
                <SlideVideo videoss="video1" slidesPerViewProp="1"  ref="slidevideo"></SlideVideo>
                <div class="s01_show_part1_right">
                    <div class="s01_kt_hyd s01_kt_hyd1">
                        <i class="s01_kt_hyd_icon"></i>
                        <div class="s01_kt_type">课堂活跃度</div>
                        <div class="s01_kt_result">一般</div>
                    </div>
                    <div class="s01_kt_hyd s01_kt_hyd2">
                        <i class="s01_kt_hyd_icon"></i>
                        <span class="s01_kt_type">学生参与度</span>
                        <span class="s01_kt_result">较好</span>
                    </div>
                    <div class="s01_kt_hyd s01_kt_hyd3">
                        <i class="s01_kt_hyd_icon"></i>
                        <span class="s01_kt_type">授课类型</span>
                        <span class="s01_kt_result">讲授型</span>
                    </div>
                </div>
            </div>
            <!--视频-->
            <!--图表-->
            <EchartsQLine title="活跃度分析" :width="644* 100 / 1093+'%'"
                          :height="275* 480 / (1200 * 12)+'rem'"
                          @playTimeEvent="playTimeEvent"
            ></EchartsQLine>
            <EchartsPie title="活跃度比率" :width="431* 100 / 1093+'%'"
                        :height="275* 480 / (1200 * 12)+'rem'"></EchartsPie>
<!--            <EchartsBar title="参与度分析" :width="644* 100 / 1093+'%'" legendName="情绪指数"-->
<!--                        :height="275* 480 / (1200 * 12)+'rem'"-->
<!--                        @playTimeEvent="playTimeEvent"-->
<!--            ></EchartsBar>-->
            <EchartsLine title="参与度分析"
                         :width="644* 100 / 1093+'%'"
                         :height="275* 480 / (1200 * 12)+'rem'"
                         @playTimeEvent="playTimeEvent1"
            ></EchartsLine>
            <ProgressCircle title="互动频率" :width="431* 100 / 1093+'%'"
                            :height="275* 480 / (1200 * 12)+'rem'"></ProgressCircle>

            <EchartsLine title="教学行为分析" :width="644* 100 / 1093+'%'"
                         :height="275* 480 / (1200 * 12)+'rem'"
                         @playTimeEvent="playTimeEvent"
            ></EchartsLine>
            <EchartsPie2 title="教学行为比率" :width="431* 100 / 1093+'%'"
                         :height="275* 480 / (1200 * 12)+'rem'"></EchartsPie2>
            <!--图表-->

        </div>
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import DateRanger from "../../components/DateRanger.vue"
    import Mytable from "../../components/Mytable.vue"
    import SlideVideo from "../../components/Video/SlideVideo.vue"
    import EchartsQLine from "../../components/Echarts/EchartsQLine.vue"
    import EchartsPie from "../../components/Echarts/EchartsPie.vue"
    import EchartsBar from "../../components/Echarts/EchartsBar.vue"
    import ProgressCircle from "../../components/Echarts/ProgressCircle.vue"
    import EchartsLine from "../../components/Echarts/EchartsLine.vue"
    import EchartsPie2 from "../../components/Echarts/EchartsPie2.vue"


    export default {
        name: "keTangPingJiaView",
        components: {
            ContentTitle,
            ListCondition,
            DateRanger,
            Mytable,
            EchartsQLine,
            SlideVideo,
            EchartsPie,
            EchartsBar,
            ProgressCircle,
            EchartsLine,
            EchartsPie2
        },
        data() {
            return {
                options1: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }],
                value1: '',
                options2: [
                    {
                        value: '选项1',
                        label: '黄金糕'
                    }, {
                        value: '选项2',
                        label: '双皮奶'
                    }, {
                        value: '选项3',
                        label: '蚵仔煎'
                    }, {
                        value: '选项4',
                        label: '龙须面'
                    }, {
                        value: '选项5',
                        label: '北京烤鸭'
                    }],
                value2: '',
            }
        },
        computed: {},
        mounted() {
        },
        methods: {
            // 返回
            backPage() {
                this.$router.push({
                    name: "courseManList"
                });
            },
            playTimeEvent(arg) {
                this.$refs.slidevideo.playTime(arg/60);
            },
        }
    }
</script>

<style lang="scss">
    .s01_keTangPingJiaList {
        .s01_ketang_table {
            width: 100%;
            margin-top: 15rem * 480 / (1200 * 12);
        }


        /*视频*/
        .s01_show_part1 {
            width: 100%;
            overflow: hidden;
            height: 303rem * 480 / (1200 * 12);
            background-color: #fff;
            margin-top: 19rem * 480 / (1200 * 12);
            position: relative;


            .s01_show_part1_right {
                width: 290*100%/1093;
                height: 100%;
                float: right;
                align-items: center;
                text-align: left;

                .s01_kt_hyd {
                    width: 250*100%/290;
                    height: 80rem * 480 / (1200 * 12);
                    line-height: 80rem * 480 / (1200 * 12);
                    box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);
                    color: #5c6565;
                    margin-left: 27rem * 480 / (1200 * 12);
                    margin-top: 16rem * 480 / (1200 * 12);

                    .s01_kt_hyd_icon {
                        width: 28rem * 480 / (1200 * 12);
                        height: 28rem * 480 / (1200 * 12);
                        display: inline-block;
                        background-repeat: no-repeat;
                        -webkit-background-size: 50%;
                        background-size: 50%;
                        background-position: center;
                        -webkit-border-radius: 50%;
                        -moz-border-radius: 50%;
                        border-radius: 50%;
                        margin-left: 41*100%/250;;
                    }

                    .s01_kt_type {
                        font-size: 14rem * 480 / (1200 * 12);
                        display: inline-block;
                        height: 80rem * 480 / (1200 * 12);
                        line-height: 80rem * 480 / (1200 * 12);
                        vertical-align: top;
                        color: #5c6565;
                    }

                    .s01_kt_result {
                        font-size: 20rem * 480 / (1200 * 12);
                        display: inline-block;
                        height: 80rem * 480 / (1200 * 12);
                        line-height: 80rem * 480 / (1200 * 12);
                        vertical-align: top;
                        color: #5c6565;
                    }
                }

                .s01_kt_hyd1 {
                    .s01_kt_hyd_icon {
                        background-image: url(../../../static/imgs/kt_hyd1.png);
                        background-color: #76d9df;
                    }
                }

                .s01_kt_hyd2 {
                    .s01_kt_hyd_icon {
                        background-image: url(../../../static/imgs/kt_hyd2.png);
                        background-color: #09aef5;
                    }
                }

                .s01_kt_hyd3 {
                    .s01_kt_hyd_icon {
                        background-image: url(../../../static/imgs/kt_hyd3.png);
                        background-color: #77c176;
                    }
                }
            }
        }
    }

    .el-carousel__item h3 {
        color: #475669;
        font-size: 18px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n+1) {
        background-color: #d3dce6;
    }

    /*响应式*/
    .s01_keTangPingJiaList {
        @media screen and (max-width: 1170px) {
            .s01_keTangPingJia_view_echarts {
                .s01_EchartsBox {

                    .s01_ProgressCircle {
                        width: 308%*100/430;

                        .s01_ProgressCircle_combs {
                            margin-right: 0;
                        }

                        .s01_ProgressCircle_combs04 {
                            margin-right: 0;

                        }
                    }
                }
            }

        }
        @media screen and (max-width: 989px) {
            .s01_show_part1 {
                height: auto;

                .s01_ketang_video {
                    width: 99%;
                    height: 303rem * 480 / (1200 * 12);

                    .s01_kt_hyd {

                    }
                }

                .s01_show_part1_right {
                    width: 100%;
                    text-align: center;

                    .s01_kt_hyd {
                        width: 32%;
                        display: inline-block;
                        margin-left: 0;
                        margin-right: 0;
                        margin-bottom: 10rem * 480 / (1200 * 12);
                    }

                }


            }
            .s01_keTangPingJia_view_echarts {
                .s01_EchartsBox {
                    width: 100% !important;

                    .s01_ProgressCircle {
                        margin-left: 0;
                        margin-right: 0;
                        text-align: center;
                        width: 100%;

                        .s01_ProgressCircle_combs {
                            vertical-align: top;
                            margin-bottom: 0;
                            margin-top: 30rem * 480 / (1200 * 12);
                            margin-right: 38rem * 480 / (1200 * 12);
                            float: initial;
                        }

                        .s01_ProgressCircle_combs04 {
                            margin-right: 0;

                        }


                        @media screen and (max-width: 705px) {
                            .s01_ProgressCircle_combs {
                                margin: 0;
                            }
                        }
                    }
                }
            }

        }
        @media screen and (max-width: 705px) {
            .s01_EchartsBox:nth-child(5) {
                height: initial !important;
            }
        }
    }

    /*响应式*/
</style>
