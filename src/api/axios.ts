// http.ts
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'
import qs from 'qs'
import { ElMessage } from 'element-plus'

const showStatus = (status: number) => {
	let message = ''
	switch (status) {
		case 400:
			message = '请求错误(400)'
			break
		case 401:
			message = '未授权，请重新登录(401)'
			break
		case 403:
			message = '拒绝访问(403)'
			break
		case 404:
			message = '请求出错(404)'
			break
		case 408:
			message = '请求超时(408)'
			break
		case 500:
			message = '服务器错误(500)'
			break
		case 501:
			message = '服务未实现(501)'
			break
		case 502:
			message = '网络错误(502)'
			break
		case 503:
			message = '服务不可用(503)'
			break
		case 504:
			message = '网络超时(504)'
			break
		case 505:
			message = 'HTTP版本不受支持(505)'
			break
		default:
			message = `连接出错(${status})!`
	}
	return `${message}，请检查网络或联系管理员！`
}

const service = axios.create({
	// 联调
	// baseURL: process.env.NODE_ENV === 'production' ? `/` : '/api',
	baseURL: '/api',
	headers: {
		get: {
			'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
		},
		post: {
			'Content-Type': 'application/json;charset=utf-8',
		},
	},
	// 是否跨站点访问控制请求
	withCredentials: true,
	timeout: 30000,
	transformRequest: [
		(data) => {
			data = JSON.stringify(data)
			return data
		},
	],
	validateStatus() {
		// 使用async-await，处理reject情况较为繁琐，所以全部返回resolve，在业务代码中处理异常
		return true
	},
	transformResponse: [
		(data) => {
			if (typeof data === 'string' && data.startsWith('{')) {
				data = JSON.parse(data)
			}
			return data
		},
	],
})

// 声明一个 Map 用于存储每个请求的标识 和 取消函数
const pending = new Map()
/**
 * 添加请求
 * @param {Object} config
 */
const addPending = (config: AxiosRequestConfig) => {
	const url = [
		config.method,
		config.url,
		qs.stringify(config.params),
		qs.stringify(config.data),
	].join('&')
	config.cancelToken =
		config.cancelToken ||
		new axios.CancelToken((cancel) => {
			if (!pending.has(url)) {
				// 如果 pending 中不存在当前请求，则添加进去
				pending.set(url, cancel)
			}
		})
}
/**
 * 移除请求
 * @param {Object} config
 */
const removePending = (config: AxiosRequestConfig) => {
	const url = [
		config.method,
		config.url,
		qs.stringify(config.params),
		qs.stringify(config.data),
	].join('&')
	if (pending.has(url)) {
		// 如果在 pending 中存在当前请求标识，需要取消当前请求，并且移除
		const cancel = pending.get(url)
		cancel(url)
		pending.delete(url)
	}
}

/**
 * 清空 pending 中的请求（在路由跳转时调用）
 */
export const clearPending = () => {
	for (const [url, cancel] of pending) {
		cancel(url)
	}
	pending.clear()
}

// 请求拦截器
service.interceptors.request.use(
	(config: AxiosRequestConfig) => {
		// removePending(config) // 在请求开始前，对之前的请求做检查取消操作
		// addPending(config) // 将当前请求添加到 pending 中
		let token = localStorage.getItem('token')
		if (token) {
			config.headers.Authorization = `${token}`
		}
		return config
	},
	(error) => {
		// 错误抛到业务代码
		error.data = {}
		error.data.msg = '服务器异常，请联系管理员！'
		return Promise.resolve(error)
	}
)

// 响应拦截器
service.interceptors.response.use(
	(response: AxiosResponse) => {
		// removePending(response) // 在请求结束后，移除本次请求
		const status = response.status
		let msg = ''
		if (status < 200 || status >= 300) {
			// 处理http错误，抛到业务代码
			msg = showStatus(status)
			if (typeof response.data === 'string') {
				response.data = { msg }
			} else {
				response.data.msg = msg
			}
		}

		// 业务逻辑处理失败，业务逻辑正常为1，否则为0，因项目而不同
		if (response.data.code !== 1) {
			response.data.fail = true
			ElMessage.error(response.data.msg)
		}

		return response
	},
	(error) => {
		if (axios.isCancel(error)) {
			console.log('repeated request: ' + error.message)
		} else {
			// handle error code
			// 错误抛到业务代码
			error.data = {}
			error.data.msg = '请求超时或服务器异常，请检查网络或联系管理员！'
			ElMessage.error(error.data.msg)
		}
		return Promise.reject(error)
	}
)

export default {
	//get请求
	get(url, param) {
		return new Promise((resolve, reject) => {
			service({
				method: 'get',
				url,
				params: param,
			})
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	},
	//post请求
	post(url, param) {
		return new Promise((resolve, reject) => {
			service({
				method: 'post',
				url,
				data: param,
			})
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	},
	//form-data
	postform(url, param) {
		return new Promise((resolve, reject) => {
			service({
				method: 'post',
				url,
				data: param,
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	},
	put(url, param, isFormData = false) {
		let config = {
			method: 'put',
			url,
			data: param,
		}

		if (isFormData) {
			config.headers = {
				'Content-Type': 'application/x-www-form-urlencoded',
			}
			config.data = qs.stringify(param)
		}
		return new Promise((resolve, reject) => {
			service(config)
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	},
	// blob下载
	file(url, param, method = 'GET') {
		return new Promise((resolve, reject) => {
			service({
				method: method,
				url,
				data: param,
				responseType: 'blob',
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	},
	delete(url, param) {
		return new Promise((resolve, reject) => {
			service({
				method: 'delete',
				url,
				params: param,
			})
				.then((res) => {
					resolve(res)
				})
				.catch((err) => {
					reject(err)
				})
		})
	},
}
