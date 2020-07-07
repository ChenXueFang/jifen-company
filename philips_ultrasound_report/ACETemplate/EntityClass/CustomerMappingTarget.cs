namespace EntityClass
{
// Business class CustomerMappingTarget generated from CustomerMappingTarget
// Anna [2020-01-03] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class CustomerMappingTarget
	{
		#region Constructors
		public CustomerMappingTarget()
		{
		}
		#endregion


		
																										    public override void Delete()
			{
					var n = CustomerMappingTarget.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// CustomerMappingTarget

}

