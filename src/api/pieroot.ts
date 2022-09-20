import axios from './axios'
export const PierootService = {
	queryAll: (...args) => axios.get('/pieroot/all', ...args),
	queryList: (...args) => axios.get('/pieroot/list', ...args),
	add: (...args) => axios.post('/pieroot/add', ...args),
	edit: (...args) => axios.post('/pieroot/edit', ...args),
	delete: (...args) => axios.post('/pieroot/delete', ...args),
}
