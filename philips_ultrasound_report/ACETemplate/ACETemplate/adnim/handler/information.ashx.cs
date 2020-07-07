using Com.Utility.ImageIO;
using Common.UI.JQGrid;
using EntityClass;
using Newtonsoft.Json;
using NHibernate.Criterion;
using System;
using System.Collections.Generic;
using System.Collections.ObjectModel;
using System.Linq;
using System.Web;
using EntityClass;
using System.Data;
using Castle.ActiveRecord;
using Common.Object.Class;
using Common.Object.Data;

namespace ACETemplate.adnim.handler
{
    /// <summary>
    /// information 的摘要说明
    /// </summary>
    public class information : Common.Object.Class.BaseLoginAdminHandler, System.Web.SessionState.IReadOnlySessionState
    {
        protected override void Process(HttpContext context)
        {
            switch (base.OperationType)
            {
                case "SaveOrderDetailTarget":
                    SaveOrderDetailTarget();
                    break;
                case "SaveFunnelTarget":
                    SaveFunnelTarget();
                    break;
                case "SaveFCSTCMTarget":
                    SaveFCSTCMTarget();
                    break;

                case "SaveFCSTN2MTarget":
                    SaveFCSTN2MTarget();
                    break;
                case "ImportReport_Query":
                    ImportReport_Query();
                    break;

                case "DeleteOrderDetail":
                    DeleteOrderDetail();
                    break;
                case "DeleteOOH":
                    DeleteOOH();
                    break;
                case "DeleteFunnel":
                    DeleteFunnel();
                    break;
                case "DeleteFCSTCM":
                    DeleteFCSTCM();
                    break;
                case "DeleteFCSTN2M":
                    DeleteFCSTN2M();
                    break;
                case "DeleteRealTime":
                    DeleteRealTime();
                    break;
                case "DeleteRateProvince":
                    DeleteRateProvince();
                    break;
                case "DeleteOrderYearMonth":
                    DeleteOrderYearMonth();
                    break;
                case "DeleteThreeRateDealer":
                    DeleteThreeRateDealer();
                    break;
                case "DeleteIB":
                    DeleteIB();
                    break;
                case "DeleteFCSTAccuracy":
                    DeleteFCSTAccuracy();
                    break;
                case "IBQuery":
                    IBQuery();
                    break;
                case "ThreeRateDealerQuery":
                    ThreeRateDealerQuery();
                    break;
                case "OrderDetailGenerate":
                    OrderDetailGenerate();
                    break;
                case "GenerateFunnel":
                    GenerateFunnel();
                    break;
                case "GenerateFCSTCM":
                    GenerateFCSTCM();
                    break;
                case "GenerateFCSTN2M":
                    GenerateFCSTN2M();
                    break;
                case "GenerateOOH":
                    GenerateOOH();
                    break;
                case "GenerateOrderYearMonth":
                    GenerateOrderYearMonth();
                    break;
                case "GenerateRealTime":
                    GenerateRealTime();
                    break;
                case "QueryThreeRateDealer":
                    QueryThreeRateDealer();
                    
                    break;
                case "QueryThreeRateProvince":
                    QueryThreeRateProvince();
                    break;
                case "QueryIB":
                    QueryIB();
                    break;
                case "QueryByDistrict":
                    QueryByDistrict();
                    break;
                case "QueryByProduct":
                    QueryByProduct();
                    break;
                case "ByDistrictClinicalQuery":
                    ByDistrictClinicalQuery();
                    break;
                case "QueryPromotion":
                    QueryPromotion();
                    break;

                case "QueryDiscountPie":
                    QueryDiscountPie();
                    break;
                case "QueryBCInfo":
                    QueryBCInfo();
                    break;
                case "QueryFCSTAccuracy":
                    QueryFCSTAccuracy();
                    break;
                case "QueryHomeArea":
                    QueryHomeArea();
                    break;
                case "SaveUserRegionMapping":
                    SaveUserRegionMapping();
                    break;
                case "SaveInfoUser":
                    SaveInfoUser();
                    break;
                case "UserList":
                    UserList_Edit();
                    break;
                case "QueryDistrictHospital":
                    QueryDistrictHospital();
                    break;
                case "GetUserInfo":
                    GetUserInfo();
                    break;


            }
            base.Process(context);
        }

        void GetUserInfo()
        {
            int id = Context.Request["id"].ToInt(0);
           var user= UserList.FindFirst(Expression.Eq(nameof(UserList.ID), id));

            var RegionList= UserRegionMapping.FindAll(Expression.Eq(nameof(UserRegionMapping.UserID), id));

            if (user != null)
            {
                foreach (var item in RegionList)
                {
                    if (item.ReportType == "Area")
                    {
                        user.AreaKey = item.RegionName;
                    }
                    else if (item.ReportType == "Clinical")
                    {
                        user.ClinicalKey = item.RegionName;
                    }
                    else if (item.ReportType == "Product")
                    {
                        user.ProductKey = item.RegionName;
                    }
                    else if (item.ReportType == "Promotion")
                    {
                        user.Promotion = item.RegionName;
                    }
                    else if (item.ReportType == "IB")
                    {
                        user.IBkey = item.RegionName;
                    }
                    else if (item.ReportType == "ThreeRate")
                    {
                        user.ThreeKey = item.RegionName;
                    }
                }
            }
           
            SuccessResut(user);

        }

        void QueryDistrictHospital()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);
        
