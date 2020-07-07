using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data;
using Microsoft.ApplicationBlocks.Data;
using System.Data.SqlClient;

namespace EntityClass
{
  public   class ReportHelper
    {
        public DataTable TableReportImport()
        {
            string sql = "select ID,TableName,'' as UploadTime,''as ImportID,'' as  IsGenerate,'' as BatchID from TableType ";

            return SqlHelper.ExecuteDataset(BaseItem.ConnectString, System.Data.CommandType.Text, sql).Tables[0];
        }

        /// <summary>
        /// 地区
        /// </summary>
        /// <returns></returns>
        public DataTable queryDistrict(int month,int year)
        {

            List<SqlParameter> parameter = new List<SqlParameter>();

            string sql = @"with cr as (select Month,Region,NewDistrict,OITSales,sum(ActKUSD) as SumActual,Year from OrderDetailActual where Year=@year and Month=@month group by  Region,NewDistrict,OITSales,Month,Year)    SELECT  * FROM CR AS Y 
                PIVOT (  /*数据源*/ sum(SumActual /*行转列后 列的值*/)  FOR  y.Month IN([1],[2],[3],[4],[5],
                     [6],[7],[8],[9],[10],[11],[12]/*列的值*/)) AS T ";

            parameter.Add(new SqlParameter("@Month", month));

            parameter.Add(new SqlParameter("@year", year));

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sql,parameter.ToArray()).Tables[0];
        }
        /// <summary>
        /// 产品的Value
        /// </summary>
        /// <returns></returns>
        public DataTable queryProductValue(int month, int year)
        {
            List<SqlParameter> parameter = new List<SqlParameter>();
            string sql = @"with cr as (select Month,MAGName,OITSales,sum(ActKUSD) as SumActual,Year from OrderDetailActual where Year=@year and Month=@month group by  MAGName,OITSales,Month,Year)    SELECT  * FROM CR AS Y 
                PIVOT (  /*数据源*/ sum(SumActual /*行转列后 列的值*/)  FOR  y.Month IN([1],[2],[3],[4],[5],
                     [6],[7],[8],[9],[10],[11],[12]/*列的值*/)) AS T ";

            parameter.Add(new SqlParameter("@Month", month));

            parameter.Add(new SqlParameter("@year", year));

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sql, parameter.ToArray()).Tables[0];
        }

        /// <summary>
        /// 产品的Unit
        /// </summary>
        /// <returns></returns>
        public DataTable queryProductUnit(int month, int year)
        {
            List<SqlParameter> parameter = new List<SqlParameter>();

            string sql = @"with cr as (select Month, MAGName, OITSales, sum(qty) as SumActual,Year from OrderDetailActual where Year=@year and Month=@month group by MAGName, OITSales, Month, Year)    SELECT* FROM CR AS Y
                PIVOT(  /*数据源*/ sum(SumActual /*行转列后 列的值*/)  FOR  y.Month IN([1],[2],[3],[4],[5],
                     [6],[7],[8],[9],[10],[11],[12]/*列的值*/)) AS T ";

            parameter.Add(new SqlParameter("@Month", month));

            parameter.Add(new SqlParameter("@year", year));

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sql, parameter.ToArray()).Tables[0];
        }


        /// <summary>
        /// DistrictClinical
        /// </summary>
        /// <returns></returns>
        public DataTable queryDistrictClinical(int month, int year)
        {
            List<SqlParameter> parameter = new List<SqlParameter>();
            string sql = @"with cr as (select Month,Region,NewDistrict,OITSales,Clinical,sum(ActKUSD) as SumActual,Year from OrderDetailActual where Year=@year and Month=@month group by  Region,NewDistrict,OITSales,Month,Year,Clinical)   
                           SELECT  * FROM CR AS Y 
                PIVOT (  /*数据源*/ sum(SumActual /*行转列后 列的值*/)  FOR  y.Month IN([1],[2],[3],[4],[5],
                     [6],[7],[8],[9],[10],[11],[12]/*列的值*/)) AS T";

            parameter.Add(new SqlParameter("@Month", month));

            parameter.Add(new SqlParameter("@year", year));

            return Microsoft.ApplicationBlocks.Data.SqlHelper.ExecuteDataset(BaseItem.ConnectString, CommandType.Text, sql, parameter.ToArray()).Tables[0];
        }
    }
}
