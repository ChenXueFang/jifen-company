var step = 0;
var resumeUrl = "",
	workYear = "",jobdata={},isSubmit=false,Linkin=false,isedit=false,fromLinkin=false;
$(function() {
	if (getQueryString("uid") && getQueryString("uidguid")) {
		localStorage.setItem("UserId", getQueryString("uid"))
		localStorage.setItem("UserIdGuid", getQueryString("uidguid"));
		sessionStorage.setItem("fromLinkin","true");
		window.location.href=window.location.href.substring(0,window.location.href.indexOf("?"))
		return;
		}
		// window.onbeforeunload = function (e) {
		// 	sessionStorage.setItem("fromLinkin","false");
		// }
		fromLinkin=sessionStorage.getItem("fromLinkin")=="true"?true:false;
		sessionStorage.setItem("fromLinkin","false");
		var useridInterval=setInterval(() => {
			if (parseInt(localStorage.getItem("UserId"))) {
				checkLogin();
				clearInterval(useridInterval)
			}
		}, 200);
		
		
})
//点击开始定制
function startcustomize() {
	if(!localStorage.getItem("Cchecked")){
		showCookie();
		return
	}
	userLinkRecord(window.hrpageid,"button","jobrec-start")
	$(".job-rec").hide();
	$(".resume-step").show();
}
//关闭弹窗
function closePopup() {
	$(".job-rec").show();
	$(".resume-step").hide();
}

function handleFindYourFit() {
	userLinkRecord(window.hrpageid,"button","linkin-other");
	step=0;
	handlestep()
	// $(".resume-step").hide();
	// $(".resume-login").show();
	// $(".prev-next-wrap").show()
}
//刚开始工作生涯切换
function changestartjob(obj){
	 console.log(obj);
	 if($(obj).is(":checked")){
		 $("#searchinput1").attr("readonly","readonly")
	 }
	 else{
		$("#searchinput1").removeAttr("readonly") 
	}
	}
	function nexstep(){
		skip();
		// if(step==6){
		// 	SaveCustomJobMark("last")
		// }
		// else{
			SaveCustomJobMark()
		// }
	}
//跳过
function skip() {
	if (step < 7) {
		step++;
	} else {
		step = 0;
	}
	if($("#startjob").is(":checked")){
		if(step==4) step++;
		}
	$(".resume-login").hide()
	handlestep();
}
//返回前一步
function prev() {
	if(Linkin&&step==1){
		$(".step").hide();
		$(".step-show").hide();
		$(".prev-next-wrap").hide()
		$(".job-rec").show()
			return;
		}
		if(isedit&&step==0){
			closePopup();
			$(".resume-login").hide();
			$(".prev-next-wrap").hide()
			return;
		}
	if (step > -1) {
		step--;
	}
	if($("#startjob").is(":checked")){
		if(step==4) step--;
		}
	handlestep();
}
//处理步骤切换
function handlestep() {
	if($("#startjob").is(":checked")){
		$(".progress-bar").css("width", step * 25 + "%");
		$(".progress-text").html("步" + step + "的4");
		if(step==5){
			$(".progress-text").html("步4的4");
		}
		}
		else{
	$(".progress-bar").css("width", step * 20 + "%");
	$(".progress-text").html("步" + step + "的5");
	}
	console.log(step)
	switch (step) {
		case -1:
			$(".resume-step").show();
			$(".resume-login").hide();
			$(".prev-next-wrap").hide()
			// $(".step1").hide();
			// $(".step-show").hide();
			break;
		case 0:
			$(".resume-step").hide();
			$(".resume-login").show();
			$(".prev-next-wrap").show()
			$(".step1").hide();
			$(".step-show").hide();
			break;
		case 1:
			getPositionType()
			$(".step2").hide()
			$(".step1").show();
			$(".step-show").show();
			$(".prev-next-wrap").show();
			break;
		case 2:
			$(".step1").hide()
			$(".step3").hide()
			$(".step2").show()
			break;
		case 3:
			getSkills()
			$(".step2").hide()
			$(".step4").hide()
			$(".step5").hide()
			$(".step3").show()
			break;
		case 4:
			$(".step3").hide()
			$(".step5").hide()
			$(".step4").show()
			break;
		case 5:
			$(".step3").hide()
			$(".step4").hide()
			$(".step5").show()
			$(".step-show").show();
			$(".submit").hide();
			break;
		case 6:
			$(".step-show").hide()
			$(".step5").hide()
			$(".submit").show();
			setTimeout(function () {
				if(jobdata.JobId){
					getRecPosition()
				}
				else{
					$(".submit-heading.errorCon").show();
					$(".submit-heading.right").hide()
				}
			},1000)
			break;
		case 7:
			$(".submit").hide();
			$(".prev-next-wrap").hide();
			getJobCustomization()
			
	}
}

