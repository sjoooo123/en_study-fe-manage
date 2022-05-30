/* 树结构扁平化
 * arr 待处理树
 * res 扁平数组
 * pName 父级文本（显示使用）
 */
export function flatData(arr, res, pName = '') {
	arr.forEach((item) => {
		item.name = pName ? pName + '/' + item.name : item.name
		// res.push(item)
		// 排除非叶子节点
		item.children && item.children.length > 0
			? flatData(item.children, res, item.name)
			: res.push(item)
	})
}
