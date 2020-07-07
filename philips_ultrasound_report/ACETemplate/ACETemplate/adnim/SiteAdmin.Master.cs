using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
using Common.Object.Class;
using System.IO;
using EntityClass;
using Common.Object.Data;
namespace Web.adnim
{
    public partial class SiteAdmin : System.Web.UI.MasterPage
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            var user = ((UserList)Session[ConfigureClass.SessionAdminString]);
            if (user == null)
                Response.Redirect("Login.aspx");
            if (!IsPostBack)
            {

                this.labeluser.InnerText = user.RealName == "admin" ? user.UserName : user.RealName;

            }
        }

    }
}