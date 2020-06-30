<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div class="s01_courseMan" >
        <ContentTitle>巡课</ContentTitle>
        <ListCondition style="padding-bottom: 0px !important;">
<!--            <embed type="application/x-vlc-plugin" pluginspage="http://www.videolan.org"-->
<!--                   width="640"-->
<!--                   height="480"-->
<!--                   id="vlc">-->
<!--            </embed>-->

<!--            <video class="tvhou" width="100%" height="100%"-->
<!--                   controls="controls" autoplay="autoplay"-->
<!--                   x-webkit-airplay="true" x5-video-player-fullscreen="true"-->
<!--                   preload="auto" playsinline="true" webkit-playsinline-->
<!--                   x5-video-player-typ="h5">-->
<!--                <source type="application/x-mpegURL" src="http://192.168.0.202:1936/live/test.m3u8">-->
<!--            </video>-->


<!--           <video id="my-video111" class="video-js vjs-default-skin" controls preload="auto" poster="">-->
<!--               <source src="http://192.168.0.138:10060/live/13.m3u8" type="application/x-mpegURL">-->
<!--           </video>-->

<!--            <video id="my-video222" class="video-js vjs-default-skin" controls preload="auto" poster="">-->
<!--                <source src="http://192.168.0.138:10060/live/26.m3u8" type="application/x-mpegURL">-->
<!--            </video>-->
            <el-row :gutter="24">
               <el-col :span="bigWindown? 23: 17">
                   <div class="grid-content bg-purple" style="padding: 10px; border-top: 2px solid #2A8BA7; ">
                       <el-row :gutter="24" style=" height: 290px;">
                           <el-col v-for="(item, index) in https" :span="12"   style="display: flex; align-items: center; justify-content: center">
                                         <video v-if="item != null" :id="'my-video'+index"  style="height: 290px; width: 100%; background-color: #ccc; margin: 10px 0;"  class="video-js vjs-default-skin" controls preload="auto" poster="">
                                              <source :src="item" type="application/x-mpegURL">
<!--                                             <source src="http://192.168.0.138:10060/live/13.m3u8" type="application/x-mpegURL">-->

                                         </video>
                               <canvas  v-if="item == null" id="video-canvas2" style="height: 290px;  width: 100%; background-color: #ccc; margin: 10px 0;"></canvas>
                           </el-col>
                       </el-row>

                   </div>
               </el-col>
               <el-col :span="1" style="background-color:rgb(246,246,249); height: 100% ">
                   <div class="grid-content bg-purple"  style="height: 630px; display: flex;  align-items: center; justify-content: center;">
                       <i  :class=" !bigWindown ? 'el-icon-caret-right' : 'el-icon-caret-left'" style="cursor: pointer; font-size: 34px; color: #2A8BA7;" v-on:click="expanse"></i></div>
               </el-col>
               <el-col v-if="!bigWindown" :span="6" >
                   <div class="grid-content bg-purple" style="padding: 10px; border-top: 2px solid #2A8BA7;  ">
                       <p class="right_title">当前教室课堂信息</p>
                       <p>当前教室暂无课堂信息</p>
                   </div>
                   <div class="grid-content bg-purple" style="padding: 10px;  border-top: 2px solid #2A8BA7; ">
                       <p class="right_title">教室列表</p>
                           <el-input
                               placeholder="请输入教室"
                               prefix-icon="el-icon-search"
                               v-model="classNum">
                           </el-input>
                       <div style="margin: 10px;" >
                           <el-row :gutter="24" style="font-weight: bolder; padding: 20px 0 ;">
                               <el-col :span="6" > 教室</el-col>
                               <el-col :span="9" >所属学校 </el-col>
                               <el-col :span="6" >学校编号 </el-col>
                           </el-row>
                           <el-row  v-for="(item, index) in classroomList"  :gutter="24"  :class=" activeSelect == item.id ? 'activesss': 'not_activesss'"  >
                               <span v-on:click="changeActive(item, index)">
                               <el-col :span="6" >{{item.no}}</el-col>
                               <el-col :span="9" >{{item.schoolName}} </el-col>
                               <el-col :span="6" >{{item.schoolNo}} </el-col>
                               </span>
                           </el-row>
                       </div>
                   </div>
                   <div>
                   </div>
               </el-col>
           </el-row>
        </ListCondition>
    </div>
