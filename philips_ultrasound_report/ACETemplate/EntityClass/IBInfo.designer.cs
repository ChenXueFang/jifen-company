namespace EntityClass
{
// Business class IBInfo generated from IBInfo
// Anna [2020-05-26] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("IBInfo")]
public partial class IBInfo: ActiveRecordBase<IBInfo> 
{


	#region Private_Variables

	private int _id;
	private string _batchID;
	private string _jSON;
	private int _year;
	private int _month;
	private DateTime _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string BatchID
	{
		get { return _batchID; }
					set { _batchID = value; }
				}

			[Property("JSON", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, ColumnType = "StringClob")]
	public string JSON
	{
		get { return _jSON; }
					set { _jSON = value; }
				}

			[Property("Year", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int Year
	{
		get { return _year; }
					set { _year = value; }
				}

			[Property("month", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int month
	{
		get { return _month; }
					set { _month = value; }
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
        return IBInfo.Count(criteria);
    }
} // IBInfo

}


