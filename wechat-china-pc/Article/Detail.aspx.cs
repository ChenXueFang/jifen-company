using CommonLib;
using CommonLib.JsonHelper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using wechat.DBModel;
using wechat.DBModel.CRMDB;
using wechat.DBModel.surveyDB;
using wechat.MyWechat.Config;

namespace wechat.MyWechat.SurveyInfo
{
    public partial class ArticelDetail : System.Web.UI.Page
    {
        protected string dataJson = string.Empty;
        protected string openId = string.Empty;
        
        /// <summary>
        /// 
        /// </summary>
        /// <param name="sender"></param>
        /// <param name="e"></param>
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                tArticleInfo survey = new tArticleInfo();
                openId = RequestHelper.GetString("openid");

               

                using (var dbcontext = new wechat_admin())
                {
                    survey = GetArticleInfo(dbcontext);
                    if (survey==null)
                    {
                        return;
                    }

                    if (string.IsNullOrEmpty(openId))
                    {
                        var info = dbcontext.tWechatInfo.FirstOrDefault(a => a.wechatId == survey.wechatId);
                        if (info == null)
                        {
                            Response.Write("无对应的微信号。");
                        }
                        var url = H5News.NewsDefault.RedirectTo(info.BaseID);
                        Response.Redirect(url);

                        return;
                    }

                    var Id = CommonLib.RequestHelper.GetInt("ArticleId");
                    if (openId!="jftest")
                    {
                        var sql = $@"
update {nameof(tArticleInfo)} 
set {nameof(tArticleInfo.ReadCount)} = isnull({nameof(tArticleInfo.ReadCount)},0)+1
where {nameof(tArticleInfo.ArticleId)}={Id}";
                        dbcontext.Database.ExecuteSqlCommand(sql);
                        var ip = Request.UserHostAddress;

                        tArticleH5Log log = new tArticleH5Log();
                        log.openid = openId;
                        log.AddTime= DateTime.Now;
                        log.ArticleId = Id;
                        log.IP = ip;
                        log.LinkUrl = Request.RawUrl;
                        log.UserData = Request.UserAgent;
                        log.CreateAndFlush(dbcontext);
                    }
                    

                    dataJson = JsonHelper.SerializeToString(survey);

                   
                   
                }
            }
        }

        private tArticleInfo GetArticleInfo(wechat_admin dbcontext)
        {
            var sc = new tArticleInfoSC();
            var id = CommonLib.RequestHelper.GetInt("ArticleId");
            sc.ArticleIdArr = new int?[] { id };
            sc.PageIndex = 1;
            sc.PageSize = 1;
            var model = tArticleInfo.SearchOne(sc, dbcontext);
            if (model == null)
            {
                return model;
            }


            return model;
        }
    }
}