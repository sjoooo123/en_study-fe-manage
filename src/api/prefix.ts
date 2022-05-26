import axios from './axios'
export const PrefixService = {
	queryList: (...args) => axios.get('/prefix/list', ...args),
	add: (...args) => axios.post('/prefix/add', ...args),
	edit: (...args) => axios.post('/prefix/edit', ...args),
	delete: (...args) => axios.post('/prefix/delete', ...args),
}
