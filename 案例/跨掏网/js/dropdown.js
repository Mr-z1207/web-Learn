(function($){

function Dropdown($elem,options){
	this.$elem = $elem
	this.$lyap = $elem.find('.dropdown-lyap')
	this.options = options
	this.init()
}
Dropdown.prototype = {
	init:function() {
		//初始化
		this.$lyap.showHide(this.options.mode)
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
		this.$lyap.showHide('show')
	},
	hide:function() {
		this.$lyap.showHide('hide')
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
			options = $.extend({},Dropdown.DEFAULTS,options);
			dropdown = new Dropdown($elem,options);
		})
	}
})


})(jQuery);