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
	<p>前缀决定词向</p>
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
			placeholder="请输入词缀、词义"
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
		<el-table-column prop="affix" label="词缀" width="120" />
		<el-table-column prop="translation" label="词义" />
		<el-table-column prop="example" label="示例" />
		<el-table-column
			prop="category"
			label="所属分类"
			column-key="category"
			:filters="
				categoryPrefix.map((item) => ({
					text: item.name,
					value: item.id,
				}))
			"
		>
			<template #default="scope">
				<span>{{
					getCategoryPrefixOptionsLabel(scope.row.category)
				}}</span>
			</template>
		</el-table-column>
		<el-table-column prop="note" label="注意事项" />
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
		:category="categoryPrefix"
	/>
</template>

<script lang="ts" setup>
// -2、引用
import { Search } from '@element-plus/icons-vue'
import ModalEdit from './modalEdit.vue'
import { PrefixService } from '../../api/prefix' // 引入接口
import { onMounted, ref, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useStore } from 'vuex'
import { categoryType } from '../../api/category'

// -1、类型
export interface Prefix {
	id: string
	affix: string
	translation?: string
	example?: string
	category?: string
	note?: string
}

// 0、父组件相关
const store = useStore()
const categoryPrefix = ref([])

// 1.、属性
const loading = ref(false)
const currentRecord = ref({})
const exact = ref(false)
const input = ref('')
const editRef = ref(null)
const modalType = ref('')
const tableData = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(100)
const filters = ref(undefined)

// 2、辅助方法
const indexMethod = (index: number) => {
	return index + 1
}
const getCategoryPrefixOptionsLabel = (value: number) => {
	const a = categoryPrefix.value.find(
		(item: categoryType) => item.id === value
	)
	return a?.name || ''
}

// 3、异步
const queryList = async () => {
	loading.value = true
	const res = await PrefixService.queryList({
		exact: exact.value,
		keyword: input.value || undefined,
		page: currentPage.value,
		size: pageSize.value,
		filters: filters.value,
	})
	loading.value = false
	if (res.data.fail) return

	tableData.value = res.data.result.list
	total.value = res.data.result.total
}
const excuteDelete = async (id) => {
	const res = await PrefixService.delete({ id })
	if (res.data.fail) return

	ElMessage.success('删除成功！')
	queryList()
}

// 4、交互
const filterChange = (f: any) => {
	// 去除空的过滤条件
	for (let k in f) {
		if (f[k].length === 0) {
			f[k] = undefined
		}
	}

	filters.value = JSON.stringify(f) === '{}' ? undefined : f
}
const handleSizeChange = (val: number) => {
	pageSize.value = val
	queryList()
}
const handleCurrentChange = (val: number) => {
	currentPage.value = val
	queryList()
}
const handleAdd = () => {
	currentRecord.value = {}
	modalType.value = 'add'
	editRef.value.visible = true
}
const handleEdit = (index: number, row: Prefix) => {
	currentRecord.value = { ...row }
	modalType.value = 'edit'
	editRef.value.visible = true
}
const handleDelete = (index: number, row: Prefix) => {
	ElMessageBox.confirm('确认删除？', '警告', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			excuteDelete(row.id)
		})
		.catch()
}

// 5、生命周期
watch(
	() => store.state.category.category,
	(n, _o) => {
		categoryPrefix.value = n.filter(
			(item: categoryType) => item.type === 'prefix'
		)
	},
	{
		immediate: true,
	}
)
watch(filters, (_n, _o) => {
	queryList()
})
onMounted(() => {
	queryList()
})

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
