using Castle.ActiveRecord;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Web;
using EntityClass;
using NHibernate.Criterion;
using System.Data;
using Common.Object.admin;
using Common.Object.Class;
using Common.Object;
using Com.Utility;

namespace ACETemplate.adnim.handler
{
    /// <summary>
    /// ImportHandler 的摘要说明
    /// </summary>
    public class ImportHandler : Common.Object.Class.BaseLoginAdminHandler, System.Web.SessionState.IReadOnlySessionState
    {

        protected override void Process(HttpContext context)
        {
            switch (base.OperationType)
            {
                
                case "QueryOrderDetail":
                    QueryOrderDetail();
                    break;         
                case "QueryFunnel":
                    QueryFunnel();
                    break;               
                case "QueryFCSTCM":
                    QueryFCSTCM();
                    break;
                case "QueryFCSTN2M":
                    QueryFCSTN2M();
                    break;
                case "AreaMappingActualImport":
                    AreaMappingImport();
                    break;
                case "ProductMappingImport":
                    ProductMappingImport();
                    break;
                case "CustomerMappingImport":
                    CustomerMappingImport();
                    break;
                case "QueryOOHTarget":
                    QueryOOHTarget();
                    break;
                case "RealTimeImport":
                    RealTimeImport();
                    break;
                case "OrderYearMonthImport":
                    OrderYearMonthImport();
                    break;
                case "ImportThreeRateDealer":
                    ImportThreeRateDealer();
                    break;
                case "ImportThreeRateProvince":
                    ImportThreeRateProvince();
                    break;
                case "ImportIB":
                    ImportIB();
                    break;
                case "QueryFCSTAccuracy":
                    QueryFCSTAccuracy();
                    break;
                    //case "OrderDetailImport":
                    //    OrderDetailImport();
                    //    break;
                    //case "FunnelImport":
                    //    FunnelImport();
                    //    break;
                    //case "FCSTCMImport":
                    //    FCSTCMImport();
                    //    break;
                    //case "FCSTN2MImport":
                    //    FCSTN2MImport();
                    //    break;


            }
            base.Process(context);
        }
        void QueryFCSTAccuracy()
        {
            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "Region", "Area", "District", "FCST", "ACT", "Accuracy","Accuracy1", "Accuracy2", "Accuracy3", "Accuracy4", "Accuracy5", "Accuracy6", "Accuracy7", "Accuracy8", "Accuracy9", "Accuracy10", "Accuracy11", "Accuracy12" };

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    int j = 0;
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<FCSTAccuracyExcel> list = CommonFunc<FCSTAccuracyExcel>.ConvertToList(dt);


