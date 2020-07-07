namespace EntityClass
{
    // Business class V_OrderDetailTarget generated from V_OrderDetailTarget
    // Anna [2020-05-22] Created

    using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
    public partial class V_OrderDetailTarget
    {
        #region Constructors
        public V_OrderDetailTarget()
        {
        }
        #endregion



        public override void Delete()
        {
            var n = V_OrderDetailTarget.Find(ID);
            n.IsDelete = true;
            n.Update();
        }
    }



    // V_OrderDetailTarget

}

