using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using EntityClass;
using System.Data;
using NHibernate.Criterion;
using Spire.Xls;
using Common.UI.JQGrid;
using System.IO;

namespace ACETemplate.adnim.handler
{
    /// <summary>
    /// ExportHandler 的摘要说明
    /// </summary>
    public class ExportHandler : Common.Object.Class.BaseLoginAdminHandler, System.Web.SessionState.IReadOnlySessionState
    {

        protected override void Process(HttpContext context)
        {
            switch (base.OperationType)
            {
                case "ExportDistrict":
                    ExportDistrict();
                    break;
                case "ExportbyProduct":
                    ExportbyProduct();
                    break;
                case "ExportBydistrictByclinical":
                    ExportBydistrictByclinical();
                    break;
                case "ExportPromotion":
                    ExportPromotion();
                    break;

            }
            base.Process(context);
        }

        void ExportBydistrictByclinical()
        {

            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            Workbook wk = new Workbook();

            var dt = ExportSqlHelper.queryProductDistrictExport(month,year);

            string folderPath = "/Upload/ExportExcel/";  //文件夹

            string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + "ByProductClinical.xlsx";

            string path = folderPath + fileName;

            //指定版本信息，07及以上版本最多可以插入1048576行数据
            wk.Version = ExcelVersion.Version2013;

            //获取第一张sheet
            Worksheet sheet = wk.Worksheets[0];

            #region 处理样式
            sheet.InsertRow(1);

            sheet.Range[1, 3].Text = "CV";

            sheet.Range[1, 17].Text = "GI";

            sheet.Range[1, 30].Text = "WHC";

            sheet.Range[1, 43].Text = "POC";

            sheet.Range["C1:O1"].Merge();

            sheet.Range["P1:AB1"].Merge();

            sheet.Range["AC1:AO1"].Merge();

            sheet.Range["AP1:BB1"].Merge();

            sheet.InsertRow(2);

            sheet.Range[2, 3].Text = "OIT";

            sheet.Range[2,11].Text = "Sales";

            sheet.Range[2, 16].Text = "OIT";

            sheet.Range[2, 24].Text = "Sales";

            sheet.Range[2, 29].Text = "OIT";

            sheet.Range[2, 37].Text = "Sales";

            sheet.Range[2, 42].Text = "OIT";

            sheet.Range[2, 50].Text = "Sales";

            sheet.Range["C2:J2"].Merge();

            sheet.Range["K2:O2"].Merge();

            sheet.Range["P2:W2"].Merge();

            sheet.Range["X2:AB2"].Merge();

            sheet.Range["AC2:AJ2"].Merge();

            sheet.Range["AK2:AO2"].Merge();

            sheet.Range["AP2:AW2"].Merge();

            sheet.Range["AX2:BB2"].Merge();


            var row = dt.Rows.Count + 3;

            sheet.Range["A1:BB" + row + ""].Style.HorizontalAlignment = HorizontalAlignType.Center;

            #endregion


            dt.Rows.RemoveAt(dt.Rows.Count - 1);

            //从第一行第一列开始插入数据，true代表数据包含列名
            sheet.InsertDataTable(dt, true, 3, 1);

            var LastYear = DateTime.Now.Year - 1;

            int j = 0;
            int h = 0;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                var str = i + 4;
                string currentFormula1 = "=IFERROR(C" + str + "/D" + str + ",\"\")";
                sheet.Range[str, 5].Formula = currentFormula1;

                string currentFormula2 = "=IFERROR(C" + str + "/F" + str + "-1,\"\")";
                sheet.Range[str, 7].Formula = currentFormula2;

                string currentFormula3 = "=D" + str + "-C" + str + "";
                sheet.Range[str, 8].Formula = currentFormula3;

                string currentFormula4 = "=IFERROR(I" + str + "/H" + str + ",\"\")";
                sheet.Range[str, 10].Formula = currentFormula4;

                string currentFormula5 = "=IFERROR(K" + str + "/L" + str + ",\"\")";
                sheet.Range[str, 13].Formula = currentFormula5;

                string currentFormula6 = "=IFERROR(K" + str + "/N" + str + "-1,\"\")";
                sheet.Range[str, 15].Formula = currentFormula6;

                string currentFormula7 = "=IFERROR(P" + str + "/Q" + str + ",\"\")";
                sheet.Range[str, 18].Formula = currentFormula7;

                string currentFormula8 = "=IFERROR(P" + str + "/S" + str + "-1,\"\")";
                sheet.Range[str, 20].Formula = currentFormula8;

                string currentFormula9 = "=Q" + str + "-P" + str + "";
                sheet.Range[str, 21].Formula = currentFormula9;

                string currentFormula10 = "=IFERROR(V" + str + "/U" + str + ",\"\")";
                sheet.Range[str, 23].Formula = currentFormula10;

                string currentFormula11 = "=IFERROR(X" + str + "/Y" + str + ",\"\")";
                sheet.Range[str, 26].Formula = currentFormula11;

                string currentFormula12 = "=IFERROR(X" + str + "/AA" + str + "-1,\"\")";
                sheet.Range[str, 28].Formula = currentFormula12;

                string currentFormula13 = "=IFERROR(AC" + str + "/AD" + str + ",\"\")";
                sheet.Range[str, 31].Formula = currentFormula13;

                string currentFormula14 = "=IFERROR(AC" + str + "/AF" + str + "-1,\"\")";
                sheet.Range[str, 33].Formula = currentFormula14;

                string currentFormula15 = "=AD" + str + "-AC" + str + "";
                sheet.Range[str, 34].Formula = currentFormula15;

                string currentFormula16 = "=IFERROR(AI" + str + "/AH" + str + ",\"\")";
                sheet.Range[str, 36].Formula = currentFormula16;

                string currentFormula17 = "=IFERROR(AK" + str + "/AL" + str + ",\"\")";
                sheet.Range[str, 39].Formula = currentFormula17;

                string currentFormula18 = "=IFERROR(AK" + str + "/AN" + str + "-1,\"\")";
                sheet.Range[str, 41].Formula = currentFormula18;

                string currentFormula19 = "=IFERROR(AP" + str + "/AQ" + str + ",\"\")";
                sheet.Range[str, 44].Formula = currentFormula19;

                string currentFormula20 = "=IFERROR(AP" + str + "/AS" + str + "-1,\"\")";
                sheet.Range[str, 46].Formula = currentFormula20;

                string currentFormula21 = "=AQ" + str + "-AP" + str + "";
                sheet.Range[str, 47].Formula = currentFormula21;

                string currentFormula22= "=IFERROR(AV" + str + "/AU" + str + ",\"\")";
                sheet.Range[str, 49].Formula = currentFormula22;

                string currentFormula23 = "=IFERROR(AX" + str + "/AY" + str + ",\"\")";
                sheet.Range[str, 52].Formula = currentFormula23;

                string currentFormula24 = "=IFERROR(AX" + str + "/BA" + str + "-1,\"\")";
                sheet.Range[str, 54].Formula = currentFormula24;

                var Region = dt.Rows[i]["Region"].ToString();
                var newDistrict = dt.Rows[i]["NewDistrict"].ToString();

                if (!string.IsNullOrEmpty(Region) && !string.IsNullOrEmpty(newDistrict))
                {
                    //#region cv
                    //var cvOIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1),Expression.Eq("TypeName", "OIT"));

                    //if (cvOIT != null)
                    //{
                    //    sheet.Range[str, 6].Value = ((cvOIT.M1 + cvOIT.M2 + cvOIT.M3 + cvOIT.M4 + cvOIT.M5 + cvOIT.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 6].Value = "0";
                    //}

                    //var cvSales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1),Expression.Eq("TypeName", "SALES"));

                    //if (cvSales != null)
                    //{
                    //    sheet.Range[str, 14].Value = ((cvSales.M1 + cvSales.M2 + cvSales.M3 + cvSales.M4 + cvSales.M5 + cvSales.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 14].Value = "0";
                    //}

                    //#endregion

                    //#region gi
                    //var giOIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "OIT"));

                    //if (giOIT != null)
                    //{
                    //    sheet.Range[str, 6].Value = ((giOIT.M1 + giOIT.M2 + giOIT.M3 + giOIT.M4 + giOIT.M5 + giOIT.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 6].Value = "0";
                    //}

                    //var giSales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "SALES"));

                    //if (giSales != null)
                    //{
                    //    sheet.Range[str, 14].Value = ((giSales.M1 + giSales.M2 + giSales.M3 + giSales.M4 + giSales.M5 + giSales.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 14].Value = "0";
                    //}

                    //#endregion


                    //#region WHC
                    //var WHCOIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "OIT"));

                    //if (WHCOIT != null)
                    //{
                    //    sheet.Range[str, 22].Value = ((WHCOIT.M1 + WHCOIT.M2 + WHCOIT.M3 + WHCOIT.M4 + WHCOIT.M5 + WHCOIT.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 22].Value = "0";
                    //}

                    //var WHCSales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "SALES"));

                    //if (giSales != null)
                    //{
                    //    sheet.Range[str, 14].Value = ((WHCSales.M1 + WHCSales.M2 + WHCSales.M3 + WHCSales.M4 + WHCSales.M5 + WHCSales.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 14].Value = "0";
                    //}

                    //#endregion



                    //#region POC
                    //var POCOIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "OIT"));

                    //if (WHCOIT != null)
                    //{
                    //    sheet.Range[str, 6].Value = ((POCOIT.M1 + POCOIT.M2 + POCOIT.M3 + POCOIT.M4 + POCOIT.M5 + POCOIT.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 6].Value = "0";
                    //}

                    //var POCSales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "SALES"));

                    //if (giSales != null)
                    //{
                    //    sheet.Range[str, 14].Value = ((POCSales.M1 + POCSales.M2 + POCSales.M3 + POCSales.M4 + POCSales.M5 + POCSales.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 14].Value = "0";
                    //}

                    //#endregion



                    if (h == 0)
                    {
                        j = i + 3;
                    }

                    h = 1;
                }
                else
                {
                    #region 计算SUM
                    int t = str - 1;

                    string f0 = "=SUM(D" + j + ":D" + t + ")";
                    sheet.Range[str, 4].Formula = f0;


                    string Formula1 = "=SUM(E" + j + ":E" + t + ")";
                    sheet.Range[str, 5].Formula = Formula1;

                    string Formula2 = "=SUM(F" + j + ":F" + t + ")";
                    sheet.Range[str, 6].Formula = Formula2;

                    string Formula3 = "=SUM(G" + j + ":G" + t + ")";
                    sheet.Range[str, 7].Formula = Formula3;

                    string Formula4 = "=SUM(H" + j + ":H" + t + ")";
                    sheet.Range[str, 8].Formula = Formula4;

                    string Formula5 = "=SUM(I" + j + ":I" + t + ")";
                    sheet.Range[str, 9].Formula = Formula5;

                    string Formula6 = "=SUM(J" + j + ":J" + t + ")";
                    sheet.Range[str, 10].Formula = Formula6;

                    string Formula7 = "=SUM(K" + j + ":K" + t + ")";
                    sheet.Range[str, 11].Formula = Formula7;

                    string Formula8 = "=SUM(L" + j + ":L" + t + ")";
                    sheet.Range[str, 12].Formula = Formula8;

                    string Formula9 = "=SUM(M" + j + ":M" + t + ")";
                    sheet.Range[str, 13].Formula = Formula9;

                    string Formula10 = "=SUM(N" + j + ":N" + t + ")";
                    sheet.Range[str, 14].Formula = Formula10;

                    string Formula11 = "=SUM(O" + j + ":O" + t + ")";
                    sheet.Range[str, 15].Formula = Formula11;

                    string Formula12 = "=SUM(P" + j + ":P" + t + ")";
                    sheet.Range[str, 16].Formula = Formula12;

                    string Formula13 = "=SUM(Q" + j + ":Q" + t + ")";
                    sheet.Range[str, 17].Formula = Formula13;

                    string Formula14 = "=SUM(R" + j + ":R" + t + ")";
                    sheet.Range[str, 18].Formula = Formula14;

                    string Formula15 = "=SUM(S" + j + ":S" + t + ")";
                    sheet.Range[str, 19].Formula = Formula15;

                    string Formula16 = "=SUM(T" + j + ":T" + t + ")";
                    sheet.Range[str, 20].Formula = Formula16;

                    string Formula17 = "=SUM(U" + j + ":U" + t + ")";
                    sheet.Range[str, 21].Formula = Formula17;

                    string Formula18 = "=SUM(V" + j + ":V" + t + ")";
                    sheet.Range[str, 22].Formula = Formula18;

                    string Formula19 = "=SUM(W" + j + ":W" + t + ")";
                    sheet.Range[str, 23].Formula = Formula19;

                    string Formula20 = "=SUM(X" + j + ":X" + t + ")";
                    sheet.Range[str, 24].Formula = Formula20;

                    string Formula21 = "=SUM(Y" + j + ":Y" + t + ")";
                    sheet.Range[str, 25].Formula = Formula21;

                    string Formula22 = "=SUM(Z" + j + ":Z" + t + ")";
                    sheet.Range[str, 26].Formula = Formula22;

                    string Formula23 = "=SUM(AA" + j + ":AA" + t + ")";
                    sheet.Range[str, 27].Formula = Formula23;

                    string Formula24 = "=SUM(AB" + j + ":AB" + t + ")";
                    sheet.Range[str, 28].Formula = Formula24;

                    string f1 = "=SUM(AC" + j + ":AC" + t + ")";
                    sheet.Range[str, 29].Formula = f1;

                    string f2 = "=SUM(AD" + j + ":AD" + t + ")";
                    sheet.Range[str, 30].Formula = f2;

                    string f3 = "=SUM(AE" + j + ":AE" + t + ")";
                    sheet.Range[str, 31].Formula = f3;

                    string f4 = "=SUM(AF" + j + ":AF" + t + ")";
                    sheet.Range[str, 32].Formula = f4;

                    string f5 = "=SUM(AG" + j + ":AG" + t + ")";
                    sheet.Range[str, 33].Formula = f5;

                    string f6 = "=SUM(AH" + j + ":AH" + t + ")";
                    sheet.Range[str, 34].Formula = f6;

                    string f7 = "=SUM(AI" + j + ":AI" + t + ")";
                    sheet.Range[str, 35].Formula = f7;

                    string f8 = "=SUM(AJ" + j + ":AJ" + t + ")";
                    sheet.Range[str, 36].Formula = f8;

                    string f9 = "=SUM(AK" + j + ":AK" + t + ")";
                    sheet.Range[str, 37].Formula = f9;

                    string f10 = "=SUM(AL" + j + ":AL" + t + ")";
                    sheet.Range[str, 38].Formula = f10;

                    string f11 = "=SUM(AM" + j + ":AM" + t + ")";
                    sheet.Range[str, 39].Formula = f11;

                    string f12 = "=SUM(AN" + j + ":AN" + t + ")";
                    sheet.Range[str, 40].Formula = f12;

                    string f13 = "=SUM(AO" + j + ":AO" + t + ")";
                    sheet.Range[str, 41].Formula = f13;

                    string f14 = "=SUM(AP" + j + ":AP" + t + ")";
                    sheet.Range[str, 42].Formula = f14;

                    string f15 = "=SUM(AQ" + j + ":AQ" + t + ")";
                    sheet.Range[str, 43].Formula = f15;

                    string f16 = "=SUM(AR" + j + ":AR" + t + ")";
                    sheet.Range[str, 44].Formula = f16;

                    string f17 = "=SUM(AS" + j + ":AS" + t + ")";
                    sheet.Range[str, 45].Formula = f17;

                    string f18 = "=SUM(AT" + j + ":AT" + t + ")";
                    sheet.Range[str, 46].Formula = f18;

                    string f19 = "=SUM(AU" + j + ":AU" + t + ")";
                    sheet.Range[str, 47].Formula = f19;

                    string f20 = "=SUM(AV" + j + ":AV" + t + ")";
                    sheet.Range[str, 48].Formula = f20;

                    string f21 = "=SUM(AW" + j + ":AW" + t + ")";
                    sheet.Range[str, 49].Formula = f21;

                    string f22 = "=SUM(AX" + j + ":AX" + t + ")";
                    sheet.Range[str, 50].Formula = f22;

                    string f23 = "=SUM(AY" + j + ":AY" + t + ")";
                    sheet.Range[str, 51].Formula = f23;

                    string f24 = "=SUM(AZ" + j + ":AZ" + t + ")";
                    sheet.Range[str, 52].Formula = f24;

                    string f25 = "=SUM(BA" + j + ":BA" + t + ")";
                    sheet.Range[str, 53].Formula = f25;

                    string f26 = "=SUM(BB" + j + ":BB" + t + ")";
                    sheet.Range[str, 54].Formula = f26;

                    h = 0;
                    
                    #endregion
                }


            }
            //保存文件
            wk.SaveToFile(Context.Server.MapPath(path), ExcelVersion.Version2013);
        }


