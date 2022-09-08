// 频率
export const frequencyOptions = [
	{ label: '高频', value: 'HIGHT' },
	{ label: '中频', value: 'MIDDLE' },
	{ label: '低频', value: 'LOW' },
	{ label: '未入频', value: null },
]

// 语源
export const sourceOptions = [
	{ label: '法语', value: 'F' },
	{ label: '希腊语', value: 'GK' },
	{ label: '拉丁语', value: 'L' },
	{ label: '中古英语', value: 'ME' },
	{ label: '古英语', value: 'OE' },
]

// 音变规律
export const varyOptions =  [
	{
	  label: '元音音变',
	  options: [
			{
			value: 'y1',
			label: '元音替换',
			},
			{
			value: 'y2',
			label: '元音脱落',
			},
			{
			value: 'y3',
			label: '元音增减',
		  },
	  ],
	},
	{
		label: '辅音互换公式',
		options: [
			{
				label: '辅音公式：b-p-f(v,w,ph)-m',
				value: 'f1',
			},
			{
				label: '辅音公式：g-h-k(c,ch,qu,ct)-j',
				value: 'f2',
			},
			{
				label: '辅音公式：d-t-th(s)-sh(z)',
				value: 'f3',
			},
			{
				label: '辅音公式：r-s(st)',
				value: 'f4',
			},
			{
				label: '辅音公式：z-s-c',
				value: 'f5',
			},
			{
				label: '辅音公式：s-x-k-c',
				value: 'f6',
			},
			{
				label: '辅音公式：l-m-n-r',
				value: 'f7',
			},
			{
				label: '辅音公式：g-j-y',
				value: 'f8',
			},
			{
				label: '辅音公式：u-v-w',
				value: 'f9',
			},
			{
				label: '辅音公式：gu-g-w',
				value: 'f10',
			},
		],
	},
	{
		label: '其他辅音音变',
		options: [
			{
				label: '辅音同化',
				value: 'fo1',
			},
			{
				label: '添加鼻音',
				value: 'fo2',
			},
			{
				label: '辅音叠化',
				value: 'fo3',
			},
			{
				label: '辅音插入',
				value: 'fo4',
			},
			{
				label: '辅音脱落',
				value: 'fo5',
			},
			{
				label: '字母位移',
				value: 'fo6',
			},
			{
				label: '组合简化',
				value: 'fo7',
			},
		],
	},
	{
		label: '补充音节',
		options: [
			{
				label: '连接字母a、e、i、o、u',
				value: 'b1',
			},
			{
				label: '补充辅音c、x、ct',
				value: 'b2',
			},
			{
				label: '音节at、et、it、ot、ut',
				value: 'b3',
			},
			{
				label: '音节in、ul、il',
				value: 'b4',
			},

		]
	}
];



// 完善程度
export const levelOptions = [
	{ label: '未完善', value: 0 },
	{ label: '完善中', value: 1 },
	{ label: '已完善', value: 2 },
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
  