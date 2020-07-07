using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.ActiveRecord;

namespace Common.Object.admin
{
   public  class FCSTCMExcel
    {
        [Property("Region")]
        public string Region { get; set; }

        [Property("Province")]
        public string Province { get; set; }

        [Property("OwnerRole")]
        public string OwnerRole { get; set; }

        [Property("Opportunity ID")]
        public string OpportunityID { get; set; }

        [Property("Opportunity Name")]
        public string OpportunityName { get; set; }

        [Property("Account ID")]
        public string AccountID { get; set; }

        [Property("Account Name")]
        public string AccountName { get; set; }

        [Property("Product Name")]
        public string ProductName { get; set; }

        [Property("Expected Order Date")]
        public string ExpectedOrderDate { get; set; }

        [Property("Quantity")]
        public string Quantity { get; set; }

        [Property("FunnelKUSD")]
        public string FunnelKUSD { get; set; }

        [Property("区域-MAPPING")]
        public string AreaMAPPING { get; set; }

        [Property("产品-MAPPING")]
        public string ProductMAPPING { get; set; }

        [Property("临床应用描述-MAPPING")]
        public string ClinicalMAPPING { get; set; }
    }

}
