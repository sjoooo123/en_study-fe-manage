// 频率
export const frequencyOptions = [
    { label: "高频", value: "HIGHT" },
    { label: "中频", value: "MIDDLE" },
    { label: "低频", value: "LOW" },
    { label: "未入频", value: null },
];

// 语源
export const sourceOptions = [
    { label: "希腊语", value: "GK" },
    { label: "拉丁语", value: "L" },
    { label: "日耳曼语", value: "OE" },
    { label: "其他", value: "其他" },
];

// 语言类型
export const langTypeOptions = [
    { label: "原始印欧语", value: "PIE" },
    { label: "希腊语", value: "GK" },
    { label: "拉丁语", value: "L" },
    { label: "中古英语", value: "ME" },
    { label: "古英语", value: "OE" },
    { label: "日耳曼语", value: "Germanic" },
    { label: "原始日耳曼语", value: "Proto-Germanic" },
    { label: "法语", value: "F" },
    { label: "中古法语", value: "MF" },
    { label: "古法语", value: "OF" },
    { label: "西班牙语", value: "SPANISH" },
    { label: "意大利语", value: "ITALY" },
    { label: "爱尔兰语", value: "Irish" },
    { label: "盖尔族语", value: "Gaelic" },
    { label: "荷兰语", value: "Dutch" },
    { label: "德语", value: "German" },
    { label: "希伯来语", value: "Hebrew" },
    { label: "阿拉伯语", value: "Arabic" },
    { label: "泰米尔语", value: "Tamil" },
    { label: "梵语", value: "Sanskrit" },
    { label: "印地语", value: "Hindi" },
    { label: "挪威语", value: "Norse" },
    { label: "波斯语", value: "Persian" },
    { label: "法兰克语", value: "Frankish"},
    { label: "撒克逊语", value: "Saxon"},
    { label: "意第绪语", value: "Yiddish"},
    { label: "凯尔特语", value: "Celtic"},
    { label: "葡萄牙语", value: "Portuguese"},
    { label: "伊朗语", value: "Iranian"},
    { label: "苏格兰语", value: "Scottish"},
    { label: "盎格鲁-诺曼", value: "Anglo-Norman"},
    { label: "丹麦", value: "Danish"},
    { label: "汤加", value: "Tongan"},
    { label: "高卢语", value: "Gaulish"},
    { label: "土耳其语", value: "Turkish"},
    { label: "爱斯基摩语", value: "Eskimo"},
    { label: "匈牙利语", value: "Hungarian"},
    { label: "瑞典语", value: "Swedish"},
    { label: "泰米尔语", value: "Tamil"},
    { label: "海地语", value: "Haiti"},
    { label: "巴斯克语", value: "Basque"},
    { label: "纳瓦特尔语", value: "Nahuatl"},
    
];

// 音变规律
export const varyOptions = [
    {
        label: "元音音变",
        options: [
            {
                value: "y1",
                label: "元音音变：a-e-i-o-u-(y)",
            },
        ],
    },
    {
        label: "辅音音变",
        options: [
            {
                label: "辅音音变：b-p-f(v,w,ph)-m",
                value: "f1",
            },
            {
                label: "辅音音变：g-h-k(c,ch,qu,ct)-j",
                value: "f2",
            },
            {
                label: "辅音音变：d-t-th(s)-sh(z)",
                value: "f3",
            },
            {
                label: "辅音音变：r-s(st)",
                value: "f4",
            },
            {
                label: "辅音音变：z-s-c",
                value: "f5",
            },
            {
                label: "辅音音变：s-x-k-c",
                value: "f6",
            },
            {
                label: "辅音音变：l-m-n-r",
                value: "f7",
            },
            {
                label: "辅音音变：g-j-y",
                value: "f8",
            },
            {
                label: "辅音音变：u-v-w",
                value: "f9",
            },
            {
                label: "辅音音变：gu-g-w",
                value: "f10",
            },
        ],
    },
    // {
    // 	label: '其他辅音音变',
    // 	options: [
    // 		{
    // 			label: '辅音同化',
    // 			value: 'fo1',
    // 		},
    // 		{
    // 			label: '添加鼻音',
    // 			value: 'fo2',
    // 		},
    // 		{
    // 			label: '辅音叠化',
    // 			value: 'fo3',
    // 		},
    // 		{
    // 			label: '辅音插入',
    // 			value: 'fo4',
    // 		},
    // 		{
    // 			label: '辅音脱落',
    // 			value: 'fo5',
    // 		},
    // 		{
    // 			label: '字母位移',
    // 			value: 'fo6',
    // 		},
    // 		{
    // 			label: '组合简化',
    // 			value: 'fo7',
    // 		},
    // 	],
    // },
    // {
    // 	label: '补充音节',
    // 	options: [
    // 		{
    // 			label: '连接字母a、e、i、o、u',
    // 			value: 'b1',
    // 		},
    // 		{
    // 			label: '补充辅音c、x、ct',
    // 			value: 'b2',
    // 		},
    // 		{
    // 			label: '音节at、et、it、ot、ut',
    // 			value: 'b3',
    // 		},
    // 		{
    // 			label: '音节in、ul、il',
    // 			value: 'b4',
    // 		},

    // 	]
    // }
];

// 等级
export const gradeOptions = [
    { label: "初中", value: "初中" },
    { label: "高中", value: "高中" },
    { label: "CET-4", value: "CET-4" },
    { label: "CET-6", value: "CET-6" },
    { label: "考研", value: "考研" },
    { label: "TEM-4", value: "TEM-4" },
    { label: "雅思", value: "雅思" },
    { label: "托福", value: "托福" },
    { label: "TEM-8", value: "TEM-8" },
    { label: "辅助词基", value: "CIJI" },
];

// 专业领域
export const fieldOptions = [
    { label: "数学", value: 1 },
    { label: "特许金融分析师（CFA）", value: 2 },
    { label: "法律", value: 3 },
    { label: "半导体微电子", value: 4 },
    { label: "护理", value: 5 },
    { label: "化学", value: 6 },
    { label: "畜牧兽医", value: 7 },
    { label: "传播学", value: 8 },
    { label: "地理", value: 9 },
    { label: "会计", value: 10 },
    { label: "计算机", value: 11 },
    { label: "历史", value: 12 },
    { label: "商务", value: 13 },
    { label: "生物", value: 14 },
    { label: "物流", value: 15 },
    { label: "心理学", value: 16 },
];

// 常用级
export const commonlevelOptions = [
    { label: "5", value: "5" },
    { label: "4", value: "4" },
    { label: "3", value: "3" },
    { label: "2", value: "2" },
    { label: "1", value: "1" },
    { label: "None", value: "None" },
];

// 完善程度
export const levelOptions = [
    { label: "未完善", value: 0 },
    { label: "完善中", value: 1 },
    { label: "已完善", value: 2 },
];

// 返回选项名称
export const getOptionsName = (list, id) => {
    let name = "";
    list.some((item) => {
        if (item.value === id) {
            name = item.label;
        }
        return item.value === id;
    });
    return name;
};
