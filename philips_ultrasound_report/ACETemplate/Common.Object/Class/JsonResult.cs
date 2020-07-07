using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Newtonsoft.Json;
using Common.Json;
namespace Common.Object.Class
{
    public class JsonResult
    {
        //{"success": true, "state":"1,2,3,4,5","url":"回调链接","msg":"\u56de\u8c03\u4fe1\u606f"}
        /// <summary>
        /// 是否成功
        /// </summary>
        public bool success { get; set; }

        /// <summary>
        /// 返回不同状态，比如1：阻止，2：删除，3：通过
        /// </summary>
        public string status { get; set; }

        /// <summary>
        /// 提示信息
        /// </summary>
        public string msg { get; set; }

        public Int64 pageCount { get; set; }
        /// <summary>
        /// 数据
        /// </summary>
        public object data { get; set; }

        public string url { get; set; }

        
        /// <summary>
        /// 更新
        /// </summary>
        public void ToJson()
        {
            UI.JQGrid.FiterOrContain contain = new UI.JQGrid.FiterOrContain(HttpContext.Current.Request);
            if (contain.FiterList != null) {
                ToJson(contain.FiterList, contain.IsFiter);
            }
            else { 
            HttpContext.Current.Response.Write(JsonConvert.SerializeObject(this));
            HttpContext.Current.ApplicationInstance.CompleteRequest();
            }
            //HttpContext.Current.Response.End();
        }
        public void ToJson(string[] filedlist, bool isFiter)
        {
            if (isFiter)
            {
                HttpContext.Current.Response.Write(this.ToJson<JsonResult>(filedlist));

            }
            else
            {
                string[] str = { "success", "data" }; //加入2个参数
                filedlist.ToList().AddRange(str);
                HttpContext.Current.Response.Write(this.ToJson2<JsonResult>(filedlist));
            }
            HttpContext.Current.ApplicationInstance.CompleteRequest();

        }


    }
}