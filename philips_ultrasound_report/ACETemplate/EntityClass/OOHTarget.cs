namespace EntityClass
{
// Business class OOHTarget generated from OOHTarget
// Anna [2020-04-28] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class OOHTarget
	{
		#region Constructors
		public OOHTarget()
		{
		}
		#endregion


		
																																																																																																																																																																																																																    public override void Delete()
			{
					var n = OOHTarget.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// OOHTarget

}

