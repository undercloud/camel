(function(w){
	"use strict"

	$(document).ready(function(){
		if($.browser.msie && parseInt($.browser.version) == 8)
			$(document.body).addClass('msie8')
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

	//dropdown
	$(document).on('click','.medusa-button[dropdown],a[dropdown]', function(){
		var dd = $(this).next();

		if(dd.hasClass('medusa-dropdown'))
			dd.css('left',this.offsetLeft + 'px')
			.show()
			.off('click')
			.on('click', function(){
				$(this).hide()
			})
	})

	var keytimer = null;
	$(document).on('keyup paste cut','textarea[data-auto-grow]',function(){
		/*var text = $(this)[0]
		var max = parseInt($(this).attr('data-auto-grow'))

		var adjustedHeight = text.clientHeight;

		if(!max || max > adjustedHeight){
			adjustedHeight = Math.max(text.scrollHeight, adjustedHeight)

		if(max)
			adjustedHeight = Math.min(max, adjustedHeight)

		text.style.height = 0;
		if(adjustedHeight > text.clientHeight)
			text.style.height = adjustedHeight + "px";
		}*/

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
