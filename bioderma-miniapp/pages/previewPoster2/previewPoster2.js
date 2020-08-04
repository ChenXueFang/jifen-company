// pages/previewPoster/previewPoster.js
import posterApi from '../../servicesAPI/posterapi';
import regeneratorRuntime from '../../libs/regenerator-runtime/runtime-module';
const app = getApp();
const setting = require("../../utils/setting.js");

// 新的方法内容
//********************start */
let index = 0,
	items = [],
	flag = true,
	itemId = 1;
const hCw = 1.497; // 图片宽高比
const canvasPre = 1; // 展示的canvas占mask的百分比
const maskCanvas = wx.createCanvasContext('maskCanvas');
//********************end */

Page({

	/**
	 * 页面的初始数据wx.getStorageSync("preViewData")!=''?wx.getStorageSync("preViewData"):
	 */
	data: {
		imgUrl: setting.setting.urlImg, //图片域名
		showModal: false,
		showModal_success: false,
		showModal_guide: true,
		isAcross: true, //文字方向为横向

		hp: wx.getSystemInfoSync().windowWidth / 750, //rpx转px = rpx * this.data.hp
		titleFontSize: 48,
		titleLineHeight: 65,

		// 新的方法
		itemList: [],
	},


	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {
		var that = this;
		var editData = wx.getStorageSync("editData"); //编辑值
		var preData = wx.getStorageSync("preViewData"); //上一次编辑的数据
		this.setData({
			posterId: options.posterId,
			activeWords: editData.activeValue ? editData.activeValue : '',
			rawImg: editData.bgImg ? this.data.imgUrl + editData.bgImg : '', // '../../images/pro2.png',  // 海报图
		})

		// 文字方向
		if (editData.textDirection == 'stand') {
			this.setData({
				isAcross: false,
			})
		}
		// 保存上一次的编辑记录
		if (preData != '') {
			this.setData({
				showModal_guide: false,

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

		wx.showLoading({
			title: '加载中...',
			icon: 'none'
		})
		// 新添加的方法
		//***************************start */
		items = this.data.itemList;
		this.drawTime = 0
		wx.getSystemInfo({
			success: sysData => {
				this.sysData = sysData
				this.setData({
					canvasWidth: this.sysData.windowWidth * canvasPre, // 如果觉得不清晰的话，可以把所有组件、宽高放大一倍
					canvasHeight: this.sysData.windowWidth * canvasPre * hCw,
				})
			}
		})

		// if(that.data.itemList.length<1){
		// 	setTimeout(() => {
		// 		wx.showLoading({
		// 			title: '加载中...',
		// 			icon: 'none'
		// 		})
		// 	}, 800);
		// }
		// setTimeout(() => {
		// 	wx.hideLoading()
		// }, 3000);

		// 获取原图信息, 海报背景图信息
		wx.getImageInfo({
			src: this.data.rawImg,
			fail: err => {
				wx.showToast({
					title: '加载失败，请刷新',
					icon: 'none'
				})
			},
			success: res => {
				wx.hideLoading()
				var marginV = 48 * this.data.hp;
				this.setData({
					drawRawImg: res.path, //（canvas绘制线上图片要先下载到本地）
					w1: res.width,
					h1: res.height,
					w2: wx.getSystemInfoSync().windowWidth - marginV, //获取裁剪后的海报图的宽
				}, function () {
					this.setData({
						h2: this.data.w2 * this.data.h1 / this.data.w1, //裁剪后的宽高比
					})
					// 保留历史记录
					// if (preData && preData.length>0) {
					// 	preData.forEach((i, index) => {
					// 		// 标题 title && editData.titleValue
					// 		if (i.title) {
					// 			i.title = editData.titleValue
					// 			if (!editData.titleValue) {
					// 				preData.splice(i, 1)
					// 			}
					// 		} else {
					// 			if(editData.titleValue){
					// 				this.setDropItem({
					// 					title: editData.titleValue
					// 				});
					// 			}
					// 		}
					// 		// 副标题 subValue && editData.officialWords
					// 		if (i.subValue) {
					// 			i.subValue = editData.officialWords
					// 			if (!editData.officialWords) {
					// 				preData.splice(i, 1)
					// 			}
					// 		} else {
					// 			if(editData.officialWords){
					// 				this.setDropItem({
					// 					subValue: editData.officialWords
					// 				});
					// 			}
					// 		}
					// 		// 二维码 url && editData.QRImg
					// 		if (i.url) {
					// 			i.url = editData.QRImg
					// 			if (!editData.QRImg) {
					// 				preData.splice(i, 1)
					// 			}
					// 		} else {
					// 			if(editData.QRImg){
					// 				this.setDropItem({
					// 					url: editData.QRImg
					// 				});
					// 			}
					// 		}
					// 		// 活动语 activeWords && editData.activeValue
					// 		if (i.activeWords) {
					// 			i.activeWords = editData.activeValue
					// 			if (!editData.activeValue) {
					// 				preData.splice(i, 1)
					// 			}
					// 		} else {
					// 			if(editData.activeValue){
					// 				this.setDropItem({
					// 					activeWords: editData.activeValue
					// 				});
					// 			}
					// 		}
					// 	})
					// 	items = preData; //要赋值给items,拖拽根据items来的  .concat(this.data.itemList)
					// 	this.setData({
					// 		itemList: items
					// 	})
					// } else
					{ // 新赋值
						this.setDropItem({
							title: editData.titleValue ? editData.titleValue : ''
						});
						this.setDropItem({
							subValue: editData.officialWords ? editData.officialWords : ''
						});
						this.setDropItem({
							url: editData.QRImg ? this.data.imgUrl + editData.QRImg : '',
						});
						this.setDropItem({
							activeWords: editData.activeValue ? editData.activeValue : ''
						});
					}
				})
			}
		})
		//**************************end */

	},

	// 新添加的方法
	//***************************** start*/
	setDropItem(imgData) {
		var that = this
		let data = {}
		if (imgData.url) {
			wx.getImageInfo({
				src: imgData.url,
				success: res => {
					// 初始化数据
					data.angle = 0; //旋转角度，不定义的话，真机不旋转就不会出现
					data.width = 75; //宽度
					data.height = 75; //高度
					data.image = res.path; //图片地址（canvas绘制线上图片要先下载到本地）
					data.id = ++itemId; //id
					data.top = this.data.h2 - 95; //top定位
					data.left = this.data.w2 - 95; //left定位
					//圆心坐标
					data.x = data.left + data.width / 2;
					data.y = data.top + data.height / 2;
					data.scale = 1; //scale缩放
					data.oScale = 1; //方向缩放
					data.rotate = 1; //旋转角度
					data.active = false; //选中状态
					items[items.length] = data;
					this.setData({
						itemList: items
					})
				}
			})
		} else if (imgData.title) { //当时文字的时候执行这里，也就是有imgData.text的时候
			// 初始化数据
			data.angle = 0
			data.width = 183 //宽度
			data.height = 33; //高度
			data.title = imgData.title; //地址
			data.id = ++itemId; //id
			data.top = 30; //top定位
			data.left = 21; //left定位
			//圆心坐标
			data.x = data.left + data.width / 2;
			data.y = data.top + data.height / 2;
			data.scale = 1; //scale缩放
			data.oScale = 1; //方向缩放
			data.rotate = 1; //旋转角度
			data.active = true; //选中状态
			items[items.length] = data;
			let index = items.length - 1;
			this.setData({
				itemList: items
			})
			// setTimeout(() => {
			// 	wx.createSelectorQuery().selectAll(`#t1`).boundingClientRect(function (rect) {
			// 		that.setData({
			// 			textWidth1: rect[0].width,
			// 			textHeight1: rect[0].height,
			// 		}, function () {
			// 			let g = items[index];
			// 			g.x = data.left + rect[0].width / 2 //+24 *this.data.hp ;
			// 			g.y = data.top + rect[0].height / 2  //+29*this.data.hp;
			// 			items[index] = g;
			// 			this.setData({
			// 				itemList: items
			// 			})
			// 		})
			// 	}).exec(function () { });
			// }, 100)
		} else if (imgData.subValue) { //当时文字的时候执行这里，也就是有imgData.text的时候
			// 初始化数据
			data.angle = 0
			data.width = 169; //宽度169 this.data.subTitleWidth
			data.height = 43; //高度43 this.data.subTitleHeight
			data.subValue = imgData.subValue; //地址
			data.id = ++itemId; //id
			data.top = 90; //top定位
			data.left = 21; //left定位
			//圆心坐标
			data.x = data.left + data.width / 2;
			data.y = data.top + data.height / 2;
			data.scale = 1; //scale缩放
			data.oScale = 1; //方向缩放
			data.rotate = 1; //旋转角度
			data.active = false; //选中状态
			items[items.length] = data;
			this.setData({
				itemList: items
			})
		} else if (imgData.activeWords) { //当时文字的时候执行这里，也就是有imgData.text的时候
			// 初始化数据
			data.angle = 0
			data.width = 190; //宽度169 this.data.subTitleWidth
			data.height = 43; //高度43 this.data.subTitleHeight
			data.activeWords = imgData.activeWords; //地址
			data.id = ++itemId; //id
			data.top = this.data.h2; //top定位
			data.left = 14; //left定位
			//圆心坐标
			data.x = data.left + data.width / 2;
			data.y = data.top + data.height / 2;
			data.scale = 1; //scale缩放
			data.oScale = 1; //方向缩放
			data.rotate = 1; //旋转角度
			data.active = false //选中状态
			items[items.length] = data;
			this.setData({
				itemList: items
			})
		}

	},
	WraptouchStart: function (e) {
		for (let i = 0; i < items.length; i++) {
			items[i].active = false;
			if (e.currentTarget.dataset.id == items[i].id) {
				index = i;
				items[index].active = true;
			}
		}
		this.setData({
			itemList: items
		})
		items[index].lx = e.touches[0].clientX;
		items[index].ly = e.touches[0].clientY;
		//console.log(items[index])
	},
	WraptouchMove(e) {
		if (flag) {
			flag = false;
			setTimeout(() => {
				flag = true;
			}, 100)
		}
		// console.log('WraptouchMove', e)
		items[index]._lx = e.touches[0].clientX;
		items[index]._ly = e.touches[0].clientY;

		items[index].left += items[index]._lx - items[index].lx;
		items[index].top += items[index]._ly - items[index].ly;
		items[index].x += items[index]._lx - items[index].lx;
		items[index].y += items[index]._ly - items[index].ly;

		items[index].lx = e.touches[0].clientX;
		items[index].ly = e.touches[0].clientY;
		//	console.log(items, '---------------移动项')
		this.setData({
			itemList: items
		})
	},
	WraptouchEnd() {
		// 拽结束就要绘制，不然点击按钮只绘制一次

	},
	openMask() {
		// 获取文字宽高，合成图片
		var that = this
		setTimeout(() => {
			// 副标题高度
			wx.createSelectorQuery().selectAll(`.textfont`).boundingClientRect(function (rect) {
				if (rect) {
					that.setData({
						rect: rect
					}, function () {
						that.synthesis(rect); // 合成图片
					})
				}
			}).exec(function () {});
		}, 200)

	},
	oTouchStart(e) {
		//找到点击的那个图片对象，并记录
		for (let i = 0; i < items.length; i++) {
			items[i].active = false;
			if (e.currentTarget.dataset.id == items[i].id) {
				console.log('e.currentTarget.dataset.id', e.currentTarget.dataset.id)
				index = i;
				items[index].active = true;
			}
		}
		//获取作为移动前角度的坐标
		items[index].tx = e.touches[0].clientX;
		items[index].ty = e.touches[0].clientY;
		// 获取字体dom宽高
		wx.createSelectorQuery().selectAll(`.textfont`).boundingClientRect((rect) => {
			if (items[index].image) {
				var t1 = this.getrect(rect, "QR");
			} else if (items[index].title) {
				var t1 = this.getrect(rect, "t1");
			} else if (items[index].subValue) {
				var t1 = this.getrect(rect, "t2");
			} else if (items[index].activeWords) {
				var t1 = this.getrect(rect, "t3");
			}
			//获取作为移动前角度的坐标
			items[index].x = (t1.width / 2 + t1.left - 24 * this.data.hp);
			items[index].y = (t1.height / 2 + t1.top - 126 * this.data.hp);
			//移动前的角度
			items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)
			//获取图片半径
			items[index].r = this.getDistancs(items[index].x, items[index].y, items[index].left, items[index].top);
		}).exec(function () {});
	},
	oTouchMove: function (e) {
		if (flag) {
			flag = false;
			setTimeout(() => {
				flag = true;
			}, 50)
		}
		//记录移动后的位置
		items[index]._tx = e.touches[0].clientX;
		items[index]._ty = e.touches[0].clientY;
		//移动的点到圆心的距离
		items[index].disPtoO = this.getDistancs(items[index].x, items[index].y, items[index]._tx, items[index]._ty - 10)

		items[index].scale = items[index].disPtoO / items[index].r;
		items[index].oScale = 1 / items[index].scale;

		//移动后位置的角度
		items[index].angleNext = this.countDeg(items[index].x, items[index].y, items[index]._tx, items[index]._ty)
		//角度差
		items[index].new_rotate = items[index].angleNext - items[index].anglePre;

		//叠加的角度差
		items[index].rotate += items[index].new_rotate;
		items[index].angle = items[index].rotate; //赋值

		//用过移动后的坐标赋值为移动前坐标
		items[index].tx = e.touches[0].clientX;
		items[index].ty = e.touches[0].clientY;
		items[index].anglePre = this.countDeg(items[index].x, items[index].y, items[index].tx, items[index].ty)

		//赋值setData渲染
		this.setData({
			itemList: items
		})
	},
	getDistancs(cx, cy, pointer_x, pointer_y) {
		var ox = pointer_x - cx;
		var oy = pointer_y - cy;
		return Math.sqrt(
			ox * ox + oy * oy
		);
	},
	/*
	 *参数1和2为图片圆心坐标
	 *参数3和4为手点击的坐标
	 *返回值为手点击的坐标到圆心的角度
	 */
	countDeg: function (cx, cy, pointer_x, pointer_y) {
		var ox = pointer_x - cx;
		var oy = pointer_y - cy;
		var to = Math.abs(ox / oy);
		var angle = Math.atan(to) / (2 * Math.PI) * 360;
		if (ox < 0 && oy < 0) //相对在左上角，第四象限，js中坐标系是从左上角开始的，这里的象限是正常坐标系  
		{
			angle = -angle;
		} else if (ox <= 0 && oy >= 0) //左下角,3象限  
		{
			angle = -(180 - angle)
		} else if (ox > 0 && oy < 0) //右上角，1象限  
		{
			angle = angle;
		} else if (ox > 0 && oy > 0) //右下角，2象限  
		{
			angle = 180 - angle;
		}
		return angle;
	},
	deleteItem: function (e) {
		let newList = [];
		for (let i = 0; i < items.length; i++) {
			if (e.currentTarget.dataset.id != items[i].id) {
				newList.push(items[i])
			}
		}
		if (newList.length > 0) {
			newList[newList.length - 1].active = true;
		}
		items = newList;
		this.setData({
			itemList: items
		})
	},
	// 获取dom元素
	getrect(rect, id) {
		for (let index = 0;
			(index) < rect.length;
			(index) ++) {
			const element = rect[(index)];
			if (element.id == id && element.width != 0)
				return element;
		}
	},
	synthesis(rect) { // 合成图片
		wx.showLoading({
			title: '加载中...',
			icon: 'none'
		})

		var t3 = this.getrect(rect, "t3"); //活动语的高度
		let h3 = 0
		if (t3)
			h3 = t3.height + 30

		this.drawTime = this.drawTime + 1
		let obj = this.data.item;
		/*
			num为canvas内背景图占canvas的百分比，若全背景num =1
			prop值为canvas内背景的宽度与可移动区域的宽度的比，如一致，则prop =1;
		*/
		//画组件
		var p1 = this.data.w1 / this.data.w2;
		const num = 1,
			prop = p1; //0.6
		this.setData({
			allHeight: this.data.h1 + (h3) * prop, // 海报总的高度：图 + 外面的文字
		})
		console.log('合成图片')
		maskCanvas.save();
		maskCanvas.beginPath();
		//一张白图  可以不画
		maskCanvas.setFillStyle('#fff');
		maskCanvas.fillRect(0, 0, this.data.w1, this.data.allHeight); //, this.sysData.windowWidth, this.data.canvasHeight
		maskCanvas.closePath();
		// maskCanvas.stroke();
		//画背景 hCw 为 1.62 背景图的高宽比
		maskCanvas.drawImage(this.data.drawRawImg, 0, 0, this.data.w1, this.data.h1); //this.data.canvasWidth, this.data.canvasHeight
		items.forEach((currentValue, index) => {
			if (currentValue.image) {
				//这是向画布里面填充图片的基本信息，二维码图
				this.drawQRImg(currentValue, rect, prop)
			}
			if (currentValue.title) {
				//这是画布填充的文字的基本信息，标题
				this.drawTitle(currentValue, rect, prop);
			}
			if (currentValue.subValue) {
				//这是向画布里面填充图片的基本信息，副标题
				this.drawSubTitle(currentValue, rect, prop);
			}
			if (currentValue.activeWords) {
				//这是向画布里面填充图片的基本信息，活动语
				this.drawActiveWords(currentValue, rect, prop);
			}
			maskCanvas.restore();
		})
		maskCanvas.draw(false, (e) => {
			wx.canvasToTempFilePath({
				canvasId: 'maskCanvas',
				success: res => {
					console.log('draw success')
					console.log(res.tempFilePath)
					this.setData({
						canvasTemImg: res.tempFilePath,
					})
					this.saveImg(); // 保存到相册，上传海报接口，保存海报接口
				}
			}, this)
		})
	},
	drawTitle1(currentValue, rect) {
		var zoom = prop * currentValue.scale;
		maskCanvas.save();
		maskCanvas.translate(this.data.canvasWidth * (1 - 1) / 2, 0);
		maskCanvas.beginPath();
		//maskCanvas.translate(370 * prop, 20 * prop);
		var t1 = this.getrect(rect, "t1");

		//t2 = this.getrect(rect, "t2"), t3 = this.getrect(rect, "t3");
		// var ts=this.words(maskCanvas, items[0].title, 48 * this.data.hp*zoom,0, 0, this.data.textWidth1 * zoom, 65 * this.data.hp * zoom)
		maskCanvas.translate((t1.width / 2 + t1.left - 24 * this.data.hp) * prop, (t1.height / 2 + t1.top - 126 * this.data.hp) * prop); //圆心坐标
		// maskCanvas.translate((t2.width / 2 + t2.left - 24 * this.data.hp) * prop, (t2.height / 2 + t2.top - 126 * this.data.hp) * prop); //圆心坐标
		// maskCanvas.translate((t3.width / 2 + t3.left - 24 * this.data.hp) * prop, (t3.height / 2 + t3.top - 126 * this.data.hp) * prop); //圆心坐标
		maskCanvas.rotate(currentValue.angle * Math.PI / 180);
		maskCanvas.setFillStyle('#63748f'); //设置图片颜色
		//
		// maskCanvas.translate(-(currentValue.x * zoom / 2), -(currentValue.y * zoom / 2))
		// maskCanvas.translate(-(this.data.textWidth1 * prop/ 2), -(this.data.textHeight1 * prop/ 2))
		//maskCanvas.translate(0, ); //圆心坐标

		//maskCanvas.translate(-(currentValue.width * zoom / 2), 0)

		if (currentValue.image) {

			//这是向画布里面填充图片的基本信息，二维码图
			maskCanvas.drawImage(currentValue.image, currentValue.left * zoom, currentValue.top * zoom, currentValue.width * zoom, currentValue.height * zoom);
		}
		if (currentValue.title) {
			//这是画布填充的文字的基本信息，标题
			let fontSize = 48 * this.data.hp
			let lineHight = 65 * this.data.hp
			var size = parseInt((fontSize) * zoom);
			maskCanvas.setTextBaseline("top")
			maskCanvas.setTextAlign("left")
			maskCanvas.setFontSize(size);

			//return;
			this.words(maskCanvas, currentValue.title, size, 0, 0, t1.width * prop, lineHight * zoom, true)
			// this.wordsWrap(maskCanvas, currentValue.title, currentValue.width * zoom, currentValue.width * zoom, currentValue.left * zoom, currentValue.top * zoom, currentValue.height * zoom);  //这里是控制字体的位置、
		}
		if (currentValue.subValue) {
			//这是画布填充的文字的基本信息，副标题
			let fontSize = 26 * this.data.hp
			let lineHight = 45 * this.data.hp
			var size = (parseInt(fontSize) * zoom);
			maskCanvas.setTextBaseline("top")
			maskCanvas.setTextAlign("left")
			maskCanvas.setFontSize(size);
			this.words(maskCanvas, currentValue.title, size, 0, 0, t2.width * prop, lineHight * zoom, true)
			// this.words(maskCanvas, currentValue.subValue, size, currentValue.left * zoom, 0, this.data.textWidth2 * prop, lineHight * zoom)
			// 文字换行 wordsWrap(ctx, name, nameWidth, maxWidth, startX, srartY, wordsHight)
			// this.wordsWrap(maskCanvas, currentValue.subValue, currentValue.width * currentValue.scale, currentValue.width * 1.2, currentValue.left * zoom, currentValue.top * zoom + 10, 40 * zoom);  //这里是控制字体的位置、
		}
		if (currentValue.activeWords) {
			//这是画布填充的文字的基本信息，活动语
			let fontSize = 34 * this.data.hp
			let lineHight = 51 * this.data.hp
			var size = (parseInt(fontSize) * zoom);
			maskCanvas.setTextBaseline("top")
			maskCanvas.setTextAlign("left")
			maskCanvas.setFontSize(size);
			this.words(maskCanvas, currentValue.title, size, 0, 0, t3.width * prop, lineHight * zoom, true)
			// this.words(maskCanvas, currentValue.activeWords, size, currentValue.left * zoom, 0, this.data.textWidth3 * prop, lineHight * zoom)
			// 文字换行 wordsWrap(ctx, name, nameWidth, maxWidth, startX, srartY, wordsHight)
			// this.wordsWrap(maskCanvas, currentValue.activeWords, currentValue.width * currentValue.scale, currentValue.width * 1.2, currentValue.left * zoom, 0, 40 * zoom);  //这里是控制字体的位置、
		}
		maskCanvas.restore();

	},
	drawActiveWords(currentValue, rect, prop) {
		var zoom = prop * currentValue.scale;
		maskCanvas.save();
		maskCanvas.translate(this.data.canvasWidth * (1 - 1) / 2, 0);
		maskCanvas.beginPath();
		var t1 = this.getrect(rect, "t3");
		maskCanvas.translate((t1.width / 2 + t1.left - 24 * this.data.hp) * prop, (t1.height / 2 + t1.top - 126 * this.data.hp) * prop); //圆心坐标
		maskCanvas.rotate(currentValue.angle * Math.PI / 180);
		maskCanvas.setFillStyle('#63748f'); //设置图片颜色
		let fontSize = 34 * this.data.hp
		let lineHight = 51 * this.data.hp
		var size = (parseInt(parseInt(fontSize)) * zoom);
		maskCanvas.setTextBaseline("top")
		maskCanvas.setTextAlign("left")
		maskCanvas.setFontSize(size);
		this.words(maskCanvas, currentValue.activeWords, size, 0, 0, t1.width * prop, lineHight * zoom, true) //绘制文字

		maskCanvas.restore();
	},
	drawSubTitle(currentValue, rect, prop) {
		var zoom = prop * currentValue.scale;
		maskCanvas.save();
		maskCanvas.translate(this.data.canvasWidth * (1 - 1) / 2, 0);
		maskCanvas.beginPath();
		var t1 = this.getrect(rect, "t2");
		maskCanvas.translate((t1.width / 2 + t1.left - 24 * this.data.hp) * prop, (t1.height / 2 + t1.top - 126 * this.data.hp) * prop); //圆心坐标
		maskCanvas.rotate(currentValue.angle * Math.PI / 180);
		maskCanvas.setFillStyle('#63748f'); //设置图片颜色
		//这是画布填充的文字的基本信息，标题
		let fontSize = 26 * this.data.hp
		let lineHight = 45 * this.data.hp
		var size = parseInt(parseInt(fontSize) * zoom);
		maskCanvas.setTextBaseline("top")
		maskCanvas.setTextAlign("left")

		this.words(maskCanvas, currentValue.subValue, size, 0, 0, t1.width * prop, lineHight * zoom, true)

		maskCanvas.restore();
	},
	drawQRImg(currentValue, rect, prop) {
		var zoom = prop * currentValue.scale;
		maskCanvas.save();
		maskCanvas.translate(this.data.canvasWidth * (1 - 1) / 2, 0);
		maskCanvas.beginPath();
		//maskCanvas.translate(370 * prop, 20 * prop);
		var t1 = this.getrect(rect, "QR");
		maskCanvas.translate((t1.width / 2 + t1.left - 24 * this.data.hp) * prop, (t1.height / 2 + t1.top - 126 * this.data.hp) * prop); //圆心坐标
		maskCanvas.rotate(currentValue.angle * Math.PI / 180);
		maskCanvas.setFillStyle('#63748f'); //设置图片颜色

		//这是画布填充的文字的基本信息，标题
		maskCanvas.drawImage(currentValue.image, (-t1.width / 2 + 13 * this.data.hp) * prop, (-t1.height / 2 + 13 * this.data.hp) * prop, (t1.width - 13 * this.data.hp) * prop, (t1.height - 13 * this.data.hp) * prop);
		maskCanvas.restore();
	},
	drawTitle(currentValue, rect, prop) {
		var zoom = prop * currentValue.scale;
		maskCanvas.save();
		maskCanvas.translate(this.data.canvasWidth * (1 - 1) / 2, 0);
		maskCanvas.beginPath();
		//maskCanvas.translate(370 * prop, 20 * prop);
		var t1 = this.getrect(rect, "t1");
		maskCanvas.translate((t1.width / 2 + t1.left - 24 * this.data.hp) * prop, (t1.height / 2 + t1.top - 126 * this.data.hp) * prop); //圆心坐标
		maskCanvas.rotate(currentValue.angle * Math.PI / 180);
		maskCanvas.setFillStyle('#63748f'); //设置图片颜色

		//这是画布填充的文字的基本信息，标题
		let fontSize = 48 * this.data.hp
		let lineHight = 65 * this.data.hp
		var size = parseInt(parseInt(fontSize) * zoom);
		maskCanvas.setTextBaseline("top")
		maskCanvas.setTextAlign("left")
		//maskCanvas.setFontSize(size);

		//return;
		this.words(maskCanvas, currentValue.title, size, 0, 0, t1.width * prop, lineHight * zoom, true)

		maskCanvas.restore();
	},
	disappearCanvas() {
		this.setData({
			showCanvas: false
		})
	},
	saveImg: function () {
		var that = this;
		var canvasImg = this.data.canvasTemImg; //canvas合成的图片路径
		// 上传海报图片到服务器
		wx.uploadFile({
			header: {
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			url: `${setting.setting.urlImg}/api/FrontApi.ashx?_op=ImageUpload&small=true`,
			filePath: canvasImg, //图片地址res.tempFilePath
			name: 'card',
			success: async function (response) {
				let dataJson = JSON.parse(response.data)
				if (dataJson.success) {
					that.setData({
						PosterImagesURL: dataJson.data.SaveFileNamePath, //上传图片成功，接口返回服务器图片域名
						SmallImageUrl: dataJson.data.SmallFilePath,
					})
					// 保存我的海报接口 titleValue  activeValue  QRImg
					var hr = await posterApi.posterapi.savePoster({
						UserID: wx.getStorageSync("wxauth").userid,
						PosterImagesURL: dataJson.data.SaveFileNamePath,
						SmallImageUrl: dataJson.data.SmallFilePath,
						Title: wx.getStorageSync("editData").titleValue,
						Comment: wx.getStorageSync("editData").activeValue,
						BarcodeUrl: wx.getStorageSync("editData").QRImg,
						PosterID: that.data.posterId,
						openid: wx.getStorageSync("wxauth").data.openid,
						oper: 'add',
					});
					if (hr.success) {
						// 保存到相册
						wx.saveImageToPhotosAlbum({
							filePath: canvasImg,
							success: res => {
								that.setData({
									showModal_success: true // 预览框显示
								})
							},
							fail: res => {
								// console.log(res)
								wx.openSetting({
									success: settingdata => {
										// console.log(settingdata)
										if (settingdata.authSetting['scope.writePhotosAlbum']) {
											// console.log('获取权限成功，给出再次点击图片保存到相册的提示。')
										} else {
											// console.log('获取权限失败，给出不给权限就无法正常使用的提示')
										}
									},
									fail: error => {
										// console.log(error)
									}
								})
								wx.showModal({
									title: '提示',
									content: '保存失败，请确保相册权限已打开',
								})
							}
						})
					} else {
						wx.showToast({
							title: hr.msg,
							icon: 'none'
						})
					}
				} else {
					wx.showToast({
						title: dataJson.msg,
						icon: 'none'
					})
				}
			}
		})
	},
	// 文字换行方法二
	words(ctx, name, fontSize, startX, srartY, maxWidth, lineHight, flag = false) {
		//计算行数
		let y = name.split('\r\n');
		ctx.setFontSize(fontSize)
		srartY = 0
		let y1 = []
		y.forEach(i => {
			this.spiltword(ctx, i, maxWidth, y1);
		});
		if (!flag)
			return y1;
		srartY = (-lineHight * y1.length / 2) + (lineHight - fontSize) / 2 + 29 * this.data.hp;
		y1.forEach(i => {
			ctx.fillText(i, -maxWidth / 2, srartY)
			srartY += lineHight
		});
	},
	spiltword(ctx, name, maxWidth, y) {
		var flag = false;
		for (let i = 0; i < name.length; i++) {
			if (ctx.measureText(name.substring(0, i + 1)).width > maxWidth) {
				y.push(name.substring(0, i));
				this.spiltword(ctx, name.substring(i), maxWidth, y)
				flag = true;
				break
			}
		}
		if (flag == false)
			y.push(name)
	},
	// this.wordsWrap(maskCanvas, currentValue.title, currentValue.width * zoom, currentValue.width * zoom, currentValue.left * zoom, currentValue.top * prop *currentValue.scale, currentValue.height * zoom);
	//文字换行处理
	// canvas 标题超出换行处理
	wordsWrap(ctx, name, nameWidth, maxWidth, startX, srartY, wordsHight) {
		let lineWidth = 0;
		let lastSubStrIndex = 0;
		ctx.font = "96px"
		for (let i = 0; i < name.length; i++) {
			lineWidth += ctx.measureText(name[i]).width;
			if (lineWidth > maxWidth) {
				ctx.fillText(name.substring(lastSubStrIndex, i), startX, srartY);
				srartY += wordsHight;
				lineWidth = 0;
				lastSubStrIndex = i;
			}
			if (i == name.length - 1) {
				ctx.fillText(name.substring(lastSubStrIndex, i + 1), startX, srartY);
			}
		}
	},
	//   ***************************************************** end

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		app.getEventLog("509", "海报预约页面", "", "", "", "");
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


	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {
		// wx.setStorageSync("preViewData", this.data.itemList)
	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {
		// wx.setStorageSync("preViewData", this.data.itemList)
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