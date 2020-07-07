namespace EntityClass
{
    // Business class TestType generated from TestType
    // uifull [2016-10-24] Created

    using System;

    public partial class TestType
    {
        #region Constructors
        public TestType()
        {
        }
        #endregion



        public override void Delete()
        {
            var n = TestType.Find(ID);
            n.IsDelete = true;
            n.Update();
        }
    }
    // TestType

}

