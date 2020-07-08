<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Detail.aspx.cs" Inherits="wechat.MyWechat.SurveyInfo.ArticelDetail" %>

<!DOCTYPE html>

<html xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <title>文章详情</title>
    <meta name="viewport" content="width=device-width,initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />
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
        <%--回到顶部--%>
        <a class="drawBtn" href="javascript:window.scrollTo(0,0)">回到<br />顶部</a>
        <!-- 列表显示按钮 -->
        <%--<img src="images/drawBtn.png" @click="drawer = true" class="drawBtn">--%>
        <!-- 抽屉 -->
        <el-drawer
        :visible.sync="drawer"
        direction="ltr"
        :before-close="handleClose"
        size="65%">
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

        <p class="titleTop">{{essayDetails.Title}}</p>
        <div>
            <span>{{essayDetails.AddTime?essayDetails.AddTime.substring(0, 10):''}} </span>
            <span style="color: #6284a6;padding-left: 5px;"> {{catalogType}}</span>
        </div>
        <div class="essayCon" v-html='essayDetails.ArticleContent'></div>
        <div class="readNum">阅读 {{essayDetails.ReadCount?essayDetails.ReadCount:0}}</div>
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
            drawer: false,
            catalogList: [], // 目录列表 树形数据
            CatalogIdArr: 1, //选中的目录
            defaultProps: {
                children: 'children',
                label: 'label',
            },
            essayDetails: {},
            loading: true,
            catalogType: '',
        },
        created: function () {  
            this.loading=true
            if(this.requestUrl('CatalogIdArr')){
                this.CatalogIdArr = parseInt(this.requestUrl('CatalogIdArr')) //接收到的字符串转数字
                this.openid = this.requestUrl('openid') //接收到的字符串转数字
            }
            this.getDetails();
            this.getCatalogList();
        },
        methods: {
            // 关闭抽屉
            handleClose(done) {
                done();
            },
            // 树形 目录选中
            handleNodeClick(data) {
                if(!data.children || data.children.length==0){
                    this.drawer = false //关闭抽屉
                    // 跳转到列表页
                    window.location.href = '/Article/list.aspx?openid='+this.openid+'&CatalogIdArr='+data.CatalogId
                }
                // console.log(data.CatalogId,'树形 目录选中');
            },
            // 获取文章详情
            getDetails(){
                var that=this;
                var articleId = this.requestUrl('ArticleId')
                $.ajax({
                    url: '/handler/ArticleHandler.ashx?op=Article&',
                    data: {ArticleId:articleId},
                    type: 'GET',
                    beforeSend: function () { that.loading = true },
                    success: function (result) {
                        that.loading = false
                        that.essayDetails = JSON.parse(result).data;
                        var catalogTypeStr = that.essayDetails.CatalogIds
                        var catalogType = that.essayDetails.ArticleTags
                        that.catalogType = catalogType?catalogType.replace(/^,|,$/gi, ''):''   //文章标签
                        if(catalogTypeStr && catalogTypeStr.indexOf(',')!=-1){
                            that.catalogTypeList = catalogTypeStr.split(",") //所属分类，在目录列表中筛选值
                        }else{
                            that.catalogTypeList = catalogTypeStr
                        }
                        // console.log(that.essayDetails,'文章详情++++++')
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
                        var tempcatalogList = JSON.parse(result).rows; //平级目录列表
                        var catalogTypeList = that.catalogTypeList
                        // var catalogTypeList = [1,61]

                        // 根据文章详情catalogTypeList，筛选所属分类
                        // var typeArr = []
                        // for(i in catalogTypeList){
                        //     for(k in tempcatalogList){
                        //         if(catalogTypeList[i] == tempcatalogList[k].CatalogId){
                        //             typeArr.push(tempcatalogList[k].CatalogName) //根据CatalogIds筛选出来的目录名[]
                        //         }
                        //     }
                        // }
                        // that.catalogType = typeArr.join(","); //所属分类(文章分类)

                        //遍历接口返回数据
                          var result = [];
                          for (var item of tempcatalogList) {
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
                    },
                    error: function () {
                        that.loading = false
                    }
                });
            },
            // 树形数据拼凑 
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
#surverWrap{
    padding: 0.2rem;
    background: #fff;
    color: #8c8c8c;
    font-size: 0.15rem;
    min-height: 5rem;
    word-break:break-all;
}
#surverWrap::-webkit-scrollbar {
    display: none !important;
}
.inner-container {
    position: absolute;
    left: 0;
    overflow-x: hidden;
    overflow-y: scroll;
}

/* 只针对谷歌浏览器*/
body::-webkit-scrollbar {
    display: none;
}
.titleTop{
    font-size: 0.2rem;
    color: #0f0f0f;
    margin-bottom: 0.1rem;
}
.essayCon{
    width: 100%;
    box-shadow: 0 0 0.1rem #dbdbdb;
    margin-top: 0.4rem;
    padding: 0.1rem;
    box-sizing: border-box;
}
.readNum{
    color: #454545;
    margin-top: 0.3rem;
}
.drawBtn{
    width: 0.5rem;
    height: 0.5rem;
    position: fixed;
    bottom: 1rem;
    right: 0.2rem;
    z-index: 99999999 !important;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    background:#4577be;
    color:#fff;
    font-size: 0.12rem;
    text-decoration:none;
}
.el-tree-node__expand-icon.expanded,.el-tree-node__content>.el-tree-node__expand-icon {
    font-size: 0.2rem;
}
</style>