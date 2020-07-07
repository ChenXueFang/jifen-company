using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.ActiveRecord;

namespace Common.Object.admin
{
   public  class OrderDetailExcel
    {
        [Property("OITSales")]
        public string OITSales { get; set; }

        [Property("Year")]
        public string Year { get; set; }

        [Property("Qtr")]
        public string Qtr { get; set; }

        [Property("Month")]
        public string Month { get; set; }

        [Property("Country")]
        public string Country { get; set; }

        [Property("NewArea")]
        public string NewArea { get; set; }

        [Property("NewRegion")]
        public string NewRegion { get; set; }

        [Property("NewDistrict")]
        public string NewDistrict { get; set; }

        [Property("WBS")]
        public string WBS { get; set; }

        [Property("SO")]
        public string SO { get; set; }

        [Property("SalesName")]
        public string SalesName { get; set; }

        [Property("MAGCode")]
        public string MAGCode { get; set; }

        [Property("MAGName")]
        public string MAGName { get; set; }

        [Property("RTDescription")]
        public string RTDescription { get; set; }

        [Property("HospitalName")]
        public string HospitalName { get; set; }

        [Property("ActKUSD")]
        public string  ActKUSD { get; set; }

        [Property("Qty")]
        public string Qty { get; set; }


        [Property("Channel")]
        public string Channel { get; set; }

        [Property("DealerManual")]
        public string DealerManual { get; set; }

        [Property("Dealer")]
        public string Dealer { get; set; }

        [Property("Clinical")]
        public string Clinical { get; set; }

        [Property("DealerClinicalFlag")]
        public string DealerClinicalFlag { get; set; }

        [Property("Department")]
        public string Department { get; set; }

        [Property("HospCategory")]
        public string HospCategory { get; set; }

        [Property("HospFlag")]
        public string HospFlag { get; set; }

        [Property("CustomerID")]
        public string CustomerID { get; set; }

        [Property("CustomerDICName")]
        public string CustomerDICName { get; set; }

        [Property("OpportunityID")]
        public string OpportunityID { get; set; }

        [Property("Region")]
        public string Region { get; set; }

        [Property("District")]
        public string District { get; set; }

        [Property("SAPArea")]
        public string SAPArea { get; set; }

        [Property("SAPSalesName")]
        public string SAPSalesName { get; set; }

        [Property("SAPShiptoParty")]
        public string SAPShiptoParty { get; set; }

        [Property("SAPSoldtoParty")]
        public string SAPSoldtoParty { get; set; }

        [Property("Segent")]
        public string Segent { get; set; }

        [Property("USOITDate")]
        public string USOITDate { get; set; }

        [Property("AdjustmentRemark")]
        public string AdjustmentRemark { get; set; }

        [Property("HospitalType")]
        public string HospitalType { get; set; }

        [Property("HWORSW")]
        public string HWORSW { get; set; }

        [Property("Solution")]
        public string Solution { get; set; }

        [Property("HTA")]
        public string HTA { get; set; }

        [Property("province")]
        public string province { get; set; }

        [Property("stock")]
        public string stock { get; set; }
    }
}
