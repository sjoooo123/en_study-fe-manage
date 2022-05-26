import axios from './axios'
export const DictService = {
	queryList: (...args) => axios.get('/dict/queryList', ...args),
	add: (...args) => axios.post('/dict/add', ...args),
	edit: (...args) => axios.post('/dict/edit', ...args),
	delete: (...args) => axios.post('/dict/delete', ...args),
}
