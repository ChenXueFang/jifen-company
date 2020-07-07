# AOP权限配置

   * 文件目录 Common.Object.Attribute 

        1. HttpRequestAOPLog 

            AOP请求设置记录

        2. OperAOPAttribute

            配置只能添加

            ```
            [Common.Object.Attribute.OperAOPAttribute(operlist =new string[1] { "add"})]
            private void Test_Upload()
            {
                
            }
            ```
        3. UserListRoleAttribute

            配置角色拥有可以执行


```
                [Common.Object.Attribute.UserListRole(type =Common.Object.Data.UserRoleType.BaseInfo)]
                private void Test_Upload()
                {
                    var z = Context.Request.Files[0];
                    Com.Utility.Upload.UploadFile v = new Com.Utility.Upload.UploadFile("~/Upload/ALL");
                    var result = v.SaveUploadFile(z);
                    if (result.Isload)
                    {
                        //如果需要压缩;
                        //var path = System.IO.Path.GetDirectoryName(result.SaveFileName);
                        //Thumbnail.ImageCutZoomSize(result.SaveFileName, path + " / thumb_" + result.SaveRelativeFileName, 35, 35);
                        //result.SaveFileNamePath = " / Upload/Channel/" + "thumb_" + result.SaveRelativeFileName;
                        SuccessResut(result, "", "");
                    }
                    else
                    {
                        FailResut(result.Error);
                    }
                }
```
        