</template>
<script>
    import ContentTitle from "../../components/ContentTitle.vue"
    import ListCondition from "../../components/ListCondition.vue"
    import Mytable from "../../components/Mytable.vue"
    import ClassGradeAdd from "../../components/classGrade/ClassGradeAdd.vue"
    import DateRanger2 from "../../components/DateRanger2"
    import 'videojs-contrib-hls'
    import videojs from 'video.js'
    import  JSMpeg from "../../../static/videoJs/jsmpeg.min"
    import { videoPlayer } from "vue-video-player";

    import "videojs-flash";
    export default {
        name: "patolClassList",
        props: ["categoryId"],
        components: {videoPlayer,ContentTitle, ListCondition, Mytable, ClassGradeAdd,DateRanger2},
        data() {
            return {
                https: [null, null, null, null],
                activeSelect: null, // 选中的样式
                classroomList: [],
                bigWindown: false,
                classNum: null,
                playerOptions:{
                    height: "805",
                    sources:[{type: "rtmp/flv", src: "rtsp://admin:12345qwert@192.168.0.6:554/h264/ch1/main/av_stream"}],
                    techOrder: ["flash"],
                    poster: "",
                    notSupportedMessage: "视频无法播放",
                    autoplay: true,
                    controls: true
                },
                TeacherName: "",
                options1: [],//年级
                value1: null,
                options2: [],//班级
                value2: null,
                tableHead: [
                    {type: "selection", prop: "", label: "序号", width: "50"},
                    {type: "", prop: "gradeName", label: "开课时间", minWidth: "180"},
                    {type: "", prop: "className", label: "教师姓名", minWidth: "180"},
                    {type: "", prop: "classRoomName", label: "学科", minWidth: "180"},
                    {type: "", prop: "classRoomName", label: "类型", minWidth: "180"},
                    {type: "", prop: "classRoomName", label: "班级", minWidth: "180"},
                    {type: "", prop: "classRoomName", label: "课堂内容", minWidth: "180"},
                ],
                tableData: [],
                keyword: "",//模糊搜索
                multipleSelection: [],//勾选框列表选中的行
                pagination:{
                    currentPage:1,
                    pageSize:15,
                    total:0
                }
            }
        },
        methods: {
            // 放大操作
            expanse() {
                this.bigWindown = !this.bigWindown;
            },
            // refresh() {
            //     var params = {
            //         PageIndex: this.pagination.currentPage,
            //         PageSize: this.pagination.pageSize,
            //     };
            //     if( this.value1!==null&&this.value1!==''){
            //         params["GradeId"]=this.value1;
            //     }
            //     if( this.value2!==null&&this.value2!==''){
            //         params["ClassId"]=this.value2;
            //     }
            //     Ajax.ClassGrade.get(params).then((res) => {
            //         if (res.data.code == 200) {
            //
            //             var result=res.data.content;
            //             this.tableData = result.data;
            //             this.pagination.total=result.total;
            //         }
            //     })
            // },
            /**
             * 打开 添加的 弹出框
             */
            openAdd() {
                this.$refs.ClassGradeAdd.openPopup(null)
            },
            /**
             * 打开 编辑的 弹出框
             */
            openEdit(index, item, rowObj) {
                if (item) {
                    this.$refs.ClassGradeAdd.openPopup(item)
                } else {
                    layer.msg("请勾选一条记录")
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            clickDel() {
                if (this.multipleSelection.length === 0) {
                    this.$notify({
                        title: "注意",
                        message: "至少勾选一条记录"
                    });
                    return;
                }
                layer.confirm("确认删除" + this.multipleSelection.length + "项", (layro) => {
                    var ids = [];
                    this.multipleSelection.map((item) => {
                        ids.push(item.id)
                    });
                    Ajax.ClassGrade.delete(ids).then((res) => {
                        if (res.data.code == 200) {
                            this.refresh()
                            layer.close(layro)
                        }
                    })
                })
            },
            /**
             * currentPage 改变时会触发
             */
            currentPageChange(arg){
                this.pagination.currentPage=arg;
                // this.refresh();
            },
            /**
             * 获取年级
             */
            getGradeList(){
                Ajax.EssentialData.getGradeList().then((res)=>{
                    this.options1=res.data.content;
                })
            },
            /**
             * 获取年级
             */
            getClassList(){
                Ajax.EssentialData.getClassList().then((res)=>{
                    this.options2=res.data.content;
                })
            },
            // 播放视频
            doplay() {
                var vlc = document.getElementById("vlc");
                var mrl="rtsp://admin:12345qwert@192.168.0.6:554/h264/ch1/main/av_stream";
                //将地址添加到播放列表
                vlc.playlist.add(mrl);
                vlc.playlist.play();
            },
            // 获取教室列表
            getClassRoomList() {
                let params = {
                    Id: null,
                    No: null,
                    SchoolId: null,
                    PageIndex: this.pagination.pageIndex,
                    PageSize:  this.pagination.pageSize,
                };
                Ajax.Classroom.get(params).then((res) => {
                    if (res.status == 200) {
                        if ( res.data.content) {
                            console.log('rrrrrrrrrrrrrrrrrrr', res.data);
                            this.classroomList = res.data.content.pagedData;
                            this.pagination.total = res.data.content.totalCount;
                        }
                    }
                })
            },
            // 点击选中的表格
            changeActive(item, index){
                console.log('ffffffffffffffff');
                // 高亮显示点击的部分
                let params = [];
             if ( this.activeSelect == null ||  this.activeSelect == item.id) {
                 params =[
                     {
                         classroomId: item.id,
                         operation: true
                     }
                 ];
             } else {
                 params =[
                     {
                         classroomId: item.id,
                         operation: true
                     },
                     {
                         classroomId: this.activeSelect ,
                         operation: false
                     }
                 ];
             }
                this.activeSelect = item.id;
                Ajax.Camera.getHttps(params).then((res) => {
                    if (res.status == 200) {
                        if ( res.data.content) {
                            console.log('ddddddddddddddd', res.data.content.map(temp =>  temp.http));
                            this.https = res.data.content.map(temp =>  temp.http);
                            for (let i = 0; i < 4; i++) {
                                if (!this.https[i]) {
                                    this.https[i]= null;
                                }
                            }
                            for( let i = 0 ; i<  this.https.length; i++ ){
                                if (this.https[i] != null) {
                                    console.log('fffffffffffffff',  'aa' + i.toString());
                                    setTimeout(
                                    videojs("my-video" + i.toString(), {
                                        bigPlayButton: false,
                                        textTrackDisplay: false,
                                        posterImage: true,
                                        errorDisplay: false,
                                        controlBar: true
                                    }, function () {
                                        this.play()
                                    }), 300);
                                }
                            }
                            // this.https.forEach( (temp, index) => {
                            //     if (temp != null) {
                            //         console.log('fffffffffffffff',  'aa' + index.toString())
                            //         videojs('aa' + index.toString(), {
                            //             bigPlayButton: false,
                            //             textTrackDisplay: false,
                            //             posterImage: true,
                            //             errorDisplay: false,
                            //             controlBar: true
                            //         }, function () {
                            //             this.play()
                            //         })
                            //     }
                            // });
                        }
                    }
                })
            }
        },
        created(){
        },
        mounted() {
            this.getClassRoomList();
            videojs('my-video111', {
                bigPlayButton: false,
                textTrackDisplay: false,
                posterImage: true,
                errorDisplay: false,
                controlBar: true
            }, function () {
                this.play()
            });
        }
    }
</script>

<style lang="scss">
    .not_activesss{
        border-radius: 8px;
        border: 1px solid #ccc;
        padding: 5px;
        margin: 8px 0;
        cursor: pointer;
        color: #1f2d3d;
      }
    .activesss{
        border-radius: 8px;
        border: 1px solid rgb(42, 139, 167);
        padding: 5px;
        margin: 8px 0;
        cursor: pointer;
        color: rgb(42, 139, 167);
    }
    .s01_classGrade {
        .s01_ketang_table {
            // width: 100%;
            position: absolute;
            top: 140rem * 480 / (1200 * 12);
            bottom: 0;
            overflow: auto;
            left: 20rem * 480 / (1200 * 12);
            right: 0;

            .s01_table_table {
                position: absolute;
                top: 10rem * 480 / (1200 * 12);
                bottom: 146rem * 480 / (1200 * 12);
                left: 10rem * 480 / (1200 * 12);
                right: 0rem * 480 / (1200 * 12);
                overflow: auto;
            }
        }
    }

    /*响应式*/
    .s01_classGrade {
        .s01_ketang_table {
            @media all and (max-width: 730px) {
                top: 200rem * 480 / (1200 * 12);
            }
            @media all and (max-width: 482px) {
                margin-top: 10rem * 480 / (1200 * 12);
                position: initial;
                .s01_table_table {
                    position: initial;
                }
                .s01_paginate_box {
                    position: initial;
                }
                .s01_paginate_box {
                    position: initial;
                    -webkit-transform: translate(0);
                    -moz-transform: translate(0);
                    -ms-transform: translate(0);
                    -o-transform: translate(0);
                    transform: translate(0);
                }
            }

        }
    }
    .right_title{
        font-size: larger;
        font-weight: bolder;
        padding: 10px 0 10px 0;
    }

    /*响应式*/

</style>
