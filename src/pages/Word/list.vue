<!--
前缀-列表页
1、布局
  操作栏
  表格
  分页
  弹窗
2、业务逻辑
  // -2、引用
  // -1.类型
  // 0、父组件相关
  // 1、属性
  // 2、辅助方法
  // 3、异步
  // 4、交互
  // 5、生命周期
  // 6、外部
3、样式
-->
<template>
    <p>不可拆分的常用简单词，分类与词根一致</p>
    <!-- 操作栏 -->
    <div class="table-top-tool">
        精确匹配
        <el-switch
            v-model="exact"
            inline-prompt
            active-text="是"
            inactive-text="否"
            style="margin: 0 5px"
        />
        <el-input
            v-model="input"
            placeholder="请输入单词、词义"
            class="input-with-select"
            @keydown.enter.native="queryList"
        >
            <template #append>
                <el-button :icon="Search" @click="queryList" />
            </template>
        </el-input>
        <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>
    <!-- 表格 -->
    <el-table
        v-loading="loading"
        class="mt15"
        :data="tableData"
        style="width: 100%"
        height="450"
        @filter-change="filterChange"
    >
        <el-table-column fixed type="index" :index="indexMethod" />
        <el-table-column prop="word" label="单词" width="120" />
        <el-table-column prop="phonetic" label="音标" width="120" />
        <el-table-column prop="translation" label="词义" />
        <el-table-column
            prop="category"
            label="所属分类"
            column-key="category"
            :filters="
                categoryWord.map((item) => ({
                    text: item.name,
                    value: item.id,
                }))
            "
        >
            <template #default="scope">
                <el-tag
                    style="margin: 5px"
                    v-if="scope.row.category"
                    v-for="item in scope.row.category.split(',')"
                    :key="item"
                    >{{ getCategoryWordOptionsLabel(item) }}</el-tag
                >
            </template>
        </el-table-column>
        <el-table-column
            prop="pie"
            label="词源"
            column-key="pie"
            :filters="
                pieroots?.map((item) => ({
                    text: getSourceName(item),
                    value: item.id,
                }))
            "
        >
            <template #default="scope">
                <span v-if="scope.row.pie" v-for="(item,index) in scope.row.pie.split(',')" :key="item">
                    <span v-if="index>0">🡄</span>
                    <el-tag>{{ getPieName(item) }}</el-tag>
                </span>
            </template>
        </el-table-column>
        <el-table-column
            prop="simWord"
            label="包含词基"
            column-key="simWord"
        >
            <template #default="scope">
                <el-tag
                    style="margin: 5px"
                    v-if="scope.row.simWord"
                    v-for="item in scope.row.simWord.split(',')"
                    :key="item"
                    >{{ getWordOptionsLabel(item) }}</el-tag
                >
            </template>
        </el-table-column>
        <el-table-column
            prop="prefix"
            label="包含前缀"
            column-key="prefix"
            :filters="
                prefixes.map((item) => ({
                    text: item.affix + '（' + item.translation + '）',
                    value: item.id,
                }))
            "
        >
            <template #default="scope">
                <el-tag
                    style="margin: 5px"
                    v-if="scope.row.prefix"
                    v-for="item in scope.row.prefix.split(',')"
                    :key="item"
                    >{{ getPrefixOptionsLabel(item) }}</el-tag
                >
            </template>
        </el-table-column>
        <el-table-column
            prop="root"
            label="包含词根"
            column-key="root"
            :filters="
                wordroots.map((item) => ({
                    text: item.wordroot + '（' + item.translation + '）',
                    value: item.id,
                }))
            "
        >
            <template #default="scope">
                <el-tag
                    style="margin: 5px"
                    v-if="scope.row.root"
                    v-for="item in scope.row.root.split(',')"
                    :key="item"
                    >{{ getWordrootOptionsLabel(item) }}</el-tag
                >
            </template>
        </el-table-column>
        <el-table-column
            prop="suffix"
            label="包含后缀"
            column-key="suffix"
            :filters="
                suffixes.map((item) => ({
                    text: item.affix + '（' + item.translation + '）',
                    value: item.id,
                }))
            "
        >
            <template #default="scope">
                <el-tag
                    style="margin: 5px"
                    v-if="scope.row.suffix"
                    v-for="item in scope.row.suffix.split(',')"
                    :key="item"
                    >{{ getSuffixOptionsLabel(item) }}</el-tag
                >
            </template>
        </el-table-column>
        <el-table-column prop="memskill" label="记忆技巧" />
        <el-table-column
            prop="grade"
            label="等级"
            column-key="grade"
            :filters="
                gradeOptions.map((item) => ({
                    text: item.label,
                    value: item.value,
                }))
            "
        >
            <template #default="scope">
                <span>{{ getOptionsName(gradeOptions, scope.row.grade) }}</span>
            </template>
        </el-table-column>
        <el-table-column prop="level" label="常用等级" />
        <el-table-column prop="note" label="备注" />
        <el-table-column fixed="right" label="操作" width="180">
            <template #default="scope">
                <el-button
                    size="small"
                    type="primary"
                    plain
                    @click="handleEdit(scope.$index, scope.row)"
                    >编辑</el-button
                >
                <el-button
                    size="small"
                    type="danger"
                    plain
                    @click="handleDelete(scope.$index, scope.row)"
                    >删除</el-button
                >
            </template>
        </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div class="paginationContainer mt15">
        <el-pagination
            v-model:currentPage="currentPage"
            v-model:page-size="pageSize"
            :page-sizes="[100, 200, 300, 400]"
            :background="true"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
    </div>
    <!-- 新增编辑弹窗 -->
    <ModalEdit
        v-if="modalType"
        @close="()=>{
            modalType = '';
            queryPIEAll();
        }"
        :type="modalType"
        :record="currentRecord"
        :category="categoryWord"
        :wordroots="wordroots"
        :words="words"
        :prefixes="prefixes"
        :suffixes="suffixes"
        @fresh="queryList"
        @update="updateTableDataByRecord"
    />