        void ExportbyProduct()
        {

            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            Workbook wk = new Workbook();

            var dt = ExportSqlHelper.queryProductExport(month,year);

            string folderPath = "/Upload/ExportExcel/";  //文件夹

            string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + "ByProduct.xlsx";

            string path = folderPath + fileName;

            //指定版本信息，07及以上版本最多可以插入1048576行数据
            wk.Version = ExcelVersion.Version2013;

            //获取第一张sheet
            Worksheet sheet = wk.Worksheets[0];

            #region 处理样式
            sheet.InsertRow(1);

            sheet.Range[1, 2].Text = "2019 YTD OIT";

            sheet.Range[1, 18].Text = "3 Month FCST";

            sheet.Range[1, 20].Text = "2019 YTD Sales";

            sheet.Range["B1:Q1"].Merge();

            sheet.Range["R1:S1"].Merge();

            sheet.Range["T1:AG1"].Merge();

            sheet.InsertRow(2);

            sheet.Range[2, 2].Text = "Value";

            sheet.Range[2, 10].Text = "Unit";

            sheet.Range[2, 18].Text = "Value";

            sheet.Range[2, 19].Text = "Unit";

            sheet.Range[2, 20].Text = "Value";

            sheet.Range[2, 27].Text = "Value";

            sheet.Range["B2:I2"].Merge();

            sheet.Range["J2:Q2"].Merge();

            sheet.Range["T2:Z2"].Merge();

            sheet.Range["AA2:AG2"].Merge();


            var row = dt.Rows.Count + 3;

            sheet.Range["A1:AG" + row + ""].Style.HorizontalAlignment = HorizontalAlignType.Center;

            #endregion


            //从第一行第一列开始插入数据，true代表数据包含列名
            sheet.InsertDataTable(dt, true, 3, 1);

            var lastYear = year - 1;


            for (int i = 0; i < dt.Rows.Count; i++)
            {
                var str = i + 4;
                string currentFormula1 = "=IFERROR(B" + str + "/C" + str + ",\"\")";
                sheet.Range[str, 4].Formula = currentFormula1;

                string currentFormula2 = "=IFERROR(B" + str + "/E" + str + "-1,\"\")";
                sheet.Range[str, 6].Formula = currentFormula2;

                string currentFormula3 = "=C" + str + "-B" + str + "";
                sheet.Range[str, 7].Formula = currentFormula3;

                string currentFormula4 = "=IFERROR(H" + str + "/G" + str + ",\"\")";
                sheet.Range[str, 9].Formula = currentFormula4;

                string currentFormula5 = "=IFERROR(J" + str + "/K" + str + ",\"\")";
                sheet.Range[str, 12].Formula = currentFormula5;

                string currentFormula6 = "=IFERROR(J" + str + "/M" + str + "-1,\"\")";
                sheet.Range[str, 14].Formula = currentFormula6;

                string currentFormula7 = "=K" + str + "-J" + str + "";
                sheet.Range[str, 15].Formula = currentFormula7;

                string currentFormula8 = "=IFERROR(P" + str + "/O" + str + ",\"\")";
                sheet.Range[str, 17].Formula = currentFormula8;

                string currentFormula9 = "=IFERROR(T" + str + "/U" + str + ",\"\")";
                sheet.Range[str, 22].Formula = currentFormula9;

                string currentFormula10 = "=IFERROR(T" + str + "/W" + str + "-1,\"\")";
                sheet.Range[str, 24].Formula = currentFormula10;

                string currentFormula11 = "=U" + str + "-T" + str + "";
                sheet.Range[str, 25].Formula = currentFormula11;

                string currentFormula12 = "=IFERROR(AA" + str + "/AB" + str + ",\"\")";
                sheet.Range[str, 29].Formula = currentFormula12;

                string currentFormula13 = "=IFERROR(AA" + str + "/AD" + str + "-1,\"\")";
                sheet.Range[str, 31].Formula = currentFormula13;

                string currentFormula14 = "=AB" + str + "-AA" + str + "";
                sheet.Range[str, 32].Formula = currentFormula14;


                //var Product = dt.Rows[i]["Product"].ToString();

                //var OIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), Product), Expression.Eq("TypeArea", 2), Expression.Eq("Year", lastYear), Expression.Eq("TypeName", "OIT"));

                //if (OIT != null)
                //{
                //    sheet.Range[str, 5].Value = ((OIT.M1 + OIT.M2 + OIT.M3 + OIT.M4 + OIT.M5 + OIT.M6) / 1000).ToString();
                //}
                //else
                //{
                //    sheet.Range[str, 5].Value = "0";
                //}

                //var Sales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), Product), Expression.Eq("TypeArea", 2), Expression.Eq("Year", lastYear), Expression.Eq("TypeName", "SALES"));

                //if (Sales != null)
                //{
                //    sheet.Range[str, 13].Value = ((Sales.M1 + Sales.M2 + Sales.M3 + Sales.M4 + Sales.M5 + Sales.M6) / 1000).ToString();
                //}
                //else
                //{
                //    sheet.Range[str, 13].Value = "0";
                //}
            }

            int j = dt.Rows.Count + 4;

            int q = j - 1;
            sheet.InsertRow(j);

            sheet.Range[j, 1].Value = "US Team";

            string f0 = "=SUM(B4:B" + q + ")";
            sheet.Range[j, 2].Formula = f0;

            string f1 = "=SUM(C4:C" + q + ")";
            sheet.Range[j, 3].Formula = f1;

            string f2 = "=SUM(D4:D" + q + ")";
            sheet.Range[j, 4].Formula = f2;

            string Formula1 = "=SUM(E4:E" + q + ")";
            sheet.Range[j, 5].Formula = Formula1;

            string Formula2 = "=SUM(F4:F" + q + ")";
            sheet.Range[j, 6].Formula = Formula2;

            string Formula3 = "=SUM(G4:G" + q + ")";
            sheet.Range[j, 7].Formula = Formula3;

            string Formula4 = "=SUM(H4:H" + q + ")";
            sheet.Range[j, 8].Formula = Formula4;

            string Formula5 = "=SUM(I4:I" + q + ")";
            sheet.Range[j, 9].Formula = Formula5;

            string Formula6 = "=SUM(J4:J" + q + ")";
            sheet.Range[j, 10].Formula = Formula6;

            string Formula7 = "=SUM(K4:K" + q + ")";
            sheet.Range[j, 11].Formula = Formula7;

            string Formula8 = "=SUM(L4:L" + q + ")";
            sheet.Range[j, 12].Formula = Formula8;

            string Formula9 = "=SUM(M4:M" + q + ")";
            sheet.Range[j, 13].Formula = Formula9;

            string Formula10 = "=SUM(N4:N" + q + ")";
            sheet.Range[j, 14].Formula = Formula10;

            string Formula11 = "=SUM(O4:O" + q + ")";
            sheet.Range[j, 15].Formula = Formula11;

            string Formula12 = "=SUM(P4:P" + q + ")";
            sheet.Range[j, 16].Formula = Formula12;

            string Formula13 = "=SUM(Q4:Q" + q + ")";
            sheet.Range[j, 17].Formula = Formula13;

            string Formula14 = "=SUM(R4:R" + q + ")";
            sheet.Range[j, 18].Formula = Formula14;

            string Formula15 = "=SUM(S4:S" + q + ")";
            sheet.Range[j, 19].Formula = Formula15;

            string Formula16 = "=SUM(T4:T" + q + ")";
            sheet.Range[j, 20].Formula = Formula16;

            string Formula17 = "=SUM(U4:U" + q + ")";
            sheet.Range[j, 21].Formula = Formula17;

            string Formula18 = "=SUM(V4:V" + q + ")";
            sheet.Range[j, 22].Formula = Formula18;

            string Formula19 = "=SUM(W4:W" + q + ")";
            sheet.Range[j, 23].Formula = Formula19;

            string Formula20 = "=SUM(X4:X" + q + ")";
            sheet.Range[j, 24].Formula = Formula20;

            string Formula21 = "=SUM(Y4:Y" + q + ")";
            sheet.Range[j, 25].Formula = Formula21;

            string Formula22 = "=SUM(Z4:Z" + q + ")";
            sheet.Range[j, 26].Formula = Formula22;

            string Formula23 = "=SUM(AA4:AA" + q + ")";
            sheet.Range[j, 27].Formula = Formula23;

            string Formula24 = "=SUM(AB4:AB" + q + ")";
            sheet.Range[j, 28].Formula = Formula24;

            string Formula25 = "=SUM(AC4:AC" + q + ")";
            sheet.Range[j, 29].Formula = Formula25;

            string Formula26 = "=SUM(AD4:AD" + q + ")";
            sheet.Range[j, 30].Formula = Formula26;

            string Formula27 = "=SUM(AE4:AE" + q + ")";
            sheet.Range[j, 31].Formula = Formula27;

            string Formula28 = "=SUM(AF4:AF" + q + ")";
            sheet.Range[j, 32].Formula = Formula28;

            string Formula29 = "=SUM(AG4:AG" + q + ")";
            sheet.Range[j, 33].Formula = Formula29;

            //保存文件
            wk.SaveToFile(Context.Server.MapPath(path), ExcelVersion.Version2013);

        }

