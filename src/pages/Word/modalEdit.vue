<!--
弹窗新增或编辑
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
    <el-dialog v-model="visible" title="数据项处理" width="50%" draggable>
        <el-form
            ref="ruleFormRef"
            :model="record"
            status-icon
            :rules="rules"
            label-width="120px"
            class="demo-record"
        >
            <el-form-item label="单词" prop="word">
                <el-input v-model="record.word" />
            </el-form-item>
            <el-form-item label="音标" prop="phonetic">
                <el-input v-model="record.phonetic" />
            </el-form-item>
            <el-form-item label="词义">
                <el-input
                    v-model="record.translation"
                    type="textarea"
                    autosize
                />
            </el-form-item>
            <el-form-item label="所属分类">
                <el-select
                    v-model="record.category"
                    placeholder="请选择"
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in category"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="词源链">
                <el-select
                    v-model="record.pie"
                    placeholder="请选择"
                    style="width: 100%"
                    filterable
                    multiple
                >
                    <el-option
                        v-for="item in pieroots"
                        :key="item.id"
                        :label="getSourceName(item)"
                        :value="'' + item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="包含前缀">
                <el-select
                    v-model="record.prefix"
                    placeholder="请选择"
                    style="width: 100%"
                    multiple
                    filterable
                >
                    <el-option
                        v-for="item in prefixes"
                        :key="item.id"
                        :label="item.affix + '（' + item.translation + '）'"
                        :value="'' + item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="包含词根">
                <el-select
                    v-model="record.root"
                    placeholder="请选择"
                    style="width: 100%"
                    multiple
                    filterable
                >
                    <el-option
                        v-for="item in wordroots"
                        :key="item.id"
                        :label="item.wordroot + '（' + item.translation + '）'"
                        :value="'' + item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="包含词基">
                <el-select
                    v-model="record.simWord"
                    placeholder="请选择"
                    style="width: 100%"
                    multiple
                    filterable
                >
                    <el-option
                        v-for="item in words"
                        :key="item.id"
                        :label="item.word + '（' + item.translation + '）'"
                        :value="'' + item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="包含后缀">
                <el-select
                    v-model="record.suffix"
                    placeholder="请选择"
                    style="width: 100%"
                    multiple
                    filterable
                >
                    <el-option
                        v-for="item in suffixes"
                        :key="item.id"
                        :label="item.affix + '（' + item.translation + '）'"
                        :value="'' + item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item label="记忆技巧">
                <el-input v-model="record.memskill" type="textarea" autosize />
            </el-form-item>
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
            <el-form-item label="常用等级">
                <el-select
                    v-model="record.level"
                    placeholder="请选择"
                    style="width: 100%"
                >
                    <el-option
                        v-for="item in commonlevelOptions"
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
import { WordService, wordType } from "../../api/word"; // 引入接口
import { pierootType } from "../../api/pieroot";
import { wordrootType } from "../../api/wordroot";
import { prefixType } from "../../api/prefix";
import { suffixType } from "../../api/suffix";
import { categoryType } from "../../api/category";
import { gradeOptions, commonlevelOptions } from "../../utils/options";
import { getSourceName } from "../../utils/common";

// -1、类型
interface Props {
    pieroots: pierootType[]; // pie词根列表
    wordroots: wordrootType[];
    words: wordType[]; 
    prefixes: prefixType[];
    suffixes: suffixType[];
    category: categoryType[];
    record: wordType; // 表单项数据
    type: string; // 表单类型
}

// 0、父组件相关
const emit = defineEmits(["fresh"]); // 声明触发事件
const props = defineProps<Props>();

// 1、属性
const wordsOptionsMaxLength = 20;
const wordsOptions = ref(props.words.slice(0, wordsOptionsMaxLength));
const visible = ref(false);
const ruleFormRef = ref<FormInstance>();
const rules = reactive({
    word: [{ required: true, message: "词根必填", trigger: "blur" }],
});

// 2、辅助方法
const filterMethod = (query) => {                                                        //query是输入的关键字
    if(query == '')            
        wordsOptions.value = props.words.slice(0, wordsOptionsMaxLength)
    else{
        let result = []                                                        //存储符合条件的下拉选项
        props.words.forEach(val=>{
            if(val.word.indexOf(query)!=-1 || val.translation.indexOf(query)!=-1) result.push(val)
        })
        wordsOptions.value = result.slice(0,wordsOptionsMaxLength)                                    //只取前10个
    }
}

// 3、异步
const excuteAddOrEdit = async () => {
    const serviceFun =
        props.type === "add" ? WordService.add : WordService.edit;
    const successMes = props.type === "add" ? "新增成功！" : "修改成功！";

    // 处理包含pie数组为字符串
    if (props.record.pie instanceof Array) {
        props.record.pie = props.record.pie.join(",");
    }
    // 处理包含词根数组为字符串
    if (props.record.root instanceof Array) {
        props.record.root = props.record.root.join(",");
    }
    // 处理包含简单词数组为字符串
    if (props.record.simWord instanceof Array) {
        props.record.simWord = props.record.simWord.join(",");
    }
    // 处理包含前缀数组为字符串
    if (props.record.prefix instanceof Array) {
        props.record.prefix = props.record.prefix.join(",");
    }
    // 处理包含后缀数组为字符串
    if (props.record.suffix instanceof Array) {
        props.record.suffix = props.record.suffix.join(",");
    }

    const res = await serviceFun(props.record);
    if (res.data.fail) {
        if (props.record.pie.length) {
            props.record.pie = props.record.pie.split(",");
        }
        if (props.record.root.length) {
            props.record.root = props.record.root.split(",");
        }
        if (props.record.simWord.length) {
            props.record.simWord = props.record.simWord.split(",");
        }
        if (props.record.prefix.length) {
            props.record.prefix = props.record.prefix.split(",");
        }
        if (props.record.suffix.length) {
            props.record.suffix = props.record.suffix.split(",");
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
