<!--
字典-弹窗新增或编辑
1、布局
  表单
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
    <el-dialog
        v-model="visible"
        title="数据项处理"
        width="50%"
        draggable
        :close-on-click-modal="false"
        append-to-body
    >
        <el-form
            ref="ruleFormRef"
            :model="record"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-record"
        >
            <el-form-item label="词源" prop="pieroot">
                <el-input v-model="record.pieroot" />
            </el-form-item>
            <el-form-item label="词义">
                <el-input
                    v-model="record.translation"
                    type="textarea"
                    autosize
                />
            </el-form-item>
            <el-form-item label="来源">
                <el-select
                    v-model="record.pie"
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
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select
                    v-model="record.category"
                    placeholder="请选择"
                    style="width: 100%"
                    multiple
                >
                    <el-option
                        v-for="item in category"
                        :key="item.id"
                        :label="item.name"
                        :value="'' + item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="语言类型">
                <el-select
                    v-model="record.type"
                    placeholder="请选择"
                    style="width: 100%"
                    filterable
                >
                    <el-option
                        v-for="item in langTypeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="record.note" type="textarea" autosize />
            </el-form-item>
            <el-form-item label="音变规律">
                <el-select
                    v-model="record.vary"
                    placeholder="请选择"
                    style="width: 100%"
                    multiple
                >
                    <el-option-group
                        v-for="group in varyOptions"
                        :key="group.label"
                        :label="group.label"
                    >
                        <el-option
                            v-for="item in group.options"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                        />
                    </el-option-group>
                </el-select>
            </el-form-item>
            <el-form-item label="音变详情">
                <el-input
                    v-model="record.varyDetail"
                    type="textarea"
                    autosize
                />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="visible = false">取消</el-button>
                <el-button type="primary" @click="submitForm(ruleFormRef)"
                    >提交</el-button
                >
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
// -2、引用
import { ref, reactive, onMounted, watch } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { PierootService, pierootType } from "../../api/pieroot"; // 引入接口
import { categoryType } from "../../api/category";
import {
    frequencyOptions,
    langTypeOptions,
    varyOptions,
} from "../../utils/options";
import { getSourceName } from "../../utils/common";
import { useStore } from "vuex";

// -1、类型
interface Props {
    category: categoryType[];
    record: pierootType; // 表单项数据
    type: string; // 表单类型
}

// 0、父组件相关
const store = useStore();
const emit = defineEmits(["fresh"]); // 声明触发事件
const props = defineProps<Props>();

// 1、属性
const visible = ref(false);
const ruleFormRef = ref<FormInstance>();
const rules = reactive({
    pieroot: [{ required: true, message: "词根必填", trigger: "blur" }],
});
const pieroots = ref([]);

// 2、辅助方法

// 3、异步
const queryPierootAll = () => {
    store.dispatch("pieroot/getAll");
};
const excuteAddOrEdit = async () => {
    const serviceFun =
        props.type === "add" ? PierootService.add : PierootService.edit;
    const successMes = props.type === "add" ? "新增成功！" : "修改成功！";

    const _record = JSON.parse(JSON.stringify(props.record)); // 复制
    const { pie, category, vary } = _record;

    // 处理包含pie数组为字符串
    if (pie instanceof Array) {
        _record.pie= pie.map(item=>item.pie).join(",");
    }
    // 处理音变规律数组为字符串
    if (vary instanceof Array) {
        _record.vary = vary.join(",");
    }
    // 处理分类数组为字符串
    if (category instanceof Array) {
        _record.category = category.join(",");
    }

    const res = await serviceFun(_record);
    if (res.data.fail) return;

    ElMessage.success(successMes);
    visible.value = false;
    // 父级刷新
    emit("fresh");
};

// 4、交互
const fetchAll = () => {
    queryPierootAll();
}
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate((valid) => {
        if (valid) {
            console.log("submit!");
            excuteAddOrEdit();
        } else {
            console.log("error submit!");
            return false;
        }
    });
};
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

// 5、生命周期
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
    fetchAll();
});

// 6、对外
defineExpose({
    visible,
});
</script>
<style lang="less" scoped>
.demo-record {
    height: 60vh;
    overflow: auto;
}
</style>
