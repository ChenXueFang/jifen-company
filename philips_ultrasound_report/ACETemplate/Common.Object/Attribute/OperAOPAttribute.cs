using Common.Object.Class;
using PostSharp.Aspects;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Common.Object.Attribute
{
    [Serializable]
   public class OperAOPAttribute : PostSharp.Aspects.OnMethodBoundaryAspect
    {

        public string[] operlist = { "add" };
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
            try
            {
                if (!operlist.Contains(HttpContext.Current.Request["oper"].ToString()))
                {
                    new JsonResult
                    {
                        success = false,
                        msg = "权限不够"
                    }.ToJson();
                    HttpContext.Current.Response.End();
                }

            }
            catch { }
            base.OnEntry(args);
        }
    
        public override void OnExit(MethodExecutionArgs args)
        {
            // args.ReturnValue;
            base.OnExit(args);
        }
    }
}
