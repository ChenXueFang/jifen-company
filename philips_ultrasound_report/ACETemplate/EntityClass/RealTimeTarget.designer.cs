namespace EntityClass
{
// Business class RealTimeTarget generated from RealTimeTarget
// Anna [2020-06-08] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("RealTimeTarget")]
public partial class RealTimeTarget: ActiveRecordBase<RealTimeTarget> 
{


	#region Private_Variables

	private int _id;
	private int? _importID;
	private string _status;
	private string _systemReferenceNumber;
	private string _oRU;
	private string _sONumber;
	private string _sAPORWBS;
	private string _gIDate;
	private string _sN;
	private string _orderType;
	private string _sOFON;
	private string _sOFONTag;
	private string _lastUserName;
	private string _philipsType;
	private string _province;
	private string _city;
	private string _customerSysID;
	private string _businessID;
	private string _handBusinessID;
	private string _clinicSubdivide;
	private string _productName;
	private string _subtypeofName;
	private string _firstDepartmentClassify;
	private string _secondDepartmentClassify;
	private int? _quantity;
	private string _requestArrivalDate;
	private string _expectedInstallDate;
	private string _salesName;
	private string _smallArea;
	private string _region;
	private string _regionalManager;
	private string _dealerName;
	private string _contractBuyerName;
	private string _importAgreementNo;
	private string _purchaseOrderNo;
	private System.Decimal? _contractMoney;
	private System.Decimal? _warrantyMoney;
	private int? _warrantyYear;
	private System.Decimal? _contractNetPrice;
	private System.Decimal? _systemMoneyUSD;
	private System.Decimal? _warrantyPriceUSD;
	private int? _warrantyAgeLimit;
	private System.Decimal? _systemRetainedProfits;
	private string _specialOfferConsult;
	private System.Decimal? _specialOfferMoney;
	private string _payType;
	private string _oITMonth;
	private string _oA;
	private string _gBS;
	private string _sceneTraining;
	private string _trainingRequired;
	private string _trainingChoosable;
	private string _productApplication;
	private string _applicationRequired;
	private string _applicationChoosable;
	private System.Decimal? _clinicalTrainingPrice;
	private string _clinicalCopies;
	private System.Decimal? _tenderFee;
	private System.Decimal? _detectionFee;
	private System.Decimal? _localDealerCommission;
	private string _centralCommission;
	private string _promotionPlanFirst;
	private string _promotionPlanSecond;
	private string _promotionPlanThird;
	private string _promotionPlanFourth;
	private string _promotionPlanFifth;
	private string _salesFirstDate;
	private string _salesFinallyDate;
	private string _configurationDate;
	private string _oITDate;
	private string _oITCycleTime;
	private string _whetherSolution;
	private string _qLABName;
	private string _thirdProductName;
	private string _cTP;
	private string _cTPPercent;
	private string _distributorNo;
	private string _pactNo;
	private string _salesSapCode;
	private string _lastUserSapCode;
	private string _pactBuyerSapCode;
	private string _distributorSapCode;
	private string _remark;
	private string _tieredPricing;
	private string _whetherPrivate;
	private string _isHTAUS;
	private int? _year;
	private int? _month;
	private DateTime? _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("ImportID", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? ImportID
        {
		get { return _importID; }
					set { _importID = value; }
				}

			[Property("Status", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string Status
	{
		get { return _status; }
					set { _status = value; }
				}

			[Property("SystemReferenceNumber", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SystemReferenceNumber
	{
		get { return _systemReferenceNumber; }
					set { _systemReferenceNumber = value; }
				}

			[Property("ORU", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ORU
	{
		get { return _oRU; }
					set { _oRU = value; }
				}

			[Property("SONumber", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string SONumber
	{
		get { return _sONumber; }
					set { _sONumber = value; }
				}

			[Property("SAPORWBS", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SAPORWBS
	{
		get { return _sAPORWBS; }
					set { _sAPORWBS = value; }
				}

			[Property("GIDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string GIDate
	{
		get { return _gIDate; }
					set { _gIDate = value; }
				}

			[Property("SN", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SN
	{
		get { return _sN; }
					set { _sN = value; }
				}

			[Property("OrderType", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string OrderType
	{
		get { return _orderType; }
					set { _orderType = value; }
				}

			[Property("SOFON", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SOFON
	{
		get { return _sOFON; }
					set { _sOFON = value; }
				}

			[Property("SOFONTag", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SOFONTag
	{
		get { return _sOFONTag; }
					set { _sOFONTag = value; }
				}

			[Property("LastUserName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string LastUserName
	{
		get { return _lastUserName; }
					set { _lastUserName = value; }
				}

			[Property("PhilipsType", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string PhilipsType
	{
		get { return _philipsType; }
					set { _philipsType = value; }
				}

			[Property("Province", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Province
	{
		get { return _province; }
					set { _province = value; }
				}

			[Property("City", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string City
	{
		get { return _city; }
					set { _city = value; }
				}

			[Property("CustomerSysID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string CustomerSysID
	{
		get { return _customerSysID; }
					set { _customerSysID = value; }
				}

			[Property("BusinessID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string BusinessID
	{
		get { return _businessID; }
					set { _businessID = value; }
				}

			[Property("HandBusinessID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string HandBusinessID
	{
		get { return _handBusinessID; }
					set { _handBusinessID = value; }
				}

			[Property("ClinicSubdivide", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string ClinicSubdivide
	{
		get { return _clinicSubdivide; }
					set { _clinicSubdivide = value; }
				}

			[Property("ProductName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ProductName
	{
		get { return _productName; }
					set { _productName = value; }
				}

			[Property("SubtypeofName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SubtypeofName
	{
		get { return _subtypeofName; }
					set { _subtypeofName = value; }
				}

			[Property("FirstDepartmentClassify", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string FirstDepartmentClassify
	{
		get { return _firstDepartmentClassify; }
					set { _firstDepartmentClassify = value; }
				}

			[Property("SecondDepartmentClassify", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SecondDepartmentClassify
	{
		get { return _secondDepartmentClassify; }
					set { _secondDepartmentClassify = value; }
				}

			[Property("Quantity", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? Quantity
	{
		get { return _quantity; }
					set { _quantity = value; }
				}

			[Property("RequestArrivalDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string RequestArrivalDate
	{
		get { return _requestArrivalDate; }
					set { _requestArrivalDate = value; }
				}

			[Property("ExpectedInstallDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ExpectedInstallDate
	{
		get { return _expectedInstallDate; }
					set { _expectedInstallDate = value; }
				}

			[Property("SalesName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string SalesName
	{
		get { return _salesName; }
					set { _salesName = value; }
				}

			[Property("SmallArea", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SmallArea
	{
		get { return _smallArea; }
					set { _smallArea = value; }
				}

			[Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Region
	{
		get { return _region; }
					set { _region = value; }
				}

			[Property("RegionalManager", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string RegionalManager
	{
		get { return _regionalManager; }
					set { _regionalManager = value; }
				}

			[Property("DealerName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string DealerName
	{
		get { return _dealerName; }
					set { _dealerName = value; }
				}

			[Property("ContractBuyerName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string ContractBuyerName
	{
		get { return _contractBuyerName; }
					set { _contractBuyerName = value; }
				}

			[Property("ImportAgreementNo", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string ImportAgreementNo
	{
		get { return _importAgreementNo; }
					set { _importAgreementNo = value; }
				}

			[Property("PurchaseOrderNo", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string PurchaseOrderNo
	{
		get { return _purchaseOrderNo; }
					set { _purchaseOrderNo = value; }
				}

			[Property("ContractMoney", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? ContractMoney
	{
		get { return _contractMoney; }
					set { _contractMoney = value; }
				}

			[Property("WarrantyMoney", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? WarrantyMoney
	{
		get { return _warrantyMoney; }
					set { _warrantyMoney = value; }
				}

			[Property("WarrantyYear", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? WarrantyYear
	{
		get { return _warrantyYear; }
					set { _warrantyYear = value; }
				}

			[Property("ContractNetPrice", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? ContractNetPrice
	{
		get { return _contractNetPrice; }
					set { _contractNetPrice = value; }
				}

			[Property("SystemMoneyUSD", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? SystemMoneyUSD
	{
		get { return _systemMoneyUSD; }
					set { _systemMoneyUSD = value; }
				}

			[Property("WarrantyPriceUSD", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? WarrantyPriceUSD
	{
		get { return _warrantyPriceUSD; }
					set { _warrantyPriceUSD = value; }
				}

			[Property("WarrantyAgeLimit", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? WarrantyAgeLimit
	{
		get { return _warrantyAgeLimit; }
					set { _warrantyAgeLimit = value; }
				}

			[Property("SystemRetainedProfits", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? SystemRetainedProfits
	{
		get { return _systemRetainedProfits; }
					set { _systemRetainedProfits = value; }
				}

			[Property("SpecialOfferConsult", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SpecialOfferConsult
	{
		get { return _specialOfferConsult; }
					set { _specialOfferConsult = value; }
				}

			[Property("SpecialOfferMoney", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? SpecialOfferMoney
	{
		get { return _specialOfferMoney; }
					set { _specialOfferMoney = value; }
				}

			[Property("PayType", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string PayType
	{
		get { return _payType; }
					set { _payType = value; }
				}

			[Property("OITMonth", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OITMonth
	{
		get { return _oITMonth; }
					set { _oITMonth = value; }
				}

			[Property("OA", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string OA
	{
		get { return _oA; }
					set { _oA = value; }
				}

			[Property("GBS", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string GBS
	{
		get { return _gBS; }
					set { _gBS = value; }
				}

			[Property("SceneTraining", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SceneTraining
	{
		get { return _sceneTraining; }
					set { _sceneTraining = value; }
				}

			[Property("TrainingRequired", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string TrainingRequired
	{
		get { return _trainingRequired; }
					set { _trainingRequired = value; }
				}

			[Property("TrainingChoosable", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string TrainingChoosable
	{
		get { return _trainingChoosable; }
					set { _trainingChoosable = value; }
				}

			[Property("ProductApplication", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ProductApplication
	{
		get { return _productApplication; }
					set { _productApplication = value; }
				}

			[Property("ApplicationRequired", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ApplicationRequired
	{
		get { return _applicationRequired; }
					set { _applicationRequired = value; }
				}

			[Property("ApplicationChoosable", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ApplicationChoosable
	{
		get { return _applicationChoosable; }
					set { _applicationChoosable = value; }
				}

			[Property("ClinicalTrainingPrice", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? ClinicalTrainingPrice
	{
		get { return _clinicalTrainingPrice; }
					set { _clinicalTrainingPrice = value; }
				}

			[Property("ClinicalCopies", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ClinicalCopies
	{
		get { return _clinicalCopies; }
					set { _clinicalCopies = value; }
				}

			[Property("TenderFee", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? TenderFee
	{
		get { return _tenderFee; }
					set { _tenderFee = value; }
				}

			[Property("DetectionFee", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? DetectionFee
	{
		get { return _detectionFee; }
					set { _detectionFee = value; }
				}

			[Property("LocalDealerCommission", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? LocalDealerCommission
	{
		get { return _localDealerCommission; }
					set { _localDealerCommission = value; }
				}

			[Property("CentralCommission", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string CentralCommission
	{
		get { return _centralCommission; }
					set { _centralCommission = value; }
				}

			[Property("PromotionPlanFirst", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string PromotionPlanFirst
	{
		get { return _promotionPlanFirst; }
					set { _promotionPlanFirst = value; }
				}

			[Property("PromotionPlanSecond", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string PromotionPlanSecond
	{
		get { return _promotionPlanSecond; }
					set { _promotionPlanSecond = value; }
				}

			[Property("PromotionPlanThird", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string PromotionPlanThird
	{
		get { return _promotionPlanThird; }
					set { _promotionPlanThird = value; }
				}

			[Property("PromotionPlanFourth", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string PromotionPlanFourth
	{
		get { return _promotionPlanFourth; }
					set { _promotionPlanFourth = value; }
				}

			[Property("PromotionPlanFifth", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string PromotionPlanFifth
	{
		get { return _promotionPlanFifth; }
					set { _promotionPlanFifth = value; }
				}

			[Property("SalesFirstDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SalesFirstDate
	{
		get { return _salesFirstDate; }
					set { _salesFirstDate = value; }
				}

			[Property("SalesFinallyDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SalesFinallyDate
	{
		get { return _salesFinallyDate; }
					set { _salesFinallyDate = value; }
				}

			[Property("ConfigurationDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ConfigurationDate
	{
		get { return _configurationDate; }
					set { _configurationDate = value; }
				}

			[Property("OITDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OITDate
	{
		get { return _oITDate; }
					set { _oITDate = value; }
				}

			[Property("OITCycleTime", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OITCycleTime
	{
		get { return _oITCycleTime; }
					set { _oITCycleTime = value; }
				}

			[Property("WhetherSolution", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string WhetherSolution
	{
		get { return _whetherSolution; }
					set { _whetherSolution = value; }
				}

			[Property("QLABName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string QLABName
	{
		get { return _qLABName; }
					set { _qLABName = value; }
				}

			[Property("ThirdProductName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ThirdProductName
	{
		get { return _thirdProductName; }
					set { _thirdProductName = value; }
				}

			[Property("CTP", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string CTP
	{
		get { return _cTP; }
					set { _cTP = value; }
				}

			[Property("CTPPercent", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string CTPPercent
	{
		get { return _cTPPercent; }
					set { _cTPPercent = value; }
				}

			[Property("DistributorNo", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string DistributorNo
	{
		get { return _distributorNo; }
					set { _distributorNo = value; }
				}

			[Property("PactNo", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string PactNo
	{
		get { return _pactNo; }
					set { _pactNo = value; }
				}

			[Property("SalesSapCode", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SalesSapCode
	{
		get { return _salesSapCode; }
					set { _salesSapCode = value; }
				}

			[Property("LastUserSapCode", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string LastUserSapCode
	{
		get { return _lastUserSapCode; }
					set { _lastUserSapCode = value; }
				}

			[Property("PactBuyerSapCode", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string PactBuyerSapCode
	{
		get { return _pactBuyerSapCode; }
					set { _pactBuyerSapCode = value; }
				}

			[Property("DistributorSapCode", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string DistributorSapCode
	{
		get { return _distributorSapCode; }
					set { _distributorSapCode = value; }
				}

			[Property("Remark", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 200)]
	public string Remark
	{
		get { return _remark; }
					set { _remark = value; }
				}

			[Property("TieredPricing", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string TieredPricing
	{
		get { return _tieredPricing; }
					set { _tieredPricing = value; }
				}

			/// <summary>
        /// 是否是民营医院
        /// </summary>
				[Property("WhetherPrivate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string WhetherPrivate
	{
		get { return _whetherPrivate; }
					set { _whetherPrivate = value; }
				}

			[Property("IsHTAUS", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string IsHTAUS
	{
		get { return _isHTAUS; }
					set { _isHTAUS = value; }
				}

			[Property("Year", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? Year
	{
		get { return _year; }
					set { _year = value; }
				}

			[Property("Month", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? Month
	{
		get { return _month; }
					set { _month = value; }
				}

			[Property("CreateTime", Access = PropertyAccess.NosetterCamelcaseUnderscore, Insert=false)]
	public DateTime? CreateTime
	{
		get { return _createTime; }
					set { _createTime = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return RealTimeTarget.Count(criteria);
    }
} // RealTimeTarget

}


