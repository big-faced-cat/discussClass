<template>
    <EchartsBox :title="title" :width="defaultWidth" :height="defaultHeight" style="float:left;">
        <div :id="RANDOM_ID" class="s01_EchartsLine">

        </div>
    </EchartsBox>
</template>

<script>
    import EchartsBox from "./EchartsBox.vue"

    export default {
        name: "EchartsLine",
        props: ["title", "width", "height"],
        components: {EchartsBox},
        data() {
            return {
                defaultWidth: this.width ? this.width : "100%",
                defaultHeight: this.height ? this.height : "100%",
            }
        },
        mounted() {
            var self=this;
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.RANDOM_ID));

            var option = option = {
                xAxis: {
                    type: 'category',
                    data: ['0', '3', '9', '12', '15', '18', '21',"24","27","30","33","36","39","42","45","48",'51','54','57','60','63','66','69','71','74','77','80','83','86','89'],
                    name: "时间",
                    nameTextStyle: {
                        color: "#666",
                        fontFamily: "MicrosoftYaHei"
                    }
                },
                yAxis: {
                    type: 'value',
                    name: "课堂情景",
                    nameTextStyle: {
                        color: "#666",
                        fontFamily: "MicrosoftYaHei"
                    }
                },
                series: [{
                    data: this.title == '参与度分析' ? [-10, 10, 7, 9, 0, 15, 14, -5,18, 19, 0, 12,0, 5, -10, -7,-3,-5,12,4,0,13,-4,-3,-5,3,2,6,0,3] :
                        [0, 30, 30, 0, 0, 30, 30, 30,0, 0, 30, 30,0, 0, 30, 30,30,0,0,0,30,30,30,0,0,0,0,30,30,30],
                    type: 'line',
                    // smooth: true
                }],
                grid:{
                    top:65,
                    x:55,
                    x2:50,
                    y2:50
                }
            };

            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            //点击事件
            myChart.on('click', function (params) {
                console.log(params);
                if (params.value) {
                    self.$emit("playTimeEvent",params.name*60)
                } else {
                }
            });
            BUS.$on("resize", function () {
                myChart.resize();
            });

        },
        computed: {
            RANDOM_ID() {
                return "s01_EchartsLine_"+(new Date()).getTime() + "_" + Math.floor(Math.random() * 1000)
            }
        }
    }
</script>

<style scoped>
    .s01_EchartsLine {
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        bottom: -6%;
    }
</style>
