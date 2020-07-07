using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Castle.ActiveRecord;

namespace Common.Object.admin
{
  public   class FCSTAccuracyExcel
    {
        [Property("Region")]
        public string Region { get; set; }

        [Property("Area")]
        public string Area { get; set; }

        [Property("District")]
        public string District { get; set; }
        [Property("FCST")]
        public string FCST { get; set; }

        [Property("ACT")]
        public string ACT { get; set; }

        [Property("Accuracy")]
        public string Accuracy { get; set; }

        [Property("Accuracy1")]
        public string Accuracy1 { get; set; }

        [Property("Accuracy2")]
        public string Accuracy2 { get; set; }

        [Property("Accuracy3")]
        public string Accuracy3 { get; set; }

        [Property("Accuracy4")]
        public string Accuracy4 { get; set; }

        [Property("Accuracy5")]
        public string Accuracy5 { get; set; }

        [Property("Accuracy6")]
        public string Accuracy6 { get; set; }

        [Property("Accuracy7")]
        public string Accuracy7 { get; set; }

        [Property("Accuracy8")]
        public string Accuracy8 { get; set; }

        [Property("Accuracy9")]
        public string Accuracy9 { get; set; }

        [Property("Accuracy10")]
        public string Accuracy10 { get; set; }

        [Property("Accuracy11")]
        public string Accuracy11 { get; set; }

        [Property("Accuracy12")]
        public string Accuracy12 { get; set; }
    }
}
