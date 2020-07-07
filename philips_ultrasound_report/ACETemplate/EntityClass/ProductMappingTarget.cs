namespace EntityClass
{
// Business class ProductMappingTarget generated from ProductMappingTarget
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class ProductMappingTarget
	{
		#region Constructors
		public ProductMappingTarget()
		{
		}
		#endregion


		
																										    public override void Delete()
			{
					var n = ProductMappingTarget.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// ProductMappingTarget

}

