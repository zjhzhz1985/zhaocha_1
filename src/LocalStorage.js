var LocalStorage = cc.Class.extend({
	ctor:function () {
	},
	getItem:function (key) {
		var val=cc.sys.localStorage.getItem("FD_"+key);
		if(val==null||val==""||val==undefined){
			return null;
		}else{
			return val;
		}
		
	},
	setItem:function (key,val) {
		cc.sys.localStorage.setItem("FD_"+key,val);
	}
});

LocalStorage.getInstance = function () {
	if (LocalStorage.sharedInstance == null) {
		LocalStorage.sharedInstance = new LocalStorage();
	}
	return LocalStorage.sharedInstance;
};