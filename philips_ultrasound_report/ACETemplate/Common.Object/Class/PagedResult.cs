using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Web;
using Common.Json;

namespace Common.Object.Class
{
    class PagedResult<T> 
    {
        public bool success { get; set; }
        public string msg { get; set; }
        public string url { get; set; }


        [JsonProperty(PropertyName = "page")]
        public string pageindex { set; get; }
        [JsonProperty(PropertyName = "total")]

        public string pagecount { get; set; }

        [JsonProperty(PropertyName = "records")]

        public string total { get; set; }

        public T[] rows { get; set; }

        /// <summary>
        /// 更新
        /// </summary>
        public void ToJson()
        {
            UI.JQGrid.FiterOrContain contain = new UI.JQGrid.FiterOrContain(HttpContext.Current.Request);
            if (contain.FiterList != null)
            {
                ToJson(contain.FiterList, contain.IsFiter);
            }
            else
            {
                HttpContext.Current.Response.Write(JsonConvert.SerializeObject(this));
                HttpContext.Current.ApplicationInstance.CompleteRequest();
            }
            //HttpContext.Current.Response.End();
        }
        public void ToJson(string[] filedlist, bool isFiter)
        {
            if (isFiter)
            {
                HttpContext.Current.Response.Write(this.ToJson<PagedResult<T>>(filedlist));

            }
            else
            {
                string[] str = { "success", "data" }; //加入2个参数

                var l = filedlist.ToList();
                l.AddRange(str);
                filedlist=l.ToArray();
                HttpContext.Current.Response.Write(this.ToJson2<PagedResult<T>>(filedlist));
            }
            HttpContext.Current.ApplicationInstance.CompleteRequest();

        }

    }
}
