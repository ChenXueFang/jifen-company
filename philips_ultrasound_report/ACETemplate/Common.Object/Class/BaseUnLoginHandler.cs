using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;

namespace Common.Object.Class
{
    public class BaseUnLoginHandler : BaseHandler
    {
        protected override bool HasPermission()
        {
            bool result = true;
            return result;
        }
    }
}
