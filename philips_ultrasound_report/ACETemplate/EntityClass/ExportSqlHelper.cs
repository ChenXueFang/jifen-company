using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using System.Data.SqlClient;

namespace EntityClass
{
   public  class ExportSqlHelper
    {

        public static DataTable queryDistrictExport(string month, int year)
        {
            StringBuilder sb = new StringBuilder();
            List<SqlParameter> parameter = new List<SqlParameter>();

            string sql = @"select Year,Month,Region,District,OITActual,OITTarget,'' as Compl,OITYTDActual,OITYTarget,''as VTarget,OITHTAActual,''as YTD,
                          ''as VYTD, '' as ToGo,Funnel,Transrate,FCST,FCSTN2M,SalesActual,SalesTarget,'' as SalesCompl,SalesYTDActual,SalesYTarget,
                         '' as VSalesTarget,SalesHTAActual,'' as SalesYTD, '' as SalesVYID, ''SalesToGo,OOH,InvenrotyIsNinety  from ByDistrictInfo  where 1=1";


            sb.Append(sql);

            if (!string.IsNullOrEmpty(month))
            {
                sb.Append(" and Month in (" + string.Join(", ", month.Split(',')) + ")");
            }


            if (year > 0)
            {
                sb.Append(" and  Year = @year");
                parameter.Add(new SqlParameter("@year", year));
            }

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sb.ToString(), parameter.ToArray()).Tables[0];
        }