                            int importID = SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), "FCSTAccuracy", path, "FCSTAccuracy", list.Count);

                            ReportBatch batch = new ReportBatch();
                            batch.Year = Convert.ToInt32(year);
                            batch.Month = Convert.ToInt32(month);
                            batch.ImportID = importID;
                            batch.TableTypeID = 11;
                            batch.Save();



                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region FCSTAccuracy添加

                                for (int i = 0; i < list.Count; i++)
                                {
                                    j = i + 1;
                                    if ((list[i].Region != null && list[i].District != ""))
                                    {
                                        FCSTAccuracy model = new FCSTAccuracy();

                                        model.BatchID = batch.ID;
                                        model.Year = Convert.ToInt32(year);
                                        model.Month = Convert.ToInt32(month);
                                        model.Region = list[i].Region;
                                        model.District = list[i].District;
                                        model.Area = list[i].Area;
                                        model.Accuracy1 =Convert.ToDecimal(list[i].Accuracy1);
                                        model.Accuracy2 = Convert.ToDecimal(list[i].Accuracy2);

                                        model.Accuracy3 = Convert.ToDecimal(list[i].Accuracy3);
                                        model.Accuracy4 = Convert.ToDecimal(list[i].Accuracy4);
                                        model.Accuracy5 = Convert.ToDecimal(list[i].Accuracy5);

                                        model.Accuracy6 = Convert.ToDecimal(list[i].Accuracy6);
                                        model.Accuracy7 = Convert.ToDecimal(list[i].Accuracy7);
                                        model.Accuracy8 = Convert.ToDecimal(list[i].Accuracy8);

                                        model.Accuracy9 = Convert.ToDecimal(list[i].Accuracy9);
                                        model.Accuracy10 = Convert.ToDecimal(list[i].Accuracy10);
                                        model.Accuracy11= Convert.ToDecimal(list[i].Accuracy11);
                                        model.Accuracy12 = Convert.ToDecimal(list[i].Accuracy12);

                                        model.Save();
                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        break;
                                    }
                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        if (j > 0)
                        {
                            FailResut("导入信息失败,第" + j + "条数据错误");
                        }
                        else
                        {
                            FailResut("导入信息失败");
                        }
                        return;
                    }
                    #endregion

                    if (!string.IsNullOrEmpty(re))
                    {
                        scope.Dispose();
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传Execl！");
            }
        }
        private object ConvertToIB(DataTable dt,string region) {

            dynamic a = new System.Dynamic.ExpandoObject();
            List<dynamic> list = new List<dynamic>();
            a.list = list;
            a.region= new List<dynamic>();
           // a.product=new System.Dynamic.ExpandoObject();
            dynamic dy = new System.Dynamic.ExpandoObject();
            for (var i = 1; i < dt.Columns.Count; i++)
            {
                var producttype = dt.Columns[i].ToString().Split(',');
                dynamic b = new System.Dynamic.ExpandoObject();
                b.type = producttype[0];
                b.productname = producttype[1];
                b.filedName = producttype[2];
                if (producttype[2].Trim() == "库存总数")
                {
                    b.FiledType = 0;
                }
                else if (producttype[2].Trim() == "已反馈个数")
                {
                    b.FiledType = 1;

                }
                else if (producttype[2].Trim() == "IBReturn")
                {
                    b.FiledType = 2;
                }
                else
                    throw new Exception("列不完整");

                a.list.Add(b);
                //找出所以的产品
            }
            foreach (DataRow dr in dt.Rows)
            {
                if (dr[0].ToString() == region){
                    dy.region = dr[0].ToString();
                    dy.list = new List<string>();


                    for (var i = 1; i < dt.Columns.Count; i++)
                    {

                        dy.list.Add(dr[i].ToString());
                    }
                    a.region.Add(dy);
                    break;
                }            
            }

            return a;

        }

        void ImportIB()
        {
            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion


                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);


                         List<ThreeRateProvinceExcel> list = CommonFunc<ThreeRateProvinceExcel>.ConvertToList(dt);

                         int importID = SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), "IB", path, "IB", list.Count);

                         ReportBatch batch = new ReportBatch();
                        batch.Year = Convert.ToInt32(year);
                        batch.Month = Convert.ToInt32(month);
                        batch.ImportID = importID;
                        batch.TableTypeID = 9;
                        batch.Save();

                            if (dt != null && dt.Rows.Count > 0)
                            {

                            // string errorMsg = "";
                            #region 添加

                                  for (int i = 0; i < list.Count; i++)
                                {
                                   IBInfo info = new IBInfo();

                                info.BatchID = importID.ToString();
                                info.Year =Convert.ToInt32(year);
                                info.month = Convert.ToInt32(month);
                                info.JSON = ConvertToIB(dt,list[i].Region).toJSON();
                                info.Save();
                            }
                            #endregion
                        }
                    }
                    catch (Exception ex)
                    {
                        FailResut("导入信息失败");
                        scope.VoteRollBack();
                        scope.Dispose();
                        return;
                    }
                    #endregion


                    if (!string.IsNullOrEmpty(re))
                    {
                        scope.Dispose();
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }
                }
            }
            else
            {
                FailResut("请选择上传Execl！");
            }
        }

        void ImportThreeRateProvince()
        {
            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "Region", "Province", "L3WinRate", "L3Coverage", "L3Penetration", "L2WinRate", "L2Coverage", "L2Penetration", "L1Penetration" };

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<ThreeRateProvinceExcel> list = CommonFunc<ThreeRateProvinceExcel>.ConvertToList(dt);


                            int importID = SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), "ThreeRateProvince", path, "ThreeRateProvince", list.Count);

                            ReportBatch batch = new ReportBatch();
                            batch.Year = Convert.ToInt32(year);
                            batch.Month = Convert.ToInt32(month);
                            batch.ImportID = importID;
                            batch.TableTypeID = 7;
                            batch.Save();

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region 添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].Region != null && list[i].Province != ""))
                                    {
                                        ThreeRateProvince threeProvince = new ThreeRateProvince();

                                        threeProvince.BatchID = batch.ID.ToString();
                                        threeProvince.Year = Convert.ToInt32(year);
                                        threeProvince.Month = Convert.ToInt32(month);
                                        threeProvince.Region = list[i].Region;
                                        threeProvince.Province = list[i].Province;
                                        threeProvince.L1Penetration = list[i].L1Penetration;

                                        threeProvince.L2WinRate = list[i].L2WinRate;
                                        threeProvince.L2Coverage = list[i].L2Coverage;
                                        threeProvince.L2Penetration = list[i].L2Penetration;

                                        threeProvince.L3WinRate = list[i].L3WinRate;
                                        threeProvince.L3Coverage = list[i].L3Coverage;
                                        threeProvince.L3Penetration = list[i].L3Penetration;

                                        threeProvince.Save();
                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        break;
                                    }
                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        FailResut("导入信息失败");
                        scope.VoteRollBack();
                        scope.Dispose();
                        return;
                    }
                    #endregion

                    if (!string.IsNullOrEmpty(re))
                    {
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传Execl！");
            }
        }

        void ImportThreeRateDealer()
        {
            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "Region", "District", "District1", "Dealer", "Dealer1", "L3WinRate", "L3Coverage", "L3Penetration", "L2WinRate", "L2Coverage", "L2Penetration", };

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    int j = 0;
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<ThreeRateDealerExcel> list = CommonFunc<ThreeRateDealerExcel>.ConvertToList(dt);


                            int importID = SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), "ThreeRateDealer", path, "ThreeRateDealer", list.Count);

                            ReportBatch batch = new ReportBatch();
                            batch.Year = Convert.ToInt32(year);
                            batch.Month = Convert.ToInt32(month);
                            batch.ImportID = importID;
                            batch.TableTypeID = 6;
                            batch.Save();

                            

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region 添加

                                for (int i = 0; i < list.Count; i++)
                                {
                                    j = i + 1;
                                    if ((list[i].Region != null && list[i].Dealer != ""))
                                    {
                                        ThreeRateDealer threeDealer = new ThreeRateDealer();

                                        threeDealer.BatchID = batch.ID.ToString();
                                        threeDealer.Year = Convert.ToInt32(year);
                                        threeDealer.Month = Convert.ToInt32(month);
                                        threeDealer.Region = list[i].Region;
                                        threeDealer.District =list[i].District;
                                        threeDealer.District1 = list[i].District1;
                                        threeDealer.Dealer = list[i].Dealer;
                                        threeDealer.Dealer1 = list[i].Dealer1;

                                        threeDealer.L2WinRate = list[i].L2WinRate;
                                        threeDealer.L2Coverage = list[i].L2Coverage;
                                        threeDealer.L2Penetration = list[i].L2Penetration;

                                        threeDealer.L3WinRate = list[i].L3WinRate;
                                        threeDealer.L3Coverage = list[i].L3Coverage;
                                        threeDealer.L3Penetration = list[i].L3Penetration;

                                        threeDealer.Save();
                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        break;
                                    }
                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        if (j > 0)
                        {
                            FailResut("导入信息失败,第" + j + "条数据错误");
                        }
                        else
                        {
                            FailResut("导入信息失败");
                        }
                        return;
                    }
                    #endregion



                    if (!string.IsNullOrEmpty(re))
                    {
                        scope.Dispose();
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传Execl！");
            }
        }

        void OrderYearMonthImport()
        {

            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "Comments", "Status", "ORU", "SAP#-WBS", "Order Type", "SOFON No", "客户名称", "科室","应用","产品名称","亚型名称",
                          "QTY","销售","小区", "大区","大区经理", "经销商", "合同买方", "合同号","Contract Amount(USD)-VAT excl", "Application Training Amount(USD)","Extended Warranty Amount(USD)","Extended Warranty Months",
                        "Net Price","Payment Term","OIT Month","OA","OM","Local dealer Commission","Central Commission","现场培训 Application Training","登陆计划","产品&应用课程 Group Training","临床科研课程",
                        "Oversea Training","招标费","检测费","Financial Risk","促销一","促销二","促销三","促销四","促销五","销售第一次提交","销售最后一次提交","OIT Date","OIT Cycle Time",
                       "旧版SAP#-WBS","WBS checking","xx","count in"};


                    #region 导入excel

                    TransactionScope scope = new TransactionScope();
                    int j = 0;
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                       
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName.Trim() != excelTemp[i].Trim())
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<OrderYearMonthExcel> list = CommonFunc<OrderYearMonthExcel>.ConvertToList(dt);

                            int importID = SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), "OrderYearMonth", path, "OrderYearMonth", list.Count);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                               // string errorMsg = "";
                               
                                for (int i = 0; i < list.Count; i++)
                                {
                                     j = i + 1;

                                    #region OrderYearMonth的添加

                                    OrderYearMonthTarget model = new OrderYearMonthTarget();

                                    model.ImportID = importID;
                                    model.Comments = list[i].Comments;
                                    model.Status = list[i].Status;
                                    model.ORU = list[i].ORU;
                                    model.ORU = list[i].ORU;
                                    model.SAPORWBS = list[i].SAPORWBS;
                                    model.OrderType = list[i].OrderType;
                                    model.SOFONNo = list[i].SOFONNo;
                                    model.ClientName = list[i].ClientName;
                                    model.Department = list[i].Department;
                                    model.Application = list[i].Application;
                                    model.ProductName = list[i].ProductName;
                                    model.SubtypeName = list[i].SubtypeName;

                                    model.QTY =Convert.ToInt32(list[i].QTY);
                                    model.SalesName = list[i].SalesName;
                                    model.SmallArea = list[i].SmallArea;
                                    model.Region = list[i].Region;
                                    model.RegionalManager = list[i].RegionalManager;
                                    model.DealerName = list[i].DealerName;

                                    model.ContractBuyerName = list[i].ContractBuyerName;
                                    model.ContractNo = list[i].ContractNo;

                                    if (!string.IsNullOrEmpty(list[i].ContractAmountUSD))
                                    {
                                        model.ContractAmountUSD =Convert.ToDecimal(list[i].ContractAmountUSD);
                                    }
                                    else {
                                        model.ContractAmountUSD = 0;
                                    }

                                    if (!string.IsNullOrEmpty(list[i].ApplicationTrainingAmount))
                                    {
                                        model.ApplicationTrainingAmount = Convert.ToDecimal(list[i].ApplicationTrainingAmount);
                                    }
                                    else {
                                        model.ApplicationTrainingAmount = 0;
                                    }

                                    if (!string.IsNullOrEmpty(list[i].ExtendedWarrantyAmount))
                                    {
                                        model.ExtendedWarrantyAmount =Convert.ToDecimal(list[i].ExtendedWarrantyAmount);
                                    }
                                    else
                                    {
                                        model.ExtendedWarrantyAmount = 0;
                                    }

                                    if (!string.IsNullOrEmpty(list[i].ExtendedWarrantyMonths))
                                    {
                                        model.ExtendedWarrantyMonths = Convert.ToInt32(list[i].ExtendedWarrantyMonths);
                                    }
                                    else
                                    {
                                        model.ExtendedWarrantyMonths = 0;
                                    }
                                  
                                    model.NetPriceUSD = Convert.ToDecimal(list[i].NetPriceUSD);

                                    model.PaymentTerm = list[i].PaymentTerm;
                                    model.OITMonth = list[i].OITMonth;
                                    model.OA = list[i].OA;
                                    model.OM = list[i].OM;
                                    model.LocalDealerCommission = list[i].LocalDealerCommission;
                                    model.CentralCommission = list[i].CentralCommission;
                                    model.ApplicationTraining = list[i].ApplicationTraining;

                                    if (!string.IsNullOrEmpty(list[i].LandingPlan))
                                    {
                                        model.LandingPlan = Convert.ToDecimal(list[i].LandingPlan);
                                    }
                                    else {
                                        model.LandingPlan = 0;
                                    }


                                    if (!string.IsNullOrEmpty(list[i].GroupTraining))
                                    {
                                        model.GroupTraining = Convert.ToDecimal(list[i].GroupTraining);
                                    }
                                    else {
                                        model.GroupTraining = 0;
                                    }

                                    if (!string.IsNullOrEmpty(list[i].ClinicalCourses))
                                    {
                                        model.ClinicalCourses = Convert.ToDecimal(list[i].ClinicalCourses);
                                    }
                                    else {
                                        model.ClinicalCourses = 0;
                                    }
                                       
                                  

                                    model.OverseaTraining = list[i].OverseaTraining;

                                    if (!string.IsNullOrEmpty(list[i].TenderFee))
                                    {
                                        model.TenderFee = Convert.ToDecimal(list[i].TenderFee);
                                    }
                                    else
                                    {
                                        model.TenderFee = 0;
                                    }
                                    if (!string.IsNullOrEmpty(list[i].DetectionFee))
                                    {
                                        model.DetectionFee = Convert.ToDecimal(list[i].DetectionFee);
                                    }
                                    else
                                    {
                                        model.DetectionFee = 0;
                                    }


                                    model.FinancialRisk = list[i].FinancialRisk;
                                    model.Promote1 = list[i].Promote1;
                                    model.Promote2 = list[i].Promote2;

                                    model.Promote3 = list[i].Promote3;
                                    model.Promote4 = list[i].Promote4;
                                    model.Promote5 = list[i].Promote5;
                                    model.SalesFirstDate = list[i].SalesFirstDate;
                                    model.SalesFinallyDate = list[i].SalesFinallyDate;
                                    model.OITDate = list[i].OITDate;
                                    model.OITCycleTime = list[i].OITCycleTime;
                                  
                                    model.OldSAPORWBS = list[i].OldSAPORWBS;
                                    
                                    model.WBSChecking = list[i].CentralCommission;
                                    model.xx = list[i].xx;
                                    model.CountIn = list[i].CountIn;
                                    model.Year =Convert.ToInt32(year);
                                    model.Month = Convert.ToInt32(month);
                                                          
                                    model.Save();

                                    #endregion    

                                }

                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        if (j > 0)
                        {
                            FailResut("导入信息失败,第" + j + "条数据错误");
                        }
                        else
                        {
                            FailResut("导入信息失败");
                        }
                        return;
                    }
                    #endregion



                    if (!string.IsNullOrEmpty(re))
                    {
                        scope.Dispose();
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传Execl！");
            }
        }

        void RealTimeImport()
        {
            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "Status", "系统参考号", "ORU（币种）", "SONumber", "SAP#/WBS#", "GIDate", "SN#", "订单类型","SOFON号","SOFON标签","最终用户名称",
                          "飞利浦类型","省份","城市", "CustomerSysID","商机号", "商机号（手动）", "临床细分", "产品名称","亚型名称", "一级科室分类","二级科室分类","数量",
                        "要求到货日期（RDD）","预计安装日期（SID）","销售","小区","大区","大区经理","经销商名称","合同买方名称","进口协议编号","采购订单编号","合同金额",
                        "其中延保金额","延保年限","合同净价","系统金额 (USD)","其中延保金额 (USD)","延保年限USD","系统净利润","特价参考号","特价金额","支付方式","OITMonth","OA","GBS",
                       "现场培训","现场培训份数（必选）","现场培训份数（可选）","产品&应用课程","产品&应用课程份数（必选）","产品&应用课程份数（可选）","临床科研培训费","临床科研培训费份数",
                    "招标费","检测费","佣金费","Central Commission","促销方案一","促销方案二","促销方案三","促销方案四","促销方案五","销售第一次提交日期","销售最后一次提交日期",
                    "配置确认日期","OIT日期","OITCycleTime","是否包含solution","QLAB选件名称","第三方产品名称","CTP","CTP百分比","经销商协议号","合同号","销售SapCode","最终用户SapCode",
                        "合同买方SapCode","经销商SapCode","备注信息","阶梯价","是否民营医院","是否HTAUS",};


                    #region 导入excel

                    int j = 0;
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName.Trim() != excelTemp[i].Trim())
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<RealTimeExcel> list = CommonFunc<RealTimeExcel>.ConvertToList(dt);

                            int importID = SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), "RealTime", path, "RealTime", list.Count);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                //string errorMsg = "";
                                #region RealTime的添加

                                for (int i = 0; i < list.Count; i++)
                                {
                                    j = i + 1;
                                    RealTimeTarget model = new RealTimeTarget();

                                   
                                    model.Status = list[i].Status;                                   
                                    model.SystemReferenceNumber = list[i].SystemReferenceNumber;
                                    model.ORU = list[i].ORU;
                                    model.SONumber = list[i].SONumber;
                                    model.SAPORWBS = list[i].SAPORWBS;
                                    model.GIDate = list[i].GIDate;
                                    model.SN = list[i].SN;
                                    model.OrderType = list[i].OrderType;
                                    model.SOFON = list[i].SOFON;
                                    model.SalesName = list[i].SalesName;
                                    model.SOFONTag = list[i].SOFONTag;

                                    model.LastUserName = list[i].LastUserName;
                                    model.PhilipsType = list[i].PhilipsType;
                                    model.Province = list[i].Province;
                                    model.City = list[i].City;
                                    model.CustomerSysID = list[i].CustomerSysID;
                                    model.BusinessID = list[i].BusinessID;

                                    model.HandBusinessID = list[i].HandBusinessID;
                                    model.ClinicSubdivide = list[i].ClinicSubdivide;
                                    model.ProductName = list[i].ProductName;
                                    model.SubtypeofName = list[i].SubtypeofName;
                                    model.FirstDepartmentClassify = list[i].FirstDepartmentClassify;
                                    model.SecondDepartmentClassify = list[i].SecondDepartmentClassify;
                                    model.Quantity = Convert.ToInt32(list[i].Quantity);

                                    model.RequestArrivalDate = list[i].RequestArrivalDate;
                                    model.ExpectedInstallDate = list[i].Region;
                                    model.SalesName = list[i].SalesName;
                                    model.SmallArea = list[i].SmallArea;
                                    model.Region = list[i].Region;
                                    model.RegionalManager = list[i].RegionalManager;
                                    model.DealerName = list[i].DealerName;
                                    model.ContractBuyerName = list[i].ContractBuyerName;
                                    model.ImportAgreementNo = list[i].ImportAgreementNo;
                                    model.PurchaseOrderNo = list[i].PurchaseOrderNo;
                                    if (!string.IsNullOrEmpty(list[i].ContractMoney))
                                    {
                                        model.ContractMoney = Convert.ToDecimal(list[i].ContractMoney);
                                    }
                                    else {
                                        model.ContractMoney = 0;
                                    }
                                    if (!string.IsNullOrEmpty(list[i].WarrantyMoney))
                                    {
                                        model.WarrantyMoney = Convert.ToDecimal(list[i].WarrantyMoney);
                                    }
                                    else {
                                        model.WarrantyMoney = 0;
                                    }

                                    if (!string.IsNullOrEmpty(list[i].WarrantyYear))
                                    {
                                        model.WarrantyYear =Convert.ToInt32(list[i].WarrantyYear);
                                    }

                                    if (!string.IsNullOrEmpty(list[i].ContractNetPrice))
                                    {
                                        model.ContractNetPrice = Convert.ToDecimal(list[i].ContractNetPrice);
                                    }
                                    else {
                                        model.ContractNetPrice = 0;
                                    }

                                    if (!string.IsNullOrEmpty(list[i].SystemMoneyUSD))
                                    {
                                        model.SystemMoneyUSD = Convert.ToDecimal(list[i].SystemMoneyUSD);
                                    }
                                    else {
                                        model.SystemMoneyUSD = 0;
                                    }

                                    if (!string.IsNullOrEmpty(list[i].WarrantyPriceUSD))
                                    {
                                        model.WarrantyPriceUSD =Convert.ToDecimal(list[i].WarrantyPriceUSD);
                                    }
                                    else {
                                        model.WarrantyPriceUSD = 0;
                                    }
                                    if (!string.IsNullOrEmpty(list[i].WarrantyAgeLimit))
                                    {
                                        model.WarrantyAgeLimit =Convert.ToInt32(list[i].WarrantyAgeLimit);
                                    }

                                    if (!string.IsNullOrEmpty(list[i].SystemRetainedProfits))
                                    {
                                        model.SystemRetainedProfits =Convert.ToDecimal(list[i].SystemRetainedProfits);
                                    }
                                    else {
                                        model.SystemRetainedProfits = 0;
                                    }
                                      

                                    model.SpecialOfferConsult = list[i].SpecialOfferConsult;

                                    if (!string.IsNullOrEmpty(list[i].SpecialOfferMoney))
                                    {
                                        model.SpecialOfferMoney =Convert.ToDecimal(list[i].SpecialOfferMoney);
                                    }else
                                    {
                                        model.SpecialOfferMoney = 0;
                                    }
                                

                                    model.PayType = list[i].PayType;
                                    model.OITMonth = list[i].OITMonth;
                                    model.OA = list[i].OA;

                                    model.GBS = list[i].GBS;
                                    model.SceneTraining = list[i].SceneTraining;
                                    model.TrainingRequired = list[i].TrainingRequired;
                                    model.TrainingChoosable = list[i].TrainingChoosable;
                                    model.ProductApplication = list[i].ProductApplication;
                                    model.ApplicationRequired = list[i].ApplicationRequired;
                                    model.ApplicationChoosable = list[i].ApplicationChoosable;
                                    if (!string.IsNullOrEmpty(list[i].ClinicalTrainingPrice))
                                    {
                                        model.ClinicalTrainingPrice =Convert.ToDecimal(list[i].ClinicalTrainingPrice);
                                    }
                                    else {
                                        model.ClinicalTrainingPrice = 0;
                                    }
                                   
                                    model.ClinicalCopies = list[i].ClinicalCopies;
                                    if (!string.IsNullOrEmpty(list[i].TenderFee))
                                    {
                                        model.TenderFee = Convert.ToDecimal(list[i].TenderFee);
                                    }
                                    else {
                                        model.TenderFee = 0;
                                    }

                                    if (!string.IsNullOrEmpty(list[i].DetectionFee))
                                    {
                                        model.DetectionFee = Convert.ToDecimal(list[i].DetectionFee);
                                    }
                                    else {
                                        model.DetectionFee = 0;
                                    }

                                    if (!string.IsNullOrEmpty(list[i].DetectionFee))
                                    {
                                        model.LocalDealerCommission = Convert.ToDecimal(list[i].LocalDealerCommission);
                                    }
                                    else {
                                        model.LocalDealerCommission = 0;
                                    }
                                    
                                    model.CentralCommission = list[i].CentralCommission;
                                    model.PromotionPlanFirst = list[i].PromotionPlanFirst;
                                    model.PromotionPlanSecond = list[i].PromotionPlanSecond;
                                    model.PromotionPlanThird = list[i].PromotionPlanThird;

                                    model.PromotionPlanFourth = list[i].PromotionPlanFourth;
                                    model.PromotionPlanFifth = list[i].PromotionPlanFifth;
                                    model.SalesFirstDate = list[i].SalesFirstDate;
                                    model.SalesFinallyDate =list[i].SalesFinallyDate;
                                    model.ConfigurationDate = list[i].ConfigurationDate;
                                    model.OITDate = list[i].OITDate;

                                    model.OITCycleTime = list[i].OITCycleTime;
                                    model.WhetherSolution = list[i].WhetherSolution;
                                    model.QLABName = list[i].QLABName;
                                    model.ThirdProductName = list[i].ThirdProductName;
                                    model.CTP = list[i].CTP;
                                    model.CTPPercent = list[i].CTPPercent;
                                    model.DistributorNo = list[i].DistributorNo;

                                    model.PactNo = list[i].PactNo;
                                    model.SalesSapCode = list[i].SalesSapCode;
                                    model.LastUserSapCode = list[i].LastUserSapCode;
                                    model.PactBuyerSapCode = list[i].PactBuyerSapCode;
                                    model.DistributorSapCode = list[i].DistributorSapCode;
                                    model.Remark = list[i].Remark;
                                    model.TieredPricing = list[i].TieredPricing;
                                    model.WhetherPrivate = list[i].WhetherPrivate;
                                    model.IsHTAUS = list[i].IsHTAUS;      
                                   model.Year = Convert.ToInt32(year);
                                    model.Month = Convert.ToInt32(month);
                                    model.Save();

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }
                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        if (j > 0)
                        {
                            FailResut("导入信息失败,第" + j + "条数据错误");
                        }
                        else {
                            FailResut("导入信息失败");
                        }

                        Log l = new Log("RealTimeImport");
                        l.Write("Message:"+ex.Message);
                    
                        return;
                    }
                    #endregion

          
                    if (!string.IsNullOrEmpty(re))
                    {
                        scope.Dispose();
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传Execl！");
            }
        }
        void QueryOrderDetail()
        {
            string  month =Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
          

                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "OITSales", "Year", "Qtr", "Month", "Country", "NewArea", "NewRegion", "NewDistrict","WBS","SO","SalesName",
                          "MAGCode","MAGName","RTDescription", "HospitalName","ActKUSD", "Qty", "Channel", "DealerManual","Dealer", "Clinical",
                        "DealerClinicalFlag","Department","HospCategory","HospFlag","CustomerID","CustomerDICName","OpportunityID","Region","District","SAPArea",
                        "SAPSalesName","SAPShiptoParty","SAPSoldtoParty","Segent","USOITDate","AdjustmentRemark","HospitalType","HWORSW","Solution","HTA","province","stock" };

                    #region 导入excel


                    TransactionScope scope = new TransactionScope();

                    int j = 0;
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName.Trim() != excelTemp[i].Trim())
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                           
                            List<OrderDetailExcel> list = CommonFunc<OrderDetailExcel>.ConvertToList(dt);

                            int ImportID=SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), "OrderDetail", path, "OrderDetail",list.Count);

                            if (dt != null && dt.Rows.Count > 0)
                            {
                                #region OrderDetailTarget的添加
                                string errorMsg = "";
                                for (int i = 0; i < list.Count; i++)
                                {
                                    j = i + 1;

                                    var monthInfo=MonthMapping.FindFirst(Expression.Eq(nameof(MonthMapping.MonthEnglish), list[i].Month));

                                    if (monthInfo != null)
                                    {
                                        if (list[i].Year == year && monthInfo.MonthNum.ToString()== month)
                                        {

                                            OrderDetailTarget trget = new OrderDetailTarget();
                                            trget.OITSales = list[i].OITSales;
                                            trget.ImportID = ImportID;
                                            if (!string.IsNullOrEmpty(list[i].Year))
                                            {
                                                trget.Year = Convert.ToInt32(list[i].Year);
                                            }
                                            else
                                            {
                                                trget.Year = 0;
                                            }
                                            trget.Qtr = list[i].Qtr;
                                            trget.Month = list[i].Month;
                                            trget.Country = list[i].Country;
                                            trget.NewArea = list[i].NewArea;
                                            trget.NewRegion = list[i].NewRegion;
                                            trget.NewDistrict = list[i].NewDistrict;

                                            trget.WBS = list[i].WBS;
                                            trget.SO = list[i].SO;
                                            trget.SalesName = list[i].SalesName;
                                            trget.MAGCode = list[i].MAGCode;
                                            trget.MAGName = list[i].MAGName;
                                            trget.RTDescription = list[i].RTDescription;

                                            trget.HospitalName = list[i].HospitalName;
                                            if (!string.IsNullOrEmpty(list[i].ActKUSD))
                                            {
                                                trget.ActKUSD = Convert.ToDecimal(list[i].ActKUSD);
                                            }
                                            else
                                            {
                                                trget.ActKUSD = 0;
                                            }
                                            if (!string.IsNullOrEmpty(list[i].Qty))
                                            {
                                                trget.Qty = Convert.ToInt32(list[i].Qty);
                                            }
                                            else
                                            {
                                                trget.Qty = 0;
                                            }

                                            trget.Channel = list[i].Channel;

                                            trget.DealerManual = list[i].DealerManual;
                                            trget.Dealer = list[i].Dealer;
                                            trget.Clinical = list[i].Clinical;
                                            trget.DealerClinicalFlag = list[i].DealerClinicalFlag;
                                            trget.Department = list[i].Department;
                                            trget.HospCategory = list[i].HospCategory;
                                            trget.HospFlag = list[i].HospFlag;
                                            trget.CustomerID = list[i].CustomerID;
                                            trget.CustomerDICName = list[i].CustomerDICName;

                                            trget.OpportunityID = list[i].OpportunityID;
                                            trget.Region = list[i].Region;
                                            trget.District = list[i].District;
                                            trget.SAPArea = list[i].SAPArea;
                                            trget.SAPSalesName = list[i].SAPSalesName;
                                            trget.SAPShiptoParty = list[i].SAPShiptoParty;
                                            trget.SAPSoldtoParty = list[i].SAPSoldtoParty;
                                            trget.Segent = list[i].Segent;
                                            trget.USOITDate = list[i].USOITDate;
                                            trget.AdjustmentRemark = list[i].AdjustmentRemark;
                                            trget.HospitalType = list[i].HospitalType;
                                            trget.HWORSW = list[i].HWORSW;

                                            trget.Solution = list[i].Solution;
                                            trget.HTA = list[i].HTA;
                                            trget.Province = list[i].province;
                                            trget.Stock = list[i].stock;
                                            trget.IsDelete = false;
                                            trget.Save();

                                        }
                                        else
                                        {
                                            errorMsg += "第" + (i + 1) + "条导入失败，原因是导入年份或月份不一致\r\n";
                                            re = errorMsg;
                                            scope.VoteRollBack();
                                            scope.Dispose();
                                            break;
                                        }
                                    }
                                    else {
                                        errorMsg += "第" + (i + 1) + "条导入失败，原因是月份不存在\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        break;
                                    }

                                   

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入OrderDetail信息失败,第"+j+"条数据错误");
                        return;
                    }
                    #endregion

                    if (!string.IsNullOrEmpty(re))
                    {
                        FailResut(re);
                    }
                    else
                    {

                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }
                }
            }
            else
            {
                FailResut("请选择上传Execl！");
            }
        

        }

        void QueryFunnel()
        {
            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "数量", "商机ID", "商机名称", "客户名", "客户 ID", "可能性 (%)", "进度", "省份", "总价（已转换）币种", "总价（已转换）",
                        "产品名称", "商机圈经销商名称", "商机所有人", "所有人角色","临床应用描述","Region","Area","预计进单(商机完成)日期",
                        "区域-MAPPING","产品-MAPPING","临床应用描述-MAPPING","ASP","net","FCST" };

                    #region 导入excel

                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<FunnelExcel> list = CommonFunc<FunnelExcel>.ConvertToList(dt);


                            int importID=SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), "Funnel", path, "Funnel", list.Count);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region StudyPlanMapping的添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                   if ((list[i].AccountName != null && list[i].BusinessDealerName != ""))
                                 
                                    {
                                        FunnelTarget funnel = new FunnelTarget();

                                        funnel.Quantity = Convert.ToInt32(list[i].Quantity);
                                        funnel.ImportID = importID;

                                        funnel.OpportunityID = list[i].OpportunityID;
                                        funnel.OpportunityName = list[i].OpportunityName;
                                        funnel.AccountID = list[i].AccountID;
                                        funnel.AccountName = list[i].AccountName;
                                        funnel.Possibility = list[i].Possibility;
                                        funnel.Progress = list[i].Progress;
                                        funnel.Province = list[i].Province;
                                        funnel.Currency = list[i].Currency;
                                        funnel.TotalPrices = Convert.ToDecimal(list[i].TotalPrices);
                                        funnel.ProductName = list[i].ProductName;
                                        funnel.BusinessDealerName = list[i].BusinessDealerName;
                                        funnel.BusinessOwner = list[i].BusinessOwner;
                                        funnel.OwnerRole = list[i].OwnerRole;
                                        funnel.ClinicalDesc = list[i].ClinicalDesc;
                                        funnel.Region = list[i].Region;
                                        funnel.Area = list[i].Area;
                                        funnel.ExpectedOrderDate = list[i].ExpectedOrderDate;
                                        funnel.AreaMAPPING = list[i].AreaMAPPING;
                                        funnel.ClinicalMAPPING = list[i].ClinicalMAPPING;
                                        funnel.ProductMAPPING = list[i].ProductMAPPING;
                                        
                                        funnel.ASP = Convert.ToDecimal(list[i].ASP);
                                        funnel.Net = Convert.ToDecimal(list[i].net);
                                        funnel.Year =Convert.ToInt32(year);
                                        funnel.Month =Convert.ToInt32(month);



                                        if (!string.IsNullOrEmpty(list[i].FCST))
                                        {
                                            if (list[i].FCST.ToString().ToLower() == "y")
                                            {
                                                funnel.FCST = true;
                                            }
                                        }
                                        else {
                                            funnel.FCST = false;
                                        }
                                       
                                        funnel.IsDelete = false;
                                        funnel.Save();
                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        break ;
                                    }
                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            scope.VoteRollBack();
                            scope.Dispose();
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入信息失败");
                        return;
                    }
                    #endregion

                    if (!string.IsNullOrEmpty(re))
                    {
                        scope.Dispose();
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传FunnelExecl！");
            }
        }
        void QueryFCSTCM()
        {
            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "Region", "Province", "Owner Role", "Opportunity ID", "Opportunity Name", "Account ID", "Account Name", "Product Name", "Expected Order Date", "Quantity",
                        "Funnel KUSD", "区域-MAPPING","产品-MAPPING","临床应用描述-MAPPING"};

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<FCSTCMExcel> list = CommonFunc<FCSTCMExcel>.ConvertToList(dt);

                            int importID = SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), " FCSTCM", path, " FCSTCM", list.Count);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                               #region FCSTCMTarget的添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].Region != null && list[i].Province != ""))
                                    {
                                        FCSTCMTarget fcstcm = new FCSTCMTarget();

                                        fcstcm.Quantity = Convert.ToInt32(list[i].Quantity);
                                        fcstcm.ImportID = importID;

                                        fcstcm.Region = list[i].Region;
                                        fcstcm.Province = list[i].Province;
                                        fcstcm.OwnerRole = list[i].OwnerRole;
                                        fcstcm.OpportunityID = list[i].OpportunityID;
                                        fcstcm.OpportunityName = list[i].OpportunityName;
                                        fcstcm.AccountID = list[i].AccountID;
                                        fcstcm.AccountName = list[i].AccountName;
                                        fcstcm.ProductName = list[i].ProductName;
                                        fcstcm.ExpectedOrderDate = list[i].ExpectedOrderDate;
                                        fcstcm.FunnelKUSD = Convert.ToDecimal(list[i].FunnelKUSD);
                                        fcstcm.AreaMAPPING = list[i].AreaMAPPING;
                                        fcstcm.ProductMAPPING = list[i].ProductMAPPING;
                                        fcstcm.ClinicalMAPPING = list[i].ClinicalMAPPING;
                                        fcstcm.Year = Convert.ToInt32(year);
                                        fcstcm.Month =Convert.ToInt32(month);
                           
                                        fcstcm.Save();

                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                       scope.VoteRollBack();
                                       scope.Dispose();
                                        break;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                       scope.Dispose();
                        FailResut("导入员工信息失败");
                        return;
                    }
                    #endregion


                    if (!string.IsNullOrEmpty(re))
                    {
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }
                }
            }
            else
            {
                FailResut("请选择上传FunnelExecl！");
            }
        }

        void QueryFCSTN2M()
        {
            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
        
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "数量", "商机 ID", "商机名称", "客户名", "客户 ID", "可能性 (%)", "进度", "省份", "总价（已转换）币种", "总价（已转换）",
                        "产品名称", "商机圈经销商名称", "商机所有人", "所有人角色","临床应用描述","Region","Area","预计进单(商机完成)日期","区域-MAPPING","产品-MAPPING","临床应用描述-MAPPING" };

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<FCSTN2MExcel> list = CommonFunc<FCSTN2MExcel>.ConvertToList(dt);

                            int importID = SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), " FCSTN2M", path, " FCSTN2M", list.Count);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region StudyPlanMapping的添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].AccountID != null && list[i].OpportunityID != "" && list[i].AccountName != ""))
                                    {

                                        FCSTN2MTarget model = new FCSTN2MTarget();

                                        model.ImportID = importID;

                                        model.Quantity = Convert.ToInt32(list[i].Quantity);
                                        model.OpportunityID = list[i].OpportunityID;
                                        model.OpportunityName = list[i].OpportunityName;
                                        model.AccountID = list[i].AccountID;
                                        model.AccountName = list[i].AccountName;
                                        model.Possibility = list[i].Possibility;
                                        model.Progress = list[i].Progress;
                                        model.Currency = list[i].Currency;
                                        model.TotalPrices = Convert.ToDecimal(list[i].TotalPrices);
                                        model.ProductName = list[i].ProductName;
                                        model.BusinessDealerName = list[i].BusinessDealerName;
                                        model.BusinessOwner = list[i].BusinessOwner;
                                        model.ClinicalDesc = list[i].ClinicalDesc;
                                        model.Region = list[i].Region;
                                        model.Province = list[i].Province;
                                        model.Area = list[i].Area;
                                        model.OwnerRole = list[i].OwnerRole;

                                        model.ExpectedOrderDate = list[i].ExpectedOrderDate;
                                        model.AreaMAPPING = list[i].AreaMAPPING;
                                        model.ProductMAPPING = list[i].ProductMAPPING;
                                        model.ClinicalMAPPING = list[i].ClinicalMAPPING;
                                        model.Year = Convert.ToInt32(year);
                                        model.Month = Convert.ToInt32(month);

                                        model.Save();

                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        break;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入FCSTN2M失败");
                        return;
                    }
                    #endregion
                    if (!string.IsNullOrEmpty(re))
                    {
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }
                }
              
            }
            else
            {
                FailResut("请选择上传FCSTN2M！");
            }
        }

       void QueryOOHTarget()
        {

            string month = Context.Request["month"];

            string year = Context.Request["year"];

            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "Segment","Region","SOff.", "Province.mapping", "Sales Representative Name","WBS Element","Ship-To Name","Dealer","Owner Name(Dealer)",
                        "Buyer","Sales Order","Item","Material", "Description","Qty","KUSD", "Inventory Aging", "Inv aging bucket","Deliery Status-PMG","Deliery Status","DS-F&A","物流情况",
                        "Status update ( formula)", "区域-MAPPING","产品-MAPPING",">90","COUNTOFF"};

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<OOHExcel> list = CommonFunc<OOHExcel>.ConvertToList(dt);

                            int importID = SaveImportFile(Convert.ToInt32(year), Convert.ToInt32(month), " OOH", path, " OOH", list.Count);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region OOH的添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].Segment != null && list[i].Region != ""))
                                    {
                                        OOHTarget oohTarget = new OOHTarget();

                                        oohTarget.ImportID = importID;
                                        oohTarget.Segment = list[i].Segment;
                                        oohTarget.Region = list[i].Region;
                                        oohTarget.SOff = list[i].SOff;
                                        oohTarget.ProvinceMapping = list[i].ProvinceMapping;
                                        oohTarget.SalesRepresentativeName = list[i].SalesRepresentativeName;
                                        oohTarget.WBSElement = list[i].WBSElement;
                                        oohTarget.ShipToName = list[i].ShipToName;
                                        oohTarget.Dealer = list[i].Dealer;
                                        oohTarget.OwnerName = list[i].OwnerName;
                                        oohTarget.Buyer = list[i].Buyer;

                                        oohTarget.SalesOrder = list[i].SalesOrder;
                                        oohTarget.Item = list[i].Item;
                                        oohTarget.Material = list[i].Material;
                                        oohTarget.Description = list[i].Description;
                                        if (!string.IsNullOrEmpty(list[i].Qty))
                                        {
                                            oohTarget.Qty =Convert.ToInt32(list[i].Qty);
                                        }
                                       
                                        oohTarget.KUSD =Convert.ToDecimal(list[i].KUSD);
                                        if (!string.IsNullOrEmpty(list[i].InventoryAging))
                                        {
                                            oohTarget.InventoryAging = Convert.ToInt32(list[i].InventoryAging);
                                        }
                                      
                                        oohTarget.Invagingbucket = list[i].Invagingbucket;
                                        oohTarget.DelieryStatusPMG = list[i].DelieryStatusPMG;
                                        oohTarget.DelieryStatus = list[i].DelieryStatus;

                                        oohTarget.DSFA = list[i].DSFA;
                                        oohTarget.LogisticsSituation = list[i].LogisticsSituation;
                                        oohTarget.StatusUpdate = list[i].StatusUpdate;
                                        oohTarget.AreaMAPPING = list[i].AreaMAPPING;
                                        oohTarget.ProductMAPPING = list[i].ProductMAPPING;

                                        if (!string.IsNullOrEmpty(list[i].IsNinety))
                                        {
                                            if (list[i].IsNinety.ToLower() == "y")
                                            {
                                                oohTarget.IsNinety = true;
                                            }
                                            else {
                                                oohTarget.IsNinety = false;
                                            }
                                            
                                        }
                                        else {
                                            oohTarget.IsNinety = false;
                                        }

                                        if (!string.IsNullOrEmpty(list[i].COUNTOFF))
                                        {
                                            oohTarget.COUNTOFF = Convert.ToBoolean(list[i].COUNTOFF);
                                        }
                                        else {
                                            oohTarget.COUNTOFF = false;
                                        }
                                        oohTarget.Year = Convert.ToInt32(year);
                                        oohTarget.Month = Convert.ToInt32(month);

                                        oohTarget.Save();

                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                       scope.VoteRollBack();
                                       scope.Dispose();
                                        break;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                       scope.Dispose();
                        FailResut("导入信息失败");
                        return;
                    }
                    #endregion


                   

                    if (!string.IsNullOrEmpty(re))
                    {
                        scope.Dispose();
                        FailResut(re);
                    }
                    else
                    {
                        scope.VoteCommit();
                        scope.Dispose();
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传OOHExecl！");
            }
        }

        void AreaMappingImport()
        {
            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "城市拼音", "所属地区缩写", "城市缩写", "所属地区", "城市", "地区", "系统分类" };

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<AreaExcel> list = CommonFunc<AreaExcel>.ConvertToList(dt);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region StudyPlanMapping的添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].Name != null && list[i].Area != "" && list[i].CoverAreaName != ""))
                                    {

                                        AreaMappingTarget areamapping = new AreaMappingTarget();

                                        areamapping.Name = list[i].Name;
                                        areamapping.Spell = list[i].Spell;
                                        areamapping.Abbreviation = list[i].Abbreviation;
                                        areamapping.Area = list[i].Area;
                                        areamapping.CoverAreaName = list[i].CoverAreaName;
                                        areamapping.CoverAreaAbbr = list[i].CoverAreaAbbr;
                                        areamapping.SystemClassify = list[i].SystemClassify;

                                        areamapping.Save();
                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        continue;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入城市失败");
                    }
                    #endregion


                    if (!string.IsNullOrEmpty(re))
                    {
                        SuccessResut(re);
                    }
                    else
                    {
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传城市Execl！");
            }
        }

        void ProductMappingImport()
        {
            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "产品名称", "产品简称" };

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<ProductExcel> list = CommonFunc<ProductExcel>.ConvertToList(dt);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region StudyPlanMapping的添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].ProductName != null && list[i].ProductNameAbbr != "" ))
                                    {

                                        ProductMappingTarget productModel = new ProductMappingTarget();
                                        productModel.ProductName = list[i].ProductName;
                                        productModel.ProductNameAbbr = list[i].ProductNameAbbr;
                                        productModel.IsDelete = false;

                                        productModel.Save();
                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        continue;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入产品信息失败");
                    }
                    #endregion

                    if (!string.IsNullOrEmpty(re))
                    {
                        SuccessResut(re);
                    }
                    else
                    {
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传产品Execl！");
            }
        }

        void CustomerMappingImport()
        {
            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {
                    var re = "";
             
                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "CustomerSysID-客户字典", "CustomerID-CRM" };

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<CustomerExcel> list = CommonFunc<CustomerExcel>.ConvertToList(dt);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region StudyPlanMapping的添加


                               
                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].CustomerSysID != null && list[i].CustomerIDCRM != ""))
                                    {
                                        CustomerMappingTarget customerModel = new CustomerMappingTarget();
                                        customerModel.CustomerSysID = list[i].CustomerSysID;
                                        customerModel.CustomerIDCRM = list[i].CustomerIDCRM;
                                        customerModel.IsDelete = false;

                                        customerModel.Save();
                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        continue;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入客户字典失败");
                    }
                    #endregion


                    if (!string.IsNullOrEmpty(re))
                    {
                        SuccessResut(re);
                    }
                    else
                    {
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传客户字典Execl！");
            }
        }

        public int SaveImportFile(int year, int month, string fileName, string fileUrl, string TableType, int total)
        {
            ImportFile file = new ImportFile();

            file.Year = year;
            file.Month = month;
            file.FileName = fileName;
            file.FileURL = fileUrl;
            file.TableType = TableType;
            file.Total = total;

            file.Save();

            return file.ID;

        }



        void FCSTCMImport()
        {
            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "Region", "Province", "OwnerRole", "Opportunity ID", "Opportunity Name", "Account ID", "Account Name", "Product Name", "Expected Order Date", "Quantity",
                        "Funnel KUSD"};

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<FCSTCMExcel> list = CommonFunc<FCSTCMExcel>.ConvertToList(dt);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region 添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].Region != null && list[i].Province != ""))
                                    {



                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        break;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入员工信息失败");
                        return;
                    }
                    #endregion


                    if (!string.IsNullOrEmpty(re))
                    {
                        SuccessResut(re);
                    }
                    else
                    {
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传FunnelExecl！");
            }
        }

        void FCSTN2MImport()
        {
            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "数量", "商机 ID", "商机名称", "客户名", "客户 ID", "可能性 (%)", "进度", "省份", "总价（已转换）币种", "总价（已转换）",
                        "产品名称", "商机圈经销商名称", "商机所有人", "所有人角色","临床应用描述","Region","Area","预计进单(商机完成)日期" };

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<FCSTN2MExcel> list = CommonFunc<FCSTN2MExcel>.ConvertToList(dt);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region StudyPlanMapping的添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].AccountID != null && list[i].OpportunityID != "" && list[i].AccountName != ""))
                                    {



                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        continue;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入FCSTN2M信息失败");
                        return;
                    }
                    #endregion


                    if (!string.IsNullOrEmpty(re))
                    {
                        SuccessResut(re);
                    }
                    else
                    {
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传FCSTN2MExecl！");
            }
        }

        public void SaveOrderDetail(OrderDetailExcel excel)
        {
            OrderDetailActual orderDetailModel = new OrderDetailActual();

            orderDetailModel.OITSales = excel.OITSales;
            if (!string.IsNullOrEmpty(excel.Year))
            {
                orderDetailModel.Year = Convert.ToInt32(excel.Year);
            }
            else
            {
                orderDetailModel.Year = 0;
            }
            orderDetailModel.Qtr = excel.Qtr;
            orderDetailModel.Month = excel.Month;
            orderDetailModel.Country = excel.Country;
            orderDetailModel.NewArea = excel.NewArea;
            orderDetailModel.NewRegion = excel.NewRegion;
            orderDetailModel.NewDistrict = excel.NewDistrict;
            orderDetailModel.WBS = excel.WBS;
            orderDetailModel.SO = excel.SO;
            orderDetailModel.SalesName = excel.SalesName;
            orderDetailModel.MAGName = excel.MAGName;

            orderDetailModel.MAGCode = excel.MAGCode;
            orderDetailModel.HospitalName = excel.HospitalName;

            if (!string.IsNullOrEmpty(excel.ActKUSD))
            {
                orderDetailModel.ActKUSD = Convert.ToInt32(excel.ActKUSD);
            }
            else
            {
                orderDetailModel.ActKUSD = 0;
            }
            if (!string.IsNullOrEmpty(excel.Qty))
            {
                orderDetailModel.Qty = Convert.ToInt32(excel.Qty);
            }
            else
            {
                orderDetailModel.Qty = 0;
            }

            orderDetailModel.Channel = excel.Channel;
            orderDetailModel.Clinical = excel.Clinical;

            orderDetailModel.Dealer = excel.Dealer;
            orderDetailModel.DealerManual = excel.DealerManual;
            orderDetailModel.DealerClinicalFlag = excel.DealerClinicalFlag;
            orderDetailModel.Department = excel.Department;
            orderDetailModel.HospCategory = excel.HospCategory;
            orderDetailModel.CustomerDICName = excel.CustomerDICName;
            orderDetailModel.HospFlag = excel.HospFlag;

            orderDetailModel.OpportunityID = excel.OpportunityID;
            orderDetailModel.Region = excel.Region;
            orderDetailModel.District = excel.District;
            orderDetailModel.District = excel.District;
            orderDetailModel.SAPArea = excel.SAPArea;
            orderDetailModel.SAPSalesName = excel.SAPSalesName;
            orderDetailModel.SAPShiptoParty = excel.SAPShiptoParty;
            orderDetailModel.SAPSoldtoParty = excel.SAPSoldtoParty;
            orderDetailModel.Segent = excel.Segent;
            orderDetailModel.USOITDate = excel.USOITDate;
            orderDetailModel.AdjustmentRemark = excel.AdjustmentRemark;
            orderDetailModel.HospitalType = excel.HospitalType;
            orderDetailModel.HWORSW = excel.HWORSW;

            orderDetailModel.Solution = excel.Solution;
            orderDetailModel.HTA = excel.HTA;
            orderDetailModel.Province = excel.province;
            orderDetailModel.Stock = excel.stock;
            orderDetailModel.IsDelete = false;

            orderDetailModel.Save();
        }

        public void SaveFCSTCM(FCSTN2MExcel excel)
        {
            FCSTN2MTarget model = new FCSTN2MTarget();

            model.Quantity = Convert.ToInt32(excel.Quantity);
            model.OpportunityID = excel.OpportunityID;
            model.OpportunityName = excel.OpportunityName;
            model.AccountID = excel.AccountID;
            model.AccountName = excel.AccountName;
            model.Possibility = excel.Possibility;
            model.Progress = excel.Progress;
            model.Currency = excel.Currency;
            model.TotalPrices = Convert.ToDecimal(excel.TotalPrices);
            model.ProductName = excel.ProductName;
            model.BusinessDealerName = excel.BusinessDealerName;
            model.BusinessOwner = excel.BusinessOwner;
            model.ClinicalDesc = excel.ClinicalDesc;
            model.Region = excel.Region;
            model.Province = excel.Province;
            model.Area = excel.Area;
            model.OwnerRole = excel.OwnerRole;

            model.ExpectedOrderDate = excel.ExpectedOrderDate;
            //model.AreaMAPPING = excel.AreaMAPPING;
            //model.ProductMAPPING = excel.ProductMAPPING;
            //model.ClinicalMAPPING = excel.ClinicalMAPPING;

            model.Save();
        }

        void FunnelImport()
        {
            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "数量", "商机 ID", "商机名称", "客户名", "客户 ID", "可能性 (%)", "进度", "省份", "总价（已转换）币种", "总价（已转换）",
                        "产品名称", "商机圈经销商名称", "商机所有人", "所有人角色","临床应用描述","Region","Area","预计进单(商机完成)日期","ASP" };

                    #region 导入excel
                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<FunnelExcel> list = CommonFunc<FunnelExcel>.ConvertToList(dt);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region Funnel的添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].AccountName != null && list[i].BusinessDealerName != ""))
                                    {
                                        SaveFunnel(list[i]);
                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        continue;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入员工信息失败");
                        return;
                    }
                    #endregion


                    if (!string.IsNullOrEmpty(re))
                    {
                        SuccessResut(re);
                    }
                    else
                    {
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传FunnelExecl！");
            }
        }

        public void SaveFunnel(FunnelExcel excel)
        {
            FunnelTarget funnel = new FunnelTarget();

            funnel.Quantity = Convert.ToInt32(excel.Quantity);

            funnel.OpportunityID = excel.OpportunityID;
            funnel.OpportunityName = excel.OpportunityName;
            funnel.AccountID = excel.AccountID;
            funnel.AccountName = excel.AccountName;
            funnel.Possibility = excel.Possibility;
            funnel.Progress = excel.Progress;
            funnel.Province = excel.Province;
            funnel.Currency = excel.Currency;
            funnel.TotalPrices = Convert.ToDecimal(excel.TotalPrices);
            funnel.ProductName = excel.ProductName;
            funnel.BusinessDealerName = excel.BusinessDealerName;
            funnel.BusinessOwner = excel.BusinessOwner;
            funnel.OwnerRole = excel.OwnerRole;
            funnel.ClinicalDesc = excel.ClinicalDesc;
            funnel.Region = excel.Region;
            funnel.Area = excel.Area;
            funnel.ExpectedOrderDate = excel.ExpectedOrderDate;
            funnel.IsDelete = false;
            //funnel.AreaMAPPING = excel.AreaMAPPING;
            //funnel.ProductMAPPING = excel.ProductMAPPING;
            //funnel.ClinicalMAPPING = excel.ClinicalMAPPING;
            funnel.ASP = Convert.ToInt32(excel.ASP);
            //funnel.Net = Convert.ToInt32(excel.Net);
            //funnel.FCST = Convert.ToInt32(excel.FCST);
            funnel.Save();
        }

        public void SaveFCSTCM(FCSTCMExcel excel)
        {
            FCSTCMTarget fcstcm = new FCSTCMTarget();

            fcstcm.Quantity = Convert.ToInt32(excel.Quantity);

            fcstcm.Region = excel.Region;
            fcstcm.Province = excel.Province;
            fcstcm.OwnerRole = excel.OwnerRole;
            fcstcm.OpportunityID = excel.OpportunityID;
            fcstcm.OpportunityName = excel.OpportunityName;
            fcstcm.AccountID = excel.AccountID;
            fcstcm.AccountName = excel.AccountName;
            fcstcm.ProductName = excel.ProductName;
            fcstcm.ExpectedOrderDate = excel.ExpectedOrderDate;
            //fcstcm.FunnelKUSD = excel.FunnelKUSD;
            //fcstcm.AreaMAPPING = excel.AreaMAPPING;
            //fcstcm.ProductMAPPING = excel.ProductMAPPING;
            //fcstcm.ClinicalMAPPING = excel.ClinicalMAPPING;

            fcstcm.Save();
        }

        void OrderDetailImport()
        {
            if (Context.Request.Files[0].ContentLength > 0)
            {
                #region 文件上传
                var file = Context.Request.Files[0];
                // string fileName = Guid.NewGuid() + Path.GetFileName(file.FileName);
                string fileName = DateTime.Now.Year.ToString() + DateTime.Now.Month.ToString() + DateTime.Now.Day.ToString() + DateTime.Now.Hour.ToString() + DateTime.Now.Minute.ToString() + DateTime.Now.Second.ToString() + DateTime.Now.Millisecond.ToString() + Path.GetFileName(file.FileName);
                string str2 = fileName.Substring(fileName.LastIndexOf('.'));
                string filePath = "";
                //int InvoiceContentSize = Convert.ToInt32(ConfigurationManager.AppSettings["InvoiceContentSize"]);
                if (".xls,.xlsx".IndexOf(str2.ToLower()) < 0)
                {
                    FailResut("excel格式不正确！");
                }
                else
                {

                    var re = "";

                    string folderPath = "/Upload/ImportExcel/";  //文件夹

                    string path = folderPath + fileName;
                    if (!Directory.Exists(Context.Server.MapPath(folderPath)))
                    {
                        Directory.CreateDirectory(Context.Server.MapPath(folderPath));
                    }
                    filePath = Context.Server.MapPath(path);
                    file.SaveAs(filePath);

                    #endregion

                    string[] excelTemp = new string[] { "OITSales", "Year", "Qtr", "Month", "Country", "NewArea", "NewRegion", "NewDistrict","WBS","SO","SalesName",
                          "MAGCode","MAGName","RTDescription", "HospitalName","ActKUSD", "Qty", "Channel", "DealerManual","Dealer", "Clinical",
                        "DealerClinicalFlag","Department","HospCategory","HospFlag","CustomerID","CustomerDICName","OpportunityID","Region","District","SAPArea",
                        "SAPSalesName","SAPShiptoParty","SAPSoldtoParty","Segent","USOITDate","AdjustmentRemark","HospitalType","HWORSW","Solution","HTA","province","stock" };


                    #region 导入excel

                    TransactionScope scope = new TransactionScope();
                    try
                    {

                        ExcelHelper excel = new ExcelHelper(filePath);
                        DataTable dt = excel.ExcelToDataTable("Sheet1", 0, true);

                        #region 检查模板是否正确
                        bool isTrue = true;
                        if (dt.Columns.Count == excelTemp.Length)
                        {
                            for (int i = 0; i < dt.Columns.Count; i++)
                            {
                                if (dt.Columns[i].ColumnName != excelTemp[i])
                                {
                                    isTrue = false;
                                }
                            }
                        }
                        else
                        {
                            isTrue = false;
                        }
                        #endregion

                        if (isTrue)
                        {
                            List<OrderDetailExcel> list = CommonFunc<OrderDetailExcel>.ConvertToList(dt);

                            if (dt != null && dt.Rows.Count > 0)
                            {

                                string errorMsg = "";
                                #region OrderDetail的添加

                                for (int i = 0; i < list.Count; i++)
                                {

                                    if ((list[i].OITSales != null && list[i].NewArea != "" && list[i].NewDistrict != "" && list[i].MAGName != "" && list[i].Clinical != ""))
                                    {

                                        SaveOrderDetail(list[i]);

                                    }
                                    else
                                    {
                                        errorMsg += "第" + (i) + "条导入失败，原因是必填项为空\r\n";
                                        re = errorMsg;
                                        scope.VoteRollBack();
                                        scope.Dispose();
                                        continue;
                                    }

                                }
                                #endregion                               
                            }

                        }
                        else
                        {
                            re = "模板不正确";
                        }

                    }
                    catch (Exception ex)
                    {
                        scope.VoteRollBack();
                        scope.Dispose();
                        FailResut("导入员工信息失败");
                        return;
                    }
                    #endregion


                    if (!string.IsNullOrEmpty(re))
                    {
                        FailResut(re);
                    }
                    else
                    {
                        SuccessResut("导入成功");
                    }

                }
            }
            else
            {
                FailResut("请选择上传Execl！");
            }

        }

    }
}