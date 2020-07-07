namespace EntityClass
{
// Business class ImportFile generated from ImportFile
// Anna [2020-05-22] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("ImportFile")]
public partial class ImportFile: ActiveRecordBase<ImportFile> 
{


	#region Private_Variables

	private int _id;
	private int? _year;
	private int? _month;
	private string _fileName;
	private string _fileURL;
	private string _tableType;
	private int? _total;
	private DateTime _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
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

			[Property("FileName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string FileName
	{
		get { return _fileName; }
					set { _fileName = value; }
				}

			[Property("FileURL", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 1000)]
	public string FileURL
	{
		get { return _fileURL; }
					set { _fileURL = value; }
				}

			[Property("TableType", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string TableType
	{
		get { return _tableType; }
					set { _tableType = value; }
				}

			[Property("Total", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? Total
	{
		get { return _total; }
					set { _total = value; }
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
        return ImportFile.Count(criteria);
    }
} // ImportFile

}


