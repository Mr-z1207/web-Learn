$(function() {
	var timer = null
	$(".dropdown").hover(function() {
		$(this).find('.dropdown-lyap').showHide('slide')
		 timer = setTimeout(function() {
		 	$(this).find('i').addClass($(this).data('active')+'-active')
		 	$(this).find('.dropdown-lyap').showHide('show')
		 }.bind(this),400)
	},function() {
		clearTimeout(timer)
		$(this).find('i').removeClass($(this).data('active')+'-active')
		$(this).find('.dropdown-lyap').showHide('hide')
	})
})