(function(w) {
	function kquery(selector) {
		return new kquery.prototype.init(selector)
	}
	kquery.prototype = {
		init : function(selector) {
			constructor : kquery
			console.log(selector)
			//1.布尔值为fasle的
			if (!selector) {
				return this
			}
			//2.函数
			else if(kquery.isFn(selector)) {
				this[0] = document
				this.context = document
				this.length = 1
				document.addEventListener('DOMContentLoaded',selector);
				return this
			}
			//3.字符串
			else if(kquery.isStr(selector)) {
				//3.1 代码片段
				//3.2 选择器
			}
			//4.数组
			//5.对象(其他)
		}
	}


	kquery.isFn = function(str) {
		return typeof str == 'function'
	}
	kquery.isStr = function(str) {
		return typeof str == 'string'
	}


	kquery.prototype.init.prototype = kquery.prototype
	w.kquery = w.$K = kquery
})(window)