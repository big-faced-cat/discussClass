<template>
    <div class="s01_MyZtree">
        <el-tree :data="data" :props="defaultProps" @node-click='nodeClick'></el-tree>
    </div>
</template>

<script>
    export default {
        name: "MyZtree",
        data() {
            return {
                data: [{
                    label: '一级 1',
                    children: [{
                        label: '二级 1-1',
                        children: [{
                            label: '三级 1-1-1',
                            id: "1-1-1"
                        }]
                    }]
                }, {
                    label: '一级 2',
                    children: [{
                        label: '二级 2-1',
                        children: [{
                            label: '三级 2-1-1'
                        }]
                    }, {
                        label: '二级 2-2',
                        children: [{
                            label: '三级 2-2-1'
                        }]
                    }]
                }, {
                    label: '一级 3',
                    children: [{
                        label: '二级 3-1',
                        children: [{
                            label: '三级 3-1-1'
                        }]
                    }, {
                        label: '二级 3-2',
                        children: [{
                            label: '三级 3-2-1'
                        }]
                    }]
                }],
                defaultProps: {
                    children: 'children',
                    label: 'label'
                }
            };
        },
        methods: {
            nodeClick() {
                this.$emit("node-click", ...arguments)
            }
        }
    }
</script>

<style lang="scss">

    .s01_MyZtree {
        width: 169rem * 480 / (1200 * 12);
        min-height: 300rem * 480 / (1200 * 12);
        //max-height: 50vh;

        border-radius: 2px;
        border: solid 1px #e6e6e6;
        padding: 20rem * 480 / (1200 * 12) 10rem * 480 / (1200 * 12) 20rem * 480 / (1200 * 12) 20rem * 480 / (1200 * 12);
        overflow: auto;
        .el-tree{
            color:#4d4d4d;
        }
        .el-tree-node__expand-icon {
            &:before {
                color: transparent;
            }
            background:url(../assets/ztree_1.png) no-repeat center;
            background-size:15rem * 480 / (1200 * 12);
            &.expanded{
                &:before {
                    color: transparent;
                }
                background:url(../assets/ztree_2.png) no-repeat center;
                background-size:15rem * 480 / (1200 * 12);
            }

        }
        .el-tree-node__expand-icon.expanded{
            transform:rotate(180deg);
        }
        .el-tree-node__expand-icon.is-leaf{
            color: transparent;
            cursor: default;
            background: none;
        }
    }
</style>