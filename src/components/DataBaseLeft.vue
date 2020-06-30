<template>
    <div class="s01_MyZtree s01_content_left">
        <ul class="s01_ul">
            <li class="s01_li"
                :class="{active:currentCategory==item.id}"
                v-for="(item,index) in categoryList"
                :key="index"
                @click="clickCategory(item)"
            >{{item.displayName}}</li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "DataBaseLeft",
        props:["categoryList","currentCategory"],
        data() {
            return {
                keyword:""//模糊搜所
            }
        },
        methods:{
            clickCategory(item){
                // 改变选择的数据

                this.$router.replace(
                    {
                        name: "dataBaseList",
                        query: {
                            categoryId: item.id
                        }
                    }
                );



            }
        }
    }
</script>

<style scoped lang="scss">
    .s01_content_left {
        .s01_search_input {
            width: 130rem * 480 / (1200 * 12);
        }

        .s01_ul{
            width: 130rem * 480 / (1200 * 12);
            border:1px solid #C0C4CC;
            margin-top:10rem * 480 / (1200 * 12);
            font-size:14rem * 480 / (1200 * 12);
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
            text-align:center;
            .s01_li{
                border-bottom:1px solid #C0C4CC;
                height:34rem * 480 / (1200 * 12);
                line-height:34rem * 480 / (1200 * 12);
                cursor: pointer;
                &:hover{
                    background-color: #f6fdff;
                }
                &.active{
                    background-color: rgb(253, 176, 69);
                    color:#fff;
                }
                &:last-child{
                    border:none;
                }
            }
        }
    }
</style>
