using Castle.ActiveRecord;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Object.admin
{
   public  class AreaExcel
    {
        [Property("城市")]
        public string Name { get; set; }

        [Property("城市拼音")]
        public string Spell { get; set; }

        [Property("城市缩写")]
        public string Abbreviation { get; set; }

        [Property("地区")]
        public string Area { get; set; }

        [Property("包含地区")]
        public string CoverAreaName { get; set; }

        [Property("包含地区缩写")]
        public string CoverAreaAbbr { get; set; }

        [Property("系统分类")]
        public string SystemClassify { get; set; }
    }
}
