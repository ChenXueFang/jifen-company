namespace EntityClass
{
// Business class V_ThreeRateProvince generated from V_ThreeRateProvince
// Anna [2020-06-10] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("V_ThreeRateProvince")]
public partial class V_ThreeRateProvince: ActiveRecordBase<V_ThreeRateProvince> 
{


	#region Private_Variables

	private int _id;
	private string _batchID;
	private int? _year;
	private int? _month;
	private string _region;
	private string _province;
	private string _l3WinRate;
	private string _l3Coverage;
	private string _l3Penetration;
	private string _l2WinRate;
	private string _l2Coverage;
	private string _l2Penetration;
	private string _l1Penetration;
	private DateTime? _createTime;
	private string _districtName;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string BatchID
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

			[Property("Province", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Province
	{
		get { return _province; }
					set { _province = value; }
				}

			[Property("L3WinRate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string L3WinRate
	{
		get { return _l3WinRate; }
					set { _l3WinRate = value; }
				}

			[Property("L3Coverage", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string L3Coverage
	{
		get { return _l3Coverage; }
					set { _l3Coverage = value; }
				}

			[Property("L3Penetration", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string L3Penetration
	{
		get { return _l3Penetration; }
					set { _l3Penetration = value; }
				}

			[Property("L2WinRate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string L2WinRate
	{
		get { return _l2WinRate; }
					set { _l2WinRate = value; }
				}

			[Property("L2Coverage", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string L2Coverage
	{
		get { return _l2Coverage; }
					set { _l2Coverage = value; }
				}

			[Property("L2Penetration", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string L2Penetration
	{
		get { return _l2Penetration; }
					set { _l2Penetration = value; }
				}

			[Property("L1Penetration", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string L1Penetration
	{
		get { return _l1Penetration; }
					set { _l1Penetration = value; }
				}

			[Property("CreateTime", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public DateTime? CreateTime
	{
		get { return _createTime; }
					set { _createTime = value; }
				}

			[Property("DistrictName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string DistrictName
	{
		get { return _districtName; }
					set { _districtName = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return V_ThreeRateProvince.Count(criteria);
    }
} // V_ThreeRateProvince

}


