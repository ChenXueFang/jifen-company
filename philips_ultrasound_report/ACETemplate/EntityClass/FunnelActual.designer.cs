namespace EntityClass
{
    // Business class FunnelActual generated from FunnelActual
    // Anna [2020-05-28] Created

    using System;
    using System.ComponentModel;
    using Castle.ActiveRecord;
    using NHibernate.Criterion;
    using Newtonsoft.Json;
    [ActiveRecord("FunnelActual")]
    public partial class FunnelActual : ActiveRecordBase<FunnelActual>
    {


        #region Private_Variables

        private int _id;
        private int? _batchID;
        private string _detailsNo;
        private int _quantity;
        private string _opportunityID;
        private string _opportunityName;
        private string _accountID;
        private string _accountName;
        private string _possibility;
        private string _progress;
        private string _province;
        private string _currency;
        private System.Decimal _totalPrices;
        private string _productName;
        private string _businessDealerName;
        private string _businessOwner;
        private string _ownerRole;
        private string _clinicalDesc;
        private string _region;
        private string _area;
        private string _expectedOrderDate;
        private string _areaMAPPING;
        private string _productMAPPING;
        private string _clinicalMAPPING;
        private System.Decimal? _aSP;
        private System.Decimal? _net;
        private bool? _fCST;
        private int? _year;
        private int? _month;
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

        [Property("BatchID", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? BatchID
        {
            get { return _batchID; }
            set { _batchID = value; }
        }

        [Property("DetailsNo", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string DetailsNo
        {
            get { return _detailsNo; }
            set { _detailsNo = value; }
        }

        [Property("Quantity", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public int Quantity
        {
            get { return _quantity; }
            set { _quantity = value; }
        }

        [Property("OpportunityID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string OpportunityID
        {
            get { return _opportunityID; }
            set { _opportunityID = value; }
        }

        [Property("OpportunityName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string OpportunityName
        {
            get { return _opportunityName; }
            set { _opportunityName = value; }
        }

        [Property("AccountID", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string AccountID
        {
            get { return _accountID; }
            set { _accountID = value; }
        }

        [Property("AccountName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string AccountName
        {
            get { return _accountName; }
            set { _accountName = value; }
        }

        [Property("Possibility", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Possibility
        {
            get { return _possibility; }
            set { _possibility = value; }
        }

        [Property("Progress", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Progress
        {
            get { return _progress; }
            set { _progress = value; }
        }

        [Property("Province", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Province
        {
            get { return _province; }
            set { _province = value; }
        }

        [Property("Currency", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 20)]
        public string Currency
        {
            get { return _currency; }
            set { _currency = value; }
        }

        [Property("TotalPrices", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal TotalPrices
        {
            get { return _totalPrices; }
            set { _totalPrices = value; }
        }

        [Property("ProductName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string ProductName
        {
            get { return _productName; }
            set { _productName = value; }
        }

        [Property("BusinessDealerName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string BusinessDealerName
        {
            get { return _businessDealerName; }
            set { _businessDealerName = value; }
        }

        [Property("BusinessOwner", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string BusinessOwner
        {
            get { return _businessOwner; }
            set { _businessOwner = value; }
        }

        [Property("OwnerRole", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string OwnerRole
        {
            get { return _ownerRole; }
            set { _ownerRole = value; }
        }

        [Property("ClinicalDesc", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 200)]
        public string ClinicalDesc
        {
            get { return _clinicalDesc; }
            set { _clinicalDesc = value; }
        }

        [Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Region
        {
            get { return _region; }
            set { _region = value; }
        }

        [Property("Area", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Area
        {
            get { return _area; }
            set { _area = value; }
        }

        [Property("ExpectedOrderDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string ExpectedOrderDate
        {
            get { return _expectedOrderDate; }
            set { _expectedOrderDate = value; }
        }

        [Property("AreaMAPPING", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string AreaMAPPING
        {
            get { return _areaMAPPING; }
            set { _areaMAPPING = value; }
        }

        [Property("ProductMAPPING", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string ProductMAPPING
        {
            get { return _productMAPPING; }
            set { _productMAPPING = value; }
        }

        [Property("ClinicalMAPPING", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string ClinicalMAPPING
        {
            get { return _clinicalMAPPING; }
            set { _clinicalMAPPING = value; }
        }

        [Property("ASP", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? ASP
        {
            get { return _aSP; }
            set { _aSP = value; }
        }

        [Property("Net", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? Net
        {
            get { return _net; }
            set { _net = value; }
        }

        [Property("FCST", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public bool? FCST
        {
            get { return _fCST; }
            set { _fCST = value; }
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

        [Property("IsDelete", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public bool IsDelete
        {
            get { return _isDelete; }
            set { _isDelete = value; }
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
            return FunnelActual.Count(criteria);
        }
    } // FunnelActual

}


