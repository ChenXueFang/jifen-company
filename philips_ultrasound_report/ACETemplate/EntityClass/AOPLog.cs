namespace EntityClass
{
    // Business class AOPLog generated from AOPLog
    // uifull [2016-09-23] Created

    using System;
    using System.Threading.Tasks;
    public partial class AOPLog
	{
		#region Constructors
		public AOPLog()
		{
		}
        #endregion

        public  void SaveAsync()
        {
            Task task = Task.Factory.StartNew(()=> {
                try
                {
                    Save();
                }
                catch { }
                });
        }
    } // AOPLog

}

