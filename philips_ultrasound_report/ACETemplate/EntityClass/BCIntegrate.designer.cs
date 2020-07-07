namespace EntityClass
{
// Business class BCIntegrate generated from BCIntegrate
// Anna [2020-06-08] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("BCIntegrate")]
public partial class BCIntegrate: ActiveRecordBase<BCIntegrate> 
{


	#region Private_Variables

	private int _id;
	private int? _batchID;
	private string _sOFON;
	private string _hospitalName;
	private string _application;
	private string _modality;
	private string _description;
	private int? _qTY;
	private string _area;
	private string _region;
	private string _dealerName;
	private string _bCLevel;
	private System.Decimal? _netPrice;
	private string _oITMonth;
	private int? _month;
	private int? _year;
	private System.Decimal? _surrenderProfits;
	private string _publicORPrivate;
	private int? _quarter;
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

			[Property("SOFON", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SOFON
	{
		get { return _sOFON; }
					set { _sOFON = value; }
				}

			[Property("HospitalName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string HospitalName
	{
		get { return _hospitalName; }
					set { _hospitalName = value; }
				}

			[Property("Application", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Application
	{
		get { return _application; }
					set { _application = value; }
				}

			[Property("Modality", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string Modality
	{
		get { return _modality; }
					set { _modality = value; }
				}

			[Property("Description", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
	public string Description
	{
		get { return _description; }
					set { _description = value; }
				}

			[Property("QTY", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? QTY
	{
		get { return _qTY; }
					set { _qTY = value; }
				}

			[Property("Area", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string Area
	{
		get { return _area; }
					set { _area = value; }
				}

			[Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string Region
	{
		get { return _region; }
					set { _region = value; }
				}

			[Property("DealerName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string DealerName
	{
		get { return _dealerName; }
					set { _dealerName = value; }
				}

			[Property("BCLevel", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string BCLevel
	{
		get { return _bCLevel; }
					set { _bCLevel = value; }
				}

			[Property("NetPrice", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? NetPrice
	{
		get { return _netPrice; }
					set { _netPrice = value; }
				}

			[Property("OITMonth", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string OITMonth
	{
		get { return _oITMonth; }
					set { _oITMonth = value; }
				}

			[Property("Month", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? Month
	{
		get { return _month; }
					set { _month = value; }
				}

			[Property("Year", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? Year
	{
		get { return _year; }
					set { _year = value; }
				}

			[Property("SurrenderProfits", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? SurrenderProfits
	{
		get { return _surrenderProfits; }
					set { _surrenderProfits = value; }
				}

			[Property("PublicORPrivate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string PublicORPrivate
	{
		get { return _publicORPrivate; }
					set { _publicORPrivate = value; }
				}

			[Property("Quarter", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? Quarter
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
        return BCIntegrate.Count(criteria);
    }
} // BCIntegrate

}


