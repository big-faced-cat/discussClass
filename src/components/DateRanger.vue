<template>
    <div class="s01_DateRanger">
        日期
        <el-date-picker size="medium" class="s01_list_dateranger" prefix-icon=""
                        v-model="value"
                        type="daterange"
                        start-placeholder="开始日期"
                        end-placeholder="结束日期"
                        :default-time="['00:00:00', '23:59:59']">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "DateRanger",
        data() {
            return {
                value: ''
            };
        }
    }
</script>

<style scoped lang="scss">
    .s01_DateRanger {
        display: inline-block;

        .s01_list_dateranger {
            /*border: none;*/
            width: 244px;

        }
        /*.el-range-input{*/
            /*height:30px;*/
            /*border: solid 1px #e6e6e6;*/
        /*}*/
        /*.el-date-editor .el-range__icon {*/
            /*display: none!important;*/
        /*}*/
    }

</style>