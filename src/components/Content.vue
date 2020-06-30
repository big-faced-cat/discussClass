<template>
    <div class="s01_content">
            <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "Content"
    }
</script>

<style scoped lang="scss">
    .s01_content {
        flex-grow: 1;
        height: calc(100vh - 68rem * 480 / (1200 * 12));
        padding-left: 20rem * 480 / (1200 * 12);
        padding-top: 20rem * 480 / (1200 * 12);
        overflow: auto;
        background:rgb(246,246,249) !important;
        position: absolute;
        top:68rem * 480 / (1200 * 12);
        left:86rem * 480 / (1200 * 12);
        right:0;
    }
</style>
