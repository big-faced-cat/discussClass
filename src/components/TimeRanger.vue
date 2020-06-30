<template>
    <div class="s01_TimeRanger">
        上课时间
        <el-time-picker class="s01_list_timeranger"
                v-model="value1"
                placeholder="开始时间" @change="change">
        </el-time-picker>
        -
        <el-time-picker class="s01_list_timeranger"
                arrow-control
                v-model="value2"
                placeholder="结束时间" @change="change">
        </el-time-picker>
    </div>
</template>

<script>
    export default {
        name: "TimeRanger",
        props: ["value"],
        data() {
            return {
                value1:"",
                value2:""
            }
        },
        methods: {
            change() {
                this.$emit('input', [this.value1,this.value2])
            }
        }
    }
</script>

<style scoped lang="scss">
    .s01_TimeRanger {
        display: inline-block;

        .s01_list_timeranger {
            /*border: none;*/
            width: 120px;

        }
    }
</style>