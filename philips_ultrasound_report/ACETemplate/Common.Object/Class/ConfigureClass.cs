using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Common.Utility;

namespace Common.Object.Class
{
    static public class ConfigureClass
    {
        /// <summary>
        /// 每页大小
        /// </summary>
        static public int PageSize
        {
            get
            {
                return ConfigHelper.GetConfigInt("PageSize");
            }
            //set;
        }

        /// <summary>
        /// 管理员会话关键词定义
        /// </summary>
        static public string SessionAdminString
        {
            get
            {
                return ConfigHelper.GetConfigString("SessionAdminString");
            }
            //set;
        }

        /// <summary>
        /// 用户会话关键词定义
        /// </summary>
        static public string SessionUserString
        {
            get
            {
                return ConfigHelper.GetConfigString("SessionUserString");
            }
            //set;
        }

        /// <summary>
        /// 操作符关键词定义
        /// </summary>
        static public string OperationTypeString
        {
            get
            {
                return ConfigHelper.GetConfigString("OperationTypeString");
            }
            //set;
        }


    }
}
