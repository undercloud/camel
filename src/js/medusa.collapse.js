"use strict"

/*
	<dl id='collapse'>
		<dt href='#one' url='/url/to/load'>First Header</dt>
		<dd id='one'></dd>
		<dt href='#two'>Second Header</dt>
		<dd id='two'></dd>
	</dl>

	api = new medusa.collapse(
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

if(typeof medusa == 'undefined')
	var medusa = {}

medusa.collapse = function(el,options){
	if(typeof options == 'undefined')options = {}
	if(typeof options.selected == 'undefined') options.selected = 0

	var ids = []
	$(el).addClass('medusa-collapse-wrap')
	$(el).children('dt').each(function(i,d){
		ids.push($(d).attr('href'))
		$(d).addClass('medusa-collapse-head').addClass('noselect')
		$($(d).attr('href')).addClass('medusa-collapse-body').hide()

		if(typeof options.height != 'undefined'){
			$($(d).attr('href')).css({
				height: options.height + 'px'
			})
		}

		$(d).click(function(){
			$('dt[href='+ids[last_select]+']').removeClass('selected')

			if(last_select == i){
				if(typeof options.collapse != 'undefined' && options.collapse == true){
					if($($(d).attr('href')).is(':hidden')){
						$($(d).attr('href')).slideDown('fast')
					}else{
						$($(d).attr('href')).slideUp('fast')
					}
				}
			}else{
				$(ids[last_select]).slideUp('fast')
				$($(d).attr('href')).slideDown('fast')
			}

			last_select = i

			$(d).addClass('selected')

			if($(d).attr('url')){
				$($(d).attr('href')).addClass('medusa-collapse-preloader').html('')
				$.get(
					$(d).attr('url'),
					function(data){
						$($(d).attr('href')).removeClass('medusa-collapse-preloader').html(data)
						
						if(typeof options.ajax == 'function')
							options.ajax(i,ids[i])
					}
				)

				$(d).removeAttr('url')
			}

			if(typeof options.onSelect == 'function')
				options.onSelect(last_select,ids[last_select])
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

if(typeof medusa.register != 'undefined')
	medusa.register('collapse')