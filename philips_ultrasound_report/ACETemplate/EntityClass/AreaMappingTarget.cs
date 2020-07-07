namespace EntityClass
{
// Business class AreaMappingTarget generated from AreaMappingTarget
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class AreaMappingTarget
	{
		#region Constructors
		public AreaMappingTarget()
		{
		}
		#endregion


		
																																																													    public override void Delete()
			{
					var n = AreaMappingTarget.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// AreaMappingTarget

}

