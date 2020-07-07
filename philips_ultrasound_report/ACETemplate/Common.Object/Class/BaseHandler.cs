using Common.Utility;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using System.Web.SessionState;
using NHibernate.Criterion;
using Common.UI.JQGrid;
using EntityClass;

namespace Common.Object.Class
{
    public class BaseHandler : IHttpHandler, IRequiresSessionState
    {
        public HttpContext Context { get; set; }
        public string OperationType { get; set; }

        [Common.Object.Attribute.HttpRequestAOPLog]
        public  virtual void ProcessRequest(HttpContext context)
        {
            // context.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            //// 响应类型  

            //// 响应头设置  
            // context.Response.Headers.Add("Access-Control-Allow-Headers", "x-requested-with,content-type");
            context.Response.Cache.SetNoStore();
            context.Response.ContentType = "text/plain";
            OperationType = context.Request[ConfigureClass.OperationTypeString] == null ? "" : context.Request[ConfigureClass.OperationTypeString].ToString();
            Context = context;
            try
            {
                if (context.Request.UrlReferrer != null &&
                    !HttpContext.Current.Request.Url.DnsSafeHost.Equals(context.Request.UrlReferrer.DnsSafeHost, StringComparison.OrdinalIgnoreCase))
                {
                    FailResut("非法请求");
                }
                if (HasPermission())
                {
                    //this.Option = context.Request["op"].ToString("");
                    this.Process(context);
                }
            }
            catch (System.Threading.ThreadAbortException)
            {
                //http://support.microsoft.com/kb/312629/zh-cn
            }
            catch (Execption.UserNotLoginExecption ex) {
                JsonResult jr = new JsonResult();
                jr.msg = "请先登录！";
                jr.success = false;
                jr.url = "login.aspx";
                jr.ToJson();
            }
            catch (Exception ex)
            {
                FailResut(ActiveRecordExtending.GetExceptionMessage(ex));
            }
          
        }
        protected virtual void Process(HttpContext context)
        {
            switch (this.OperationType.ToLower())
            {
                case "add":
                    _Add();
                    break;
                case "edit":
                    _Edit();
                    break;
                case "query":
                    _Query();
                    break;
                case "del":
                    _Del();
                    break;
            }

            //throw new NotImplementedException("还未添加处理逻辑");
        }

        protected virtual void _Add()
        {

        }
        protected virtual void _Edit()
        {

        }

        protected virtual void _Query()
        {

        }

        protected virtual void _Del()
        {

        }
        protected virtual bool HasPermission()
        {
            return true;
        }

        protected int GetUserId
        {
            get
            {
                if (HttpContext.Current.Session["UserId"] == null)
                {
                    return 0;
                }
                else
                    return Convert.ToInt32(HttpContext.Current.Session["UserId"]);
            }
        }
        protected UserList User
        {
            get
            {
                try
                {
                    var user = Newtonsoft.Json.JsonConvert.DeserializeObject<UserList>(Context.Session[ConfigureClass.SessionAdminString] + string.Empty);

                    return user;
                }

                catch { }
                return null;
            }
        }

        #region Result

        protected static void FailResut(string message)
        {
            JsonResult(false, message, null);
        }
        protected static void FailResut(string message, string url = "")
        {
            JsonResult(false, message, url);
        }

        protected static void SuccessResut<T>(T t, string[] filedList,bool isFiter) {
            new Common.Object.Class.JsonResult()
            {
                pageCount = 0,
                success = true,
                status ="OK" ,
                msg = "",
                url = "",
                data = t
            }.ToJson(filedList,isFiter);
        }
        protected static void SuccessResut(string message = "")
        {
            JsonResult(true, message, null);
        }
        protected static void SuccessResut(string message = "", string url = "")
        {
            JsonResult(true, message, url, null);
        }
        protected static void SuccessResut(object data, string url = "", string message = "")
        {
            JsonResult(true, message, url, data);
        }
        protected static void SuccessResut(long total, object data, string url = "", string message = "")
        {
            JsonResult(true, message, url, data, total);
        }
        protected static void JsonResult(bool success, string message, string url, object data = null, long total = 0)
        {
            new Common.Object.Class.JsonResult()
            {
                pageCount = total,
                success = success,
                status = success ? "OK" : "Fail",
                msg = message,
                url = url,
                data = data
            }.ToJson();
        }
     

