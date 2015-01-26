$(document).ready(function(){
	$('.header .menu a,a.main-page-link').click(function(e){
		$('.top-nav-list a').removeClass('active')
		$(this).addClass('active')

		var url = $(this).attr('href')

		$('.page-content').html('<div class="page-preloader" style="height:' + (screen.availHeight - 300)+ 'px"></div>')

		$.get(
			'pages/' + url + "?c=" + (new Date().getTime()),
			{},
			function(data){

			}
		)
	})
})
