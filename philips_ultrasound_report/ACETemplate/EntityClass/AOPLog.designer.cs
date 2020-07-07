namespace EntityClass
{
// Business class AOPLog generated from AOPLog
// uifull [2016-09-23] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;

[ActiveRecord("AOPLog")]
public partial class AOPLog: ActiveRecordBase<AOPLog> 
{


	#region Private_Variables

	private long _id;
	private string _pageName;
	private string _absoluteUri;
	private string _fromString;
	private string __Op;
	private DateTime _createTime;
	private string _sessionID;
	private string _userID;
	private string _iP;
	private int _levelInfo;
	private string _result;

	#endregion

	#region Properties

	[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public long ID
	{
		get { return _id; }
					set { _id = value; }
				}

	[Property("PageName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 255)]
	public string PageName
	{
		get { return _pageName; }
					set { _pageName = value; }
				}

	[Property("AbsoluteUri", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 2000)]
	public string AbsoluteUri
	{
		get { return _absoluteUri; }
					set { _absoluteUri = value; }
				}

	[Property("FromString", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 4000)]
	public string FromString
	{
		get { return _fromString; }
					set { _fromString = value; }
				}

	[Property("_Op", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string _Op
	{
		get { return __Op; }
					set { __Op = value; }
				}

	[Property("CreateTime", Access = PropertyAccess.NosetterCamelcaseUnderscore, Insert=false, NotNull = true)]
	public DateTime CreateTime
	{
		get { return _createTime; }
					set { _createTime = value; }
				}

	[Property("SessionID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string SessionID
	{
		get { return _sessionID; }
					set { _sessionID = value; }
				}

	[Property("UserID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 10)]
	public string UserID
	{
		get { return _userID; }
					set { _userID = value; }
				}

	[Property("IP", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string IP
	{
		get { return _iP; }
					set { _iP = value; }
				}

	[Property("LevelInfo", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int LevelInfo
	{
		get { return _levelInfo; }
					set { _levelInfo = value; }
				}

	[Property("Result", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 255)]
	public string Result
	{
		get { return _result; }
					set { _result = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return AOPLog.Count(criteria);
    }
} // AOPLog

}