        void  ExportDistrict()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            Workbook wk = new Workbook();

            var dt = ExportSqlHelper.queryDistrictExport(month,year);

            string folderPath = "/Upload/ExportExcel/";  //文件夹

            string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + "ByDistrict.xlsx";

            string path = folderPath + fileName;

            //指定版本信息，07及以上版本最多可以插入1048576行数据
            wk.Version = ExcelVersion.Version2013;

            //获取第一张sheet
            Worksheet sheet = wk.Worksheets[0];


            #region 处理样式
            sheet.InsertRow(1);

            sheet.Range[1, 1].Text = "2019 YTD OIT";

            sheet.Range[1, 15].Text = "Current Month";
            sheet.Range[1, 15].ColumnWidth = 25;//单元格的宽度

            sheet.Range[1, 16].Text = "Next 2 Month";
            sheet.Range[1, 16].ColumnWidth = 25;//单元格的宽度

            sheet.Range[1, 17].Text = "2019 YTD Sales";

            sheet.Range[1, 28].Text = "Invenroty by Unit";
            sheet.Range[1, 28].ColumnWidth = 25;//单元格的宽度

            sheet.Range["A1:N1"].Merge();

            sheet.Range["Q1:AA1"].Merge();

            var row = dt.Rows.Count + 3;

