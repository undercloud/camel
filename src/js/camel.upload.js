"use strict";
/*
<div class='camel-upload'>
	<div class='camel-upload-title'>Загрузить файл</div>
	<form>
		<input type='file' class='camel-upload-file'/>
	</form>
</div>

var api = {
	setData : function(data){},
	convertSize: function(size){},
	checkSize: function(size){},
	checkExtension: function(name){},
	abort: function(){},
	abort: function(i){},
	clear: function(){},
	upload: function(index ? null){}
}

var api = new camel.upload(
	$('input[type=file]'),
	{
		dragarea: $('.file-upload-fileslist'),
		dragenter: function(e){},
		dragover: function(e){},
		dragleave: function(e){},
		drop: function(e){},
		maxsize: 5 * 1024 * 1024,
		autoupload: true,
		extension: ['jpg','png','gif'],
		select: function(api,files){},
		begin: function(mode,file){},
		success: function(i,data){},
		error : function(i,e){},
		progress: function(i,value, total){},
	}
)
*/

if(typeof camel == 'undefined')
	var camel = {}

camel.upload = function(target,options){

	if(!options) options = {}
	if(!options.maxsize) options.maxsize = 2 * 1024 * 1024

	var FileTooLarge     = function(){}
	var FileBadExtension = function(){}
	var UploadAborted    = function(){}

	var api = {
		mode: null,
		files: null,
		setData : function(data){
			this.data = data
		},
		droppable: function(dragarea){
			dragarea.bind({
				dragenter: function(e) {
					if(typeof options.dragenter == 'function')
						options.dragenter(e)
					return false;
				},
				dragover: function(e) {
					if(typeof options.dragover == 'function')
						options.dragover(e)
					return false;
				},
				dragleave: function(e) {
					if(typeof options.dragleave == 'function')
						options.dragleave(e)
					return false;
				},
				drop: function(e) {
					if(typeof options.drop == 'function')
						options.drop(e)

					if(typeof e.originalEvent.dataTransfer.files != 'undefined')
						$(target)[0].files = e.originalEvent.dataTransfer.files;

					return false;
				}
			});
		},
		obj2uri : function(request , inKey){
			if(!inKey) inKey = '';
			var inline = [];
			for(var key in request)
				if(typeof(request[key]) != 'object')
					if(inKey != '')
						inline.push(inKey+'['+key+"]="+encodeURIComponent(request[key]));
					else
						inline.push(key+"="+encodeURIComponent(request[key]));
				else
					if(inKey!='')
						inline.push(this.obj2uri(request[key] , inKey+'['+key+']'));
					else
						inline.push(this.obj2uri(request[key] , key));

			return inline.join('&');
		},
		obj2formData : function r(formdata,data,inkey){
			if(!inkey) inkey = '';

			for(var x in data){
				if(data.hasOwnProperty(x)){
					if(typeof data[x] == 'object'){
						this.obj2formData(formdata,data[x],inkey ? inkey+"["+x+"]": x)
					}else{
						formdata[inkey ? inkey+"["+x+"]": x] = data[x]
					}
				}
			}
		},
		convertSize: function(size){
			var i = Math.floor(Math.log(size) / Math.log(1024));
    		return (size / Math.pow(1024, i)).toFixed(2) * 1 + ' ' + ['B', 'kB', 'MB', 'GB', 'TB'][i];
		},
		checkSize: function(size){
			if(typeof options.maxsize != 'undefined')
				return (size > options.maxsize)
			return true;
		},
		checkExtension: function(name){
			if(typeof options.extension != 'object')
				return true;

			return RegExp('\.('+options.extension.join('|')+')$','i').test(name)
		},
		xhrs: [],
		load5 : function(list,n){
			for(var i=0;i<list.length;i++){
				if(n != null && n != i)
					continue;

				if(this.checkSize(list[i].size)){
					if(typeof options.error == 'function')
						options.error(i,new FileTooLarge())
				}else if(this.checkExtension(list[i].name) == false){
					if(typeof options.error == 'function')
						options.error(i, new FileBadExtension())
				}else{
					var formdata = new FormData();
					formdata.append($(this.files).attr('name'), list[i]);

					var plaindata = {};
					this.obj2formData(plaindata,this.data)
					for(var x in plaindata)
						if(plaindata.hasOwnProperty(x))
							formdata.append(x,plaindata[x])

					var url = $(this.files).closest("form").attr('action');

					var xhr = $.ajax({
						url: url,
						type: 'POST',
						data: formdata,
						cache: false,
						contentType: false,
						processData: false,
						iteration: i,
						xhr: function() {
							var thisis = this
							var myXhr = $.ajaxSettings.xhr();
							if(myXhr.upload){
								myXhr.upload.addEventListener('progress',function(e){
									if(e.lengthComputable && typeof options.progress == 'function')
										options.progress(thisis.iteration,e.loaded,e.total);

								}, false)
							}
							return myXhr;
						},
						beforeSend: function(){
							if(typeof options.begin == 'function')
								options.begin(this.iteration,api.mode)
						},
						success: function(data){
							if(typeof options.success == 'function')
								options.success(this.iteration,data)
						},
						error: function(xhr){
							if(typeof options.error == 'function'){
								if (xhr.status === 0) {
									if (xhr.statusText === 'abort')
										options.error(0, new UploadAborted())
								}else{
									options.error(this.iteration,xhr)
								}

							}
						}
					});
					this.xhrs.push(xhr)
				}
			}
		},
		iframe : function(file){
			if(this.checkExtension(file.val()) == false){
				if(typeof options.error == 'function'){
					options.error(0, new FileBadExtension())
				}
			}

			var uniqid = "frame" + new Date().getTime()
			this.iframe_handle = $('<iframe name="'+uniqid+'" id="'+uniqid+'" style="display:none" />');

            $("body").append(this.iframe_handle);

            var url = $(this.files).closest("form").attr('action');

            var form = $(file).closest("form");

            form.attr("target", uniqid);

            var plaindata = {};
            var remove_handles = [];0
			this.obj2formData(plaindata,this.data)
			for(var x in plaindata)
				if(plaindata.hasOwnProperty(x)){
					var el = $('<textarea style="display:none" name="'+x+'">'+plaindata[x]+'</textarea>')
					form.append(el)
					remove_handles.push(el)
				}

            form.submit();

            for(var x = 0;x < remove_handles.length;x++)
            	remove_handles[x].remove()

            this.iframe_handle.load(function(e) {
				try{
					var response = $(this)[0].contentWindow.document.body.innerHTML
					if(typeof options.success == 'function')
						options.success(0,response)
				}catch(e){
					if(typeof options.error == 'function')
						options.error(0,e)
				}finally{
					$('#'+uniqid).remove();
				}
            })

            return false;
		},
		clear: function(){
			$(this.files).closest("form")[0].reset()
		},
		abort: function(i){
			if(this.mode == 'ajax'){
				if(typeof i != 'undefined')
					this.xhrs[i].abort()
				else{
					for(var i=0;i<this.xhrs.length;i++){
						this.xhrs[i].abort();
					}
				}
			}else if(this.mode == 'iframe'){
				$(this.iframe_handle).remove();
				if(typeof options.error == 'function'){
					options.error(0, new UploadAborted())
				}
			}
		},
		upload : function(n){
			if(false && window.File && window.FileList && window.FormData){
				this.mode = 'ajax'
				this.load5(this.files[0].files,n)
			}else{
				this.mode = 'iframe'

				if(typeof options.begin == 'function')
					options.begin(0,this.mode)

				this.iframe(this.files)
			}
		}
	}

	if(typeof options.dragarea != 'undefined')
		api.droppable(options.dragarea)

	$(target).get(0).onchange = function(e){
		api.files = $(this)

		if(typeof options.select == 'function'){
			var formatted = [];
			if(typeof $(this).get(0).files != 'undefined'){
				for(var i=0;i<$(this).get(0).files.length;i++){
					formatted.push({
						"name" : $(api.files)[0].files[i].name,
						"size" : $(api.files)[0].files[i].size
					})
				}
			}else{
				formatted.push({
					"name" : $(api.files).val().replace(/^.*[\\\/]/, '')
				})
			}

			options.select(api,formatted)
		}

		if(typeof options.autoupload != 'undefined' && options.autoupload === true)
			api.upload()
	}

	return api;
}

if(typeof camel.register != 'undefined')
	camel.register('upload')
