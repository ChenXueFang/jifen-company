using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ACETemplate
{
    public partial class Login : System.Web.UI.Page
    {
        [Common.Object.Attribute.HttpRequestAOPLog]
        protected void Page_Load(object sender, EventArgs e)
        {
           
            
           
      

            if (Request.QueryString["loginout"] != null)
            {
                Session[Common.Object.Class.ConfigureClass.SessionAdminString] = null;
            }
        }
    }
}