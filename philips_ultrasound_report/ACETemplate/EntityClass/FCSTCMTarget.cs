namespace EntityClass
{
// Business class FCSTCMTarget generated from FCSTCMTarget
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class FCSTCMTarget
	{
		#region Constructors
		public FCSTCMTarget()
		{
		}
		#endregion


		
																																																																																																														    public override void Delete()
			{
					var n = FCSTCMTarget.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// FCSTCMTarget

}

