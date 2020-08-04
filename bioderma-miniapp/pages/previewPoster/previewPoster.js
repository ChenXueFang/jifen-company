// pages/previewPoster/previewPoster.js
import posterApi from '../../servicesAPI/posterapi';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
const app = getApp();
const setting = require("../../utils/setting.js");

var canOnePointMove = false
var onePoint = {
    x: 0,
    y: 0
}
var twoPoint = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
}
var canOnePointMove_sub = false
var onePoint_sub = {
    x: 0,
    y: 0
}
var twoPoint_sub = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
}
var canOnePointMove_QR = false
var onePoint_QR = {
    x: 0,
    y: 0
}
var twoPoint_QR = {
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0
}

Page({

    /**
     * 页面的初始数据wx.getStorageSync("preViewData")!=''?wx.getStorageSync("preViewData"):
     */
    data: {
        imgUrl: setting.setting.urlImg, //图片域名
        showModal: false,
        showModal_success: false,
        showModal_guide: true,
        width: '',
        height: '',
        left: 43,
        top: 85,
        scale: 1,
        rotate: 0,
        width_sub: '',
        height_sub: '',
        left_sub: 0,
        top_sub: 80,
        scale_sub: 1,
        rotate_sub: 0,
        width_QR: '',
        height_QR: '',
        left_QR: 0,
        top_QR: 0,
        scale_QR: 1,
        rotate_QR: 0,
        isAcross: true, //文字方向为横向
        aim: 1, //目标块出现编辑框
        titleValue: '舒研多效洁肤液舒研',
        subValue: '清除彩妆和残留，舒缓纯净肌肤，高度安全，高度耐受',
        QRValue: true,
        arrFontSize: [],
        canvasHeight: 0,
        backgroundHeight: ''
    },


    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            posterId: options.posterId,
        })
        var that = this;

        wx.showLoading({
            title: '加载中...',
        })
        var editData = wx.getStorageSync("editData"); //编辑值
        var preData = wx.getStorageSync("preViewData"); //上一次编辑的数据

        // 文字方向
        if (editData.textDirection == 'stand') {
            this.setData({
                isAcross: false,
            })
        }
        // 保存上一次的编辑记录
        if (preData != '') {
            for (var i in this.data) {
                for (var k in preData) {
                    if (i == k) {
                        this.setData({
                            i: preData[k]
                        })
                        // console.log(i,preData[k],'k---------------')
                    }
                }
            }
            this.setData({
                showModal_guide: false,
                width: preData.width,
                height: preData.height,
                left: preData.left,
                top: preData.top,
                scale: preData.scale,
                rotate: preData.rotate,
                width_sub: preData.width_sub,
                height_sub: preData.height_sub,
                left_sub: preData.left_sub,
                top_sub: preData.top_sub,
                scale_sub: preData.scale_sub,
                rotate_sub: preData.rotate_sub,
                width_QR: preData.width_QR,
                height_QR: preData.height_QR,
                left_QR: preData.left_QR,
                top_QR: preData.top_QR,
                scale_QR: preData.scale_QR,
                rotate_QR: preData.rotate_QR,
                aim: preData.aim,
                titleValue: preData.titleValue,
                subValue: preData.subValue,
                QRValue: preData.QRValue,
            })
        }

        // 判断引导框的显示
        var stor = wx.getStorageSync("wxauth")
        if (stor) {
            if (stor.isShowGuide) {
                this.setData({
                    showModal_guide: false
                })
            } else {
                stor.isShowGuide = true;
                wx.setStorageSync('wxauth', stor)
            }
        };


    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        app.getEventLog("509", "海报预约页面", "", "", "", "");
    },

    // 删除
    bindDel(event, ownerInstance) {
        this.setData({
            titleValue: ''
        })
    },
    bindDel2(event, ownerInstance) {
        this.setData({
            subValue: ''
        })
    },
    bindDel3(event, ownerInstance) {
        this.setData({
            QRValue: false
        })
    },

    // 保存
    bindSave: async function () {
        let that = this
        var height
        // 图片高度
        wx.createSelectorQuery().selectAll(`.postImg`).boundingClientRect(function (rect) {
            console.log(rect, '++++++++++++高度')
            console.log(rect[0].height, '高度')
            height = rect[0].height
        }).exec(function () {
            that.setData({
                canvasHeight: that.data.canvasHeight + height + 30,
                backgroundHeight: height

            })
        });
        // 文字高度
        wx.createSelectorQuery().selectAll(`.activeCon`).boundingClientRect(function (rect) {
            console.log(rect, '------------高度')
            console.log(rect[0].height, '高度')
            height = rect[0].height
        }).exec(function () {
            that.setData({
                canvasHeight: that.data.canvasHeight + height
            })
        })

        //     // 生成canvas
        that.getTxtFont1()
            .then(this.generateCanvas)
            .then(this.saveCanvas)

        // var imagePath = 'https://ss0.bdstatic.com/94oJfD_bAAcT8t7mm9GUKT-xh_/timg?image&quality=100&size=b4000_4000&sec=1593745506&di=b47f68e0f7db96ffbded1b58976b29ef&src=http://a3.att.hudong.com/14/75/01300000164186121366756803686.jpg';
        // wx.downloadFile({
        //     url: imagePath, //仅为示例，并非真实的资源
        //     success: function (res) {
        //         // 只要服务器有响应数据，就会把响应内容写入文件并进入 success 回调，业务需要自行判断是否下载到了想要的内容
        //         // let dataJson = JSON.parse(res.data)
        //         console.log(res,'downloadFile');
        //         if (res.statusCode === 200) {
        //             var filePath = res.tempFilePath
        //             // 保存到本地
        //             wx.saveImageToPhotosAlbum({
        //                 filePath: res.tempFilePath,
        //                 success: function (data) {
        //                     console.log(data,'saveImageToPhotosAlbum')
        //                     // 上传海报图片到服务器
        //                     wx.uploadFile({
        //                         header: {
        //                             'Content-Type': 'application/x-www-form-urlencoded'
        //                         },
        //                         url: `${setting.setting.urlImg}/api/FrontApi.ashx?_op=ImageUpload&small=true`,
        //                         filePath: filePath,//图片地址res.tempFilePath
        //                         name: 'card',
        //                         success: async function (response) {
        //                             let dataJson = JSON.parse(response.data)
        //                             console.log(dataJson, '上传图片')
        //                             if (dataJson.success) {
        //                                 that.setData({
        //                                     PosterImagesURL: dataJson.data.SaveFileNamePath, //上传图片成功，接口返回服务器图片域名
        //                                     SmallImageUrl: dataJson.data.SmallFilePath,
        //                                 })
        //                                 // 保存我的海报接口 titleValue  activeValue  QRImg
        //                                 var hr = await posterApi.posterapi.savePoster({
        //                                     UserID: wx.getStorageSync("wxauth").userid,
        //                                     PosterImagesURL: dataJson.data.SaveFileNamePath,
        //                                     SmallImageUrl: dataJson.data.SmallFilePath,
        //                                     Title: wx.getStorageSync("editData").titleValue,
        //                                     Comment: wx.getStorageSync("editData").activeValue,
        //                                     BarcodeUrl: wx.getStorageSync("editData").QRImg,
        //                                     PosterID: that.data.posterId,
        //                                     openid: wx.getStorageSync("wxauth").data.openid,
        //                                     oper: 'add',
        //                                 });
        //                                 if (hr.success) {
        //                                     that.setData({
        //                                         showModal_success: true
        //                                     })
        //                                 } else {
        //                                     wx.showToast({
        //                                         title: hr.msg,
        //                                         icon: 'none'
        //                                     })
        //                                 }
        //                             }
        //                         }
        //                     })
        //                 },
        //                 fail: function (err) {
        //                     console.log(err);
        //                     if (err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
        //                         console.log("用户一开始拒绝了，我们想再次发起授权")
        //                         alert('打开设置窗口')
        //                         wx.openSetting({
        //                             success(settingdata) {
        //                                 console.log(settingdata)
        //                                 if (settingdata.authSetting['scope.writePhotosAlbum']) {
        //                                     console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
        //                                 } else {
        //                                     console.log('获取权限失败，给出不给权限就无法正常使用的提示')
        //                                 }
        //                             }
        //                         })
        //                     }
        //                 }
        //             })
        //         }
        //     }
        // })
    },

    getTxtFont1: function () {
        let that = this
        return new Promise(function (resolve, reject) {
            wx.createSelectorQuery().selectAll(`.txt`).boundingClientRect(function (rect) {
                console.log(rect)
                let temp = 'arrFontSize[0]'
                let temp1 = 'arrFontSize[1]'
                let temp2 = 'arrFontSize[2]'
                that.setData({
                    [temp]: rect[0].dataset.scale * 24,
                    [temp1]: rect[1].dataset.scale * 13,
                    [temp2]: rect[2].dataset.scale * 9
                })
            }).exec(function () {
                resolve('1')
            })
            // 画布高度
            // wx.createSelectorQuery().selectAll(`.activeCon`).boundingClientRect(function (rect) {
            //     console.log(rect, '++++++++++++高度')
            //     console.log(rect[0].height, '高度')
            //     that.setData({

            //     })
            // }).exec()
        })
    },
    // 生成 canvas
    generateCanvas: function () {
        console.log(this.data.arrFontSize)
        let that = this
        return new Promise(function (resolve, reject) {
            console.log(that.data.arrFontSize[0], that.data.arrFontSize)
            const ctx = wx.createCanvasContext('myCanvas')
            // ctx.mozImageSmoothingEnabled = false;
            // ctx.webkitImageSmoothingEnabled = false;
            // ctx.msImageSmoothingEnabled = false;
            // ctx.imageSmoothingEnabled = false;
            //画背景图片标题
            ctx.drawImage('../../images/pro2.png', 0, 0, 350, that.data.backgroundHeight, 0, 0)
            //画canvas边框
            ctx.setStrokeStyle('#999')
            ctx.strokeRect(0, 0, 350, that.data.canvasHeight)


            //画主标题
            ctx.setFontSize(that.data.arrFontSize[0])
            ctx.setFillStyle('#63748f')
            ctx.fillText(that.data.titleValue, 0, 30);
            //画副标题
            ctx.setFontSize(that.data.arrFontSize[1])
            ctx.rotate(45 * Math.PI / 180)
            ctx.fillText(that.data.subValue, 100, 30);
            //画二维码
            ctx.rotate(-45 * Math.PI / 180)
            ctx.beginPath()
            ctx.setLineJoin('round')
            ctx.setFillStyle('white')
            ctx.setStrokeStyle('white')
            ctx.setLineWidth(10)
            // 上线
            ctx.moveTo(15, 10)
            ctx.lineTo(69, 10)
            ctx.lineTo(15, 10)
            ctx.lineTo(69, 10)
            ctx.stroke()
            // 中间
            ctx.fillRect(10, 10, 64, 82)
            ctx.draw()
            // 下线
            ctx.moveTo(15, 92)
            ctx.lineTo(69, 92)
            ctx.lineTo(15, 92)
            ctx.lineTo(69, 92)
            ctx.stroke()
            ctx.rotate(that.data.rotate_QR * Math.PI / 180)
            ctx.drawImage('../../images/QR.png', 50, 50, 55 * that.data.scale_QR, 55 * that.data.scale_QR, 0, 0)
            //画主标题
            ctx.setFontSize(that.data.arrFontSize[0])
            ctx.setFillStyle('#63748f')
            ctx.fillText('huodong', 170, 170);

            //二维码文字
            ctx.setFontSize(that.data.arrFontSize[2])
            ctx.setFillStyle('#333333')
            ctx.fillText(' 长按识别二维', 30, 230);
            ctx.fillText(' 码了解详情', 30, 250);

            ctx.draw(true)
            resolve('1')
        });
    },


    // 保存 canvas
    saveCanvas() {
        console.log('saveCanvas')
        let that = this
        wx.canvasToTempFilePath({
            x: 0,
            y: 0,
            width: 350,
            height: 568,
            canvasId: 'myCanvas',
            success: function (res) {
                console.log(res, 'ssss')
                let img = res.tempFilePath
                wx.saveImageToPhotosAlbum({
                    filePath: img,
                    success(json) {
                        wx.showToast({
                            title: '成功保存',
                            icon: 'none',
                            duration: 2000
                        });
                        console.log(json, 'kk')
                    },
                    fail() {
                        wx.showToast({
                            title: '保存失败',
                            icon: 'none',
                            duration: 2000
                        });
                    }
                })
                console.log(res.tempFilePath)
            }
        })
    },


    // 退出
    bindExit: function () {
        this.setData({
            showModal: true,
        })
    },

    // 弹出框蒙层截断touchmove事件
    preventTouchMove: function () {},
    // 隐藏模态对话框，点击黑色模态框时
    hideModal: function () {
        this.setData({
            showModal: false,
            showModal_success: false,
            showModal_guide: false,
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
    onConfirm_back: function () {
        this.hideModal();
        wx.navigateBack({
            delta: 1
        })
    },
    toIndex() {
        this.hideModal();
        wx.switchTab({
            url: '../index/index',
        })
    },

    // 拖动
    // 关闭上拉加载
    onReachBottom: function () {
        return
    },
    bindload: function (e) {
        var that = this
        var width = e.detail.width
        var height = e.detail.height
        if (width > 750) {
            height = 750 * height / width
            width = 750
        }
        if (height > 1200) {
            width = 1200 * width / height
            height = 1200
        }
        that.setData({
            width: width,
            height: height
        })
    },
    touchstart: function (e) {
        this.setData({
            aim: 1,
            showModal_guide: false
        })
        var that = this
        if (e.touches.length < 2) {
            canOnePointMove = true
            onePoint.x = e.touches[0].pageX * 2
            onePoint.y = e.touches[0].pageY * 2
        } else {
            twoPoint.x1 = e.touches[0].pageX * 2
            twoPoint.y1 = e.touches[0].pageY * 2
            twoPoint.x2 = e.touches[1].pageX * 2
            twoPoint.y2 = e.touches[1].pageY * 2
        }
    },
    touchmove: function (e) {
        var that = this
        if (e.touches.length < 2 && canOnePointMove) {
            var onePointDiffX = e.touches[0].pageX * 2 - onePoint.x
            var onePointDiffY = e.touches[0].pageY * 2 - onePoint.y
            that.setData({
                msg: '单点移动',
                left: that.data.left + onePointDiffX,
                top: that.data.top + onePointDiffY
            })
            onePoint.x = e.touches[0].pageX * 2
            onePoint.y = e.touches[0].pageY * 2
        } else if (e.touches.length > 1) {
            var preTwoPoint = JSON.parse(JSON.stringify(twoPoint))
            twoPoint.x1 = e.touches[0].pageX * 2
            twoPoint.y1 = e.touches[0].pageY * 2
            twoPoint.x2 = e.touches[1].pageX * 2
            twoPoint.y2 = e.touches[1].pageY * 2
            // 计算角度，旋转(优先)
            var perAngle = Math.atan((preTwoPoint.y1 - preTwoPoint.y2) / (preTwoPoint.x1 - preTwoPoint.x2)) * 180 / Math.PI
            var curAngle = Math.atan((twoPoint.y1 - twoPoint.y2) / (twoPoint.x1 - twoPoint.x2)) * 180 / Math.PI
            if (Math.abs(perAngle - curAngle) > 1) {
                that.setData({
                    msg: '旋转',
                    rotate: that.data.rotate + (curAngle - perAngle)
                })
            } else {
                // 计算距离，缩放
                var preDistance = Math.sqrt(Math.pow((preTwoPoint.x1 - preTwoPoint.x2), 2) + Math.pow((preTwoPoint.y1 - preTwoPoint.y2), 2))
                var curDistance = Math.sqrt(Math.pow((twoPoint.x1 - twoPoint.x2), 2) + Math.pow((twoPoint.y1 - twoPoint.y2), 2))
                that.setData({
                    msg: '缩放',
                    scale: that.data.scale + (curDistance - preDistance) * 0.005
                })
            }
        }
    },
    touchend: function (e) {
        var that = this
        canOnePointMove = false
    },
    // 拖动_sub
    // 关闭上拉加载
    bindload_sub: function (e) {
        var that = this
        var width = e.detail.width
        var height = e.detail.height
        if (width > 750) {
            height = 750 * height / width
            width = 750
        }
        if (height > 1200) {
            width = 1200 * width / height
            height = 1200
        }
        that.setData({
            width_sub: width,
            height_sub: height
        })
    },
    touchstart_sub: function (e) {
        this.setData({
            aim: 2,
            showModal_guide: false
        })
        var that = this
        if (e.touches.length < 2) {
            canOnePointMove_sub = true
            onePoint_sub.x = e.touches[0].pageX * 2
            onePoint_sub.y = e.touches[0].pageY * 2
        } else {
            twoPoint_sub.x1 = e.touches[0].pageX * 2
            twoPoint_sub.y1 = e.touches[0].pageY * 2
            twoPoint_sub.x2 = e.touches[1].pageX * 2
            twoPoint_sub.y2 = e.touches[1].pageY * 2
        }
    },
    touchmove_sub: function (e) {
        var that = this
        if (e.touches.length < 2 && canOnePointMove_sub) {
            var onePointDiffX = e.touches[0].pageX * 2 - onePoint_sub.x
            var onePointDiffY = e.touches[0].pageY * 2 - onePoint_sub.y
            that.setData({
                msg: '单点移动',
                left_sub: that.data.left_sub + onePointDiffX,
                top_sub: that.data.top_sub + onePointDiffY
            })
            onePoint_sub.x = e.touches[0].pageX * 2
            onePoint_sub.y = e.touches[0].pageY * 2
        } else if (e.touches.length > 1) {
            var preTwoPoint = JSON.parse(JSON.stringify(twoPoint_sub))
            twoPoint_sub.x1 = e.touches[0].pageX * 2
            twoPoint_sub.y1 = e.touches[0].pageY * 2
            twoPoint_sub.x2 = e.touches[1].pageX * 2
            twoPoint_sub.y2 = e.touches[1].pageY * 2
            // 计算角度，旋转(优先)
            var perAngle = Math.atan((preTwoPoint.y1 - preTwoPoint.y2) / (preTwoPoint.x1 - preTwoPoint.x2)) * 180 / Math.PI
            var curAngle = Math.atan((twoPoint_sub.y1 - twoPoint_sub.y2) / (twoPoint_sub.x1 - twoPoint_sub.x2)) * 180 / Math.PI
            if (Math.abs(perAngle - curAngle) > 1) {
                that.setData({
                    msg: '旋转',
                    rotate_sub: that.data.rotate_sub + (curAngle - perAngle)
                })
            } else {
                // 计算距离，缩放
                var preDistance = Math.sqrt(Math.pow((preTwoPoint.x1 - preTwoPoint.x2), 2) + Math.pow((preTwoPoint.y1 - preTwoPoint.y2), 2))
                var curDistance = Math.sqrt(Math.pow((twoPoint_sub.x1 - twoPoint_sub.x2), 2) + Math.pow((twoPoint_sub.y1 - twoPoint_sub.y2), 2))
                that.setData({
                    msg: '缩放',
                    scale_sub: that.data.scale_sub + (curDistance - preDistance) * 0.005
                })
            }
        }
    },
    touchend_sub: function (e) {
        var that = this
        canOnePointMove_sub = false
    },
    // 拖动_QR
    // 关闭上拉加载
    bindload_QR: function (e) {
        var that = this
        var width = e.detail.width
        var height = e.detail.height
        if (width > 750) {
            height = 750 * height / width
            width = 750
        }
        if (height > 1200) {
            width = 1200 * width / height
            height = 1200
        }
        that.setData({
            width_QR: width,
            height_QR: height
        })
    },
    touchstart_QR: function (e) {
        this.setData({
            aim: 3,
            showModal_guide: false
        })
        var that = this
        if (e.touches.length < 2) {
            canOnePointMove_QR = true
            onePoint_QR.x = e.touches[0].pageX * 2
            onePoint_QR.y = e.touches[0].pageY * 2
        } else {
            twoPoint_QR.x1 = e.touches[0].pageX * 2
            twoPoint_QR.y1 = e.touches[0].pageY * 2
            twoPoint_QR.x2 = e.touches[1].pageX * 2
            twoPoint_QR.y2 = e.touches[1].pageY * 2
        }
    },
    touchmove_QR: function (e) {
        var that = this
        if (e.touches.length < 2 && canOnePointMove_QR) {
            var onePointDiffX = e.touches[0].pageX * 2 - onePoint_QR.x
            var onePointDiffY = e.touches[0].pageY * 2 - onePoint_QR.y
            that.setData({
                msg: '单点移动',
                left_QR: that.data.left_QR + onePointDiffX,
                top_QR: that.data.top_QR + onePointDiffY
            })
            onePoint_QR.x = e.touches[0].pageX * 2
            onePoint_QR.y = e.touches[0].pageY * 2
        } else if (e.touches.length > 1) {
            var preTwoPoint = JSON.parse(JSON.stringify(twoPoint_QR))
            twoPoint_QR.x1 = e.touches[0].pageX * 2
            twoPoint_QR.y1 = e.touches[0].pageY * 2
            twoPoint_QR.x2 = e.touches[1].pageX * 2
            twoPoint_QR.y2 = e.touches[1].pageY * 2
            // 计算角度，旋转(优先)
            var perAngle = Math.atan((preTwoPoint.y1 - preTwoPoint.y2) / (preTwoPoint.x1 - preTwoPoint.x2)) * 180 / Math.PI
            var curAngle = Math.atan((twoPoint_QR.y1 - twoPoint_QR.y2) / (twoPoint_QR.x1 - twoPoint_QR.x2)) * 180 / Math.PI
            if (Math.abs(perAngle - curAngle) > 1) {
                that.setData({
                    msg: '旋转',
                    rotate_QR: that.data.rotate_QR + (curAngle - perAngle)
                })
            } else {
                // 计算距离，缩放
                var preDistance = Math.sqrt(Math.pow((preTwoPoint.x1 - preTwoPoint.x2), 2) + Math.pow((preTwoPoint.y1 - preTwoPoint.y2), 2))
                var curDistance = Math.sqrt(Math.pow((twoPoint_QR.x1 - twoPoint_QR.x2), 2) + Math.pow((twoPoint_QR.y1 - twoPoint_QR.y2), 2))
                that.setData({
                    msg: '缩放',
                    scale_QR: that.data.scale_QR + (curDistance - preDistance) * 0.005
                })
            }
        }
    },
    touchend_QR: function (e) {
        var that = this
        canOnePointMove_QR = false
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
        wx.setStorageSync("preViewData", this.data)
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {
        wx.setStorageSync("preViewData", this.data)
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