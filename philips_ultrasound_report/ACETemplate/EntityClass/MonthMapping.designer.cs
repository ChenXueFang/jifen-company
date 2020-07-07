namespace EntityClass
{
// Business class MonthMapping generated from MonthMapping
// Anna [2020-06-02] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("MonthMapping")]
public partial class MonthMapping: ActiveRecordBase<MonthMapping> 
{


	#region Private_Variables

	private int _id;
	private string _monthEnglish;
	private int? _monthNum;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("MonthEnglish", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
	public string MonthEnglish
	{
		get { return _monthEnglish; }
					set { _monthEnglish = value; }
				}

			[Property("MonthNum", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? MonthNum
	{
		get { return _monthNum; }
					set { _monthNum = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return MonthMapping.Count(criteria);
    }
} // MonthMapping

}


