// pages/mine/mine.js
import dataapi from '../../servicesAPI/dataapi'
import posterApi from '../../servicesAPI/posterapi'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
const app = getApp();
const setting = require("../../utils/setting.js");

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgUrl: setting.setting.urlImg, //图片域名
		currentTab: 0,
		myPosterList: [],
		index: 1,
		myCollectList: [],
		indexC: 1,
		nickName: wx.getStorageSync("wxauth").nickName,
		headImg: wx.getStorageSync("wxauth").avatarUrl,
		isAuth: wx.getStorageSync('wxauth').isAuth,
		showModal: false,

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: async function () {
		// let hr = await dataapi.wxApi.wxLoginCheck()
		app.getEventLog("508", "小程序我的页面", "", "", "", "");
		this.getMyPoster()
		this.getMyCollect()

		// 判断是否授权
		var wxauth = wx.getStorageSync("wxauth")
		if (wxauth) {
			// 判断用户是否登录
			var that = this;
			var hrC = await posterApi.posterapi.checkLogin({
				unionId: wxauth.data ? wxauth.data.unionid : '',
			});
			if (hrC.success) {
				// 判断是否登录
				var stor = wx.getStorageSync("wxauth")
				stor.isAuth = hrC.data.Exists;
				stor.userid = hrC.data.UserInfo ? hrC.data.UserInfo.ID : '';
				wx.setStorageSync('wxauth', stor)

				that.setData({
					nickName: wx.getStorageSync("wxauth").nickName,
					headImg: wx.getStorageSync("wxauth").avatarUrl,
					isAuth: wx.getStorageSync('wxauth').isAuth
				})
			};
		} else(
			this.setData({
				isAuth: false, //是否登录授权
			})
		);
		// 判断是否授权end
	},

	delBtn(e){
		this.setData({
			showModal: true,
			currentid: e.currentTarget.dataset.currentid
		})
	},

	// 删除我的海报
	delMyPoster: async function (e) {
		var that = this;
		wx.showLoading({
			title: '加载中...',
		})
		var hr = await posterApi.posterapi.delMyPoster({
			oper: 'del',
			ID: this.data.currentid,
		});
		if (hr.success) {
			wx.hideLoading()
			this.setData({
				myPosterList: [],
				index: 1,
			})
			that.getMyPoster()
		}else{
			wx.showToast({
			  title: hr.msg,
			  icon: "none"
			})
		}
	},

	// 取消收藏--删除我的收藏
	delMyCollect: async function (e) {
		var that = this;
		wx.showLoading({
			title: '加载中...',
		})
		var hr = await posterApi.posterapi.collectPoster({
			oper: 'del', //取消收藏
			ID: this.data.currentid, //收藏的ID
		});
		if (hr.success) {
			wx.hideLoading()
			this.setData({
				myCollectList: [],
				indexC: 1,
			})
			that.getMyCollect()
		}else{
			wx.showToast({
			  title: hr.msg,
			  icon: "none"
			})
		}
	},

	// 获取我的海报
	getMyPoster: async function () {
		var that = this;
		var wxauth = wx.getStorageSync("wxauth");
		if (wxauth && wxauth.userid) {
			if (this.data.myPosterList.length >= this.data.total) {
				return
			}
			var hr = await posterApi.posterapi.getMyPoster({
				UserID: wx.getStorageSync("wxauth").userid,
				rows: 6,
				page: that.data.index,
				sord: 'desc',
				sidx: "CreateTime"
			});
			if (hr.success) {
				if (hr.rows && hr.rows.length > 0) {
					that.setData({
						myPosterList: that.data.myPosterList.concat(hr.rows),
						index: that.data.index + 1,
						total: hr.records,
					})
				}
			}
		}
	},

	// 获取我的收藏
	getMyCollect: async function () {
		var that = this;
		var wxauth = wx.getStorageSync("wxauth");
		if (wxauth && wxauth.userid) {
			if (this.data.myCollectList.length >= this.data.totalC) {
				return
			}
			var hr = await posterApi.posterapi.getMyCollect({
				UserID: wx.getStorageSync("wxauth").userid,
				rows: 6,
				page: that.data.indexC,
				sord: 'desc',
				sidx: "CreateTime"
			});
			if (hr.success) {
				if (hr.rows && hr.rows.length > 0) {
					that.setData({
						myCollectList: that.data.myCollectList.concat(hr.rows),
						indexC: that.data.indexC + 1,
						totalC: hr.records,
					})
				}
			}
		}
	},

	// 授权头像信息
	getUserInfo: async function (e) {
		var that = this;
		if (e.detail.userInfo != undefined) {
			app.globalData.userInfo = e.detail.userInfo
			if (app.globalData.userInfo != null) {
				wx.setStorageSync("wxauth", app.globalData.userInfo);
			}

			// 获取用户信息接口
			dataapi.wxApi.wxUserInfo_New(e,function () {
				if (wx.getStorageSync("wxauth") != '') {
					that.setData({
						nickName: wx.getStorageSync("wxauth").nickName,
						headImg: wx.getStorageSync("wxauth").avatarUrl,
						isAuth: wx.getStorageSync("wxauth").isAuth
					})
				}
			})

		}
		if (e.detail.errMsg == 'getUserInfo:fail auth deny' || e.detail.errMsg == 'getPhoneNumber:user deny' || e.detail.errMsg == 'getUserInfo:fail:cancel to confirm login' || e.detail.errMsg != 'getUserInfo:ok') {
			//用户未授权
			wx.showModal({
				title: '温馨提示',
				showCancel: false,
				content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!',
				success: function (res) {
					wx.switchTab({
						url: '/pages/index/index'
					})
				}
			})
			wx.hideLoading()
		}
	},

	//tab点击切换
	clickTab: function (e) {
		var that = this;
		if (this.data.currentTab === e.target.dataset.current) {
			return false;
		} else {
			that.setData({
				currentTab: e.target.dataset.current,
			})
		}
	},

	// 模态框弹窗
	showDialogBtn: function () {
		this.setData({
			showModal: true
		})
	},
	// 弹出框蒙层截断touchmove事件
	preventTouchMove: function () {},
	// 隐藏模态对话框，点击黑色模态框时
	hideModal: function () {
		this.setData({
			showModal: false
		});
	},
	//对话框取消按钮点击事件
	onCancel: function () {
		this.hideModal();
	},
	//对话框确认按钮点击事件
	onConfirm: function () {
		this.hideModal();
		// 删除收藏-确定
		if(this.data.currentTab==0){
			this.delMyCollect()
		}else{  // 删除我的海报-确定
			this.delMyPoster()
		}
	},

	//下拉刷新 （刷新后，个数为最原始的几个）
	onPullDownRefresh: function () {
		// console.log('下拉刷新');
		if (this.data.currentTab == 0) {
			this.setData({
				myCollectList: [],
				indexC: 1
			})
			this.getMyCollect(); //接口一
		} else {
			this.setData({
				myPosterList: [],
				index: 1,
			})
			this.getMyPoster(); //接口二
		}
		wx.stopPullDownRefresh(); //停止下拉刷新 
	},
	//上拉加载
	onReachBottom: function () {
		console.log('上拉加载');
		if (this.data.currentTab == 0) {
			this.getMyCollect(); //接口一
		} else {
			this.getMyPoster(); //接口二
		}
	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		this.setData({
			myPosterList: [],
			index: 1,
			myCollectList: [],
			indexC: 1,
		})
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		this.setData({
			myPosterList: [],
			index: 1,
			myCollectList: [],
			indexC: 1,
		})
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})