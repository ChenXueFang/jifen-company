namespace EntityClass
{
// Business class OOHActual generated from OOHActual
// Anna [2020-04-28] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class OOHActual
	{
		#region Constructors
		public OOHActual()
		{
		}
		#endregion


		
																																																																																																																																																																																																																    public override void Delete()
			{
					var n = OOHActual.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// OOHActual

}