        #endregion
        #region jqGrid Result
        protected static void SuccessGridResult<T>(T[] ary, int pageIndex = 1)
        {
            new Common.Object.Class.PagedResult<T>()
            {
                success = true,
                //total = ary.Length.ToString(),
                pageindex = pageIndex.ToString(),
                pagecount = ((ary.Length - 1) / ConfigureClass.PageSize + 1).ToString(),
                total = ((ary.Length - 1) / ConfigureClass.PageSize + 1).ToString(),
                msg = "",
                url = "",
                rows = ary
            }.ToJson();       
        }
        protected static void SuccessGridResult<T>(T[] ary, int pageIndex,int pagecount, long totalcount)
        {
            new Common.Object.Class.PagedResult<T>()
            {
                success = true,
                //total = ary.Length.ToString(),
                pageindex = pageIndex.ToString(),
                pagecount = pagecount.ToString(),
                total = totalcount.ToString(),
                msg = "",
                url = "",
                rows = ary
            }.ToJson();
        }

        protected static void SuccessGridResult<T>(Common.UI.JQGrid.jQGrid<T> jg, string[] filedList, bool isFiter) where T : class, new()
        {

            new Common.Object.Class.PagedResult<T>()
            {
                success = true,
                //total = ary.Length.ToString(),
                pageindex = jg.CurrentPage.ToString(),
                pagecount = jg.TotalPage.ToString(),
                total = jg.TotalRecord.ToString(),
                msg = "",
                url = "",
                rows = jg.JsonArray.ToArray()
            }.ToJson(filedList, isFiter);
        }

        protected static void SuccessGridResult<T>(Common.UI.JQGrid.jQGrid<T> jg) where T:class ,new()
        {

            new Common.Object.Class.PagedResult<T>()
            {
                success = true,
                //total = ary.Length.ToString(),
                pageindex = jg.CurrentPage.ToString(),
                pagecount = jg.TotalPage.ToString(),
                total = jg.TotalRecord.ToString(),
                msg = "",
                url = "",
                rows = jg.JsonArray.ToArray()
            }.ToJson();
  
        }


        protected static void SuccessGridResult<T>(List<dynamic> list , Common.UI.JQGrid.jQGrid<T> jg) where T : class, new()
        {


            new Common.Object.Class.PagedResult<dynamic>()
            {
                success = true,
                //total = ary.Length.ToString(),
                pageindex = jg.CurrentPage.ToString(),
                pagecount = jg.TotalPage.ToString(),
                total = jg.TotalRecord.ToString(),
                msg = "",
                url = "",
                rows = list.ToArray()
            }.ToJson();

        }
        #endregion
        #region none
        public bool IsReusable
        {
            get
            {
                return false;
            }
        }

        #endregion

#pragma region 数据操作
        protected ICriterion GetNoDeleteEq() {

            return  Expression.Eq("IsDelete", false);
        }
        protected ICriterion GetEnableEq()
        {
            return Expression.Eq("IsEnabled", true);
        }
        protected void GridValueWrite<T>() where T : class, new()
        {
            JqGridSearch<T> query = new JqGridSearch<T>(Context.Request);
            var result = query.Search();
            SuccessGridResult(result);
        }

        protected void GridValueWrite<T>(ICriterion defaultCriter) where T : class, new()
        {
            JqGridSearch<T> query = new JqGridSearch<T>(Context.Request, defaultCriter);
            var result = query.Search();
            SuccessGridResult(result);
        }
#pragma endregion


        protected bool Needforeignkey
        {
            get
            {
                return Context.Request.QueryString["foreignkey"].ToStringNoNull() == "" ? false : true;
            }
        }
        /// <summary>
        /// 默认true
        /// </summary>
        protected bool NeedCount
        {
            get
            {
                return Context.Request.QueryString["NoNeedCount"].ToStringNoNull() == "" ? true : false;
            }

        }

        /// <summary>
        /// 只需要获取外键的值，外键标记在table 字段备注为 type='select'
        /// </summary>
        protected bool NeedForeginValue {
            get
            {
                return Context.Request.QueryString["foreignvalue"].ToStringNoNull() == "" ? false : true;
            }
        }
    }
}
