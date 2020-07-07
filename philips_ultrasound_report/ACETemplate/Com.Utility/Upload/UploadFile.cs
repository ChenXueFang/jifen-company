using System;
using System.Collections.Generic;
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web;

namespace Com.Utility.Upload
{

    /// <summary>
    /// 
    /// </summary>
    public class UploadFile
    {
        public string[] fileExtensions = null;
        string AppDomainUploadPath = "";
        public UploadFile(string[] fileExtensions,string relativefilepath) {

            //创建目录

            if (!Directory.Exists(System.Web.HttpContext.Current.Server.MapPath(relativefilepath))) 
            {
                Directory.CreateDirectory(System.Web.HttpContext.Current.Server.MapPath(relativefilepath));
            }


            this.fileExtensions = fileExtensions;
            if (this.fileExtensions != null)
            {
                for(int i=0;i<this.fileExtensions.Length;i++)
                {
                    this.fileExtensions[i] = this.fileExtensions[i].ToUpper();
                }
            }
            AppDomainUploadPath = relativefilepath;
            }
        public UploadFile(string relativefilepath) :this(null, relativefilepath)
        {

        }
        public UploadFileSetting SaveUploadFile(HttpPostedFile file) {
            UploadFileSetting setting = new UploadFileSetting();

            
            setting.UploadFileName = file.FileName;
            string f = Path.GetExtension(file.FileName);
            if (f == null || f == "" || !ValitonFile(f))
            {
                setting.Isload = false;
                setting.Error = "扩展名不支持";
                return setting;
            }
            setSaveFileName(f, setting);
            file.SaveAs(setting.SaveFileName);
            setting.Isload = true;
            return setting;
        }



        public UploadFileSetting SaveUploadFile(string base64) {
            UploadFileSetting setting = new UploadFileSetting();

            string f = ".jpg";
    
            setSaveFileName(f, setting);

            base64 = base64.Substring(base64.IndexOf( ',')+1);
            byte[] arr = Convert.FromBase64String(base64);
            MemoryStream ms = new MemoryStream(arr, 0, arr.Length);
            Bitmap bmp = new Bitmap(ms);
            bmp.Save(setting.SaveFileName, ImageFormat.Jpeg);


            //  file.SaveAs(setting.SaveFileName);
            setting.Isload = true;
            return setting;
        }

        private void setSaveFileName(string fileExtension, UploadFileSetting setting)
        {

            string filename = DateTime.Now.ToString("yyMMddHHmmss") + fileExtension;
            setting.SaveRelativeFileName = filename;
            setting.SaveFileNamePath = Path.Combine(AppDomainUploadPath.Replace("~", ""), filename).Replace("\\\\", "/"); ; ;
            filename = Path.Combine(HttpContext.Current.Server.MapPath( AppDomainUploadPath), filename).Replace("\\\\","/");

            while (File.Exists(filename))
            {
                Random z = new Random(100);
                int r = z.Next(100);
                filename = DateTime.Now.ToString("yyMMddHHmmss") + r + fileExtension;

                setting.SaveRelativeFileName = filename;
                setting.SaveFileNamePath = Path.Combine(AppDomainUploadPath.Replace("~", ""), filename).Replace("\\\\", "/"); ; ;

                filename = Path.Combine(HttpContext.Current.Server.MapPath(AppDomainUploadPath), filename);
            }

            setting.SaveFileName = filename;

            //   setting.SaveFileName = filename;
            //  string fi = Path.GetFileNameWithoutExtension(filename);
            //  fi = Path.Combine(Path.GetDirectoryName(filename), fi);

            // return setting;


        }
        public bool ValitonFile(string fileExtension)
        {
            if (fileExtensions == null)
                return true;
            return Array.IndexOf(fileExtensions.ToArray(), fileExtension.ToUpper()) > -1;
            // return fileExtensions.Contains<string>(fileExtension);
        }
    }
}
