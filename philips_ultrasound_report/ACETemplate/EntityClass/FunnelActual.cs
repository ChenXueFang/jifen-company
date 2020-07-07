namespace EntityClass
{
// Business class FunnelActual generated from FunnelActual
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class FunnelActual
	{
		#region Constructors
		public FunnelActual()
		{
		}
		#endregion


		
																																																																																																																																																																																				    public override void Delete()
			{
					var n = FunnelActual.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// FunnelActual

}

