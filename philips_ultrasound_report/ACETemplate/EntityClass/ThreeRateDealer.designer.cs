namespace EntityClass
{
// Business class ThreeRateDealer generated from ThreeRateDealer
// Anna [2020-05-26] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("ThreeRateDealer")]
public partial class ThreeRateDealer: ActiveRecordBase<ThreeRateDealer> 
{


	#region Private_Variables

	private int _id;
	private string _batchID;
	private int? _year;
	private int? _month;
	private string _region;
	private string _district;
	private string _district1;
	private string _dealer;
	private string _dealer1;
	private string _l3WinRate;
	private string _l3Coverage;
	private string _l3Penetration;
	private string _l2WinRate;
	private string _l2Coverage;
	private string _l2Penetration;
	private DateTime? _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
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

			[Property("District", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string District
	{
		get { return _district; }
					set { _district = value; }
				}

			[Property("District1", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string District1
	{
		get { return _district1; }
					set { _district1 = value; }
				}

			[Property("Dealer", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string Dealer
	{
		get { return _dealer; }
					set { _dealer = value; }
				}

			[Property("Dealer1", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string Dealer1
	{
		get { return _dealer1; }
					set { _dealer1 = value; }
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

			[Property("L2Coverage", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string L2Coverage
	{
		get { return _l2Coverage; }
					set { _l2Coverage = value; }
				}

			[Property("L2Penetration", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string L2Penetration
	{
		get { return _l2Penetration; }
					set { _l2Penetration = value; }
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
        return ThreeRateDealer.Count(criteria);
    }
} // ThreeRateDealer

}


