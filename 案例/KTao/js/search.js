(function($) {
	var cache = {
		data:{},
		count:0,
		addData:function(key,val){
			this.data[key] = val;
			this.count++;
		},
		getData:function(key){
			return this.data[key];
		}
	}




	function Search($elem,options){
		//罗列属性
		this.$elem = $elem
		this.options = options;
		this.$searchInput = this.$elem.find('.search-input');
		this.$searchBtn = this.$elem.find('.search-btn');
		this.$searchLayer = this.$elem.find('.search-layer');
		this.$searchForm = this.$elem.find('.search-form');

		this.isLoadedHtml = false;
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
		submit:function(){
			if(!this.getVal()){
				//如果没有数据则不提交请求
				return false;
			}
			this.$searchForm.trigger('submit');
		},
		autocomplete:function(){
			//初始化显示隐藏插件
			this.$searchLayer.showHide('slide')
			//监听输入框输入事件获取数据(jsonp获取数据)
			if (this.options.delayGetData) {
				this.$searchInput.on('input',function() {
					clearTimeout(this.timer)
					this.timer = setTimeout(function(){
						this.getData();
					}.bind(this),this.options.delayGetData)
				}.bind(this))
			}else{
				this.$searchInput.on('input',$.proxy(this.getData,this))
			}

			//点击其他位置
			$(document).on('click',function(){
				this.Layerhide();
			}.bind(this));
			//获取焦点
			this.$searchInput.on('focus',function() {
				this.Layershow();
			}.bind(this))
			//阻止冒泡
			this.$elem.on('click',function() {
				return false;
			})
			//(事件委托)完成点击下拉列表每一项提交数据
			var _this = this;
			this.$elem.on('click','.search-cont',function(){
				//1.获取点击的项的内容
				var val = $(this).html();
				//2.设置输入框的值
				_this.setInputVal(val);
				//3.提交数据
				_this.submit();
			})
		},
		getData:function() {
			if (!this.getVal()) {
				this.Layerhide()
				return;
			}

			//以下有待思考
			if(this.jqXHR){
				this.jqXHR.abort();
			}

			if(cache.getData(this.getVal())){
				var cacheData = cache.getData(this.getVal())
				console.log("cache::::",cacheData);
				this.$elem.trigger('getOk',cacheData);
				return;
			}
			//以上有待思考


			this.jqXHR = $.ajax({
				url:this.options.url + this.getVal(),
				dataType:"jsonp",
				jsonp:'callback',
			})
			.done(function(data){
				// console.log(this.$elem);
				this.$elem.trigger('getOk',data)
				cache.addData(this.getVal(),data);
			}.bind(this))
			.fail(function(err){
				console.log(err);
				this.$elem.trigger('getErr')
			}.bind(this))
			.always(function(){
				this.jqXHR = null;
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
		setInputVal:function(val){
			this.$searchInput.val(val);
		}
	};


	Search.DEFAULTS = {
		autocomplete:true,
		url:'https://suggest.taobao.com/sug?q=',
		delayGetData:500
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