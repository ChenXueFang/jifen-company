using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Object.Execption
{
    public class UserNotLoginExecption:Exception
    {
        public UserNotLoginExecption() :
            base("用户未登录"){
        }
        public UserNotLoginExecption(string msg) :
         base(msg)
        {
        }
    }
}
