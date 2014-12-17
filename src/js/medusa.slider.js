"use strict";

/*
	<div id='slider'>
		<div title='Some text'>
			<img src='/path/to/banners/'/>
		</div>
	</div>

	new medusa.slider(
		$('#slider'),
		{
			width: 700,
			height: 300,
			slidetime: 5000,
			changetime: 1000,
			popuptime: 1000,
			navbuttons: true,
			pickbuttons: true,
			clickalign: "center",
			effect: "fade" // scroll or fade
		}
	)
*/

if(typeof medusa == 'undefined')
	var medusa = {}

medusa.slider = function(target,options){
	var widtharea   = typeof options.width       != 'undefined' ? options.width       : 700;
	var heightarea  = typeof options.height      != 'undefined' ? options.height      : 500;
	var slidetime   = typeof options.slidetime   != 'undefined' ? options.slidetime   : 3000;
	var changetime  = typeof options.changetime  != 'undefined' ? options.changetime  : 500;
	var popuptime   = typeof options.popuptime   != 'undefined' ? options.popuptime   : 1000;
	var navbuttons  = typeof options.navbuttons  != 'undefined' ? options.navbuttons  : true;
	var pickbuttons = typeof options.pickbuttons != 'undefined' ? options.pickbuttons : true;
	var clickalign  = typeof options.clickalign  != 'undefined' ? options.clickalign  : "center";
	var effect      = typeof options.effect      != 'undefined' ? options.effect      : "scroll";
	var current     = 1;
	var total       = 0;

	var t = $(target);

	var complete = function() {}

	t.addClass('medusa-slider')
	t.children().addClass('item')

	t.children().wrapAll('<div class="ribbon"></div>')

	t.find('.ribbon').children().each(function(i,d){
		if($(d).attr('title'))
			$(d).append(
				'<div class="title">\
					<div class="overlay"></div>\
					<div class="text">'+$(d).attr('title')+'</div>\
				</div>'
			).removeAttr('title')
	})

	t.css({width: widtharea + "px"})
	t.find('.ribbon').css({height: heightarea + "px"})
	t.append('<div class="tools"></div>')

	var i = setInterval(auto,slidetime);

	window.addEventListener('focus', function() {
		i = setInterval(auto,slidetime)
	},false)

	window.addEventListener('blur', function() {
		clearInterval(i)
	},false)

	if(navbuttons){
		t.append('\
		<span class="to-left">‹</span>\
		<span class="to-right">›</span>')

		/*if(current == 1) t.find('.to-left').hide()
		if(current != total) t.find('.to-right').show()
		if(current == total) t.find('.to-right').hide()
		if(current != 1) t.find('.to-left').show()*/
	}

	if(effect == "fade"){
		t.find('.ribbon .item').css({
			position: 'absolute',
			width: widtharea + "px"
		});
		t.find('.ribbon .item').each(function(i,d){
			$(d).hide();
		})
		t.find('.ribbon .item').eq(0).fadeIn(changetime);
	}

	total = t.find('.item').size();

	t.find('.ribbon').css('width',(widtharea * total)+'px');
	//t.find('.title').css('width',widtharea+'px');
	//t.find('.item').css('width',widtharea+'px');

	if(pickbuttons){
		t.find('.tools').append('<span class="click-circle"></span>')

		for(var k=0;k<total;k++){
			t.find('.click-circle')
			.append("<span class='item'></span>")
		}
	}

	active(0);

	t.find('.ribbon .item').eq(current-1).children('.title').fadeIn(popuptime);

	t.find('.to-left').click(function(){
		var back = false;
		if(current != 1)
			current--;
		else{
			current = total;
			back = true;
		}
			if(effect == "scroll"){
				if(back)
					t.find('.ribbon').animate({left: '-=' + (widtharea * (total -1))},changetime,complete);
				else
					t.find('.ribbon').animate({left:'+='+widtharea},changetime,complete);
			}else if(effect == "fade"){
				t.find('.ribbon .item').eq(current-1).fadeIn(changetime,complete);
				t.find('.ribbon .item').eq(current).fadeOut(changetime);
			}

			t.find('.ribbon .item').eq(current-1).children('.title').fadeIn(popuptime);
			t.find('.ribbon .item').eq(current).children('.title').fadeOut(popuptime);

			clearInterval(i);
			i =	setInterval(auto,slidetime);
			active(current - 1)

	});

	t.find('.to-right').click(function(){
		var back = false;
		if(current == total){
			current = 0;
			back = true;
		}

			t.find('.ribbon .item').eq(current-1).children('.title').fadeOut(popuptime);
			t.find('.ribbon .item').eq(current).children('.title').fadeIn(popuptime);

			if(effect == "scroll"){
				if(back)
					t.find('.ribbon').animate({left: 0})
				else
					t.find('.ribbon').animate({left:'-='+widtharea},changetime,complete);
			}else if(effect == "fade"){
				t.find('.ribbon .item').eq(current).fadeIn(changetime,complete);
				t.find('.ribbon .item').eq(current-1).fadeOut(changetime);
			}

			current++;
			clearInterval(i);
			i = setInterval(auto,slidetime);
			active(current - 1);
	})

	t.find('.click-circle .item').click(function(){
		var index = $(this).index()

		if(index + 1 == current) return false;
		if(index < 0) return false;

		t.find('.ribbon .item').eq(current - 1).children('.title').fadeOut(popuptime);
		if(effect == "fade") t.find('.ribbon .item').eq(current-1).fadeOut(changetime);

		current = index + 1;

		t.find('.ribbon .item').eq(current - 1).children('.title').fadeIn(popuptime);

		if(effect == "fade")   t.find('.ribbon .item').eq(current-1).fadeIn(changetime);
		if(effect == "scroll") t.find('.ribbon').animate({left: -widtharea * index},changetime);

		clearInterval(i);
		i =	setInterval(auto,slidetime);
		active(index)
	})

	function auto(){
		$('.to-right').trigger('click');
	}

	function active(index) {
		$('.click-circle .item.selected').removeClass('selected');
		$('.click-circle .item').eq(index).addClass('selected');
	}
}

if(typeof medusa.register != 'undefined')
	medusa.register('slider')
