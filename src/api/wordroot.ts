import axios from './axios'
export const WordrootService = {
	queryList: (...args) => axios.get('/wordroot/list', ...args),
	add: (...args) => axios.post('/wordroot/add', ...args),
	edit: (...args) => axios.post('/wordroot/edit', ...args),
	delete: (...args) => axios.post('/wordroot/delete', ...args),
}
