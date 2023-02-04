<template>
    <!-- 动态增加表单项 -->
    <el-table
        :data="list"
        style="width: 100%"
        class="list-table"
        size="mini"
        border
    >
        <el-table-column prop="word" label="单词" width="100">
            <template #default="scope">
                <el-input v-model="scope.row.word" />
            </template>
        </el-table-column>
        <el-table-column prop="translation" label="词义" width="140">
            <template #default="scope">
                <el-input v-model="scope.row.translation" />
            </template>
        </el-table-column>
        <el-table-column prop="type" label="语言类型" width="160">
            <template #default="scope">
                <el-select
                    v-model="scope.row.type"
                    placeholder="请选择"
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in langTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </template>
        </el-table-column>
        <el-table-column prop="des" label="描述">
            <template #default="scope">
                <el-input v-model="scope.row.des" />
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
    <el-button class="mt-4" style="width: 100%" @click="onAddItem"
        >新增</el-button
    >
</template>

<script>
import {
    langTypeOptions,
} from "../utils/options";
export default {
    name: "ChainListPie",
    props: {
        list: Array,
    },
    data() {
        return {
            langTypeOptions
        };
    },
    methods: {
        addList() {
            this.list.push({
                word: '',
                translation: "",
                type: '',
                des: ''
            });
        },
        // 新增
        onAddItem() {
            this.addList();
            console.log(this.list, this.langTypeOptions)
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
        },
    },
};
</script>
