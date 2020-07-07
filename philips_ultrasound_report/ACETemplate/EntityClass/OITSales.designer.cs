namespace EntityClass
{
    // Business class OITSales generated from OITSales
    // Anna [2020-06-12] Created

    using System;
    using System.ComponentModel;
    using Castle.ActiveRecord;
    using NHibernate.Criterion;
    using Newtonsoft.Json;
    [ActiveRecord("OITSales")]
    public partial class OITSales : ActiveRecordBase<OITSales>
    {


        #region Private_Variables

        private int _id;
        private string _region;
        private string _areaName;
        private string _typeName;
        private string _subTypeName;
        private int? _year;
        private System.Decimal _m1;
        private System.Decimal _m2;
        private System.Decimal _m3;
        private System.Decimal _m4;
        private System.Decimal _m5;
        private System.Decimal _m6;
        private System.Decimal _m7;
        private System.Decimal _m8;
        private System.Decimal _m9;
        private System.Decimal _m10;
        private System.Decimal _m11;
        private System.Decimal _m12;
        private int? _typeArea;
        private string _productTypeName;
        private DateTime _createTime;

        #endregion

        #region Properties

        [PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }

        [Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string Region
        {
            get { return _region; }
            set { _region = value; }
        }

        [Property("AreaName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 100)]
        public string AreaName
        {
            get { return _areaName; }
            set { _areaName = value; }
        }

        [Property("TypeName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string TypeName
        {
            get { return _typeName; }
            set { _typeName = value; }
        }

        /// <summary>
        /// 只有产品的时候才有值； Value,
        /// </summary>
        [Property("SubTypeName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string SubTypeName
        {
            get { return _subTypeName; }
            set { _subTypeName = value; }
        }

        [Property("Year", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? Year
        {
            get { return _year; }
            set { _year = value; }
        }

        [Property("M1", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M1
        {
            get { return _m1; }
            set { _m1 = value; }
        }

        [Property("M2", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M2
        {
            get { return _m2; }
            set { _m2 = value; }
        }

        [Property("M3", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M3
        {
            get { return _m3; }
            set { _m3 = value; }
        }

        [Property("M4", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M4
        {
            get { return _m4; }
            set { _m4 = value; }
        }

        [Property("M5", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M5
        {
            get { return _m5; }
            set { _m5 = value; }
        }

        [Property("M6", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M6
        {
            get { return _m6; }
            set { _m6 = value; }
        }

        [Property("M7", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M7
        {
            get { return _m7; }
            set { _m7 = value; }
        }

        [Property("M8", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M8
        {
            get { return _m8; }
            set { _m8 = value; }
        }

        [Property("M9", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M9
        {
            get { return _m9; }
            set { _m9 = value; }
        }

        [Property("M10", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M10
        {
            get { return _m10; }
            set { _m10 = value; }
        }

        [Property("M11", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M11
        {
            get { return _m11; }
            set { _m11 = value; }
        }

        [Property("M12", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal M12
        {
            get { return _m12; }
            set { _m12 = value; }
        }

        /// <summary>
        /// 1省份 2 产品
        /// </summary>
        [Property("TypeArea", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? TypeArea
        {
            get { return _typeArea; }
            set { _typeArea = value; }
        }

        [Property("ProductTypeName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string ProductTypeName
        {
            get { return _productTypeName; }
            set { _productTypeName = value; }
        }

        [JsonConverter(typeof(DateTimeFormat))]

        [Property("CreateTime", Access = PropertyAccess.NosetterCamelcaseUnderscore, Insert = false, NotNull = true)]
        public DateTime CreateTime
        {
            get { return _createTime; }
            set { _createTime = value; }
        }

        #endregion


        public static Int64 RecordCount(params ICriterion[] criteria)
        {
            return OITSales.Count(criteria);
        }
    } // OITSales

}


