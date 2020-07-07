namespace EntityClass
{
// Business class ByDistrictClinicalInfo generated from ByDistrictClinicalInfo
// Anna [2020-05-28] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("ByDistrictClinicalInfo")]
public partial class ByDistrictClinicalInfo: ActiveRecordBase<ByDistrictClinicalInfo> 
{


	#region Private_Variables

	private int _id;
	private string _batchID;
	private int _year;
	private int _month;
	private string _region;
	private string _district;
	private System.Decimal? _cVOITYTDActual;
	private System.Decimal? _cVOITTarget;
	private System.Decimal? _cVFunnel;
	private System.Decimal? _cVSalesYTDActual;
	private System.Decimal? _cVSalesTarget;
	private System.Decimal? _gIOITYTDActual;
	private System.Decimal? _gIOITTarget;
	private System.Decimal? _gIFunnel;
	private System.Decimal? _gISalesYTDActual;
	private System.Decimal? _gISalesTarget;
	private System.Decimal? _wHCOITYTDActual;
	private System.Decimal? _wHCOITTarget;
	private System.Decimal? _wHCFunnel;
	private System.Decimal? _wHCSalesYTDActual;
	private System.Decimal? _wHCSalesTarget;
	private System.Decimal? _pOCOITYTDActual;
	private System.Decimal? _pOCOITTarget;
	private System.Decimal? _pOCFunnel;
	private System.Decimal? _pOCSalesYTDActual;
	private System.Decimal? _pOCSalesTarget;
	private DateTime? _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 20)]
	public string BatchID
	{
		get { return _batchID; }
					set { _batchID = value; }
				}

			[Property("Year", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int Year
	{
		get { return _year; }
					set { _year = value; }
				}

			[Property("Month", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int Month
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

			[Property("CVOITYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? CVOITYTDActual
	{
		get { return _cVOITYTDActual; }
					set { _cVOITYTDActual = value; }
				}

			[Property("CVOITTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? CVOITTarget
	{
		get { return _cVOITTarget; }
					set { _cVOITTarget = value; }
				}

			[Property("CVFunnel", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? CVFunnel
	{
		get { return _cVFunnel; }
					set { _cVFunnel = value; }
				}

			[Property("CVSalesYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? CVSalesYTDActual
	{
		get { return _cVSalesYTDActual; }
					set { _cVSalesYTDActual = value; }
				}

			[Property("CVSalesTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? CVSalesTarget
	{
		get { return _cVSalesTarget; }
					set { _cVSalesTarget = value; }
				}

			[Property("GIOITYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? GIOITYTDActual
	{
		get { return _gIOITYTDActual; }
					set { _gIOITYTDActual = value; }
				}

			[Property("GIOITTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? GIOITTarget
	{
		get { return _gIOITTarget; }
					set { _gIOITTarget = value; }
				}

			[Property("GIFunnel", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? GIFunnel
	{
		get { return _gIFunnel; }
					set { _gIFunnel = value; }
				}

			[Property("GISalesYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? GISalesYTDActual
	{
		get { return _gISalesYTDActual; }
					set { _gISalesYTDActual = value; }
				}

			[Property("GISalesTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? GISalesTarget
	{
		get { return _gISalesTarget; }
					set { _gISalesTarget = value; }
				}

			[Property("WHCOITYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? WHCOITYTDActual
	{
		get { return _wHCOITYTDActual; }
					set { _wHCOITYTDActual = value; }
				}

			[Property("WHCOITTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? WHCOITTarget
	{
		get { return _wHCOITTarget; }
					set { _wHCOITTarget = value; }
				}

			[Property("WHCFunnel", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? WHCFunnel
	{
		get { return _wHCFunnel; }
					set { _wHCFunnel = value; }
				}

			[Property("WHCSalesYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? WHCSalesYTDActual
	{
		get { return _wHCSalesYTDActual; }
					set { _wHCSalesYTDActual = value; }
				}

			[Property("WHCSalesTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? WHCSalesTarget
	{
		get { return _wHCSalesTarget; }
					set { _wHCSalesTarget = value; }
				}

			[Property("POCOITYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? POCOITYTDActual
	{
		get { return _pOCOITYTDActual; }
					set { _pOCOITYTDActual = value; }
				}

			[Property("POCOITTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? POCOITTarget
	{
		get { return _pOCOITTarget; }
					set { _pOCOITTarget = value; }
				}

			[Property("POCFunnel", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? POCFunnel
	{
		get { return _pOCFunnel; }
					set { _pOCFunnel = value; }
				}

			[Property("POCSalesYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? POCSalesYTDActual
	{
		get { return _pOCSalesYTDActual; }
					set { _pOCSalesYTDActual = value; }
				}

			[Property("POCSalesTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? POCSalesTarget
	{
		get { return _pOCSalesTarget; }
					set { _pOCSalesTarget = value; }
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
        return ByDistrictClinicalInfo.Count(criteria);
    }
} // ByDistrictClinicalInfo

}


