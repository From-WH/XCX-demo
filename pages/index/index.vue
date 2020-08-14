<template>
	<view>
		<view class="wrap">
			<u-swiper :list="list"></u-swiper>
		</view>
	</view>
</template>

<script>
	import userInfoBtn from '@/components/common/userInfoBtn.vue'
	import uniSearchBar from '@/components/uni-search-bar/uni-search-bar.vue'
	import Map from '../../js_sdk/fx-openMap/openMap.js'
	import uCharts from '../../components/u-charts/u-charts.js';
	import loadRefresh from '@/components/load-refresh/load-refresh.vue'
	import {
		mapGetters
	} from 'vuex'
	var _self;
	var canvaPie = null;
	export default {
		components: {
			userInfoBtn,
			uniSearchBar,
			loadRefresh,
			// Map
		},
		data() {
			return {
				src: 'https://cdn.uviewui.com/uview/example/fade.jpg',
				list: [{
					text: '点赞',
					color: 'blue',
					fontSize: 28
				}, {
					text: '分享'
				}, {
					text: '评论'
				}],
				show: true,
				currPage: 1, // 当前页码
				totalPage: 1, // 总页数
				idolName: "",
				logout: false,
				newNickname: "",
				idolInfo: {},
				starUrl: '',
				background: ['color1', 'color2', 'color3'],
				indicatorDots: true,
				autoplay: true,
				interval: 2000,
				duration: 500,
				id: 0, // 使用 marker点击事件 需要填写id
				title: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
				}],
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				serverData: '',
			}
		},
		computed: {
			...mapGetters([
				'userInfo'
			])
		},

		filters: {
			formatUserName(val) {
				console.log(val)
				if (val) {
					return val
				} else {
					console.log(2222)
					return 'uni-小程序'
				}
			},
			formatAvatarUrl(val) {
				if (val) {
					return val
				} else {
					// return require('@/static/images/common/default-avatar.png')
				}
			},
		},
		onShow() {},
		onLoad() {
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			this.getServerData();
		},
		methods: {
			// 上划加载更多
			loadMore() {
				console.log('loadMore')
				// 请求新数据完成后调用 组件内loadOver()方法
				// 注意更新当前页码 currPage
				this.$refs.loadRefresh.loadOver()
			},
			// 下拉刷新数据列表
			refresh() {
				console.log('refresh')
			},
			getServerData() {
				uni.request({
					url: 'https://www.ucharts.cn/data.json',
					data: {},
					success: function(res) {
						console.log(res.data.data)
						let Pie = {
							series: []
						};
						//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
						Pie.series = res.data.data.Pie.series;
						_self.showPie("canvasPie", Pie);
					},
					fail: () => {
						_self.tips = "网络错误，小程序端请检查合法域名";
					},
				});
			},
			showPie(canvasId, chartData) {
				canvaPie = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'pie',
					fontSize: 11,
					legend: {
						show: true
					},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					series: chartData.series,
					animation: true,
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					dataLabel: true,
					extra: {
						pie: {
							lableWidth: 15
						}
					},
				});
			},
			touchPie(e) {
				canvaPie.showToolTip(e, {
					format: function(item) {
						return item.name + ':' + item.data
					}
				});
			},
			goMap() {
				uni.getLocation({
					type: 'gcj02',
					success: (res) => {
						Map.openMap(res.latitude, res.longitude, "北客站")
						console.log('当前位置的经度：' + res.longitude);
						console.log('当前位置的纬度：' + res.latitude);
					}
				});
			},
			input(data) {
				console.log(data)
			},
			search(data) {
				console.log(data)
			},
			logoutFansTeam() {
				this.idolName = this.userInfo.starName;
				this.logout = true;
			},
			onGetAuthData() {
				//获取授权成功后的数据
				console.log(3333)
			},
			changeIndicatorDots(e) {
				this.indicatorDots = !this.indicatorDots
			},
			changeAutoplay(e) {
				this.autoplay = !this.autoplay
			},
			intervalChange(e) {
				this.interval = e.target.value
			},
			durationChange(e) {
				this.duration = e.target.value
			}
		}
	}
</script>

<style lang="less">
	.mine-container {
		.user-info-container {
			button {
				line-height: 40upx;
			}
		}

	}
