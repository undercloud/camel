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

	api = new medusa.tabs($('#tabs'),{
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


if(typeof medusa == 'undefined')
	var medusa = {}

medusa.tabs = function(el,options){
	if(typeof options == 'undefined')options = {}
	if(typeof options.position == 'undefined') options.position = 'horisontal'
	if(typeof options.selected == 'undefined') options.selected = 0;

	var ids = [];

	$(el).addClass('medusa-tabs-wrap').addClass('medusa-tabs-wrap-' + options.position)
	$(el).children('ul').addClass('medusa-tabs-header').addClass('noselect')
	
	var hold = $(el).children().not('ul')
	$(el).children('ul').after("<div class='medusa-tabs-body-items-wrap'></div>").next().append(hold)

	if(options.position == 'vertical'){
		$(el).find('.medusa-tabs-body-items-wrap').eq(0).css({
			display: 'inline-block'
		})

		$(el).css({
			whiteSpace: 'nowrap'
		}).children('ul').css({
			display: 'inline-block'
		}).children('li').css({
			display: 'block'
		})

		$(el).find('.medusa-tabs-body-items-wrap').eq(0).css({
			width: ($(el).parent().width() - $(el).find('.medusa-tabs-header').eq(0).outerWidth(true)) + 'px'
		})
	}

	var min_height = 0;

	$(el).children('ul').children('li').each(function(i,d){
		ids.push($(d).attr('href'))

		$($(d).attr('href')).addClass('medusa-tabs-body-item')
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
				$($(d).attr('href')).addClass('medusa-tabs-preloader').html('')
				$.get(
					$(d).attr('url'),
					function(data){
						$($(d).attr('href')).removeClass('medusa-tabs-preloader').html(data)
						
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

	if(options.position == 'horisontal'){
		if(typeof options.height != 'undefined')
			$(el).find('.medusa-tabs-body-items-wrap').eq(0).children().css({
				height: options.height + 'px'
			})
		else
			$(el).find('.medusa-tabs-body-items-wrap').eq(0).children().css({
				minHeight: min_height + 'px'
			})

		if($(el).children('.medusa-tabs-header').outerWidth(true) > $(el).outerWidth(true)){
			$(el).children('ul').after("<div class='medusa-tabs-header-overflow noselect'><div class='medusa-tabs-header-left'>‹</div><div class='medusa-tabs-header-right'>›</div></div>")

			var is_move = false;
			$('.medusa-tabs-header-left').click(function(){
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

			$('.medusa-tabs-header-right').click(function(){
				if(is_move === true)
					return false;

				is_move = true;
				if(
					$(el).width()
					>= 
					(($(el).find('ul.medusa-tabs-header').width() + $(el).find('.medusa-tabs-header-overflow').width()) - Math.abs(parseInt($(el).find('ul.medusa-tabs-header').css('margin-left'))))
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
					$('.medusa-tabs-header-left').click()			
				}else{
					$('.medusa-tabs-header-right').click()
				}

				return false;
			});
		}
	}

	if(options.position == 'vertical'){
		if(typeof options.height != 'undefined' && options.height == 'auto'){
			$(el).find('.medusa-tabs-body-items-wrap').eq(0).height(
				$(el).find('.medusa-tabs-header').eq(0).outerHeight(true)
			)
		}else if(typeof options.height != 'undefined'){
			$(el).find('.medusa-tabs-body-items-wrap').eq(0).height(options.height)
		}else{
			$(el).find('.medusa-tabs-body-items-wrap').eq(0).children().css({
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

if(typeof medusa.register != 'undefined')
	medusa.register('tabs')