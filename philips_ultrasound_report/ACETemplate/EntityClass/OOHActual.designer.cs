namespace EntityClass
{
    // Business class OOHActual generated from OOHActual
    // Anna [2020-05-28] Created

    using System;
    using System.ComponentModel;
    using Castle.ActiveRecord;
    using NHibernate.Criterion;
    using Newtonsoft.Json;
    [ActiveRecord("OOHActual")]
    public partial class OOHActual : ActiveRecordBase<OOHActual>
    {


        #region Private_Variables

        private int _id;
        private int? _batchID;
        private string _detailsNo;
        private string _segment;
        private string _region;
        private string _sOff;
        private string _provinceMapping;
        private string _salesRepresentativeName;
        private string _wBSElement;
        private string _shipToName;
        private string _dealer;
        private string _ownerName;
        private string _buyer;
        private string _salesOrder;
        private string _item;
        private string _material;
        private string _description;
        private int? _qty;
        private System.Decimal _kUSD;
        private int? _inventoryAging;
        private string _invagingbucket;
        private string _delieryStatusPMG;
        private string _delieryStatus;
        private string _dSFA;
        private string _logisticsSituation;
        private string _statusUpdate;
        private string _areaMAPPING;
        private string _productMAPPING;
        private bool? _isNinety;
        private bool? _cOUNTOFF;
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

        [Property("Segment", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Segment
        {
            get { return _segment; }
            set { _segment = value; }
        }

        [Property("Region", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Region
        {
            get { return _region; }
            set { _region = value; }
        }

        [Property("SOff", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string SOff
        {
            get { return _sOff; }
            set { _sOff = value; }
        }

        [Property("ProvinceMapping", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string ProvinceMapping
        {
            get { return _provinceMapping; }
            set { _provinceMapping = value; }
        }

        [Property("SalesRepresentativeName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string SalesRepresentativeName
        {
            get { return _salesRepresentativeName; }
            set { _salesRepresentativeName = value; }
        }

        [Property("WBSElement", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string WBSElement
        {
            get { return _wBSElement; }
            set { _wBSElement = value; }
        }

        [Property("ShipToName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string ShipToName
        {
            get { return _shipToName; }
            set { _shipToName = value; }
        }

        [Property("Dealer", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Dealer
        {
            get { return _dealer; }
            set { _dealer = value; }
        }

        [Property("OwnerName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string OwnerName
        {
            get { return _ownerName; }
            set { _ownerName = value; }
        }

        [Property("Buyer", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Buyer
        {
            get { return _buyer; }
            set { _buyer = value; }
        }

        [Property("SalesOrder", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string SalesOrder
        {
            get { return _salesOrder; }
            set { _salesOrder = value; }
        }

        [Property("Item", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Item
        {
            get { return _item; }
            set { _item = value; }
        }

        [Property("Material", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Material
        {
            get { return _material; }
            set { _material = value; }
        }

        [Property("Description", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 100)]
        public string Description
        {
            get { return _description; }
            set { _description = value; }
        }

        [Property("Qty", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? Qty
        {
            get { return _qty; }
            set { _qty = value; }
        }

        [Property("KUSD", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public System.Decimal KUSD
        {
            get { return _kUSD; }
            set { _kUSD = value; }
        }

        [Property("InventoryAging", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int? InventoryAging
        {
            get { return _inventoryAging; }
            set { _inventoryAging = value; }
        }

        [Property("Invagingbucket", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Invagingbucket
        {
            get { return _invagingbucket; }
            set { _invagingbucket = value; }
        }

        [Property("DelieryStatusPMG", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string DelieryStatusPMG
        {
            get { return _delieryStatusPMG; }
            set { _delieryStatusPMG = value; }
        }

        [Property("DelieryStatus", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string DelieryStatus
        {
            get { return _delieryStatus; }
            set { _delieryStatus = value; }
        }

        [Property("DSFA", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string DSFA
        {
            get { return _dSFA; }
            set { _dSFA = value; }
        }

        [Property("LogisticsSituation", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string LogisticsSituation
        {
            get { return _logisticsSituation; }
            set { _logisticsSituation = value; }
        }

        [Property("StatusUpdate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string StatusUpdate
        {
            get { return _statusUpdate; }
            set { _statusUpdate = value; }
        }

        [Property("AreaMAPPING", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string AreaMAPPING
        {
            get { return _areaMAPPING; }
            set { _areaMAPPING = value; }
        }

        [Property("ProductMAPPING", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string ProductMAPPING
        {
            get { return _productMAPPING; }
            set { _productMAPPING = value; }
        }

        [Property("IsNinety", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public bool? IsNinety
        {
            get { return _isNinety; }
            set { _isNinety = value; }
        }

        [Property("COUNTOFF", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public bool? COUNTOFF
        {
            get { return _cOUNTOFF; }
            set { _cOUNTOFF = value; }
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
            return OOHActual.Count(criteria);
        }
    } // OOHActual

}


