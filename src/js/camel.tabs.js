"use strict"

/*
	<div id='tab'>
		<ul>
			<li href='#one' url='/link/to/load'>One Tab</li>
			<li href='#two'>Two Tab</li>
		</ul>
		<div id='one'>One content</div>
		<div id='two'>Two content</div>
	</div>

	api = new camel.tabs($('#tabs'),{
		selected: 1,
		position: 'vertical',//horisontal
		height: 'auto',//300;
		onSelect: function(i,id){},
		ajax: function(i,id){},
	});

	api = {
		selected: function(){}
		select: function(i){}
	}
*/


if(typeof camel == 'undefined')
	var camel = {}

camel.tabs = function(el,options){
	if(typeof options == 'undefined')options = {}
	if(typeof options.position == 'undefined') options.position = 'horisontal'
	if(typeof options.selected == 'undefined') options.selected = 0;
	if(typeof options.closeable == 'undefined') options.closeable = false;

	var animate_speed = 300;


	el = $(el)

	el.each(function(i,d){
		if(options.position == 'vertical')
			$(d).addClass('vertical')

		$(d).addClass('camel-tabs').children().not('ul').addClass('item').wrapAll('<div class="tabs-body"></div>')

		if(typeof options.maxHeight != 'undefined')
			el.find('>.tabs-body .item').css({maxHeight: options.maxHeight + "px"})

		var head = $(d).children('ul')

		head.addClass('tabs-head')

		var ids = [];
		var last_select = options.selected;

		/*if(parseInt(head.prop('scrollWidth')) > el.outerWidth(true)){
			head.after('<div class="header-overflow txt-no-select"><div class="header-overflow-left">‹</div><div class="header-overflow-right">›</div></div>')

			el.find('.header-overflow').height(head.outerHeight(true))

			var is_move = false;
			el.find('.header-overflow-left,.header-overflow-right').on('click',function(e){
				if(is_move === true)
					return false;

				is_move = true

				if(e.currentTarget.className == 'header-overflow-left'){
					if(parseInt(el.children('ul.tabs-head').css('margin-left')) >= 0){
						is_move = false
						return false;
					}

					el.children('ul.tabs-head').animate({"margin-left": "+=35"},animate_speed,function(){
						is_move = false;
					})
				}else if(e.currentTarget.className == 'header-overflow-right'){

					var mh = Math.abs(parseInt(head.css('margin-left')))
					var ho = el.find('.header-overflow').outerWidth(true)
					var ol = head.prop('offsetLeft')

					console.log(el.outerWidth(true), head.prop('scrollWidth') - mh + ho)

					if(el.outerWidth(true) > head.prop('scrollWidth') - mh + ho){
						is_move = false
						return false;
					}

					el.children('ul.tabs-head').animate({"margin-left": "-=35"},animate_speed,function(){
						is_move = false;
					})
				}
			})

			el.children('ul.tabs-head').bind('mousewheel', function(e){
				if(e.originalEvent.wheelDelta / 120 > 0) {
					$('.header-overflow-left').trigger('click')
				}else{
					$('.header-overflow-right').trigger('click')
				}

				return false;
			})
		}*/

		$(d).find('ul.tabs-head a').each(function(ii,dd){
			ids.push($(dd).attr('href'))

			if(ii == last_select){
				$(dd).addClass('active')
				$(d).find('.tabs-body .item').eq(ii).addClass('active')
			}

			if(options.closeable === true){
				$(dd).addClass('close').after('<span class="close"></span>')
			}
		})

		if(options.closeable === true){
			el.on('click','>ul.tabs-head span.close',function(){
				var a = $(this).parent().find('a.close')
				var i = $(this).parent().index()
				var c = a.hasClass('active')

				ids.splice($.inArray(a.attr('href'),ids),1)

				$(a.attr('href')).remove()
				a.parent().remove()

				if(!ids.length)
					return

				if(c){
					var ni = (0 == i) ? 0 : (i - 1)

					el.find('>ul.tabs-head a').eq(ni).trigger('click')
				}
			})
		}

		el.on('click','>ul.tabs-head a',function(e){
			var ii = $(this).parent().index();

			$(ids[last_select]).removeClass('active')
			head.find('a').eq(last_select).removeClass('active')

			last_select = ii
			$(this).addClass('active')
			$(ids[last_select]).addClass('active')

			if(typeof options.onSelect == 'function')
				options.onSelect(last_select,ids[last_select])

			return false;
		})
	})

	return {
		selected: function(){
			return last_select
		},
		select: function(i){
			$(el).find("li[href="+ids[i]+"]").click()
		}
	}
}

if(typeof camel.register != 'undefined')
	camel.register('tabs')
