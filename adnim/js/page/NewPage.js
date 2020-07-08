$.jgrid.extend({
    initPagination: function (res) {
        this.each(function () {
            var me = this;
         
            $(me.p.pager).html("");
            //$(me.p.pager).find("#grid-pager_center").html("")
            //$(me.p.pager).find("#grid-pager_center").bootpag({
            $(me.p.pager).bootpag({
                total: parseInt(me.p.lastpage),
                page: me.p.page,
                record: me.p.records,
                rowNum: me.p.rowNum,
                rowList: me.p.rowList,
                maxVisible: 5,
                next: "下一页",
                prev:"上一页",
                leaps: false,
               // last: '→',
               // first: '←',
                firstLastUse: false,

            }).on("page", function (event, num) {
                $(me).trigger("reloadGrid", [{ page: num }])
            }).on("rowChange", function (event, num) {
                me.p.rowNum = num;
                $(me).trigger("reloadGrid", [{ page: 1 }])
            })

        })
    }
})