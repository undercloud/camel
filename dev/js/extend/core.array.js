Array.prototype.clear = function(){
	this = []
	return this
}

Array.prototype.each = function(fn) {
	for(var i = 0, l = this.length; i < l; i++)
		fn(this,i)
}

Array.prototype.inArray = function(needle,strict){
	if(strict)	
		for(var i=0;i<this.length;i++) 
			if(this[i] === needle)
				return true
	else
		for(var i=0;i<this.length;i++)
			if(this[i] == needle)
				return true
	return false
}

Array.prototype.remove = function(value){
	for(var i = 0;i<this.length; i++){
		if(this[i] == value){
			this.splice(i,1)
			return i
		}
	}
	return false
}

Array.prototype.removeAll = function(value){
	for(var i = 0;i<this.length; i++){
		if(this[i] == value){
			this.splice(i,1)
			this.removeAll(value);
			return
		}
	}
}

Array.prototype.unique = function(){
	var u = {}, a = []
	for(var i = 0, l = this.length; i < l; ++i){
		if(u.hasOwnProperty(this[i]))
			continue
		a.push(this[i])
		u[this[i]] = 1
	}
	return a
}

Array.prototype.intersect = function(r){ 
	a = this.sort()
	b = r.sort()

	var ai=0, bi=0
	var result = []

	while(ai < a.length && bi < b.length){
		if(a[ai] < b[bi])
			ai++
		else if(a[ai] > b[bi])
			bi++
		else{
			result.push(a[ai])
			ai++
			bi++
		}
	}

	return result
}

Array.prototype.diff = function(r){
	var a=[], diff=[]
	for(var i=0;i<this.length;i++)
		a[this[i]] = true
	for(var i=0;i<r.length;i++)
		if(a[r[i]])
			delete a[r[i]]
	else 
		a[r[i]] = true
	for(var k in a)
		if(a.hasOwnProperty(k))
			diff.push(k)
	return diff
}

Array.prototype.merge = function(){
	var r = this
	for(var i=0;i<arguments.length;i++)
		r = r.concat(arguments[i])
	return r;
}

Array.prototype.first = function(){
	if(this.length)
		return this[0]
	return
}

Array.prototype.last = function(){
	if(this.length)
		return this[this.length-1]
	return	
}

Array.prototype.chunk = function(size){
	for(var x, i = 0, c = -1, l = this.length, n = []; i < l; i++)
		(x = i % size) ? n[c][x] = this[i] : n[++c] = [this[i]]

	return n
}

Array.prototype.shuffle = function(){
	var o = this
	for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);

	return o;
}

Array.prototype.replace = function(search,replace,strict){
	var a = this
	if(strict){
		for(var i=0; i<a.length;i++){
			if(a[i] === search){
				a.splice(i,1,replace)
				return a;
			}
		}
	}else{
		for(var i=0; i<a.length;i++){
			if(a[i] == search){
				a.splice(i,1,replace)
				return a;
			}
		}
	}

	return a
}

Array.prototype.replaceAll = function(search,replace,strict){
	var a = this
	if(strict){
		for(var i=0; i<a.length;i++){
			if(a[i] === search){
				a.splice(i,1,replace)
			}
		}
	}else{
		for(var i=0; i<a.length;i++){
			if(a[i] == search){
				a.splice(i,1,replace)
			}
		}
	}

	return a
}