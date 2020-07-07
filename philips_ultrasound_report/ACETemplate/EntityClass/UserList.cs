namespace EntityClass
{
// Business class UserList generated from UserList
// uifull [2016-06-24] Created

using System;

    [Serializable]

    public partial class UserList
	{
		#region Constructors
		public UserList()
		{
		}
        #endregion

        public string IBkey { get; set; }

        public string Promotion { get; set; }

        public string ThreeKey { get; set; }

        public string AreaKey { get; set; }

        public string ClinicalKey { get; set; }

        public string ProductKey { get; set; }


        public override void Delete()
        {
            try
            {
                var olderuser = UserList.Find(ID);
                olderuser.StatusId = true;
                olderuser.Update();
            }
            catch { }
        }
    } // UserList

}

