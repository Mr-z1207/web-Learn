$(function() {
	// var timer = null
	// $(".dropdown").hover(function() {
	// 	$(this).find('.dropdown-lyap').showHide('slide')
	// 	 timer = setTimeout(function() {
	// 	 	$(this).find('i').addClass($(this).data('active')+'-active')
	// 	 	$(this).find('.dropdown-lyap').showHide('show')
	// 	 }.bind(this),400)
	// },function() {
	// 	clearTimeout(timer)
	// 	$(this).find('i').removeClass($(this).data('active')+'-active')
	// 	$(this).find('.dropdown-lyap').showHide('hide')
	// })

	var $dropdown = $('.dropdown');
	$dropdown.dropdown({
		// mode:'',
		evName:'',
		delay:300
	})
	$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if (ev.type == 'dropdown-show') {
			
		}
	})
})