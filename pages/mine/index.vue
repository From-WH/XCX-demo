<template>
	<view>
		<!-- <view class="view-header_root" v-if="hasAuthorUrserInfo">
			<view>
				<image class="avatar-img" :src="userInfo.avatarUrl | formatAvatarUrl"></image>
				<image class="avatar-img2" :src="starUrl" v-if="userInfo.starId > 0"></image>
			</view>
			<text>{{userInfo.userName | formatUserName}}</text>
		</view> -->
		<view class="view-header_root">
			<userInfoBtn @onClickBtn="onGetAuthData">
				<text>uni-小程序</text>
			</userInfoBtn>
		</view>
	<view>
</template>

<script>
	import userInfoBtn from '@/components/common/userInfoBtn.vue'
	export default {
		components: {
			userInfoBtn
		},
		data() {
			return {
				// userInfo: this.$store.userInfo
			}
		},
		methods: {
			onGetAuthData() {
				//授权成功后的回调事件
				console.log('success')
			}
		}
	}
</script>

<style>
	.view-header_root{
		width: 100%;
		height: 100vh;
		font-style: 20px;
	}
</style>
