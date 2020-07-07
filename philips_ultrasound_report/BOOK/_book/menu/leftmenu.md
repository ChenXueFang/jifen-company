# 左侧菜单配置

 文档为adnim/json/meun.json


```
    [
  {
    "Title": "管理菜单", //第一级菜单
    "Icon": "", //图标
    "Menu": [ //子菜单 
      {
        "ID": "UserList", //代表菜单ID,必须唯一
        "Url": "userlistgrid.aspx", //地址
        "Title": "用户中心",  //菜单名称
        "Roles": 1 //菜单角色权限 FLAGS 方式
      },
      {
        "ID": "AOPLog",
        "Url": "AOPLogGrid.aspx",
        "Title": "AOP 日志",
        "Roles": 1
      }

    ]
  },
  {
    "Title": "基础菜单2",
    "Icon": "icon-book",
    "Menu": [
      {
        "ID": "AOPLogeditMenu",
        "Url": "AOPLogedit.aspx",
        "Title": "AOP添加",
        "Roles": 3
      },
      {
        "ID": "Meun2",
        "Url": "userlist.html",
        "Title": "测试菜单",
        "Roles": 1
      }

    ]
  }


]
```
