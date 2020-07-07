namespace EntityClass
{
// Business class FCSTN2MTarget generated from FCSTN2MTarget
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class FCSTN2MTarget
	{
		#region Constructors
		public FCSTN2MTarget()
		{
		}
		#endregion


		
																																																																																																																																																															    public override void Delete()
			{
					var n = FCSTN2MTarget.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// FCSTN2MTarget

}

