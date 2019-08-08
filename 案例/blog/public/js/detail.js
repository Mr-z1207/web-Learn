/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	$('.btn-sub-comment').on('click',function(){
		var val = $('#comment-content').val().trim()
		var $err = $('.err')
		if(val == ''){
			$err.html('请输入评论内容')
            return false
		}else if(val.length > 100){
			$err.html('评论最多100字')
            return false
		}else{
            $err.html('')
        }
        var id = $(this).data('id')
        $.ajax({
        	url:'/comment/add',
        	type:'post',
            dataType:"json",
            data:{
                content:val,
                article:id
            }
        })
        .done(data=>{
        	if(data.status == 0){
                $('#comment-content').val('')
                $('#comment-page').trigger('get-data',data.data)
            }else{
                alert(data.message)
            }
        })
        .fail(err=>{
        	alert('评论失败,请稍后再试一试')
        })
	})
})(jQuery);