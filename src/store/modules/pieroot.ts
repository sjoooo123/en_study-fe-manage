import { PierootService } from '../../api/pieroot' // 引入接口

const state = {
	all: [], // 全量列表
},
getters = {
	all: _state => _state.all,
},
actions = {
	async getAll({ commit }) {
		const res = await PierootService.queryAll()
		if (res.data.fail) return

		commit('setAll', res.data.result.list)
	},
},
mutations = {
	setAll: (_state, payload) => {
		_state.all = payload
	},
}

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
}
