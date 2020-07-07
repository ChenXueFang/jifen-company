namespace EntityClass
{
    // Business class ByProductInfo generated from ByProductInfo
    // Anna [2020-06-11] Created

    using System;
    using System.ComponentModel;
    using Castle.ActiveRecord;
    using NHibernate.Criterion;
    using Newtonsoft.Json;
    [ActiveRecord("ByProductInfo")]
    public partial class ByProductInfo : ActiveRecordBase<ByProductInfo>
    {


        #region Private_Variables

        private int _id;
        private string _batchID;
        private int? _year;
        private int? _month;
        private string _productName;
        private System.Decimal? _oITValueYTDActual;
        private System.Decimal? _oITValueTarget;
        private System.Decimal? _oITValueYTD;
        private System.Decimal? _valueFunnel;
        private System.Decimal? _oITUnitYTDActual;
        private System.Decimal? _oITUnitTarget;
        private System.Decimal? _oITUnitYTD;
        private System.Decimal? _unitFunnel;
        private System.Decimal? _salesValueYTDActual;
        private System.Decimal? _salesValueTarget;
        private System.Decimal? _salesValueYTD;
        private System.Decimal? _valueOOH;
        private System.Decimal? _salesUnitYTDActual;
        private System.Decimal? _salesUnitTarget;
        private System.Decimal? _salesUnitYTD;
        private System.Decimal? _unitOOH;
        private DateTime? _createTime;

        #endregion

        #region Properties

        [PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }

        [Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
        public string BatchID
        {
            get { return _batchID; }
            set { _batchID = value; }
        }

        [Property("Year", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? Year
        {
            get { return _year; }
            set { _year = value; }
        }

        [Property("Month", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? Month
        {
            get { return _month; }
            set { _month = value; }
        }

        [Property("ProductName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string ProductName
        {
            get { return _productName; }
            set { _productName = value; }
        }

        [Property("OITValueYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? OITValueYTDActual
        {
            get { return _oITValueYTDActual; }
            set { _oITValueYTDActual = value; }
        }

        [Property("OITValueTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? OITValueTarget
        {
            get { return _oITValueTarget; }
            set { _oITValueTarget = value; }
        }

        [Property("OITValueYTD", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? OITValueYTD
        {
            get { return _oITValueYTD; }
            set { _oITValueYTD = value; }
        }

        [Property("ValueFunnel", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? ValueFunnel
        {
            get { return _valueFunnel; }
            set { _valueFunnel = value; }
        }

        [Property("OITUnitYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? OITUnitYTDActual
        {
            get { return _oITUnitYTDActual; }
            set { _oITUnitYTDActual = value; }
        }

        [Property("OITUnitTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? OITUnitTarget
        {
            get { return _oITUnitTarget; }
            set { _oITUnitTarget = value; }
        }

        [Property("OITUnitYTD", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? OITUnitYTD
        {
            get { return _oITUnitYTD; }
            set { _oITUnitYTD = value; }
        }

        [Property("UnitFunnel", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? UnitFunnel
        {
            get { return _unitFunnel; }
            set { _unitFunnel = value; }
        }

        [Property("SalesValueYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? SalesValueYTDActual
        {
            get { return _salesValueYTDActual; }
            set { _salesValueYTDActual = value; }
        }

        [Property("SalesValueTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? SalesValueTarget
        {
            get { return _salesValueTarget; }
            set { _salesValueTarget = value; }
        }

        [Property("SalesValueYTD", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? SalesValueYTD
        {
            get { return _salesValueYTD; }
            set { _salesValueYTD = value; }
        }

        [Property("ValueOOH", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? ValueOOH
        {
            get { return _valueOOH; }
            set { _valueOOH = value; }
        }

        [Property("SalesUnitYTDActual", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? SalesUnitYTDActual
        {
            get { return _salesUnitYTDActual; }
            set { _salesUnitYTDActual = value; }
        }

        [Property("SalesUnitTarget", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? SalesUnitTarget
        {
            get { return _salesUnitTarget; }
            set { _salesUnitTarget = value; }
        }

        [Property("SalesUnitYTD", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? SalesUnitYTD
        {
            get { return _salesUnitYTD; }
            set { _salesUnitYTD = value; }
        }

        [Property("UnitOOH", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? UnitOOH
        {
            get { return _unitOOH; }
            set { _unitOOH = value; }
        }

        [Property("CreateTime", Access = PropertyAccess.NosetterCamelcaseUnderscore, Insert = false)]
        public DateTime? CreateTime
        {
            get { return _createTime; }
            set { _createTime = value; }
        }

        #endregion


        public static Int64 RecordCount(params ICriterion[] criteria)
        {
            return ByProductInfo.Count(criteria);
        }
    } // ByProductInfo

}


