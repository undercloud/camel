(function(w){
	//document.body.className = document.body.className.replace("no-js","js");

	"use strict"

	$(document).ready(function(){
		if($.browser.msie && parseInt($.browser.version) == 8){
			$(document.body).addClass('msie8')

			$(document).on('change','.medusa-checkbox-wrap input[type="checkbox"].medusa-checkbox',function(){
				if($(this).is(':checked')){
					$(this).attr('checked','checked')
				}else{
					$(this).removeAttr('checked')
				}
			})

			$(document).on('change','.medusa-radio-wrap input[type="radio"].medusa-radio',function(){
				var n = $(this).attr('name');

				var a = [$(this)];
				if(n)
					a = $('input.medusa-radio[name="' + n + '"]')

				if(!a.length)
					return;

				for(var i=0,l = a.length; i < l;i++){
					if($(a[i]).is(':checked')){
						$(a[i]).attr('checked','checked')
					}else{
						$(a[i]).removeAttr('checked')
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

	//callouts
	$(document).on('click','.medusa-callouts .close',function(){
		var rem = $(this).closest('.medusa-callouts')

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

		dd.css('left',this.offsetLeft + 'px')
		.show()
		.off('click')
		.on('click', function(){
			$(this).hide()
		})
	}).on('mouseup', function(e){
		var container = $(".medusa-dropdown");

		if(!container.is(e.target) && container.has(e.target).length === 0){
			container.hide();
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
