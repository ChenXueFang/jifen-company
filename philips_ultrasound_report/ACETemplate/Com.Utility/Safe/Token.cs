using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
namespace Com.Utility.Safe
{
    public class Token<T> where T : class
    {
       public  static string SaveToken(T t)
        {
            var guid = Guid.NewGuid();
            var token = Convert.ToBase64String(guid.ToByteArray()).TrimEnd('=');
            System.Web.HttpContext.Current.Cache.Insert(token, t, null, System.Web.Caching.Cache.NoAbsoluteExpiration, new TimeSpan(12, 0, 0));
            //保存到缓存
            return token;
            //时候
        }
        public static T GetTokenValue(string token)
        {
            var v = System.Web.HttpContext.Current.Cache.Get(token);
            if (v == null)
                return null;
            return (T)v;
        }
    }
}
