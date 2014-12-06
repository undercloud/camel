$(document).ready(function(){
	$('.top-nav-list a').click(function(){
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

	$(document).on('click','.medusa-alert .close',function(){
		var rem = $(this).closest('.medusa-alert')

		rem.fadeOut('medium',function(){
			rem.remove()
		})
	})
})
