(function($){

function Dropdown($elem,options){
	this.$elem = $elem
	this.$layer = $elem.find('.dropdown-layer')
	this.options = options
	this.init()
}
Dropdown.prototype = {
	init:function() {
		//初始化
		this.$layer.showHide(this.options.mode)
		//监听事件
		this.$layer.on('show shown hide hidden',function(ev){
			this.$elem.trigger('dropdown-' + ev.type)
		}.bind(this))
		//绑定事件
		if (this.options.evName == 'click') {
			this.$elem.on('click',function(ev) {
				ev.stopPropagation();
				this.show()
			}.bind(this))
			$(document).on('click',function(){
				this.hide();
			}.bind(this));
		}else{
			this.$elem.hover(function() {
				this.show()
			}.bind(this),function() {
				this.hide()
			}.bind(this))
		}
	},
	show:function() {
		if(this.options.delay){
			this.timer = setTimeout(function(){
				this.$layer.showHide('show');
				//显示时添加对应class
				this.$elem.addClass(this.activeClass);
			}.bind(this),this.options.delay)
		}else{
			this.$layer.showHide('show');
			//显示时添加对应class
			this.$elem.addClass(this.activeClass);
		}
	},
	hide:function() {
		clearTimeout(this.timer);
		this.$layer.showHide('hide')
	}
}

//当不传参数时的默认配置信息
Dropdown.DEFAULTS = {
	mode:'slide',
	delay:300,
	evName:''
}

//封装dropdown插件
$.fn.extend({
	dropdown:function(options){
		//1.实现隐式迭代
		this.each(function(){
			var $elem = $(this);
			if (!$elem.data('dropdown')) {
				options = $.extend({},Dropdown.DEFAULTS,options);
				dropdown = new Dropdown($elem,options);
				$elem.data('dropdown',true)
			}
			if (typeof dropdown[options] == 'function') {
				dropdown[options]()
			}
		})
	}
})


})(jQuery);