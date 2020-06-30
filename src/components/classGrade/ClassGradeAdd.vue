<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_StudentAdd">

                        <div id='contentArround'>
                            <div id='topBoorder'></div>
                                <div>
                                  <el-table
                                        ref="multipleTable"
                                        :data="tableData"
                                        tooltip-effect="dark"
                                        style="width: 100%"
                                        @selection-change="handleSelectionChange">
                                        <el-table-column
                                        type="selection"
                                        width="55">
                                        </el-table-column>
                                        <el-table-column
                                        label="日期"
                                        width="120">
                                        <template slot-scope="scope">{{ scope.row.date }}</template>
                                        </el-table-column>
                                        <el-table-column
                                        prop="name"
                                        label="姓名"
                                        width="120">
                                        </el-table-column>
                                        <el-table-column
                                        prop="address"
                                        label="地址"
                                        show-overflow-tooltip>
                                        </el-table-column>
                                    </el-table>
                                    <div style="margin-top: 20px">
                                        <!-- <el-button @click="toggleSelection([tableData[1], tableData[2]])">切换第二、第三行的选中状态</el-button> -->
                                        <el-button @click="closePopup()" style="background:lightblue;color:#fff;font-weight:bold; font-size:16px;margin-left:46%;margin-top:-25px;">导 出</el-button>

                                </div>
                            </div>
                        </div>


                <el-form-item size="large">
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        {{TIMEOUT===0?(currentRow?"立即更新":"立即创建"):"提交中..."}}
                    </el-button>
                    <el-button @click="closePopup">取消</el-button>
                </el-form-item>

        </div>

    </MyPopup>

</template>

<script>
    import MyPopup from "../MyPopup.vue"
    import Picut from "../teacher/picCutComponent"
    import Analyse from '../../views/keTangPingJia/stuEvuTuBiao'
    // show-if
    export default {
        name: "StudentAdd",
        props: [],
        data() {

            var photoVali = (rule, value, callback) => {
                if (this.currentRow==""&&value=="") {
                    callback(new Error('请上传供人脸识别的头像'));
                } else {
                    callback();
                }
            };
            return {
                options1: [],//年级
                options2: [],//班级
                ruleForm: {
                    "gradeId":"",
                    "Name": "",
                    "Number": "",
                    "ClassGradeId": "",
                    "AvatarImage": ""
                },
                 tableData: [{
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-08',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-06',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-07',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }],
        multipleSelection: []
      }


        },
        components: {MyPopup,Picut,Analyse},
        methods: {

            /**
             * 打开弹出框
             */
            openPopup(currentRow) {
                this.currentRow = currentRow;
                if (this.currentRow) {
                    this.getDetail()
                }
                this.$refs.MyPopup.openPopup(...arguments);
            },

            toggleSelection(){
                // alert(1)
            },

            /**
             * 关闭自己
             */
            closePopup() {
                 this.$emit("show-if");
                //关闭弹窗框
                this.$refs.MyPopup.closePopup(...arguments);
                //触发列表刷新
                this.tellParentFresh();
                this.resetForm("ruleForm");
                this.imageUrl="";
                this.imageObj=null;
                this.TIMEOUT = 0;
                // <Analyse></Analyse>   问题 怎么调用
            },
            tellParentFresh() {
                this.$emit("refresh-list")
            },
            /**
             * 获取年级
             */
            getGradeList() {
                Ajax.EssentialData.getGradeList().then((res) => {
                    this.options1 = res.data.content;
                })
            },
            /**
             * 获取班级(注意!classGrade中关联过的班级)
             */
            getClassGradeList(gradeId) {
                if (gradeId != '') {
                    var params = {
                        GradeId: gradeId
                    };
                    Ajax.ClassGrade.get(params).then((res) => {
                        this.options2 = res.data.content.data;
                    })
                } else {
                    this.options2 = [];
                    this.ruleForm.classGradeId = "";
                }

            },
            handleAvatarSuccess(res, file) {
            },
            beforeAvatarUpload(file) {
                const isJPG = file.type === 'image/jpeg' || file.type === 'image/png';
                const isLt2M = file.size / 1024  < FILE_SIZE;
                if (!isJPG) {
                    this.$notify.error('上传头像图片只能是 JPG|PNG 格式!');
                    return false;
                }
                if (!isLt2M) {
                    this.$notify.error('上传头像图片大小不能超过 2MB!');
                    return false;
                }
                this.imageUrl = URL.createObjectURL(file);

                this.ruleForm.AvatarImage = file;
                return false;
            }
        },
        computed: {
            title() {
                return "课堂对比"
            },
            FILE_SIZE(){
                return FILE_SIZE/1024+"MB";
            }
        },
        created() {
            // this.getGradeList();
        },
        mounted() {

        }
    }
</script>

<style lang="scss">
    .s01_StudentAdd {
        .s01_database_text {
            textarea {
                width:100rem;
                height: 100%;
            }
        }
    }

    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #409EFF;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        max-width: 178px;
        max-height: 178px;
        display: block;
    }
    #contentArround{
        height:400px;
    }
    #topBoorder{
        border-top:1px solid #aaa;
        width:850px;
    }
</style>
