import {
	HTTP
} from '../utils/http.js'

class AppModel extends HTTP {
	login(params) {
		return this.request({
			url: `/user/login`,
			method: 'POST',
			data: params
		})
	};
	getList(params) {
		return this.request({
			url: `/api/consumerApi/all/mall_account_list`,
			data: params,
			method: 'POST'
		})
	}
}

export {
	AppModel
}
