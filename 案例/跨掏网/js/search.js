(function($) {
	function Search($elem,options){
		//罗列属性
		this.$elem = $elem
		this.options = options;
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchBtn = this.$elem.find('.search-btn');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchForm = this.$elem.find('.search-form');
		//初始化
		this.init()
		if(this.options.autocomplete){
			this.autocomplete()
		}
	}
	Search.prototype = {
		constructor:Search,
		init:function() {
			this.$searchBtn.on('click',$.proxy(this.submit,this));
		},
		getVal:function() {
			return this.$searchInput.val()
		},
		autocomplete:function(){
			//初始化显示隐藏插件
			this.$searchLayer.showHide('slide')
			//监听输入框输入事件获取数据(jsonp获取数据)
			this.$searchInput.on('input',$.proxy(this.getData,this));
			//点击其他位置
			$(document).on('click',function(){
				this.Layerhide();
			}.bind(this));
			//阻止冒泡
			this.$elem.on('click',function() {
				return false;
			})
			//获取焦点
			this.$searchInput.on('focus',function() {
				this.Layershow();
			}.bind(this))
		},
		getData:function() {
			if (!this.getVal()) {
				this.Layerhide()
				return;
			}
			$.ajax({
				url:this.options.url + this.getVal(),
				dataType:"jsonp",
				jsonp:'callback',
			})
			.done(function(data){
				// console.log(this.$elem);
				this.$elem.trigger('getOk',data)
			}.bind(this))
			.fail(function(err){
				console.log(err);
				this.$elem.trigger('getErr')
			}.bind(this))
		},
		appendHTML:function(html){
			this.$searchLayer.html(html);
		},
		Layershow:function() {
			if (!this.getVal()) {
				return;
			}
			this.$searchLayer.showHide('show')
		},
		Layerhide:function() {
			this.$searchLayer.showHide('hide')
		},
	};


	Search.DEFAULTS = {
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?q='
	}
	$.fn.extend({
		search:function(options,val) {
			this.each(function() {
				var $elem = $(this)
				var search = $elem.data('search')
				if (!search) {
					options = $.extend({},Search.DEFAULTS,options);
					search = new Search($elem,options)
					$elem.data('search',search)
				}
				if (typeof search[options] == 'function') {
					search[options](val)
				}
			})
		}
	})
})(jQuery)