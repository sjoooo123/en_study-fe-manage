<!--
字典-列表页
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
    <p>
        词根决定词意，
        <i style="font-size: 12px; color: #f00"
            >词根词义为多种词性时，分类只取第一词性</i
        >
    </p>
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
            placeholder="请输入词根、英义或词义"
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
        border
        style="width: 100%"
        height="450"
        @filter-change="filterChange"
    >
        <el-table-column fixed type="index" :index="indexMethod" />
        <el-table-column prop="wordroot" label="词根" width="120" />
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
        <el-table-column prop="translation" label="词义" />
        <el-table-column prop="example" label="示例">
            <template #default="scope">
                <span style="white-space: nowrap;">{{ getExample(scope.row.example) }}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="category"
            label="所属分类"
            column-key="category"
            :filters="
                categoryWordroot.map((item) => ({
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
                    >{{ getCategoryWordrootOptionsLabel(item) }}</el-tag
                >
            </template>
        </el-table-column>
        <el-table-column
            prop="frequency"
            label="频率"
            column-key="frequency"
            :filters="
                frequencyOptions.map((item) => ({
                    text: item.label,
                    value: item.value,
                }))
            "
        >
            <template #default="scope">
                <span>{{
                    getOptionsName(frequencyOptions, scope.row.frequency)
                }}</span>
            </template>
        </el-table-column>
        <el-table-column
            prop="source"
            label="语源"
            column-key="source"
            :filters="
                sourceOptions.map((item) => ({
                    text: item.label,
                    value: item.value,
                }))
            "
        >
            <template #default="scope">
                <span>{{
                    getOptionsName(sourceOptions, scope.row.source)
                }}</span>
            </template>
        </el-table-column>
        <!--<el-table-column
            prop="vary"
            label="音变规律"
            column-key="vary"
            :filters="filtersVary"
        >
            <template #default="scope">
                <el-tag
                    style="margin: 5px"
                    v-if="scope.row.vary"
                    v-for="item in scope.row.vary.split(',')"
                    :key="item"
                    >{{ getOptionsName(filtersVary, item) }}</el-tag
                >
            </template>
        </el-table-column>-->
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
        <el-table-column prop="note" label="备注">
            <template #default="scope">
                <span style="white-space: nowrap;">{{scope.row.note}}</span>
            </template>
        </el-table-column>
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
        ref="editRef"
        :type="modalType"
        :record="currentRecord"
        @fresh="queryList"
        :category="categoryWordroot"
        :pieroots="pieroots"
    />
</template>

<script lang="ts" setup>
// -2、引用
import { Search } from "@element-plus/icons-vue";
import ModalEdit from "./modalEdit.vue";
import { WordrootService, wordrootType } from "../../api/wordroot"; // 引入接口
import { PierootService } from "../../api/pieroot"; // 引入接口
import { onMounted, ref, watch, computed } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import { useStore } from "vuex";
import { categoryType } from "../../api/category";
import {
    frequencyOptions,
    sourceOptions,
    gradeOptions,
    varyOptions,
    getOptionsName,
} from "../../utils/options";
import { getExample, getSourceName } from "../../utils/common";

// 0、父组件相关
const store = useStore();
const categoryWordroot = ref([]);

// 1.、属性
const loading = ref(false);
const currentRecord = ref({});
const exact = ref(false);
const input = ref("");
const editRef = ref(null);
const modalType = ref("");
const tableData = ref([]);
const total = ref(0);
const currentPage = ref(1);
const pageSize = ref(100);
const filters = ref(undefined);
const pieroots = ref([]);

// 计算属性
const filtersVary = computed(() => {
    let resultVary = [];
    varyOptions.forEach((d) => {
        const optionsArr = d.options.map((item) => ({
            label: item.label,
            text: item.label,
            value: item.value,
        }));
        resultVary.push(...optionsArr);
    });
    return resultVary;
});

// 2、辅助方法
const getPieName = (value: string) => {
    const a = pieroots.value.find((item: pierootType) => item.id === +value);
    return a ? getSourceName(a) : "";
};
const getCategoryWordrootOptionsLabel = (value: string) => {
    const a = categoryWordroot.value.find(
        (item: categoryType) => item.id === +value
    );
    return a?.name || "";
};
const indexMethod = (index: number) => {
    return index + 1;
};

// 3、异步
const queryPIEAll = async () => {
    store.dispatch("pieroot/getAll");
};
const queryList = async () => {
    loading.value = true;
    const res = await WordrootService.queryList({
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
    const res = await WordrootService.delete({ id });
    if (res.data.fail) return;

    ElMessage.success("删除成功！");
    queryList();
};

// 4、交互
const filterChange = (f: any) => {
    // 去除空的过滤条件
    for (let k in f) {
        if (f[k].length === 0) {
            f[k] = undefined;
        }

        // grade等级为其他
        if (k === "grade") {
            f[k] = f[k].map((item) => (item === "其他" ? null : item));
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
        wordroot: "",
        pie: [],
        translation: "",
        example: [],
        category: "",
        frequency: "",
        note: "",
        source: "",
        vary: "",
        level: "",
    };
    modalType.value = "add";
    editRef.value.visible = true;
};
const handleEdit = (index: number, row: wordrootType) => {
    // 示例
    // row.example = JSON.stringify([
    //     {
    //         word: "abolish",
    //         split: "abol 消除 + ish 使…",
    //         midmean: "",
    //         translation: "废除",
    //     },
    // ]);

    // 音变，示例
    currentRecord.value = {
        ...row,
        vary: row.vary?.split(","),
        category: row.category?.split(","),
        pie: row.pie?.split(",").filter((d) => d.length).map(item=>({pie: item})) || [],
        example:
            row.example?.indexOf("[") === 0
                ? JSON.parse(row.example)
                : [
                      {
                          word: "",
                          split: row.example,
                          midmean: "",
                          translation: "",
                      },
                  ],
    };

    modalType.value = "edit";
    editRef.value.visible = true;
};
const handleDelete = (index: number, row: wordrootType) => {
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
        categoryWordroot.value = n.filter(
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
watch(
    () => store.state.pieroot.all,
    (n, _o) => {
        pieroots.value = n;
    },
    {
        immediate: true,
    }
);

onMounted(() => {
    queryPIEAll();
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
