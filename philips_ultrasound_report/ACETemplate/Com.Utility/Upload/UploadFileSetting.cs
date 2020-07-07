using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Utility.Upload
{
   public  class UploadFileSetting
    {
        private string uploadFileName;
        private string saveFileName;
        private string saveFileNamePath;
        private string saveRelativeFileName;
        private int field;
        private bool isload;
        private string error;
    
        public string UploadFileName
        {
            get
            {
                return uploadFileName;
            }
      
            set
            {
                uploadFileName = value;
            }
        }
        /// <summary>
        /// 保存文件的路径
        /// </summary>
        public string SaveFileName
        {
            get
            {
                return saveFileName;
            }

            set
            {
                saveFileName = value;
            }
        }

        public string SaveFileNamePath
        {
            get
            {
                return saveFileNamePath;
            }

            set
            {
                saveFileNamePath = value;
            }
        }

        
        public bool Isload
        {
            get
            {
                return isload;
            }

            set
            {
                isload = value;
            }
        }

        public string Error
        {
            get
            {
                return error;
            }

            set
            {
                error = value;
            }
        }

        /// <summary>
        /// 保存的文件名称
        /// </summary>
        public string SaveRelativeFileName
        {
            get
            {
                return saveRelativeFileName;
            }

            set
            {
                saveRelativeFileName = value;
            }
        }

        
    }
}
