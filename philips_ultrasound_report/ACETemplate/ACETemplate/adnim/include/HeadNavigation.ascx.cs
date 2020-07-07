using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace ACETemplate.adnim.include
{
    public partial class HeadNavigation : System.Web.UI.UserControl
    {
        private string _Level2Link = "#";
        private string _Level2Name;
        private string _Level3Name;
        private string templateDownload = "";
        /// <summary>
        /// 2级连接
        /// </summary>
        public string Level2Link
        {
            get { return _Level2Link; }
            set { _Level2Link = value; }
        }

        public string Level2Name
        {
            get { return _Level2Name; }
            set { _Level2Name = value; }
        }

        public string Level3Name
        {
            get { return _Level3Name; }
            set { _Level3Name = value; }
        }

        /// <summary>
        /// 模板下载链接
        /// </summary>
        public string TemplateDownload
        {
            get
            {
                return templateDownload;
            }

            set
            {
                templateDownload = value;
            }
        }

        protected void Page_Load(object sender, EventArgs e)
        {

            if (TemplateDownload != "")
            {
                ltrheadertemplate.Text = string.Format("<a href='{0}' target='_blank'>模板下载</a>", templateDownload);
            }
            if (Level2Link == "#")
            {
                Literal1.Text = _Level2Name;
            }
            else
            {
                ltrheadertemplate.Text = string.Format("<a href='{0}' >{1}</a>", _Level2Link, _Level2Name);
            }

        }
    }
}