using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Object.Setting
{
    /// <summary>
    /// 获取后台菜单列表
    /// </summary>
    public class MenuList
    {



        static string Key = "APP-MENU";
        public static  string GetMenu()
        {


            var t = System.Web.HttpContext.Current.Cache.Get(Key);
            if (t != null)
                return t.ToString();

            System.IO.StreamReader read = new System.IO.StreamReader(System.Web.HttpContext.Current.Request.MapPath("~/adnim/json/menu.json"));
            using (read)
            {
                string  t1 = read.ReadToEnd();

                System.Web.HttpContext.Current.Cache.Insert(Key, t1, new System.Web.Caching.CacheDependency(System.Web.HttpContext.Current.Request.MapPath("~/adnim/json/menu.json")), System.Web.Caching.Cache.NoAbsoluteExpiration, new TimeSpan(12, 0, 0));

                return t1;
            }
        }
     
        public string Icon;
        public string Title;
        public List<SubMenu> Menu;
        public bool Hidden = false;

    }
    public class SubMenu {
        public int Roles;
        public string Url, Title, ID;
        public List<SubMenu> Menu;
    }
}
