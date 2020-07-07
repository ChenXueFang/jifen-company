namespace EntityClass
{
// Business class FCSTAccuracy generated from FCSTAccuracy
// Anna [2020-06-10] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("FCSTAccuracy")]
public partial class FCSTAccuracy: ActiveRecordBase<FCSTAccuracy> 
{


	#region Private_Variables

	private int _id;
	private string _region;
	private string _area;
	private string _district;
	private System.Decimal? _accuracy1;
	private System.Decimal? _accuracy2;
	private System.Decimal? _accuracy3;
	private System.Decimal? _accuracy4;
	private System.Decimal? _accuracy5;
	private System.Decimal? _accuracy6;
	private System.Decimal? _accuracy7;
	private System.Decimal? _accuracy8;
	private System.Decimal? _accuracy9;
	private System.Decimal? _accuracy10;
	private System.Decimal? _accuracy11;
	private System.Decimal? _accuracy12;
	private int? _year;
	private int? _month;
	private int? _batchID;
	private DateTime? _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
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

			[Property("District", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string District
	{
		get { return _district; }
					set { _district = value; }
				}

			[Property("Accuracy1", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy1
	{
		get { return _accuracy1; }
					set { _accuracy1 = value; }
				}

			[Property("Accuracy2", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy2
	{
		get { return _accuracy2; }
					set { _accuracy2 = value; }
				}

			[Property("Accuracy3", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy3
	{
		get { return _accuracy3; }
					set { _accuracy3 = value; }
				}

			[Property("Accuracy4", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy4
	{
		get { return _accuracy4; }
					set { _accuracy4 = value; }
				}

			[Property("Accuracy5", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy5
	{
		get { return _accuracy5; }
					set { _accuracy5 = value; }
				}

			[Property("Accuracy6", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy6
	{
		get { return _accuracy6; }
					set { _accuracy6 = value; }
				}

			[Property("Accuracy7", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy7
	{
		get { return _accuracy7; }
					set { _accuracy7 = value; }
				}

			[Property("Accuracy8", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy8
	{
		get { return _accuracy8; }
					set { _accuracy8 = value; }
				}

			[Property("Accuracy9", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy9
	{
		get { return _accuracy9; }
					set { _accuracy9 = value; }
				}

			[Property("Accuracy10", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy10
	{
		get { return _accuracy10; }
					set { _accuracy10 = value; }
				}

			[Property("Accuracy11", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy11
	{
		get { return _accuracy11; }
					set { _accuracy11 = value; }
				}

			[Property("Accuracy12", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public System.Decimal? Accuracy12
	{
		get { return _accuracy12; }
					set { _accuracy12 = value; }
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

			[Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? BatchID
	{
		get { return _batchID; }
					set { _batchID = value; }
				}

			[Property("CreateTime", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public DateTime? CreateTime
	{
		get { return _createTime; }
					set { _createTime = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return FCSTAccuracy.Count(criteria);
    }
} // FCSTAccuracy

}


