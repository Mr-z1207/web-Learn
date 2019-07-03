(function(w) {
	function kquery() {
		return new kquery.prototype.init
	}
	kquery.prototype = {
		init : function(selector) {
			if (!selector) {
				console.log(this)
				return this
			}
		}
	}
	kquery.prototype.init.prototype = kquery.prototype
	window.kquery = window.$K = kquery
})(window)