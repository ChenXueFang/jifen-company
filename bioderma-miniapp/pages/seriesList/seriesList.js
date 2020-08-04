// pages/seriesList/seriesList.js
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
		seriesList: [],
		index: 1,
		typeList: [{
			typeName: '舒研修护系列',
			subTypeName: 'SENSIBIO',
			typeImg: '../../images/series1.png'
		}, {
			typeName: '净研控油系列',
			subTypeName: 'SEBIUM',
			typeImg: '../../images/series2.png'
		}, {
			typeName: '润研水润系列',
			subTypeName: 'HYDRABIO',
			typeImg: '../../images/series3.png'
		}, {
			typeName: '赋研滋润系列',
			subTypeName: 'ATODERM',
			typeImg: '../../images/series4.png'
		}, {
			typeName: '暂研防晒系列',
			subTypeName: 'PHOTODERM',
			typeImg: '../../images/series5.png'
		}, {
			typeName: '敏感性肌肤',
			typeImg: '../../images/series1.png'
		}, {
			typeName: '缺水性肌肤',
			typeImg: '../../images/series3.png'
		}, {
			typeName: '干性肌肤',
			typeImg: '../../images/series4.png'
		}, {
			typeName: '易出油型肌肤',
			typeImg: '../../images/series2.png'
		}],

		isVip: false, //是否为会员
	},

	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		let id = options.id
		this.setData({
			id: id,
			currentTab: options.currentTab
		})
		this.getSeriesList();
	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		app.getEventLog("511", "海报列表页面", "", "", "", "");
	},

	// 根据产品类型查询海报
	getSeriesList: async function () {
		var that = this;
		var hr = await posterApi.posterapi.getSeriesList({
			classID: that.data.id,
			rows: 6,
			page: that.data.index,
			sord: 'desc',
			sidx: "CreateTime"
		});
		if (hr.success) {
			if (hr.rows && hr.rows.length > 0) {
				that.setData({
					seriesList: that.data.seriesList.concat(hr.rows),
					index: that.data.index + 1,
					total: hr.records
				})
			}
		}
	},

	//下拉刷新 （刷新后，个数为最原始的几个）
	onPullDownRefresh: function () {
		this.setData({
			seriesList: [],
			index: 1
		})
		this.getSeriesList()
		wx.stopPullDownRefresh(); //停止下拉刷新 
	},
	//上拉加载
	onReachBottom: function () {
		if (this.data.seriesList.length >= this.data.total) {
			return
		}
		this.getSeriesList(); //接口二
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
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})