namespace EntityClass
{
// Business class ByDistrictInfo generated from ByDistrictInfo
// Anna [2020-06-10] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("ByDistrictInfo")]
public partial class ByDistrictInfo: ActiveRecordBase<ByDistrictInfo> 
{


	#region Private_Variables

	private int _id;
	private string _batchID;
	private int? _year;
	private int? _month;
	private string _region;
	private string _district;
	private System.Decimal? _oITActual;
	private System.Decimal? _oITTarget;
	private System.Decimal? _oITYTDActual;
	private System.Decimal? _oITYTarget;
	private System.Decimal? _oITHTAActual;
	private System.Decimal? _funnel;
	private System.Decimal? _transrate;
	private System.Decimal? _fCST;
	private System.Decimal? _fCSTN2M;
	private System.Decimal? _salesActual;
	private System.Decimal? _salesTarget;
	private System.Decimal? _salesYTDActual;
	private System.Decimal? _salesYTarget;
	private System.Decimal? _salesHTAActual;
	private System.Decimal? _oOH;
	private int? _invenrotyIsNinety;
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

			[Property("OITActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? OITActual
	{
		get { return _oITActual; }
					set { _oITActual = value; }
				}

			[Property("OITTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? OITTarget
	{
		get { return _oITTarget; }
					set { _oITTarget = value; }
				}

			[Property("OITYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? OITYTDActual
	{
		get { return _oITYTDActual; }
					set { _oITYTDActual = value; }
				}

			[Property("OITYTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? OITYTarget
	{
		get { return _oITYTarget; }
					set { _oITYTarget = value; }
				}

			[Property("OITHTAActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? OITHTAActual
	{
		get { return _oITHTAActual; }
					set { _oITHTAActual = value; }
				}

			[Property("Funnel", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Funnel
	{
		get { return _funnel; }
					set { _funnel = value; }
				}

			[Property("Transrate", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Transrate
	{
		get { return _transrate; }
					set { _transrate = value; }
				}

			[Property("FCST", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? FCST
	{
		get { return _fCST; }
					set { _fCST = value; }
				}

			[Property("FCSTN2M", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? FCSTN2M
	{
		get { return _fCSTN2M; }
					set { _fCSTN2M = value; }
				}

			[Property("SalesActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? SalesActual
	{
		get { return _salesActual; }
					set { _salesActual = value; }
				}

			[Property("SalesTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? SalesTarget
	{
		get { return _salesTarget; }
					set { _salesTarget = value; }
				}

			[Property("SalesYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? SalesYTDActual
	{
		get { return _salesYTDActual; }
					set { _salesYTDActual = value; }
				}

			[Property("SalesYTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? SalesYTarget
	{
		get { return _salesYTarget; }
					set { _salesYTarget = value; }
				}

			[Property("SalesHTAActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? SalesHTAActual
	{
		get { return _salesHTAActual; }
					set { _salesHTAActual = value; }
				}

			[Property("OOH", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? OOH
	{
		get { return _oOH; }
					set { _oOH = value; }
				}

			[Property("InvenrotyIsNinety", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? InvenrotyIsNinety
	{
		get { return _invenrotyIsNinety; }
					set { _invenrotyIsNinety = value; }
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
        return ByDistrictInfo.Count(criteria);
    }
} // ByDistrictInfo

}