//选择感兴趣
function chooseIntrin(target) {
	if ($(target).hasClass("item-active")) {
		$(target).removeClass("item-active")
	} else {
		$(target).addClass("item-active")
	}
}
//选择年份
function chooseyear(workyear, target) {
	var items = $(".year-text");
	for (var i = 0; i < items.length; i++) {
		$(items[i]).removeClass("item-active")
	}
	$(target).addClass("item-active")
	workYear = workyear
}
function changeval(obj){
	if ($(obj).val() != "") {
		$(obj).parent().next().show()
	} else {
		$(obj).parent().next().hide()
	}
	if ($(obj).attr("id") == "searchinput1") {
		getRecentJobs($(obj).val())
	}
}
function changeval1(obj){
	if ($(obj).val() != "") {
		$(obj).parent().parent().next().show()
	} else {
		$(obj).parent().parent().next().hide()
	}
	if ($(obj).attr("id") == "searchinput2") {
		getSkills($(obj).val())
	}
	else if($(obj).attr("id") == "searchinput3"){
		getPositionArea($(obj).val())
	}
}

function blurval(obj){
	setTimeout(function(){
		$(obj).parent().next().hide()
	},500)
}
function blurval2(obj){
	setTimeout(function(){
		$(obj).parent().parent().next().hide()
	},500)
}
function blurval1 (obj) {
	setTimeout(function(){
		$(obj).parent().parent().next().hide()
		if($(obj).val()){
		var item = document.createElement("li")
		item.innerHTML = '<span>' + $(obj).val() + '</span>' +
			'<img onclick="deleteitem(this)" src="/images/close.png" >'
		var con = $(obj).parent().parent()[0]
		var search = $(obj).parent()[0]
		item.className = "ablilityitem"
		con.insertBefore(item, search)
		$(".muti").val("")
		}
	},500)
}

//提交
function submit() {
	userLinkRecord(window.hrpageid,"button","jobrec-submit")
	// console.log("提交");
	if(!checksubmit("#name","#email")){
		return;
	}
	$(".submit").hide();
	// $(".job-rec").show();
	$(".prev-next-wrap").hide();
	SaveCustomJobMark("submit")
}
//弹窗提交
function submit1() {
	if(!checksubmit("","#email1")){
		return;
	}
	$(".submit").hide();
	// $(".job-rec").show();
	$(".prev-next-wrap").hide();
	showmodel(2)
	SaveCustomJobMark("submit")
}

	function checksubmit(obj,obj1){
		var str=/^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/
		if (($(obj).val() == ""&&obj!="")||$(obj1).val() == "") {
			if($(obj).val() == ""&&obj!=""){
			$(obj).addClass("err");
			$(obj).next().show()
		}
		else{
			$(obj).removeClass("err");
			$(obj).next().hide()
		}
		if ($(obj1).val() == "") {
			$(obj1).addClass("err")
			$(obj1).next().html("电子邮件不应为空").show();
		}
		else if (!str.test($(obj1).val())) {
				$(obj1).addClass("err")
				$(obj1).next().html("输入虚拟电子邮件地址").show();
			}
		else{
			
			$(obj1).removeClass("err");
			$(obj1).next().hide()
		}
			return false;
		}
		else{
			$(obj).removeClass("err");
			$(obj).next().hide()
			if (str.test($(obj1).val())) {
				$(obj1).removeClass("err")
				$(obj1).next().hide();
				return true;
			} else {
				$(obj1).addClass("err")
				$(obj1).next().html("输入虚拟电子邮件地址").show();
				return false;
			}
		}
		return true;
		
	}

