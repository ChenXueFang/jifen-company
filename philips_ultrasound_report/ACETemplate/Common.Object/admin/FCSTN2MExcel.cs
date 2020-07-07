using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.ActiveRecord;

namespace Common.Object.admin
{
  public   class FCSTN2MExcel
    {
        [Property("数量")]
        public string Quantity { get; set; }

        [Property("商机 ID")]
        public string OpportunityID { get; set; }

        [Property("商机名称")]
        public string OpportunityName { get; set; }

        [Property("客户 ID")]
        public string AccountID { get; set; }

        [Property("客户名")]
        public string AccountName { get; set; }

        [Property("可能性 (%)")]
        public string Possibility { get; set; }

        [Property("进度")]
        public string Progress { get; set; }

        [Property("省份")]
        public string Province { get; set; }

        [Property("总价（已转换）币种")]
        public string Currency { get; set; }

        [Property("总价（已转换）")]
        public string TotalPrices { get; set; }

        [Property("产品名称")]
        public string ProductName { get; set; }

        [Property("商机圈经销商名称")]
        public string BusinessDealerName { get; set; }

        [Property("商机所有人")]
        public string BusinessOwner { get; set; }

        [Property("所有人角色")]
        public string OwnerRole { get; set; }

        [Property("临床应用描述")]
        public string ClinicalDesc { get; set; }

        [Property("Region")]
        public string Region { get; set; }

        [Property("Area")]
        public string Area { get; set; }

        [Property("预计进单(商机完成)日期")]
        public string ExpectedOrderDate { get; set; }

        [Property("区域-MAPPING")]
        public string AreaMAPPING { get; set; }

        [Property("产品-MAPPING")]
        public string ProductMAPPING { get; set; }

        [Property("临床应用描述-MAPPING")]
        public string ClinicalMAPPING { get; set; }
    }
}