</style>
<style lang="less" scoped>
	.content {
		width: 100%;
		height: 100%;
	}

	.swiper-item {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.uni-bg-red {
		background-color: red;
	}

	.uni-bg-green {
		background-color: green;
	}

	.uni-bg-blue {
		background-color: blue;
	}

	.input-nickname {
		width: 462upx;
		height: 86upx;
		margin-bottom: 16upx;
		margin-top: 16upx;
		background: #FFFFFF;
		border: 1upx solid #F0F0F0;
		border-radius: 4upx;
		display: flex;
		align-items: center;

		>input {
			width: 398upx;
			margin: 16upx 32upx;
			font-family: PingFangSC-Regular;
			font-size: 28upx;
			color: #212121;
		}
	}

	.neil-modal__footer {
		border-top: 1px solid #e5e5e5;
	}

	.view-item-container {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.view-level {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 100upx;
	}

	.text-level {
		margin-left: -40upx;
		font-family: PingFangSC-Regular;
		font-size: 24upx;
		color: #FFFFFF;
		line-height: 40upx;
	}


	.view-header_root {
		width: 750upx;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		margin-top: -64upx;
		padding: 0 40upx 0 30upx;

		text {
			margin-top: 20upx;
			font-size: 24upx;
			color: #fff;
		}

		.un-auth {
			display: flex;
			flex-direction: column;
		}
	}

	.view-user-info {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		// margin-right: 40upx;
		align-items: center;

		>view {
			display: flex;
			justify-content: center;
			align-items: center;

			>text {
				font-family: PingFangSC-Medium;
				font-size: 32upx;
				color: #FFFFFF;
				letter-spacing: 0;
				display: inline-block;
				max-width: 200upx;
				text-overflow: ellipsis;
				white-space: nowrap;
				overflow: hidden;
			}
		}
	}



	.view-header_root {
		>view {
			&:nth-child(1) {
				display: flex;
				justify-content: center;
				align-items: center;
				flex-direction: row;
			}

			&:nth-child(2) {
				width: 436upx;
			}
		}
	}

	.avatar-img {
		width: 120upx;
		height: 120upx;
		border-radius: 60upx;
	}

	.text-question-below {
		// font-family: PingFangSC-Medium;
		font-size: 40upx;
		font-weight: 500;
		color: #FFFFFF;
		margin-left: 32upx;
	}

	.view-question {
		width: 264upx;
		margin-left: 32upx;
		margin-right: 32upx;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.image-question {
		width: 24upx;
		height: 24upx;
	}

	.text-question {
		font-size: 24upx;
		color: #FFFFFF;
	}

	.text-item-title {
		margin-left: 35upx;
		font-family: PingFangSC-Regular;
		font-size: 32upx;
		color: #212121;
	}

	.button-item-title {
		margin-left: 35upx;
		font-family: PingFangSC-Regular;
		font-size: 32upx;
		color: #212121;
		outline: none;
		padding: 0 0;
		width: 610upx;
		background: #FFFFFF;
		text-align: start;

	}

	button::after {
		border: none;
	}


	page {
		height: 100%;

		.mine-container {
			height: 100%;
			background: #F7F7F7;

			>header {
				width: 750upx;
				height: 312upx;
				background-image: linear-gradient(-180deg, #4bbbff 0%, #157cfd 100%);
				display: flex;
				flex-direction: row;
			}

			>main {

				.btm-cnt {
					margin-top: 24upx;
					background: #fff;
					padding: 0 32upx;

					>view {
						display: flex;
						align-items: center;
						height: 120upx;
						border-bottom: 1px solid #F7F7F7;
						font-family: PingFangSC-Regular;
						font-size: 32upx;
						color: #212121;
						letter-spacing: 0;

						>image {
							width: 40upx;
							height: 40upx;
							margin-right: 30upx;
						}
					}
				}
			}
		}
	}

	.dialog-title {
		font-family: PingFangSC-Regular;
		font-size: 36upx;
		color: #000000;
		text-align: center;
	}

	.dialog-content {
		font-family: PingFangSC-Regular;
		font-size: 30upx;
		color: #888888;
		text-align: center;
		line-height: 40px;
	}

	.view-footer {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.logout-modal-content {
		width: 464upx;
		padding: 30upx 38upx 30upx;
		border-bottom: 1px solid #e5e5e5;
		display: flex;
		flex-direction: column;
		align-items: center;

		.logout-title {
			font-family: PingFangSC-Regular;
			font-size: 36upx;
			color: #000000;
			text-align: center;
			line-height: 50upx;
		}
	}

	page {
		background: #F2F2F2;
		width: 750upx;
		overflow-x: hidden;
	}

	.qiun-padding {
		padding: 2%;
		width: 96%;
	}

	.qiun-wrap {
		display: flex;
		flex-wrap: wrap;
	}

	.qiun-rows {
		display: flex;
		flex-direction: row !important;
	}

	.qiun-columns {
		display: flex;
		flex-direction: column !important;
	}

	.qiun-common-mt {
		margin-top: 10upx;
	}

	.qiun-bg-white {
		background: #FFFFFF;
	}

	.qiun-title-bar {
		width: 96%;
		padding: 10upx 2%;
		flex-wrap: nowrap;
	}

	.qiun-title-dot-light {
		border-left: 10upx solid #0ea391;
		padding-left: 10upx;
		font-size: 32upx;
		color: #000000
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
