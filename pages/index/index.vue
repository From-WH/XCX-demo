<template>
	<view>
		<view class="search">

			<u-search placeholder="日照香炉生紫烟" v-model="keyword"></u-search>
		</view>
		<view class="wrap">
			<u-swiper :list="list" :effect3d="true"></u-swiper>
		</view>
		<view class="tabs">
			<u-tabs :list="tabslist" :is-scroll="false" :current="current" @change="change">

			</u-tabs>
		</view>
		<view v-if="current===0">
			<u-rate :count="2" v-model="value">
				
			</u-rate>
		</view>
		<view v-if="current===1">
			<u-rate :count="4" v-model="value"></u-rate>
		</view>
		<view>
			<u-card :title="title" :sub-title="subTitle" :thumb="thumb">
				<view class="" slot="body">
					<view class="u-body-item u-flex u-border-bottom u-col-between u-p-t-0">
						<view class="u-body-item-title u-line-2">瓶身描绘的牡丹一如你初妆，冉冉檀香透过窗心事我了然，宣纸上走笔至此搁一半</view>
						<image src="https://img11.360buyimg.com/n7/jfs/t1/94448/29/2734/524808/5dd4cc16E990dfb6b/59c256f85a8c3757.jpg"
						 mode="aspectFill"></image>
					</view>
					<view class="u-body-item u-flex u-row-between u-p-b-0">
						<view class="u-body-item-title u-line-2">釉色渲染仕女图韵味被私藏，而你嫣然的一笑如含苞待放</view>
						<image src="https://img12.360buyimg.com/n7/jfs/t1/102191/19/9072/330688/5e0af7cfE17698872/c91c00d713bf729a.jpg"
						 mode="aspectFill"></image>
					</view>
				</view>
				<view class="" slot="foot">
					<u-icon name="chat-fill" size="34" color="" label="30评论"></u-icon>
				</view>
			</u-card>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 4,
				value: 5,
				keyword: '遥看瀑布挂前川',
				current: 0,
				currentModel: 0,
				title: '素胚勾勒出青花，笔锋浓转淡',
				subTitle: '2020-05-15',
				thumb: 'http://pic2.sc.chinaz.com/Files/pic/pic9/202002/hpic2119_s.jpg',
				list: [{
						image: 'https://cdn.uviewui.com/uview/swiper/1.jpg',
						title: '昨夜星辰昨夜风，画楼西畔桂堂东'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/2.jpg',
						title: '身无彩凤双飞翼，心有灵犀一点通'
					},
					{
						image: 'https://cdn.uviewui.com/uview/swiper/3.jpg',
						title: '谁念西风独自凉，萧萧黄叶闭疏窗，沉思往事立残阳'
					}
				],
				tabslist: [{
					name: '首页'
				}, {
					name: '推荐'
				}, {
					name: '溯源'
				}],
			}
		},
		onShow() {},
		onLoad() {},
		methods: {
			change(index) {
				console.log(index)
				this.current = index;
				this.currentModel = index;
			}
		}
	}
</script>
<style lang="scss" scoped>
	.search {
		padding: 10rpx 40rpx;
	}

	.wrap {
		padding: 10rpx 40rpx;
	}

	.u-card-wrap {
		background-color: $u-bg-color;
		padding: 1px;
	}

	.u-body-item {
		font-size: 32rpx;
		color: #333;
		padding: 20rpx 10rpx;
	}

	.u-body-item image {
		width: 120rpx;
		flex: 0 0 120rpx;
		height: 120rpx;
		border-radius: 8rpx;
		margin-left: 12rpx;
	}
</style>
