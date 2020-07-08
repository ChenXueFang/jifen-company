<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Default.aspx.cs" Inherits="wechat.MyWechat.SurveyInfo.ArticelList" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">

<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>文章列表</title>
    <meta name="viewport"
        content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style type="text/css">
        [v-cloak]{
            display:none !important;
        }
    </style>  
    <link rel="stylesheet" href="css/style.css" />
    <link rel="stylesheet" href="css/element2.css" />
    <Content Include="css\fonts\element-icons2.woff" />
</head>
<body>
    <div id="surverWrap" v-loading="loading" v-cloak>
        <div class="header">
            <img :src="BannerUrl" />
        </div>
        <div class="content infinite-list-wrapper">
            <!-- 列表显示按钮 -->
            <img src="images/drawBtn.png" @click="drawer = true" class="drawBtn">
            <!-- 抽屉 -->
            <el-drawer
            :visible.sync="drawer"
            direction="ltr"
            :before-close="handleClose"
            size="65%">
                <div class="treeTitle">分类列表</div>
                <!-- 树形 -->
                <el-tree 
                :data="catalogList" 
                :props="defaultProps"
                node-key="CatalogId"
                default-expand-all
                @node-click="handleNodeClick">
                <span class="custom-tree-node" slot-scope="{ node, data }">
                    <span>{{ data.CatalogName }}</span>
                </span>
                </el-tree>
            </el-drawer>
            
            <ul class="listUl list" v-infinite-scroll="load" infinite-scroll-disabled="disabled" style="height: 7rem;overflow: auto;">
                <!-- 文章列表 -->
                <li v-for="(item,index) in ArticleList" :key="index" v-on:click='toDetails(item.ArticleId)'>
                    <img :src="item.LogoUrl" class="listImg">
                    <div>
                        <p class="listTitle">{{item.Title}}</p>
                        <div class="description">{{item.Description}}</div>
                    </div>
                </li>
                
                <p v-if="loading2" style="text-align: center;line-height: 0.4rem;">加载中...</p>
                <p v-if="noMore" style="text-align: center;line-height: 0.4rem;">没有更多了</p>
            </ul>
        </div>
    </div>
</body>

</html>
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/vue2.js"></script>
<script src="js/element2.js"></script>
<script>
    var app = new Vue({
        el: "#surverWrap",
        data: {
            PageIndex: 1,
            PageSize:8,
            total: 1,
            drawer: false,
            catalogListRaw: [], // 目录列表 树形数据
            catalogList: [], // 目录列表 树形数据
            ArticleList: [], // 文章列表
            defaultProps: {
                children: 'children',
                label: 'label',
            },
            loading: true, //加载动画
            loading2: false, //加载动画
            CatalogIdArr: 1, //选中的目录
            openid:'',
            BannerUrl: '', 
        },
        computed: {
            noMore () {
                return this.ArticleList.length >= this.total
            },
            disabled () {
                return this.loading2 || this.noMore
            }
        },
        created: function () {  
            if(this.requestUrl('CatalogIdArr')){
                this.CatalogIdArr = parseInt(this.requestUrl('CatalogIdArr')) //接收到的字符串转数字
                this.openid = this.requestUrl('openid') //接收到的字符串转数字
            }
            this.getCatalogList();
        },
        methods: {
            // 下拉加载
            load () {
                var that = this
                this.loading2 = true
                // 页码到达上限，不再调接口
                if(that.PageIndex >= that.total%that.PageSize){       
                    that.loading2 = false
                    return
                }else{
                    setTimeout (function(){
                        that.getArticleList()
                        that.loading2 = false
                    }, 2000)
                }
            },
            // 关闭抽屉
            handleClose(done) {
                done();
            },
            // 树形 目录选中
            handleNodeClick(data) {
                this.CatalogIdArr = data.CatalogId
                if(!data.children || data.children.length==0){
                    this.drawer = false //关闭抽屉
                    window.history.pushState('','','/Article/list.aspx?openid='+this.openid+'&CatalogIdArr='+data.CatalogId);
                    this.getArticleList();
                }
                // console.log(data,'树形 目录选中');
            },
            // 跳转到详情页
            toDetails(ArticleId){
                window.location.href = "/Article/Detail.aspx?openid="+this.openid+"&ArticleId=" + ArticleId
            },
            // 获取文章列表
            getArticleList(){
                var that=this;
                this.ArticleList=[]
                $.ajax({
                    url: '/handler/ArticleHandler.ashx?op=ArticleList&',
                    data: {
                        CatalogIdArr: this.CatalogIdArr,
                        PageIndex: this.PageIndex,
                        PageSize: this.PageSize
                    },
                    type: 'GET',
                    beforeSend: function () { that.loading = true },
                    success: function (result) {
                        // 一张banner图 目录banner图
                        for (var item of that.catalogListRaw) {
                            if(item.CatalogId == that.CatalogIdArr)
                                that.BannerUrl = item.CatalogBanner;
                        }
                        that.loading = false
                        that.loading2 = false
                        var dataList = JSON.parse(result);
                        that.ArticleList = that.ArticleList.concat(dataList.data),
                        that.total = dataList.total;
                        // 页码没有达到上限是才自增
                        if(that.PageIndex < that.total%that.PageSize){
                            that.PageIndex = that.PageIndex + 1
                        }

                        // console.log(that.ArticleList,'文章列表*******')
                    },
                    error: function () {
                        that.loading = false
                    }
                });
            },
            // 获取目录 
            getCatalogList(){
                var that=this;
                $.ajax({
                    url: '/handler/ArticleHandler.ashx?op=Catalog&',
                    data: { catalogid: that.CatalogIdArr },
                    type: 'GET',
                    beforeSend: function () { that.loading = true },
                    success: function (result) {
                        that.loading = false
                        var tempcatalogList = JSON.parse(result).rows;
                        that.catalogListRaw=tempcatalogList;

                        //遍历接口返回数据
                          var result = [];
                          for (var item of tempcatalogList) {
                        if(item.CatalogId == that.CatalogIdArr)
                            that.BannerUrl = item.CatalogBanner;
                            //判断是否为顶层节点
                            if (item.ParentId == null) {
                              var parent = {
                                CatalogId: item.CatalogId,
                                AddTime: item.AddTime,
                                CatalogName: item.CatalogName,
                                CatalogLogo: item.CatalogLogo,
                                CatalogBanner: item.CatalogBanner,
                                ParentId: item.ParentId,
                                CatalogLevel: item.CatalogLevel
                              };
                              parent.children =that.funCreateTree(item.CatalogId,tempcatalogList);
                              result.push(parent);
                            }
                          }
                       
                          //打印出result
                    //        console.log("生成树形结构.....");
                    //        console.log(result);
                         that.catalogList = result
                         that.getArticleList();
                    },
                    error: function () {
                        that.loading = false
                    }
                });
            },
            // 树形数据拼凑 
            CreateTreeJson() {
              //遍历接口返回数据
              var result = [];
              for (var item of this.catalogList) {
                //判断是否为顶层节点
                if (item.ParentId == null) {
                  var parent = {
                    CatalogId: item.CatalogId,
                    AddTime: item.AddTime,
                    CatalogName: item.CatalogName,
                    CatalogLogo: item.CatalogLogo,
                    CatalogBanner: item.CatalogBanner,
                    ParentId: item.ParentId
                  };
                  parent.children = this.funCreateTree(item.CatalogId, this.catalogList);
                  result.push(parent);
                }
              }
              //打印出result
        //        console.log("生成树形结构.....");
        //        console.log(result);
            },   
            funCreateTree(CatalogId, catalogList) {
              var childs = new Array();
              for (var arr of catalogList) {
                //循环获取子节点
                if (arr.ParentId == CatalogId) {
                  var child = {
                    CatalogId: arr.CatalogId,
                    AddTime: arr.AddTime,
                    CatalogName: arr.CatalogName,
                    CatalogLogo: arr.CatalogLogo,
                    CatalogBanner: arr.CatalogBanner,
                    ParentId: arr.ParentId,
                    CatalogLevel: arr.CatalogLevel
                };
                //获取子节点的子节点
                var childscopy = this.funCreateTree(child.CatalogId, catalogList); //递归获取子节点
                //console.log(childscopy)
                if (childscopy.length > 0) {
                  child.children = childscopy;
                }
                  childs.push(child);
                }
              }
              return childs;
            },
            // 接收页面传过来的参数
            requestUrl(paras) {
                var url = decodeURI(location.href);
                var paraString = url.substring(url.indexOf("?") + 1, url.length).split("&");
                var paraObj = {}
                for (i = 0; j = paraString[i]; i++) {
                    paraObj[j.substring(0, j.indexOf("=")).toLowerCase()] = j.substring(j.indexOf("=") + 1, j.length);
                }
                var returnValue = paraObj[paras.toLowerCase()];
                if (typeof (returnValue) == "undefined") {
                    return "";
                } else {
                    return returnValue;
                }
            },
            
        }
    });
