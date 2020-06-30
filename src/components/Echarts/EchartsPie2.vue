<template>
    <EchartsBox :title="title" :width="defaultWidth" :height="defaultHeight" style="float:right;">
        <div id="s01_EchartsPie2">

        </div>
    </EchartsBox>
</template>

<script>
    import EchartsBox from "./EchartsBox.vue"

    export default {
        name: "EchartsPie2",
        props: ["title", "width", "height"],
        components: {EchartsBox},
        data() {
            return {
                defaultWidth: this.width ? this.width : "100%",
                defaultHeight: this.height ? this.height : "100%",
            }
        },
        mounted() {
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById('s01_EchartsPie2'));
            /**
             * 数据分组标题
             * @type {{联盟广告: string, 直接访问: string, 邮件营销: string}}
             */
            var lengendDate =
                [
                    {name: '讨论', defaultValue: "11%"},
                    {name: '联系', defaultValue: "12%"},
                    {name: '听课', defaultValue: "26%"}
                ];


            var option = option = {
                tooltip: {
                    trigger: 'item',
                    formatter: "{a} <br/>{b}: {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    y: "center",
                    left: "70%",
                    data:lengendDate,
                    formatter: function (name) {
                        for(var i=0;i<lengendDate.length;i++){
                            if(lengendDate[i].name===name){
                                name+=" \n参考 "+lengendDate[i].defaultValue
                                break;
                            }
                        }
                        return name;
                    },
                    textStyle:{
                        color:'#525151',
                        lineheight: "18px"
                    }

                },
                series: [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius: ['50%', '70%'],
                        avoidLabelOverlap: false,
                        legend: {
                            right: 0,
                        },
                        center:['40%','50%'],
                        label: {
                            normal: {
                                show: false,
                                position: 'center'
                            },
                            emphasis: {
                                show: true,
                                textStyle: {
                                    fontSize: '30',
                                    fontWeight: 'bold'
                                }
                            }
                        },
                        labelLine: {
                            normal: {
                                show: false
                            }
                        },
                        data: [
                            {value: 335, name: '讨论'},
                            {value: 310, name: '联系'},
                            {value: 234, name: '听课'},
                        ]
                    }
                ]
            };


            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

            BUS.$on("resize", function () {
                myChart.resize();
            });

        }
    }
</script>

<style scoped>
    #s01_EchartsPie2 {
        width: 104%;
        height: 94%;
        position: absolute;
        left: -2%;
        bottom: -6%;
    }
</style>