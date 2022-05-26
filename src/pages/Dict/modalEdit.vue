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
	<el-dialog v-model="visible" title="数据项处理" width="30%" draggable>
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
			<el-form-item label="英标">
				<el-input v-model="record.phonetic" />
			</el-form-item>
			<el-form-item label="英文释义">
				<el-input v-model="record.definition" />
			</el-form-item>
			<el-form-item label="中文释义">
				<el-input
					v-model="record.translation"
					type="textarea"
					autosize
				/>
			</el-form-item>
			<el-form-item label="词语位置">
				<el-input v-model="record.pos" />
			</el-form-item>
			<el-form-item label="柯林斯星级">
				<el-input v-model="record.collins" />
			</el-form-item>
			<el-form-item label="牛津">
				<el-input v-model="record.oxford" />
			</el-form-item>
			<el-form-item label="标签">
				<el-input v-model="record.tag" />
			</el-form-item>
			<el-form-item label="英国词频">
				<el-input v-model="record.bnc" />
			</el-form-item>
			<el-form-item label="当代词频">
				<el-input v-model="record.frq" />
			</el-form-item>
			<el-form-item label="变换">
				<el-input v-model="record.exchange" />
			</el-form-item>
			<el-form-item label="扩展">
				<el-input v-model="record.detail" />
			</el-form-item>
			<el-form-item label="语音">
				<el-input v-model="record.audio" />
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
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { DictService } from '../../api/dict' // 引入接口
import type { Dict } from './list.vue'

// -1、类型
interface Props {
	record: Dict // 表单项数据
	type: string // 表单类型
}

// 0、父组件相关
const emit = defineEmits(['fresh']) // 声明触发事件
const props = withDefaults(defineProps<Props>(), {
	type: '',
	record: {
		word: '',
		phonetic: '',
		definition: '',
		translation: '',
		pos: '',
		collins: '',
		oxford: '',
		tag: '',
		bnc: 0,
		frq: 0,
		exchange: '',
		detail: '',
		audio: '',
	},
})

// 1、属性
const visible = ref(false)
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
	word: [{ required: true, message: '单词必填', trigger: 'blur' }],
})

// 2、辅助方法

// 3、异步
const excuteAddOrEdit = async () => {
	const serviceFun = props.type === 'add' ? DictService.add : DictService.edit
	const successMes = props.type === 'add' ? '新增成功！' : '修改成功！'

	const res = await serviceFun(props.record)
	if (res.data.fail) return

	ElMessage.success(successMes)
	visible.value = false
	// 父级刷新
	emit('fresh')
}

// 4、交互
const submitForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.validate((valid) => {
		if (valid) {
			console.log('submit!')
			excuteAddOrEdit()
		} else {
			console.log('error submit!')
			return false
		}
	})
}
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return
	formEl.resetFields()
}

// 5、生命周期

// 6、对外
defineExpose({
	visible,
})
</script>
<style lang="less" scope>
.demo-record {
	height: 50vh;
	overflow: auto;
}
</style>
