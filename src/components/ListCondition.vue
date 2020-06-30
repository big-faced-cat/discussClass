<template>
    <div class="s01_ListCondition">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ListCondition"
    }
</script>

<style  lang="scss">
    .s01_ListCondition {
        width: 100%;
        min-height: 60rem * 480 / (1200 * 12);
        background-color: #ffffff;
        box-shadow: 2px 2px 4px 0px rgba(0, 0, 0, 0.1);
        font-size: 14rem * 480 / (1200 * 12);
        color: #4d4d4d;
        &>*,&>.el-button{margin:18rem * 480 / (1200 * 12) 10rem * 480 / (1200 * 12) 0;}
        padding-bottom:15rem * 480 / (1200 * 12);
        .s01_content_link {
            display: inline-block;
            font-size: 14rem * 480 / (1200 * 12);
            margin-top: 21rem * 480 / (1200 * 12);
            margin-right: 13rem * 480 / (1200 * 12);
            margin-left: 0;

            &.router-link-active {
                color: #fdb045;
                font-size: 16rem * 480 / (1200 * 12);
            }

            &:first-child {
                margin-left: 20rem * 480 / (1200 * 12);
            }
        }

    }
</style>