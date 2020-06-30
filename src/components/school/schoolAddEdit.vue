<template>
    <MyPopup ref="MyPopup" :title="title" @pop-close="closePopup">
        <div class="s01_ClassGradeAdd">
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                <el-form-item label="学校名称" prop="name">
                    <el-input class="s01_search_input" v-model="ruleForm.name" filterable placeholder=""
                               clearable
                              size="medium">
                    </el-input>
                </el-form-item>
                <el-form-item label="学校识别码" prop="no">
                    <el-input class="s01_search_input" v-model="ruleForm.no" filterable placeholder=""
                              clearable
                              maxlength="10">
                    </el-input>
                </el-form-item>
                <el-form-item label="地区" prop="position">
                    <el-select class="s01_search_input" v-on:change="getArea(ruleForm.provinceId, null , 2)" v-model="ruleForm.provinceId" filterable placeholder="省" style="width:150px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in provinceData"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select class="s01_search_input" v-model="ruleForm.cityId" v-on:change="getArea(ruleForm.cityId, null , 3)" filterable placeholder="市" style="width:150px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in cityData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select class="s01_search_input" v-model="ruleForm.countyId" filterable placeholder="区" style="width:150px;"
                               clearable
                               size="medium">
                        <el-option
                                v-for="item in countyData"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="学科项" prop="subjectIds">
                    <el-transfer
                            filterable
                            :filter-method="filterMethod"
                            filter-placeholder="请输入学科项拼音"
                            v-model="value"
                            :titles="['可选学科', '已选学科']"
                            :data="data">
                    </el-transfer>
                </el-form-item>
                <el-form-item size="large">
                    <el-button type="primary" @click="submitForm('ruleForm')">
                        {{TIMEOUT===0?(currentRow?"立即更新":"立即创建"):"提交中..."}}
                    </el-button>
                    <el-button @click="closePopup">取消</el-button>
                </el-form-item>
            </el-form>
        </div>
    </MyPopup>

