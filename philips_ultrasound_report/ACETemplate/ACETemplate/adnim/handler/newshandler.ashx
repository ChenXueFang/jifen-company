<%@ WebHandler Language="C#" Class="Henkel.adnim.handler.newshandler" %>
using System;
using System.Web;
using System.IO;
using System.Collections.Generic;
using System.Data;
using System.Data.Sql;
using System.Data.SqlClient;
using System.Linq;
using System.Dynamic;
using EntityClass;
using Common.Utility.Log;
using Common.Object;
using NHibernate.Criterion;
using Common.Object.Class;
using Common.Object.Data;
using Common.UI.JQGrid;
namespace Henkel.adnim.handler
{
    public class newshandler : Common.Object.Class.BaseHandler, System.Web.SessionState.IRequiresSessionState
    {

        protected override void Process(HttpContext context)
        {
            switch (this.OperationType.ToLower())
            {


                case "user":

                    Action<UserList> fi = new Action<UserList>(userbeforeAdd);

                    Action<UserList> up = a =>
                    {
                        a.UserRoles = 0;
                        a.UserRoles += Context.Request.Form["Role1"].ToBool() ? (int)UserRoleType.User : 0;
                        a.UserRoles += Context.Request.Form["Role2"].ToBool() ? (int)UserRoleType.BaseInfo : 0;
                        a.UserRoles += Context.Request.Form["Role3"].ToBool() ? (int)UserRoleType.Publishing : 0;
                        a.UserRoles += Context.Request.Form["Role4"].ToBool() ? (int)UserRoleType.DataMaintain : 0;

                    };
                    var A = new Common.UI.JQGrid.JGOperItem<UserList>(context.Request, fi, up, null);

                    if (A.DoDataAction())
                    {
                        SuccessResut("操作成功");
                    }
                    else
                        FailResut("操作失败");
                    break;
                case "userquery":
                    userquery();
                    break;
                case "resetpassword":
                    ResetPassword();
                    break;



            }

        }

           

        void ResetPassword() {

            UserList u = UserList.Find( HttpContext.Current.Request.Form["ID"].ToInt(0));

            u.Password = "123456";
            u.Save();
            SuccessResut("");
            return;

        }

        void userquery()
        {
            ICriterion ic = Expression.Eq("StatusId", false);
            Common.UI.JQGrid.JqGridSearch<UserList> serach = new Common.UI.JQGrid.JqGridSearch<UserList>(System.Web.HttpContext.Current.Request, ic);
            string[] filed = new string[1] { "Password" };
            SuccessGridResult(serach.Search(), filed, true);
        }

        void userbeforeAdd(UserList u)
        {
            u.Password = "111111";
            u.CreateDate = DateTime.Now; u.ModifyDate = DateTime.Now;
            u.UserRoles = 0;
            u.UserRoles += Context.Request.Form["Role1"].ToBool() ? (int)UserRoleType.User : 0;
            u.UserRoles += Context.Request.Form["Role2"].ToBool() ? (int)UserRoleType.BaseInfo : 0;
            u.UserRoles += Context.Request.Form["Role3"].ToBool() ? (int)UserRoleType.Publishing : 0;
            u.UserRoles += Context.Request.Form["Role4"].ToBool() ? (int)UserRoleType.DataMaintain : 0;
        }
    }
}