//提交输入验证
function changinput(obj) {
	if(!checksubmit("#name","#email")){
		return;
	}
	}
function changinput1(obj) {
	if(!checksubmit("","#email1")){
		return;
	}
	}	
function checkLogin(){
	showLoading()
	let data = {
			  "userId": localStorage.getItem("UserId"),
		}
		$.ajax({
			type: "post",
			url: domainUrl + "/hrapi/api/Users/GetLoginState",
			contentType: "application/json",
			data:  JSON.stringify(data),
			dataType: 'JSON',
			success: function(res) {
				console.log(res)
				if(res.state==1){
					//已登录linkin
					Linkin=true;
					$(".linked").show()
				}
				else{
					Linkin=false;
					//未登录
				}
				// hideLoading()
				getJobCustomization();
			},
			error: function(errors) {
				hideLoading()
			}
		});
	}
function doProfileLogin() {
	showLoading()
	userLinkRecord(window.hrpageid,"button","linkin-login")
	if(window.location.hostname=='hr.crmclick.com'){
		window.location.href=domainUrl+"/hrapi/api/Auth/LinedInAuthorization?userid="+localStorage.getItem("UserId")
		+"&redirecturi="+window.location.href
	}else{
		window.location.href=domainUrl+"/api/Auth/LinedInAuthorization?userid="+localStorage.getItem("UserId")
	+"&redirecturi="+window.location.href
	}
	
	// window.location.href=domainUrl+"/api/Auth/LinedInAuthorization?userid="+localStorage.getItem("UserId")
	// +"&redirecturi="+window.location.href
}
function quitLinkin(){
	userLinkRecord(window.hrpageid,"button","linkin-quit")
	let data = {
			  "userId": localStorage.getItem("UserId"),
		}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/Users/ExitLogin",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			Linkin=false;
			$("job-rec").hide()
			$(".linked").hide();
			$(".reset").show();
			$(".resume-result").hide();
			if(jobdata.JobId){
				reset()
			}
			else{
			getJobCustomization()
			}
		},
		error: function(errors) {
	
		}
	});
	
}
//选择最近工作
function choosejob(obj) {
	$("#searchinput1").val($(obj).html())
	$(obj).parent().hide()
}
//选择擅长
function chooseitem(obj) {
	var item = document.createElement("li")
	item.innerHTML = '<span>' + $(obj).text() + '</span>' +
		'<img onclick="deleteitem(this)" src="/images/close.png" >'
	var con = $("#searchli").parent()[0]
	var search =document.getElementById("searchli")
	item.className = "ablilityitem"
	con.insertBefore(item, search)
	$(".searchinput1").val("")
	$(".search-dropdown-list").hide()
	$(obj).remove()
}
//选择工作地点
function chooseitem1 (obj) {
	let los=$(".locationitem")
	for(var i=0;i<los.length;i++){
		if("location"+$(obj).attr("id")==$(los[i]).attr("id")){
		return;
		}
	}
	var item = document.createElement("li")
	item.innerHTML = '<span>' + $(obj).text() + '</span>' +
		'<img onclick="deleteitem(this)" src="/images/close.png" >'
	var con = $("#searchli1").parent()[0]
	var search =document.getElementById("searchli1")
	item.className = "locationitem"
	item.id="location"+$(obj).attr("id")
	con.insertBefore(item, search)
	$(".searchinput1").val("")
	$(".search-dropdown-list").hide()
	$(obj).remove()
}
function deleteitem(obj) {
	$(obj).parent().remove()
}

