import { CategoryService } from '../../api/category' // 引入接口
import { flatData } from '../../common'

const state = {
		category: {
			tree: [], // 树结构（维护使用）
			list: [], // 扁平结构（查询使用）
		},
	},
	getters = {
		category: (_state) => _state.category,
	},
	actions = {
		async getCategory({ commit }) {
			const res = await CategoryService.query()
			if (res.data.fail) return

			// 数据扁平化处理
			const platResult: any[] = []
			flatData(JSON.parse(JSON.stringify(res.data.result)), platResult)
			// 添加未归类分类
			platResult.push({ name: '未归类', type: 'wordroot' })
			platResult.push({ name: '未归类', type: 'prefix' })
			platResult.push({ name: '未归类', type: 'suffix' })

			commit('setCategory', {
				tree: res.data.result,
				list: platResult,
			})
		},
	},
	mutations = {
		setCategory: (_state, payload) => {
			_state.category = payload
		},
	}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
