using Castle.ActiveRecord;
using Castle.Core.Configuration;
using Common.Object;
using EntityClass;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Timers;
using System.Web;
using System.Web.Security;
using System.Web.SessionState;
using EntityClass;

namespace Web
{
    public class Global : System.Web.HttpApplication
    {

        protected void Application_Start(object sender, EventArgs e)
        {
            Castle.ActiveRecord.Framework.IConfigurationSource source = new Castle.ActiveRecord.Framework.Config.XmlConfigurationSource(AppDomain.CurrentDomain.BaseDirectory + "\\ARConfig.config");

            Castle.ActiveRecord.ActiveRecordStarter.Initialize(Assembly.Load("EntityClass"), source);
            IConfiguration dbConfig = source.GetConfiguration(typeof(ActiveRecordBase));
            foreach (IConfiguration child in dbConfig.Children)
            {
                if (child.Name == "connection.connection_string")
                {
                    BaseItem.ConnectString = child.Value;
                    // Primer.Common.SQLHelperEx.ConnectionString = child.Value;
                    //Common.Utility.DbHelperSQL.connectionString = child.Value;
                }
            }
        }

    
        protected void Session_Start(object sender, EventArgs e)
        {

        }

        protected void Application_BeginRequest(object sender, EventArgs e)
        {

        }

        protected void Application_AuthenticateRequest(object sender, EventArgs e)
        {

        }

        void Application_Error(object sender, EventArgs e)
        {
            //在出现未处理的错误时运行的代码
            Exception objExp = HttpContext.Current.Server.GetLastError();
          //  string username = "";
          //  string userid = "";
     
            //
          //  Aotain114.Public.LogHelper.WriteLog("\r\n用户ID:" + userid + "\r\n用户名:" + username + "\r\n客户机IP:" + Request.UserHostAddress + "\r\n错误地址:" + Request.Url + "\r\n异常信息:" + Server.GetLastError().Message, objExp);

        }

        protected void Session_End(object sender, EventArgs e)
        {

        }

        protected void Application_End(object sender, EventArgs e)
        {

        }
    }
}