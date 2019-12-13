(function($) {
	function init($elem) {
		this.$elem = $elem;
		this.currentX = parseFloat(this.$elem.css('left'));
		this.currentY = parseFloat(this.$elem.css('top'));
	}
	function to(x,y,callback) {
		x = (typeof x == 'number') ? x : this.currentX;
		y = (typeof y == 'number') ? y : this.currentY;
		if(this.currentX == x && this.currentY == y) return;
		this.$elem.trigger('move');
		typeof callback == 'function' && callback(x,y)
		this.currentX = x;
		this.currentY = y;
	}
	function SilentMove($elem){
		init.call(this,$elem)
	}
	SilentMove.prototype = {
		constructor:SilentMove,
		to:function(x,y){
			to.call(this,x,y,function() {
				this.$elem.css({
					left:x,
					top:y
				});
				this.$elem.trigger('moved');
			}.bind(this))
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}
	}
	function JsMove($elem) {
		init.call(this,$elem)
	}
	JsMove.prototype = {
		constructor:JsMove,
		to:function(x,y){
			to.call(this,x,y,function() {
				this.$elem.stop().animate({
					left:x,
					top:y
				},function() {
					this.$elem.trigger('moved');
				}.bind(this))
			}.bind(this))
		},
		x:function(x){
			this.to(x);
		},
		y:function(y){
			this.to(null,y)
		}
	}

	function getmove($elem,options){
		var move = null;
		if(options.js){
			move = new JsMove($elem);
		}else{
			move = new SilentMove($elem);
		}
		// console.log(move);
		// return move;
		return {
			to:move.to.bind(move),
			x:move.x.bind(move),
			y:move.y.bind(move)
		}
	}

	//当不传任何参数时的默认显示动画
	var DEFAULTS = {
		js:true
	}

	$.fn.extend({
		move:function(options,x,y){
			//遍历元素,实现隐式迭代
			return this.each(function(){//实现单例模式
				var $elem = $(this);
				var moveObj = $elem.data('moveObj');
				if(!moveObj){
					options = $.extend({},DEFAULTS,options);
					moveObj = getmove($elem,options);
					$elem.data('moveObj',moveObj);
				}
				//第二次进入该函数则是调用移动的动画方法
				if(typeof moveObj[options] == 'function'){
					moveObj[options](x,y)
				}
			})
		}
	})
})(jQuery)