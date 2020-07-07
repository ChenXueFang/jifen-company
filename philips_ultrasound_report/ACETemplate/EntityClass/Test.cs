namespace EntityClass
{
// Business class Test generated from Test
// uifull [2019-05-10] Created

using System;
    using System.Collections.Generic;
    using NHibernate.Criterion;
	public partial class Test
	{
		#region Constructors
		public Test()
		{
		}
		#endregion


		
																								private TestType[] _TestTypeSelect;
			public TestType[] TestTypeSelect{
				get{return _TestTypeSelect;}
				set{_TestTypeSelect=value;}
			}
																					    public override void Delete()
			{
					var n = Test.Find(ID);
					n.IsDelete = true;
					n.Update();				
			}
																										private TestType[] _TestTypeList;
			public TestType[] TestTypeList{
				get{return _TestTypeList;}
				set{_TestTypeList=value;}
			}
						private List<int> _Test_TypeSelectList;
			public List<int> Test_TypeSelectList{
				get{return _Test_TypeSelectList;}
				set{_Test_TypeSelectList=value;}
			}

				} 

	

	// Test

}

