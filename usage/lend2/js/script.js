var site = {
	initContent : function(p){
		$('.side-menu a').click(function(){

			$('.content-section').html('<div class="page-preloader" style="height:' + (screen.availHeight - 300)+ 'px"></div>')

			var thisis = this
			setTimeout(function(){
				$.get(
					'page/' + p + '/' + $(thisis).attr('href') + '.html?c=' + (new Date().getTime()),
					{},
					function(data){
						$('.page-content').html(data)
						$('span[src-data]').each(site.highlight)
						Prism.highlightAll()
					}
				)
			},500)

			return false;
		})
	},
	highlight: function(i,d){
		return;

		var tabsize = $(d).html().indexOf('<') - 1;

		var src = $(d).html()
		.trim()
		.replace(new RegExp('^	{' + tabsize + '}','gm'),'')
		.replace(/	/g,'&nbsp;&nbsp;&nbsp;&nbsp')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')

		//if($.browser.msie && parseInt($.browser.version) <= 8)
		//	src = src.replace(/\r?\n/g, '--ms8-newline')

		$('code[src-data="' + $(d).attr('src-data') + '"]').html(src)
	}
}


$(document).ready(function(){
	$('.header .menu a,a.main-page').click(function(e){
		$('.header .menu a').removeClass('active')

		if($(this).hasClass('main-page'))
			return false;

		$(this).addClass('active')

		var url = $(this).attr('href')

		$('.page-container').html('<div class="page-preloader" style="height:' + (screen.availHeight - 300)+ 'px"></div>')

		setTimeout(function(){
			$.get(
				'page/' + url + ".html?c=" + (new Date().getTime()),
				{},
				function(data){
					$('.page-container').html(data)

					site.initContent(url)
				}
			)
		},500)

		return false;
	})
})

$(window).on("navigate", function (event, data) {
	var direction = data.state.direction;
	if (direction == 'back') {
	// do something
	}
	if (direction == 'forward') {
	// do something else
	}

	return false;
});
