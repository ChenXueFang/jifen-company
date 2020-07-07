using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace ACETemplate
{
    public class SiteHelper
    {
        public static string SiteName = System.Configuration.ConfigurationManager.AppSettings["SiteName"];
    }
}