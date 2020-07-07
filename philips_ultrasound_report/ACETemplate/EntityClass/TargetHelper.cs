using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.ApplicationBlocks.Data;
using System.Data;
using System.Data.SqlClient;

namespace EntityClass
{
  public   class TargetHelper
    {
        public void  ExecuteStoredProcedure(string detailsNo,string storeName)
        {
            SqlParameter para = new SqlParameter("@detailsNo", detailsNo);

            SqlHelper.ExecuteNonQuery(BaseItem.ConnectString, CommandType.StoredProcedure, storeName, para);
        }
    }
}
