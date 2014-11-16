"use strict"

if(typeof window.medusa == 'undefined')
	var medusa = {}

medusa.switcher = function(el,opt){
	var el = $(el)
	if(typeof opt == 'undefined') opt = {}
	if(typeof opt.multiple == 'undefined') opt.multiple = false;

	var hidden = function(){
		if(!el.attr('name'))
			return;

		el.find('input[type=hidden][name="' + el.attr('name') + (opt.multiple ? '[]' : '') + '"]').remove()

		if(true == opt.multiple){
			var sl = el.find('.item.selected').map(function(){return $(this).attr("data")}).get()
		}else{
			var sl = [el.find('.item.selected').attr('data')]
		}

		for(var i=0;i<sl.length;i++){
			if(typeof sl[i] == 'undefined')
				sl[i] = '';

			var hd = document.createElement('input')
			hd.setAttribute('type','hidden')
			hd.setAttribute('name',el.attr('name') + (opt.multiple ? '[]' : ''))
			hd.setAttribute('value',sl[i])

			el.prepend(hd)
		}
	}

	hidden();

	el.find('.item').click(function(e){
		if($(this).hasClass('selected')){
			$(this).removeClass('selected')
		}else{
			if(false == opt.multiple)
				el.find('.item.selected').removeClass('selected')
			$(this).addClass('selected')
		}

		hidden()

		if(typeof opt.onchange == 'function'){
			opt.onchange(api.getValue())
		}
	})

	var api = {
		getValue: function(){
			if(opt.multiple)
				return el.find('.item.selected').map(function(){return $(this).attr("data")}).get()
			else
				return el.find('.item.selected').attr('data')
		},
		setValue: function(value){
			if(jQuery.isArray(value)){
				value.each(function(i,d){
					el.find('.item[data="' + value + '"]')
				})
			}else{
				el.find('.item[data="' + value + '"]').trigger('click')
			}
		}
	}

	return api
}

if(typeof medusa.register != 'undefined')
	medusa.register('switcher')

var eh = null;
$(document).ready(function(){
	eh = medusa.switcher(
		'#switcher',
		{
			//multiple: true,
			onchange: function(){
				console.log(arguments[0])
			}
		}
	)
})