</template>

<script lang="ts" setup>
// -2、引用
import { Search } from "@element-plus/icons-vue";
import ModalEdit from "./modalEdit.vue";
import { WordService, wordType } from "../../api/word"; // 引入接口
import { PierootService, pierootType } from "../../api/pieroot";
import { WordrootService, wordrootType } from "../../api/wordroot";
import { PrefixService, prefixType } from "../../api/prefix";
import { SuffixService, suffixType } from "../../api/suffix";
import { onMounted, ref, watch } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import {
    frequencyOptions,
    gradeOptions,
    getOptionsName,
} from "../../utils/options";
import { getSourceName } from "../../utils/common";
import { categoryType } from "../../api/category";

// 0、父组件相关
const store = useStore();
const categoryWord = ref([]);

// 1、属性
const loading = ref(false);
const currentRecord = ref({});
const exact = ref(false);
const input = ref("");
const modalType = ref("");
const tableData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(100);
const filters = ref(undefined);
const pieroots = ref([]);
const wordroots = ref([]);
const words = ref([]);
const prefixes = ref([]);
const suffixes = ref([]);

// 2、辅助方法
const indexMethod = (index: number) => {
    return index + 1;
};
const getCategoryWordOptionsLabel = (value: number) => {
    const a = categoryWord.value.find(
        (item: categoryType) => item.id === +value
    );
    return a?.name || "";
};
const getPieName = (value: string) => {
    const a = pieroots.value.find((item: pierootType) => item.id === +value);
    return a ? getSourceName(a) : "";
};
const getWordrootOptionsLabel = (value: string) => {
    const a = wordroots.value.find((item: wordrootType) => item.id === +value);
    return a?.wordroot.split("(")[0] || "";
};
const getWordOptionsLabel = (value: string) => {
    const a = words.value.find((item: wordType) => item.id === +value);
    return a?.word.split("(")[0] || "";
};
const getPrefixOptionsLabel = (value: string) => {
    const a = prefixes.value.find((item: prefixType) => item.id === +value);
    return a?.affix.split("(")[0] || "";
};
const getSuffixOptionsLabel = (value: string) => {
    const a = suffixes.value.find((item: suffixType) => item.id === +value);
    return a?.affix.split("(")[0] || "";
};
const getfrequencyOptionsLabel = (value: string) => {
    const a = frequencyOptions.find((item) => item.value === value);
    return a?.label || "";
};
const updateTableDataByRecord = (record: wordType) => {
    const _index = tableData.value.findIndex(item => item.id ===record.id);
    tableData.value[_index] = record;
};

