;(function($){
	var $input = $('.header .input')
	var $ul = $('ul')
	var $item = $('.list-item')


	$input.on('keydown',function(ev) {
		if (ev.keyCode == 13) {
			// console.log($input[0].value)
			$.ajax({
				url: '/add',
				type: 'post',
				dataType:'json',
                data:{
                	task:$input.val()
                },
                // data:$input.val(),
                success:function(result){
                	if (result.code == 0) {
                		var data = result.data
                		var $dom = `<li class="list-item" data-id="${data.id}">
                                        <span class="sp-lt">${data.task}</span>
                                        <span class="sp-rt">记录时间：${data.id}</span>
                                    </li>`
                		$ul.append($dom)
                		$input.val('')
                	}
                    
                },
                error:function(jqXHR,textStatus,errorThrown) {
                	console.log(jqXHR)
                	console.log(textStatus)
                	console.log(errorThrown)
                }
			})
		}
	})

	$ul.on('click','.list-item',function() {
		var $this = $(this)
		$.ajax({
			url: '/rem',
			type: 'get',
			dataType:'json',
            data:{
            	id:$this.data('id'),
            },
			success:function(result){
                // console.log(result)
                if (result.code == 0) {
                	$this.remove()
            	}else{
            		console.log(result)
            	}
            },
            error:function(jqXHR,textStatus,errorThrown) {
            	console.log(jqXHR)
            	console.log(textStatus)
            	console.log(errorThrown)
            }
		})
	})

	$(window).load(function (){
		$input.focus()
	})
})(jQuery)