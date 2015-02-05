/*
	<dl id='collapse'>
		<dt href='#one' url='/url/to/load'>First Header</dt>
		<dd id='one'></dd>
		<dt href='#two'>Second Header</dt>
		<dd id='two'></dd>
	</dl>

	api = new camel.collapse(
		$('#collapse'),
		{
			selected: 3,
			height: 300,
			collapse: true,
			ajax: function(i,id){
				console.log(i,id)
			},
			onSelect: function(i,id){
				console.log(i,id)
			}
		}
	)

	api = {
		selected: function(){}
		select: function(i){}
	}
*/
(function(global,$){
	"use strict"

	if(typeof global.camel == 'undefined')
		global.camel = {}

	global.camel.collapse = function(el,options){
		if(typeof options == 'undefined') options = {}
		if(typeof options.active == 'undefined') options.active = 0
		if(typeof options.animate == 'undefined') options.animate = 'fast'
		if(typeof options.collapse == 'undefined') options.collapse = false
		if(typeof options.maxHeight == 'undefined') options.maxHeight = 'none'
		if(typeof options.close == 'undefined') options.close = false

		if(options.animate == false) options.animate = 0
		if(options.animate == true) options.animate = 'fast'

		var act = (typeof options.hover == 'undefined') ? 'click' : 'hover'

		el = $(el)

		el.addClass('camel-collapse')
		el.children('dt').addClass('head').each(function(i,d){
			if(true === options.close)
				$(d).append('<span class="close"></span>')

			var a = $(this).find('>a')

			if(a.hasClass('disabled'))
				return $(a.attr('href')).hide()

			if(i == options.active && options.collapse == false)
				a.addClass('selected')
		})

		el.children('dd').addClass('body').each(function(i){
			$(this).css({maxHeight: options.maxHeight})

			if(i != options.active || options.collapse == true)
				$(this).hide()
		})

		el.on(act,'>dt.head >a',function(){
			if($(this).hasClass('disabled'))
				return false;

			if(options.collapse == true){
				if($(this).hasClass('selected')){
					$(this).removeClass('selected')
					$($(this).attr('href')).slideToggle(options.animate)
					return false
				}
			}else{
				if($(this).hasClass('selected'))
					return false;
			}

			var href = el.find('>dt.head >a.selected').removeClass('selected').attr('href')
			$(href).slideUp(options.animate)

			href = $(this).addClass('selected').attr('href')
			$(href).slideDown(options.animate)

			if($(this).attr('data-url')){
				$.get(
					$(this).attr('data-url'),
					function(data){

					}
				)

				$(this).removeAttr('data-url')
			}

			return false;
		})

		if(true === options.close)
			el.on('click','>dt.head >span.close',function(){
				$($(this).prev().attr('href')).remove()
				$(this).closest('dt').remove()
			})
	}

	if(typeof global.camel.register != 'undefined')
		global.camel.register('collapse')

})(window,jQuery)
