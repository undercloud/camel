function isset(){
	var a = arguments,
	l = a.length,
	i = 0,
	undef;

	if (l === 0)
		throw new Error('Empty isset');

	while(i !== l){
		if(a[i] === undef || a[i] === null)
			return false;
	  
		i++;
	}
	return true;
}

function isBool(mixed){
	return (mixed === true || mixed === false)
}

function isObject(mixed){
	if(Object.prototype.toString.call(mixed) === '[object Array]')
		return false
		
	return mixed !== null && typeof mixed === 'object';
}

function isArray(mixed){
	return Object.prototype.toString.call(mixed) === '[object Array]'
}

function isString(mixed){
	return (typeof mixed === 'string')
}

function isNull(mixed){
	return (mixed === null);
}

function isInt(mixed){
	return mixed === +mixed && isFinite(mixed) && !(mixed % 1)
}

function isFloat(mixed){
	return +mixed === mixed && (!isFinite(mixed) || !! (mixed % 1))
}

function isCallable(mixed){
	return (mixed instanceof Function)
}

function getType(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}