using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Net;
using System.Reflection;

using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Com.Utility
{
    public struct  sFileInfo
    {
        public string FileName;
        public DateTime FileWriteTime;
    }
   public static class Func
    {
       /// <summary>
       /// 时间戳
       /// </summary>
       /// <returns></returns>
       public static string GetTimeStamp()
       {
           TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
           return Convert.ToInt64(ts.TotalSeconds).ToString();
       }

       /// <summary>
       /// 时间戳
       /// </summary>
       /// <returns></returns>
       public static string GetYearTimeStamp()
       {
           TimeSpan ts = DateTime.UtcNow - new DateTime(1970, 1, 1, 0, 0, 0, 0);
           return DateTime.Now.ToString("yy")+ Convert.ToInt64(ts.TotalSeconds).ToString();
       }


       public static int RandomNum()
       {
           Random rd=new Random (1000);
           return rd.Next(100,999);
       }

       /// <summary>
       ///  生成随机卡号 起始默认12位
       /// </summary>
       /// <param name="len">长度</param>
       /// <param name="timeStamp"></param>
       /// <returns></returns>
       public static string RandomCardNo(int len = 2, bool timeStamp = true)
       {
           string Code = "";
           Random rnd = new Random(Guid.NewGuid().GetHashCode());

           char[] constant =
                {   
                    'A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T','U','V','W','X','Y'   
                };
           for (int i = 0; i < len; i++)
           {
               if (i == 0)
                   Code += constant[rnd.Next(10)];
               else
                   Code += constant[rnd.Next(22)];
           }
           
           if (timeStamp)
           {
               return Code + GetTimeStamp();
           }
           else
           {
               return Code;
           }
           
       }
       public static string RandomTimeCardNo()
       {
           return RandomCardNo(2,false)+DateTime.Now.ToString("yyMMddHHmmssfffffff");
       }

        /// <summary>
        /// 生成8位随机数（卡密）
        /// </summary>
        /// <param name="len"></param>
        /// <param name="pre"></param>
        /// <returns></returns>
        public static string RandomCardPwd(int len = 8, string pre = "")
        {
            string Code = "";
            Random rnd = new Random(Guid.NewGuid().GetHashCode());

            char[] constant =
                 {
                    '1','2','3','4','5','6','7','8','9'
                   
                };
            for (int i = 0; i < len; i++)
            {
                if (i == 0)
                    Code += constant[rnd.Next(5)];
                else
                    Code += constant[rnd.Next(9)];
            }
            return pre + Code;
        }

        public static string RandomCode(int len = 12, string pre = "")
        {
            string Code = "";
            Random rnd = new Random(Guid.NewGuid().GetHashCode());
            // 31=9+22
            char[] constant =
                {   
                    '1','2','3','4','5','6','7','8','9',  
                    //'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',   
                    //'a','b','c','d','e','f','g','h','j','k','n','p','q','r','s','t','u','v','w','x','y',   
                    'A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T','U','V','W','X','Y'   
                };
            for (int i = 0; i < len; i++)
            {
                if (i == 0)
                    Code += constant[rnd.Next(20)];
                else
                    Code += constant[rnd.Next(31)];
            }
            return pre + Code;
        }

        public static string RandomCode_old(int len = 12, string pre = "")
       {
           string Code = "";
           Random rnd = new Random(Guid.NewGuid().GetHashCode());

           char[] constant =
                {   
                    '0','1','2','3','4','5','6','7','8','9',  
                    //'a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z',   
                    'a','b','c','d','e','f','g','h','j','k','n','p','q','r','s','t','u','v','w','x','y',   
                    'A','B','C','D','E','F','G','H','J','K','M','N','P','Q','R','S','T','U','V','W','X','Y'   
                };
           for (int i = 0; i < len; i++)
           {
               if (i == 0)
                   Code += constant[rnd.Next(22)];
               else
                   Code += constant[rnd.Next(53)];
           }
           return pre + Code;
       }
        /// <summary>
        /// 获得枚举的text
        /// </summary>
        /// <param name="value"></param>
        /// <param name="nameInstead"></param>
        /// <returns></returns>
        public static string GetEnumDescription(Enum value, Boolean nameInstead = true)
        {
            Type type = value.GetType();
            string name = Enum.GetName(type, value);
            if (name == null)
            {
                return null;
            }
            FieldInfo field = type.GetField(name);
            DescriptionAttribute attribute = Attribute.GetCustomAttribute(field, typeof(DescriptionAttribute)) as DescriptionAttribute;
            if (attribute == null && nameInstead == true)
            {
                return name;
            }
            return attribute == null ? null : attribute.Description;
        }
       /// <summary>
       /// 截取字符串
       /// </summary>
       /// <param name="str">字符串</param>
       /// <param name="len">保留长度</param>
       /// <returns></returns>
       public static string SubString(string str,int len)
        {
            if (str.Length > len)
            {
                return str.Substring(0, len) + "...";
            }
            else
                return str;
            
        }

   

       public static void RenderToBrowser(MemoryStream ms, HttpContext context, string fileName)
       {
           if (context.Request.Browser.Browser == "IE")
               fileName = HttpUtility.UrlEncode(fileName);
           context.Response.AddHeader("Content-Disposition", "attachment;fileName=" + fileName);
           context.Response.BinaryWrite(ms.ToArray());
       }
       //public static void ExportExcel<T>(List<T> list, HttpContext context, string fileName)
       //{
       //    RenderToBrowser(RenderToExcel(list), context, fileName);
       //}


       //public static MemoryStream RenderToExcel<T>(List<T> list)
       //{
       //    DataTable table = ListToDataTable<T>(list);
       //    MemoryStream ms = new MemoryStream();

       //    using (table)
       //    {
       //        IWorkbook workbook = new HSSFWorkbook();
       //        {
       //            ISheet sheet = workbook.CreateSheet();
       //            {
       //                IRow headerRow = sheet.CreateRow(0);

       //                //handling header.
       //                foreach (DataColumn column in table.Columns)
       //                    headerRow.CreateCell(column.Ordinal).SetCellValue(column.Caption);
       //                //If Caption not set, returns the ColumnName value

       //                // handling value.
       //                int rowIndex = 1;

       //                foreach (DataRow row in table.Rows)
       //                {
       //                    IRow dataRow = sheet.CreateRow(rowIndex);

       //                    foreach (DataColumn column in table.Columns)
       //                    {
       //                        dataRow.CreateCell(column.Ordinal).SetCellValue(row[column].ToString());
       //                    }
       //                    rowIndex++;
       //                }

       //                workbook.Write(ms);
       //                ms.Flush();
       //                ms.Position = 0;
       //            }
       //            sheet = null;
       //        }
       //        workbook = null;
       //    }
       //    return ms;
       //}

       /// <summary>
       /// 将泛类型集合List类转换成DataTable
       /// </summary>
       /// <param name="list">泛类型集合</param>
       /// <returns></returns>
       public static DataTable ListToDataTable<T>(List<T> entitys)
       {
           //检查实体集合不能为空
           if (entitys == null || entitys.Count < 1)
           {
               throw new Exception("需转换的集合为空");
           }
           //取出第一个实体的所有Propertie
           Type entityType = entitys[0].GetType();
           PropertyInfo[] entityProperties = entityType.GetProperties();

           //生成DataTable的structure
           //生产代码中，应将生成的DataTable结构Cache起来，此处略
           DataTable dt = new DataTable();
           for (int i = 0; i < entityProperties.Length; i++)
           {
               //dt.Columns.Add(entityProperties[i].Name, entityProperties[i].PropertyType);
               dt.Columns.Add(entityProperties[i].Name);
           }
           //将所有entity添加到DataTable中
           foreach (object entity in entitys)
           {
               //检查所有的的实体都为同一类型
               if (entity.GetType() != entityType)
               {
                   throw new Exception("要转换的集合元素类型不一致");
               }
               object[] entityValues = new object[entityProperties.Length];
               for (int i = 0; i < entityProperties.Length; i++)
               {
                   entityValues[i] = entityProperties[i].GetValue(entity, null);
               }
               dt.Rows.Add(entityValues);
           }
           return dt;
       }

       public static string GetAddressIP()
       {
           ///获取本地的IP地址
            string AddressIP = string.Empty;
           foreach (IPAddress _IPAddress in Dns.GetHostEntry(Dns.GetHostName()).AddressList)
           {
               if (_IPAddress.AddressFamily.ToString() == "InterNetwork")
               {
                   AddressIP = _IPAddress.ToString();
               }
           }
           return AddressIP;
           //var ip = "";
           //if (Request.ServerVariables["HTTP_VIA"] != null) // using proxy
           //{
           //    ip = Context.Request.ServerVariables["HTTP_X_FORWARDED_FOR"].ToString();  // Return real client IP.
           //}
           //else// not using proxy or can't get the Client IP
           //{
           //    ip = Context.Request.ServerVariables["REMOTE_ADDR"].ToString(); //While it can't get the Client IP, it will return proxy IP.
           //}
           //return ip;
       }
      public static string GetClientIP()
      {
          ///获取本地的IP地址
          string AddressIP = string.Empty;
          foreach (IPAddress _IPAddress in Dns.GetHostEntry(Dns.GetHostName()).AddressList)
          {
              if (_IPAddress.AddressFamily.ToString() == "InterNetwork")
              {
                  AddressIP = _IPAddress.ToString();
              }
          }
          return AddressIP;
      }


      /// <summary>
      /// 取随机数 orderno
      /// </summary>
      /// <param name="length"></param>
      /// <returns></returns>
      public static string BuildRandomStr(int length)
      {
          Random rand = new Random(Guid.NewGuid().GetHashCode());

          int num = rand.Next();

          string str = num.ToString();

          if (str.Length > length)
          {
              str = str.Substring(0, length);
          }
          else if (str.Length < length)
          {
              int n = length - str.Length;
              while (n > 0&&str.Length<length)
              {
                  str=str.Insert(0, "0");
                  n--;
              }
          }

          return str;
      }


      #region 文件目录 按时间排序

       public static string  GetFoldFile_byUpdateTime(string path)
      {
           //Server.MapPath("~/")
          DirectoryInfo d = new DirectoryInfo(path);
          //根椐指定文件夹下的jpg文件数目，获取数组的长度 n     
           int n = d.GetFiles().Length;  
           
           //定义数组 并对数组进行赋值     
           sFileInfo[] ArrFiles = new sFileInfo[n];
           int i = 0; 
           foreach (FileInfo _f in d.GetFiles())
           {
               ArrFiles[i].FileName = _f.Name;
               ArrFiles[i].FileWriteTime = _f.LastWriteTime;     
               i++;        
           }
           //对数组根椐文件创建时间进行冒泡排序   
           sFileInfo FileInfoTemp;     
           for (int k = 0; k < n; k++)
           {
               for (int j = k + 1; j < n; j++)
               {
                   if (DateTime.Compare(ArrFiles[k].FileWriteTime, ArrFiles[j].FileWriteTime) < 0)
                   {
                       FileInfoTemp = ArrFiles[k];
                       ArrFiles[k] = ArrFiles[j];
                       ArrFiles[j] = FileInfoTemp;
                   }
               }
           }
           StringBuilder sb=new StringBuilder ();
           //显示文件      
           for (int j = 0; j <n ; j++  )
           {
               sb.Append("<br>文件名称:"+ArrFiles[j].FileName +" 更新时间:"+ArrFiles[j].FileWriteTime); 
           }
           return sb.ToString();
      }



      #endregion


      #region 获取指定文件夹下所有子目录及文件(树形)
      /**************************************** 
         * 函数名称：GetFoldAll(string Path) 
         * 功能说明：获取指定文件夹下所有子目录及文件(树形) 
         * 参    数：Path:详细路径 
         * 调用示列： 
         *           string strDirlist = Server.MapPath("templates");        
         *           this.Literal1.Text = EC.FileObj.GetFoldAll(strDirlist);   
        *****************************************/
      /// <summary> 
      /// 获取指定文件夹下所有子目录及文件 
      /// </summary> 
      /// <param name="Path">详细路径</param> 
      public static string GetFoldAll(string Path)
      {

          string str = "";
          DirectoryInfo thisOne = new DirectoryInfo(Path);
          str = ListTreeShow(thisOne, 0, str);
          return str;

      }

      /// <summary> 
      /// 获取指定文件夹下所有子目录及文件函数 
      /// </summary> 
      /// <param name="theDir">指定目录</param> 
      /// <param name="nLevel">默认起始值,调用时,一般为0</param> 
      /// <param name="Rn">用于迭加的传入值,一般为空</param> 
      /// <returns></returns> 
      public static string ListTreeShow(DirectoryInfo theDir, int nLevel, string Rn)//递归目录 文件 
      {
          DirectoryInfo[] subDirectories = theDir.GetDirectories();//获得目录 
          var excludeFolder = "App_Code,bower_components,fonts,Handle,img,jqueryUI,js,doc,images,Lib,Logs,myTest,QRcode,test,Upload,obj,Package,Properties,svn,.svn";
          string []arr=excludeFolder.Split(',');
          var skip = false;
          foreach (DirectoryInfo dirinfo in subDirectories)
          {
              skip = false;
              for (int i = 0; i < arr.Length; i++)
              {
                  if (dirinfo.Name==arr[i])
                  {
                      skip = true;
                      break;
                  }    
              }
              if (skip)
              {
                  continue;
              }

              if (nLevel == 0)
              {
                  Rn += "├";
              }
              else
              {
                  string _s = "";
                  for (int i = 1; i <= nLevel; i++)
                  {
                      _s += "│ ";
                  }
                  Rn += _s + "├";
              }
              Rn += "<b>" + dirinfo.Name.ToString() + "</b><br />";
              FileInfo[] fileInfo = dirinfo.GetFiles();   //目录下的文件 
              foreach (FileInfo fInfo in fileInfo)
              {
                  if (nLevel == 0)
                  {
                      Rn += "│ ├";
                  }
                  else
                  {
                      string _f = "";
                      for (int i = 1; i <= nLevel; i++)
                      {
                          _f += "│ ";
                      }
                      Rn += _f + "│ ├";
                  }
                  Rn += fInfo.Name.ToString()+"[addTime:("+fInfo.CreationTime+") writeTime:("+fInfo.LastWriteTime+")" + " <br />";
              }
              Rn = ListTreeShow(dirinfo, nLevel + 1, Rn);


          }
          return Rn;
      }

      public static string ListTreeShow_sort(DirectoryInfo theDir, int nLevel, string Rn)//递归目录 文件 
      {
          DirectoryInfo[] subDirectories = theDir.GetDirectories();//获得目录 
          var excludeFolder = "App_Code,bower_components,fonts,Handle,img,jqueryUI,js,doc,images,Lib,Logs,myTest,QRcode,test,Upload,obj,Package,Properties,svn,.svn";
          string[] arr = excludeFolder.Split(',');
          var skip = false;
          foreach (DirectoryInfo dirinfo in subDirectories)
          {
              skip = false;
              for (int i = 0; i < arr.Length; i++)
              {
                  if (dirinfo.Name == arr[i])
                  {
                      skip = true;
                      break;
                  }
              }
              if (skip)
              {
                  continue;
              }

              if (nLevel == 0)
              {
                  Rn += "├";
              }
              else
              {
                  string _s = "";
                  for (int i = 1; i <= nLevel; i++)
                  {
                      _s += "│ ";
                  }
                  Rn += _s + "├";
              }
              Rn += "<b>" + dirinfo.Name.ToString() + "</b><br />";
              FileInfo[] fileInfo = dirinfo.GetFiles();   //目录下的文件 
              foreach (FileInfo fInfo in fileInfo)
              {
                  if (nLevel == 0)
                  {
                      Rn += "│ ├";
                  }
                  else
                  {
                      string _f = "";
                      for (int i = 1; i <= nLevel; i++)
                      {
                          _f += "│ ";
                      }
                      Rn += _f + "│ ├";
                  }
                  Rn += fInfo.Name.ToString() + "[addTime:(" + fInfo.CreationTime + ") writeTime:(" + fInfo.LastWriteTime + ")" + " <br />";
              }
              Rn = ListTreeShow(dirinfo, nLevel + 1, Rn);


          }
          return Rn;
      }



      /**************************************** 
       * 函数名称：GetFoldAll(string Path) 
       * 功能说明：获取指定文件夹下所有子目录及文件(下拉框形) 
       * 参    数：Path:详细路径 
       * 调用示列： 
       *            string strDirlist = Server.MapPath("templates");       
       *            this.Literal2.Text = EC.FileObj.GetFoldAll(strDirlist,"tpl",""); 
      *****************************************/
      /// <summary> 
      /// 获取指定文件夹下所有子目录及文件(下拉框形) 
      /// </summary> 
      /// <param name="Path">详细路径</param> 
      ///<param name="DropName">下拉列表名称</param> 
      ///<param name="tplPath">默认选择模板名称</param> 
      public static string GetFoldAll(string Path, string DropName, string tplPath)
      {
          string strDrop = "<select name=\"" + DropName + "\" id=\"" + DropName + "\"><option value=\"\">--请选择详细模板--</option>";
          string str = "";
          DirectoryInfo thisOne = new DirectoryInfo(Path);
          str = ListTreeShow(thisOne, 0, str, tplPath);
          return strDrop + str + "</select>";

      }

      /// <summary> 
      /// 获取指定文件夹下所有子目录及文件函数 
      /// </summary> 
      /// <param name="theDir">指定目录</param> 
      /// <param name="nLevel">默认起始值,调用时,一般为0</param> 
      /// <param name="Rn">用于迭加的传入值,一般为空</param> 
      /// <param name="tplPath">默认选择模板名称</param> 
      /// <returns></returns> 
      public static string ListTreeShow(DirectoryInfo theDir, int nLevel, string Rn, string tplPath)//递归目录 文件 
      {
          DirectoryInfo[] subDirectories = theDir.GetDirectories();//获得目录 

          foreach (DirectoryInfo dirinfo in subDirectories)
          {

              Rn += "<option value=\"" + dirinfo.Name.ToString() + "\"";
              if (tplPath.ToLower() == dirinfo.Name.ToString().ToLower())
              {
                  Rn += " selected ";
              }
              Rn += ">";

              if (nLevel == 0)
              {
                  Rn += "┣";
              }
              else
              {
                  string _s = "";
                  for (int i = 1; i <= nLevel; i++)
                  {
                      _s += "│ ";
                  }
                  Rn += _s + "┣";
              }
              Rn += "" + dirinfo.Name.ToString() + "</option>";


              FileInfo[] fileInfo = dirinfo.GetFiles();   //目录下的文件 
              foreach (FileInfo fInfo in fileInfo)
              {
                  Rn += "<option value=\"" + dirinfo.Name.ToString() + "/" + fInfo.Name.ToString() + "\"";
                  if (tplPath.ToLower() == fInfo.Name.ToString().ToLower())
                  {
                      Rn += " selected ";
                  }
                  Rn += ">";

                  if (nLevel == 0)
                  {
                      Rn += "│ ├";
                  }
                  else
                  {
                      string _f = "";
                      for (int i = 1; i <= nLevel; i++)
                      {
                          _f += "│ ";
                      }
                      Rn += _f + "│ ├";
                  }
                  Rn += fInfo.Name.ToString() + "</option>";
              }
              Rn = ListTreeShow(dirinfo, nLevel + 1, Rn, tplPath);


          }
          return Rn;
      }
      #endregion 
      public static List<T> TableToEntity<T>(DataTable dt) where T : class,new()
      {
          Type type = typeof(T);
          List<T> list = new List<T>();

          foreach (DataRow row in dt.Rows)
          {
              PropertyInfo[] pArray = type.GetProperties();
              T entity = new T();
              foreach (PropertyInfo p in pArray)
              {
                  if (row[p.Name] is Int64)
                  {
                      p.SetValue(entity, Convert.ToInt32(row[p.Name]), null);
                      continue;
                  }
                  if (row[p.Name] is String)
                  {
                      p.SetValue(entity, row[p.Name].ToString(), null);
                      continue;
                      //if (row[p.Name]!=null)
                      //{
                      //}
                      
                  }
                  if (row[p.Name] != DBNull.Value)
                  p.SetValue(entity, row[p.Name], null);
              }
              list.Add(entity);
          }
          return list;
      }


        #region 图片base64的转换
        //图片转为base64编码的字符串
        //public static string ImgToBase64String(string Imagefilename)
        //{
        //    try
        //    {
        //        Bitmap bmp = new Bitmap(Imagefilename);

        //        MemoryStream ms = new MemoryStream();
        //        bmp.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
        //        byte[] arr = new byte[ms.Length];
        //        ms.Position = 0;
        //        ms.Read(arr, 0, (int)ms.Length);
        //        ms.Close();
        //        return Convert.ToBase64String(arr);
        //    }
        //    catch (Exception ex)
        //    {

        //        return null;
        //    }
        //}

        ////base64编码的字符串转为图片
        //public static Bitmap Base64StringToImage(string strbase64)
        //{
        //    try
        //    {
        //        byte[] arr = Convert.FromBase64String(strbase64);
        //        MemoryStream ms = new MemoryStream(arr);
        //        Bitmap bmp = new Bitmap(ms);

        //        bmp.Save(@"d:\test.jpg", System.Drawing.Imaging.ImageFormat.Jpeg);
        //        //bmp.Save(@"d:\"test.bmp", ImageFormat.Bmp);
        //        //bmp.Save(@"d:\"test.gif", ImageFormat.Gif);
        //        //bmp.Save(@"d:\"test.png", ImageFormat.Png);
        //        ms.Close();
        //        return bmp;
        //    }
        //    catch (Exception ex)
        //    {
        //        return null;
        //    }
        //}





        public static string ImgToBase64String(string Imagefilename)
        {
            try
            {
                Bitmap bmp = new Bitmap(Imagefilename);

                MemoryStream ms = new MemoryStream();
                bmp.Save(ms, System.Drawing.Imaging.ImageFormat.Jpeg);
                byte[] arr = new byte[ms.Length];
                ms.Position = 0;
                ms.Read(arr, 0, (int)ms.Length);
                ms.Close();
                return Convert.ToBase64String(arr);
            }
            catch (Exception ex)
            {
                return null;
            }
        }

        /// <summary>
        /// 
        /// </summary>
        /// <param name="strbase64"></param>
        /// <param name="FolderFilePath">相对路径</param>
        /// <returns></returns>
        //base64编码的字符串转为图片
        public static string Base64StringToImage(string strbase64,string FolderFilePath, string FileName)
        {
            try
            {
                //var all_FolderFilePath = AppDomain.CurrentDomain.BaseDirectory + FolderFilePath;
                //if (!System.IO.Directory.Exists(all_FolderFilePath))
                //{
                //    System.IO.Directory.CreateDirectory(all_FolderFilePath);
                //}

                string strFoloder = AppDomain.CurrentDomain.BaseDirectory  + FolderFilePath + "\\";
                if (!System.IO.Directory.Exists(strFoloder))
                {
                    System.IO.Directory.CreateDirectory(strFoloder);
                }
                //string all_FolderFilePath = HttpContext.Current.Server.MapPath(FolderFilePath);
                //System.IO.Directory.CreateDirectory(Server.MapPath("~") + "UploadAvatar");
                var savePath =  strFoloder + FileName;

                string temp = strbase64.Split(',')[1];
                temp = temp.Replace(" ", "+");
                int mod4 = temp.Length % 4;
                if (mod4 > 0)
                {
                    temp += new string('=', 4 - mod4);
                }
                var btsdata = Convert.FromBase64String(temp);
                //string uploadDir = Server.MapPath("/UploadAvatar/" + Guid.NewGuid().ToString("D") + ".jpg");
                //System.IO.Directory.CreateDirectory(Server.MapPath("~") + "UploadAvatar");
                using (Image img = Image.FromStream(new MemoryStream(btsdata)))
                {
                    //var savePath = AppDomain.CurrentDomain.BaseDirectory + FolderFilePath + FileName;
                    img.Save(savePath, ImageFormat.Png);
                    return FolderFilePath+FileName;
                }
               

                //byte[] arr = Convert.FromBase64String(strbase64);
                //using (MemoryStream ms = new MemoryStream(arr))
                //{
                //    Bitmap bmp = new Bitmap(ms);
                //    var savePath = AppDomain.CurrentDomain.BaseDirectory + FolderFilePath + FileName;
                //    //bmp.Save("test.jpg", System.Drawing.Imaging.ImageFormat.Jpeg);
                //    //bmp.Save("test.bmp", ImageFormat.Bmp);
                //    //bmp.Save("test.gif", ImageFormat.Gif);
                //    bmp.Save(savePath, ImageFormat.Png);
                //    ms.Close();
                //    return savePath;
                //}
            }
            catch (Exception ex)
            {
                return null;
            }
        }



        #endregion

    }
}
