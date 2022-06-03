<template>
	<div class="controlBox">
		<el-input
			v-model="filterText"
			style="width: calc(100% - 178px)"
			placeholder="过滤"
		/>
		<el-button-group>
			<el-button type="primary" @click="handleAdd">新增</el-button>
			<el-button
				type="success"
				plain
				:disabled="!currentRecord?.id"
				@click="handleEdit"
				>编辑</el-button
			>
			<el-button
				type="danger"
				plain
				:disabled="!currentRecord?.id"
				@click="handleDelete"
				>删除</el-button
			>
		</el-button-group>
	</div>

	<el-tree
		ref="treeRef"
		:data="data"
		default-expand-all
		highlight-current
		node-key="id"
		:expand-on-click-node="false"
		:filter-node-method="filterNode"
		:props="{
			label: 'title',
		}"
		draggable
		@node-drop="handleDrop"
		@node-click="handleSelect"
	/>
	<!-- 新增编辑弹窗 -->
	<ModalEdit
		ref="editRef"
		:type="modalType"
		:recordType="type"
		:record="currentRecord"
		@fresh="getCategory"
	/>
</template>

<script lang="ts" setup>
// -2、引用
import { ElMessage, ElMessageBox, ElTree } from 'element-plus'
import type Node from 'element-plus/es/components/tree/src/model/node'
import type { DragEvents } from 'element-plus/es/components/tree/src/model/useDragNode'
import type { DropType } from 'element-plus/es/components/tree/src/tree.type'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { CategoryService, categoryType } from '../../api/category'
import ModalEdit from './modalEdit.vue'

// -1.类型
interface Props {
	data: categoryType[] // 分类树
	type: string // 树的类型，词根，前缀或后缀
}

// 0、父组件相关
const store = useStore()
const props = withDefaults(defineProps<Props>(), {
	data: [],
	type: '',
})

// 1、属性
const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()
const filterNode = (value: string, data: categoryType) => {
	if (!value) return true
	return data.name.includes(value)
}
// 当前选中的节点-只是单个
const currentRecord = ref<categoryType>({})
// 弹窗相关
const editRef = ref(null)
const modalType = ref('')

// 2、辅助方法
// 获取分类
const getCategory = () => {
	store.dispatch('category/getCategory')
}
// 3、异步
// 修改
const excuteEdit = async (record: categoryType) => {
	const res = await CategoryService.edit(record)
	if (res.data.fail) return

	ElMessage.success('修改成功！')
	getCategory()
}
const excuteDelete = async () => {
	const res = await CategoryService.delete({ id: currentRecord?.value?.id })
	if (res.data.fail) return

	currentRecord.value = {}
	ElMessage.success('删除成功！')
	getCategory()
}

// 4、交互
const handleAdd = () => {
	// 初始化数据
	if (currentRecord.value.id) {
		currentRecord.value.pid = currentRecord.value?.id
		currentRecord.value.id = undefined
		currentRecord.value.name = ''
	} else {
		currentRecord.value = {
			pid: 0,
			type: props.type,
			name: '',
			sort: 0,
			note: '',
		}
	}

	modalType.value = 'add'
	editRef.value.visible = true
}
const handleEdit = () => {
	modalType.value = 'edit'
	editRef.value.visible = true
}
const handleDelete = () => {
	ElMessageBox.confirm('确认删除？', '警告', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			excuteDelete()
		})
		.catch()
}
// 节点拖拽相关
const handleDrop = (
	draggingNode: Node,
	dropNode: Node,
	dropType: DropType,
	ev: DragEvents
) => {
	// console.log('tree drop:', draggingNode.data, dropNode.data, dropType, ev)
	// 改变pid，分inner与(before,after)
	draggingNode.data.pid =
		dropType === 'inner' ? dropNode.data.id : dropNode.data.pid
	// 改变顺序，分before与after
	draggingNode.data.sort =
		dropType === 'before' ? dropNode.data.sort - 1 : dropNode.data.sort + 1

	excuteEdit(draggingNode.data)
}
// 点击节点回调
const handleSelect = (node: categoryType) => {
	if (node.id === currentRecord?.value?.id) {
		currentRecord.value = {}
	} else {
		currentRecord.value = { ...node }
	}
}

// 5、生命周期
watch(filterText, (val) => {
	treeRef.value!.filter(val)
})
// 6、外部
</script>

<style lang="less" scoped>
.controlBox {
	display: flex;
	justify-content: space-around;
}
</style>
