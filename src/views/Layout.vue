<template>
    <div class="s01_layout">
        <header1></header1>
        <Menu></Menu>
        <router-view>正在加载...</router-view>
    </div>
</template>

<script>
    import Head from "../components/Head.vue"
    import Menu from "../components/Menu.vue"
    import Content from "../components/Content.vue"
    export default {
        name: "Layout",
        components:{
            header1:Head,
            Menu,
            Content
        }
    }
</script>

<style scoped lang="scss">
.s01_layout{
    background:rgb(246,246,249) !important;
    width:100%;
    height:auto;
}
</style>
