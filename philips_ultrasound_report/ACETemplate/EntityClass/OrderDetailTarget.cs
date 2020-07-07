namespace EntityClass
{
    // Business class OrderDetailTarget generated from OrderDetailTarget
    // Anna [2019-12-18] Created

    using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
    public partial class OrderDetailTarget
    {
        #region Constructors
        public OrderDetailTarget()
        {
        }
        #endregion


        public string IsError { get; set; }

        public override void Delete()
        {
            var n = OrderDetailTarget.Find(ID);
            n.IsDelete = true;
            n.Update();
        }
    }
    // OrderDetailTarget

}

