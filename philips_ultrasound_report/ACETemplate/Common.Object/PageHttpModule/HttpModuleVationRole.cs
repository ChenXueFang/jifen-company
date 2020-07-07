using Common.Object.Setting;
using EntityClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;

namespace Common.Object.PageHttpModule
{
    public class HttpModuleVationRole : IHttpModule, IRequiresSessionState
    {

       
        public void Dispose()
        {
           
        }

        public void Init(HttpApplication context)
        {

         //   context.BeginRequest += new EventHandler(Application_BeginRequest);
            context.AcquireRequestState += new EventHandler(Application_BeginRequest);
        }
        public void Application_BeginRequest(object sender, EventArgs e)
        {
            //权限验证
            HttpApplication app = (HttpApplication)sender;
            var v = HttpContext.Current.Request;

            //if (!app.Context.Handler.ToString().ToLower().EndsWith("aspx")) {

            //    return;
            //}

            if (v.Path.ToLower().IndexOf(".aspx") == -1)
            {
                return;
            }

            if (v.Path.ToLower().IndexOf("adnim") > -1)
            {
                //权限验证

                String x = MenuList.GetMenu();


                var dy = Newtonsoft.Json.JsonConvert.DeserializeObject<List<MenuList>>(x);


                AOPLog log = new AOPLog()
                {
                    AbsoluteUri = System.Web.HttpContext.Current.Request.Url.ToString(),
                    FromString = "",
                    IP = HttpContext.Current.Request.UserHostAddress,
                    LevelInfo = 2,
                    PageName = HttpContext.Current.Request.Path,
                    SessionID = HttpContext.Current.Session.SessionID,
                   // UserID = HttpContext.Current.Session[ConfigureClass.SessionAdminString] == null ? "" : ((UserList)HttpContext.Current.Session[ConfigureClass.SessionAdminString]).ID.ToString(),
                    //_Op = HttpContext.Current.Request.QueryString["_op"].ToStringNoNull("")

                };
        


                //如果包含该文件就验证权限

                foreach (var z in dy)
                {

                    foreach (var h in z.Menu)
                    {
              
                        if (v.Path.ToLower().IndexOf(h.Url.ToLower()) > -1)
                        { //包含该页面

                            var user = HttpContext.Current.Session[Common.Object.Class.ConfigureClass.SessionAdminString] ;

                            if (h.Roles==0)
                            {
                                goto end;
                            }
                            if (user == null)
                            {
                                log.Result = "未登录";
                                log.SaveAsync();
                                HttpContext.Current.Response.Charset = "utf-8";
                                HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
                                HttpContext.Current.Server.Transfer("~/adnim/login.aspx", true);
                                //HttpContext.Current.Response.Write("未登陆");
                                //  HttpContext.Current.Response.End();
                                return;
                            }
                            int r = int.Parse(h.Roles.ToString());
                            UserList user1 = user as UserList;
                            if ((user1.UserRoles & r) == r)
                            {
                                goto end;
                            }
                            log.Result = "权限不够";
                            log.SaveAsync();
                            HttpContext.Current.Response.Charset = "utf-8";
                            HttpContext.Current.Response.ContentEncoding = System.Text.Encoding.UTF8;
                            HttpContext.Current.Response.Write("权限不够"); HttpContext.Current.Response.End();
                            return;

                            //验证权限
                        }
                    }
                }
                end:
                log.Result = "请求成功";
                log.SaveAsync();
            }

            else
            {
            }
        
            return;

        }
    }
}
