namespace EntityClass
{
// Business class UserRegionMapping generated from UserRegionMapping
// Anna [2020-06-13] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("UserRegionMapping")]
public partial class UserRegionMapping: ActiveRecordBase<UserRegionMapping> 
{


	#region Private_Variables

	private int _id;
	private int _userID;
	private int? _regionID;
	private string _regionName;
	private string _reportType;
	private DateTime? _updateTime;
	private DateTime? _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("UserID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int UserID
	{
		get { return _userID; }
					set { _userID = value; }
				}

			[Property("RegionID", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? RegionID
	{
		get { return _regionID; }
					set { _regionID = value; }
				}

			[Property("RegionName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string RegionName
	{
		get { return _regionName; }
					set { _regionName = value; }
				}

			[Property("ReportType", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string ReportType
	{
		get { return _reportType; }
					set { _reportType = value; }
				}

			[Property("UpdateTime", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public DateTime? UpdateTime
	{
		get { return _updateTime; }
					set { _updateTime = value; }
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
        return UserRegionMapping.Count(criteria);
    }
} // UserRegionMapping

}


