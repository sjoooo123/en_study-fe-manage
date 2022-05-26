import axios from './axios'
export const CategoryService = {
	query: (...args) =>
		axios.get('/category/list', {
			// filters: [
			// 	{ type: ['prefix', 'suffix'] },
			// 	{ name: ['名词', '副词'] },
			// ],
		}),
}

export interface categoryType {
	name: string
	id: number
	type: string
}
