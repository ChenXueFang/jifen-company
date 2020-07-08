using Common.Object.Class;
using EntityClass;
using NHibernate.Criterion;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Common.Object.Attribute;
using Common.Object.Setting;

namespace ACETemplate.adnim.handler
{
    /// <summary>
    /// GobalHandler 的摘要说明
    /// </summary>
    public class GobalHandler : Common.Object.Class.BaseHandler
    {
        protected override void Process(HttpContext context)
        {

            switch (this.OperationType.ToLower())
            {

                case "getmenu":
                    getmenu();
                    break;
                case "login":
                    _login();
                    break;
                case "usermodifypassword":
                    _usermodifypassword();
                    break;
                case "userinfo":
                    userinfo();
                    break;
                case "getyearmonth":
                    QueryYearMonth();
                    break;

            }
            base.Process(context);
        }

        
       public  void QueryYearMonth()
        {

            var result = ReportBatch.FindAll().GroupBy(a => new { a.Month, a.Year }).Select(a => new { Year = a.Key.Year, Month = a.Key.Month });

            SuccessResut(result);
        }

        [UserListRoleAttribute]
        void userinfo() {
            UserList user = (UserList)HttpContext.Current.Session[ConfigureClass.SessionAdminString];
            SuccessResut(user, "", "");
        }

        [Common.Object.Attribute.UserListRole]

        void _usermodifypassword()
        {
            if (HttpContext.Current.Session[ConfigureClass.SessionAdminString] != null)
            {
                UserList user = (UserList)HttpContext.Current.Session[ConfigureClass.SessionAdminString];
                UserList u = UserList.Find(user.ID);
                if (u.Password == HttpContext.Current.Request.Form["password"])
                {
                    u.Password = HttpContext.Current.Request.Form["newpassword"];
                    u.Save();
                    SuccessResut("");
                    return;
                }

            }
            FailResut("更新失败");
        }
        void _login()
        {
            string password = HttpContext.Current.Request.Form["password"];
            string username = HttpContext.Current.Request.Form["username"];
            string code = HttpContext.Current.Request.Form["code"];
            var t = Expression.Eq("UserName", username);
            var t1 = Expression.Eq("Password", password);
            var t2 = Expression.Eq(nameof(UserList.StatusId), false);

            var u = UserList.FindFirst(t, t1, t2);

            var Vcode = HttpContext.Current.Session["VCode"];
            if (Vcode != null)
            {
                if (!string.IsNullOrEmpty(code) && code.Equals(Vcode))
                {
                    if (u != null && u.ID > 0)
                    {
                        u.Password = "";//密码清除;
                        HttpContext.Current.Session[ConfigureClass.SessionAdminString] = u;
                        SuccessResut("");

                    }
                    else
                    {
                        FailResut("用户名或密码不对");
                    }
                }
                else {
                    FailResut("验证码不正确");
                }
            }
            else
            {
                FailResut("请输入验证码");
            }
        }


        [Common.Object.Attribute.UserListRole]
        void getmenu()
        {

            //获取MENU
            string y = Common.Object.Setting.MenuList.GetMenu();

            //读取JSON文件
            //分析权限

            var x = Newtonsoft.Json.JsonConvert.DeserializeObject<List<MenuList>>(y);

            List<MenuList> menuList = new List<MenuList>();
            //完成菜单循环


            foreach (var z in x)
            {
                if (z.Hidden)
                    continue;
                var menuList1 = new MenuList()
                {

                    Icon = z.Icon,
                    Title = z.Title,
                    Menu = new List<SubMenu>()

                };

                foreach (var h in z.Menu)
                {

                    var user = (UserList)HttpContext.Current.Session[Common.Object.Class.ConfigureClass.SessionAdminString];

                    if (h.Roles == 0 || (user.UserRoles & h.Roles) == h.Roles)
                    {
                        SubMenu sub = new SubMenu()
                        {
                            Roles = h.Roles,
                            Title = h.Title,
                            ID = h.ID,
                            Url = h.Url
                        };
                        //判断如果

                        //添加子菜单

                        if (h.Menu != null)
                        {
                            sub.Menu = new List<SubMenu>();
                            foreach (var h1 in h.Menu)
                            {
                                SubMenu sub1 = new SubMenu()
                                {
                                    Roles = h1.Roles,
                                    Title = h1.Title,
                                    ID = h1.ID,
                                    Url = h1.Url
                                };
                                sub.Menu.Add(sub1);
                            }
                        }
                        menuList1.Menu.Add(sub);
                    }

                }

                //如果不显示就添加
                if (menuList1.Menu.Count > 0)
                {
                    menuList.Add(menuList1);
                }
            }
            SuccessResut(menuList, "", "");

            //System.IO.StreamReader read = new System.IO.StreamReader(Context.Request.MapPath("~/adnim/json/menu.json"));
            //using (read) {
            //    string t = read.ReadToEnd();
            //    SuccessResut(t, "", "");
            //}
        }

    }
}