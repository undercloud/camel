$(document).ready(function(){
	$('.top-nav-list a,a.main-page-link').click(function(e){
		if($(e.target)[0].className == 'top-logo')
			$('.present-wrap').show()
		else
			$('.present-wrap').hide()

		$('.top-nav-list a').removeClass('active')
		$(this).addClass('active')

		var url = $(this).attr('href')

		$('.page-content').html('<div class="page-preloader" style="height:' + (screen.availHeight - 300)+ 'px"></div>')

		setTimeout(function(){
			$.get(
				'pages/' + url + "?c=" + (new Date().getTime()),
				{},
				function(data){
					$('.page-content').html(data)
				}
			)
		},500)

		return false;
	})

	var i = null;

	$(window).scroll(function(e){
		if(i !== null)
			clearTimeout(i)

		i = setTimeout(function(){
			var scroll = $(window).scrollTop();

			console.log(scroll,$('.page-section-menu').outerHeight(true))

			$('.page-section-menu').animate({top: scroll},300)
		},500)
	})

	$('a.main-page-link').trigger('click')

	$(document).on('click','.medusa-alert .close',function(){
		var rem = $(this).closest('.medusa-alert')

		rem.fadeOut('medium',function(){
			rem.remove()
		})
	})
})
