using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Utility.Safe
{
     public class Verification
    {
        public static string getVerificationCode()
        {
            Random R = new Random();
            return R.Next(100000, 999999).ToString();
        }
    }
}
