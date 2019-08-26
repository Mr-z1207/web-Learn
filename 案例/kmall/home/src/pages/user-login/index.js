require('pages/common/footer')
require('pages/common/logo')

require('./index.css')

var _util = require('util')

var page = {
	init:function() {
		this.bindEvent()
	},
	bindEvent:function() {
		// console.log('在这里绑定事件')
		var _this = this
		$('#btn-submit').on('click',function() {
			_this.submit()
		})
		$('input').on('keyup',function(ev) {
			if (ev.keyCode == 13) {
				_this.submit()
			}
		})
	},
	submit:function() {
		// 1、获取数据
		var formData = {
			userName:$.trim($('[name="username"]').val()),
			passWord:$.trim($('[name="password"]').val())
		}
		// 2、验证数据
		var validateResult = this.validate(formData)
		console.log(validateResult)
		// 3、提交数据
	},
	validate:function(formData) {
		var result = {
			state:false,
			msg:''
		}
		if (!_util.validate(formData.userName, 'require')) {
            result.msg = "用户名不能为空"
            return result
        }
        //用户名格式验证
        if (!_util.validate(formData.userName, 'username')) {
            result.msg = "用户名格式不正确"
            return result
        }
        //密码不能为空
        if (!_util.validate(formData.passWord, 'require')) {
            result.msg = "密码不能为空"
            return result
        }
        //密码格式验证
        if (!_util.validate(formData.passWord, 'password')) {
            result.msg = "密码格式不正确"
            return result
        }

        result.status = true
		return result
	},
}

$(function() {
	page.init() //调用
})