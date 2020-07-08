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
    public partial class ArticelList : System.Web.UI.Page
    {
        protected string surveyJson = string.Empty;
        protected string openid = string.Empty;
        protected bool isDone=false;
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                tArticleInfo survey = new tArticleInfo();
                openid = RequestHelper.GetString("openid");

                //if (string.IsNullOrEmpty(openid))
                //{
                //    Response.Redirect(BaseConfig.DoMain() + "/IO/snsapi_base.aspx?returnurl=" + BaseConfig.DoMain() + "/SurveyInfo/Default.aspx");
                //    return;
                //}

                //using (var dbcontext = new wechat_admin())
                //{
                //    survey = GetArticleInfo(dbcontext);
                    
                //    surveyJson = JsonHelper.SerializeToString(survey);
                //}
            }
        }

        private tArticleInfo GetArticleInfo(wechat_admin dbcontext)
        {
            var sc = new tArticleInfoSC();
            sc.PageIndex = 1;
            sc.PageSize = 1;
            var model = tArticleInfo.SearchOne(sc, dbcontext);
            if (model == null)
            {
                model = new tArticleInfo();
                return model;
            }

           
            return model;
        }
    }
}