        public static DataTable queryProductExport(string month, int year)
        {
            StringBuilder sb = new StringBuilder();
            List<SqlParameter> parameter = new List<SqlParameter>();

            string sql = @"select Year,Month,ProductName,OITValueYTDActual,OITValueTarget,'' as VTarget,OITValueYTD,'' as VYTD,'' as ToGo,ValueFunnel,'' as TransRate,OITUnitYTDActual
      ,OITUnitTarget,'' as UnitVTarget,OITUnitYTD, '' as UnitVYTD,'' as UnitToGo,UnitFunnel,'' as UnitTransRate,FCSTValue,FCSTUnit,SalesValueYTDActual
      ,SalesValueTarget,''as SalesVTarget,SalesValueYTD,'' as SalesVYTD,'' as SalesToGo,ValueOOH,SalesUnitYTDActual
      ,SalesUnitTarget,'' as SalesVTarget,SalesUnitYTD,'' as SalesVYTDUnit,'' as SalesUnitToGo,UnitOOH from ByProductInfo where 1=1";


            sb.Append(sql);

            if (!string.IsNullOrEmpty(month))
            {
                sb.Append(" and Month in (" + string.Join(", ", month.Split(',')) + ")");
            }


            if (year > 0)
            {
                sb.Append(" and  Year = @year");
                parameter.Add(new SqlParameter("@year", year));
            }

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sb.ToString(), parameter.ToArray()).Tables[0];
        }

        public static DataTable queryProductDistrictExport(string month, int year)
        {
            StringBuilder sb = new StringBuilder();
            List<SqlParameter> parameter = new List<SqlParameter>();

            string sql = @"select Year,Month,Region,District,CVOITYTDActual,CVOITTarget,'' as VOITTarget,'' as OITYTD,''as OITVYTD,''as TOGO,CVFunnel,'' as  OITTransRate,CVSalesYTDActual,
                        CVSalesTarget,'' as SalesVTarget,'' as SalesYTD, '' as SalesVYTD,GIOITYTDActual,GIOITTarget,'' as GIVTarget,'' as GIYTD,'' as GIVYTD,'' as GIToGo,GIFunnel,'' as GITransRate,
                       GISalesYTDActual,GISalesTarget,'' GIVSalesTarget,'' as GIYTD, '' as GIVYTD,WHCOITYTDActual
                        ,WHCOITTarget, ''as WHCVTarget,''as WHCYTD,''as WHCVYTD,'' as WHCToGo,WHCFunnel,'' as WHCTransRate,WHCSalesYTDActual
                         ,WHCSalesTarget,'' as WHCSalesVTarget,'' as WHCSalesYTD,  '' as WHCVYTD,POCOITYTDActual
                          ,POCOITTarget,'' as POCVTarget,'' as POCYTD,'' as POCVYTD,'' as POCToGo, POCFunnel,'' as POCTransRate,POCSalesYTDActual, POCSalesTarget,
	                  ''as POCSalesVTarget,'' POCSalesYTD,'' POCSalesVYTD  from ByDistrictClinicalInfo";

            sb.Append(sql);

            if (!string.IsNullOrEmpty(month))
            {
                sb.Append(" and Month in (" + string.Join(", ", month.Split(',')) + ")");
            }


            if (year > 0)
            {
                sb.Append(" and  Year = @year");
                parameter.Add(new SqlParameter("@year", year));
            }

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sb.ToString(), parameter.ToArray()).Tables[0];
        }

        public static DataTable queryOldDistrictExport()
        {

            string sql = @"select rowId,Region,NewDistrict,Actual, '' as Target,'' as Compl,SumYearActual,'' as SumYearTarget, ''as VTarget,SumHTAActual,''as YTD, ''as VYTD, '' as ToGo,Sumfunnel, '' as TransRate,
   SumFCSTCM,sumSCSTN,SumSales,'' as SumSalesTarget,'' as SalesCompl,SumSalesYearActual, '' as SumSalesYearTarget,'' as VSalesTarget,SumSalesHTAActual,'' as SalesYTD, '' as SalesVYID,
 ''SalesToGo,OOH,Ninetydays
   from ( select rowId,Region,A.NewDistrict,Actual,SumYearActual,SumHTAActual,Sumfunnel,SumFCSTCM,sumSCSTN,SumSales,SumSalesYearActual,SumSalesHTAActual,OOH,Ninetydays
  from (select ROW_NUMBER()  Over (ORDER BY isnull(Region,'ZZZZ')) as rowId ,Region,NewDistrict,sum(ActKUSD)/1000 Actual   from OrderDetailTarget  
 where OITSales='OIT' and Qtr='Q1' group by rollup(Region,NewDistrict)) A 
 left join (select NewDistrict,sum(ActKUSD)/1000 SumYearActual   from OrderDetailTarget  where OITSales='OIT'  group by NewDistrict) as B on   A.NewDistrict=B.NewDistrict left join 
 (select NewDistrict,sum(ActKUSD)/1000 SumHTAActual  from OrderDetailTarget  where OITSales='OIT' and HTa='Y' group by NewDistrict) as C on A.NewDistrict=C.NewDistrict 
 left join (select sum(TotalPrices)/1000000 Sumfunnel,AreaMapping from  FunnelTarget group by AreaMapping) as D  on A.NewDistrict=D.AreaMapping  left join  
 (select AreaMapping,sum(FunnelKUSD)/1000 as SumFCSTCM from FCSTCMTarget  group by AreaMapping) as E on A.NewDistrict=E.AreaMapping  left join 
 (select sum(TotalPrices)/1000000 sumSCSTN,AreaMapping from  FCSTN2MTarget group by AreaMapping) as F on A.NewDistrict=F.AreaMapping left join 
 (select NewDistrict,sum(ActKUSD)/1000 SumSales   from OrderDetailTarget  
 where OITSales='Sales to Thirds' and Qtr='Q1'  group by NewDistrict ) as G on A.NewDistrict=G.NewDistrict left join 
 (select NewDistrict,sum(ActKUSD)/1000 SumSalesYearActual   from OrderDetailTarget  where OITSales='Sales to Thirds'  group by NewDistrict ) as H on A.NewDistrict=H.NewDistrict 
 left join (select NewDistrict,sum(ActKUSD)/1000 SumSalesHTAActual  from OrderDetailTarget  where OITSales='OIT' and HTa='Y' group by NewDistrict) as I on A.NewDistrict=I.NewDistrict
 left join (select sum(kusd)/1000 as OOH,AreaMapping from OOHTarget group by AreaMapping ) as J on A.NewDistrict=J.AreaMapping left join 
 (select sum(qty) as 'Ninetydays',AreaMapping   from OOHTarget  where IsNInety=1 and CountOFF=0 group by AreaMapping ) as k  on A.NewDistrict=J.AreaMapping 
 ) T ORDER BY rowId ASC";


            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sql).Tables[0];

        }


        public static DataTable queryOldProductExport()
        {
            string sql = @"  select MAGName as Product,SumYTDActual,'' as NowTarget,'' as VTarget,'' as YTD,'' as VYTD,'' as ToGo,Funnel,'' as TransRate,UnitSum,'' as UnitNowTarget,'' as UnitVTarget,'' as UnitYTD, 
                        '' as UnitVYTD,'' as UnitToGo,UnitFunnel,'' as UnitTransRate,'' as FCSTValue, '' as FCSTUnit,SumSalesActual, '' as SalesTarget, ''as SalesVTarget,
                        '' as SalesYTD, '' as SalesVYTD,'' as SalesToGo,OOH,SalesUnitSum,'' as SalesUnitTarget,'' as SalesVTarget,'' as SalesYTDUnit,'' as SalesVYTDUnit, '' as SalesUnitToGo, UnitSalesOOH from (
                        select A.MAGName,SumYTDActual,Funnel,UnitSum,UnitFunnel,SumSalesActual,OOH,SalesUnitSum,UnitSalesOOH from (select sum(ActKUSD)/1000 SumYTDActual,MAGName   from OrderDetailTarget  
                        where OITSales='OIT'group by MAGName) A  left join  
                        ( select sum(TotalPrices)/1000000 Funnel,ProductMAPPING from  FunnelTarget group by ProductMAPPING)as B on A.MAGName=B.ProductMAPPING left join 
                        (select sum(qty) UnitSum,MAGName   from OrderDetailTarget  where OITSales='OIT'group by MAGName) as C on A.MAGName=C.MAGName left join 
                        ( select sum(Quantity) UnitFunnel,ProductMAPPING from  FunnelTarget group by ProductMAPPING) as D
                        on A.MAGName=D.ProductMAPPING left join (select sum(ActKUSD)/1000 SumSalesActual,MAGName   from OrderDetailTarget  
                        where OITSales='Sales to Thirds' group by MAGName)as E  on A.MAGName=E.MAGName left join 
                        (select sum(KUSD) OOH,ProductMAPPING from  OOHTarget group by ProductMAPPING) as F on A.MAGName=F.ProductMAPPING left join 
                        (select sum(qty) SalesUnitSum,MAGName from OrderDetailTarget  where OITSales='Sales to Thirds'group by MAGName) as G on A.MAGName=G.MAGName left join 
                        (select sum(InventoryAging) UnitSalesOOH,ProductMAPPING from  OOHTarget group by ProductMAPPING) as H on A.MAGName=H.ProductMAPPING
                        ) T";

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sql).Tables[0];
        }


        public static DataTable queryOldProductDistrictExport()
        {
                    string sql = @"select rowId,A.NewRegion as Region,A.NewDistrict,Actual,''as OITTarget,'' as VOITTarget,'' as OITYTD,''as OITVYTD,''as TOGO,OITFunnel,'' as  OITTransRate,SalesYTDActual,'' as SalesTarget,'' as SalesVTarget,'' as SalesYTD,
            '' as SalesVYTD,GIActual, '' as GITarget,'' as GIVTarget,'' as GIYTD,'' as GIVYTD,'' as GIToGo,GIFunnel,'' as GITransRate,GISalesActual,'' GISalesTarget, '' GIVSalesTarget,'' as GIYTD, 
            '' as GIVYTD,WHCActual,'' as WHCTarget,''as WHCVTarget,''as WHCYTD,''as WHCVYTD,'' as WHCToGo,WHCFunnel,'' as WHCTransRate,WHCSalesActual,''as WHCSalesTarget, '' as WHCSalesVTarget,'' as WHCSalesYTD, 
            '' as WHCVYTD,POCActual,'' as POCTarget,'' as POCVTarget,'' as POCYTD,'' as POCVYTD,'' as POCToGo, POCFunnel,'' as POCTransRate,POCSalesActual,
            '' as POCSalesTarget,''as POCSalesVTarget,'' POCSalesYTD,'' POCSalesVYTD from 
            (select ROW_NUMBER()  Over (ORDER BY isnull(NewRegion,'ZZZZ')) as rowId ,NewRegion,NewDistrict,sum(ActKUSD)/1000 Actual   from OrderDetailTarget  
            where OITSales='OIT' And Clinical='CV'  group by rollup( NewRegion,NewDistrict)) as A left join 
            (select AreaMapping,sum(TotalPrices)/1000000  as  OITFunnel from  FunnelTarget where ClinicalMAPPING='CV' group by  AreaMapping) as B 
            on A.NewDistrict=B.AreaMapping left join 
			(select NewDistrict,sum(ActKUSD)/1000 SalesYTDActual   from OrderDetailTarget  
            where OITSales='Sales to Thirds' And Clinical='CV'  group by NewDistrict) as C on A.NewDistrict=C.NewDistrict
			 left join 
            (select NewDistrict,sum(ActKUSD)/1000 GIActual  from OrderDetailTarget  
            where OITSales='OIT' And Clinical='GI'  group by NewDistrict) as D on A.NewDistrict=D.NewDistrict left join 
            ( select AreaMapping,sum(TotalPrices)/1000000  as GIFunnel from  FunnelTarget where ClinicalMAPPING='GI' group by  AreaMapping) as E on A.NewDistrict=E.AreaMapping left join 
            (select NewDistrict,sum(ActKUSD)/1000 GISalesActual   from OrderDetailTarget   where OITSales='Sales to Thirds' And Clinical='GI'  group by NewDistrict) 
            as F on A.NewDistrict=F.NewDistrict left join (select NewDistrict,sum(ActKUSD)/1000 WHCActual  from OrderDetailTarget  
            where OITSales='OIT' And Clinical='WHC'  group by NewDistrict) as G on A.NewDistrict=G.NewDistrict left join (select AreaMapping,sum(TotalPrices)/1000000  as WHCFunnel from  FunnelTarget where ClinicalMAPPING='WHC' group by  AreaMapping) as  H

            on A.NewDistrict=H.AreaMAPPING left join (select NewDistrict,sum(ActKUSD)/1000 WHCSalesActual   from OrderDetailTarget   where OITSales='Sales to Thirds' And Clinical='WHC'  group by NewDistrict) as I on A.NewDistrict=I.NewDistrict

            left join (select NewDistrict,sum(ActKUSD)/1000 POCActual  from OrderDetailTarget  where OITSales='OIT' And Clinical='POC'  group by NewDistrict) as J on A.NewDistrict=J.NewDistrict  left join 

            (select AreaMapping,sum(TotalPrices)/1000000  as POCFunnel from  FunnelTarget where ClinicalMAPPING='POC' group by  AreaMapping) as K on A.NewDistrict=K.AreaMapping left join 
            (select NewDistrict,sum(ActKUSD)/1000 POCSalesActual   from OrderDetailTarget   where OITSales='Sales to Thirds' And Clinical='POC'  group by NewDistrict) as P on A.NewDistrict=P.NewDistrict order by rowId asc
            ";

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sql).Tables[0];
        }

        public static DataTable queryPromotion(string month, int year)
        {
            StringBuilder sb = new StringBuilder();
            List<SqlParameter> parameter = new List<SqlParameter>();

            string sql = "select ID,Region,Area,HospitalNameORDealer,System,Segment,Promotion,sofon,OITMonth,Qty,Year,Month,Quarter from PromotionIntegrate where 1=1";

            sb.Append(sql);

            if (!string.IsNullOrEmpty(month))
            {
                sb.Append(" and Month in (" + string.Join(", ", month.Split(',')) + ")");

                //sb.Append(" and  Month = @Month");
                //parameter.Add(new SqlParameter("@Month", month));
            }


            if (year > 0)
            {
                sb.Append(" and  Year = @year");
                parameter.Add(new SqlParameter("@year", year));
            }

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sb.ToString(), parameter.ToArray()).Tables[0];
        }

        public static DataTable queryDiscountIntegrate(string month, int year)
        {
            StringBuilder sb = new StringBuilder();
            List<SqlParameter> parameter = new List<SqlParameter>();

            string sql = @"select ID, SofonNumber, Region, Area, HospitalName, DealerName, Clinical, Modality, SubtypeName, Discount, 
                           Qty, NetPrice, CTP, OITMonth, Month, Year, Quarter from DiscountIntegrate where 1=1";

            sb.Append(sql);

            if (!string.IsNullOrEmpty(month))
            {
                sb.Append(" and  Month = @Month");
                parameter.Add(new SqlParameter("@Month", month));
            }


            if (year > 0)
            {
                sb.Append(" and  Year = @year");
                parameter.Add(new SqlParameter("@year", year));
            }

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sb.ToString(), parameter.ToArray()).Tables[0];
        }


        public static DataTable queryBCIntegrate(string month, int year)
        {

            StringBuilder sb = new StringBuilder();
            List<SqlParameter> parameter = new List<SqlParameter>();

            string sql = @"select ID,SOFON,HospitalName,Application,Modality,Description,QTY,Area,Region,DealerName,BCLevel,NetPrice,
                OITMonth,Month,Year,PublicORPrivate,Quarter from BCIntegrate where 1=1";

            sb.Append(sql);

            if (!string.IsNullOrEmpty(month))
            {
                sb.Append(" and  Month = @Month");
                parameter.Add(new SqlParameter("@Month", month));
            }


            if (year > 0)
            {
                sb.Append(" and  Year = @year");
                parameter.Add(new SqlParameter("@year", year));
            }

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sb.ToString(), parameter.ToArray()).Tables[0];
        }
    }
   
}
