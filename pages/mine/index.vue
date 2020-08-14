<template>
	<view>
		<view class="view-header_root">
			<userInfoBtn @onClickBtn="onGetAuthData">
				<text>uni-小程序</text>
			</userInfoBtn>
			<button type="primary" open-type="share" @click="onShareAppMessage">分享</button>
			<text>123456</text>
			<view v-for="(item,index) in listData" :key="index">
				<text>{{item.created_at}}</text>
				<text>{{item.asset_money}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import userInfoBtn from '@/components/common/userInfoBtn.vue'
	import {
		AppModel
	} from '../../models/app.js'
	const appModel = new AppModel()
	export default {
		components: {
			userInfoBtn
		},
		data() {
			return {
				// userInfo: this.$store.userInfo
				listData: []
			}
		},
		onShow() {
			this.getList()
		},
		methods: {
			onGetAuthData() {
				//授权成功后的回调事件
				console.log('success')
			},
			onShareAppMessage() {
				return {
					title: `分享的标题`,
					path: `/pages/mine/index?id=${111}`,
					imageUrl: `分享的url`
				}
			},
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
					console.log(res.status)
					if (res.status === 200) {
						this.listData = res.data.arr
						console.log(this.listData)
					}
				})
			},
		}
	}
</script>

<style>
	.view-header_root {
		width: 100%;
		height: 100vh;
		font-style: 20px;
	}
</style>
