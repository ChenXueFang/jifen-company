namespace EntityClass
{
    // Business class UserList generated from UserList
    // Anna [2020-06-12] Created

    using System;
    using System.ComponentModel;
    using Castle.ActiveRecord;
    using NHibernate.Criterion;
    using Newtonsoft.Json;
    [ActiveRecord("UserList")]
    public partial class UserList : ActiveRecordBase<UserList>
    {


        #region Private_Variables

        private int _id;
        private string _userName;
        private string _realName;
        private string _password;
        private int _userRoles;
        private DateTime _modifyDate;
        private string _email;
        private string _cellPhone;
        private string _jobTitle;
        private DateTime _createDate;
        private bool _statusId;

        #endregion

        #region Properties

        [PrimaryKey("ID", Access = PropertyAccess.NosetterLowercaseUnderscore)]
        public int ID
        {
            get { return _id; }
            set { _id = value; }
        }

        /// <summary>
        /// 2
        /// </summary>
        [Property("UserName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string UserName
        {
            get { return _userName; }
            set { _userName = value; }
        }

        [Property("RealName", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string RealName
        {
            get { return _realName; }
            set { _realName = value; }
        }

        [Property("Password", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true, Length = 50)]
        public string Password
        {
            get { return _password; }
            set { _password = value; }
        }

        [Property("UserRoles", Access = PropertyAccess.NosetterCamelcaseUnderscore)]
        public int UserRoles
        {
            get { return _userRoles; }
            set { _userRoles = value; }
        }

        [JsonConverter(typeof(DateTimeFormat))]

        [Property("ModifyDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, NotNull = true)]
        public DateTime ModifyDate
        {
            get { return _modifyDate; }
            set { _modifyDate = value; }
        }

        [Property("Email", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string Email
        {
            get { return _email; }
            set { _email = value; }
        }

        [Property("CellPhone", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string CellPhone
        {
            get { return _cellPhone; }
            set { _cellPhone = value; }
        }

        [Property("JobTitle", Access = PropertyAccess.NosetterCamelcaseUnderscore, Length = 50)]
        public string JobTitle
        {
            get { return _jobTitle; }
            set { _jobTitle = value; }
        }

        [JsonConverter(typeof(DateTimeFormat))]

        [Property("CreateDate", Access = PropertyAccess.NosetterCamelcaseUnderscore, Insert = false, NotNull = true)]
        public DateTime CreateDate
        {
            get { return _createDate; }
            set { _createDate = value; }
        }

        [Property("StatusId", Access = PropertyAccess.NosetterCamelcaseUnderscore, Insert = false, NotNull = true)]
        public bool StatusId
        {
            get { return _statusId; }
            set { _statusId = value; }
        }

        #endregion


        public static Int64 RecordCount(params ICriterion[] criteria)
        {
            return UserList.Count(criteria);
        }
    } // UserList

}


