//获取视频列表
var jobType="01";
$(function(){
	$.get("/common/jobrec.html", function(result){
		$("#jobrec").html(result)
	  });
})


function getVideos(pageId){
				$(".section-videos").hide()
				let data={
					 pageId: pageId, 
					 pageSize:6,
					 pageIndex:1
				}
				$.ajax({
                    type: "post",
                    url: domainUrl+"/hrapi/api/Video/GetListBySC",
					contentType:"application/json",
                    data: JSON.stringify(data),
                    dataType: 'JSON',
                    success: function (res) {
						if(res.state==-1){
							alert(res.msg);
							return;
						}
						if(res.rows.length==0){
							return;
						}
						$(".section-videos").show()
						let data=res.rows;
						let classrows="",html=""
							for(var i=0;i<data.length;i++){
									if(data.length==1){
										classrows="col-sm-12 col-md-12 col-lg-12"
									}
									else if(data.length<6){
										if(data.length==3){
											classrows="col-sm-12 col-md-4 col-lg-4"
										}
										else{
										if(i==0){
											classrows="col-sm-12 col-md-8 col-lg-8"
										}
										else{
											classrows="col-sm-12 col-md-4 col-lg-4"
										}
									}
									}
									else{
										classrows="col-sm-12 col-md-4 col-lg-4"
									}
							html+='<div class="'+classrows+'"+>'+
							'<div class="video-item">'+
								'<div class="video-con">'+
									'<img class="img-responsive video-img" src="'+domainUrl+data[i].CoverImg+'">'+
									'<img class="video-icon" src="/images/quality-video-icon.png" onclick="playVideo(\' ' + data[i].VideoUrl + ' \')" />'+
								'</div>'+
								'<div class="video-desc">'+
									'<div class="text1">'+data[i].Title+'</div>'+
									'<div class="text2">'+data[i].Desc+'</div>'+
								'</div>'+
							'</div>'+
						'</div>';
						}
                       $(".videos").html(html)
                    },
                    error: function (errors) {
                        
                    }
                });
			}

			//获取热招职位
			function getHotPosition(jobType){
							$(".joblist").hide()
							let data={
								 userId:localStorage.getItem("UserId"),
								 jobType: jobType,
								 isHot: true,
								 pageIndex:1,
								 pageSize:5,
								 sortName:"CreatedTime",
								 sortOrder:"desc"
							}
							$.ajax({
			                    type: "post",
			                    url: domainUrl+"/hrapi/api/Position/GetListBySC",
								contentType:"application/json",
			                    data: JSON.stringify(data),
			                    dataType: 'JSON',
			                    success: function (res) {
									if(res.state==-1){
										alert(res.msg);
										return;
									}
									if(res.rows.length==0){
										return;
									}
									$(".joblist").show()
									let data=res.rows;
									let html="", collecthtml="";
										for(var i=0;i<data.length;i++){
											if(data[i].msgList.IsCollection=="1"){
												collecthtml='<div class="collect" onclick="deletecollection(\''+ data[i].msgList.CollectiId +'\',\''+ data[i].PositionId +'\',this)" ><img src="/images/collect-check.png"></div>'
											}
											else{
												collecthtml='<div class="collect" onclick="collectPosition(\''+ data[i].PositionId +'\',this)"><img src="/images/collect-uncheck.png"></div>'
											}
										html+='<li><div>'+
								'<a href="/jobDetail-professional-'+ data[i].PositionId +'.html?PositionId='+ data[i].PositionId + '"><div class="title">'+data[i].PositionTitle+'</div></a>'+
								'<div class="job-info">'+
									'<i class="icon icon-thick-location"></i>'+data[i].WorkCountry+','+data[i].WorkProvince+','+data[i].WorkCity+
								'</div>'+
								'<p>'+
									'<span>'+data[i].msgList.TypeName+'</span>'+
									'<span><i class="icon icon-thick-timer" style="padding-left: 10px;"></i>'+data[i].WorkTime+'</span>'+
								'</p>'+
								'<div class="posted-date">'+
									'<i class="icon icon-time" style="padding-left: 10px;"></i>'+data[i].PostTime+
								'</div>'+
								collecthtml+
								'<div class="description au-target">'+
								getdesc(data[i].PositionCutDescString)
								'</div>'+
							'</div>'+
						'</li>';
									}
			                       $(".joblist ul").show().html(html)
			                    },
			                    error: function (errors) {
			                        
			                    }
			                });
						}
						
						function getCarousel(pageId){
							$(".myCarousel").hide()
							let data={
									  // status:"1",
									  pageId: pageId,
									  pageSize: 9999,
									  pageIndex: 1,
									  sortName: "SortNum",
									  sortOrder: "asc",
								}
								$.ajax({
							        type: "post",
							        url: domainUrl+"/hrapi/api/CarouselImage/GetListBySC",
									contentType:"application/json",
							        data: JSON.stringify(data),
							        dataType: 'JSON',
							        success: function (res) {
										if(res.state==-1){
											alert(res.msg);
											return;
										}
										if(res.rows.length==0){
											return;
										}
										let data=res.rows;
										let dataimg=data.filter(function (item) {
										        return item.Status==1;
										    });
										let datalearn=data.filter(function (item) {
										        return item.Status==2;
										    });
										let datablog=data.filter(function (item) {
											    return item.Status==3;
											    });
										let html="",html1="",html2="", active="",indicators="";
										if(dataimg.length>0){
											for(var i=0;i<dataimg.length;i++){
												if(i==0){
													active="active"
												}
												else{
													active=""
												}
												indicators+='<li data-target="#myCarousel" data-slide-to="'+i+'" class="'+active+'"></li>'
											html+='<div class="carousel-item '+active+'">'+
											'<div class="carouselitem">'+
												'<div class="profile">'+
													'<div class="profile-pic">'+
														'<img src="'+dataimg[i].PicUrl+'">'+
													'</div>'+
													'<div class="profile-info">'+
														'<p>'+dataimg[i].StaffMsg+'</p>'+
														'<div class="title">'+
															'<span class="content-name">'+dataimg[i].StaffName+'</span>'+
															'<span class="content-designation">'+dataimg[i].StaffPosition+'</span>'+
														'</div>'+
													'</div>'+
												'</div>'+
											'</div>'+
										'</div>';
										}
										$("#myCarousel").show()
										if(dataimg.length>1){
							           $(".carousel-indicators").html(indicators);
									   }
									    $(".carousel-inner").html(html)
										}
										if(datalearn.length>0){
										for (var j = 0; j < datalearn.length; j++) {
											// let linkurl=datalearn[j].URL?datalearn[j].URL:"javascript:void(0)";
											let linkhtml=datalearn[j].URL?'<a href="'+datalearn[j].URL+'" target="_blank">':'<a href="javascript:void(0)">'
											html1+='<div class="col-sm-12 col-md-4 col-lg-4">'+
													'<div class="employee-item">'+
														linkhtml+'<div class="employee-con">'+
															'<img class="img-responsive employee-img" src="'+datalearn[j].PicUrl+'">'+
														'</div>'+
														'<div class="employee-desc">'+
															'<div class="text1">'+datalearn[j].StaffName+'</div>'+
															'<div class="text2">'+datalearn[j].StaffMsg+'</div>'+
														'</div></a>'+
													'</div>'+
												'</div>'
										}
										$(".learn").show()
										$(".learnList").html(html1)
										}
										if(datablog.length>0){
											let urlBlog=""
										            for (var k = 0; k < datablog.length; k++) {
														// 跳转路径
														urlBlog=datablog[k].URL;
														// if(datablog[k].SeoUrl){
														// 	urlBlog = datablog[k].SeoUrl
														// }else{
														// 	urlBlog = datablog[k].PageCode 
														// }
														html2+='<div class="col-sm-12 col-md-4 col-lg-4">'+
																'<div class="employee-item">'+
																	'<a href="'+ urlBlog +'" target="_blank"><div class="employee-con">'+
																		'<img class="img-responsive employee-img" src="'+datablog[k].PicUrl+'">'+
																	'</div>'+
																	'<div class="employee-desc">'+
																		'<div class="text1">'+datablog[k].StaffName+'</div>'+
																		'<div class="text2">'+datablog[k].StaffMsg+'</div>'+
																	'</div></a>'+
																'</div>'+
															'</div>'
										            }
													$(".blog").show()
										            $(".blogList").html(html2)
													}
							        },
							        error: function (errors) {
							            
							        }
							    });
						}
			//播放视频
			function playVideo(videosrc) {
				console.log(videosrc)
				$(".overlay-video").show();
				$(".iframe-video").attr("src",videosrc)
			}
			//关闭视频
			function closeVideo(obj) {
				$(".overlay-video").hide();
				$(".iframe-video")[0].pause()
			}
			//收藏职位
			function collectPosition(positionId,target){
				if(!localStorage.getItem("Cchecked")){
					showCookie();
					return
				}
				if($(target).hasClass("active")){
					return;
				}
				let data={
					positionId:positionId,
					userId: localStorage.getItem("UserId")
				}
				$.ajax({
				    type: "post",
				    url: domainUrl+"/hrapi/api/PositionCollection/PostCollection",
					contentType:"application/json",
				    data: JSON.stringify(data),
				    dataType: 'JSON',
				    success: function (res) {
						if(res.state==-1){
							alert(res.msg);
							return;
						}
						$(target).removeAttr("onclick").attr("onclick","deletecollection('"+res.rows[0].CollectionId+"','"+positionId+"',this)")
							$(target).addClass("active")
							$(target).find("img").attr("src","/images/collect-check.png")
							getCollectionList('01')
				    },
				    error: function (errors) {
				        
				    }
				});
				}
				//删除收藏职位
				function deletecollection(collectionId,positionId,target){
					if(!localStorage.getItem("Cchecked")){
						showCookie();
						return
					}
					let data={
						collectionId:collectionId
					}
					$.ajax({
					    type: "post",
					    url: domainUrl+"/hrapi/api/PositionCollection/Delete",
						contentType:"application/json",
					    data: JSON.stringify(data),
					    dataType: 'JSON',
					    success: function (res) {
							if(res.state==-1){
								alert(res.msg);
								return;
							}
							$(target).removeAttr("onclick").attr("onclick","collectPosition('"+positionId+"',this)")
							$(target).removeClass("active")
							$(target).find("img").attr("src","/images/collect-uncheck.png")
							getCollectionList('01')
					    },
					    error: function (errors) {
					        
					    }
					});
				}
				//获取博客
				function getBlog(pageId) {
				//     // if ($(".menuBtnCon").html == "All Topics") {
				//     //     blogArticleType = ""
				//     // } else if ($(".menuBtnCon").html == "员工故事") {
				//     //     blogArticleType = "01"
				//     // } else if ($(".menuBtnCon").html == "职场建议") {
				//     //     blogArticleType = "02"
				//     // }
				
				//     let data = {
				//         // articleTypeString: "01",
				// 		pageId:pageId,
				//         pageSize: 6,
				//         pageIndex: 1,
				//         // sortName: "CreatedTime",
				//         // sortOrder: "desc"
				//     }
				//     $.ajax({
				//         type: "post",
				//         url:domainUrl+"/hrapi/api/Page/GetBlogList",
				//         contentType: "application/json",
				//         data: JSON.stringify(data),
				//         dataType: 'JSON',
				//         success: function (res) {
				// 			if(res.state==-1){
				// 				alert(res.msg);
				// 				return;
				// 			}
				//             if (res.rows.length == 0) {
				//                 return;
				//             }
				//             let data = res.rows;
				//             let html = "";
				//             for (var i = 0; i < data.length; i++) {
				// 				// 跳转路径
				// 				if(data[i].SeoUrl){
				// 					urlBlog = data[i].SeoUrl
				// 				}else{
				// 					urlBlog = data[i].PageCode 
				// 				}
				// 				html+='<div class="col-sm-12 col-md-4 col-lg-4">'+
				// 						'<div class="employee-item">'+
				// 							'<a href="'+ urlBlog +'.html" target="_blank"><div class="employee-con">'+
				// 								'<img class="img-responsive employee-img" src="'+data[i].ListImg+'">'+
				// 							'</div>'+
				// 							'<div class="employee-desc">'+
				// 								'<div class="text1">'+data[i].ListTitle+'</div>'+
				// 								'<div class="text2">'+data[i].ListDesc+'</div>'+
				// 							'</div></a>'+
				// 						'</div>'+
				// 					'</div>'
				//             }
				// 			$(".blog").show()
				//             $(".blogList").html(html)
				//         },
				//         error: function (errors) {
				
				//         }
				//     });
				}
				
				// 底部Career Site Cookie Settings 按钮埋点
				$(".cookieSettingsBtn").click(function () {
				    userLinkRecord(window.hrpageid, 'button', 'cookieSettingsBtn')
				})
				
				// 底部Personal Information 按钮埋点
				$(".personalInformationBtn").click(function () {
				    userLinkRecord(window.hrpageid, 'button', 'personalInformationBtn')
				})