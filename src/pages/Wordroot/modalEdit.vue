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
    >
        <el-form
            ref="ruleFormRef"
            :model="record"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-record"
        >
            <el-form-item label="词跟" prop="wordroot">
                <el-input v-model="record.wordroot" />
            </el-form-item>
            <el-form-item label="所属PIE词根">
                <el-select
                    v-model="record.pie"
                    placeholder="请选择"
                    style="width: 100%"
                    filterable
                >
                    <el-option
                        v-for="item in pieroots"
                        :key="item.id"
                        :label="item.pieroot"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="词义">
                <el-input
                    v-model="record.translation"
                    type="textarea"
                    autosize
                />
            </el-form-item>
            <el-form-item label="示例">
                <!--<el-input v-model="record.example" type="textarea" autosize />-->
                <FormList :list="record.example" />
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
            <el-form-item label="频率">
                <el-select
                    v-model="record.frequency"
                    placeholder="请选择"
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in frequencyOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="语源">
                <el-select
                    v-model="record.source"
                    placeholder="请选择"
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in sourceOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <!--<el-form-item label="音变规律">
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
            </el-form-item>-->
            <el-form-item label="等级">
                <el-select
                    v-model="record.grade"
                    placeholder="请选择"
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in gradeOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="完善程度">
                <el-select
                    v-model="record.level"
                    placeholder="请选择"
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in levelOptions"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="备注">
                <el-input v-model="record.note" type="textarea" autosize />
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
import { ref, reactive } from "vue";
import { ElMessage, FormInstance } from "element-plus";
import { WordrootService, wordrootType } from "../../api/wordroot"; // 引入接口
import { categoryType } from "../../api/category";
import {
    frequencyOptions,
    levelOptions,
    gradeOptions,
    sourceOptions,
    varyOptions,
} from "../../utils/options";
import FormList from "../../components/FormList.vue";

// -1、类型
interface Props {
    category: categoryType[];
    record: wordrootType; // 表单项数据
    type: string; // 表单类型
    pieroots: Array; // pie词根列表
}

// 0、父组件相关
const emit = defineEmits(["fresh"]); // 声明触发事件
const props = defineProps<Props>();

// 1、属性
const visible = ref(false);
const ruleFormRef = ref<FormInstance>();
const rules = reactive({
    wordroot: [{ required: true, message: "词根必填", trigger: "blur" }],
});

// 2、辅助方法

// 3、异步
const excuteAddOrEdit = async () => {
    const serviceFun =
        props.type === "add" ? WordrootService.add : WordrootService.edit;
    const successMes = props.type === "add" ? "新增成功！" : "修改成功！";

    // 处理分类数组为字符串
    if (props.record.category instanceof Array) {
        props.record.category = props.record.category.join(",");
    }
    // 处理音变规律数组为字符串
    if (props.record.vary instanceof Array) {
        props.record.vary = props.record.vary.join(",");
    }
    // 处理示例
    if (props.record.example instanceof Array) {
        props.record.example = JSON.stringify(props.record.example);
    }

    const res = await serviceFun(props.record);
    if (res.data.fail) {
        if (props.record.category.length) {
            props.record.category = props.record.category.split(",");
        }
        if (props.record.vary.length) {
            props.record.vary = props.record.vary.split(",");
        }
        if (props.record.example.indexOf("[") === 0) {
            props.record.example = JSON.parse(props.record.example);
        }
        return;
    }

    ElMessage.success(successMes);
    visible.value = false;
    // 父级刷新
    emit("fresh");
};

// 4、交互
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

// 6、对外
defineExpose({
    visible,
});
</script>
<style lang="less" scoped>
.demo-record {
    height: 50vh;
    overflow: auto;
}
</style>
