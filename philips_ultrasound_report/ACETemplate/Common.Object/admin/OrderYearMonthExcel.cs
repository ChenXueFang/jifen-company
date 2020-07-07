using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.ActiveRecord;

namespace Common.Object.admin
{
   public  class OrderYearMonthExcel
    {
        [Property("Comments")]
        public string Comments { get; set; }

        [Property("Status")]
        public string Status { get; set; }

        [Property("ORU")]
        public string ORU { get; set; }

        [Property("SAP#-WBS")]
        public string SAPORWBS { get; set; }

        [Property("Order Type")]
        public string OrderType { get; set; }

        [Property("SOFON No")]
        public string SOFONNo { get; set; }

        [Property("客户名称")]
        public string ClientName { get; set; }

        [Property("科室")]
        public string Department { get; set; }

        [Property("应用")]
        public string Application { get; set; }

        [Property("产品名称")]
        public string ProductName { get; set; }

        [Property("亚型名称")]
        public string SubtypeName { get; set; }

        [Property("QTY")]
        public string QTY { get; set; }

        [Property("销售")]
        public string SalesName { get; set; }

        [Property("小区")]
        public string SmallArea { get; set; }

        [Property("大区")]
        public string Region { get; set; }

        [Property("大区经理")]
        public string RegionalManager { get; set; }

        [Property("经销商")]
        public string DealerName { get; set; }

        [Property("合同买方")]
        public string ContractBuyerName { get; set; }

        [Property("合同号")]
        public string ContractNo { get; set; }

        [Property("Contract Amount(USD)-VAT excl")]
        public string ContractAmountUSD { get; set; }

        [Property("Application Training Amount(USD)")]
        public string ApplicationTrainingAmount { get; set; }

        [Property("Extended Warranty Amount(USD)")]
        public string ExtendedWarrantyAmount { get; set; }

        [Property("Extended Warranty Months")]
        public string ExtendedWarrantyMonths { get; set; }

        [Property("Net Price")]
        public string NetPriceUSD { get; set; }

        [Property("Payment Term")]
        public string PaymentTerm { get; set; }

        [Property("OIT Month")]
        public string OITMonth { get; set; }

        [Property("OA")]
        public string OA { get; set; }

        [Property("OM")]
        public string OM { get; set; }

        [Property("Local dealer Commission")]
        public string LocalDealerCommission { get; set; }

        [Property("Central Commission")]
        public string CentralCommission { get; set; }

        [Property("现场培训 Application Training")]
        public string ApplicationTraining { get; set; }

        [Property("登陆计划")]
        public string LandingPlan { get; set; }

        [Property("产品&应用课程 Group Training")]
        public string GroupTraining { get; set; }

        [Property("临床科研课程")]
        public string ClinicalCourses { get; set; }

        [Property("Oversea Training")]
        public string OverseaTraining { get; set; }

        [Property("招标费")]
        public string TenderFee { get; set; }

        [Property("检测费")]
        public string DetectionFee { get; set; }

        [Property("Financial Risk")]
        public string FinancialRisk { get; set; }

        [Property("促销一")]
        public string Promote1 { get; set; }

        [Property("促销二")]
        public string Promote2 { get; set; }

        [Property("促销三")]
        public string Promote3 { get; set; }

        [Property("促销四")]
        public string Promote4 { get; set; }

        [Property("促销五")]
        public string Promote5 { get; set; }

        [Property("销售第一次提交")]
        public string SalesFirstDate { get; set; }

        [Property("销售最后一次提交")]
        public string SalesFinallyDate { get; set; }

        [Property("OIT Date")]
        public string OITDate { get; set; }

        [Property("OIT Cycle Time")]
        public string OITCycleTime { get; set; }


        [Property("旧版SAP#-WBS")]
        public string OldSAPORWBS { get; set; }


        [Property("WBS checking")]
        public string WBSChecking { get; set; }


        [Property("xx")]
        public string xx { get; set; }


        [Property("count in")]
        public string CountIn { get; set; }

    }
}
