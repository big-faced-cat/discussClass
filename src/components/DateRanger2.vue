<template>
    <div class="s01_DateRanger">
        上课时间
        <el-date-picker
                class="s01_list_dateranger"
                v-model="value1"
                type="datetime"
                placeholder="开始时间" @change="change">
        </el-date-picker>
        <el-date-picker
                class="s01_list_dateranger"
                v-model="value2"
                type="datetime"
                placeholder="结束时间" @change="change">
        </el-date-picker>
    </div>
</template>

<script>
    export default {
        name: "DateRanger",
        props:["value"],
        data() {
            return {
                value1: '',
                value2: '',
            };
        },
        methods: {
            change() {
                console.log(arguments,this.value1,this.value2);
                if(!this.value1 && !this.value2){
                    if(this.value1>this.value2){
                        this.$notify.error({
                            message:"开始时间必须小于结束时间"
                        });
                        this.value2="";
                        return ;
                    }
                }
                this.$emit('input', [this.value1,this.value2])
            }
        }
    }
</script>

<style scoped lang="scss">
    .s01_DateRanger {
        display: inline-block;

        .s01_list_dateranger {
            /*border: none;*/
            width: 195px;

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