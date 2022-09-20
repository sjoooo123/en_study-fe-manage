import { createRouter, createWebHistory } from 'vue-router'
import Home from '../pages/Home.vue'
import Dict from '../pages/Dict/list.vue'
import Category from '../pages/Category/index.vue'
import Pieroot from '../pages/Pieroot/list.vue'
import Wordroot from '../pages/Wordroot/list.vue'
import Prefix from '../pages/Prefix/list.vue'
import Suffix from '../pages/Suffix/list.vue'
import Simpleword from '../pages/Simpleword/list.vue'

const routes = [
	{ path: '/', redirect: '/home' },
	{
		path: '/home',
		name: 'home',
		component: Home,
	},
	// {
	// 	path: '/dict',
	// 	name: 'dict',
	// 	component: Dict,
	// },
	{
		path: '/category',
		name: 'category',
		component: Category,
	},
	{
		path: '/pieroot',
		name: 'pieroot',
		component: Pieroot,
	},
	{
		path: '/wordroot',
		name: 'wordroot',
		component: Wordroot,
	},
	{
		path: '/prefix',
		name: 'prefix',
		component: Prefix,
	},
	{
		path: '/suffix',
		name: 'suffix',
		component: Suffix,
	},
	{
		path: '/simpleword',
		name: 'simpleword',
		component: Simpleword,
	},
]

export const router = createRouter({
	history: createWebHistory(),
	routes,
})
