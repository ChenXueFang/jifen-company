namespace EntityClass
{
    // Business class FCSTCMActual generated from FCSTCMActual
    // Anna [2020-05-28] Created

    using System;
    using System.ComponentModel;
    using Castle.ActiveRecord;
    using NHibernate.Criterion;
    using Newtonsoft.Json;
    [ActiveRecord("FCSTCMActual")]
    public partial class FCSTCMActual : ActiveRecordBase<FCSTCMActual>
    {


        #region Private_Variables

        private int _id;
        private int? _batchID;
        private string _region;
        private string _province;
        private string _ownerRole;
        private string _opportunityID;
        private string _opportunityName;
        private string _accountID;
        private string _accountName;
        private string _productName;
        private string _expectedOrderDate;
        private int _quantity;
        private System.Decimal? _funnelKUSD;
        private string _areaMAPPING;
        private string _productMAPPING;
        private string _clinicalMAPPING;
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

        [Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Region
        {
            get { return _region; }
            set { _region = value; }
        }

        [Property("Province", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Province
        {
            get { return _province; }
            set { _province = value; }
        }

        [Property("OwnerRole", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string OwnerRole
        {
            get { return _ownerRole; }
            set { _ownerRole = value; }
        }

        [Property("OpportunityID", Access = PropertyAccess.NosetterCamelcaseUnderscore,  Length = 50)]
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

        [Property("ProductName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string ProductName
        {
            get { return _productName; }
            set { _productName = value; }
        }

        [Property("ExpectedOrderDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string ExpectedOrderDate
        {
            get { return _expectedOrderDate; }
            set { _expectedOrderDate = value; }
        }

        [Property("Quantity", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public int Quantity
        {
            get { return _quantity; }
            set { _quantity = value; }
        }

        [Property("FunnelKUSD", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public System.Decimal? FunnelKUSD
        {
            get { return _funnelKUSD; }
            set { _funnelKUSD = value; }
        }

        [Property("AreaMAPPING", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string AreaMAPPING
        {
            get { return _areaMAPPING; }
            set { _areaMAPPING = value; }
        }

        [Property("ProductMAPPING", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 10)]
        public string ProductMAPPING
        {
            get { return _productMAPPING; }
            set { _productMAPPING = value; }
        }

        [Property("ClinicalMAPPING", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 200)]
        public string ClinicalMAPPING
        {
            get { return _clinicalMAPPING; }
            set { _clinicalMAPPING = value; }
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
            return FCSTCMActual.Count(criteria);
        }
    } // FCSTCMActual

}


