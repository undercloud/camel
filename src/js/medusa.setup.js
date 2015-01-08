(function(global){
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
})(window)
