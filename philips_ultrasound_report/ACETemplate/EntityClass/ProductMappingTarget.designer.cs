namespace EntityClass
{
// Business class ProductMappingTarget generated from ProductMappingTarget
// Anna [2020-01-03] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("ProductMappingTarget")]
public partial class ProductMappingTarget: ActiveRecordBase<ProductMappingTarget> 
{


	#region Private_Variables

	private int _id;
	private string _productName;
	private string _productNameAbbr;
	private bool _isDelete;
	private DateTime _createTime;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("ProductName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string ProductName
	{
		get { return _productName; }
					set { _productName = value; }
				}

			[Property("ProductNameAbbr", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string ProductNameAbbr
	{
		get { return _productNameAbbr; }
					set { _productNameAbbr = value; }
				}

			[Property("IsDelete", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
	public bool IsDelete
	{
		get { return _isDelete; }
					set { _isDelete = value; }
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
        return ProductMappingTarget.Count(criteria);
    }
} // ProductMappingTarget

}


