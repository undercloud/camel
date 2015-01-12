/*(function(){
	var dummy = document.createElement('header');

	if (!String.prototype.trim) {
		String.prototype.trim = function () {
			return this.replace(/^\s+/g, '').replace(/\s+$/g, '');
		};
	}

	if (!('textContent' in dummy) && ('innerText' in dummy) && Object.defineProperty){
		Object.defineProperty(Element.prototype, 'textContent', {
			get: function() {
				return this.innerText;
			},
			set: function(text) {
				this.innerText = text;
			}
		});
	}

	if (!document.addEventListener && 'textContent' in dummy) {
		setTimeout(Prism.highlightAll, 10);
	}

	dummy.innerHTML = '\r\n';
	if (dummy.textContent.indexOf('\n') === -1) {
		Prism.hooks.add('after-highlight', function(env) {
			env.element.innerHTML = env.highlightedCode.replace(/--ms8-newline/g, '<br>');
		});
	}
})();

(function(fn){
    if (!fn.map) fn.map=function(f){var r=[];for(var i=0;i<this.length;i++)r.push(f(this[i]));return r}
    if (!fn.filter) fn.filter=function(f){var r=[];for(var i=0;i<this.length;i++)if(f(this[i]))r.push(this[i]);return r}
})(Array.prototype)
*/
$(document).ready(function(){
	$('.top-nav-list a,a.main-page-link').click(function(e){
		if(typeof e.originalEvent == 'undefined' || $(e.target)[0].className == 'top-logo')
			$('.present-wrap').slideDown('medium')
		else
			$('.present-wrap').slideUp('medium')

		$('.top-nav-list a').removeClass('active')
		$(this).addClass('active')

		var url = $(this).attr('href')

		$('.page-content').html('<div class="page-preloader" style="height:' + (screen.availHeight - 300)+ 'px"></div>')

		setTimeout(function(){
			$.get(
				'pages/' + url + "?c=" + (new Date().getTime()),
				{},
				function(data){
					$(window).scrollTop(0)
					$('.page-content').html(data)

					var highlight = function(i,d){
						var tabsize = $(d).html().indexOf('<') - 1;

						var src = $(d).html()
						.trim()
						.replace(new RegExp('^	{' + tabsize + '}','gm'),'')
						.replace(/	/g,'&nbsp;&nbsp;&nbsp;&nbsp')
						.replace(/</g, '&lt;')
						.replace(/>/g, '&gt;')

						if($.browser.msie && parseInt($.browser.version) <= 8)
							src = src.replace(/\r?\n/g, '--ms8-newline')

						$('code[src-data="' + $(d).attr('src-data') + '"]').html(src)
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

	$(window).off('scroll').on('scroll',function(e){
		if(
			($('.present-wrap').is(':visible') && $('.present-wrap').outerHeight(true) <= $(window).scrollTop()) ||
			($('.present-wrap').is(':hidden') && $('.top-header').outerHeight(true) <= $(window).scrollTop())
		)
			$('.top-header').addClass('shadow')
		else
			$('.top-header').removeClass('shadow')


		if(i !== null)
			clearTimeout(i)

		i = setTimeout(function(){
			// < $('.present-wrap').outerHeight(true) ? 0 : ($('.top-header').outerHeight(true) + $(window).scrollTop() - $('.present-wrap').outerHeight(true)
			var scroll = $(window).scrollTop()
			$('.page-section-menu').animate({top: scroll},300)
		},500)
	})

	$('a.main-page-link').trigger('click')
})
