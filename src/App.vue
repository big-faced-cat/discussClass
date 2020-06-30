<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script>
    export default {
        name: 'App'
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 100%;
    }

    .s01_ketang_table {
        padding-top: 10rem * 480 / (1200 * 12);
        padding-left: 10rem * 480 / (1200 * 12);
        background: #fff;

    }
    .s01_vue_loading{
        z-index:999999999999!important;
    }
    .layui-layer-btn a{
        font-size:18rem * 480 / (1200 * 12);
    }
    .el-notification{
        z-index:999999999999!important;
    }
    .el-select-dropdown{
        z-index:999999999999!important;
    }
    .el-form-item__label{
        line-height:1em;
        padding-top:1em;
    }
    .el-popper[x-placement^=top]{
        z-index:999999999999!important;
    }
    .el-input .el-input__clear:hover{color:#f00;}
</style>
