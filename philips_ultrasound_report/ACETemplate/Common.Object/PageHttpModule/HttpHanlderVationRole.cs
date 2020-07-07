using Common.Object.Setting;
using EntityClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using System.Web.SessionState;
using System.Web.UI;

namespace Common.Object.PageHttpModule
{
   public class HttpHanlderVationRole : PageHandlerFactory, IRequiresSessionState
    {


     

        public override IHttpHandler GetHandler(HttpContext context, string requestType, string virtualPath, string path)
        {
           
            var t=  base.GetHandler(context, requestType, virtualPath, path);
            return t;
        }
        public void Application_BeginRequest(HttpContext context)
        {
            //权限验证
        
            var v = context.Request;


            if (v.Path.ToLower().IndexOf(".aspx") == -1)
            {
                return;
            }

            if (v.Path.ToLower().IndexOf("adnim") > -1)
            {
                //权限验证

                String x = MenuList.GetMenu();
                var dy = Newtonsoft.Json.JsonConvert.DeserializeObject<List<MenuList>>(x);

                //如果包含该文件就验证权限

                foreach (var z in dy)
                {

                    foreach (var h in z.Menu)
                    {

                        if (v.Path.ToLower().IndexOf(h.Url.ToLower()) > -1)
                        { //包含该页面

                            var user = context.Session[Common.Object.Class.ConfigureClass.SessionAdminString];

                            if (h.Roles == 0)
                            {
                                goto end;
                            }
                            if (user == null)
                            {
                                HttpContext.Current.Response.Write("权限不够");
                                return;
                            }
                            int r = int.Parse(h.Roles.ToString());
                            UserList user1 = user as UserList;
                            if ((user1.UserRoles & r) == r)
                            {
                                goto end;
                            }
                            HttpContext.Current.Response.Write("权限不够");
                            return;

                            //验证权限
                        }
                    }
                }

            }

            else
            {
            }
            end:
            return;

        }

     
    }
}
