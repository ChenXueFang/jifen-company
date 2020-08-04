// pages/login/login.js
import posterApi from '../../servicesAPI/posterapi'
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showModal: false, //不是会员弹框
        mobile: '', //手机号
        vcode: '', //验证码
        shopCode: '', //门店代码
        isget: false, //获取验证码
        codetype: "重发验证码 60s",
        isMobile: false, //判断是否为正确的手机号

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

        app.getEventLog("507", "小程序登录页面", "", "", "", "");
    },

    getInputTel(e) {
        this.setData({
            mobile: e.detail.value
        })
    },

    getInputCode(e) {
        this.setData({
            vcode: e.detail.value
        })
    },

    getInputShop(e) {
        this.setData({
            shopCode: e.detail.value
        })
    },

    //获取验证码 
    getCode: async function () {
        var that = this;
        this.checkMobile();
        if (this.data.isMobile) {
            var hr = await posterApi.posterapi.getCode({
                mobile: that.data.mobile, //手机号
            });
            if (hr.success) {
                wx.showToast({
                    title: '验证码发送成功',
                    icon: 'success',
                    duration: 2000
                })
                this.settime(60); //倒计时
            } else {
                wx.showToast({
                    title: hr.msg,
                    icon: 'none'
                })
            }
        } else {
            wx.showToast({
                title: '请输入正确的手机号',
                icon: 'none',
                duration: 2000,
            })
        }
    },
    //重获验证码倒计时
    settime: function (times) {
        if (times == 0) {
            this.setData({
                isget: false
            })
            return
        } else {
            times--
            this.setData({
                isget: true,
                codetype: "重发验证码  " + times + "s"
            })
        }
        setTimeout(() => {
            this.settime(times)
        }, 1000)
    },
    // 验证手机号
    checkMobile() {
        var myreg = /^0?(13|17|15|18|14)[0-9]{9}$/;
        if (myreg.test(this.data.mobile)) {
            this.setData({
                isMobile: true
            })
        } else (
            this.setData({
                isMobile: false
            })
        )
    },

    // 登录按钮
    login: async function () {
        const that = this;
        this.checkMobile();
        if (that.data.mobile == "" || that.data.vcode == "" || that.data.shopCode == "") {
            wx.showToast({
                title: '手机号码或验证码不能为空',
                icon: 'none'
            })
            return;
        } else if (that.data.isMobile == false) {
            wx.showToast({
                title: '请输入有效的手机号码！',
                icon: 'none'
            })
            return;
        }

        // 验证用户是否是该门店人员
        // var hr = await posterApi.posterapi.checkShopUser({
        //     moblie: that.data.mobile, //手机号
        // });
        // if (hr.success) {
        //     // 调登录接口 loginSaveUser
        var hrLongin = await posterApi.posterapi.loginSaveUser({
            Mobile: that.data.mobile, //手机号
            Code: that.data.vcode, //验证码
            shopCode: that.data.shopCode, //门店代码
            UnionID: wx.getStorageSync("wxauth").data.unionid,
            OpenID: wx.getStorageSync("wxauth").data.openid,
            ID: '',
            oper: "add",
        });
        if (hrLongin.success) {
            if (hrLongin.data.IsMember == false) {
                that.setData({
                    showModal: true //显示不是门店会员弹框
                })
            } else {
                var stor = wx.getStorageSync("wxauth")
                stor.userid = hrLongin.data.UserInfo.ID;
                wx.setStorageSync('wxauth', stor)
                wx.switchTab({
                    url: '../index/index',
                })
            }
        } else {
            wx.showToast({
                title: hrLongin.msg,
                icon: 'none'
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
    preventTouchMove: function () { },
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