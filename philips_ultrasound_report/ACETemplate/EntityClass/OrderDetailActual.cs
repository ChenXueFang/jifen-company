namespace EntityClass
{
// Business class OrderDetailActual generated from OrderDetailActual
// Anna [2019-12-18] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class OrderDetailActual
	{
		#region Constructors
		public OrderDetailActual()
		{
		}
		#endregion


		
																																																																																																																																																																																																																																																																																																																									    public override void Delete()
			{
					var n = OrderDetailActual.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// OrderDetailActual

}

