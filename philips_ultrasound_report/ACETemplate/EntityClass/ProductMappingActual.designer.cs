namespace EntityClass
{
// Business class ProductMappingActual generated from ProductMappingActual
// Anna [2020-01-02] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("ProductMappingActual")]
public partial class ProductMappingActual: ActiveRecordBase<ProductMappingActual> 
{


	#region Private_Variables

	private int _id;
	private string _productName;
	private string _productNameAbbr;
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
        return ProductMappingActual.Count(criteria);
    }
} // ProductMappingActual

}