// 3、异步
const queryPIEAll = async () => {
    const res = await PierootService.queryAll();
    if (res.data.fail) return;

    pieroots.value = res.data.result.list;
};
const queryWordrootAll = async () => {
    const res = await WordrootService.queryAll();
    if (res.data.fail) return;

    wordroots.value = res.data.result.list;
};
const queryWordAll = async () => {
    const res = await WordService.queryAll();
    if (res.data.fail) return;

    words.value = res.data.result.list;
};
const queryPrefixAll = async () => {
    const res = await PrefixService.queryAll();
    if (res.data.fail) return;

    prefixes.value = res.data.result.list;
};
const querySuffixAll = async () => {
    const res = await SuffixService.queryAll();
    if (res.data.fail) return;

    suffixes.value = res.data.result.list;
};
const queryList = async () => {
    loading.value = true;
    const res = await WordService.queryList({
        exact: exact.value,
        keyword: input.value || undefined,
        page: currentPage.value,
        size: pageSize.value,
        filters: filters.value,
    });
    loading.value = false;
    if (res.data.fail) return;

    tableData.value = res.data.result.list;
    total.value = res.data.result.total;
};
const excuteDelete = async (id) => {
    const res = await WordService.delete({ id });
    if (res.data.fail) return;

    ElMessage.success("删除成功！");
    queryList();
};
const fetchAll = () => {
    queryPIEAll();
    queryWordrootAll();
    queryWordAll();
    queryPrefixAll();
    querySuffixAll();
}

// 4、交互
const filterChange = (f: any) => {
    // 去除空的过滤条件
    for (let k in f) {
        if (f[k].length === 0) {
            f[k] = undefined;
        }

        // grade等级为其他
        if (k === "grade") {
            f[k] = f[k]?.map((item) => (item === "其他" ? null : item));
        }
    }

    filters.value = JSON.stringify(f) === "{}" ? undefined : f;
};
const handleSizeChange = (val: number) => {
    pageSize.value = val;
    queryList();
};
const handleCurrentChange = (val: number) => {
    currentPage.value = val;
    queryList();
};
const handleAdd = () => {
    currentRecord.value = {
        grade: "初中",
        pie: [],
    };
    modalType.value = "add";
};
const handleEdit = (index: number, row: wordType) => {
    // 包含词根，包含前缀，包含后缀
    currentRecord.value = {
        ...row,
        pie: row.pie?.split(",").filter((d) => d.length).map(item=>({pie: item})) || [],
        root: row.root?.split(",").filter((d) => d.length),
        simWord: row.simWord?.split(",").filter((d) => d.length),
        prefix: row.prefix?.split(",").filter((d) => d.length),
        suffix: row.suffix?.split(",").filter((d) => d.length),
        category: row.category?.split(","),
    };

    modalType.value = "edit";
};
const handleDelete = (index: number, row: wordType) => {
    ElMessageBox.confirm("确认删除？", "警告", {
        confirmButtonText: "确认",
        cancelButtonText: "取消",
        type: "warning",
    })
        .then(() => {
            excuteDelete(row.id);
        })
        .catch();
};

// 5、生命周期
watch(
    () => store.state.category.category.list,
    (n, _o) => {
        // 使用词根分类
        categoryWord.value = n.filter(
            (item: categoryType) => item.type === "wordroot"
        );
    },
    {
        immediate: true,
    }
);
watch(filters, (_n, _o) => {
    queryList();
});

onMounted(() => {
    fetchAll();
    queryList();
});

// 6、外部
</script>
<style lang="less" scoped>
.table-top-tool {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    .input-with-select {
        width: 30%;
        margin-right: 15px;
        .el-input-group__prepend {
            background-color: var(--el-fill-color-blank);
        }
    }
}
</style>
