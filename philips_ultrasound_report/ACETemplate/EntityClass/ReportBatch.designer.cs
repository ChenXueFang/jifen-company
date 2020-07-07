namespace EntityClass
{
// Business class ReportBatch generated from ReportBatch
// Anna [2020-05-22] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("ReportBatch")]
public partial class ReportBatch: ActiveRecordBase<ReportBatch> 
{


	#region Private_Variables

	private int _id;
	private int _year;
	private int _month;
	private int _tableTypeID;
	private int _importID;
	private DateTime _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
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

			[Property("TableTypeID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int TableTypeID
	{
		get { return _tableTypeID; }
					set { _tableTypeID = value; }
				}

			[Property("ImportID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int ImportID
	{
		get { return _importID; }
					set { _importID = value; }
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
        return ReportBatch.Count(criteria);
    }
} // ReportBatch

}