            sheet.Range["A1:AB" + row + ""].Style.HorizontalAlignment = HorizontalAlignType.Center;

            #endregion


            dt.Rows.RemoveAt(dt.Rows.Count - 1);

            //从第一行第一列开始插入数据，true代表数据包含列名
            sheet.InsertDataTable(dt, true, 2, 1);

            dt.Columns[0].Caption = "";

            var lastYear = year - 1;

            int j = 0;
            int h = 0;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                int str = i + 3;
                string currentFormula1 = "=IFERROR(C" + str + "/D" + str + ",\"\")";
                sheet.Range[str, 5].Formula = currentFormula1;

                string currentFormula2 = "=F" + str + "/G" + str + "";
                sheet.Range[str, 8].Formula = currentFormula2;

                string currentFormula3 = "=IFERROR(F" + str + "/J" + str + "-1,\"\")";
                sheet.Range[str, 11].Formula = currentFormula3;

                string currentFormula4 = "=G" + str + "-F" + str + "";
                sheet.Range[str, 12].Formula = currentFormula4;

                string currentFormula5 = "=IFERROR(M" + str + "/L" + str + ",\"\")";
                sheet.Range[str, 14].Formula = currentFormula5;

                string currentFormula6 = "=IFERROR(Q" + str + "/R" + str + ",\"\")";
                sheet.Range[str, 19].Formula = currentFormula6;

                string currentFormula7 = "=T" + str + "/U" + str + "";
                sheet.Range[str, 22].Formula = currentFormula7;

                string currentFormula8 = "=IFERROR(T" + str + "/X" + str + "-1,\"\")";
                sheet.Range[str, 25].Formula = currentFormula8;

                string currentFormula9 = "=U" + str + "-T" + str + "";
                sheet.Range[str, 26].Formula = currentFormula9;


                var newDistrict = dt.Rows[i]["NewDistrict"].ToString();
                var Region = dt.Rows[i]["Region"].ToString();


                #region 处理数据

