(function($) {
	function Carousel($elem,options) {
		this.$elem = $elem
		this.options = options
		this.$courselItems = this.$elem.find('.carousel-item');
		this.$courselBtns = this.$elem.find('.btn-item');
		this.$courselControls = this.$elem.find('.control');

		this.now = this._getCorrectIndex(this.options.activeIndex)

		this.mode = ''

		//2.初始化
		this.init();
	}
	Carousel.prototype = {
		init:function() {
			var _this = this
			this.$elem.trigger('coursel-show',[this.now,this.$courselItems.eq(this.now)]);
			if(this.options.slide){//划入划出
				//1.移走所有图片,显示默认图片
				this.$elem.addClass('slide')
				this.$courselItems.eq(this.now).css({left:0});
				//记录当前容器的宽度
				this.itemWidth = this.$courselItems.eq(this.now).width()
				//初始化移动插件
				this.$courselItems.move({})
				//监听划入划出事件
				this.$courselItems.on('move',function(ev){
					var index = _this.$courselItems.index(this);
					if(_this.now != index){
						_this.$elem.trigger('coursel-show',[index,this]);
					}
				})
				this.mode = '_move'
			}else{//淡入淡出
				this.$elem.addClass('fade')
				this.$courselItems.eq(this.now).show()
				//初始化显示隐藏插件
				this.$courselItems.showHide('fade')
				//监听显示隐藏事件
				this.$courselItems.on('show',function(ev){
					var index = _this.$courselItems.index(this);
					_this.$elem.trigger('coursel-show',[index,this]);
				})
				this.mode = '_fade'
			}
			//2.底部按钮默认选中
			this.$courselBtns.eq(this.now).addClass('active')
			//3.监听鼠标移入移除显示隐藏左右按钮事件
			this.$elem.hover(function() {
				this.$courselControls.show()
			}.bind(this),function() {
				this.$courselControls.hide()
			}.bind(this))
			//4.(事件代理)监听点击左右划入划出图片事件
			this.$elem.on('click','.control-left',function() {
				this[this.mode](this._getCorrectIndex(this.now-1))
			}.bind(this))
			this.$elem.on('click','.control-right',function() {
				this[this.mode](this._getCorrectIndex(this.now+1))
			}.bind(this))
			//5.是否自动轮播
			if(this.options.autoplay){
				this.autoplay();
				//6.鼠标移入容器停止轮播移出开始轮播
				this.$elem.hover($.proxy(this.paused,this),$.proxy(this.autoplay,this))
			}
			//7.监听底部按钮事件
			this.$courselBtns.on('click',function(){
				//获取当前索引值
				var index = _this.$courselBtns.index(this)
				_this[_this.mode](index)
			})
		},
		_getCorrectIndex:function(num){
			if(num >= this.$courselItems.length) return 0;
			if(num <0) return this.$courselItems.length -1;
			return num;
		},
		_fade:function(index) {
			if(index == this.now) return;
			this.$courselItems.eq(this.now).showHide('hide')
			this.$courselItems.eq(index).showHide('show')
			this.$courselBtns.eq(this.now).removeClass('active')
			this.$courselBtns.eq(index).addClass('active')
			this.now = index
		},
		_move:function(index,direation) {
			if(index == this.now) return;
			//direation代表方向1表示正方向-1表示反方向
			if (index > this.now) {
				direation = 1
			}else{
				direation = -1
			}
			//1.把将要显示的放到指定位置
			this.$courselItems.eq(index).css({
				left:direation*this.itemWidth
			})
			//2.移走当前
			this.$courselItems.eq(this.now).move("x",-1*direation*this.itemWidth)
			//3.移入将要显示的
			this.$courselItems.eq(index).move("x",0)
			//4.底部按钮更新
			this.$courselBtns.eq(this.now).removeClass('active')
			this.$courselBtns.eq(index).addClass('active')
			//5.更新索引值
			this.now = index
		},
		autoplay:function(){
			clearInterval(this.timer);
			this.timer = setInterval(function(){
				this[this.mode](this._getCorrectIndex(this.now+1))
			}.bind(this),this.options.autoplay)
		},
		paused:function(){
			clearInterval(this.timer);
		}
	}


	Carousel.DEFAULTS = {
		slide:false,
		activeIndex:0,
		js:true,
		mode:'fade',
		autoplay:1000
	}

	$.fn.extend({
		carousel:function(options) {
			this.each(function() {
				var $elem = $(this)
				var carousel = $elem.data('carousel')
				if (!carousel) {
					options = $.extend({},Carousel.DEFAULTS,options);
					carousel = new Carousel($elem,options)
					$elem.data('carousel',carousel)
				}
				if (typeof carousel[options] == 'function') {
					carousel[options]()
				}
			})
		}
	})
})(jQuery)