if (!Object.prototype.watch) {
	Object.defineProperty(Object.prototype, "watch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop, handler) {
			var
			  oldval = this[prop]
			, newval = oldval
			, getter = function () {
				return newval;
			}
			, setter = function (val) {
				oldval = newval;
				return newval = handler.call(this, prop, oldval, val);
			}
			;

			if (delete this[prop]) { // can't watch constants
				Object.defineProperty(this, prop, {
					  get: getter
					, set: setter
					, enumerable: true
					, configurable: true
				});
			}
		}
	});
}

// object.unwatch
if (!Object.prototype.unwatch) {
	Object.defineProperty(Object.prototype, "unwatch", {
		  enumerable: false
		, configurable: true
		, writable: false
		, value: function (prop) {
			var val = this[prop];
			delete this[prop]; // remove accessors
			this[prop] = val;
		}
	});
}

if(!Object.prototype.toJSON){
	Object.prototype.toJSON = function (obj){
		if(!obj)
			obj = this

		var t = typeof (obj)
		if(t != "object" || obj === null){
			if (t == "string") obj = '"'+obj+'"'
				return String(obj)
		}else{
			var n, v, json = [], arr = (obj && obj.constructor == Array)
			for (n in obj) {
				if(typeof obj[n] != "function"){
					v = obj[n]; t = typeof(v)
					if (t == "string") v = '"'+unescape(encodeURIComponent(v))+'"'
					else if (t == "object" && v !== null) v = Object.prototype.toJSON(v)
					json.push((arr ? "" : '"' + n + '":') + String(v))
				}
			}
			return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}")
		}
	}
}

if(!Object.prototype.fromJSON){
	Object.prototype.fromJSON = function(json){
		return eval('(' + json + ')')
	}
}

Object.clone = function (obj){
    if(obj == null || typeof(obj) != 'object')
        return obj;

    var temp = obj.constructor(); // changed

    for(var key in obj)
        temp[key] = Object.clone(obj[key]);
    return temp;
}