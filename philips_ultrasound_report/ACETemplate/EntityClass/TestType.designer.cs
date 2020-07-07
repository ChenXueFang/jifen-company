namespace EntityClass
{
// Business class TestType generated from TestType
// uifull [2016-10-24] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;

[ActiveRecord("TestType")]
public partial class TestType: ActiveRecordBase<TestType> 
{


	#region Private_Variables

	private int _id;
	private string _text;
	private bool _isEnable;
	private bool? _isDelete;

	#endregion

	#region Properties

		[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

		[Property("Text", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string Text
	{
		get { return _text; }
					set { _text = value; }
				}

		[Property("IsEnable", Access = PropertyAccess.NosetterCamelcaseUnderscore, Insert=false, NotNull = true)]
	public bool IsEnable
	{
		get { return _isEnable; }
					set { _isEnable = value; }
				}

		[Property("IsDelete", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public bool? IsDelete
	{
		get { return _isDelete; }
					set { _isDelete = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return TestType.Count(criteria);
    }
} // TestType

}


