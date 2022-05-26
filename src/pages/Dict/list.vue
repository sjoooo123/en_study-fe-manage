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
			placeholder="请输入单词"
			class="input-with-select"
			@keydown.enter.native="queryList"
		>
			<template #prepend>
				<el-select v-model="select" style="width: 110px">
					<el-option label="单词" value="word" />
					<el-option label="中文释义" value="translation" />
				</el-select>
			</template>
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
		<el-table-column prop="word" label="单词" width="120" />
		<el-table-column
			prop="phonetic"
			label="英标"
			width="120"
			column-key="phonetic"
			:filters="[
				{ text: '包含英标', value: 'true' },
				{ text: '不包含', value: 'false' },
			]"
		/>
		<el-table-column prop="definition" label="英文释义" width="320" />
		<el-table-column prop="translation" label="中文释义" width="600" />
		<el-table-column prop="pos" label="词语位置" width="120" />
		<el-table-column prop="collins" label="柯林斯星级" width="120" />
		<el-table-column prop="oxford" label="牛津" width="120" />
		<el-table-column prop="tag" label="标签" width="120" />
		<el-table-column prop="bnc" label="英国词频" width="120" />
		<el-table-column prop="frq" label="当代词频" width="120" />
		<el-table-column prop="exchange" label="变换" width="120" />
		<el-table-column prop="detail" label="扩展" width="120" />
		<el-table-column prop="audio" label="语音" width="120" />
		<!-- <el-table-column fixed="right" label="操作" width="180">
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
		</el-table-column> -->
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
	/>
</template>

<script lang="ts" setup>
// -2、引用
import { Search } from '@element-plus/icons-vue'
import ModalEdit from './modalEdit.vue'
import { DictService } from '../../api/dict' // 引入接口
import { onMounted, ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// -1、类型
export interface Dict {
	word: string
	phonetic?: string
	definition?: string
	translation?: string
	pos?: string
	collins?: string
	oxford?: string
	tag?: string
	bnc?: number
	frq?: number
	exchange?: string
	detail?: string
	audio?: string
}

// 0、父组件相关

// 1.、属性
const loading = ref(false)
const currentRecord = ref({})
const exact = ref(false)
const select = ref('word')
const input = ref('')
const editRef = ref(null)
const modalType = ref('')
const tableData = ref([])
const total = ref(0)
const currentPage = ref(1)
const pageSize = ref(100)
const phonetic = ref()

// 2、辅助方法
const indexMethod = (index: number) => {
	return index + 1
}

// 3、异步
const queryList = async () => {
	loading.value = true
	const res = await DictService.queryList({
		exact: exact.value,
		phonetic: phonetic.value || undefined,
		keyword: input.value || undefined,
		key: select.value,
		page: currentPage.value,
		size: pageSize.value,
	})
	loading.value = false
	if (res.data.fail) return

	tableData.value = res.data.result.list
	total.value = res.data.result.total
}
const excuteDelete = async (word) => {
	const res = await DictService.delete({ word })
	if (res.data.fail) return

	ElMessage.success('删除成功！')
	queryList()
}

// 4、交互
const filterChange = (filters) => {
	phonetic.value = filters.phonetic[0]
	queryList()
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
	currentRecord.value = { word: '' }
	modalType.value = 'add'
	editRef.value.visible = true
}
const handleEdit = (index: number, row: Dict) => {
	currentRecord.value = { ...row }
	modalType.value = 'edit'
	editRef.value.visible = true
}
const handleDelete = (index: number, row: Dict) => {
	ElMessageBox.confirm('确认删除？', '警告', {
		confirmButtonText: '确认',
		cancelButtonText: '取消',
		type: 'warning',
	})
		.then(() => {
			excuteDelete(row.word)
		})
		.catch()
}

// 5、生命周期
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
