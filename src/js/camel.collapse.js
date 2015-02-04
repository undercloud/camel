

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
		if(typeof options.selected == 'undefined') options.selected = 0

		var ids = []
		$(el).addClass('camel-collapse')
		$(el).children('dt').each(function(i,d){
			var a = $(d).find('>a')

			$(a).addClass('noselect')

			ids.push($(a).attr('href'))
			$(d).addClass('head')


			$($(a).attr('href')).addClass('body').hide()

			if(typeof options.height != 'undefined'){
				$($(d).attr('href')).css({
					height: options.height + 'px'
				})
			}

			$(a).click(function(){
				$('a[href='+ids[last_select]+']').removeClass('selected')

				if(last_select == i){
					if(typeof options.collapse != 'undefined' && options.collapse == true){
						if($($(a).attr('href')).is(':hidden')){
							$($(a).attr('href')).slideDown('fast')
						}else{
							$($(a).attr('href')).slideUp('fast')
						}
					}
				}else{
					$(ids[last_select]).slideUp('fast')
					$($(a).attr('href')).slideDown('fast')
				}

				last_select = i

				$(a).addClass('selected')

				/*if($(d).attr('url')){
					$($(d).attr('href')).addClass('camel-collapse-preloader').html('')
					$.get(
						$(d).attr('url'),
						function(data){
							$($(d).attr('href')).removeClass('camel-collapse-preloader').html(data)

							if(typeof options.ajax == 'function')
								options.ajax(i,ids[i])
						}
					)

					$(d).removeAttr('url')
				}

				if(typeof options.onSelect == 'function')
					options.onSelect(last_select,ids[last_select])*/

				return false;
			})
		})

		$('dt[href='+ids[options.selected]+']').click()
		var last_select = options.selected;

		return {
			selected: function(){
				return last_select
			},
			select: function(i){
				$(el).find("dt[href="+ids[i]+"]").click()
			}
		}
	}

	if(typeof global.camel.register != 'undefined')
		global.camel.register('collapse')

})(window,jQuery)
