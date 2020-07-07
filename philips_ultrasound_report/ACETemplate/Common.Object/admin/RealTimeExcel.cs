using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.ActiveRecord;

namespace Common.Object.admin
{
  public   class RealTimeExcel
    {
        [Property("Status")]
        public string Status { get; set; }

        [Property("系统参考号")]
        public string SystemReferenceNumber { get; set; }

        [Property("ORU（币种）")]
        public string ORU { get; set; }

        [Property("SONumber")]
        public string SONumber { get; set; }

        [Property("SAP#/WBS#")]
        public string SAPORWBS { get; set; }

        [Property("GIDate")]
        public string GIDate { get; set; }

        [Property("SN#")]
        public string SN { get; set; }

        [Property("订单类型")]
        public string OrderType { get; set; }

        [Property("SOFON号")]
        public string SOFON { get; set; }

        [Property("SOFON标签")]
        public string SOFONTag { get; set; }

        [Property("最终用户名称")]
        public string LastUserName { get; set; }

        [Property("飞利浦类型")]
        public string PhilipsType { get; set; }

        [Property("省份")]
        public string Province { get; set; }

        [Property("城市")]
        public string City { get; set; }

        [Property("CustomerSysID")]
        public string CustomerSysID { get; set; }

        [Property("商机号")]
        public string BusinessID { get; set; }

        [Property("商机号（手动）")]
        public string HandBusinessID { get; set; }

        [Property("临床细分")]
        public string ClinicSubdivide { get; set; }

        [Property("产品名称")]
        public string ProductName { get; set; }

        [Property("亚型名称")]
        public string SubtypeofName { get; set; }

        [Property("一级科室分类")]
        public string FirstDepartmentClassify { get; set; }

        [Property("二级科室分类")]
        public string SecondDepartmentClassify { get; set; }

        [Property("数量")]
        public string Quantity { get; set; }

        [Property("要求到货日期（RDD）")]
        public string RequestArrivalDate { get; set; }

        [Property("预计安装日期（SID）")]
        public string ExpectedInstallDate { get; set; }

        [Property("销售")]
        public string SalesName { get; set; }

        [Property("小区")]
        public string SmallArea { get; set; }

        [Property("大区")]
        public string Region { get; set; }

        [Property("大区经理")]
        public string RegionalManager { get; set; }

        [Property("经销商名称")]
        public string DealerName { get; set; }

        [Property("合同买方名称")]
        public string ContractBuyerName { get; set; }

        [Property("进口协议编号")]
        public string ImportAgreementNo { get; set; }

        [Property("采购订单编号")]
        public string PurchaseOrderNo { get; set; }

        [Property("合同金额")]
        public string ContractMoney { get; set; }

        [Property("其中延保金额")]
        public string WarrantyMoney { get; set; }

        [Property("延保年限")]
        public string WarrantyYear { get; set; }

        [Property("合同净价")]
        public string ContractNetPrice { get; set; }

        [Property("系统金额 (USD)")]
        public string SystemMoneyUSD { get; set; }

        [Property("其中延保金额 (USD)")]
        public string WarrantyPriceUSD { get; set; }

        [Property("延保年限USD")]
        public string WarrantyAgeLimit { get; set; }

        [Property("系统净利润")]
        public string SystemRetainedProfits { get; set; }

        [Property("特价参考号")]
        public string SpecialOfferConsult { get; set; }

        [Property("特价金额")]
        public string SpecialOfferMoney { get; set; }

        [Property("支付方式")]
        public string PayType { get; set; }

        [Property("OITMonth")]
        public string OITMonth { get; set; }

        [Property("OA")]
        public string OA { get; set; }

        [Property("GBS")]
        public string GBS { get; set; }

        [Property("现场培训")]
        public string SceneTraining { get; set; }

        [Property("现场培训份数（必选）")]
        public string TrainingRequired { get; set; }


        [Property("现场培训份数（可选）")]
        public string TrainingChoosable { get; set; }

        [Property("产品&应用课程")]
        public string ProductApplication { get; set; }


        [Property("产品&应用课程份数（必选）")]
        public string ApplicationRequired { get; set; }


        [Property("产品&应用课程份数（可选）")]
        public string ApplicationChoosable { get; set; }

        [Property("临床科研培训费")]
        public string ClinicalTrainingPrice { get; set; }

        [Property("临床科研培训费份数")]
        public string ClinicalCopies { get; set; }

        [Property("招标费")]
        public string TenderFee { get; set; }

        [Property("检测费")]
        public string DetectionFee { get; set; }

        [Property("佣金费")]
        public string LocalDealerCommission { get; set; }

        [Property("Central Commission")]
        public string CentralCommission { get; set; }

        [Property("促销方案一")]
        public string PromotionPlanFirst { get; set; }

        [Property("促销方案二")]
        public string PromotionPlanSecond { get; set; }

        [Property("促销方案三")]
        public string PromotionPlanThird { get; set; }

        [Property("促销方案四")]
        public string PromotionPlanFourth { get; set; }

        [Property("促销方案五")]
        public string PromotionPlanFifth { get; set; }

        [Property("销售第一次提交日期")]
        public string SalesFirstDate { get; set; }

        [Property("销售最后一次提交日期")]
        public string SalesFinallyDate { get; set; }

        [Property("配置确认日期")]
        public string ConfigurationDate { get; set; }

        [Property("OIT日期")]
        public string OITDate { get; set; }

        [Property("OITCycleTime")]
        public string OITCycleTime { get; set; }

        [Property("是否包含solution")]
        public string WhetherSolution { get; set; }

        [Property("QLAB选件名称")]
        public string QLABName { get; set; }

        [Property("第三方产品名称")]
        public string ThirdProductName { get; set; }

        [Property("CTP")]
        public string CTP { get; set; }

        [Property("CTP百分比")]
        public string CTPPercent { get; set; }

        [Property("经销商协议号")]
        public string DistributorNo { get; set; }

        [Property("合同号")]
        public string PactNo { get; set; }

        [Property("销售SapCode")]
        public string SalesSapCode { get; set; }

        [Property("最终用户SapCode")]
        public string LastUserSapCode { get; set; }

        [Property("合同买方SapCode")]
        public string PactBuyerSapCode { get; set; }

        [Property("经销商SapCode")]
        public string DistributorSapCode { get; set; }

        [Property("备注信息")]
        public string Remark { get; set; }

        [Property("阶梯价")]
        public string TieredPricing { get; set; }

        [Property("是否民营医院")]
        public string WhetherPrivate { get; set; }

        [Property("是否HTAUS")]
        public string IsHTAUS { get; set; }
     
    }
}