                if (!string.IsNullOrEmpty(Region) && !string.IsNullOrEmpty(newDistrict))
                {
                    //var OIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", lastYear), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "OIT"));

                    //if (OIT != null)
                    //{
                    //    sheet.Range[str, 10].Value = ((OIT.M1 + OIT.M2 + OIT.M3 + OIT.M4 + OIT.M5 + OIT.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 10].Value = "0";
                    //}

                    //var Sales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", lastYear), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "SALES"));

                    //if (Sales != null)
                    //{
                    //    sheet.Range[str, 24].Value = ((Sales.M1 + Sales.M2 + Sales.M3 + Sales.M4 + Sales.M5 + Sales.M6) / 1000).ToString();
                    //}
                    //else
                    //{
                    //    sheet.Range[str, 24].Value = "0";
                    //}

                    if (h == 0)
                    {
                        j = i + 3;
                    }

                    h = 1;

                }
                else
                {

                    int t = str - 1;

                    string currentFormula10 = "=SUM(D" + j + ":D" + t + ")";
                    sheet.Range[str, 4].Formula = currentFormula10;


                    string Formula1 = "=SUM(E" + j + ":E" + t + ")";
                    sheet.Range[str, 5].Formula = Formula1;

                    string Formula2 = "=SUM(F" + j + ":F" + t + ")";
                    sheet.Range[str, 6].Formula = Formula2;

                    string Formula3 = "=SUM(G" + j + ":G" + t + ")";
                    sheet.Range[str, 7].Formula = Formula3;

                    string Formula4 = "=SUM(H" + j + ":H" + t + ")";
                    sheet.Range[str, 8].Formula = Formula4;

                    string Formula5 = "=SUM(I" + j + ":I" + t + ")";
                    sheet.Range[str, 9].Formula = Formula5;

                    string Formula6 = "=SUM(J" + j + ":J" + t + ")";
                    sheet.Range[str, 10].Formula = Formula6;

                    string Formula7 = "=SUM(K" + j + ":K" + t + ")";
                    sheet.Range[str, 11].Formula = Formula7;

                    string Formula8 = "=SUM(L" + j + ":L" + t + ")";
                    sheet.Range[str, 12].Formula = Formula8;

                    string Formula9 = "=SUM(M" + j + ":M" + t + ")";
                    sheet.Range[str, 13].Formula = Formula9;

                    string Formula10 = "=SUM(N" + j + ":N" + t + ")";
                    sheet.Range[str, 14].Formula = Formula10;

                    string Formula11 = "=SUM(O" + j + ":O" + t + ")";
                    sheet.Range[str, 15].Formula = Formula11;

                    string Formula12 = "=SUM(P" + j + ":P" + t + ")";
                    sheet.Range[str, 16].Formula = Formula12;

                    string Formula13 = "=SUM(Q" + j + ":Q" + t + ")";
                    sheet.Range[str, 17].Formula = Formula13;

                    string Formula14 = "=SUM(R" + j + ":R" + t + ")";
                    sheet.Range[str, 18].Formula = Formula14;

                    string Formula15 = "=SUM(S" + j + ":S" + t + ")";
                    sheet.Range[str, 19].Formula = Formula15;

                    string Formula16 = "=SUM(T" + j + ":T" + t + ")";
                    sheet.Range[str, 20].Formula = Formula16;

                    string Formula17 = "=SUM(U" + j + ":U" + t + ")";
                    sheet.Range[str, 21].Formula = Formula17;

                    string Formula18 = "=SUM(V" + j + ":V" + t + ")";
                    sheet.Range[str, 22].Formula = Formula18;

                    string Formula19 = "=SUM(W" + j + ":W" + t + ")";
                    sheet.Range[str, 23].Formula = Formula19;

                    string Formula20 = "=SUM(X" + j + ":X" + t + ")";
                    sheet.Range[str, 24].Formula = Formula20;

                    string Formula21 = "=SUM(Y" + j + ":Y" + t + ")";
                    sheet.Range[str, 25].Formula = Formula21;

                    string Formula22 = "=SUM(Z" + j + ":Z" + t + ")";
                    sheet.Range[str, 26].Formula = Formula22;

                    string Formula23 = "=SUM(AA" + j + ":AA" + t + ")";
                    sheet.Range[str, 27].Formula = Formula23;

                    string Formula24 = "=SUM(AB" + j + ":AB" + t + ")";
                    sheet.Range[str, 28].Formula = Formula24;

                    h = 0;

                }
                #endregion

            }
            //保存文件
            wk.SaveToFile(Context.Server.MapPath(path), ExcelVersion.Version2013);

        }


        void ExportOldBydistrictByclinical()
        {
            Workbook wk = new Workbook();

            var dt = ExportSqlHelper.queryOldProductDistrictExport();

            string folderPath = "/Upload/ExportExcel/";  //文件夹

            string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + "ByProductClinical.xlsx";

            string path = folderPath + fileName;

            //指定版本信息，07及以上版本最多可以插入1048576行数据
            wk.Version = ExcelVersion.Version2013;

            //获取第一张sheet
            Worksheet sheet = wk.Worksheets[0];

            #region 处理样式
            sheet.InsertRow(1);

            sheet.Range[1, 3].Text = "CV";

            sheet.Range[1, 17].Text = "GI";

            sheet.Range[1, 30].Text = "WHC";

            sheet.Range[1, 43].Text = "POC";

            sheet.Range["C1:O1"].Merge();

            sheet.Range["P1:AB1"].Merge();

            sheet.Range["AC1:AO1"].Merge();

            sheet.Range["AP1:BB1"].Merge();

            sheet.InsertRow(2);

            sheet.Range[2, 3].Text = "OIT";

            sheet.Range[2, 11].Text = "Sales";

            sheet.Range[2, 16].Text = "OIT";

            sheet.Range[2, 24].Text = "Sales";

            sheet.Range[2, 29].Text = "OIT";

            sheet.Range[2, 37].Text = "Sales";

            sheet.Range[2, 42].Text = "OIT";

            sheet.Range[2, 50].Text = "Sales";

            sheet.Range["C2:J2"].Merge();

            sheet.Range["K2:O2"].Merge();

            sheet.Range["P2:W2"].Merge();

            sheet.Range["X2:AB2"].Merge();

            sheet.Range["AC2:AJ2"].Merge();

            sheet.Range["AK2:AO2"].Merge();

            sheet.Range["AP2:AW2"].Merge();

            sheet.Range["AX2:BB2"].Merge();


            var row = dt.Rows.Count + 3;

            sheet.Range["A1:BB" + row + ""].Style.HorizontalAlignment = HorizontalAlignType.Center;

            #endregion


            dt.Rows.RemoveAt(dt.Rows.Count - 1);

            //从第一行第一列开始插入数据，true代表数据包含列名
            sheet.InsertDataTable(dt, true, 3, 1);

            var year = DateTime.Now.Year - 1;

            int j = 0;
            int h = 0;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                var str = i + 4;
                string currentFormula1 = "=IFERROR(C" + str + "/D" + str + ",\"\")";
                sheet.Range[str, 5].Formula = currentFormula1;

                string currentFormula2 = "=IFERROR(C" + str + "/F" + str + "-1,\"\")";
                sheet.Range[str, 7].Formula = currentFormula2;

                string currentFormula3 = "=D" + str + "-C" + str + "";
                sheet.Range[str, 8].Formula = currentFormula3;

                string currentFormula4 = "=IFERROR(I" + str + "/H" + str + ",\"\")";
                sheet.Range[str, 10].Formula = currentFormula4;

                string currentFormula5 = "=IFERROR(K" + str + "/L" + str + ",\"\")";
                sheet.Range[str, 13].Formula = currentFormula5;

                string currentFormula6 = "=IFERROR(K" + str + "/N" + str + "-1,\"\")";
                sheet.Range[str, 15].Formula = currentFormula6;

                string currentFormula7 = "=IFERROR(P" + str + "/Q" + str + ",\"\")";
                sheet.Range[str, 18].Formula = currentFormula7;

                string currentFormula8 = "=IFERROR(P" + str + "/S" + str + "-1,\"\")";
                sheet.Range[str, 20].Formula = currentFormula8;

                string currentFormula9 = "=Q" + str + "-P" + str + "";
                sheet.Range[str, 21].Formula = currentFormula9;

                string currentFormula10 = "=IFERROR(V" + str + "/U" + str + ",\"\")";
                sheet.Range[str, 23].Formula = currentFormula10;

                string currentFormula11 = "=IFERROR(X" + str + "/Y" + str + ",\"\")";
                sheet.Range[str, 26].Formula = currentFormula11;

                string currentFormula12 = "=IFERROR(X" + str + "/AA" + str + "-1,\"\")";
                sheet.Range[str, 28].Formula = currentFormula12;

                string currentFormula13 = "=IFERROR(AC" + str + "/AD" + str + ",\"\")";
                sheet.Range[str, 31].Formula = currentFormula13;

                string currentFormula14 = "=IFERROR(AC" + str + "/AF" + str + "-1,\"\")";
                sheet.Range[str, 33].Formula = currentFormula14;

                string currentFormula15 = "=AD" + str + "-AC" + str + "";
                sheet.Range[str, 34].Formula = currentFormula15;

                string currentFormula16 = "=IFERROR(AI" + str + "/AH" + str + ",\"\")";
                sheet.Range[str, 36].Formula = currentFormula16;

                string currentFormula17 = "=IFERROR(AK" + str + "/AL" + str + ",\"\")";
                sheet.Range[str, 39].Formula = currentFormula17;

                string currentFormula18 = "=IFERROR(AK" + str + "/AN" + str + "-1,\"\")";
                sheet.Range[str, 41].Formula = currentFormula18;

                string currentFormula19 = "=IFERROR(AP" + str + "/AQ" + str + ",\"\")";
                sheet.Range[str, 44].Formula = currentFormula19;

                string currentFormula20 = "=IFERROR(AP" + str + "/AS" + str + "-1,\"\")";
                sheet.Range[str, 46].Formula = currentFormula20;

                string currentFormula21 = "=AQ" + str + "-AP" + str + "";
                sheet.Range[str, 47].Formula = currentFormula21;

                string currentFormula22 = "=IFERROR(AV" + str + "/AU" + str + ",\"\")";
                sheet.Range[str, 49].Formula = currentFormula22;

                string currentFormula23 = "=IFERROR(AX" + str + "/AY" + str + ",\"\")";
                sheet.Range[str, 52].Formula = currentFormula23;

                string currentFormula24 = "=IFERROR(AX" + str + "/BA" + str + "-1,\"\")";
                sheet.Range[str, 54].Formula = currentFormula24;

                var Region = dt.Rows[i]["Region"].ToString();
                var newDistrict = dt.Rows[i]["NewDistrict"].ToString();

                if (!string.IsNullOrEmpty(Region) && !string.IsNullOrEmpty(newDistrict))
                {
                    #region cv
                    var cvOIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "OIT"));

                    if (cvOIT != null)
                    {
                        sheet.Range[str, 6].Value = ((cvOIT.M1 + cvOIT.M2 + cvOIT.M3 + cvOIT.M4 + cvOIT.M5 + cvOIT.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 6].Value = "0";
                    }

                    var cvSales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "SALES"));

                    if (cvSales != null)
                    {
                        sheet.Range[str, 14].Value = ((cvSales.M1 + cvSales.M2 + cvSales.M3 + cvSales.M4 + cvSales.M5 + cvSales.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 14].Value = "0";
                    }

                    #endregion

                    #region gi
                    var giOIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "OIT"));

                    if (giOIT != null)
                    {
                        sheet.Range[str, 6].Value = ((giOIT.M1 + giOIT.M2 + giOIT.M3 + giOIT.M4 + giOIT.M5 + giOIT.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 6].Value = "0";
                    }

                    var giSales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "SALES"));

                    if (giSales != null)
                    {
                        sheet.Range[str, 14].Value = ((giSales.M1 + giSales.M2 + giSales.M3 + giSales.M4 + giSales.M5 + giSales.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 14].Value = "0";
                    }

                    #endregion


                    #region WHC
                    var WHCOIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "OIT"));

                    if (WHCOIT != null)
                    {
                        sheet.Range[str, 22].Value = ((WHCOIT.M1 + WHCOIT.M2 + WHCOIT.M3 + WHCOIT.M4 + WHCOIT.M5 + WHCOIT.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 22].Value = "0";
                    }

                    var WHCSales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "SALES"));

                    if (giSales != null)
                    {
                        sheet.Range[str, 14].Value = ((WHCSales.M1 + WHCSales.M2 + WHCSales.M3 + WHCSales.M4 + WHCSales.M5 + WHCSales.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 14].Value = "0";
                    }

                    #endregion



                    #region POC
                    var POCOIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "OIT"));

                    if (WHCOIT != null)
                    {
                        sheet.Range[str, 6].Value = ((POCOIT.M1 + POCOIT.M2 + POCOIT.M3 + POCOIT.M4 + POCOIT.M5 + POCOIT.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 6].Value = "0";
                    }

                    var POCSales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq("TypeName", "SALES"));

                    if (giSales != null)
                    {
                        sheet.Range[str, 14].Value = ((POCSales.M1 + POCSales.M2 + POCSales.M3 + POCSales.M4 + POCSales.M5 + POCSales.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 14].Value = "0";
                    }

                    #endregion



                    if (h == 0)
                    {
                        j = i + 3;
                    }

                    h = 1;
                }
                else
                {
                    #region 计算SUM
                    int t = str - 1;

                    string f0 = "=SUM(D" + j + ":D" + t + ")";
                    sheet.Range[str, 4].Formula = f0;


                    string Formula1 = "=SUM(E" + j + ":E" + t + ")";
                    sheet.Range[str, 5].Formula = Formula1;

                    string Formula2 = "=SUM(F" + j + ":F" + t + ")";
                    sheet.Range[str, 6].Formula = Formula2;

                    string Formula3 = "=SUM(G" + j + ":G" + t + ")";
                    sheet.Range[str, 7].Formula = Formula3;

                    string Formula4 = "=SUM(H" + j + ":H" + t + ")";
                    sheet.Range[str, 8].Formula = Formula4;

                    string Formula5 = "=SUM(I" + j + ":I" + t + ")";
                    sheet.Range[str, 9].Formula = Formula5;

                    string Formula6 = "=SUM(J" + j + ":J" + t + ")";
                    sheet.Range[str, 10].Formula = Formula6;

                    string Formula7 = "=SUM(K" + j + ":K" + t + ")";
                    sheet.Range[str, 11].Formula = Formula7;

                    string Formula8 = "=SUM(L" + j + ":L" + t + ")";
                    sheet.Range[str, 12].Formula = Formula8;

                    string Formula9 = "=SUM(M" + j + ":M" + t + ")";
                    sheet.Range[str, 13].Formula = Formula9;

                    string Formula10 = "=SUM(N" + j + ":N" + t + ")";
                    sheet.Range[str, 14].Formula = Formula10;

                    string Formula11 = "=SUM(O" + j + ":O" + t + ")";
                    sheet.Range[str, 15].Formula = Formula11;

                    string Formula12 = "=SUM(P" + j + ":P" + t + ")";
                    sheet.Range[str, 16].Formula = Formula12;

                    string Formula13 = "=SUM(Q" + j + ":Q" + t + ")";
                    sheet.Range[str, 17].Formula = Formula13;

                    string Formula14 = "=SUM(R" + j + ":R" + t + ")";
                    sheet.Range[str, 18].Formula = Formula14;

                    string Formula15 = "=SUM(S" + j + ":S" + t + ")";
                    sheet.Range[str, 19].Formula = Formula15;

                    string Formula16 = "=SUM(T" + j + ":T" + t + ")";
                    sheet.Range[str, 20].Formula = Formula16;

                    string Formula17 = "=SUM(U" + j + ":U" + t + ")";
                    sheet.Range[str, 21].Formula = Formula17;

                    string Formula18 = "=SUM(V" + j + ":V" + t + ")";
                    sheet.Range[str, 22].Formula = Formula18;

                    string Formula19 = "=SUM(W" + j + ":W" + t + ")";
                    sheet.Range[str, 23].Formula = Formula19;

                    string Formula20 = "=SUM(X" + j + ":X" + t + ")";
                    sheet.Range[str, 24].Formula = Formula20;

                    string Formula21 = "=SUM(Y" + j + ":Y" + t + ")";
                    sheet.Range[str, 25].Formula = Formula21;

                    string Formula22 = "=SUM(Z" + j + ":Z" + t + ")";
                    sheet.Range[str, 26].Formula = Formula22;

                    string Formula23 = "=SUM(AA" + j + ":AA" + t + ")";
                    sheet.Range[str, 27].Formula = Formula23;

                    string Formula24 = "=SUM(AB" + j + ":AB" + t + ")";
                    sheet.Range[str, 28].Formula = Formula24;

                    string f1 = "=SUM(AC" + j + ":AC" + t + ")";
                    sheet.Range[str, 29].Formula = f1;

                    string f2 = "=SUM(AD" + j + ":AD" + t + ")";
                    sheet.Range[str, 30].Formula = f2;

                    string f3 = "=SUM(AE" + j + ":AE" + t + ")";
                    sheet.Range[str, 31].Formula = f3;

                    string f4 = "=SUM(AF" + j + ":AF" + t + ")";
                    sheet.Range[str, 32].Formula = f4;

                    string f5 = "=SUM(AG" + j + ":AG" + t + ")";
                    sheet.Range[str, 33].Formula = f5;

                    string f6 = "=SUM(AH" + j + ":AH" + t + ")";
                    sheet.Range[str, 34].Formula = f6;

                    string f7 = "=SUM(AI" + j + ":AI" + t + ")";
                    sheet.Range[str, 35].Formula = f7;

                    string f8 = "=SUM(AJ" + j + ":AJ" + t + ")";
                    sheet.Range[str, 36].Formula = f8;

                    string f9 = "=SUM(AK" + j + ":AK" + t + ")";
                    sheet.Range[str, 37].Formula = f9;

                    string f10 = "=SUM(AL" + j + ":AL" + t + ")";
                    sheet.Range[str, 38].Formula = f10;

                    string f11 = "=SUM(AM" + j + ":AM" + t + ")";
                    sheet.Range[str, 39].Formula = f11;

                    string f12 = "=SUM(AN" + j + ":AN" + t + ")";
                    sheet.Range[str, 40].Formula = f12;

                    string f13 = "=SUM(AO" + j + ":AO" + t + ")";
                    sheet.Range[str, 41].Formula = f13;

                    string f14 = "=SUM(AP" + j + ":AP" + t + ")";
                    sheet.Range[str, 42].Formula = f14;

                    string f15 = "=SUM(AQ" + j + ":AQ" + t + ")";
                    sheet.Range[str, 43].Formula = f15;

                    string f16 = "=SUM(AR" + j + ":AR" + t + ")";
                    sheet.Range[str, 44].Formula = f16;

                    string f17 = "=SUM(AS" + j + ":AS" + t + ")";
                    sheet.Range[str, 45].Formula = f17;

                    string f18 = "=SUM(AT" + j + ":AT" + t + ")";
                    sheet.Range[str, 46].Formula = f18;

                    string f19 = "=SUM(AU" + j + ":AU" + t + ")";
                    sheet.Range[str, 47].Formula = f19;

                    string f20 = "=SUM(AV" + j + ":AV" + t + ")";
                    sheet.Range[str, 48].Formula = f20;

                    string f21 = "=SUM(AW" + j + ":AW" + t + ")";
                    sheet.Range[str, 49].Formula = f21;

                    string f22 = "=SUM(AX" + j + ":AX" + t + ")";
                    sheet.Range[str, 50].Formula = f22;

                    string f23 = "=SUM(AY" + j + ":AY" + t + ")";
                    sheet.Range[str, 51].Formula = f23;

                    string f24 = "=SUM(AZ" + j + ":AZ" + t + ")";
                    sheet.Range[str, 52].Formula = f24;

                    string f25 = "=SUM(BA" + j + ":BA" + t + ")";
                    sheet.Range[str, 53].Formula = f25;

                    string f26 = "=SUM(BB" + j + ":BB" + t + ")";
                    sheet.Range[str, 54].Formula = f26;

                    h = 0;

                    #endregion
                }


            }
            //保存文件
            wk.SaveToFile(Context.Server.MapPath(path), ExcelVersion.Version2013);
        }

        void ExportOldbyProduct()
        {
            Workbook wk = new Workbook();

            var dt = ExportSqlHelper.queryOldProductExport();

            string folderPath = "/Upload/ExportExcel/";  //文件夹

            string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + "ByProduct.xlsx";

            string path = folderPath + fileName;

            //指定版本信息，07及以上版本最多可以插入1048576行数据
            wk.Version = ExcelVersion.Version2013;

            //获取第一张sheet
            Worksheet sheet = wk.Worksheets[0];

            #region 处理样式
            sheet.InsertRow(1);

            sheet.Range[1, 2].Text = "2019 YTD OIT";

            sheet.Range[1, 18].Text = "3 Month FCST";

            sheet.Range[1, 20].Text = "2019 YTD Sales";

            sheet.Range["B1:Q1"].Merge();

            sheet.Range["R1:S1"].Merge();

            sheet.Range["T1:AG1"].Merge();

            sheet.InsertRow(2);

            sheet.Range[2, 2].Text = "Value";

            sheet.Range[2, 10].Text = "Unit";

            sheet.Range[2, 18].Text = "Value";

            sheet.Range[2, 19].Text = "Unit";

            sheet.Range[2, 20].Text = "Value";

            sheet.Range[2, 27].Text = "Value";

            sheet.Range["B2:I2"].Merge();

            sheet.Range["J2:Q2"].Merge();

            sheet.Range["T2:Z2"].Merge();

            sheet.Range["AA2:AG2"].Merge();


            var row = dt.Rows.Count + 3;

            sheet.Range["A1:AG" + row + ""].Style.HorizontalAlignment = HorizontalAlignType.Center;

            #endregion


            //从第一行第一列开始插入数据，true代表数据包含列名
            sheet.InsertDataTable(dt, true, 3, 1);

            var year = DateTime.Now.Year - 1;


            for (int i = 0; i < dt.Rows.Count; i++)
            {
                var str = i + 4;
                string currentFormula1 = "=IFERROR(B" + str + "/C" + str + ",\"\")";
                sheet.Range[str, 4].Formula = currentFormula1;

                string currentFormula2 = "=IFERROR(B" + str + "/E" + str + "-1,\"\")";
                sheet.Range[str, 6].Formula = currentFormula2;

                string currentFormula3 = "=C" + str + "-B" + str + "";
                sheet.Range[str, 7].Formula = currentFormula3;

                string currentFormula4 = "=IFERROR(H" + str + "/G" + str + ",\"\")";
                sheet.Range[str, 9].Formula = currentFormula4;

                string currentFormula5 = "=IFERROR(J" + str + "/K" + str + ",\"\")";
                sheet.Range[str, 12].Formula = currentFormula5;

                string currentFormula6 = "=IFERROR(J" + str + "/M" + str + "-1,\"\")";
                sheet.Range[str, 14].Formula = currentFormula6;

                string currentFormula7 = "=K" + str + "-J" + str + "";
                sheet.Range[str, 15].Formula = currentFormula7;

                string currentFormula8 = "=IFERROR(P" + str + "/O" + str + ",\"\")";
                sheet.Range[str, 17].Formula = currentFormula8;

                string currentFormula9 = "=IFERROR(T" + str + "/U" + str + ",\"\")";
                sheet.Range[str, 22].Formula = currentFormula9;

                string currentFormula10 = "=IFERROR(T" + str + "/W" + str + "-1,\"\")";
                sheet.Range[str, 24].Formula = currentFormula10;

                string currentFormula11 = "=U" + str + "-T" + str + "";
                sheet.Range[str, 25].Formula = currentFormula11;

                string currentFormula12 = "=IFERROR(AA" + str + "/AB" + str + ",\"\")";
                sheet.Range[str, 29].Formula = currentFormula12;

                string currentFormula13 = "=IFERROR(AA" + str + "/AD" + str + "-1,\"\")";
                sheet.Range[str, 31].Formula = currentFormula13;

                string currentFormula14 = "=AB" + str + "-AA" + str + "";
                sheet.Range[str, 32].Formula = currentFormula14;


                var Product = dt.Rows[i]["Product"].ToString();


                var OIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), Product), Expression.Eq("TypeArea", 2), Expression.Eq("Year", year), Expression.Eq("TypeName", "OIT"));

                if (OIT != null)
                {
                    sheet.Range[str, 5].Value = ((OIT.M1 + OIT.M2 + OIT.M3 + OIT.M4 + OIT.M5 + OIT.M6) / 1000).ToString();
                }
                else
                {
                    sheet.Range[str, 5].Value = "0";
                }

                var Sales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), Product), Expression.Eq("TypeArea", 2), Expression.Eq("Year", year), Expression.Eq("TypeName", "SALES"));

                if (Sales != null)
                {
                    sheet.Range[str, 13].Value = ((Sales.M1 + Sales.M2 + Sales.M3 + Sales.M4 + Sales.M5 + Sales.M6) / 1000).ToString();
                }
                else
                {
                    sheet.Range[str, 13].Value = "0";
                }
            }

            int j = dt.Rows.Count + 4;

            int q = j - 1;
            sheet.InsertRow(j);

            sheet.Range[j, 1].Value = "US Team";

            string f0 = "=SUM(B4:B" + q + ")";
            sheet.Range[j, 2].Formula = f0;

            string f1 = "=SUM(C4:C" + q + ")";
            sheet.Range[j, 3].Formula = f1;

            string f2 = "=SUM(D4:D" + q + ")";
            sheet.Range[j, 4].Formula = f2;

            string Formula1 = "=SUM(E4:E" + q + ")";
            sheet.Range[j, 5].Formula = Formula1;

            string Formula2 = "=SUM(F4:F" + q + ")";
            sheet.Range[j, 6].Formula = Formula2;

            string Formula3 = "=SUM(G4:G" + q + ")";
            sheet.Range[j, 7].Formula = Formula3;

            string Formula4 = "=SUM(H4:H" + q + ")";
            sheet.Range[j, 8].Formula = Formula4;

            string Formula5 = "=SUM(I4:I" + q + ")";
            sheet.Range[j, 9].Formula = Formula5;

            string Formula6 = "=SUM(J4:J" + q + ")";
            sheet.Range[j, 10].Formula = Formula6;

            string Formula7 = "=SUM(K4:K" + q + ")";
            sheet.Range[j, 11].Formula = Formula7;

            string Formula8 = "=SUM(L4:L" + q + ")";
            sheet.Range[j, 12].Formula = Formula8;

            string Formula9 = "=SUM(M4:M" + q + ")";
            sheet.Range[j, 13].Formula = Formula9;

            string Formula10 = "=SUM(N4:N" + q + ")";
            sheet.Range[j, 14].Formula = Formula10;

            string Formula11 = "=SUM(O4:O" + q + ")";
            sheet.Range[j, 15].Formula = Formula11;

            string Formula12 = "=SUM(P4:P" + q + ")";
            sheet.Range[j, 16].Formula = Formula12;

            string Formula13 = "=SUM(Q4:Q" + q + ")";
            sheet.Range[j, 17].Formula = Formula13;

            string Formula14 = "=SUM(R4:R" + q + ")";
            sheet.Range[j, 18].Formula = Formula14;

            string Formula15 = "=SUM(S4:S" + q + ")";
            sheet.Range[j, 19].Formula = Formula15;

            string Formula16 = "=SUM(T4:T" + q + ")";
            sheet.Range[j, 20].Formula = Formula16;

            string Formula17 = "=SUM(U4:U" + q + ")";
            sheet.Range[j, 21].Formula = Formula17;

            string Formula18 = "=SUM(V4:V" + q + ")";
            sheet.Range[j, 22].Formula = Formula18;

            string Formula19 = "=SUM(W4:W" + q + ")";
            sheet.Range[j, 23].Formula = Formula19;

            string Formula20 = "=SUM(X4:X" + q + ")";
            sheet.Range[j, 24].Formula = Formula20;

            string Formula21 = "=SUM(Y4:Y" + q + ")";
            sheet.Range[j, 25].Formula = Formula21;

            string Formula22 = "=SUM(Z4:Z" + q + ")";
            sheet.Range[j, 26].Formula = Formula22;

            string Formula23 = "=SUM(AA4:AA" + q + ")";
            sheet.Range[j, 27].Formula = Formula23;

            string Formula24 = "=SUM(AB4:AB" + q + ")";
            sheet.Range[j, 28].Formula = Formula24;

            string Formula25 = "=SUM(AC4:AC" + q + ")";
            sheet.Range[j, 29].Formula = Formula25;

            string Formula26 = "=SUM(AD4:AD" + q + ")";
            sheet.Range[j, 30].Formula = Formula26;

            string Formula27 = "=SUM(AE4:AE" + q + ")";
            sheet.Range[j, 31].Formula = Formula27;

            string Formula28 = "=SUM(AF4:AF" + q + ")";
            sheet.Range[j, 32].Formula = Formula28;

            string Formula29 = "=SUM(AG4:AG" + q + ")";
            sheet.Range[j, 33].Formula = Formula29;

            //保存文件
            wk.SaveToFile(Context.Server.MapPath(path), ExcelVersion.Version2013);

        }

        void ExportOldDistrict()
        {
            Workbook wk = new Workbook();

            var dt = ExportSqlHelper.queryOldDistrictExport();

            string folderPath = "/Upload/ExportExcel/";  //文件夹

            string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString()+ "ByDistrict.xlsx";

            string path = folderPath + fileName;

            //指定版本信息，07及以上版本最多可以插入1048576行数据
            wk.Version = ExcelVersion.Version2013;

            //获取第一张sheet
            Worksheet sheet = wk.Worksheets[0];


            #region 处理样式
            sheet.InsertRow(1);

            sheet.Range[1, 1].Text = "2019 YTD OIT";

            sheet.Range[1, 15].Text = "Current Month";
            sheet.Range[1,15].ColumnWidth = 25;//单元格的宽度

            sheet.Range[1, 16].Text = "Next 2 Month";
            sheet.Range[1,16].ColumnWidth = 25;//单元格的宽度

            sheet.Range[1, 17].Text = "2019 YTD Sales";

            sheet.Range[1, 28].Text = "Invenroty by Unit";
            sheet.Range[1, 28].ColumnWidth = 25;//单元格的宽度

            sheet.Range["A1:N1"].Merge();

            sheet.Range["Q1:AA1"].Merge();

            var row = dt.Rows.Count + 3;

            sheet.Range["A1:AB"+row+""].Style.HorizontalAlignment = HorizontalAlignType.Center;

            #endregion


            dt.Rows.RemoveAt(dt.Rows.Count-1);

            //从第一行第一列开始插入数据，true代表数据包含列名
            sheet.InsertDataTable(dt, true, 2, 1);

            dt.Columns[0].Caption = "";

            var year = DateTime.Now.Year - 1;

            int j = 0;
            int h = 0;
            for (int i = 0; i < dt.Rows.Count; i++)
            {
                int str = i+3;
                string currentFormula1 = "=IFERROR(C"+str+ "/D" + str + ",\"\")";
                sheet.Range[str, 5].Formula = currentFormula1;

                string currentFormula2 = "=F" + str + "/G" + str + "";
                sheet.Range[str, 8].Formula = currentFormula2;

                string currentFormula3 = "=IFERROR(F" + str + "/J" + str + "-1,\"\")";
                sheet.Range[str, 11].Formula = currentFormula3;

                string currentFormula4 = "=G" + str + "-F" + str + "";
                sheet.Range[str, 12].Formula = currentFormula4;

                string currentFormula5 = "=IFERROR(M" + str + "/L" + str + ",\"\")";
                sheet.Range[str, 14].Formula = currentFormula5;

                string currentFormula6 = "=IFERROR(Q" + str + "/R" + str + ",\"\")";
                sheet.Range[str, 19].Formula = currentFormula6;

                string currentFormula7= "=T" + str + "/U" + str + "";
                sheet.Range[str, 22].Formula = currentFormula7;

                string currentFormula8 = "=IFERROR(T" + str + "/X" + str + "-1,\"\")";
                sheet.Range[str, 25].Formula = currentFormula8;

                string currentFormula9 = "=U" + str + "-T" + str + "";
                sheet.Range[str, 26].Formula = currentFormula9;


                var newDistrict = dt.Rows[i]["NewDistrict"].ToString();
                var Region = dt.Rows[i]["Region"].ToString();


                #region 处理数据

                if (!string.IsNullOrEmpty(Region) && !string.IsNullOrEmpty(newDistrict))
                {
                   

                    var OIT = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year), Expression.Eq(nameof(OITSales.TypeArea), 1),Expression.Eq("TypeName", "OIT"));

                    if (OIT != null)
                    {
                        sheet.Range[str, 10].Value = ((OIT.M1 + OIT.M2 + OIT.M3 + OIT.M4 + OIT.M5 + OIT.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 10].Value = "0";
                    }

                    var Sales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), newDistrict), Expression.Eq("Year", year),Expression.Eq(nameof(OITSales.TypeArea),1),Expression.Eq("TypeName", "SALES"));

                    if (Sales != null)
                    {
                        sheet.Range[str, 24].Value = ((Sales.M1 + Sales.M2 + Sales.M3 + Sales.M4 + Sales.M5 + Sales.M6) / 1000).ToString();
                    }
                    else
                    {
                        sheet.Range[str, 24].Value = "0";
                    }

                    if (h == 0)
                    {
                        j = i + 3;
                    }

                    h=1;

                }
                else {

                    int t = str - 1;

                    string currentFormula10 = "=SUM(D"+j+":D"+ t + ")";
                    sheet.Range[str, 4].Formula = currentFormula10;


                    string Formula1 = "=SUM(E" + j + ":E" + t + ")";
                    sheet.Range[str, 5].Formula = Formula1;

                    string Formula2 = "=SUM(F" + j + ":F" + t + ")";
                    sheet.Range[str, 6].Formula = Formula2;

                    string Formula3 = "=SUM(G" + j + ":G" + t + ")";
                    sheet.Range[str, 7].Formula = Formula3;

                    string Formula4 = "=SUM(H" + j + ":H" + t + ")";
                    sheet.Range[str, 8].Formula = Formula4;

                    string Formula5 = "=SUM(I" + j + ":I" + t + ")";
                    sheet.Range[str, 9].Formula = Formula5;

                    string Formula6 = "=SUM(J" + j + ":J" + t + ")";
                    sheet.Range[str, 10].Formula = Formula6;

                    string Formula7 = "=SUM(K" + j + ":K" + t + ")";
                    sheet.Range[str, 11].Formula = Formula7;

                    string Formula8 = "=SUM(L" + j + ":L" + t + ")";
                    sheet.Range[str, 12].Formula = Formula8;

                    string Formula9 = "=SUM(M" + j + ":M" + t + ")";
                    sheet.Range[str, 13].Formula = Formula9;

                    string Formula10 = "=SUM(N" + j + ":N" + t + ")";
                    sheet.Range[str, 14].Formula = Formula10;

                    string Formula11 = "=SUM(O" + j + ":O" + t + ")";
                    sheet.Range[str, 15].Formula = Formula11;

                    string Formula12 = "=SUM(P" + j + ":P" + t + ")";
                    sheet.Range[str, 16].Formula = Formula12;

                    string Formula13= "=SUM(Q" + j + ":Q" + t + ")";
                    sheet.Range[str, 17].Formula = Formula13;

                    string Formula14 = "=SUM(R" + j + ":R" + t + ")";
                    sheet.Range[str, 18].Formula = Formula14;

                    string Formula15 = "=SUM(S" + j + ":S" + t + ")";
                    sheet.Range[str, 19].Formula = Formula15;

                    string Formula16 = "=SUM(T" + j + ":T" + t + ")";
                    sheet.Range[str, 20].Formula = Formula16;

                    string Formula17 = "=SUM(U" + j + ":U" + t + ")";
                    sheet.Range[str, 21].Formula = Formula17;

                    string Formula18 = "=SUM(V" + j + ":V" + t + ")";
                    sheet.Range[str, 22].Formula = Formula18;

                    string Formula19 = "=SUM(W" + j + ":W" + t + ")";
                    sheet.Range[str, 23].Formula = Formula19;

                    string Formula20 = "=SUM(X" + j + ":X" + t + ")";
                    sheet.Range[str, 24].Formula = Formula20;

                    string Formula21 = "=SUM(Y" + j + ":Y" + t + ")";
                    sheet.Range[str, 25].Formula = Formula21;

                    string Formula22 = "=SUM(Z" + j + ":Z" + t + ")";
                    sheet.Range[str, 26].Formula = Formula22;

                    string Formula23 = "=SUM(AA" + j + ":AA" + t + ")";
                    sheet.Range[str, 27].Formula = Formula23;

                    string Formula24 = "=SUM(AB" + j + ":AB" + t + ")";
                    sheet.Range[str, 28].Formula = Formula24;

                    h = 0;

                }
                #endregion

            }
            //保存文件
            wk.SaveToFile(Context.Server.MapPath(path), ExcelVersion.Version2013);

        }

        void ExportPromotion()
        {
            try
            {
                string month = Context.Request["month"].ToStringNoNull("");

                int year = Context.Request["year"].ToInt(0);

                var dt = ExportSqlHelper.queryPromotion(month, year);

                if (dt.Rows.Count <= 0)
                {
                    FailResut("暂无数据");
                    return;
                }
                dt.Columns["Region"].ColumnName = "大区";
                dt.Columns["Area"].ColumnName = "地区";
                dt.Columns["HospitalNameORDealer"].ColumnName = "HospitalNameORDealer";
                dt.Columns["System"].ColumnName = "System";
                dt.Columns["Segment"].ColumnName = "Segment";
                dt.Columns["Promotion"].ColumnName = "计划";
                dt.Columns["sofon"].ColumnName = "sofon";
                dt.Columns["OITMonth"].ColumnName = "时间";
                dt.Columns["Qty"].ColumnName = "数量";
                dt.Columns["Year"].ColumnName = "年份";
                dt.Columns["Month"].ColumnName = "月份";

                string path = "/Upload/Excel/";
                var fullPath = Context.Server.MapPath(path);
                if (!Directory.Exists(fullPath))
                {
                    Directory.CreateDirectory(fullPath);
                }
                string name = "PromotionExcel" + DateTime.Now.ToString("yyyyMMddHHmmssffff") + ".xlsx";
                ExcelHelper excel = new ExcelHelper(fullPath + name);
                excel.DataTableToExcel(dt, "sheet1", true);
                excel.Dispose();

                SuccessResut("导出成功", path + name);
            }
            catch (Exception)
            {
                FailResut("导出失败");
            }
        }
    }
}