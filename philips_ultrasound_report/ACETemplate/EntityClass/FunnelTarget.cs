namespace EntityClass
{
// Business class FunnelTarget generated from FunnelTarget
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class FunnelTarget
	{
		#region Constructors
		public FunnelTarget()
		{
		}
		#endregion


		
																																																																																																																																																																																				    public override void Delete()
			{
					var n = FunnelTarget.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// FunnelTarget

}

