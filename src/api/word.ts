import axios from './axios'
export const WordService = {
	queryList: (...args) => axios.get('/simpleword/list', ...args),
	add: (...args) => axios.post('/simpleword/add', ...args),
	edit: (...args) => axios.post('/simpleword/edit', ...args),
	delete: (...args) => axios.post('/simpleword/delete', ...args),
}
