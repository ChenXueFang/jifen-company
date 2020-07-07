using Common.Object.Class;
using EntityClass;
using PostSharp.Aspects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Common.UI.JQGrid;
namespace Common.Object.Attribute
{
    [Serializable]
    public class HttpRequestAOPLog : PostSharp.Aspects.OnMethodBoundaryAspect
    {

        public override void OnEntry(MethodExecutionArgs args)
        {
            try
            {

           
                //logger.Debug("用Log4Net写入数据库日志");
                //logger.Error("这是一个错误日志");

                //logger.Fatal("这是一个致命的错误日志");

                //logger.Warn("这是一个警告日志");

                Log l = new Log("AOPFront");
                StringBuilder form = new StringBuilder();
        
                    
                    if (System.Web.HttpContext.Current.Request.Form.Count > 0)
                    {
                        form.Append("form:[");
                        foreach (var z in System.Web.HttpContext.Current.Request.Form.Keys)
                        {
                            form.Append("{" + z.ToString() + ":" + System.Web.HttpContext.Current.Request.Form[z.ToString()].ToString() + "},");
                        }
                        form.Append("]");
                    }
                    if (System.Web.HttpContext.Current.Request.Files.Count > 0)
                    {
                        form.Append(",file:[");

                        foreach (var z in System.Web.HttpContext.Current.Request.Files.Keys)
                        {
                            form.Append("{" + z.ToString() + ":" + System.Web.HttpContext.Current.Request.Files[z.ToString()] + "},");
                        }
                        form.Append("]");
                    }
        
                
                AOPLog log = new AOPLog() {
                    AbsoluteUri = System.Web.HttpContext.Current.Request.Url.ToString(),
                    FromString = form.ToString(),
                    IP = HttpContext.Current.Request.UserHostAddress,
                    LevelInfo = 1,
                    PageName = HttpContext.Current.Request.Path,
                    SessionID = HttpContext.Current.Session.SessionID,
                    UserID = HttpContext.Current.Session[ConfigureClass.SessionAdminString] == null ? "" : ((UserList)HttpContext.Current.Session[ConfigureClass.SessionAdminString]).ID.ToString(),
                    _Op = HttpContext.Current.Request.QueryString["_op"].ToStringNoNull("")

                };

                if (log._Op== "login" || log._Op== "usermodifypassword")
                    log.FromString = "";
                log.SaveAsync();
                l.Write("进入 " + System.Web.HttpContext.Current.Session.SessionID + " " + System.Web.HttpContext.Current.Request.Url.PathAndQuery + form.ToString());
            }
            catch(Exception ex) {

            }

            base.OnEntry(args);
        }

        public override void OnException(MethodExecutionArgs args)
        {
            Log l = new Log("AOPFrontERROR");
            l.Write("出错 " + System.Web.HttpContext.Current.Session.SessionID + " " + System.Web.HttpContext.Current.Request.Url.PathAndQuery + " " + args.Exception.Message);

            base.OnException(args);
        }
        //public override void OnException(MethodExecutionArgs args)
        //{



        //    base.OnException(args);
        //}
        public override void OnExit(MethodExecutionArgs args)
        {
            try
            {
                Log l = new Log("AOPFront");
                l.Write("离开 " + System.Web.HttpContext.Current.Session.SessionID + " " + System.Web.HttpContext.Current.Request.Url.PathAndQuery);
            }
            catch { }

    
            base.OnExit(args);
        }



    }
}