</script>

<style type="text/css">
    [v-cloak]{
        display:none !important;
    }
    body {
        background: #fff;
    }
    body::-webkit-scrollbar {
        display: none !important;
    }
    #surverWrap::-webkit-scrollbar {
        display: none !important;
    }
    .infinite-list-wrapper::-webkit-scrollbar {
        display: none !important;
    }
    .el-drawer__open .el-drawer.ltr::-webkit-scrollbar {
        display: none !important;
    }
    .el-drawer__container::-webkit-scrollbar {
        display: none !important;
    }

    .header {
        background-color: #fff;
        height: auto;
    }

    .header img {
        width: 100%;
        height: 1.7rem;
        padding-top: 0;
    }
    .listUl{
        border-top: 2px solid #f3f3f3;
    }
    
    .listUl::-webkit-scrollbar {
        display: none !important;
    }
    
    .listUl li {
        display: flex;
        align-items: center;
        padding: 0.12rem;
        color: #a7a7a7;
        border-bottom: 2px solid #f3f3f3;
    }

    .listImg {
        width: 0.7rem;
        height: 0.7rem;
        margin-right: 0.1rem;
    }

    .listTitle {
        font-size: 0.16rem;
        color: #0f0f0f;
        margin-bottom: 0.05rem;
    }
    .el-drawer.ltr, .el-drawer.rtl, .el-drawer__container {
        overflow: scroll;
    }
    .drawBtn{
        width: 0.5rem;
        height: 0.5rem;
        position: fixed;
        bottom: 1rem;
        right: 0.2rem;
        z-index: 99999999 !important;
    }
    .el-loading-spinner {
        top: 33%;
    }
    .theme-loading{
        display: none;
        text-align: center;
        line-height: 0.3rem;
    }
    .el-tree-node__content {
        height: 0.4rem;
        font-size: 0.17rem;
    }
    .el-drawer__header {
        margin-bottom: 10px;
    }
    .description{
        word-break:break-all;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2; 
        line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .el-tree-node__expand-icon.expanded,.el-tree-node__content>.el-tree-node__expand-icon {
        font-size: 0.2rem;
    }
    .treeTitle{
        position:absolute;
        top: 2.5%;
        left: 5%;
        font-size: 0.2rem;
        font-weight: bold;
        color:#4577be;
    }
    .el-icon-close:before {
        color: #4577be;
        font-weight: bold;
    }
</style>