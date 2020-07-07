
    serverurl="http://10.0.0.5/";
    //fronturl:"http://10.0.0.6/FrontApi.ashx?_op="
	
   // serverurl:  'http://192.168.1.73/',
   // fronturl:"handler/myhandler.ashx?_op=",
    loginurl="handler/information.ashx?_op="

api = {
    category: {
        url: "handler/information.ashx?_op=t_topiccategoryquery",
        query: function () {
            //获取ISENABLE

            var ttt = getSearch();
            ttt.rows = 10000;
            ttt.fiters.rulesAdd("IsEnabed", "=", true);
            var ss = getSearchParams(ttt);
            return ss;
        }
    }
    ,
    Message:{
       url: "handler/information.ashx?_op=t_Messagequerysystem",

    },
    channel:{
        url: "handler/information.ashx?_op=t_Channelquery",
        queryenable:function() {
            var ttt = getSearch();
            ttt.rows = 10000;
            ttt.fiters.rulesAdd("IsEnabled", "=", true);
            var ss = getSearchParams(ttt);
            return ss;
        }
    }
   ,
    News:{
        url: loginurl + "t_newsquery",
        query: function () {
            var ttt = getSearch();
            ttt.rows = 1;
            var ss = getSearchParams(ttt);
            return ss;
        }
           
    },
    Image: {
        url: loginurl + "t_AllPicInfo",
        query: function (RelationId, PicType) {
            var ttt = getSearch();
            ttt.rows = 1000;
            ttt.fiters.rulesAdd("RelationId", "=", RelationId);
            ttt.fiters.rulesAdd("PicType", "=", PicType);       
            var ss = getSearchParams(ttt);
            return ss;
        }
    },
    VideoType: {
        url: loginurl + "tvideotypequery",
        query: function () {
            var ttt = getSearch();
            ttt.rows = 1000
            ttt.sord = "desc";
            ttt.sidx = "Sort";

            return getSearchParams(ttt);
        }
    },
    Master: {
        url: loginurl + "tmastersquery",
        query: function () {
            var ttt = getSearch();
            ttt.rows = 1000

            
            return getSearchParams(ttt);
        }
    },
    messagebar: {
        url: loginurl + "getmessagelist",

        query: function (queryparams) {
            var ttt = getSearch();
            ttt.setRowAndPage(ttt, queryparams.rows, queryparams.page);
            ttt.fiters.rulesAdd("MessageType", "=", queryparams.custom.MessageType);
            queryparams.custom.minid = queryparams.custom.minid || 0;
            if (queryparams.custom.minid > 0) {

                ttt.fiters.rulesAdd("MessageID", "<", queryparams.custom.minid);

            }
            queryparams.custom.maxid = queryparams.custom.maxid || 0;
            if (queryparams.custom.maxid > 0) {

                ttt.fiters.rulesAdd("MessageID", ">", queryparams.custom.maxid);
            }

            var fiter = ttt.fiterget();
            fiter.groupOp = "OR";
            fiter.rulesAdd("FromUser", "=", queryparams.custom.FromUser);
            fiter.rulesAdd("ReceiveUser", "=", queryparams.custom.FromUser);
            var fiter1 = ttt.fiterget();
            fiter1.groupOp = "OR";
            fiter1.rulesAdd("FromUser", "=", queryparams.custom.ToUser);
            fiter1.rulesAdd("ReceiveUser", "=", queryparams.custom.ToUser);


            ttt.sord = "desc"
            ttt.sidx = "MessageID"

            ttt.needforeignkey = queryparams.custom.needforeignkey || ""

            ttt.groupsAdd(fiter);
            ttt.groupsAdd(fiter1);

            return ttt.ToParameter();

        },

        add: function (text,fromuser, touser) { //内容，用户，类型，方向 1 代
            var s = {
                MessageContent: text,
                FromUser: fromuser,
                ReceiveUser: touser,
                Direction:1,
                MessageType: 3,

            }
            return OperItem.AddOper(s);
            //

        },
        addurl: loginurl + "addmessageandnewmessage",
   
    }


}

