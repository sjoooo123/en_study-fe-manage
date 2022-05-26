import { CategoryService } from '../../api/category' // 引入接口

const state = {
		category: [],
	},
	getters = {
		category: (_state) => _state.category,
	},
	actions = {
		async getCategory({ commit }) {
			const res = await CategoryService.query()
			if (res.data.fail) return

			console.log(res)
			commit('setCategory', res.data.result.list)
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
