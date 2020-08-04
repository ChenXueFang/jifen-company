// pages/instructions/instructions.js
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stepList:[{stepTitle:'步骤一：选择您需要的海报', stepImg:'../../images/instru1.png'}, {stepTitle:'步骤二：编辑海报内容', stepImg:'../../images/instru2.png'}, {stepTitle:'步骤三：预览并调整位置', stepImg:'../../images/instru3.png'}, {stepTitle:'步骤四：保存并下载', stepImg:'../../images/instru4.png'},]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.getEventLog("512", "海报操作说明页面", "","","","");
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