"use strict"

window.medusa = {
	modules: [],
	root: '/js/medusa/',
	isLoad: function(name){
		for(var i=0;i<this.modules.length;i++)
			if(this.modules[i] == name)
				return true

		return false;
	},
	loadJS: function(path,success,error){
		var fileref = document.createElement('script')
		fileref.setAttribute("type","text/javascript")
		fileref.setAttribute("src", this.root + path)

		if(success) fileref.onload  = success
		if(error)   fileref.onerror = error

		document.getElementsByTagName("head")[0].appendChild(fileref)

		return this;
	},
	loadCSS: function(path,success,error){
		var fileref = document.createElement('link')
		fileref.setAttribute("rel","stylesheet")
		fileref.setAttribute("type","text/css")
		fileref.setAttribute("href",filename)

		if(success) fileref.onload  = success
		if(error)   fileref.onerror = error

		document.getElementsByTagName("head")[0].appendChild(fileref)

		return this;
	},
	register: function(obj){
		this.modules.push(obj)
		return this;
	}
}
