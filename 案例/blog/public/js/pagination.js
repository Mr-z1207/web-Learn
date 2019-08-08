;(function($){
	$.fn.extend({
		pagination:function(option) {
			var $elem = this;
			$elem.on('click','a',function(){
				//获取当前页,根据当前页计算请求页码
                //1.获取当前页
                var currentPage = $elem.find('.active a').html()
                //2.根据当前页计算请求页码
                var page = 1
                var labelText = $(this).attr('aria-label')
                if(labelText == "Previous"){
                    page = currentPage - 1
                }
                else if(labelText == "Next"){
                    page = currentPage*1 + 1
                }else{
                    page = $(this).html()
                }
                //如果点击当前页阻止请求
                if(page == currentPage){
                	return false
                }

                var url = option.url + "/?page=" + page
                var id = $elem.data('id')
                // console.log(id)
                if (id) {
                    url += '&id=' + id
                }

                //发送ajax
                $.ajax({
                	url:url,
                	dataType:"json"
                })
                .done(function(data) {
                	// console.log(data)
                	$elem.trigger('get-data',data.data)
                })
                .fail(function(err){
                    alert('请求失败,请稍后再试一试')
                })
			})
		}
	})
})(jQuery);