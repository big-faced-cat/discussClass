<template>
    <EchartsBox :title="title" :width="defaultWidth" :height="defaultHeight" style="float:left;">
        <div :id="RANDOM_ID" class="s01_EchartsBar">

        </div>
    </EchartsBox>
</template>

<script>
    import EchartsBox from "./EchartsBox.vue"

    export default {
        name: "EchartsQLine",
        props: ["title", "width", "height","legendName"],
        components: {EchartsBox},
        data() {
            return {
                defaultWidth: this.width ? this.width : "100%",
                defaultHeight: this.height ? this.height : "100%",
            }
        },
        mounted() {
            var _self=this;
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.RANDOM_ID));


            var option = {
                legend: {
                    right: 30,
                    data: [_self.legendName],
                },
                xAxis: {
                    type: 'category',
                    data: ['0', '5', '10', '15', '20', '25', '30','35','40','45'],
                    name: "时间",
                    nameTextStyle: {
                        color: "#666",
                        fontFamily: "MicrosoftYaHei"
                    }
                },
                yAxis: {
                    type: 'value',
                    name: "情绪指数",
                    nameTextStyle: {
                        color: "#666",
                        fontFamily: "MicrosoftYaHei"
                    }
                },
                series: [{
                    data: [120, 200, 150, 80, 70, 110, 130,1,2,3],
                    type: 'bar',
                    name:_self.legendName,
                    itemStyle: {
                        normal: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#83bff6'},
                                    {offset: 0.5, color: '#188df0'},
                                    {offset: 1, color: '#188df0'}
                                ]
                            )
                        },
                        emphasis: {
                            color: new echarts.graphic.LinearGradient(
                                0, 0, 0, 1,
                                [
                                    {offset: 0, color: '#2378f7'},
                                    {offset: 0.7, color: '#2378f7'},
                                    {offset: 1, color: '#83bff6'}
                                ]
                            )
                        }
                    },
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
                    _self.$emit("playTimeEvent",params.name*60)
                } else {
                }
            });
            BUS.$on("resize", function () {
                myChart.resize();
            });

        },
        computed: {
            RANDOM_ID() {
                return "s01_EchartsBar_"+(new Date()).getTime() + "_" + Math.floor(Math.random() * 1000)
            }
        }
    }
</script>

<style scoped>
    .s01_EchartsBar {
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        bottom: -6%;
    }
</style>