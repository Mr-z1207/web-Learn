;(function($){
	var $userInfo = $('#user-info')
	var $register = $('#register')
	var $login = $('#login')

	$("#go-register").on("click",function() {
		$login.hide()
		$register.show()
	})
	$("#go-login").on("click",function() {
		$login.show()
		$register.hide()
	})
	// $(window).load(function() {
	// 	$login.show()
	// })


	//用户名以字母开头包含数字和下划线的3-10位字符
    var usernameReg = /^[a-z][a-z0-9_]{2,9}$/i
    //密码为3-6位任意字符
    var passwordReg = /^\w{3,6}$/
	//点击注册时，验证正则
	$("#sub-register").on("click",function() {
		var Msg = ''
		//获取输入框的值
		var $username = $register.find('[name=username]').val()
		var $password = $register.find('[name=password]').val()
		var $repassword = $register.find('[name=repassword]').val()

		var $err = $register.find('.err')

		if (!usernameReg.test($username)) {
			Msg = "用户名以字母开头包含数字和下划线的3-10位字符"
		}
		else if(!passwordReg.test($password)){
			Msg = "密码为3-6位任意字符"
		}
		else if($password != $repassword){
			Msg = '两次密码不一致'
		}


		//验证是否通过
		if (Msg) { //验证不通过
			$err.html(Msg)
			return
		}else{    //验证通过
			//发送ajax
			$.ajax({
				url:'/user/register',
				type:"POST",
				dataType:"json",
				data:{
					username:$username,
					password:$password
				}
			}).done(function(data) {
				if (data.code == 0 || data.code == 10) {
					$err.html(data.Msg)
				}
				else if(data.code == 1){
					$('#go-login').trigger('click')
					// $err.html(data.Msg)
				}
			}).fail(function(err) {
				// console.log(err)
				$err.html("请求失败，请稍后再试")
			})
		}		
	})



	//点击登录时，验证正则
	$('#sub-login').on("click",function() {
		var Msg = ''
		//获取输入框的值
		var $username = $login.find('[name=username]').val()
		var $password = $login.find('[name=password]').val()

		var $err = $login.find('.err')
		if (!usernameReg.test($username)) {
			Msg = "用户名以字母开头包含数字和下划线的3-10位字符"
		}
		else if(!passwordReg.test($password)){
			Msg = "密码为3-6位任意字符"
		}

		//验证是否通过
		if (Msg) { //验证不通过
			$err.html(Msg)
			return
		}else{    //验证通过
			//发送ajax
			$.ajax({
				url:'/user/login',
				type:"POST",
				dataType:"json",
				data:{
					username:$username,
					password:$password
				}
			}).done(function(data) {
				if (data.code == 0 || data.code == 10) {
					$err.html(data.Msg)
				}
				else if(data.code == 1){
					window.location.reload()
				}
			}).fail(function(err) {
				console.log(err)
				$err.html("请求失败，请稍后再试")
			})
		}
	})

	//处理文章分页功能
	var $articlePage = $('#article-page')

	function buildArticleHtml(data){
		// console.log(data)
		var html = ''
		data.forEach(function(article) {
			var createdTime = moment(article.createdAt).format('YYYY-MM-DD HH:mm:ss')
			html +=
			`<div class="panel panel-default content-item">
			  <div class="panel-heading">
			    <h3 class="panel-title">
			      <a href="/detail/${article._id.toString()}" class="link" target="_blank">${article.title}</a>
			    </h3>
			  </div>
			  <div class="panel-body">${article.intro}</div>
			  <div class="panel-footer">
			    <span class="glyphicon glyphicon-user"></span>
			    <span class="panel-footer-text text-muted">${article.user.username}</span>
			    <span class="glyphicon glyphicon-th-list"></span>
			    <span class="panel-footer-text text-muted">${article.category.name}</span>
			    <span class="glyphicon glyphicon-time"></span>
			    <span class="panel-footer-text text-muted">${createdTime}</span>
			    <span class="glyphicon glyphicon-eye-open"></span>
			    <span class="panel-footer-text text-muted"><em>${article.click}</em>已阅读</span>
			  </div>
			</div>`
		})
		return html
	}
	function buildPaginationHtml(page,pageMax,list){
		var html = ''
		html += `<ul class="pagination">`
		if (page == 1) {
			html += `<li class="disabled">`
		}else{
			html += `<li>`
		}
		html += `<a href="javascript:;" aria-label="Previous">
			        <span aria-hidden="true">&laquo;</span>
			      </a>
			    </li>`
	    list.forEach(function(i) {
	    	if (i == page) {
	    		html += `<li class="active">`
	    	}else{
	    		html += `<li>`
	    	}
	    	html += `<a href="jacascript:;">${i}</a></li>`
	    })
	    if (page == pageMax) {
	    	html += `<li class="disabled">`
	    }else{
	    	html += `<li>`
	    }
	    html += `<a href="javascript:;" aria-label="Next">
			        <span aria-hidden="true">&raquo;</span>
			      </a>
			    </li>`
		html += `</ul>`
		return html
	}


	$articlePage.on('get-data',function(ev,data){
		// console.log(data.docs)
		//构建文章html
		$('#article-wrap').html(buildArticleHtml(data.docs))
		$('#article-page').html(buildPaginationHtml(data.page,data.pageMax,data.list))
	})
    $articlePage.pagination({
        url:'/articles'    
    })



    //////////////////////////
     function buildCommentHtml(comments){
        var html = ''
        comments.forEach(function(comment){
        	var createdTime = moment(comment.createdAt).format('YYYY-MM-DD HH:mm:ss')
        	html += `<div class="panel panel-default">
				        <div class="panel-heading">${ comment.user.username } 发表于 ${ createdTime } </div>
				        <div class="panel-body">
				          ${ comment.content }
				        </div>
				     </div>`
        })

        return html
    }
    var $commentPage = $('#comment-page')

    $commentPage.on('get-data',function(ev,data){
		$('#comment-wrap').html(buildCommentHtml(data.docs))

		$pagination = $commentPage.find('.pagination')
		$pagination.html(buildPaginationHtml(data.page,data.pageMax,data.list))
	})


    $commentPage.pagination({
        url:'/comment/list'
    })
})(jQuery);