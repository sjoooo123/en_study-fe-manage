<template>
    <!-- 动态增加表单项 -->
    <el-table
        :data="list"
        style="width: 100%"
        class="list-table"
        size="mini"
        border
    >
        <el-table-column prop="pie" label="词源">
            <template #default="scope">
                <el-select
                    v-model="scope.row.pie"
                    placeholder="请选择"
                    style="width: 100%"
                    filterable
                >
                    <el-option
                        v-for="item in pieroots"
                        :key="item.id"
                        :label="getSourceName(item)"
                        :value="'' + item.id"
                    />
                </el-select>
            </template>
        </el-table-column>
        <el-table-column label="操作" width="150">
            <template #default="scope">
                <el-button
                    @click.native.prevent="changeIndex(scope.$index, -1)"
                    type="text"
                    size="small"
                    :disabled="scope.$index === 0"
                    >上移</el-button
                >
                <el-button
                    @click.native.prevent="changeIndex(scope.$index, 1)"
                    type="text"
                    size="small"
                    :disabled="scope.$index === list.length - 1"
                    >下移</el-button
                >
                <el-button
                    @click.native.prevent="deleteRow(scope.$index)"
                    type="text"
                    size="small"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <!-- <el-button class="mt-4" style="width: 60%" @click="onAddItem" :disabled="!multipleFlag && list.length>0" -->
        <el-button class="mt-4" style="width: 60%" @click="onAddItem"
        >新增项</el-button
    >
    <el-button class="mt-4" style="width: 35%; margin-left: 5%" @click="onAddSource"
        >新增词源</el-button
    >
    <!-- 新增词源弹窗 -->
    <ModalEdit
        ref="addSourceRef"
        type="add"
        :record="currentRecord"
        @fresh="getPieAll"
        :category="categoryPieroot"
    />
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import { getSourceName } from "../utils/common";
import ModalEdit from "../pages/Pieroot/modalEdit.vue";
export default {
    name: "ChainList",
    props: {
        list: Array,
        // multipleFlag: Boolean,
    },
    components:{
        ModalEdit,
    },
    data() {
        return {
            currentRecord: {
                pieroot: "",
                translation: "",
                category: "",
                note: "",
                level: "",
            }
        };
    },
    computed: {
        ...mapGetters({
            category: 'category/category',
            pieroots: 'pieroot/all',
        }),
        categoryPieroot() {
            return this.category.list.filter(item => item.type === "wordroot")
        }
    },
    mounted() {
        this.getPieAll();
    },
    methods: {
        ...mapActions({
            getPieAll: 'pieroot/getAll'
        }),
        getSourceName(item){
            return getSourceName(item);
        },
        addList() {
            this.list.push({
                pie: '',
            });
        },
        // 新增项
        onAddItem() {
            this.addList();
        },
        // 新增词源
        onAddSource() {
            this.currentRecord = {
                pieroot: "",
                translation: "",
                category: "",
                note: "",
                level: "",
            };
            this.$refs.addSourceRef.visible = true;
        },
        // 移动顺序
        changeIndex(index, offset) {
            const item = JSON.parse(JSON.stringify(this.list[index + offset]));
            this.list[index + offset] = JSON.parse(
                JSON.stringify(this.list[index])
            );
            this.list[index] = item;
        },
        // 删除当前行
        deleteRow(index) {
            this.list.splice(index, 1);
        }
    },
};
</script>
