// pages/editPoster/editPoster.js
import dataapi from '../../servicesAPI/dataapi'
import posterApi from '../../servicesAPI/posterapi'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
const setting = require("../../utils/setting.js");
const app = getApp();

Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		imgUrl: setting.setting.urlImg, //图片域名
		switchChecked: true,
		isCollect: false,
		files: [],
		uploadimageList: [],
		uploadDiaryPic: [],
		textDirection: 'across',
		editData: {},
		isAuth: wx.getStorageSync('wxauth').isAuth,

	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: async function (options) {
		this.setData({
			posterId: options.posterId,
			currentTab: options.currentTab,
		  })
		this.getPosterDetail();

		wx.setStorageSync("editData", ''); //编辑海报数据
		wx.setStorageSync("preViewData", ''); //预览海报页面的data

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
					isAuth: wx.getStorageSync('wxauth').isAuth
				})
			};
		} else(
			this.setData({
				isAuth: false, //是否登录授权
			})
		);

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

		app.getEventLog("513", "编辑海报页面", "", "", "", "");
	},

	// 获取海报详情
	getPosterDetail: async function () {
		var that = this;
		var hr = await posterApi.posterapi.getPosterDetail({
			UserID: wx.getStorageSync("wxauth").userid,
			id: that.data.posterId
		});
		if (hr.success) {
			if (hr.data) {
				var res = hr.data
				that.setData({
					posterDetail: res, //获取前三条数据
					officialWords: res.Note, //官方推荐语 IsCollect
					isCollect: res.IsCollect,
					collectID: res.FaviteID,
					bgImg: res.PosterImageUrl,
				})
			}
		}
	},

	// 文字方向
	radiochange: function (e) {
		this.setData({
			textDirection: e.detail.value
		});
	},

	// 预览海报按钮
	topreviewPoster() {
		wx.navigateTo({
			url: '../previewPoster2/previewPoster2?posterId=' + this.data.posterId,
		})
		this.data.editData.officialWords = this.data.officialWords; //官方推荐语
		this.data.editData.titleValue = this.data.titleValue; //海报标题
		this.data.editData.QRImg = this.data.QRImg; //上传的二维码图
		this.data.editData.bgImg = this.data.bgImg; //海报背景图bgImg
		this.data.editData.textDirection = this.data.textDirection; //文字方向
		// 编辑店铺活动状态为开时有值
		if (this.data.switchChecked) {
			this.data.editData.activeValue = this.data.activeValue; //活动语
		} else {
			this.data.editData.activeValue = ''
		}
		wx.setStorageSync("editData", this.data.editData); //编辑海报内容缓存
	},

	// 授权头像信息
	getUserInfo: async function (e) {
		var that = this;
		var btntype = e.currentTarget.dataset.btntype
		if (e.detail.userInfo != undefined) {
			app.globalData.userInfo = e.detail.userInfo
			if (app.globalData.userInfo != null) {
				wx.setStorageSync("wxauth", app.globalData.userInfo);
			}

			// 获取用户信息接口
			dataapi.wxApi.wxUserInfo_New(e,function () {
				if (wx.getStorageSync("wxauth") != '') {
					that.setData({
						isAuth: wx.getStorageSync("wxauth").isAuth
					})
					// 登录成功进行一下操作
					if (btntype == 'collectbtn') {
						that.getPosterDetail(
							function(){ that.bindCollect();} //收藏功能
						); //获取海报详情
					} else if (btntype == 'prebtn') {
						that.topreviewPoster(); //跳转到海报预览页面
					}
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

	// 上传图片
	chooseImage: function (e) {
		var that = this;
		wx.chooseImage({
			sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
			sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
			success: function (res) {
				// console.log(res)
				if (that.data.files.length + res.tempFilePaths.length > 9) {
					wx.showToast({
						title: '日记只能上传9张哦~',
						icon: 'none'
					});
					return;
				} else {
					// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
					that.setData({
						files: that.data.files.concat(res.tempFilePaths)
					});

					let uploadpics = []
					let upPic = []
					let temp = []
					for (let i = 0; i < that.data.files.length; i++) {
						// console.log(that.data.files[i])
						// 上传图片到服务器
						wx.uploadFile({
							header: {
								'Content-Type': 'application/x-www-form-urlencoded'
							},
							url: `${setting.setting.urlImg}/api/FrontApi.ashx?_op=ImageUpload`,
							filePath: that.data.files[0], //res.tempFilePaths + "",
							name: 'card',
							success: function (response) {
								let dataJson = JSON.parse(response.data)
								console.log(dataJson, '上传图片')
								if (dataJson.success) {
									that.setData({
										QRImg: dataJson.data.SaveFileNamePath //上传图片成功，接口返回服务器图片域名
									})
								} else {
									if (dataJson.msg == "error") {
										wx.showToast({
											title: '上传图片最大只支持1M',
											icon: 'none',
										})
									} else if (dataJson.msg == "Illegal Pictures") {
										wx.showToast({
											title: '非法图片',
											icon: 'none',
										})
									}
								}
							}
						})
					}
				}
			}
		})
	},
	previewImage: function (e) {
		wx.previewImage({
			current: e.currentTarget.id, // 当前显示图片的http链接
			urls: this.data.files // 需要预览的图片http链接列表
		})
	},
	deletefile: function (e) {
		let index = parseInt(e.currentTarget.id)
		this.data.files.splice(index, 1)
		this.data.uploadDiaryPic.splice(index, 1)
		this.setData({
			files: this.data.files
		});
	},

	// 点击收藏
	bindCollect: async function () {
		var that = this;
		if (that.data.isCollect == false) {
			// 收藏接口
			var hr = await posterApi.posterapi.collectPoster({
				UserID: wx.getStorageSync("wxauth").userid,
				PosterID: that.data.posterId,
				oper: 'add',
			});
			if (hr.success) {
				that.setData({
					isCollect: true,
					collectID: hr.data.ID
				})
			} else {
				wx.showToast({
					title: hr.msg,
					icon: 'none'
				})
			}
		} else {
			// 取消收藏接口
			var hr = await posterApi.posterapi.collectPoster({
				oper: 'del', //取消收藏
				ID: this.data.collectID, //收藏的ID
			});
			if (hr.success) {
				that.setData({
					isCollect: false
				})
			} else {
				wx.showToast({
					title: hr.msg,
					icon: 'none'
				})
			}
		}
	},

	// 获取开关值
	switchChange: function (e) {
		var that = this;
		that.setData({
			switchChecked: e.detail.value
		})
	},

	// 获取输入框的值
	getTitleValue: function (e) {
		var titleValue = e.detail.value; //输入的内容
		var value = e.detail.value.length; //输入内容的长度
		var lastInp = 20 - value; //剩余字数
		var that = this;
		that.setData({
			titleValue: titleValue,
			lastInp: lastInp
		})
	},
	getActiveValue: function (e) {
		var activeValue = e.detail.value; //输入的内容
		var value = e.detail.value.length; //输入内容的长度
		var lastArea = 100 - value; //剩余字数
		var that = this;
		that.setData({
			activeValue: activeValue,
			lastArea: lastArea
		})
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

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		app.globalData.currentTab = this.data.currentTab
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {

	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom: function () {

	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})