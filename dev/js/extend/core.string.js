String.prototype.trim = function(){
	return this.replace(/^\s+|\s+$/g, '')
}

String.prototype.ltrim = function(){
	return this.replace(/^\s+/,'')
}

String.prototype.rtrim = function(){
	return this.replace(/\s+$/,'')
}

String.prototype.fullTrim = function(){
	return this.replace(/(?:(?:^|\n)\s+|\s+(?:$|\n))/g,'').replace(/\s+/g,' ')
}

String.prototype.byteLength = function(){

	var count = 0;
	for(var i=0;i<this.length;i++)
		if(this.charCodeAt(i) >= 00000000 && this.charCodeAt(i) <= 0x0000007F)
			count++
		else if(this.charCodeAt(i) >= 0x00000080 && this.charCodeAt(i) <= 0x000007FF)
			count += 2
		else if(this.charCodeAt(i) >= 0x00000800 && this.charCodeAt(i) <= 0x0000FFFF)
			count += 3
		else if(this.charCodeAt(i) >= 0x00010000 && this.charCodeAt(i) <= 0x001FFFFF)
			count += 4
	return count
}