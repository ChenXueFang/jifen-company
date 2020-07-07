using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Object.Data
{
    [Flags]
    public enum UserRoleType
    {
        /// <summary>
        /// 会员管理
        /// </summary>
        User = 1,
        /// <summary>
                 /// 基础数据
                 ///  系统消息
                 ///   频道管理
                 /// 话题
                 ///  板块
                 ///  大师贴分类

        /// </summary>
        BaseInfo = 2,
        /// <summary>
        /// 数据发布  大师管理
        ///大师贴
        /// 新闻资讯管理
        ///活动发布

        /// </summary>
        Publishing = 4,


        /// <summary>
        /// 数据维护
        /// </summary>
        DataMaintain = 8
    }

}
