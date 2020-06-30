<template>
    <div class="s01_EchartsBox" :style="{width:width,height:height}">
        <div class="s01_charts_title">
            <i class="s01_charts_title_line"></i>{{title}}
        </div>
        <div class="s01_charts" style="width:100%;height:100%;">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    /**
     * echarts图表
     */
    export default {
        name: "EchartsBox",
        props: ["title", "width", "height"],
        data() {
            return {
                defaultWidth:this.width?this.width:"100%",
                defaultHeight:this.height?this.height:"100%",
            }
        },
    }
</script>

<style scoped lang="scss">
    .s01_EchartsBox {

        background-color: #ffffff;
        box-shadow: 0px 3px 4px 0px rgba(0, 0, 0, 0.1);
        display: inline-block;
        padding: 20rem * 480 / (1200 * 12);
        position: relative;
        margin-top:20rem * 480 / (1200 * 12);
        .s01_charts_title {
            color: #333333;
            font-size: 16rem * 480 / (1200 * 12);
            height: 20rem * 480 / (1200 * 12);
            line-height: 20rem * 480 / (1200 * 12);
            margin-bottom: 15rem * 480 / (1200 * 12);

            .s01_charts_title_line {
                display: inline-block;
                width: 5rem * 480 / (1200 * 12);
                background-color: #fdb045;
                height: 20rem * 480 / (1200 * 12);
                vertical-align: middle;
                border-radius: 3px;
                margin-right: 10rem * 480 / (1200 * 12);
            }

        }
    }
</style>