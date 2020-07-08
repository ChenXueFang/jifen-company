var OperItem= {
	AddOper: function(params) {

		var s = {
			oper: "add"
		}
		$.extend(params, s);
		return params;

	},
	EditOper:
	function(params) {
		var s = {
			oper: "edit"
		}
		$.extend(params, s);
		return  params;
	},
	DelOper: function(params) {
		var s = {
			oper: "del"
		}
		$.extend(params, s);
		return  params;
	}
}