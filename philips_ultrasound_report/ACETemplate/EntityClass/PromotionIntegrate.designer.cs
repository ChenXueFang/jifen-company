namespace EntityClass
{
// Business class PromotionIntegrate generated from PromotionIntegrate
// Anna [2020-06-08] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("PromotionIntegrate")]
public partial class PromotionIntegrate: ActiveRecordBase<PromotionIntegrate> 
{


	#region Private_Variables

	private int _id;
	private int? _batchID;
	private string _region;
	private string _area;
	private string _hospitalNameORDealer;
	private string _system;
	private string _segment;
	private string _promotion;
	private string _comments;
	private string _sofon;
	private string _oITMonth;
	private int? _qty;
	private int? _year;
	private int? _month;
	private string _quarter;
	private DateTime _createTime;

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

			[Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Region
	{
		get { return _region; }
					set { _region = value; }
				}

			[Property("Area", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Area
	{
		get { return _area; }
					set { _area = value; }
				}

			[Property("HospitalNameORDealer", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string HospitalNameORDealer
	{
		get { return _hospitalNameORDealer; }
					set { _hospitalNameORDealer = value; }
				}

			[Property("System", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string System
	{
		get { return _system; }
					set { _system = value; }
				}

			[Property("Segment", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Segment
	{
		get { return _segment; }
					set { _segment = value; }
				}

			[Property("Promotion", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Promotion
	{
		get { return _promotion; }
					set { _promotion = value; }
				}

			[Property("Comments", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Comments
	{
		get { return _comments; }
					set { _comments = value; }
				}

			[Property("sofon", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string sofon
	{
		get { return _sofon; }
					set { _sofon = value; }
				}

			[Property("OITMonth", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string OITMonth
	{
		get { return _oITMonth; }
					set { _oITMonth = value; }
				}

			[Property("Qty", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? Qty
	{
		get { return _qty; }
					set { _qty = value; }
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

			[Property("Quarter", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string Quarter
	{
		get { return _quarter; }
					set { _quarter = value; }
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
        return PromotionIntegrate.Count(criteria);
    }
} // PromotionIntegrate

}


