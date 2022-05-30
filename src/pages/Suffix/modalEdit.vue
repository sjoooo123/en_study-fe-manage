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
			<el-form-item label="词缀" prop="affix">
				<el-input v-model="record.affix" />
			</el-form-item>
			<el-form-item label="词义">
				<el-input
					v-model="record.translation"
					type="textarea"
					autosize
				/>
			</el-form-item>
			<el-form-item label="类型">
				<el-input v-model="record.type" />
			</el-form-item>
			<el-form-item label="示例">
				<el-input v-model="record.example" type="textarea" autosize />
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
import { ref, reactive } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { SuffixService } from '../../api/suffix' // 引入接口
import type { Suffix } from './list.vue'
import { categoryType } from '../../api/category'

// -1、类型
interface Props {
	category: categoryType[]
	record: Suffix // 表单项数据
	type: string // 表单类型
}

// 0、父组件相关
const emit = defineEmits(['fresh']) // 声明触发事件
const props = withDefaults(defineProps<Props>(), {
	category: [],
	type: '',
	record: {
		affix: '',
		translation: '',
		example: '',
		type: '',
		category: '',
		note: '',
	},
})

// 1、属性
const visible = ref(false)
const ruleFormRef = ref<FormInstance>()
const rules = reactive({
	affix: [{ required: true, message: '词根必填', trigger: 'blur' }],
})

// 2、辅助方法

// 3、异步
const excuteAddOrEdit = async () => {
	const serviceFun =
		props.type === 'add' ? SuffixService.add : SuffixService.edit
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
<style lang="less" scoped>
.demo-record {
	height: 50vh;
	overflow: auto;
}
</style>
