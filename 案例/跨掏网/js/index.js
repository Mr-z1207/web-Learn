$(function() {

	var $dropdown = $('.dropdown');
	$dropdown.dropdown({
		// mode:'',
		// evName:'',
		// delay:300
	})
	$dropdown.on('dropdown-show dropdown-shown dropdown-hide dropdown-hidden',function(ev){
		if (ev.type == 'dropdown-show') {
			var $elem = $(this);
			var $lyap = $elem.find('.dropdown-lyap');
			var $url = $elem.data('load')
			if (!$url) return;
			if (!$lyap.data('islod')) {
				$.getJSON($url,function(data) {
					var html = ''
					for (var i = 0; i < data.length; i++) {
						html += '<li><a href="'+ data[i].url +'">'+ data[i].name +'</a></li>'
					}
					setTimeout(function() {
						$lyap.html(html)
						$lyap.data('islod',true)
					}, 1000);
				})
			}
		}
	})

	var $search = $('.search')
	$search.search({
		// autocomplete:true,
		// url:'https://suggest.taobao.com/sug?q='
	})
	$search.on('getOk',function(ev,data) {
		var data = data.result
		var html = ''
		for (var i = 0; i < data.length; i++) {
			html += '<li class="search-cont">'+ data[i][0] +'</li>'
		}
		$search.search('appendHTML',html)
		if(html == ''){
			$search.search('Layerhide');
		}else{
			$search.search('Layershow');
		}
	})
})