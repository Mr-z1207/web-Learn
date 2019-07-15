//根据屏幕宽度动态设置根元素font-size
;(function(win,doc) {
	//获取根元素
	var root = doc.getElementsByTagName('html')[0]
	function refs() {
		//获取视口宽度
		var width = doc.body.clientWidth || doc.documentElement.clientWidth
		//设置比例
		var fontSize = width / 10 + 'px'
		//设置根元素font-size
		root.style.fontSize = fontSize
	}
	win.addEventListener('DOMContentLoaded',refs,false)
	win.addEventListener('resize',refs,false)
})(window,document)