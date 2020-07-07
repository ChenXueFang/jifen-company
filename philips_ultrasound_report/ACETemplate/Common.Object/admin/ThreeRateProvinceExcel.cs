using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.ActiveRecord;

namespace Common.Object.admin
{
  public   class ThreeRateProvinceExcel
    {
        [Property("Region")]
        public string Region { get; set; }

        [Property("Province")]
        public string Province { get; set; }

        [Property("L3WinRate")]
        public string L3WinRate { get; set; }

        [Property("L3Coverage")]
        public string L3Coverage { get; set; }

        [Property("L3Penetration")]
        public string L3Penetration { get; set; }

        [Property("L2WinRate")]
        public string L2WinRate { get; set; }

        [Property("L2Coverage")]
        public string L2Coverage { get; set; }

        [Property("L2Penetration")]
        public string L2Penetration { get; set; }

        [Property("L1Penetration")]
        public string L1Penetration { get; set; }

    }
}