function showmodel(i) {
	if(i==2&&Linkin){
		closemodel();
		return;
	}
	closemodel();
	setTimeout(function(){
		$("#Modal" + i).modal({
			backdrop: 'static',
			keyboard: false
		}); //手动开启
	},500)
	
}
function closemodel1(){
	closemodel()
	// step = 0;
	// handlestep();
}
function closemodel() {
	$(".default_dialog").modal('hide'); //手动开启
}
//重置
function reset(){
	let data = {
		// userId: localStorage.getItem("UserId"),
		jobId: jobdata.JobId,
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/JobCustomization/Delete",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			$(".resume-start").css("display","table")
			$(".resume-result").hide()
			$(".recomend-box").hide()
			jobdata={};
			resumeUrl="";
			workYear="";
			$("#searchinput1").val("");
			$(".ablilityitem").remove();
			$(".year-text").removeClass("item-active");
			$(".locationitem").remove();
			$("#name").val(jobdata.AllName);
			$("#email").val(jobdata.Email);
			$("#phone").val(jobdata.Tel)
			closemodel();
		},
		error: function(errors) {
	
		}
	});
}

function edit(){
	userLinkRecord(window.hrpageid,"button","jobrec-edit")
	isedit=true;
	// getJobCustomization()
	// userLinkRecord()
	$(".job-rec").hide()
	if(Linkin){
		step=1;
		handlestep()
	}
	else{
		step=0
		handleFindYourFit()
	}
}
//获取职位定制信息
function getJobCustomization(){
	showLoading()
	let data = {
		userId: localStorage.getItem("UserId"),
		pageIndex: 1,
		pageSize: 9999,
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/JobCustomization/GetListBySC",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				hideLoading()
				alert(res.msg);
				return;
			}
			$(".ablilityitem").remove();
			$(".locationitem").remove();
			if(res.rows.length>0){
				jobdata=res.rows[0];
				resumeUrl=res.rows[0].ResumeUrl
				if(fromLinkin&&!resumeUrl){
					getRecPosition()
				}else{
					getRecPosition("first")
				}
				$("#searchinput1").val(jobdata.RecentPosition);
				//擅长
				if(jobdata.BestIn!=""){
				var BestIns=jobdata.BestIn.split(",")
				for(var i=0;i<BestIns.length;i++){
					var item = document.createElement("li")
					item.innerHTML = '<span>' + BestIns[i] + '</span>' +
						'<img onclick="deleteitem(this)" src="/images/close.png" >'
					var con = $("#searchli").parent()[0]
					var search =document.getElementById("searchli")
					item.className = "ablilityitem"
					con.insertBefore(item, search)
				}
				}
				workYear=jobdata.WorkYear
				if(jobdata.WorkYear=="01"){
					$($(".year-text")[0]).addClass("item-active")
				}else if(jobdata.WorkYear=="02"){
					$($(".year-text")[1]).addClass("item-active")
				}else if(jobdata.WorkYear=="03"){
					$($(".year-text")[2]).addClass("item-active")
				}else if(jobdata.WorkYear=="04"){
					$($(".year-text")[3]).addClass("item-active")
				}
				//工作地点
				if(jobdata.WorkPlace!=""){
				var WorkPlaces=jobdata.WorkPlace.split(",")
				for(var i=0;i<WorkPlaces.length;i++){
					var item = document.createElement("li")
					item.innerHTML = '<span>' + WorkPlaces[i] + '</span>' +
						'<img onclick="deleteitem(this)" src="/images/close.png" >'
					var con = $("#searchli1").parent()[0]
					var search =document.getElementById("searchli1")
					item.className = "locationitem"
					con.insertBefore(item, search)
				}
				}
				$("#name").val(jobdata.AllName);
				$("#email").val(jobdata.Email);
				$("#phone").val(jobdata.Tel)
			}
			else if(Linkin){
					$(".right").hide()
					$(".errorCon").show()
					$(".dropdown-toggle").hide()
					$(".dropdownbtn").show()
				$(".job-rec").show();
				$(".resume-start").hide()
				$(".resume-result").css("display","table");
				$(".reset").hide();
				$(".linked").show()
				hideLoading()
			}
			else{
				$(".job-rec").show();
				$(".reset").show()
				$(".resume-start").css("display","table")
				hideLoading()
			}
			if(fromLinkin&&!resumeUrl){
				$(".job-rec").hide()
				step=1;
				handlestep()
			}
			fromLinkin=false
		},
		error: function(errors) {
			hideLoading()
		}
	});
}
//获取感兴趣内容
function getPositionType() {
	$(".categoriesCon").hide()
	let data = {
		pageIndex: 1,
		pageSize: 9999,
		sortName: "CreatedTime",
		sortOrder: "desc"
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/PositionType/GetListBySC",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			let data = res.rows;
			let html = "";
			for (var i = 0; i < data.length; i++) {
				var classname=""
				if(jobdata.JobId){
					var InterestedTypes=jobdata.InterestedType.split(",")
					for(var j=0;j<InterestedTypes.length;j++){
						if(parseInt(InterestedTypes[j]) == data[i].TypeId){
							classname="item-active";
						}
					}
				}
				// console.log(classname)
				html += '<div class="categories-item">' +
					'<span class="item-text categories-text '+classname+'" onclick="chooseIntrin(this)" id="' + data[i].TypeId + '">' + data[i].TypeName +
					'</span>' +
					'</div>';
			}
			$(".categoriesCon").show().html(html)
		},
		error: function(errors) {

		}
	});
}
//获取擅长技能
function getSkills(NameLike) {
	let data = {
		skillNameLike: NameLike,
		pageIndex: 1,
		pageSize: 9999,
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/Skill/GetListBySC",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			let data = res.rows;
			let abs=$(".ablilityitem");
			for(var i=0;i<abs.length;i++){
			data=data.filter(function (item) {
				return item.SkillName.trim().toLowerCase()!=$(abs[i]).text().trim().toLowerCase();
			});
			}
			let html = "";
				if (NameLike) {
					if (data.length == 0) {
						html = '<li class="search-list-item" >没有结果</li>';
						}
						else{
					for (var i = 0; i < data.length; i++) {
						html += '<li class="search-list-item" onclick="chooseitem(this,\'' + "searchli" + '\')" >' + data[i].SkillName +
							'</li>';
					}
					}
					$(".serachlist2").show().html(html)
				} else {
					for (var i = 0; i < data.length; i++) {
						html += '<span class="ability-list-item" onclick="chooseitem(this,\'' + "searchli" + '\')">' + data[i].SkillName +
							'<i class="icon icon-plus add"></i></span>';
					}
					$(".recomend-ability-list").show().html(html)
				}
		},
		error: function(errors) {

		}
	});
}
//获取最近工作
function getRecentJobs(NameLike) {
	if (NameLike == "") return;
	let data = {
		jobNameLike: NameLike,
		pageIndex: 1,
		pageSize: 9999,
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/JobList/GetListBySC",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			let data = res.rows;
			let html = "";
			if (data.length == 0) {
				html = '<li class="search-list-item">没有结果</li>';
			} else {
				for (var i = 0; i < data.length; i++) {
					html += '<li class="search-list-item" onclick="choosejob(this)">' + data[i].JobName + '</li>';
				}
			}
			$("#serachlist1").show().html(html)
		},
		error: function(errors) {

		}
	});
}
//获取工作地点
function getPositionArea(NameLike) {
	if (NameLike == "") return;
	let data = {
		areaNameLike: NameLike,
		pageIndex: 1,
		pageSize: 9999,
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/PositionArea/GetListBySC",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			let data = res.rows;
			let html = "";
			if (data.length == 0) {
				html = '<li class="search-list-item">没有结果</li>';
			} else {
				for (var i = 0; i < data.length; i++) {
					html += '<li class="search-list-item" id="'+data[i].AreaId+'" onclick="chooseitem1(this)">' + data[i].AreaName + '</li>';
				}
			}
			$(".serachlist3").show().html(html)
		},
		error: function(errors) {

		}
	});
}
//处理上传文件
function handleFile(obj) {
	var fileObj = $(obj)[0].files[0]; // js 获取文件对象
	// debugger
	if(!fileObj) return;
	var types=["pdf","docx","docx","txt"]
	var index = fileObj.name.lastIndexOf(".");  
	var filetype=fileObj.name.substring(index + 1, fileObj.name.length)
	if(types.indexOf(filetype)==-1){
		showmodel(5);
		return;
	}
	showLoading()
	var url = domainUrl + "/adnim/api/Upload/Post"; // 接收上传文件的后台地址
	var form = new FormData(); // FormData 对象
	var xhr;

	form.append("file", fileObj); // 文件对象
	xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
	xhr.open("post", url, true); //post方式，url为服务器请求地址，true 该参数规定请求是否异步处理。
	//  xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	xhr.onload = function(e) {
		hideLoading()
		var ts = JSON.parse(e.target.responseText);
		if(ts.state==-1){
			alert(ts.msg);
			return;
		}
		resumeUrl = ts.rows[0];
		$(".resume-step").hide()
		SaveCustomJobMark("last");
		getJobCustomization()
		if(jobdata.Email||jobdata.Tel){
			if(Linkin){
				showmodel(4)
			}
			else{
				showmodel(2)
			}
		}
		else{
			showmodel(1)
		}
		
	} //请求完成

	xhr.send(form); //开始上传，发送form数据
}
//保存职位定制
function SaveCustomJobMark(flag) {
	let items = $(".categories-text.item-active")
	var interestedTypes = "",bestIns="",workPlaces=""
	for (var i = 0; i < items.length; i++) {
		interestedTypes += $(items[i]).attr("id") + ","
	}
	interestedTypes = interestedTypes.substring(0, interestedTypes.length - 1);

	var ablilityitem = $(".ablilityitem")
	for (var i = 0; i < ablilityitem.length; i++) {
		bestIns += $(ablilityitem[i]).find("span").text().trim() + ","
	}
	bestIns = bestIns.substring(0, bestIns.length - 1);
	
	var locationItem = $(".locationitem")
	for (var i = 0; i < locationItem.length; i++) {
		workPlaces += $(locationItem[i]).find("span").text().trim() + ","
	}
	workPlaces = workPlaces.substring(0, workPlaces.length - 1);
	var email = ($("#Modal1").css("display")=="block")?$("#email1").val():$("#email").val()
	var tel = ($("#Modal1").css("display")=="block")?$("#phone1").val():$("#phone").val();
	
	if(!interestedTypes&&!$("#searchinput1").val()&&!bestIns&&!workYear&&!workPlaces&&!$("#name").val()
	&&!email&&!tel&&!resumeUrl){
		// console.log("没有填写内容")
		if(flag=="last"){
			$(".submit-heading.errorCon").show();
			$(".submit-heading.right").hide()
		}
		return;
	}
	let data = {
		userId: localStorage.getItem("UserId"),
		resumeUrl: resumeUrl, //简历
		isReciveMsg: $("#ReciveMsg").is(":checked"), //是否想要获得消息
		linkCode: "", //领英账号
		interestedType: interestedTypes, //感兴趣的类型
		recentPosition: $("#searchinput1").val(), //最近的职位
		isStart: $("#startjob").is(":checked"), //是否刚开始职业生涯
		bestIn: bestIns, //最擅长
		workYear: workYear, //工作经验
		workPlace: workPlaces, //工作地点
		allName: $("#name").val(), //姓名
		email:email, //邮箱
		tel: tel, //手机号
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/JobCustomization/SaveCustomJobMark",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			if(res.rows){
			jobdata=res.rows[0]
			}
			isSubmit=true;
			if(flag=="last"){
				getRecPosition()
			}
			if(flag=="submit"){
				getJobCustomization()
			}
		},
		error: function(errors) {

		},
	});
}
//获取推荐职位
function getRecPosition(flag) {
	// debugger
	
	showLoading()
	$(".recomend-box").hide()
	let data = {
		userId: localStorage.getItem("UserId"),
		pageIndex: 1,
		pageSize: 9999,
		// sortName: "CreatedTime",
		// sortOrder: "desc"
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/Position/PositionRecommend",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			hideLoading()
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			if(flag=="first"){
				$(".job-rec").show();
				}
			$(".errorCon").hide()
			$(".right").show()
			$(".resume-start").hide()
			$(".resume-result").css("display","table");
			if(Linkin){
				$(".linked").show()
				$(".reset").hide()
			}
			if(resumeUrl){
				$(".dropdown-toggle").show();
				$(".dropdownbtn").hide()
				$(".icon-error").hide();
				$(".reset").hide()
				if(jobdata.Email){
					$(".resettext").show();
					$(".resumeUrl").hide();
					setTimeout(function(){
						$(".error").attr("style","display:none !important");
					},0)
				}
				if(Linkin){
					$(".resettext").hide()
				}
			}else{
				$(".errorCon").hide()
			}
			let data = res.data;
			data=data.filter(function (item) {
			     return item.JobType==jobType;
			    });
			if (data.length == 0) {
				$(".right").hide()
				$(".errorCon").show()
				if(jobdata.ResumeUrl==""){
					$(".dropdown-toggle").hide()
					$(".dropdownbtn").show()
				}
				return;
			}
			if(jobType=='03'){
				hideLoading()
				return
			}
			$(".recomend-box").show()
			let html = "",
				collecthtml = "";
			for (var i = 0; i < data.length; i++) {
				if(!data[i].msgList) {
					data[i].msgList={
						TypeName:"",
						IsCollection:0
						
					}
				}
				// else{
				if (data[i].msgList.IsCollection == "1") {
					collecthtml = '<div class="collect" onclick="deletecollection(\'' + data[i].msgList.CollectiId +'\',\''+ data[i].PositionId +'\',this)"><img src="/images/collect-check.png"></div>'
				} else {
					collecthtml = '<div class="collect" onclick="collectPosition(\'' + data[i].PositionId +
						'\',this)"><img src="/images/collect-uncheck.png"></div>'
				}
				html += '<li><div>' +
					'<a href="/jobDetail-professional-'+ data[i].PositionId +'.html?PositionId='+ data[i].PositionId + '"><div class="title">' + data[i].PositionTitle + '</div></a>' +
					'<div class="job-info">' +
					'<i class="icon icon-thick-location"></i>' + data[i].WorkCountry + ',' + data[i].WorkProvince + ',' + data[i].WorkCity +
					'</div>' +
					'<p>' +
					'<span>' + data[i].msgList.TypeName + '</span>' +
					'<span><i class="icon icon-thick-timer" style="padding-left: 10px;"></i>' + data[i].WorkTime + '</span>' +
					'</p>' +
					'<div class="posted-date">' +
					'<i class="icon icon-time" style="padding-left: 10px;"></i>' + data[i].PostTime +
					'</div>' +
					collecthtml +
					'<div class="description au-target">' +
					getdesc(data[i].PositionCutDescString)+'</div>' +
					'</div>' +
					'</li>';
			// }
			}
			$(".recomend-box ul").show().html(html)
		},
		error: function(errors) {
			hideLoading()
		}
	});
}
//收藏职位
function collectPosition(positionId, target) {
					if(!localStorage.getItem("Cchecked")){
						showCookie();
						return
					}
	if ($(target).hasClass("active")) {
		return;
	}
	let data = {
		positionId: positionId,
		userId: localStorage.getItem("UserId")
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/PositionCollection/PostCollection",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			$(target).removeAttr("onclick").attr("onclick","deletecollection('"+res.rows[0].CollectionId+"','"+positionId+"',this)")
			$(target).addClass("active")
			$(target).find("img").attr("src", "/images/collect-check.png")
			getCollectionList(jobType)
		},
		error: function(errors) {

		}
	});
}
//删除收藏职位
function deletecollection(collectionId, positionId,target) {
					if(!localStorage.getItem("Cchecked")){
						showCookie();
						return
					}
	let data = {
		collectionId: collectionId
	}
	$.ajax({
		type: "post",
		url: domainUrl + "/hrapi/api/PositionCollection/Delete",
		contentType: "application/json",
		data: JSON.stringify(data),
		dataType: 'JSON',
		success: function(res) {
			if(res.state==-1){
				alert(res.msg);
				return;
			}
			$(target).removeAttr("onclick").attr("onclick","collectPosition('"+positionId+"',this)")
			$(target).removeClass("active")
			$(target).find("img").attr("src", "/images/collect-uncheck.png")
			getCollectionList(jobType)
		},
		error: function(errors) {

		}
	});
}
