<template>
<div class="s01_studentsList">
    <ContentTitle>学校管理</ContentTitle>
    <ListCondition>
    <el-row :gutter="24" class="schoolGrid  paddingSet">
        <el-col :span="6" v-for="(item,index) in schools" :key="index" >
            <div class="shchool_o1">
                <span  :class="deleteSchool ? 'shcholDelete' : 'shcholDelete1'" >
                    <i class="el-icon-error"  @click="schoolDeleteConfirm(item)" ></i>
                </span>
                <div  @click="editSchool ?openAddEdit(item) : null" style="width: 100%; text-align: center;">
                <p class="schoolIconTop"><i class="iconfont">&#xe607;</i></p>
                    <el-tooltip placement="top"  effect="light">
                        <div slot="content">学校名称：{{item.name}}<br/>学校编号：{{item.no}}</div>
                        <div>
                            <p class="overMethod">学校名称：{{item.name}}</p>
                            <p  class="overMethod">学校编号：{{item.no}}</p>
                        </div>
                    </el-tooltip>
            </div>
            </div>
        </el-col>
        <el-col :span="6"   v-if="addSchool">
          <div class="shchool_o1 shchool_add">
            <div  @click="openAddEdit(null)">
                <p class="schoolAddTop" style="margin-bottom: 10px;"><i class="el-icon-circle-plus-outline"></i></p>
                <p>创建学校</p>
            </div>
            </div>
           </el-col>
    </el-row>
        </ListCondition>
    <schoolAddEdit ref="schoolAddEdit" @refresh-list="getSchoolList"></schoolAddEdit>
</div>
</template>

<script>
    import schoolAddEdit from "../../components/school/schoolAddEdit.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import ContentTitle from "../../components/ContentTitle.vue"
    export default {
        name: "school",
        components: { schoolAddEdit, ListCondition, ContentTitle},
     data() {
         let getPowerData=  JSON.parse(localStorage.getItem('powerDictionary'));
         return {
             schools: [],
             addSchool:getPowerData['post-school-null'],
             editSchool: getPowerData['put-school-null'],
             deleteSchool: getPowerData['delete-school-null'],
         }
     },
        methods: {
            openAddEdit(item) {
                this.$refs.schoolAddEdit.openPopup(item);
            },
            // 获取学校列表
            getSchoolList() {
                Ajax.School.get().then((res) => {
                    if (res.status == 200) {
                        if (res.data.content) {
                            this.schools = res.data.content.pagedData;
                        }
                    }
                })
            },
            schoolDeleteConfirm(item) {
                layer.confirm("确认删除?", (layro) => {
                    var ids = [];
                    // this.multipleSelection.map((item) => {
                        ids.push(item.id)
                    // });
                    Ajax.School.delete(ids).then((res) => {
                        if (res.status == 200) {
                            this.getSchoolList();
                            layer.close(layro)
                        }
                    })
                })
            },

        },
        beforeMount() {


        },
        mounted() {
            this.getSchoolList();
        }
    }
</script>





<style lang="scss">
    .shchool_add {
        background-color: $list-ui-bg-add  !important;
    }
    .overMethod{
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        word-break: break-all;
        padding-bottom: 5px;
    }
    .paddingSet{
        padding: 20px;
    }
    ContentTitle{
        height: 0.66667rem;
        font-size: 0.66667rem;
        line-height: 0.66667rem;
        margin-bottom: 0.66667rem;
        color: #333333;
    }
    .schoolGrid {
        div {

                .shchool_o1 {
                    background: $list-ui-bg;
                    border-radius: 10px;
                    padding: 5px 5px 30px;
                    display: flex;
                    flex-direction: column;
                    align-content: center;
                    color: $list-ui-color;
                    font-weight: bold;
                    font-size: 15px;
                    cursor: pointer;
                    border: 1px solid rgba(0, 0, 0, 0.1);
                    margin: 5px;
                    align-items: center;

                    p {
                        align-content: center;
                        width: 100%;
                    }

                    .schoolAddTop {
                        padding-top: 40px;
                        text-align: center;

                    }

                    .schoolIconTop {
                        /*padding-top: 20px;*/
                        text-align: center;
                    }

                    .shcholDelete {
                        width: 100%;
                        display: inline-flex;
                        color: $delete-outer;
                        float: right;
                        justify-content: flex-end;
                    }

                    .shcholDelete1 {
                        width: 100%;
                        display: inline-flex;
                        color: $delete-outer;
                        float: right;
                        justify-content: flex-end;
                        visibility: hidden;
                    }
                }

        }

    }

</style>
