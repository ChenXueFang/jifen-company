
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.ActiveRecord;

namespace Common.Object.admin
{
   public  class CustomerExcel
    {
        [Property("客户字典")]
        public string CustomerSysID { get; set; }

        [Property("CustomerID-CRM")]
        public string CustomerIDCRM { get; set; }
    }
}
