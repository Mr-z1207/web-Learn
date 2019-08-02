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
	$(window).load(function() {
		$login.show()
	})


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
					$err.html(data.Msg)
				}
			}).fail(function(err) {
				console.log(err)
				$err.html("请求失败，请稍后再试")
			})
		}		
	})
})(jQuery);