            List<ICriterion> condition = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(ByDistrictHospital.Month), month.Split(',')));
            }
            if (year > 0)
            {
                condition.Add(Expression.Eq(nameof(ByDistrictHospital.Year), year));
            }
            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "Area"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(ByDistrictHospital.Region), region));
            }


            var result = ByDistrictHospital.FindAll(condition.ToandCriterion());

            SuccessResut(result);
        }

        void SaveInfoUser()
        {
            TransactionScope scop = new TransactionScope();

            try
            {
                //string DashboardKey = Context.Request["DashboardKey"].ToStringNoNull("");
                string AreaKey = Context.Request["AreaKey"].ToStringNoNull("");
                string ClinicalKey = Context.Request["ClinicalKey"].ToStringNoNull("");
                string ThreeKey = Context.Request["ThreeKey"].ToStringNoNull("");
                string IBkey = Context.Request["IBkey"].ToStringNoNull("");
                string Promotion = Context.Request["Promotion"].ToStringNoNull("");
                string ProductKey = Context.Request["ProductKey"].ToStringNoNull("");

                int ID = Context.Request["ID"].ToInt(0);
                string CellPhone = Context.Request["CellPhone"].ToStringNoNull("");
                string UserName = Context.Request["UserName"].ToStringNoNull("");
                string Password = Context.Request["Password"].ToStringNoNull("");
                string Email = Context.Request["Email"].ToStringNoNull("");
                string JobTitle = Context.Request["JobTitle"].ToStringNoNull("");
                int UserRoles = 0;
                 UserRoles += Context.Request.Form["Role1"].ToBool() ? (int)UserRoleType.User : 0;
                UserRoles += Context.Request.Form["Role2"].ToBool() ? (int)UserRoleType.BaseInfo : 0;
                UserRoles += Context.Request.Form["Role3"].ToBool() ? (int)UserRoleType.Publishing : 0;

                #region user信息
                UserList user = null;
                if (ID > 0)
                {
                    var model = UserList.FindFirst(Expression.Eq(nameof(UserList.ID), ID));

                    if (model != null)
                    {
                        model.UserName = UserName;
                        model.Email = Email;
                        model.CellPhone = CellPhone;
                        model.JobTitle = JobTitle;
                        model.ModifyDate = DateTime.Now;
                        model.UserRoles = UserRoles;
                        model.Save();
                        user = model;
                    }
                    else
                    {
                        user = new UserList();
                        user.CellPhone = CellPhone;
                        user.RealName = UserName;
                        user.Password = Password;
                        user.Email = Email;
                        user.UserName = UserName;
                        user.JobTitle = JobTitle;
                        user.StatusId = false;
                        user.ModifyDate = DateTime.Now;
                        user.UserRoles = UserRoles;
                        user.Save();
                    }

                }
                else
                {
                    user = new UserList();
                    user.CellPhone = CellPhone;
                    user.RealName = UserName;
                    user.Password = Password;
                    user.Email = Email;
                    user.UserName = UserName;
                    user.JobTitle = JobTitle;
                    user.StatusId = false;
                    user.ModifyDate = DateTime.Now;
                    user.Save();
                }
                #endregion

                #region DashBoard报表
                //int regionID = 0;
                //var region = RegionMapping.FindFirst(Expression.Eq(nameof(RegionMapping.Name), DashboardKey));

                //if (region != null)
                //{
                //    regionID = region.ID;
                //}

                //UserRegionMapping mapping1 = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), user.ID), Expression.Eq(nameof(UserRegionMapping.ReportType), "Dashboard"));

                //if (mapping1 != null)
                //{
                //    mapping1.RegionID = regionID;
                //    mapping1.RegionName = DashboardKey;
                //    mapping1.UpdateTime = DateTime.Now;
                //    mapping1.Save();
                //}
                //else
                //{
                //    SaveUserRegionMapping(user.ID, "Dashboard", DashboardKey, regionID);
                //}

                #endregion

                #region AreaKey报表
                int r1 = 0;
                var AreaMapping = RegionMapping.FindFirst(Expression.Eq(nameof(RegionMapping.Name), AreaKey));

                if (AreaMapping != null)
                {
                    r1 = AreaMapping.ID;
                }

                UserRegionMapping mapping2 = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), user.ID), Expression.Eq(nameof(UserRegionMapping.ReportType), "Area"));

                if (mapping2 != null)
                {
                    mapping2.RegionID = r1;
                    mapping2.RegionName = AreaKey;
                    mapping2.UpdateTime = DateTime.Now;
                    mapping2.Save();
                }
                else
                {
                    SaveUserRegionMapping(user.ID, "Area", AreaKey, r1);
                }
                #endregion

                #region ClinicalKey报表
                int r2 = 0;
                var regionModel3 = RegionMapping.FindFirst(Expression.Eq(nameof(RegionMapping.Name), ClinicalKey));

                if (regionModel3 != null)
                {
                    r2 = regionModel3.ID;
                }

                UserRegionMapping mapping3 = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), user.ID), Expression.Eq(nameof(UserRegionMapping.ReportType), "Clinical"));

                if (mapping3 != null)
                {
                    mapping3.RegionID = r2;
                    mapping3.RegionName = ClinicalKey;
                    mapping3.UpdateTime = DateTime.Now;
                    mapping3.Save();
                }
                else
                {
                    SaveUserRegionMapping(user.ID, "Clinical", ClinicalKey, r2);
                }
                #endregion

                #region ThreeKey报表
                int r3 = 0;
                var regionModel4 = RegionMapping.FindFirst(Expression.Eq(nameof(RegionMapping.Name), ThreeKey));

                if (regionModel4 != null)
                {
                    r3 = regionModel4.ID;
                }

                UserRegionMapping mapping4 = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), user.ID), Expression.Eq(nameof(UserRegionMapping.ReportType), "ThreeRate"));

                if (mapping4 != null)
                {
                    mapping4.RegionID = r3;
                    mapping4.RegionName = ThreeKey;
                    mapping4.UpdateTime = DateTime.Now;
                    mapping4.Save();
                }
                else
                {
                    SaveUserRegionMapping(user.ID, "ThreeRate", ThreeKey, r3);
                }

                #endregion


                #region IB报表

                int r5 = 0;
                var regionModel5 = RegionMapping.FindFirst(Expression.Eq(nameof(RegionMapping.Name), ThreeKey));

                if (regionModel5 != null)
                {
                    r5 = regionModel5.ID;
                }

                UserRegionMapping mapping5 = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), user.ID), Expression.Eq(nameof(UserRegionMapping.ReportType), "IB"));

                if (mapping5 != null)
                {
                    mapping5.RegionID = r5;
                    mapping5.RegionName = ThreeKey;
                    mapping5.UpdateTime = DateTime.Now;
                    mapping5.Save();
                }
                else
                {
                    SaveUserRegionMapping(user.ID, "IB", ThreeKey, r5);
                }
                #endregion

                #region Promotion报表

                int r6 = 0;
                var regionModel6 = RegionMapping.FindFirst(Expression.Eq(nameof(RegionMapping.Name), Promotion));

                if (regionModel6 != null)
                {
                    r6 = regionModel6.ID;
                }

                UserRegionMapping mapping6 = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), user.ID), Expression.Eq(nameof(UserRegionMapping.ReportType), "Promotion"));

                if (mapping6 != null)
                {
                    mapping6.RegionID = r6;
                    mapping6.RegionName = Promotion;
                    mapping6.UpdateTime = DateTime.Now;
                    mapping6.Save();
                }
                else
                {
                    SaveUserRegionMapping(user.ID, "Promotion", Promotion, r6);
                }
                #endregion

                #region Product报表

                int r7 = 0;
                var regionModel7 = RegionMapping.FindFirst(Expression.Eq(nameof(RegionMapping.Name), ProductKey));

                if (regionModel7 != null)
                {
                    r7 = regionModel7.ID;
                }

                UserRegionMapping mapping7 = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), user.ID), Expression.Eq(nameof(UserRegionMapping.ReportType), "Product"));

                if (mapping7 != null)
                {
                    mapping7.RegionID = r7;
                    mapping7.RegionName = ProductKey;
                    mapping7.UpdateTime = DateTime.Now;
                    mapping7.Save();
                }
                else
                {
                    SaveUserRegionMapping(user.ID, "Product", ProductKey, r7);
                }
                #endregion

                scop.VoteCommit();
                scop.Dispose();

                SuccessResut("保存成功", "", "");
            }
            catch (Exception ex)
            {
                scop.VoteRollBack();
                scop.Dispose();
                FailResut("保存失败");
            }
        }

        void UserList_Edit()
        {
            JGOperItem<UserList> jg = new JGOperItem<UserList>(Context.Request);
            jg.DoDataAction();
            SuccessResut(jg.SaveT, "", "");
        }

        private void SaveUserRegionMapping(int UserID, string ReportType, string regionName, int regionID)
        {
            UserRegionMapping AddMapping = new UserRegionMapping();
            AddMapping.UserID = UserID;
            AddMapping.ReportType = ReportType;
            AddMapping.RegionName = regionName;
            AddMapping.RegionID = regionID;
            AddMapping.UpdateTime = DateTime.Now;
            AddMapping.Save();
        }

        void QueryHomeArea()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            List<ICriterion> condition2 = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(ByDistrictInfo.Month), month.Split(',')));
            }

            if (year > 0)
            {
                condition.Add(Expression.Eq(nameof(ByDistrictInfo.Year), year));
            }
            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "Area"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(ByDistrictInfo.Region), region));
                condition2.Add(Expression.Eq(nameof(OITSales.Region), region));
            }

            var list = ByDistrictInfo.FindAll(condition.ToandCriterion());

            foreach (var item in list)
            {
                if (item.OITTarget > 0)
                {
                    item.Compl = item.OITActual / item.OITTarget;
                }
                else {
                    item.Compl = 0;
                }
            }

            var ComplList = list.OrderByDescending(a => a.Compl).Take(5);

            var FunnelList =list.OrderByDescending(a => a.Funnel).Take(5);


            condition2.Add(Expression.Eq(nameof(OITSales.Year), year));
            condition2.Add(Expression.Eq(nameof(OITSales.TypeArea), 1));

            var OITList=OITSales.FindAll(condition2.ToandCriterion());


            var result = new { FunnelList= FunnelList, ComplList= ComplList,DistrictList=list, OITList= OITList };

            SuccessResut(result);
        }

        void QueryFCSTAccuracy()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(FCSTAccuracy.Month), month.Split(',')));
            }
            if (year > 0)
            {
               condition.Add(Expression.Eq(nameof(FCSTAccuracy.Year), year));
            }
            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "Area"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(FCSTAccuracy.Region), region));
            }


            var result=FCSTAccuracy.FindAll(condition.ToandCriterion());

            SuccessResut(result);

        }
        void QueryBCInfo()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(BCIntegrate.Month), month.Split(',')));
            }
            
            if (year > 0)
            {
                condition.Add(Expression.Eq("Year", year));
            }
            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "Promotion"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(BCIntegrate.Region), region));

            }

            var result=BCIntegrate.FindAll(condition.ToandCriterion());

            SuccessResut(result);
        }

        void QueryDiscountPie()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(DiscountIntegrate.Month), month.Split(',')));
            }
           
            if (year > 0)
            {
                condition.Add(Expression.Eq("Year", year));
            }

            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "Promotion"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(DiscountIntegrate.Region), region));

            }

            var result= DiscountIntegrate.FindAll(condition.ToandCriterion());

            SuccessResut(result);
        }

        void QueryPromotion()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(PromotionIntegrate.Month), month.Split(',')));
            }
            
            if (year > 0)
            {
                condition.Add(Expression.Eq("Year", year));
            }

            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "Promotion"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(PromotionIntegrate.Region), region));
               
            }


            var result = PromotionIntegrate.FindAll(condition.ToArray());

            SuccessResut(result);
        }

        void ByDistrictClinicalQuery()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();
            List<ICriterion> condition2 = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(ByDistrictClinicalInfo.Month), month.Split(',')));
            }
           
            if (year > 0)
            {
                condition.Add(Expression.Eq("Year", year));
            }

            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "Clinical"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(ByDistrictClinicalInfo.Region), region));
                condition2.Add(Expression.Eq(nameof(OITSales.Region), region));
            }

            var  ClinicalList = ByDistrictClinicalInfo.FindAll(condition.ToandCriterion());




            condition2.Add(Expression.Eq(nameof(OITSales.Year), year));
            condition2.Add(Expression.Eq(nameof(OITSales.TypeArea), 1));

            var OITList= OITSales.FindAll(condition2.ToandCriterion()).ToList();

            var result = new { ClinicalList= ClinicalList, OITList= OITList };

            SuccessResut(result);
        }

        void QueryByProduct()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(ByProductInfo.Month), month.Split(',')));
            }

            if (year > 0)
            {
                condition.Add(Expression.Eq("Year", year));
            }

            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "Product"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(ByDistrictInfo.Region), region));
            }



            var result = ByProductInfo.FindAll(condition.ToandCriterion());

            SuccessResut(result);
        }

        void QueryByDistrict()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            //type 1需要查询去年的数据
            var type = Context.Request["type"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            List<ICriterion> condition1 = new List<ICriterion>();

            List<ICriterion> condition3 = new List<ICriterion>();

            List<ICriterion> condition4 = new List<ICriterion>();
          
            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(ByDistrictInfo.Month), month.Split(',')));
                condition1.Add(Expression.In(nameof(ByDistrictInfo.Month), month.Split(',')));
            }
            if (year > 0)
            {
                condition.Add(Expression.Eq(nameof(ByDistrictInfo.Year), year));
                condition1.Add(Expression.Eq(nameof(ByDistrictInfo.Year), year));
            }

            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "Area"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(ByDistrictInfo.Region), region));
                condition1.Add(Expression.Eq(nameof(ByDistrictInfo.Region), region));
                condition3.Add(Expression.Eq(nameof(OITSales.Region), region));
                condition4.Add(Expression.Eq(nameof(OITSales.Region), region));
            }


            var CurrentList= ByDistrictInfo.FindAll(condition.ToandCriterion());

           

            List<OITSales> LastList = null;
            List<ByDistrictInfo> LastDistrictList = null;
            if (type == 1)
            {     
                condition3.Add(Expression.Eq(nameof(OITSales.Year), year - 1));
                condition3.Add(Expression.Eq(nameof(OITSales.TypeArea), 1));

                LastList = OITSales.FindAll(condition3.ToandCriterion()).ToList();

                LastDistrictList = ByDistrictInfo.FindAll(condition1.ToandCriterion()).ToList();
            }

          
            condition4.Add(Expression.Eq(nameof(OITSales.Year), year));
            condition4.Add(Expression.Eq(nameof(OITSales.TypeArea), 1));

            var CurrentOITLast = OITSales.FindAll(condition4.ToandCriterion()).ToList();

            var result = new { CurrentList = CurrentList, LastList= LastList, LastDistrictList= LastDistrictList, CurrentOITLast = CurrentOITLast };

            SuccessResut(result);
        }

        void QueryIB()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(IBInfo.month), month.Split(',')));
            }
            if (year > 0)
            {
                condition.Add(Expression.Eq("Year", year));
            }
            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "IB"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(V_ThreeRateProvince.Region), region));
            }

            var result = IBInfo.FindAll(condition.ToandCriterion());

            SuccessResut(result);
        }

        void QueryThreeRateProvince()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(V_ThreeRateProvince.Month), month.Split(',')));
            }
            
            if (year > 0)
            {
                condition.Add(Expression.Eq("Year", year));
            }

            string region = "";
            if (base.User != null)
            {
               var mapping= UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "ThreeRate"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(V_ThreeRateProvince.Region), region));
            }

            var result = V_ThreeRateProvince.FindAll(condition.ToandCriterion());

            SuccessResut(result);
        }

        void QueryThreeRateDealer()
        {
            string month = Context.Request["month"].ToStringNoNull("");

            int year = Context.Request["year"].ToInt(0);

            List<ICriterion> condition = new List<ICriterion>();

            if (!string.IsNullOrEmpty(month))
            {
                condition.Add(Expression.In(nameof(ThreeRateDealer.Month), month.Split(',')));
            }
            
            if (year > 0)
            {
                condition.Add(Expression.Eq("Year", year));
            }

            string region = "";
            if (base.User != null)
            {
                var mapping = UserRegionMapping.FindFirst(Expression.Eq(nameof(UserRegionMapping.UserID), base.UserId), Expression.Eq("ReportType", "ThreeRate"));

                if (mapping != null)
                {
                    region = mapping.RegionName;
                }
            }
            if (!string.IsNullOrEmpty(region))
            {
                condition.Add(Expression.Eq(nameof(V_ThreeRateProvince.Region), region));
            }

            var result= ThreeRateDealer.FindAll(condition.ToandCriterion());

            SuccessResut(result);

        }

        void OrderDetailGenerate()
        {
            int month = Context.Request["month"].ToInt(0);

            int year = Context.Request["year"].ToInt(0);

            var oohBatch =ReportBatch.Exists(Expression.Eq(nameof(ReportBatch.TableTypeID), 2),Expression.Eq(nameof(ReportBatch.Month), month),Expression.Eq(nameof(ReportBatch.Year), year));

            var FunnelBatch = ReportBatch.Exists(Expression.Eq(nameof(ReportBatch.TableTypeID), 3), Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year));

            var FCSTN2MBatch = ReportBatch.Exists(Expression.Eq(nameof(ReportBatch.TableTypeID), 4), Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year));

            var FCSTCMBatch = ReportBatch.Exists(Expression.Eq(nameof(ReportBatch.TableTypeID), 5), Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year));

            if (oohBatch && FunnelBatch && FCSTCMBatch && FCSTCMBatch)
            {
                TransactionScope scope = new TransactionScope();

                try
                {
                    var list = OrderDetailTarget.FindAll(Expression.Eq(nameof(OrderDetailTarget.Month), month.ToString()), Expression.Eq(nameof(OrderDetailTarget.Year), year));

                    if (list.Length > 0)
                    {
                        ReportBatch batch = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year), Expression.Eq("TableTypeID", 1));

                        if (batch != null)
                        {
                            FailResut("已生成过报表");
                            return;
                        }
                        else
                        {
                            batch = new ReportBatch();
                            batch.Month = month;
                            batch.Year = year;
                            batch.TableTypeID = 1;
                            batch.ImportID = Convert.ToInt32(list[0].ImportID);
                            batch.Save();
                        }
                        #region orderDetailActual 生成
                        foreach (var item in list)
                        {


                            #region ByDistrictHospital生成数据

                            ByDistrictHospital districtHospital = new ByDistrictHospital();

                            districtHospital.BatchID = batch.ID;

                            districtHospital.Year = item.Year;
                            districtHospital.Month = item.Month == "" ? 0 : Convert.ToInt32(item.Month);
                            districtHospital.Qty = item.Qty;
                            districtHospital.HospitalType = item.HospitalType;
                            districtHospital.HospitalName = item.HospitalName;
                            districtHospital.District = item.District;
                            districtHospital.Region = item.Region;
                            districtHospital.OITSales = item.OITSales;
                            districtHospital.Save();



                            #endregion

                            OrderDetailActual actual = new OrderDetailActual();

                            actual.OITSales = item.OITSales;

                            actual.Year = item.Year;

                            actual.Qtr = item.Qtr;
                            actual.Month = item.Month;
                            actual.Country = item.Country;
                            actual.NewRegion = item.NewRegion;
                            actual.NewDistrict = item.NewDistrict;
                            actual.WBS = item.WBS;
                            actual.SO = item.SO;
                            actual.SalesName = item.SalesName;
                            actual.MAGName = item.MAGName;

                            actual.MAGCode = item.MAGCode;
                            actual.HospitalName = item.HospitalName;

                            if (!string.IsNullOrEmpty(item.ActKUSD.ToString()))
                            {
                                actual.ActKUSD = Convert.ToInt32(item.ActKUSD);
                            }
                            else
                            {
                                actual.ActKUSD = 0;
                            }
                            if (item.Qty > 0)
                            {
                                actual.Qty = Convert.ToInt32(item.Qty);
                            }
                            else
                            {
                                actual.Qty = 0;
                            }

                            actual.Channel = item.Channel;
                            actual.Clinical = item.Clinical;

                            actual.Dealer = item.Dealer;
                            actual.DealerManual = item.DealerManual;
                            actual.DealerClinicalFlag = item.DealerClinicalFlag;
                            actual.Department = item.Department;
                            actual.HospCategory = item.HospCategory;
                            actual.CustomerDICName = item.CustomerDICName;
                            actual.HospFlag = item.HospFlag;

                            actual.OpportunityID = item.OpportunityID;
                            actual.Region = item.Region;
                            actual.District = item.District;
                            actual.District = item.District;
                            actual.SAPArea = item.SAPArea;
                            actual.SAPSalesName = item.SAPSalesName;
                            actual.SAPShiptoParty = item.SAPShiptoParty;
                            actual.SAPSoldtoParty = item.SAPSoldtoParty;
                            actual.Segent = item.Segent;
                            actual.USOITDate = item.USOITDate;
                            actual.AdjustmentRemark = item.AdjustmentRemark;
                            actual.HospitalType = item.HospitalType;
                            actual.HWORSW = item.HWORSW;

                            actual.Solution = item.Solution;
                            actual.HTA = item.HTA;
                            actual.Province = item.Province;
                            actual.Stock = item.Stock;
                            actual.IsDelete = false;
                            actual.Save();
                       
                        }
                        #endregion

                        var districtList =list.OrderBy(a => a.NewDistrict).ToList();

                        foreach (var item in districtList)
                        {
                            #region byDistrict生成数据

                            ByDistrictInfo byDistrict = new ByDistrictInfo();

                            byDistrict.Region = item.Region;
                            byDistrict.District = item.District;
                            byDistrict.BatchID = batch.ID.ToString();
                            byDistrict.Year = year;
                            byDistrict.Month = month;

                           decimal OITactual =OrderDetailTarget.FindAll(Expression.Eq(nameof(OrderDetailTarget.OITSales), "OIT"), Expression.Eq(nameof(OrderDetailTarget.NewDistrict), item.NewDistrict)).Sum(a => a.ActKUSD);

                           byDistrict.OITActual = OITactual / 1000;

                           byDistrict.OITTarget = 0;

                           byDistrict.OITYTDActual = 0;
                            byDistrict.OITYTarget = 0;

                            decimal OITHTA= OrderDetailTarget.FindAll(Expression.Eq(nameof(OrderDetailTarget.OITSales), "OIT"),Expression.Eq("HTA","Y"),Expression.Eq(nameof(OrderDetailTarget.NewDistrict), item.NewDistrict)).Sum(a => a.ActKUSD);

                            byDistrict.OITHTAActual = OITHTA / 1000;

                            byDistrict.Funnel = FunnelActual.FindAll(Expression.Eq(nameof(FunnelActual.Month), month), Expression.Eq(nameof(FunnelActual.Year), year), Expression.Eq("AreaMAPPING", item.NewDistrict)).Sum(a => a.TotalPrices) / 1000000;

                            decimal? togo = byDistrict.OITYTarget - byDistrict.OITYTDActual;

                            byDistrict.Transrate = byDistrict.Funnel / togo;

                            byDistrict.FCST = FCSTCMActual.FindAll(Expression.Eq(nameof(FunnelActual.Month), month), Expression.Eq(nameof(FunnelActual.Year), year), Expression.Eq("AreaMAPPING", item.NewDistrict)).Sum(a=>a.FunnelKUSD)/1000;

                            byDistrict.FCSTN2M = FCSTN2MActual.FindAll(Expression.Eq(nameof(FunnelActual.Month), month), Expression.Eq(nameof(FunnelActual.Year), year), Expression.Eq("AreaMAPPING", item.NewDistrict)).Sum(a => a.TotalPrices) / 1000000;

                            decimal Salesactual = OrderDetailTarget.FindAll(Expression.Eq(nameof(OrderDetailTarget.OITSales), "Sales to Thirds"), Expression.Eq(nameof(OrderDetailTarget.NewDistrict), item.NewDistrict)).Sum(a => a.ActKUSD);

                            byDistrict.SalesActual = Salesactual;

                            byDistrict.SalesTarget = 0;

                            byDistrict.SalesYTDActual = 0;
                            byDistrict.SalesYTarget = 0;

                            decimal SalesHTA = OrderDetailTarget.FindAll(Expression.Eq(nameof(OrderDetailTarget.OITSales), "Sales to Thirds"), Expression.Eq("HTA", "Y"), Expression.Eq(nameof(OrderDetailTarget.NewDistrict), item.NewDistrict)).Sum(a => a.ActKUSD);

                            byDistrict.SalesHTAActual = SalesHTA / 1000;

                            byDistrict.OOH= OOHActual.FindAll(Expression.Eq(nameof(OOHActual.Month), month), Expression.Eq(nameof(OOHActual.Year), year), Expression.Eq("AreaMAPPING", item.NewDistrict)).Sum(a => a.KUSD) / 1000;

                            byDistrict.InvenrotyIsNinety = OOHActual.FindAll(Expression.Eq("Month",month),Expression.Eq("Year",year),Expression.Eq("AreaMAPPING", item.NewDistrict),Expression.Eq("IsNinety", true),Expression.Eq(nameof(OOHActual.COUNTOFF),false)).Sum(a=>a.Qty);

                            byDistrict.Save();

                            #endregion

                            #region ByDistrictClinical报表数据生成

                            ByDistrictClinicalInfo clinicalInfo = new ByDistrictClinicalInfo();

                            clinicalInfo.Region = item.Region;
                            clinicalInfo.District = item.District;
                            clinicalInfo.BatchID = batch.ID.ToString();
                            clinicalInfo.Year = year;
                            clinicalInfo.Month = month;
                            clinicalInfo.CVOITYTDActual = OrderDetailTarget.FindAll(Expression.Eq("OITSales","OIT"),Expression.Eq("Clinical", "CV"),Expression.Eq("NewDistrict", item.NewDistrict)).Sum(a => a.ActKUSD)/ 1000;
                            clinicalInfo.CVOITTarget = 0;
                            clinicalInfo.CVFunnel= FunnelActual.FindAll(Expression.Eq("Month", month), Expression.Eq("Year", year), Expression.Eq("AreaMAPPING", item.NewDistrict),Expression.Eq("ClinicalMAPPING", "CV")).Sum(a => a.TotalPrices) / 1000000;
                            clinicalInfo.CVSalesYTDActual= OrderDetailTarget.FindAll(Expression.Eq("OITSales", "Sales to Thirds"), Expression.Eq("Clinical", "CV"), Expression.Eq("NewDistrict", item.NewDistrict)).Sum(a => a.ActKUSD) / 1000;
                            clinicalInfo.CVSalesTarget = 0;

                            clinicalInfo.GIOITYTDActual = OrderDetailTarget.FindAll(Expression.Eq("OITSales", "OIT"), Expression.Eq("Clinical", "GI"), Expression.Eq("NewDistrict", item.NewDistrict)).Sum(a => a.ActKUSD) / 1000;
                            clinicalInfo.GIOITTarget = 0;
                            clinicalInfo.GIFunnel = FunnelActual.FindAll(Expression.Eq("Month", month), Expression.Eq("Year", year), Expression.Eq("AreaMAPPING", item.NewDistrict), Expression.Eq("ClinicalMAPPING", "GI")).Sum(a => a.TotalPrices) / 1000000;
                            clinicalInfo.GISalesYTDActual= OrderDetailTarget.FindAll(Expression.Eq("OITSales", "Sales to Thirds"), Expression.Eq("Clinical", "GI"), Expression.Eq("NewDistrict", item.NewDistrict)).Sum(a => a.ActKUSD) / 1000;
                            clinicalInfo.GISalesTarget = 0;

                            clinicalInfo.WHCOITYTDActual = OrderDetailTarget.FindAll(Expression.Eq("OITSales", "OIT"), Expression.Eq("Clinical", "WHC"), Expression.Eq("NewDistrict", item.NewDistrict)).Sum(a => a.ActKUSD) / 1000;
                            clinicalInfo.WHCOITTarget = 0;
                            clinicalInfo.WHCFunnel = FunnelActual.FindAll(Expression.Eq("Month", month), Expression.Eq("Year", year), Expression.Eq("AreaMAPPING", item.NewDistrict), Expression.Eq("ClinicalMAPPING", "WHC")).Sum(a => a.TotalPrices) / 1000000;
                            clinicalInfo.WHCSalesYTDActual= OrderDetailTarget.FindAll(Expression.Eq("OITSales", "Sales to Thirds"), Expression.Eq("Clinical", "WHC"), Expression.Eq("NewDistrict", item.NewDistrict)).Sum(a => a.ActKUSD) / 1000;
                            clinicalInfo.WHCSalesTarget = 0;

                            clinicalInfo.POCOITYTDActual= OrderDetailTarget.FindAll(Expression.Eq("OITSales", "OIT"), Expression.Eq("Clinical", "POC"), Expression.Eq("NewDistrict", item.NewDistrict)).Sum(a => a.ActKUSD) / 1000;
                            clinicalInfo.POCOITTarget = 0;
                            clinicalInfo.POCFunnel = FunnelActual.FindAll(Expression.Eq("Month", month), Expression.Eq("Year", year), Expression.Eq("AreaMAPPING", item.NewDistrict), Expression.Eq("ClinicalMAPPING", "POC")).Sum(a => a.TotalPrices) / 1000000;
                            clinicalInfo.POCSalesYTDActual= OrderDetailTarget.FindAll(Expression.Eq("OITSales", "Sales to Thirds"), Expression.Eq("Clinical", "POC"), Expression.Eq("NewDistrict", item.NewDistrict)).Sum(a => a.ActKUSD) / 1000;
                            clinicalInfo.POCSalesTarget = 0;

                            clinicalInfo.Save();

                            #endregion

                        }

                        #region ByProductInfo 生成

                        var ProductList = list.OrderBy(a => a.MAGName).ToList();

                        foreach (var item in ProductList)
                        {

                            ByProductInfo byProduct = new ByProductInfo();

                            byProduct.Year = year;
                            byProduct.Month = month;
                            byProduct.BatchID = batch.ID.ToString();
                            byProduct.ProductName = item.MAGName;
                            byProduct.OITValueYTDActual = OrderDetailTarget.FindAll(Expression.Eq("OITSales", "OIT"), Expression.Eq("MAGName", item.MAGName)).Sum(a => a.ActKUSD) / 1000;
                            byProduct.OITValueTarget = 0;

                            var OITValue = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), item.MAGName),Expression.Eq("TypeArea",2),Expression.Eq("SubTypeName","Value"),Expression.Eq("Year", year), Expression.Eq("TypeName", "OIT"));

                            if (OITValue != null)
                            {
                                byProduct.OITValueYTD = ((OITValue.M1 + OITValue.M2 + OITValue.M3 + OITValue.M4 + OITValue.M5 + OITValue.M6) / 1000);
                            }
                            else
                            {
                                byProduct.OITValueYTD = 0;
                            }
                            byProduct.ValueFunnel= FunnelActual.FindAll(Expression.Eq("Month", month), Expression.Eq("Year", year), Expression.Eq("ProductMAPPING", item.MAGName)).Sum(a => a.TotalPrices) / 1000000;

                            byProduct.OITUnitYTDActual = OrderDetailTarget.FindAll(Expression.Eq("OITSales", "OIT"), Expression.Eq("MAGName", item.MAGName)).Sum(a => a.Qty) ;
                            byProduct.OITUnitTarget = 0;

                            var OITUnit = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), item.MAGName), Expression.Eq("TypeArea", 2), Expression.Eq("SubTypeName", "Unit"), Expression.Eq("Year", year), Expression.Eq("TypeName", "OIT"));

                            if (OITUnit != null)
                            {
                                byProduct.OITUnitYTD = ((OITUnit.M1 + OITUnit.M2 + OITUnit.M3 + OITUnit.M4 + OITUnit.M5 + OITUnit.M6) / 1000);
                            }
                            else
                            {
                                byProduct.OITUnitYTD = 0;
                            }
                            byProduct.UnitFunnel= FunnelActual.FindAll(Expression.Eq("Month", month), Expression.Eq("Year", year), Expression.Eq("ProductMAPPING", item.MAGName)).Sum(a => a.Quantity);


                            byProduct.SalesValueYTDActual = OrderDetailTarget.FindAll(Expression.Eq("OITSales", "Sales to Thirds"), Expression.Eq("MAGName", item.MAGName)).Sum(a => a.ActKUSD) / 1000;
                            byProduct.SalesValueTarget = 0;

                            var SalesValue = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), item.MAGName), Expression.Eq("TypeArea", 2), Expression.Eq("SubTypeName", "Value"), Expression.Eq("Year", year), Expression.Like("TypeName", "Sales",MatchMode.Anywhere));

                            if (OITValue != null)
                            {
                                byProduct.SalesValueYTD = ((OITValue.M1 + OITValue.M2 + OITValue.M3 + OITValue.M4 + OITValue.M5 + OITValue.M6) / 1000);
                            }
                            else
                            {
                                byProduct.SalesValueYTD = 0;
                            }
                            byProduct.ValueOOH = OOHActual.FindAll(Expression.Eq("Month", month), Expression.Eq("Year", year), Expression.Eq("ProductMAPPING", item.MAGName)).Sum(a => a.KUSD);

                            byProduct.SalesUnitYTDActual = OrderDetailTarget.FindAll(Expression.Eq("OITSales", "Sales to Thirds"), Expression.Eq("MAGName", item.MAGName)).Sum(a => a.Qty);;
                            byProduct.SalesUnitTarget = 0;
                            var SalesUnit = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), item.MAGName), Expression.Eq("TypeArea", 2), Expression.Eq("SubTypeName", "Unit"), Expression.Eq("Year", year), Expression.Like("TypeName", "Sales", MatchMode.Anywhere));

                            if (SalesUnit != null)
                            {
                                byProduct.SalesUnitYTD = ((SalesUnit.M1 + SalesUnit.M2 + SalesUnit.M3 + SalesUnit.M4 + SalesUnit.M5 + SalesUnit.M6) / 1000);
                            }
                            else
                            {
                                byProduct.SalesUnitYTD = 0;
                            }
                            byProduct.UnitOOH= OOHActual.FindAll(Expression.Eq("Month", month), Expression.Eq("Year", year), Expression.Eq("ProductMAPPING", item.MAGName)).Sum(a => a.InventoryAging);

                            byProduct.Save();

                        }


                        #endregion


                        GenerateOITSales(month, year);

                        OrderDetailTarget.DeleteAll();

                       // var ActualList =OrderDetailActual.FindAll(Expression.Eq(nameof(OrderDetailTarget.Month), month.ToString()), Expression.Eq(nameof(OrderDetailTarget.Year), year.ToString()));                      
                    }

                    scope.VoteCommit();
                    scope.Dispose();
                    SuccessResut("生成报表成功");
                }
                catch (Exception ex)
                {
                    scope.VoteRollBack();
                    scope.Dispose();
                    FailResut("生成报表失败");
                }
               
            }
            else {
                FailResut("请先生成OOH、Funnel、FCSTN2M、FCSTCM报表");
            }

        }

        private void GenerateOITSales(int month,int year)
        {
            ReportHelper helper = new ReportHelper();

            DataTable dt = helper.queryDistrict(month,year);

            foreach (DataRow item in dt.Rows)
            {
                SaveOITSales(item, 1, 1, "");
            }
            DataTable dt1 = helper.queryProductValue(month, year);

            foreach (DataRow item in dt1.Rows)
            {
                SaveOITSales(item, 2, 2, "Value");
            }
            DataTable dt3 = helper.queryProductUnit(month, year);

            foreach (DataRow item in dt3.Rows)
            {
                SaveOITSales(item, 3, 2, "Unit");
            }
            DataTable dt4 = helper.queryDistrictClinical(month, year);

            foreach (DataRow item in dt4.Rows)
            {
                SaveOITSales(item, 4, 1, "");
            }
        }

        private void SaveOITSales(DataRow item, int type, int TypeArea, string SubTypeName)
        {
            var NewDistrict = item["NewDistrict"].ToString();

            OITSales sales = null;

            if (type == 1)
            {
                sales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), NewDistrict), Expression.Eq(nameof(OITSales.TypeArea), 1));
            }
            if (type == 2 || type==3)
            {
                sales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), NewDistrict), Expression.Eq(nameof(OITSales.TypeArea), 2),Expression.Eq(nameof(OITSales.SubTypeName),SubTypeName));
            }
            if (type == 4)
            {
                sales = OITSales.FindFirst(Expression.Eq(nameof(OITSales.AreaName), NewDistrict), Expression.Eq(nameof(OITSales.TypeArea), 1), Expression.Eq(nameof(OITSales.ProductTypeName), item["Clinical"].ToString()));
            }
            if (sales ==null)
            {
                sales = new OITSales();
            }
            if (item["Year"] != DBNull.Value)
            {
                sales.Year = Convert.ToInt32(item["Year"]);
            }
            sales.AreaName = item["NewDistrict"].ToString();

            if (type == 1 || type == 4)
            {
                if (item["Region"] != DBNull.Value)
                {
                    sales.Region = item["Region"].ToString();
                }
            }
            sales.TypeName = item["OITSales"].ToString();

            if (item["1"] != DBNull.Value)
            {
                sales.M1 = Convert.ToDecimal(item["1"]);
            }
            if (item["2"] != DBNull.Value)
            {
                sales.M2 = Convert.ToDecimal(item["2"]);
            }
            if (item["3"] != DBNull.Value)
            {
                sales.M3 = Convert.ToDecimal(item["3"]);
            }
            if (item["4"] != DBNull.Value)
            {
                sales.M4 = Convert.ToDecimal(item["4"]);
            }
            if (item["5"] != DBNull.Value)
            {
                sales.M5 = Convert.ToDecimal(item["5"]);
            }
            if (item["6"] != DBNull.Value)
            {
                sales.M6 = Convert.ToDecimal(item["6"]);
            }

            if (item["7"] != DBNull.Value)
            {
                sales.M7 = Convert.ToDecimal(item["7"]);
            }
            if (item["8"] != DBNull.Value)
            {
                sales.M8 = Convert.ToDecimal(item["8"]);
            }
            if (item["9"] != DBNull.Value)
            {
                sales.M9 = Convert.ToDecimal(item["9"]);
            }

            if (item["10"] != DBNull.Value)
            {
                sales.M10 = Convert.ToDecimal(item["10"]);
            }
            if (item["11"] != DBNull.Value)
            {
                sales.M11 = Convert.ToDecimal(item["11"]);
            }
            if (item["12"] != DBNull.Value)
            {
                sales.M12 = Convert.ToDecimal(item["12"]);
            }
            sales.TypeArea = TypeArea;
            if (!string.IsNullOrEmpty(SubTypeName))
            {
                sales.SubTypeName = SubTypeName;
            }
            if (type == 4)
            {
                sales.ProductTypeName = item["Clinical"].ToString();
            }

            sales.Save();
        }

        void GenerateOOH()
        {
            int month = Context.Request["month"].ToInt(0);

            int year = Context.Request["year"].ToInt(0);

            var list = OOHTarget.FindAll(Expression.Eq(nameof(OOHTarget.Month), month), Expression.Eq(nameof(OOHTarget.Year), year));

            TransactionScope scope = new TransactionScope();

            try
            {

                if (list.Length > 0)
                {
                    ReportBatch batch = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year), Expression.Eq("TableTypeID", 2));

                    if (batch != null)
                    {
                        FailResut("已生成过报表");
                        return;
                    }
                    else {
                        batch = new ReportBatch();
                        batch.Month = month;
                        batch.Year = year;
                        batch.TableTypeID = 2;
                        batch.ImportID = Convert.ToInt32(list[0].ImportID);
                        batch.Save();
                    }

                   
                    foreach (var item in list)
                    {
                         OOHActual actual = new OOHActual();

                        actual.BatchID = batch.ID;
                        actual.Segment = item.Segment;
                        actual.Region = item.Region;
                        actual.SOff = item.SOff;
                        actual.ProvinceMapping = item.ProvinceMapping;
                        actual.SalesRepresentativeName = item.SalesRepresentativeName;
                        actual.WBSElement = item.WBSElement;
                        actual.ShipToName = item.ShipToName;
                        actual.Dealer = item.Dealer;
                        actual.OwnerName = item.OwnerName;
                        actual.Buyer = item.Buyer;

                        actual.SalesOrder = item.SalesOrder;
                        actual.Item = item.Item;
                        actual.Material = item.Material;
                        actual.Description = item.Description;
                        if (item.Qty>0)
                        {
                            actual.Qty = item.Qty;
                        }

                        actual.KUSD = item.KUSD;
                        actual.InventoryAging = item.InventoryAging;
                        actual.Invagingbucket = item.Invagingbucket;
                        actual.DelieryStatusPMG = item.DelieryStatusPMG;
                        actual.DelieryStatus = item.DelieryStatus;

                        actual.DSFA = item.DSFA;
                        actual.LogisticsSituation = item.LogisticsSituation;
                        actual.StatusUpdate = item.StatusUpdate;
                        actual.AreaMAPPING = item.AreaMAPPING;
                        actual.ProductMAPPING = item.ProductMAPPING;

                        actual.IsNinety = item.IsNinety; 
                        actual.COUNTOFF = item.COUNTOFF;
                        
                        actual.Year = item.Year;
                        actual.Month = item.Month;
                        actual.Save();
                    }

                    OOHTarget.DeleteAll();

                    scope.VoteCommit();
                    scope.Dispose();
                }
                SuccessResut("生成报表成功");
            }
            catch (Exception ex)
            {
                scope.VoteRollBack();
                scope.Dispose();
                FailResut("生成报表失败");
                return;
            }

           
        }

        void GenerateFCSTN2M()
        {
            int month = Context.Request["month"].ToInt(0);

            int year = Context.Request["year"].ToInt(0);

            var list = FCSTN2MTarget.FindAll(Expression.Eq(nameof(FCSTN2MTarget.Month), month), Expression.Eq(nameof(FCSTN2MTarget.Year), year));

            TransactionScope scope = new TransactionScope();

            try
            {

                if (list.Length > 0)
                {
                    ReportBatch batch = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year), Expression.Eq("TableTypeID",4));

                    if (batch != null)
                    {
                        FailResut("已生成过报表");
                        return;
                    }
                    else
                    {
                        batch = new ReportBatch();
                        batch.Month = month;
                        batch.Year = year;
                        batch.TableTypeID = 4;
                        batch.ImportID = Convert.ToInt32(list[0].ImportID);
                        batch.Save();

                    }

                   

                    foreach (var item in list)
                    {
                        FCSTN2MActual actual = new FCSTN2MActual();

                        actual.BatchID = batch.ID;
                        actual.Quantity = item.Quantity;
                        actual.OpportunityID = item.OpportunityID;
                        actual.OpportunityName = item.OpportunityName;
                        actual.AccountID = item.AccountID;
                        actual.AccountName = item.AccountName;
                        actual.Possibility = item.Possibility;
                        actual.Progress = item.Progress;
                        actual.Currency = item.Currency;
                        actual.TotalPrices = item.TotalPrices;
                        actual.ProductName = item.ProductName;
                        actual.BusinessDealerName = item.BusinessDealerName;
                        actual.BusinessOwner = item.BusinessOwner;
                        actual.ClinicalDesc = item.ClinicalDesc;
                        actual.Region = item.Region;
                        actual.Province = item.Province;
                        actual.Area = item.Area;
                        actual.OwnerRole = item.OwnerRole;

                        actual.ExpectedOrderDate = item.ExpectedOrderDate;
                        actual.AreaMAPPING = item.AreaMAPPING;
                        actual.ProductMAPPING = item.ProductMAPPING;
                        actual.ClinicalMAPPING = item.ClinicalMAPPING;
                        actual.Year = item.Year;
                        actual.Month = item.Month;
                        actual.Save();
                    }

                    FCSTN2MTarget.DeleteAll();

                    scope.VoteCommit();
                    scope.Dispose();
                }
                SuccessResut("生成报表成功");
            }
            catch(Exception ex)
            {
                scope.VoteRollBack();
                scope.Dispose();
                FailResut("生成报表失败");
                return;
            }
        }

        void GenerateFCSTCM()
        {
            int month = Context.Request["month"].ToInt(0);

            int year = Context.Request["year"].ToInt(0);

            var list = FCSTCMTarget.FindAll(Expression.Eq(nameof(FCSTCMTarget.Month), month), Expression.Eq(nameof(FCSTCMTarget.Year), year));

            TransactionScope scope = new TransactionScope();

            try
            {

                if (list.Length > 0)
                {
                      ReportBatch batch = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year), Expression.Eq("TableTypeID", 5));

                    if (batch != null)
                    {
                        FailResut("已生成过报表");
                        return;      
                    }
                    else {
                        batch = new ReportBatch();
                        batch.Month = month;
                        batch.Year = year;
                        batch.TableTypeID = 5;
                        batch.ImportID = Convert.ToInt32(list[0].ImportID);
                        batch.Save();
                    }
                    foreach (var item in list)
                    {
                        FCSTCMActual actual = new FCSTCMActual();

                        actual.BatchID = batch.ID;

                        actual.Quantity = item.Quantity;
                        actual.Region = item.Region;
                        actual.Province = item.Province;
                        actual.OwnerRole = item.OwnerRole;
                        actual.OpportunityID = item.OpportunityID;
                        actual.OpportunityName = item.OpportunityName;
                        actual.AccountID = item.AccountID;
                        actual.AccountName = item.AccountName;
                        actual.ProductName = item.ProductName;
                        actual.ExpectedOrderDate = item.ExpectedOrderDate;
                        actual.FunnelKUSD = item.FunnelKUSD;
                        actual.AreaMAPPING = item.AreaMAPPING;
                        actual.ProductMAPPING = item.ProductMAPPING;
                        actual.ClinicalMAPPING = item.ClinicalMAPPING;
                        actual.Year = item.Year;
                        actual.Month = item.Month;
                        actual.Save();
                    }

                    FunnelTarget.DeleteAll();

                    scope.VoteCommit();
                    scope.Dispose();
                }

                SuccessResut("生成报表成功");
            }
            catch(Exception ex)
            {
                scope.VoteRollBack();
                scope.Dispose();
                FailResut("生成报表失败");
            }

        }


        void GenerateFunnel()
        {
            int month = Context.Request["month"].ToInt(0);

            int year = Context.Request["year"].ToInt(0);

            TransactionScope scope = new TransactionScope();

            try
            {
                var list = FunnelTarget.FindAll(Expression.Eq(nameof(FunnelTarget.Month), month), Expression.Eq(nameof(FunnelTarget.Year), year));

                if (list.Length > 0)
                {
                    ReportBatch batch = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year), Expression.Eq("TableTypeID",3));

                    if (batch != null)
                    {
                        FailResut("已生成过报表");
                        return;
                    }
                    else
                    {
                        batch = new ReportBatch();
                        batch.Month = month;
                        batch.Year = year;
                        batch.TableTypeID = 3;
                        batch.ImportID = Convert.ToInt32(list[0].ImportID);
                        batch.Save();
                    }

                    foreach (var item in list)
                    {
                        FunnelActual actual = new FunnelActual();

                        actual.Quantity = item.Quantity;

                        actual.OpportunityID = item.OpportunityID;
                        actual.OpportunityName = item.OpportunityName;
                        actual.AccountID = item.AccountID;
                        actual.AccountName = item.AccountName;
                        actual.Possibility = item.Possibility;
                        actual.Progress = item.Progress;
                        actual.Province = item.Province;
                        actual.Currency = item.Currency;
                        actual.TotalPrices = Convert.ToDecimal(item.TotalPrices);
                        actual.ProductName = item.ProductName;
                        actual.BusinessDealerName = item.BusinessDealerName;
                        actual.BusinessOwner = item.BusinessOwner;
                        actual.OwnerRole = item.OwnerRole;
                        actual.ClinicalDesc = item.ClinicalDesc;
                        actual.Region = item.Region;
                        actual.Area = item.Area;
                        actual.ExpectedOrderDate = item.ExpectedOrderDate;
                        actual.IsDelete = false;
                        actual.AreaMAPPING = item.AreaMAPPING;
                        actual.ProductMAPPING = item.ProductMAPPING;
                        actual.ClinicalMAPPING = item.ClinicalMAPPING;
                        actual.ASP = item.ASP;
                        actual.Net = item.Net;
                        actual.FCST = item.FCST;
                        actual.Year = item.Year;
                        actual.Month = item.Month;
                        actual.Save();
                    }

                    FunnelTarget.DeleteAll();
                }

                scope.VoteCommit();
                scope.Dispose();
                SuccessResut("生成报表成功");
            }
            catch
            {
                scope.VoteRollBack();
                scope.Dispose();
                FailResut("生成报表失败");
                return;
            }         
        }

        void GenerateOrderYearMonth()
        {
            int month = Context.Request["month"].ToInt(0);

            int year = Context.Request["year"].ToInt(0);

            TransactionScope scope = new TransactionScope();

            try
            {
                var list = OrderYearMonthTarget.FindAll(Expression.Eq(nameof(FunnelTarget.Month), month), Expression.Eq(nameof(FunnelTarget.Year), year));

                if (list.Length > 0)
                {
                    ReportBatch batch = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year), Expression.Eq("TableTypeID",9));

                    if (batch != null)
                    {
                        FailResut("已生成过报表");
                        return;
                    }
                    else
                    {
                        batch = new ReportBatch();
                        batch.Month = month;
                        batch.Year = year;
                        batch.TableTypeID =9 ;
                        batch.ImportID = Convert.ToInt32(list[0].ImportID);
                        batch.Save();
                    }

                    #region OrderYearMonthActual 生成
                    foreach (var item in list)
                    {
                        OrderYearMonthActual model = new OrderYearMonthActual();

                        model.BatchID = batch.ID;
                        model.Comments = item.Comments;
                        model.Status = item.Status;
                        model.ORU = item.ORU;
                        model.ORU = item.ORU;
                        model.SAPORWBS = item.SAPORWBS;
                        model.OrderType = item.OrderType;
                        model.SOFONNo = item.SOFONNo;
                        model.ClientName = item.ClientName;
                        model.Department = item.Department;
                        model.Application = item.Application;
                        model.ProductName = item.ProductName;
                        model.SubtypeName = item.SubtypeName;

                        model.QTY = item.QTY;
                        model.SalesName = item.SalesName;
                        model.SmallArea = item.SmallArea;
                        model.Region = item.Region;
                        model.RegionalManager = item.RegionalManager;
                        model.DealerName = item.DealerName;

                        model.ContractBuyerName = item.ContractBuyerName;
                        model.ContractNo = item.ContractNo;                   
                        model.ContractAmountUSD = item.ContractAmountUSD;

                      model.ApplicationTrainingAmount = item.ApplicationTrainingAmount; 
                      model.ExtendedWarrantyAmount = item.ExtendedWarrantyAmount;
           
                      model.ExtendedWarrantyMonths = item.ExtendedWarrantyMonths;

                        model.NetPriceUSD = item.NetPriceUSD;

                        model.PaymentTerm = item.PaymentTerm;
                        model.OITMonth = item.OITMonth;
                        model.OA = item.OA;
                        model.OM = item.OM;
                        model.LocalDealerCommission = item.LocalDealerCommission;
                        model.CentralCommission = item.CentralCommission;
                        model.ApplicationTraining = item.ApplicationTraining;

                         model.LandingPlan = item.LandingPlan;
                        model.GroupTraining = item.GroupTraining;
                       model.ClinicalCourses = item.ClinicalCourses;
                       
                        model.OverseaTraining = item.OverseaTraining;
                        model.TenderFee = item.TenderFee;
                       
                       model.DetectionFee = item.DetectionFee;
                       
                        model.FinancialRisk = item.FinancialRisk;
                        model.Promote1 = item.Promote1;
                        model.Promote2 = item.Promote2;

                        model.Promote3 = item.Promote3;
                        model.Promote4 = item.Promote4;
                        model.Promote5 = item.Promote5;
                        model.SalesFirstDate = item.SalesFirstDate;
                        model.SalesFinallyDate = item.SalesFinallyDate;
                        model.OITDate = item.OITDate;
                        model.OITCycleTime = item.OITCycleTime;

                        model.OldSAPORWBS = item.OldSAPORWBS;

                        model.WBSChecking = item.CentralCommission;
                        model.xx = item.xx;
                        model.CountIn = item.CountIn;
                        model.Year = item.Year;
                        model.Month = item.Month;
                        model.Save();
                    }
                    #endregion

                    OrderYearMonthTarget.DeleteAll();
                }

                scope.VoteCommit();
                scope.Dispose();
                SuccessResut("生成报表成功");
            }
            catch
            {
                scope.VoteRollBack();
                scope.Dispose();
                FailResut("生成报表失败");
                return;
            }
        }

        void GenerateRealTime()
        {
            int month = Context.Request["month"].ToInt(0);

            int year = Context.Request["year"].ToInt(0);

            string rate = Context.Request["rate"];

            var orderyearmonthBatch = ReportBatch.Exists(Expression.Eq(nameof(ReportBatch.TableTypeID), 9), Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year));

            if (orderyearmonthBatch)
            {
                TransactionScope scop = new TransactionScope();
                try
                {
                    var list = RealTimeTarget.FindAll(Expression.Eq(nameof(RealTimeTarget.Month), month), Expression.Eq(nameof(RealTimeTarget.Year), year));

                    if (list.Length > 0)
                    {
                        ReportBatch batch = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.Year), year), Expression.Eq("TableTypeID", 10));

                        if (batch != null)
                        {
                            FailResut("已生成过报表");
                            return;
                        }
                        else
                        {
                            batch = new ReportBatch();
                            batch.Month = month;
                            batch.Year = year;
                            batch.TableTypeID = 10;
                            batch.ImportID = Convert.ToInt32(list[0].ImportID);
                            batch.Save();

                            #region RealTimeActual 生成
                            foreach (var item in list)
                            {
                                RealTimeActual model = new RealTimeActual();

                                model.BatchID = batch.ID;
                                model.Status = item.Status;
                                model.SystemReferenceNumber = item.SystemReferenceNumber;
                                model.ORU = item.ORU;
                                model.SONumber = item.SONumber;
                                model.SAPORWBS = item.SAPORWBS;
                                model.GIDate = item.GIDate;
                                model.SN = item.SN;
                                model.OrderType = item.OrderType;
                                model.SOFON = item.SOFON;
                                model.SalesName = item.SalesName;
                                model.SOFONTag = item.SOFONTag;

                                model.LastUserName = item.LastUserName;
                                model.PhilipsType = item.PhilipsType;
                                model.Province = item.Province;
                                model.City = item.City;
                                model.CustomerSysID = item.CustomerSysID;
                                model.BusinessID = item.BusinessID;

                                model.HandBusinessID = item.HandBusinessID;
                                model.ClinicSubdivide = item.ClinicSubdivide;
                                model.ProductName = item.ProductName;
                                model.SubtypeofName = item.SubtypeofName;
                                model.FirstDepartmentClassify = item.FirstDepartmentClassify;
                                model.SecondDepartmentClassify = item.SecondDepartmentClassify;
                                model.Quantity = item.Quantity;

                                model.RequestArrivalDate = item.RequestArrivalDate;
                                model.ExpectedInstallDate = item.Region;
                                model.SalesName = item.SalesName;
                                model.SmallArea = item.SmallArea;
                                model.Region = item.Region;
                                model.RegionalManager = item.RegionalManager;
                                model.DealerName = item.DealerName;
                                model.ContractBuyerName = item.ContractBuyerName;
                                model.ImportAgreementNo = item.ImportAgreementNo;
                                model.PurchaseOrderNo = item.PurchaseOrderNo;                               
                                model.ContractMoney = item.ContractMoney;
                               
                                model.WarrantyMoney = item.WarrantyMoney;                             
                                model.WarrantyYear = item.WarrantyYear;
                              
                               model.ContractNetPrice = item.ContractNetPrice;
                              
                               model.SystemMoneyUSD = item.SystemMoneyUSD;
                               model.WarrantyPriceUSD = item.WarrantyPriceUSD;
                                
                               model.WarrantyAgeLimit =item.WarrantyAgeLimit;

                              model.SystemRetainedProfits = item.SystemRetainedProfits;
                          
                               model.SpecialOfferConsult = item.SpecialOfferConsult;
                               model.SpecialOfferMoney = item.SpecialOfferMoney;
                                model.PayType = item.PayType;
                                model.OITMonth = item.OITMonth;
                                model.OA = item.OA;

                                model.GBS = item.GBS;
                                model.SceneTraining = item.SceneTraining;
                                model.TrainingRequired = item.TrainingRequired;
                                model.TrainingChoosable = item.TrainingChoosable;
                                model.ProductApplication = item.ProductApplication;
                                model.ApplicationRequired = item.ApplicationRequired;
                                model.ApplicationChoosable = item.ApplicationChoosable;
                                model.ClinicalTrainingPrice = item.ClinicalTrainingPrice;
                               
                                model.ClinicalCopies = item.ClinicalCopies;
                                model.TenderFee = item.TenderFee;
                                model.DetectionFee = item.DetectionFee;
                                model.LocalDealerCommission = item.LocalDealerCommission;
                               
                                model.CentralCommission = item.CentralCommission;
                                model.PromotionPlanFirst = item.PromotionPlanFirst;
                                model.PromotionPlanSecond = item.PromotionPlanSecond;
                                model.PromotionPlanThird = item.PromotionPlanThird;

                                model.PromotionPlanFourth = item.PromotionPlanFourth;
                                model.PromotionPlanFifth = item.PromotionPlanFifth;
                                model.SalesFirstDate = item.SalesFirstDate;
                                model.SalesFinallyDate = item.SalesFinallyDate;
                                model.ConfigurationDate = item.ConfigurationDate;
                                model.OITDate = item.OITDate;

                                model.OITCycleTime = item.OITCycleTime;
                                model.WhetherSolution = item.WhetherSolution;
                                model.QLABName = item.QLABName;
                                model.ThirdProductName = item.ThirdProductName;
                                model.CTP = item.CTP;
                                model.CTPPercent = item.CTPPercent;
                                model.DistributorNo = item.DistributorNo;

                                model.PactNo = item.PactNo;
                                model.SalesSapCode = item.SalesSapCode;
                                model.LastUserSapCode = item.LastUserSapCode;
                                model.PactBuyerSapCode = item.PactBuyerSapCode;
                                model.DistributorSapCode = item.DistributorSapCode;
                                model.Remark = item.Remark;
                                model.TieredPricing = item.TieredPricing;
                                model.WhetherPrivate = item.WhetherPrivate;
                                model.IsHTAUS = item.IsHTAUS;
                                model.Year = item.Year;
                                model.Month = item.Month;
                                model.Save();
                            }
                            #endregion

                            SaveBCIntegrate(list.ToList(),batch.ID);
                            SaveDiscountIntegrate(list.ToList(), batch.ID,rate);
                            SavePromotionIntegrate(list.ToList(), batch.ID);

                            RealTimeTarget.DeleteAll();
                        }

                        scop.VoteCommit();
                        scop.Dispose();
                        SuccessResut("生成成功");
                    }
                    else {
                        scop.VoteRollBack();
                        scop.Dispose();
                        FailResut("请先上传RealTime");
                    }
                 }
                catch (Exception ex)
                {
                    scop.VoteRollBack();
                    scop.Dispose();
                    FailResut("生成失败");
                    return;
                }

            } else
            {
                FailResut("请先生成OrderYearMonth报表");
            }
        }


        void IBQuery()
        {

            int month = Context.Request["month"].ToInt(0);

            int year = Context.Request["year"].ToInt(0);

            var batchInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.TableTypeID), 8),Expression.Eq(nameof(ReportBatch.Year),year),Expression.Eq(nameof(ReportBatch.Month),month));

            if (batchInfo!=null)
            {
                var result = ThreeRateProvince.FindAll(Expression.Eq(nameof(ThreeRateProvince.BatchID), batchInfo.ID.ToString()));

                SuccessResut(result);
            }
            else
            {
                var result = ThreeRateProvince.FindAll();

                SuccessResut(result);
            }
        }

        void ThreeRateDealerQuery()
        {
            int month = Context.Request["month"].ToInt(0);

            int year = Context.Request["year"].ToInt(0);

            var batchInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.TableTypeID), 8), Expression.Eq(nameof(ReportBatch.Year), year), Expression.Eq(nameof(ReportBatch.Month), month));

            if (batchInfo !=null)
            {
                var result = ThreeRateDealer.FindAll(Expression.Eq(nameof(ThreeRateDealer.BatchID), batchInfo.ID.ToString()));

                SuccessResut(result);
            }
            else {
                var result = ThreeRateDealer.FindAll();

                SuccessResut(result);
            }
        }

        void  ImportReport_Query()
        {
            int year = Context.Request["year"].ToInt(0);
            int month = Context.Request["month"].ToInt(0);

            ReportHelper helper = new ReportHelper();

            var dt = helper.TableReportImport();

            foreach (DataRow item in dt.Rows)
            {
                string tableName = item["TableName"].ToString();

               var importInfo=ImportFile.FindAll(Expression.Sql(" TableType like '%"+tableName+"%'"),Expression.Eq(nameof(ImportFile.Year), year), Expression.Eq(nameof(ImportFile.Month), month)).OrderByDescending(a=>a.CreateTime);

                if (importInfo.Count()>0)
                {
                    item["UploadTime"] = importInfo.First().CreateTime;
                    item["ImportID"] = importInfo.First().ID;
                }

                int ID = Convert.ToInt32(item["ID"]);

               var reportInfo=ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.Year), year), Expression.Eq(nameof(ReportBatch.Month), month), Expression.Eq(nameof(ReportBatch.TableTypeID), ID));

                if (reportInfo != null)
                {
                    item["IsGenerate"] = true;
                    item["BatchID"] = reportInfo.ID;
                }
                else {
                    item["IsGenerate"] = false;
                }
            }

            SuccessResut(dt);


        }

        void SaveDiscountIntegrate(List<RealTimeTarget> list, int batchID,string rate)
        {      

            foreach (var item in list)
            {
                DiscountIntegrate discount = new DiscountIntegrate();

                discount.BatchID = batchID;
                discount.SofonNumber = item.SOFON;
                discount.Region = item.Region;
                discount.Area = item.SmallArea;
                discount.HospitalName = item.LastUserName;
                discount.DealerName = item.DealerName;
                discount.Clinical = item.ClinicSubdivide;
                discount.Modality = item.ProductName;
                discount.SubtypeName = item.SubtypeofName;

                if (item.ORU.Contains("CN"))
                {
                    discount.Discount = item.SpecialOfferMoney * Convert.ToDecimal(rate);
                }
                else {
                    discount.Discount = item.SpecialOfferMoney;
                }
               
                discount.Qty = item.Quantity;

                var orderyear = OrderYearMonthActual.FindFirst(Expression.Eq("Year", item.Year),Expression.Eq("Month",item.Month),Expression.Eq(nameof(OrderYearMonthActual.SAPORWBS), item.SAPORWBS));

               if(orderyear != null)
                {
                    discount.NetPrice = orderyear.NetPriceUSD / 1000;
                }else
                {
                    discount.NetPrice = 0;
                }
                if (!string.IsNullOrEmpty(item.CTP))
                {
                    discount.CTP = Convert.ToDecimal(item.CTP);
                }
                else {
                    discount.CTP = 0;
                }
              
                discount.CTPPercent = item.CTPPercent;
                discount.OITMonth = item.OITDate;
                discount.Year = item.Year;
                discount.Month = item.Month;
                discount.Quarter = ((Convert.ToDateTime(item.OITDate).Month - 1) / 3 + 1);

                discount.Save();

            }
        }

        void SavePromotionIntegrate(List<RealTimeTarget> list, int batchID)
        {
            foreach (var item in list)
            {
                if (!string.IsNullOrEmpty(item.PromotionPlanFirst))
                {
                    var index = item.PromotionPlanFirst.IndexOf("计划");
                    SavePromotion(batchID,item, item.PromotionPlanFirst.Substring(0, index + 2).ToString());
                }
                else if (!string.IsNullOrEmpty(item.PromotionPlanSecond))
                {
                    var index = item.PromotionPlanSecond.IndexOf("计划");
                    SavePromotion(batchID,item, item.PromotionPlanSecond.Substring(0, index + 2).ToString());
                }
                else if (!string.IsNullOrEmpty(item.PromotionPlanThird))
                {
                    var index = item.PromotionPlanThird.IndexOf("计划");
                    SavePromotion(batchID,item, item.PromotionPlanThird.Substring(0, index + 2).ToString());
                }
                else if (!string.IsNullOrEmpty(item.PromotionPlanFourth))
                {
                    var index = item.PromotionPlanFourth.IndexOf("计划");
                    SavePromotion(batchID,item, item.PromotionPlanFourth.Substring(0, index + 2).ToString());
                }
                else if (!string.IsNullOrEmpty(item.PromotionPlanFifth))
                {
                    var index = item.PromotionPlanFifth.IndexOf("计划");
                    SavePromotion(batchID,item, item.PromotionPlanFifth.Substring(0, index + 2).ToString());
                }
                else {
                    SavePromotion(batchID,item, "");
                }
            }

        }

        private void SavePromotion(int batchID, RealTimeTarget item,string PromotionPlanName)
        {
            PromotionIntegrate promotion = new PromotionIntegrate();
            promotion.BatchID = batchID;
            promotion.Region = item.Region;
            promotion.Area = item.SmallArea;
            promotion.HospitalNameORDealer = item.LastUserName;
            promotion.System = item.ProductName;
            promotion.Segment = item.ClinicSubdivide;
            promotion.sofon = item.SOFON;
            promotion.OITMonth = item.OITDate;
            promotion.Qty = item.Quantity;
            promotion.Month = Convert.ToDateTime(item.OITDate).Month;
            promotion.Quarter = ((Convert.ToDateTime(item.OITDate).Month - 1) / 3 + 1).ToString();
            promotion.Year = item.Year;
            promotion.Month = item.Month;

            promotion.Promotion = PromotionPlanName;

            promotion.Save();
        }

        void SaveBCIntegrate(List<RealTimeTarget> list,int batchID)
        {

            foreach (var item in list)
            {
                BCIntegrate bc = new BCIntegrate();

                bc.BatchID = batchID;
                bc.SOFON = item.SOFON;
                bc.HospitalName = item.LastUserName;

                if (item.ClinicSubdivide == "VS" && item.SubtypeofName.ToLower().Contains("whc"))
                {
                    bc.Application = "WHC";
                } else {
                    bc.Application = "GI";
                }

                bc.Modality = item.ProductName;
                bc.Description = item.SubtypeofName;
                bc.QTY = item.Quantity;
                bc.Area = item.SmallArea;
                bc.Region = item.Region;
                bc.DealerName = item.DealerName;
                bc.BCLevel = item.TieredPricing;

                var orderyear = OrderYearMonthActual.FindFirst(Expression.Eq("Year", item.Year), Expression.Eq("Month", item.Month), Expression.Eq(nameof(OrderYearMonthActual.SAPORWBS), item.SAPORWBS)); 

                if (orderyear != null)
                {
                    bc.NetPrice = orderyear.NetPriceUSD / 1000;
                }

                bc.OITMonth = item.OITDate;
                bc.Year = item.Year;
                bc.Month = Convert.ToDateTime(item.OITDate).Month;

                //让利
                bc.SurrenderProfits = 0;

                if (item.WhetherPrivate == "否")
                {
                    bc.PublicORPrivate = "Public";
                }
                else if(item.WhetherPrivate=="是")
                {
                    bc.PublicORPrivate = "Private";
                }

                bc.Quarter= (Convert.ToDateTime(item.OITDate).Month - 1) / 3 + 1;
                bc.Save();

            }
        }

        void SaveOrderDetailTarget()
        {
            TargetHelper helper = new TargetHelper();

            helper.ExecuteStoredProcedure("", "procOderDetailTarget");
            
        }
        void SaveFunnelTarget()
        {
            TargetHelper helper = new TargetHelper();

            helper.ExecuteStoredProcedure("", "procFunnelTarget");
        }

        void SaveFCSTCMTarget()
        {
            TargetHelper helper = new TargetHelper();

            helper.ExecuteStoredProcedure("", "procFCSTCMTarget");
        }

        void SaveFCSTN2MTarget()
        {
            TargetHelper helper = new TargetHelper();

            helper.ExecuteStoredProcedure("", "procFCSTN2MTarget");
        }

        void SaveUserRegionMapping()
        {
            Action<UserRegionMapping> add = (a) =>
            {
                a.UserID = base.UserId;
            };
            JGOperItem<UserRegionMapping> jg = new JGOperItem<UserRegionMapping>(Context.Request, add, null, null);
            jg.DoDataAction();
            SuccessResut(jg.SaveT, "", "");
        }

        void DeleteOrderDetail()
        {
            int year = Context.Request["year"].ToInt(0);
            int month = Context.Request["month"].ToInt(0);
            int batchID = Context.Request["batchID"].ToInt(0);

            try
            {
                OrderDetailActual.DeleteAll(string.Format(" year={0} and month={1} and BatchID={2}", year, month,batchID));              

                ByDistrictInfo.DeleteAll(string.Format(" year={0} and month={1} and BatchID={2}", year, month,batchID));
                ByProductInfo.DeleteAll(string.Format(" year={0} and month={1} and BatchID={2}", year, month,batchID));
                ByDistrictClinicalInfo.DeleteAll(string.Format(" year={0} and month={1}  and BatchID={2}", year, month,batchID));
            }
            catch (Exception)
            {
                SuccessResut("删除成功");
            }

            SuccessResut("删除失败");

        }
        public void DeleteOOH()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);
                int batchID = Context.Request["batchID"].ToInt(0);

                OOHActual.DeleteAll(string.Format(" year={0} and month={1} and BatchID={3}", year, month,batchID));

                var ReportInfo=ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }
                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }

        public void DeleteFCSTCM()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);
                int batchID = Context.Request["batchID"].ToInt(0);

                FCSTCMActual.DeleteAll(string.Format(" year={0} and month={1} and BatchID={2}", year, month,batchID));

                var ReportInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }

                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }

        public void DeleteFunnel()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);
                int batchID = Context.Request["batchID"].ToInt(0);

                FunnelActual.DeleteAll(string.Format(" year={0} and month={1} and BatchID={2}", year, month,batchID));

                var ReportInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }

                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }
        public void DeleteFCSTN2M()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);
                int batchID = Context.Request["batchID"].ToInt(0);

                FCSTN2MActual.DeleteAll(string.Format(" year={0} and month={1} and BatchID={2}", year, month,batchID));

                var ReportInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }


                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }

        public void DeleteRealTime()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);
                int batchID = Context.Request["batchID"].ToInt(0);

                RealTimeActual.DeleteAll(string.Format(" Year={0} and Month={1} and BatchID={2}", year, month,batchID));
                BCIntegrate.DeleteAll(string.Format(" Year={0} and Month={1} and BatchID={2}", year, month, batchID));
                DiscountIntegrate.DeleteAll(string.Format(" Year={0} and Month={1} and BatchID={2}", year, month, batchID));
                PromotionIntegrate.DeleteAll(string.Format(" Year={0} and Month={1} and BatchID={2}", year, month, batchID));

                var ReportInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }

                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }

        public void DeleteOrderYearMonth()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);
                int batchID = Context.Request["batchID"].ToInt(0);

                OrderYearMonthActual.DeleteAll(string.Format(" Year={0} and Month={1} and BatchID={2}", year, month,batchID));

                var ReportInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }

                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }

        public void DeleteThreeRateDealer()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);

                int batchID = Context.Request["batchID"].ToInt(0);

                ThreeRateDealer.DeleteAll(string.Format(" Year={0} and Month={1} and BatchID={2}", year, month,batchID.ToString()));

                var ReportInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }


                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }
        public void DeleteRateProvince()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);

                int batchID = Context.Request["batchID"].ToInt(0);

                ThreeRateProvince.DeleteAll(string.Format(" Year={0} and Month={1} and BatchID={2}", year, month, batchID.ToString()));

                var ReportInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }

                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }

        public void DeleteIB()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);
                int batchID = Context.Request["batchID"].ToInt(0);

                IBInfo.DeleteAll(string.Format(" Year={0} and month={1} and BatchID={2}", year, month,batchID.ToString()));

                var ReportInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }

                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }

        public void DeleteFCSTAccuracy()
        {
            try
            {
                int year = Context.Request["year"].ToInt(0);
                int month = Context.Request["month"].ToInt(0);
                int batchID = Context.Request["batchID"].ToInt(0);

                FCSTAccuracy.DeleteAll(string.Format(" Year={0} and Month={1} and BatchID={2}", year, month, batchID));

                var ReportInfo = ReportBatch.FindFirst(Expression.Eq(nameof(ReportBatch.ID), batchID));

                if (ReportInfo != null)
                {
                    ReportInfo.Delete();
                }

                SuccessResut("删除成功");
            }
            catch (Exception)
            {

                SuccessResut("删除失败");
            }
        }

        void Test_Query()
        {
            ICriterion ic = GetNoDeleteEq();
            JqGridSearch<Test> search = new JqGridSearch<Test>(Context.Request, ic);
            var result = search.Search(base.NeedCount);
            if (base.Needforeignkey || base.NeedForeginValue)
            {
                List<ICriterion> list;
                foreach (var v in result.JsonArray)
                {
                    list = new List<ICriterion>();
                    list.Add(GetNoDeleteEq());
                    list.Add(GetEnableEq());
                    if (base.NeedForeginValue)
                    {
                        list.Add(Expression.Eq(nameof(TestType.ID), v.Type));
                    }
                    v.TestTypeSelect = TestType.FindAll(list.ToArray());
                    //-------以下是中间表------
                    list = new List<ICriterion>();
                    list.Add(Expression.Eq(nameof(Test_Type.TestTypeID), v.ID));
                    v.Test_TypeSelectList = Test_Type.FindAll(list.ToArray()).ToList().Select((a) => { return a.TestTypeID; }).ToList();
                    list = new List<ICriterion>();
                    list.Add(GetNoDeleteEq());
                    list.Add(GetEnableEq());
                    v.TestTypeList = TestType.FindAll(list.ToArray());
                }
            }
            SuccessGridResult(result);
        }

        void Test_Edit()
        {
            Action<Test> add = (a) =>
            {
                a.UserId = base.UserId;
            };
            List<string> fiter = new List<string>();
            fiter.Add("Noedit");
            fiter.Add("NoEdit1");
            JGOperItem<Test> jg = new JGOperItem<Test>(Context.Request, add, null, null, null, fiter, true);
            jg.DoDataAction();
            SuccessResut(jg.SaveT, "", "");
            if (jg.oper != "del")
            {
                List<int> co;
                Test_Type.DeleteAll("TestTypeID=" + jg.SaveT.ID);
                co = JsonConvert.DeserializeObject<List<int>>(Context.Request["Test_TypeSelectList"].ToStringNoNull("[]"));
                foreach (var v in co)
                {
                    try
                    {
                        Test_Type sc1 = new Test_Type()
                        {
                            TestTypeID = jg.SaveT.ID,
                            TestID = v,
                        };
                        sc1.Save();
                    }
                    catch { }
                }
            }
        }

        [Common.Object.Attribute.OperAOPAttribute(operlist =new string[1] { "add"})]
        private void Test_Upload()
        {
            var z = Context.Request.Files[0];
            Com.Utility.Upload.UploadFile v = new Com.Utility.Upload.UploadFile("~/Upload/ALL");
            var result = v.SaveUploadFile(z);
            if (result.Isload)
            {
                //如果需要压缩;
                //var path = System.IO.Path.GetDirectoryName(result.SaveFileName);
                //Thumbnail.ImageCutZoomSize(result.SaveFileName, path + " / thumb_" + result.SaveRelativeFileName, 35, 35);
                //result.SaveFileNamePath = " / Upload/Channel/" + "thumb_" + result.SaveRelativeFileName;
                SuccessResut(result, "", "");
            }
            else
            {
                FailResut(result.Error);
            }
        }




        
    }
}