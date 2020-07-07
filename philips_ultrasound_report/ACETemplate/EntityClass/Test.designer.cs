namespace EntityClass
{
// Business class Test generated from Test
// uifull [2019-05-10] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("Test")]
public partial class Test: ActiveRecordBase<Test> 
{


	#region Private_Variables

	private int _id;
	private string _text;
	private int _type;
	private string _image;
	private string _noedit;
	private bool _isDelete;
	private int? _userId;
	private string _noEdit1;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			/// <summary>
        /// 123123
        /// </summary>
				[Property("Text", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string Text
	{
		get { return _text; }
					set { _text = value; }
				}

			/// <summary>
        /// 类型
        /// </summary>
				[Property("Type", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public int Type
	{
		get { return _type; }
					set { _type = value; }
				}

			[Property("Image", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 250)]
	public string Image
	{
		get { return _image; }
					set { _image = value; }
				}

			[Property("Noedit", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 10)]
	public string Noedit
	{
		get { return _noedit; }
					set { _noedit = value; }
				}

			[Property("IsDelete", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public bool IsDelete
	{
		get { return _isDelete; }
					set { _isDelete = value; }
				}

			[Property("UserId", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
	public int? UserId
	{
		get { return _userId; }
					set { _userId = value; }
				}

			[Property("NoEdit1", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
	public string NoEdit1
	{
		get { return _noEdit1; }
					set { _noEdit1 = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return Test.Count(criteria);
    }
} // Test

}


