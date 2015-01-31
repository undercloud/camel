(function(w){
	"use strict"

	$(document).removeClass('no-js').addClass("js");

	$(document).ready(function(){
		if($.browser.msie && parseInt($.browser.version) == 8){

			var h5 = ['article','aside','audio','canvas','command','datalist','details','figcaption','figure','footer','header','hgroup','keygen','main','mark','menu','meter','nav','output','progress','rp','rt','ruby','section','source','summary','time','video','wbr']

			$.each(h5,function(i,v){
				document.createElement(v)
			})

			$(document.body).addClass('msie8')

			$(document).on('change','.medusa-checkbox-wrap input[type="checkbox"].medusa-checkbox,.medusa-toggle input[type="checkbox"].medusa-checkbox',function(){
				if(this.checked){
					this.setAttribute('checked','checked')
				}else{
					this.removeAttribute('checked')
				}
			})

			$(document).on('change','.medusa-radio-wrap input[type="radio"].medusa-radio',function(){
				var n = this.getAttribute('name');

				var a = [this];
				if(n)
					a = document.getElementsByName(n)

				if(0 == a.length)
					return;

				for(var i=0,l = a.length; i < l;i++){
					if(a[i].checked){
						a[i].setAttribute('checked','checked')
					}else{
						a[i].removeAttribute('checked')
					}
				}
			})
		}
	})

	//alert
	$(document).on('click','.medusa-alert .close',function(){
		var rem = $(this).closest('.medusa-alert')

		rem.fadeOut('medium',function(){
			rem.remove()
		})
	})

	//panels
	$(document).on('click','.medusa-panel .head.expand,.medusa-panel .head.collapse',function(){
		if($(this).hasClass('collapse'))
			$(this).removeClass('collapse').addClass('expand')
		else
			$(this).removeClass('expand').addClass('collapse')
	})

	//dropdown
	$(document).on('click','.medusa-button[data-dropdown],a[data-dropdown]', function(){
		var tag = $(this).attr('data-dropdown')
		if(!tag) retrun;

		var dd = $('.medusa-dropdown[data-dropdown="' + tag + '"]')
		if(!dd) return;

		//.css('left',this.offsetLeft + 'px')

		dd.addClass('active')
		/*.off('click')
		.on('click', function(){
			$(this).hide()
		})*/
	}).on('mouseup', function(e){
		var container = $(".medusa-dropdown");

		if(!container.is(e.target) && container.has(e.target).length === 0){
			container.removeClass('active');
		}
	})

	var keytimer = null;
	$(document).on('keyup paste cut','textarea[data-auto-grow]',function(){
		var thisis = this;

		var max = parseInt(thisis.getAttribute('data-auto-grow'))

		if(null != keytimer)
			clearInterval(keytimer)

		keytimer = setTimeout(function(){
			if(max && thisis.scrollHeight > max){
				thisis.style.overflowY = "auto";
				thisis.style.height = max + "px"
			}else{
				thisis.style.overflowY = 'hidden';
				thisis.style.height = 0;
				thisis.style.height = thisis.scrollHeight + 'px';
			}
		},300)
	})
}).call(this)
