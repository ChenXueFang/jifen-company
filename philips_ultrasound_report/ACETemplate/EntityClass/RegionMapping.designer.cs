namespace EntityClass
{
// Business class RegionMapping generated from RegionMapping
// Anna [2020-06-13] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("RegionMapping")]
public partial class RegionMapping: ActiveRecordBase<RegionMapping> 
{


	#region Private_Variables

	private int _id;
	private string _name;

	#endregion

	#region Properties

			[PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
	public int ID
	{
		get { return _id; }
					set { _id = value; }
				}

			[Property("Name", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string Name
	{
		get { return _name; }
					set { _name = value; }
				}

	#endregion


    public static Int64 RecordCount(params ICriterion[] criteria)
    {
        return RegionMapping.Count(criteria);
    }
} // RegionMapping

}


