import axios from './axios'
export const CategoryService = {
	query: () => axios.get('/category/tree', {}),
	add: (args: categoryType) => axios.post('/category/add', args),
	edit: (args: categoryType) => axios.post('/category/edit', args),
	delete: (args: { id: number }) => axios.post('/category/delete', args),
}

export interface categoryType {
	id?: number
	name?: string // 名称
	pid?: number
	type?: string // 类型，词根、前缀、后缀
	sort?: number // 排序码
	note?: string // 备注
	title?: string // 树显示的信息
	children?: categoryType[]
}
