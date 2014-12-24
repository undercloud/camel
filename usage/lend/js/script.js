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

					var highlight = function(i,d){
						var tabsize = 4;
						if(-1 != $.inArray($(d).attr('src-data'),['ol','ul','dl','unstyled','upload'])){
							tabsize = 6;
						}else if($(d).attr('src-data') == 'form-grid'){
							tabsize = 5;
						}

						$('code[src-data="' + $(d).attr('src-data') + '"]').html(
								$(d).html()
								.trim()
								.replace(new RegExp('	{' + tabsize + '}','g'),'')
								.replace(/	/g,'&nbsp;&nbsp;&nbsp;&nbsp')
								.replace(/</g, '&lt;')
								.replace(/>/g, '&gt;')
							)
					}

					$('span[src-data]').each(highlight)

					Prism.highlightAll()

					$('.table-control span').click(function(){
						$(this).toggleClass('active')
						$('.medusa-table').toggleClass($(this).text().substr(1))

						$('code[src-data="table"]').empty()
						highlight(0,$('span[src-data="table"]'))
						Prism.highlightElement($('code[src-data="table"]')[0])
					})
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

			//console.log(scroll,$('.page-section-menu').outerHeight(true))

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
