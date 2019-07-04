$(function() {
	$(".dropdown").hover(function() {
		$(this).addClass($(this).data('active')+"-active")
		// $('.dropdown-lyap').slideDown(500) 
	},function() {
		$(this).removeClass($(this).data('active')+"-active")
	})
})