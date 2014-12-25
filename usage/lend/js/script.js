(function(){
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
						if(-1 != $.inArray($(d).attr('src-data'),['ol','ul','dl','unstyled','upload','checkbox','radio','label'])){
							tabsize = 6;
						}else if($(d).attr('src-data') == 'form-grid'){
							tabsize = 5;
						}else if(0 == $(d).attr('src-data').indexOf('select')){
							tabsize = 6;
						}

						var src = $(d).html()
						.trim()
						.replace(new RegExp('	{' + tabsize + '}','g'),'')
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
