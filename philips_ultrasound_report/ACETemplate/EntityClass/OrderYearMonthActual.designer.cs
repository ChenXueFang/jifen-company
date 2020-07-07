namespace EntityClass
{
// Business class OrderYearMonthActual generated from OrderYearMonthActual
// Anna [2020-06-08] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("OrderYearMonthActual")]
public partial class OrderYearMonthActual: ActiveRecordBase<OrderYearMonthActual> 
{


	#region Private_Variables

	private int _id;
	private int? _batchID;
	private string _comments;
	private string _status;
	private string _oRU;
	private string _sAPORWBS;
	private string _orderType;
	private string _sOFONNo;
	private string _clientName;
	private string _department;
	private string _application;
	private string _productName;
	private string _subtypeName;
	private int? _qTY;
	private string _salesName;
	private string _smallArea;
	private string _region;
	private string _regionalManager;
	private string _dealerName;
	private string _contractBuyerName;
	private string _contractNo;
	private System.Decimal? _contractAmountUSD;
	private System.Decimal? _applicationTrainingAmount;
	private System.Decimal? _extendedWarrantyAmount;
	private int? _extendedWarrantyMonths;
	private System.Decimal? _netPriceUSD;
	private string _paymentTerm;
	private string _oITMonth;
	private string _oA;
	private string _oM;
	private string _localDealerCommission;
	private string _centralCommission;
	private string _applicationTraining;
	private System.Decimal? _landingPlan;
	private System.Decimal? _groupTraining;
	private System.Decimal? _clinicalCourses;
	private string _overseaTraining;
	private System.Decimal? _tenderFee;
	private System.Decimal? _detectionFee;
	private string _financialRisk;
	private string _promote1;
	private string _promote2;
	private string _promote3;
	private string _promote4;
	private string _promote5;
	private string _salesFirstDate;
	private string _salesFinallyDate;
	private string _oITDate;
	private string _oITCycleTime;
	private string _oldSAPORWBS;
	private string _wBSChecking;
	private string _xx;
	private string _countIn;
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

			[Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? BatchID
	{
		get { return _batchID; }
					set { _batchID = value; }
				}

			[Property("Comments", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Comments
	{
		get { return _comments; }
					set { _comments = value; }
				}

			[Property("Status", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Status
	{
		get { return _status; }
					set { _status = value; }
				}

			[Property("ORU", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ORU
	{
		get { return _oRU; }
					set { _oRU = value; }
				}

			[Property("SAPORWBS", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SAPORWBS
	{
		get { return _sAPORWBS; }
					set { _sAPORWBS = value; }
				}

			[Property("OrderType", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OrderType
	{
		get { return _orderType; }
					set { _orderType = value; }
				}

			[Property("SOFONNo", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SOFONNo
	{
		get { return _sOFONNo; }
					set { _sOFONNo = value; }
				}

			[Property("ClientName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ClientName
	{
		get { return _clientName; }
					set { _clientName = value; }
				}

			[Property("Department", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Department
	{
		get { return _department; }
					set { _department = value; }
				}

			[Property("Application", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Application
	{
		get { return _application; }
					set { _application = value; }
				}

			[Property("ProductName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ProductName
	{
		get { return _productName; }
					set { _productName = value; }
				}

			[Property("SubtypeName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SubtypeName
	{
		get { return _subtypeName; }
					set { _subtypeName = value; }
				}

			[Property("QTY", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? QTY
	{
		get { return _qTY; }
					set { _qTY = value; }
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

			[Property("RegionalManager", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string RegionalManager
	{
		get { return _regionalManager; }
					set { _regionalManager = value; }
				}

			[Property("DealerName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string DealerName
	{
		get { return _dealerName; }
					set { _dealerName = value; }
				}

			[Property("ContractBuyerName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ContractBuyerName
	{
		get { return _contractBuyerName; }
					set { _contractBuyerName = value; }
				}

			[Property("ContractNo", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ContractNo
	{
		get { return _contractNo; }
					set { _contractNo = value; }
				}

			[Property("ContractAmountUSD", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? ContractAmountUSD
	{
		get { return _contractAmountUSD; }
					set { _contractAmountUSD = value; }
				}

			[Property("ApplicationTrainingAmount", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? ApplicationTrainingAmount
	{
		get { return _applicationTrainingAmount; }
					set { _applicationTrainingAmount = value; }
				}

			[Property("ExtendedWarrantyAmount", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? ExtendedWarrantyAmount
	{
		get { return _extendedWarrantyAmount; }
					set { _extendedWarrantyAmount = value; }
				}

			[Property("ExtendedWarrantyMonths", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? ExtendedWarrantyMonths
	{
		get { return _extendedWarrantyMonths; }
					set { _extendedWarrantyMonths = value; }
				}

			[Property("NetPriceUSD", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? NetPriceUSD
	{
		get { return _netPriceUSD; }
					set { _netPriceUSD = value; }
				}

			[Property("PaymentTerm", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string PaymentTerm
	{
		get { return _paymentTerm; }
					set { _paymentTerm = value; }
				}

			[Property("OITMonth", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OITMonth
	{
		get { return _oITMonth; }
					set { _oITMonth = value; }
				}

			[Property("OA", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OA
	{
		get { return _oA; }
					set { _oA = value; }
				}

			[Property("OM", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OM
	{
		get { return _oM; }
					set { _oM = value; }
				}

			[Property("LocalDealerCommission", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string LocalDealerCommission
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

			[Property("ApplicationTraining", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ApplicationTraining
	{
		get { return _applicationTraining; }
					set { _applicationTraining = value; }
				}

			[Property("LandingPlan", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? LandingPlan
	{
		get { return _landingPlan; }
					set { _landingPlan = value; }
				}

			[Property("GroupTraining", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? GroupTraining
	{
		get { return _groupTraining; }
					set { _groupTraining = value; }
				}

			[Property("ClinicalCourses", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? ClinicalCourses
	{
		get { return _clinicalCourses; }
					set { _clinicalCourses = value; }
				}

			[Property("OverseaTraining", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OverseaTraining
	{
		get { return _overseaTraining; }
					set { _overseaTraining = value; }
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

			[Property("FinancialRisk", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string FinancialRisk
	{
		get { return _financialRisk; }
					set { _financialRisk = value; }
				}

			[Property("Promote1", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Promote1
	{
		get { return _promote1; }
					set { _promote1 = value; }
				}

			[Property("Promote2", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Promote2
	{
		get { return _promote2; }
					set { _promote2 = value; }
				}

			[Property("Promote3", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Promote3
	{
		get { return _promote3; }
					set { _promote3 = value; }
				}

			[Property("Promote4", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Promote4
	{
		get { return _promote4; }
					set { _promote4 = value; }
				}

			[Property("Promote5", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Promote5
	{
		get { return _promote5; }
					set { _promote5 = value; }
				}

			[Property("SalesFirstDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string SalesFirstDate
	{
		get { return _salesFirstDate; }
					set { _salesFirstDate = value; }
				}

			[Property("SalesFinallyDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string SalesFinallyDate
	{
		get { return _salesFinallyDate; }
					set { _salesFinallyDate = value; }
				}

			[Property("OITDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string OITDate
	{
		get { return _oITDate; }
					set { _oITDate = value; }
				}

			[Property("OITCycleTime", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string OITCycleTime
	{
		get { return _oITCycleTime; }
					set { _oITCycleTime = value; }
				}

			[Property("OldSAPORWBS", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OldSAPORWBS
	{
		get { return _oldSAPORWBS; }
					set { _oldSAPORWBS = value; }
				}

			[Property("WBSChecking", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string WBSChecking
	{
		get { return _wBSChecking; }
					set { _wBSChecking = value; }
				}

			[Property("xx", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string xx
	{
		get { return _xx; }
					set { _xx = value; }
				}

			[Property("CountIn", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string CountIn
	{
		get { return _countIn; }
					set { _countIn = value; }
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
        return OrderYearMonthActual.Count(criteria);
    }
} // OrderYearMonthActual

}


