<template>
	<el-row :gutter="10">
		<el-col :span="8">
			<div class="treeBox">
				<h4>词根</h4>
				<TreeList :data="categoryWordroot" type="wordroot" />
			</div>
		</el-col>
		<el-col :span="8">
			<div class="treeBox">
				<h4>前缀</h4>
				<TreeList :data="categoryPrefix" type="prefix" />
			</div>
		</el-col>
		<el-col :span="8">
			<div class="treeBox">
				<h4>后缀</h4>
				<TreeList :data="categorySuffix" type="suffix" />
			</div>
		</el-col>
	</el-row>
</template>

<script lang="ts" setup>
// -2、引用
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { categoryType } from '../../api/category'
import TreeList from './treeList.vue'

// -1、类型
// 0、父组件相关
const store = useStore()

// 1、属性
const categoryWordroot = ref([])
const categoryPrefix = ref([])
const categorySuffix = ref([])

// 2、辅助方法
// 3、异步
// 4、交互

// 5、生命周期
watch(
	() => store.state.category.category.tree,
	(n, _o) => {
		categoryWordroot.value = n.filter(
			(item: categoryType) => item.type === 'wordroot'
		)
		categoryPrefix.value = n.filter(
			(item: categoryType) => item.type === 'prefix'
		)
		categorySuffix.value = n.filter(
			(item: categoryType) => item.type === 'suffix'
		)
	},
	{
		immediate: true,
	}
)

// 6、外部
</script>

<style lang="less" scoped>
.treeBox {
	padding: 20px;
	border: 1px solid #000;
	h4 {
		margin: 0 0 10px 0;
	}
}
</style>
