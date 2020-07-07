namespace EntityClass
{
// Business class AreaMappingActual generated from AreaMappingActual
// Anna [2020-01-03] Created

using System;
using System.ComponentModel;
using Castle.ActiveRecord;
using NHibernate.Criterion;
using Newtonsoft.Json;
[ActiveRecord("AreaMappingActual")]
public partial class AreaMappingActual: ActiveRecordBase<AreaMappingActual> 
{


	#region Private_Variables

	private int _id;
	private string _name;
	private string _spell;
	private string _abbreviation;
	private string _area;
	private string _coverAreaName;
	private string _coverAreaAbbr;
	private string _systemClassify;
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

			[Property("Name", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string Name
	{
		get { return _name; }
					set { _name = value; }
				}

			[Property("Spell", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string Spell
	{
		get { return _spell; }
					set { _spell = value; }
				}

			/// <summary>
        /// 简称
        /// </summary>
				[Property("Abbreviation", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string Abbreviation
	{
		get { return _abbreviation; }
					set { _abbreviation = value; }
				}

			[Property("Area", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string Area
	{
		get { return _area; }
					set { _area = value; }
				}

			/// <summary>
        /// 包含的地区
        /// </summary>
				[Property("CoverAreaName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string CoverAreaName
	{
		get { return _coverAreaName; }
					set { _coverAreaName = value; }
				}

			/// <summary>
        /// 包含的地区简称
        /// </summary>
				[Property("CoverAreaAbbr", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string CoverAreaAbbr
	{
		get { return _coverAreaAbbr; }
					set { _coverAreaAbbr = value; }
				}

			/// <summary>
        /// 系统分类
        /// </summary>
				[Property("SystemClassify", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
	public string SystemClassify
	{
		get { return _systemClassify; }
					set { _systemClassify = value; }
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
        return AreaMappingActual.Count(criteria);
    }
} // AreaMappingActual

}


