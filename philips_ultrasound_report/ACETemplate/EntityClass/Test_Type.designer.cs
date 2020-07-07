namespace EntityClass
{
// Business class Test_Type generated from Test_Type
// uifull [2019-05-10] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("Test_Type")]
public partial class Test_Type: ActiveRecordBase<Test_Type> 
{


	#region Private_Variables

	private int _id;
	private int _testID;
	private int _testTypeID;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("TestID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int TestID
	{
		get { return _testID; }
					set { _testID = value; }
				}

			[Property("TestTypeID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int TestTypeID
	{
		get { return _testTypeID; }
					set { _testTypeID = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return Test_Type.Count(criteria);
    }
} // Test_Type

}


