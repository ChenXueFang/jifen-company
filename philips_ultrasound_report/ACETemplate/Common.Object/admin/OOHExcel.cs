using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.ActiveRecord;

namespace Common.Object.admin
{
   public  class OOHExcel
    {
        [Property("Segment")]
        public string Segment { get; set; }

        [Property("Region")]
        public string Region { get; set; }

        [Property("SOff.")]
        public string SOff { get; set; }

        [Property("Province.mapping")]
        public string ProvinceMapping { get; set; }

        [Property("Sales Representative Name")]
        public string SalesRepresentativeName { get; set; }

        [Property("WBS Element")]
        public string WBSElement { get; set; }

        [Property("Ship-To Name")]
        public string ShipToName { get; set; }

        [Property("Dealer")]
        public string Dealer { get; set; }

        [Property("Owner Name(Dealer)")]
        public string OwnerName { get; set; }

        [Property("Buyer")]
        public string Buyer { get; set; }

        [Property("Sales Order")]
        public string SalesOrder { get; set; }

        [Property("Item")]
        public string Item { get; set; }

        [Property("Material")]
        public string Material { get; set; }

        [Property("Description")]
        public string Description { get; set; }

        [Property("Qty")]
        public string Qty { get; set; }

        [Property("KUSD")]
        public string KUSD { get; set; }

        [Property("Inventory Aging")]
        public string InventoryAging { get; set; }

        [Property("Inv aging bucket")]
        public string Invagingbucket { get; set; }

        [Property("Deliery Status-PMG")]
        public string DelieryStatusPMG { get; set; }

        [Property("Deliery Status")]
        public string DelieryStatus { get; set; }

        [Property("DS-F&A")]
        public string DSFA { get; set; }

        [Property("物流情况")]
        public string LogisticsSituation { get; set; }

        [Property("Status update ( formula)")]
        public string StatusUpdate { get; set; }

        [Property("区域-MAPPING")]
        public string AreaMAPPING { get; set; }

        [Property("产品-MAPPING")]
        public string ProductMAPPING { get; set; }

        [Property(">90")]
        public string IsNinety { get; set; }

        [Property("COUNTOFF")]
        public string COUNTOFF { get; set; }
    }
}
