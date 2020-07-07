using EntityClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web.SessionState;

namespace Common.Object.Class
{
    public class BaseLoginHandler : BaseHandler, IRequiresSessionState
    {
        protected override bool HasPermission()
        {
            bool result = true;
            //JsonResult jr = new JsonResult();


            //if (!Primer.Web.App_Code.PrimerWeb.IsCustomerLogin())
            //{
            //    result = false;

            //    jr.msg = "请先登录！";
            //    jr.success = false;
            //    jr.url = "login.aspx";
            //    jr.ToJson();
            //}

            return result;
        }

        protected  int UserId {
            get { 
            try {
                var user = (UserList)Context.Session[ConfigureClass.SessionAdminString];
                return user.ID;
            }

            catch { }
            return 0;
            }
        }
        protected UserList User
        {
            get { 
            try
            {
                var user = (UserList)Context.Session[ConfigureClass.SessionAdminString];
                return user;
            }

            catch { }
            return null;
            }
        }
    }
}
