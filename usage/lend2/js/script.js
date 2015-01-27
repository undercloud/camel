$(document).ready(function(){
	$('.header .menu a,a.main-page').click(function(e){
		$('.header .menu a').removeClass('active')

		if($(this).hasClass('main-page'))
			return false;

		$(this).addClass('active')

		var url = $(this).attr('href')

		$('.page-content').html('<div class="page-preloader" style="height:' + (screen.availHeight - 300)+ 'px"></div>')

		$.get(
			'page/' + url + "?c=" + (new Date().getTime()),
			{},
			function(data){
				$('.page-content').html(data)
			}
		)

		return false;
	})
})
