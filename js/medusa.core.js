"use strict"

window.medusa = {
	modules: [],
	root: '/js/',
	isLoad: function(name){
		for(var i=0;i<this.modules.length;i++)
			if(this.modules[i] == name)
				return true

		return false
	},
	load: function(path,success,error){
		var fileref = document.createElement('script')
		fileref.setAttribute("type","text/javascript")
		fileref.setAttribute("src", this.root + path)

		if(success) fileref.onload  = success
		if(error)   fileref.onerror = error

		document.getElementsByTagName("head")[0].appendChild(fileref)

		return this
	},
	register: function(obj){
		this.modules.push(obj)
		return this
	}
}