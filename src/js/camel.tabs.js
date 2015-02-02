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

	$(el).each(function(i,d){
		$(d).addClass('camel-tabs').children().not('ul').addClass('item').wrapAll('<div class="tabs-body"></div>')
		$(d).addClass('camel-tabs').children('ul').addClass('tabs-head')

		var ids = [];
		var last_select = options.selected;

		if($(el).children('.tabs-head')[0].scrollWidth > $(el).outerWidth(true)){

			alert('catch')
			$(el).children('ul.tabs-head').after('<div class="header-overflow"><div class="header-overflow-left">‹</div><div class="header-overflow-right">›</div></div>')

			$(el).find('.header-overflow-left,.header-overflow-right').on('click',function(e){
				if(e.currentTarget.className == 'header-overflow-left'){

				}else if(e.currentTarget.className == 'header-overflow-right'){

				}
			})

			$(el).children('ul.tabs-head').bind('mousewheel', function(e){
				if(e.originalEvent.wheelDelta / 120 > 0) {
					$('.header-overflow-left').trigger('click')
				}else{
					$('.header-overflow-right').trigger('click')
				}

				return false;
			})
		}

		$(d).find('ul.tabs-head a').each(function(ii,dd){
			ids.push($(dd).attr('href'))

			if(ii == last_select){
				$(dd).addClass('active')
				$(d).find('.tabs-body .item').eq(ii).addClass('active')
			}

			if($(dd).hasClass('close'))
				$(dd).after('<span class="close"></span>')

			$(dd).click(function(e){
				if(last_select == ii) return false;

				$(ids[last_select]).removeClass('active')
				$(d).find('ul.tabs-head a').eq(last_select).removeClass('active')

				last_select = ii
				$(this).addClass('active')
				$(ids[last_select]).addClass('active')

				if(typeof options.onSelect == 'function')
					options.onSelect(last_select,ids[last_select])

				return false;
			})
		})
	})

	//$(el).addClass('camel-tabs-wrap').addClass('camel-tabs-wrap-' + options.position)
	//$(el).children('ul').addClass('camel-tabs-header').addClass('noselect')



	return;

	/*if(options.position == 'vertical'){
		$(el).find('.camel-tabs-body-items-wrap').eq(0).css({
			display: 'inline-block'
		})

		$(el).css({
			whiteSpace: 'nowrap'
		}).children('ul').css({
			display: 'inline-block'
		}).children('li').css({
			display: 'block'
		})

		$(el).find('.camel-tabs-body-items-wrap').eq(0).css({
			width: ($(el).parent().width() - $(el).find('.camel-tabs-header').eq(0).outerWidth(true)) + 'px'
		})
	}*/

	/*var min_height = 0;

	$(el).children('ul').children('li').each(function(i,d){
		ids.push($(d).attr('href'))

		$($(d).attr('href')).addClass('camel-tabs-body-item')
		if($($(d).attr('href')).outerHeight() > min_height)
			min_height = $($(d).attr('href')).outerHeight()
		$($(d).attr('href')).hide()

		$(d).click(function(){
			if(last_select == i) return false;

			$(ids[last_select]).hide()
			$($(d).attr('href')).show()

			$(el).children('ul').children('li').eq(last_select).removeClass('selected')
			last_select = i
			$(d).addClass('selected')

			if($(d).attr('url')){
				$($(d).attr('href')).addClass('camel-tabs-preloader').html('')
				$.get(
					$(d).attr('url'),
					function(data){
						$($(d).attr('href')).removeClass('camel-tabs-preloader').html(data)

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
	$(el).children('ul').children('li').eq(options.selected).click()

	var last_select = options.selected;
	*/
	if(options.position == 'horisontal'){
		if(typeof options.height != 'undefined')
			$(el).find('.camel-tabs-body-items-wrap').eq(0).children().css({
				height: options.height + 'px'
			})
		else
			$(el).find('.camel-tabs-body-items-wrap').eq(0).children().css({
				minHeight: min_height + 'px'
			})

		if($(el).children('.camel-tabs-header').outerWidth(true) > $(el).outerWidth(true)){
			$(el).children('ul').after("<div class='camel-tabs-header-overflow noselect'><div class='camel-tabs-header-left'>‹</div><div class='camel-tabs-header-right'>›</div></div>")

			var is_move = false;
			$('.camel-tabs-header-left').click(function(){
				if(is_move === true)
					return false;

				is_move = true;
				if(parseInt($(el).children('ul').css('margin-left')) >= 0){
					is_move = false
					return false;
				}

				$(el).children('ul').animate({"margin-left": "+=80"},'fast',function(){
					is_move = false;
				})
			})

			$('.camel-tabs-header-right').click(function(){
				if(is_move === true)
					return false;

				is_move = true;
				if(
					$(el).width()
					>=
					(($(el).find('ul.camel-tabs-header').width() + $(el).find('.camel-tabs-header-overflow').width()) - Math.abs(parseInt($(el).find('ul.camel-tabs-header').css('margin-left'))))
				){
					is_move = false
					return false;
				}

				$(el).children('ul').animate({"margin-left": "-=80"},'fast',function(){
					is_move = false;
				})
			})

			$(el).children('ul').bind('mousewheel', function(e){
				if(e.originalEvent.wheelDelta / 120 > 0) {
					$('.camel-tabs-header-left').click()
				}else{
					$('.camel-tabs-header-right').click()
				}

				return false;
			});
		}
	}

	if(options.position == 'vertical'){
		if(typeof options.height != 'undefined' && options.height == 'auto'){
			$(el).find('.camel-tabs-body-items-wrap').eq(0).height(
				$(el).find('.camel-tabs-header').eq(0).outerHeight(true)
			)
		}else if(typeof options.height != 'undefined'){
			$(el).find('.camel-tabs-body-items-wrap').eq(0).height(options.height)
		}else{
			$(el).find('.camel-tabs-body-items-wrap').eq(0).children().css({
				minHeight: min_height + 'px'
			})
		}
	}

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
