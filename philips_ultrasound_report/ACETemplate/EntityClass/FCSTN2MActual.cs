namespace EntityClass
{
// Business class FCSTN2MActual generated from FCSTN2MActual
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class FCSTN2MActual
	{
		#region Constructors
		public FCSTN2MActual()
		{
		}
		#endregion


		
																																																																																																																																																															    public override void Delete()
			{
					var n = FCSTN2MActual.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// FCSTN2MActual

}

