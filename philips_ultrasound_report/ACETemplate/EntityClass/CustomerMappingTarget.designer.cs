namespace EntityClass
{
// Business class CustomerMappingTarget generated from CustomerMappingTarget
// Anna [2020-01-03] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("CustomerMappingTarget")]
public partial class CustomerMappingTarget: ActiveRecordBase<CustomerMappingTarget> 
{


	#region Private_Variables

	private int _id;
	private string _customerSysID;
	private string _customerIDCRM;
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

			[Property("CustomerSysID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string CustomerSysID
	{
		get { return _customerSysID; }
					set { _customerSysID = value; }
				}

			[Property("CustomerIDCRM", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string CustomerIDCRM
	{
		get { return _customerIDCRM; }
					set { _customerIDCRM = value; }
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
        return CustomerMappingTarget.Count(criteria);
    }
} // CustomerMappingTarget

}


