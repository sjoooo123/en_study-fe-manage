<template>
	<i style="color: #f00"
		>屈折词缀涉及的主要是语法，所以本软件主要提供的词缀仅限于派生词缀</i
	>
	<h3>屈折词缀与派生词缀的区别：</h3>
	<ol>
		<li>
			加在词干的位置不同。派生词缀既可以加在词干的前面，构成前缀，也可以加在词干的后面，构成后缀；曲折词缀只能加在词干后边。
		</li>
		<li>
			两者功能不同。派生词缀中的前缀一般是改变词语的语义而不改变词的词性，后缀一般是改变词性或改变语义；而曲折词缀主要是表达不同的语法关系或语法范畴，如数、时、格等。
		</li>
		<li>
			两者包含的内容不同。派生词缀主要是加前缀或者后缀；屈折词缀主要包括复数、第三人称单数、分词形式、比较级等形式。
		</li>
		<li>
			两者构成的词语不同。派生词缀可以构成派生词；屈折词缀一般不构成新词。
		</li>
		<li>
			两者重点不同。派生词缀侧重于语义上的不同，屈折词缀侧重于语法上的不同。
		</li>
	</ol>
	<i color="color:#f00"
		>单词由词根屈折、派生而成，当然也可以单独成词，组合成词</i
	>
	<h3>单词按照功用，分为十大类</h3>
	<ol>
		<li>名词 n.student 学生</li>
		<li>代词 pron.you 你</li>
		<li>形容词 adj.happy 高兴的</li>
		<li>副词 adv.quickly迅速地</li>
		<li>动词 v.cut 砍</li>
		<li>数词 num.three 三</li>
		<li>冠词 art.a 一个</li>
		<li>介词 prep.at 在</li>
		<li>连词 conj.and 和</li>
		<li>感叹词 interj.oh 哦</li>
	</ol>
	<p>前六类叫实词，后四类叫虚词。词根主要涉及实词。</p>
	<h3>词根词缀记忆三大原则：</h3>
	<ol>
		<li>顺序改变，意思不变</li>
		<li>
			元音替换，意思不变
			<i>词根中的元音字母(aeiouy)可以随意替换，都不会改变单词的意思</i>
		</li>
		<li>读音相近，意思相同</li>
	</ol>
	<h3>
		连接字符，在词根词缀中添加（移除），但不会改变其意思的字符，主要有：
	</h3>
	<p>ee,fer,i,ia,m,o,u</p>
	<div>
		<el-button type="primary" @click="updateData(prefixData, 'prefix')">根据前缀修改</el-button>
		<el-button type="primary" @click="updateData(wordrootData, 'wordroot')">根据词根修改</el-button>
		<el-button type="primary" @click="updateData(wordData, 'word')">根据单词修改</el-button>
	</div>
</template>
<script lang="ts" setup>
// 加载数据库文件
import { ElMessage } from 'element-plus';
import prefixData from './data/prefix.js';
import wordrootData from './data/wordroot.js';
import wordData from './data/word.js';

const updateData = (data: any, tableName: string) => {
	let sqlStr = '', sqlStrid = '';
	data.RECORDS.forEach(item=>{
		const pieList = item.pie.split(',').filter(d=>d.length).reverse();
		for(let i=0, l = pieList.length; i < l - 1; i++) {
			sqlStr += `update pieroot set pie = '${pieList[i+1]}' where id = ${pieList[i]};`
		}
		sqlStrid += `update ${tableName} set pie = '${pieList[0]}' where id = ${item.id};`
	})

	console.log(sqlStr)
	console.log(sqlStrid)

    ElMessage.success('生成成功');
};
</script>
<style lang="less" scoped>
i {
	margin-left: 10px;
	font-size: 12px;
	color: #aaa;
}
</style>
