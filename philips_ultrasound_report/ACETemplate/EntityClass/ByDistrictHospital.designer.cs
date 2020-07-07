namespace EntityClass
{
// Business class ByDistrictHospital generated from ByDistrictHospital
// Anna [2020-06-15] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("ByDistrictHospital")]
public partial class ByDistrictHospital: ActiveRecordBase<ByDistrictHospital> 
{


	#region Private_Variables

	private int _id;
	private int _batchID;
	private int? _year;
	private int? _month;
	private string _region;
	private string _district;
	private string _hospitalName;
	private int? _qty;
	private string _hospitalType;
	private string _oITSales;
	private DateTime? _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int BatchID
	{
		get { return _batchID; }
					set { _batchID = value; }
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

			[Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Region
	{
		get { return _region; }
					set { _region = value; }
				}

			[Property("District", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string District
	{
		get { return _district; }
					set { _district = value; }
				}

			[Property("HospitalName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string HospitalName
	{
		get { return _hospitalName; }
					set { _hospitalName = value; }
				}

			[Property("Qty", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? Qty
	{
		get { return _qty; }
					set { _qty = value; }
				}

			[Property("HospitalType", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string HospitalType
	{
		get { return _hospitalType; }
					set { _hospitalType = value; }
				}

			[Property("OITSales", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string OITSales
	{
		get { return _oITSales; }
					set { _oITSales = value; }
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
        return ByDistrictHospital.Count(criteria);
    }
} // ByDistrictHospital

}


