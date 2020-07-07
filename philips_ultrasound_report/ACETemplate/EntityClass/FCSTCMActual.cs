namespace EntityClass
{
// Business class FCSTCMActual generated from FCSTCMActual
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class FCSTCMActual
	{
		#region Constructors
		public FCSTCMActual()
		{
		}
		#endregion


		
																																																																																																														    public override void Delete()
			{
					var n = FCSTCMActual.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// FCSTCMActual

}

