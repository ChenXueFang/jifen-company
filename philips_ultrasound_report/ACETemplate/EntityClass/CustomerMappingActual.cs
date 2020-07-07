namespace EntityClass
{
// Business class CustomerMappingActual generated from CustomerMappingActual
// Anna [2020-01-02] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class CustomerMappingActual
	{
		#region Constructors
		public CustomerMappingActual()
		{
		}
		#endregion


		
																										    public override void Delete()
			{
					var n = CustomerMappingActual.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																} 
	// CustomerMappingActual

}

