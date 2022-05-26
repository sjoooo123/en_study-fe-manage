import axios from './axios'
export const SuffixService = {
	queryList: (...args) => axios.get('/suffix/list', ...args),
	add: (...args) => axios.post('/suffix/add', ...args),
	edit: (...args) => axios.post('/suffix/edit', ...args),
	delete: (...args) => axios.post('/suffix/delete', ...args),
}
