using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using PostSharp.Aspects;
using System.Web;
using Common.Object.Class;
using EntityClass;
using Common.Object.Data;
using Common.Object.Execption;

namespace Common.Object.Attribute
{
    [Serializable]
      public class UserListRoleAttribute : PostSharp.Aspects.OnMethodBoundaryAspect
    {
        public Data.UserRoleType type;
        public override void OnEntry(MethodExecutionArgs args)
        {
            // args.Method.get          
            //Arguments arguments = eventArgs.Arguments; 
            //  ParameterInfo[] parameters = eventArgs.Method.GetParameters(); 
            // for (int i = 0; arguments != null && i < arguments.Count; i++)
            // {
            //进入的参数的值 
            //      sb.Append(parameters[i].Name + "=" + arguments[i] + "");
            // }


            //判断请求方式;



            if (HttpContext.Current.Session[ConfigureClass.SessionAdminString] == null)
            {
                if (HttpContext.Current.Request.Path.IndexOf(".aspx") > -1)
                {
                    HttpContext.Current.Server.Transfer("login.aspx", true);
                }
                else if (HttpContext.Current.Request.Path.IndexOf(".ashx") > -1) {
                    throw new UserNotLoginExecption("未登陆");
                }
                else {
                    HttpContext.Current.Server.Transfer("login.aspx", true);
                }
            }
             var   user = (UserList)HttpContext.Current.Session[ConfigureClass.SessionAdminString];
             var roles = (UserRoleType)Enum.Parse(type.GetType(), user.UserRoles.ToString()) & type;

            if (roles != type) {
                HttpContext.Current.Response.Write("权限不够");
                HttpContext.Current.Response.End();
                //HttpContext.Current.Server.Transfer("login.aspx");
            }
            base.OnEntry(args);
        }
        public override void OnExit(MethodExecutionArgs args)
        {
           // args.ReturnValue;
            base.OnExit(args);
        }
    }
}
