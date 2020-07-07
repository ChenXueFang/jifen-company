using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Com.Utility.Message
{
   public class SMSMessage
    {
        public SMSMessage()
        {
        }

        public Task SendMessageAsync(string mobile, string sms) {
            Action a=()=>{
                //发送邮件
            
            };
            Task t = new Task(a);
            t.Start();
            return t;
        }

    
    }
}
