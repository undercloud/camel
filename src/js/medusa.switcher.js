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

		if(true == opt.multiple){
			var sl = el.find('.item.selected').map(function(){return $(this).attr("data")}).get()
			if(sl.length == 0)
				sl.push(undefined)
		}else{
			var sl = [el.find('.item.selected').attr('data')]
		}

		el.find('input[type=hidden]').remove()

		for(var i=0;i<sl.length;i++){
			var hd = document.createElement('input')
			hd.setAttribute('type','hidden')
			hd.setAttribute('name',
				el.attr('name') + 
				((opt.multiple && typeof sl[i] != 'undefined') ? '[]' : '')
			)
			hd.setAttribute('value',(typeof sl[i] == 'undefined') ? '' : sl[i])

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
			else{
				var e = el.find('.item.selected').attr('data');
				return (typeof e != 'undefined') ? e : '';
			}
		},
		setValue: function(value,e){
			if(opt.multiple && false == jQuery.isArray(value)) return;
			if(typeof e == 'undefined') e = true;

			el.find('.item').removeClass('selected')

			if(false == jQuery.isArray(value))
				value = [value];

			for(var i=0;i < value.length;i++)
				el.find('.item[data="' + value[i] + '"]').addClass('selected')

			hidden()

			if(e != false && typeof opt.onchange == 'function'){
				opt.onchange(api.getValue())
			}
		}
	}

	return api
}

if(typeof medusa.register != 'undefined')
	medusa.register('switcher')
/*
var eh = null;
$(document).ready(function(){
	eh = medusa.switcher(
		'#switcher',
		{
			//multiple: true,
			onchange: function(){
				console.log('vai',arguments[0])
			}
		}
	)
})*/
