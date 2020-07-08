using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;
      using Common.UI.JQGrid;


namespace ACETemplate.adnim
{
    public partial class TestEdit : System.Web.UI.Page
    {
        public int Id = 0;
        protected void Page_Load(object sender, EventArgs e)
        {
      Id = Request.QueryString["id"].ToInt(0);
        }
    }
}
