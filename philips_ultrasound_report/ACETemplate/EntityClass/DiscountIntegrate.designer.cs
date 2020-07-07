namespace EntityClass
{
    // Business class DiscountIntegrate generated from DiscountIntegrate
    // Anna [2020-06-10] Created

    using System;
    using System.ComponentModel;
    using Castle.ActiveRecord;
    using NHibernate.Criterion;
    using Newtonsoft.Json;
    [ActiveRecord("DiscountIntegrate")]
    public partial class DiscountIntegrate : ActiveRecordBase<DiscountIntegrate>
    {


        #region Private_Variables

        private int _id;
        private int? _batchID;
        private string _sofonNumber;
        private string _region;
        private string _area;
        private string _hospitalName;
        private string _dealerName;
        private string _clinical;
        private string _modality;
        private string _subtypeName;
        private System.Decimal? _discount;
        private int? _qty;
        private System.Decimal? _netPrice;
        private System.Decimal? _cTP;
        private string _cTPPercent;
        private string _oITMonth;
        private int? _month;
        private int? _year;
        private int? _quarter;
        private DateTime _createTime;

        #endregion

        #region Properties

        [PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }

        [Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? BatchID
        {
            get { return _batchID; }
            set { _batchID = value; }
        }

        [Property("SofonNumber", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string SofonNumber
        {
            get { return _sofonNumber; }
            set { _sofonNumber = value; }
        }

        [Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
        public string Region
        {
            get { return _region; }
            set { _region = value; }
        }

        [Property("Area", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
        public string Area
        {
            get { return _area; }
            set { _area = value; }
        }

        [Property("HospitalName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
        public string HospitalName
        {
            get { return _hospitalName; }
            set { _hospitalName = value; }
        }

        [Property("DealerName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
        public string DealerName
        {
            get { return _dealerName; }
            set { _dealerName = value; }
        }

        [Property("Clinical", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
        public string Clinical
        {
            get { return _clinical; }
            set { _clinical = value; }
        }

        [Property("Modality", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
        public string Modality
        {
            get { return _modality; }
            set { _modality = value; }
        }

        [Property("SubtypeName", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string SubtypeName
        {
            get { return _subtypeName; }
            set { _subtypeName = value; }
        }

        [Property("Discount", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? Discount
        {
            get { return _discount; }
            set { _discount = value; }
        }

        [Property("Qty", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? Qty
        {
            get { return _qty; }
            set { _qty = value; }
        }

        [Property("NetPrice", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? NetPrice
        {
            get { return _netPrice; }
            set { _netPrice = value; }
        }

        [Property("CTP", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? CTP
        {
            get { return _cTP; }
            set { _cTP = value; }
        }

        [Property("CTPPercent", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
        public string CTPPercent
        {
            get { return _cTPPercent; }
            set { _cTPPercent = value; }
        }

        [Property("OITMonth", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 20)]
        public string OITMonth
        {
            get { return _oITMonth; }
            set { _oITMonth = value; }
        }

        [Property("Month", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? Month
        {
            get { return _month; }
            set { _month = value; }
        }

        [Property("Year", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? Year
        {
            get { return _year; }
            set { _year = value; }
        }

        [Property("Quarter", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? Quarter
        {
            get { return _quarter; }
            set { _quarter = value; }
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
            return DiscountIntegrate.Count(criteria);
        }
    } // DiscountIntegrate

}


