function getSearch(params) {
	function converttoeq(eq) {

		switch (eq) {
			case ">":
				return "gt";
			case "<":
				return "lt";
			case ">=":
				return "ge";
			case "<=":
				return "le";
			case "=":
				return "eq";
			case "like":
				return "cn";
			case "!=":
			    return "ne";
		    case "in":
		        return "in";


		}
	}
	var searchFiter = {
		rows: 1,
		page: 1,
		sord: "",
		sidx: "",
		_FiterList: "",
		_IsFiter: "",
		needforeignkey: "",
        needforeignvalue:"",
		fiters: {
			groupOp: "AND",
			groups: [],
			rules: [],
			rulesAdd: function(fitername, eq, value) {
				var s = {
					field: fitername,
					op: converttoeq(eq),
					data: value

				}
				this.rules.push(s);
			}
		},
			rulesAdd: function(fitername, eq, value) {
				var s = {
					field: fitername,
					op: converttoeq(eq),
					data: value

				}
				this.fiters.rules.push(s);
			},
		groupsAdd: function(fiter) {
			this.fiters.groups.push(fiter);

		},
		fiterget: function() {
			var s = {
				groupOp: "AND",
				groups: [],
				rules: [],
				rulesAdd: function(fitername, eq, value) {
					var s1 = {
						field: fitername,
						op: converttoeq(eq),
						data: value

					};
					this.rules.push(s1);
				}
			}
			return s;
		},
		setRowAndPage: function (searchFiter, rows, page) {

		    if (rows != null) {
		        searchFiter.rows = rows;
		    }
		    if (page != null)
		        searchFiter.page = page;

		},
	
		ToParameter:function(){
		        return getSearchParams(this);
		    },
		
        ///只带fliters
		toFilterGridParams: function () {

		    var s = {
		        filters: JSON.stringify(this.fiters),
		    }
		    if (this._FiterList != "") {
		        $.extend(s, { _FiterList: this._FiterList });
		    }
		    if (this._IsFiter != "")
		        $.extend(s, { _IsFiter: this._IsFiter });
		    return $.param(s);
		},
		toFilterGridParams1: function () {
		    var s = {
		        filters: JSON.stringify(this.fiters),
		    }
		    if (this._FiterList != "") {
		        $.extend(s, { _FiterList: this._FiterList });
		    }
		    if (this._IsFiter != "")
		        $.extend(s, { _IsFiter: this._IsFiter });
		    return s;
		}
        

	}

	if (params != null && params != undefined) {

	    return $.extend(searchFiter, params);
	}
	return searchFiter;

}

function getSearchParams(searchFiter) {

	var s = {
		rows: searchFiter.rows,
		page: searchFiter.page,
		sord: searchFiter.sord,
		sidx: searchFiter.sidx,
		filters: JSON.stringify(searchFiter.fiters),
		_search: true

	}
	if (searchFiter._FiterList != "") {
	    $.extend(s, { _FiterList: searchFiter._FiterList });
	}
	if (searchFiter._IsFiter != "")
	    $.extend(s, { _IsFiter: searchFiter._IsFiter });
	if (searchFiter.needforeignkey != "") {
	    $.extend(s, { foreignkey: searchFiter.needforeignkey });
	}
	if (searchFiter.needforeignvalue != "") {
	    $.extend(s, { foreignvalue: searchFiter.needforeignvalue });

	}
	return $.param(s);

}