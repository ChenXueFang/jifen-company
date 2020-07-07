namespace EntityClass
{
// Business class AreaMappingActual generated from AreaMappingActual
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class AreaMappingActual
	{
		#region Constructors
		public AreaMappingActual()
		{
		}
		#endregion


		
																																																													    public override void Delete()
			{
					var n = AreaMappingActual.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// AreaMappingActual

}

