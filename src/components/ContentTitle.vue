<template>
    <div class="s01_content_title">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "ContentTitle"
    }
</script>

<style scoped lang="scss">
    .s01_content_title {
        height: 20rem * 480 / (1200 * 12);
        font-size: 20rem * 480 / (1200 * 12);
        line-height: 20rem * 480 / (1200 * 12);
        margin-bottom: 20rem * 480 / (1200 * 12);
        color: #333333;
    }
</style>