// 频率
export const frequencyOptions = [
	{ label: '高频', value: 'HIGHT' },
	{ label: '中频', value: 'MIDDLE' },
	{ label: '低频', value: 'LOW' },
	{ label: '未入频', value: null },
]

// 频率
export const sourceOptions = [
	{ label: '法语', value: 'F' },
	{ label: '希腊语', value: 'GK' },
	{ label: '拉丁语', value: 'L' },
	{ label: '中古英语', value: 'ME' },
	{ label: '古英语', value: 'OE' },
]


// 返回选项名称
export const getOptionsName = (list, id) => {
	let name = '';
	list.some((item) => {
	  if (item.value === id) {
		name = item.label;
	  }
	  return item.value === id;
	});
	return name;
  };
  