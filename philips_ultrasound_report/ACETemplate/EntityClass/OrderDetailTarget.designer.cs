namespace EntityClass
{
// Business class OrderDetailTarget generated from OrderDetailTarget
// Anna [2020-06-08] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("OrderDetailTarget")]
public partial class OrderDetailTarget: ActiveRecordBase<OrderDetailTarget> 
{


	#region Private_Variables

	private int _id;
	private int? _importID;
	private string _detailsNo;
	private string _oITSales;
	private int _year;
	private string _qtr;
	private string _month;
	private string _country;
	private string _newArea;
	private string _newRegion;
	private string _newDistrict;
	private string _wBS;
	private string _sO;
	private string _salesName;
	private string _mAGCode;
	private string _mAGName;
	private string _rTDescription;
	private string _hospitalName;
	private System.Decimal _actKUSD;
	private int _qty;
	private string _channel;
	private string _dealerManual;
	private string _dealer;
	private string _clinical;
	private string _dealerClinicalFlag;
	private string _department;
	private string _hospCategory;
	private string _hospFlag;
	private string _customerID;
	private string _customerDICName;
	private string _opportunityID;
	private string _region;
	private string _district;
	private string _sAPArea;
	private string _sAPSalesName;
	private string _sAPShiptoParty;
	private string _sAPSoldtoParty;
	private string _segent;
	private string _uSOITDate;
	private string _adjustmentRemark;
	private string _hospitalType;
	private string _hWORSW;
	private string _solution;
	private string _hTA;
	private string _province;
	private string _stock;
	private bool _isDelete;
	private DateTime _createTime;

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

			[Property("DetailsNo", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string DetailsNo
	{
		get { return _detailsNo; }
					set { _detailsNo = value; }
				}

			[Property("OITSales", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 20)]
	public string OITSales
	{
		get { return _oITSales; }
					set { _oITSales = value; }
				}

			[Property("Year", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int Year
	{
		get { return _year; }
					set { _year = value; }
				}

			[Property("Qtr", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 10)]
	public string Qtr
	{
		get { return _qtr; }
					set { _qtr = value; }
				}

			[Property("Month", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 20)]
	public string Month
	{
		get { return _month; }
					set { _month = value; }
				}

			[Property("Country", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 20)]
	public string Country
	{
		get { return _country; }
					set { _country = value; }
				}

			[Property("NewArea", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string NewArea
	{
		get { return _newArea; }
					set { _newArea = value; }
				}

			[Property("NewRegion", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string NewRegion
	{
		get { return _newRegion; }
					set { _newRegion = value; }
				}

			[Property("NewDistrict", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string NewDistrict
	{
		get { return _newDistrict; }
					set { _newDistrict = value; }
				}

			[Property("WBS", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string WBS
	{
		get { return _wBS; }
					set { _wBS = value; }
				}

			[Property("SO", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string SO
	{
		get { return _sO; }
					set { _sO = value; }
				}

			[Property("SalesName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SalesName
	{
		get { return _salesName; }
					set { _salesName = value; }
				}

			[Property("MAGCode", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string MAGCode
	{
		get { return _mAGCode; }
					set { _mAGCode = value; }
				}

			[Property("MAGName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string MAGName
	{
		get { return _mAGName; }
					set { _mAGName = value; }
				}

			[Property("RTDescription", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 200)]
	public string RTDescription
	{
		get { return _rTDescription; }
					set { _rTDescription = value; }
				}

			[Property("HospitalName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 100)]
	public string HospitalName
	{
		get { return _hospitalName; }
					set { _hospitalName = value; }
				}

			[Property("ActKUSD", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public System.Decimal ActKUSD
	{
		get { return _actKUSD; }
					set { _actKUSD = value; }
				}

			[Property("Qty", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int Qty
	{
		get { return _qty; }
					set { _qty = value; }
				}

			[Property("Channel", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Channel
	{
		get { return _channel; }
					set { _channel = value; }
				}

			[Property("DealerManual", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string DealerManual
	{
		get { return _dealerManual; }
					set { _dealerManual = value; }
				}

			[Property("Dealer", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Dealer
	{
		get { return _dealer; }
					set { _dealer = value; }
				}

			[Property("Clinical", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 20)]
	public string Clinical
	{
		get { return _clinical; }
					set { _clinical = value; }
				}

			[Property("DealerClinicalFlag", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string DealerClinicalFlag
	{
		get { return _dealerClinicalFlag; }
					set { _dealerClinicalFlag = value; }
				}

			[Property("Department", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string Department
	{
		get { return _department; }
					set { _department = value; }
				}

			[Property("HospCategory", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string HospCategory
	{
		get { return _hospCategory; }
					set { _hospCategory = value; }
				}

			[Property("HospFlag", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string HospFlag
	{
		get { return _hospFlag; }
					set { _hospFlag = value; }
				}

			[Property("CustomerID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string CustomerID
	{
		get { return _customerID; }
					set { _customerID = value; }
				}

			[Property("CustomerDICName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string CustomerDICName
	{
		get { return _customerDICName; }
					set { _customerDICName = value; }
				}

			[Property("OpportunityID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OpportunityID
	{
		get { return _opportunityID; }
					set { _opportunityID = value; }
				}

			[Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string Region
	{
		get { return _region; }
					set { _region = value; }
				}

			[Property("District", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string District
	{
		get { return _district; }
					set { _district = value; }
				}

			[Property("SAPArea", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string SAPArea
	{
		get { return _sAPArea; }
					set { _sAPArea = value; }
				}

			[Property("SAPSalesName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string SAPSalesName
	{
		get { return _sAPSalesName; }
					set { _sAPSalesName = value; }
				}

			[Property("SAPShiptoParty", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SAPShiptoParty
	{
		get { return _sAPShiptoParty; }
					set { _sAPShiptoParty = value; }
				}

			[Property("SAPSoldtoParty", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SAPSoldtoParty
	{
		get { return _sAPSoldtoParty; }
					set { _sAPSoldtoParty = value; }
				}

			[Property("Segent", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Segent
	{
		get { return _segent; }
					set { _segent = value; }
				}

			[Property("USOITDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string USOITDate
	{
		get { return _uSOITDate; }
					set { _uSOITDate = value; }
				}

			[Property("AdjustmentRemark", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 200)]
	public string AdjustmentRemark
	{
		get { return _adjustmentRemark; }
					set { _adjustmentRemark = value; }
				}

			[Property("HospitalType", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string HospitalType
	{
		get { return _hospitalType; }
					set { _hospitalType = value; }
				}

			[Property("HWORSW", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string HWORSW
	{
		get { return _hWORSW; }
					set { _hWORSW = value; }
				}

			[Property("Solution", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Solution
	{
		get { return _solution; }
					set { _solution = value; }
				}

			[Property("HTA", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string HTA
	{
		get { return _hTA; }
					set { _hTA = value; }
				}

			[Property("Province", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Province
	{
		get { return _province; }
					set { _province = value; }
				}

			[Property("Stock", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 10)]
	public string Stock
	{
		get { return _stock; }
					set { _stock = value; }
				}

			[Property("IsDelete", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public bool IsDelete
	{
		get { return _isDelete; }
					set { _isDelete = value; }
				}

				        [JsonConverter(typeof(DateTimeFormat))]

		[Property("CreateTime", Access = PropertyAccess.NosetterCamelcaseUnderscore, Insert=false, NotNull = true)]
	public DateTime CreateTime
	{
		get { return _createTime; }
					set { _createTime = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return OrderDetailTarget.Count(criteria);
    }
} // OrderDetailTarget

}