</template>
<script>
    import MyPopup from "../MyPopup.vue"
    export default {
        name: "ClassGradeAdd",
        props: [],
        data() {
            let positionVal = (rule, value, callback) => {
                if (this.ruleForm.cityId != null && this.ruleForm.countyId != null && this.ruleForm.provinceId != null) {
                    callback();
                } else{
                    callback(new Error('请选择对应的省、市、区'));
                }
            };
            let schoolNoVal = (rule, value, callback) => {
                if (/^[0-9]{10}/.test(value)) {
                    callback();
                } else{
                    callback(new Error('学校识别码必须十位数字'));
                }
            };
            return {
                data: [],
                value: [],
                filterMethod(query, item) {
                    return item.pinyin.indexOf(query) > -1;
                },
                selectedOptions: [],
                provinceData: [],  // 省数据
                cityData: [], // 市数据
                countyData: [], // 区数据
                options1: [],//年级
                options2: [],//班级
                options3: [],//教室
                ruleForm: {
                    name: "",
                    provinceId: null,
                    cityId: null,
                    countyId: null,
                    position: '5555',
                    subjectIds: [
                    ],
                    no: ""
                },
                rules: {
                    name: [
                        {required: true, message: '请输入学校名称', trigger: 'blur'},
                    ],
                    no: [
                        {required: true, message: '请输入学校识别码', trigger: 'blur'},
                        { validator: schoolNoVal, trigger: 'blur' }
                    ],
                    position: [
                        { validator: positionVal,required: true, trigger: 'blur' }
                    ],
                },
                currentRow: null,   //数据id
                TIMEOUT: 0
            };
        },
        components: {MyPopup},
        methods: {
            handleChange (value) {
                console.log(value)
            },
            getDetail() {
                let params = {id: this.currentRow.id};
                Ajax.School.getDetail(params).then((res) => {
                    if (res.status == 200) {
                        if (res.data.content) {
                            this.ruleForm = res.data.content;
                            let subjectAll = [];
                            res.data.content.subjectsAble.filter(temp => {
                                subjectAll.push({
                                    label: temp.name,
                                    key: temp.id,
                                    pinyin: temp.name
                                });
                            });
                            this.data =  subjectAll;
                            // 右侧数据
                            if (res.data.content.subjectsOrigin.length > 0) {
                                this.value = res.data.content.subjectsOrigin.map(temp => temp.id);
                            } else {
                                this.value = [];
                            }
                        }
                    }
                });
            },
            submitForm(formName) {
                if (this.TIMEOUT === 0) {
                    this.$refs[formName].validate((valid, obj) => {
                        if (valid) {
                            this.TIMEOUT++;
                            if (!this.currentRow) {//新增
                                var list = [];
                                this.ruleForm.subjectIds = this.value;
                                list.push(
                                    this.ruleForm
                                );
                                Ajax.School.post(list).then((res) => {
                                    if (res.status == 200) {
                                        if(res.data.content!=0){
                                            this.closePopup()
                                        }else{
                                            this.$notify.error({
                                                title:"错误",
                                                message:"添加失败! 请检查是否已经存在"
                                            })
                                        }
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            } else {//编辑
                                this.ruleForm.subjectIds = this.value;
                                Ajax.School.put(this.ruleForm).then((res) => {
                                    if (res.status == 200) {
                                        if(!res.data.content){
                                            this.$notify.error({
                                                title:"错误",
                                                message:"更新失败! 请检查是否已经存在"
                                            })
                                        }else{
                                            this.closePopup()
                                        }
                                    }
                                }).finally(() => {
                                    this.TIMEOUT = 0;
                                })
                            }
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.$notify.info({
                        title: '消息',
                        message: '请勿重复提交'
                    });
                }
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            },
            /**
             * 打开弹出框
             */
            openPopup(currentRow) {
                this.$refs.MyPopup.openPopup(...arguments);
                this.currentRow = currentRow;
                if (this.currentRow) {
                    // 编辑窗口
                    this.getDetail();
                    this.getArea11(this.currentRow.provinceId, null , 2);
                    this.getArea11(this.currentRow.cityId, null , 3);
                    this.ruleForm.provinceId= this.currentRow.provinceId;
                    this.ruleForm.cityId = this.currentRow.cityId;
                    this.ruleForm.countyId = this.currentRow.countyId;
                } else {
                    this.getSubjects(0);
                    this.ruleForm.cityId= null;
                    this.ruleForm.provinceId = null;
                    this.ruleForm.countyId = null;
                    this.ruleForm.subjectIds = [];
                    this.value = [];
                }
            },
            /**
             * 关闭自己
             */
            closePopup() {
                this.$refs.MyPopup.closePopup(...arguments);
                this.tellParentFresh();
                this.ruleForm.subjectIds =[];
                this.resetForm("ruleForm")
                this.TIMEOUT = 0;
            },
            tellParentFresh() {
                this.$emit("refresh-list")
            },
            // 获取基础数据的内容
            getSubjects(params) {
                Ajax.EssentialData.getLists(params).then((res)=>{
                    if (res.status == 200) {
                        if (params == 0) {
                              let allTransferData = [];
                            res.data.content.filter (temp =>{
                             allTransferData.push(
                                 {
                                     label: temp.name,
                                     key: temp.id,
                                     pinyin: temp.name
                                 }
                             );
                            });
                            this.data = allTransferData;
                        }
                    }
                });
            },

            //  获取省 市 区 的数据
            getArea11(Pid, Id, grade) {
                let params = {
                    Pid: Pid,
                    Name: null,
                    Id: Id,
                };

                Ajax.Area.get(params).then((res) => {
                    console.log('省的数据', res);
                    if (res.status == 200) {
                        if (grade== 1)
                        {
                            this.provinceData = res.data.content;
                        }
                        if ( grade == 2) {
                            this.cityData =  res.data.content;
                        }
                        if ( grade == 3) {
                            this.countyData =  res.data.content;
                        }

                    }
                })
            },

            //  获取省 市 区 的数据
            getArea(Pid, Id, grade) {
                let params = {
                    Pid: Pid,
                    Name: null,
                    Id: Id,
                };

                Ajax.Area.get(params).then((res) => {
                    if (res.status == 200) {
                        if (grade== 1)
                        {
                            this.provinceData = res.data.content;
                        }
                        if ( grade == 2) {
                            this.cityData =  res.data.content;
                            this.ruleForm.countyId = null;
                            this.ruleForm.cityId = null;
                        }
                        if ( grade == 3) {
                            this.countyData =  res.data.content;
                            this.ruleForm.countyId = null;
                        }

                    }
                })
            },


        },
        computed: {
            title() {
                return this.currentRow ? ('修改学校'  ) : '添加学校'
            }
        },
        created() {

        },
        mounted() {
            if (this.currentRow) {

            } else {
                this.getArea(1, null, 1);
            }
        }
    }
</script>

<style lang="scss">
    .tranferStyle{
        width: 300px;
        height: 200px;
    }
    .s01_ClassGradeAdd {
        .s01_database_text {
            textarea {
                height: 100%;
            }
        }
    }
</style>
