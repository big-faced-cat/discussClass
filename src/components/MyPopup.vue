<template>
    <div :class="'s01_MyPopup'+RANDOM">
        <slot></slot>
    </div>
</template>
<script>
    /**
     * 自定义弹出框
     * 自己就是个壳
     */
    export default {
        name: "MyPopup",
        props:["title", "popSize"], // popSize(small, middle, large)
        data() {
            return {
                RANDOM: new Date().getTime(),
                layerIndex: null,
            }
        },
        methods: {
            /**
             * 弹出自己
             */
            openPopup() {
                var self = this;
                setTimeout(function(){
                    self.layerIndex = layer.open({
                        type: 1,
                        title: self.title,
                        content: $(".s01_MyPopup" + self.RANDOM), //这里content是一个普通的String
                        area: self.popSize == 'middle' ? [500 * 480 / (1200 * 12) + "rem", 'auto'] :
                            self.popSize == 'large' ?    [500 * 480 / (1200 * 12) + "rem", 500 * 480 / (1200 * 12) + "rem"] :
                                ['auto', 'auto'],
                        maxHeight:'400px',
                        scrollbar: false,
                        shadeClose: true,
                        maxmin:true,
                        end: function () {
                            self.$emit("pop-close")
                        }
                    });
                },1)

            },
            /**
             * 关闭自己
             */
            closePopup() {
                layer.close(this.layerIndex)
            }
        }
    }
</script>

<style scoped lang="scss">
    [class^='s01_MyPopup'] {
        display: none;
        & > * {
            padding: 36rem * 480 / (1200 * 12) 36rem * 480 / (1200 * 12) ;
            height: auto;
        }
    }
</style>
