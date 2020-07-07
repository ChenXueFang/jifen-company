using Castle.ActiveRecord;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Object.admin
{
  public   class ProductExcel
    {
        [Property("产品ID")]
        public string ProductName { get; set; }

        [Property("产品简称")]
        public string ProductNameAbbr { get; set; }
    }
}
