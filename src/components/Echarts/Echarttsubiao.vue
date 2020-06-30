<template>
    <EchartsBox :title="title" width="98%" :height="defaultHeight" style="float:left;">
        <div :id="RANDOM_ID" class="s01_EchartsQLine">

        </div>
    </EchartsBox>
</template>

<script>
    import EchartsBox from "./EchartsBox.vue"

    export default {
        name: "Echartstubiao",
        props: ["title", "width", "height"],
        components: {EchartsBox},
        data() {
            return {
                defaultWidth: this.width ? this.width : "100%",
                defaultHeight: this.height ? this.height : "100%",
            }
        },
        mounted() {
            var self = this;
            // 基于准备好的dom，初始化echarts实例
            var myChart = echarts.init(document.getElementById(this.RANDOM_ID));

            var data = [
           
            ];

            var option = {
    title: {
        // text: '折线图堆叠'
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data: ['情绪', '专注', '思考', '认真', '笔记']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name: '情绪',
            type: 'line',
            stack: '总量',
            data: [20, 132, 101, 134, 90, 230, 210]
        },
        {
            name: '专注',
            type: 'line',
            stack: '总量',
            data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
            name: '思考',
            type: 'line',
            stack: '总量',
            data: [150, 232, 201, 154, 190, 330, 410]
        },
        {
            name: '认真',
            type: 'line',
            stack: '总量',
            data: [320, 332, 301, 334, 390, 330, 320]
        },
        {
            name: '笔记',
            type: 'line',
            stack: '总量',
            data: [820, 932, 901, 934, 1290, 1330, 1320]
        }
    ]
};


            // 使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);
            //点击事件
            myChart.on('click', function (params) {
                if (params.value) {
                    self.$emit("playTimeEvent", params.value[0] * 60)
                } else {
                }
            });

            BUS.$on("resize", function () {
                myChart.resize();
            });

        },
        computed: {
            RANDOM_ID() {
                return "s01_EchartsQLine_"+(new Date()).getTime() + "_" + Math.floor(Math.random() * 1000)
            }
        }
    }
</script>

<style scoped>
    .s01_EchartsQLine {
        width: 100%;
        height: 100%;
        position: absolute;
        left:0;
        bottom: -6%;
    }
</style>