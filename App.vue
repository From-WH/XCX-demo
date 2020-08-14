<script>
	import {
		AppModel
	} from './models/app.js'
	const appModel = new AppModel()

	export default {

		onShow: function() {

			console.log('on show');
			// this.getLogin()
			this.getList()
			console.log('11111')
		},

		methods: {
			getList() {
				appModel.getList({
					accessToken: 1,
					dataString: {
						limit: 10,
						offset: 0,
						where: {
							AND: [{
									created_at_gte: ""
								},
								{
									created_at_lte: ""
								}
							],
							OR: [{
								// number_eq: ""
							}]
						}
					}
				}).then(res => {
					console.log(res)
				})
			},
			getLogin() {
				uni.login({
					success: function(res) {
						if (res.code) {
							appModel.login({
								code: res.code
							}).then(response => {
								this.$store.dispatch('setUserInfo', response.data)
								//这里存储了之后，等再进入小程序获取数据或其它的Api交互时，就可以带上放在header头中去向服务端发起请求
								uni.setStorageSync('AuthTokens', response.data.token)
								uni.login({
									success(response) {
										uni.setStorageSync('wxCode', response.code);
									}
								})
							}).catch(errors => {
								console.error(errors)
							})
						}
					},
					fail: function() {
						uni.showToast({
							title: '微信登录失败',
							icon: 'none'
						})
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	@import "uview-ui/index.scss";
	/*每个页面公共css */
</style>
