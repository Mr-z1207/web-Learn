(function($) {
	var js = {
		showner : {
			init : function($elem) {
				init($elem)
			},
			show : function($elem) {
				console.log($elem)
				show($elem,function() {
					$elem.show()
					$elem.trigger('shown').data('sta','shown')
				})
			},
			hide : function($elem) {
				hide($elem,function() {
					$elem.hide()
					$elem.trigger('hidden').data('sta','hidden')
				})
			}
		},
		fade : {
			init : function($elem) {
				js._init($elem)
			},
			show : function($elem) {
				js._show($elem,'fadeIn')
			},
			hide : function($elem) {
				js._hide($elem,'fadeOut')
			}
		},
		slide : {
			init : function($elem) {
				js._init($elem)
			},
			show : function($elem) {
				js._show($elem,'slideDown')
			},
			hide : function($elem) {
				js._hide($elem,'slideUp')
			}
		},
		slideRow : {
			init : function($elem) {
				js._rowInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0
				})
			},
			show : function($elem) {
				js._rowShow($elem)
			},
			hide : function($elem) {
				js._rowHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0
				})
			}
		},
		fadeslideRow : {
			init : function($elem) {
				console.log($elem)
				js._rowInit($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0
				})
			},
			show : function($elem) {
				js._rowShow($elem)
			},
			hide : function($elem) {
				js._rowHide($elem,{
					width:0,
					paddingLeft:0,
					paddingRight:0,
					borderLeftWidth:0,
					borderRightWidth:0,
					opacity:0
				})
			}
		}
	}



	//*****************防止多次点击**************************
	function init($elem,hiddenback) {
		if ($elem.is(':hidden')) {
			$elem.data('sta','hidden')
			typeof hiddenback == "function" && hiddenback()
		}else{
			$elem.data('sta','shown')
		}
	}
	function show($elem,callback) {
		if ($elem.data('sta') == 'show') return;
		if ($elem.data('sta') == 'shown') return;
		$elem.trigger('show').data('sta','show')
		typeof callback == 'function' && callback();
	}
	function hide($elem,callback) {
		if ($elem.data('sta') == 'hide') return;
		if ($elem.data('sta') == 'hidden') return;
		$elem.trigger('hide').data('sta','hide')
		typeof callback == 'function' && callback();
	}
	//******************************************************

	//*****************抽离出的函数**************************
	js._init = function($elem,hiddenback) {
		$elem.removeClass('transition')
		init($elem,hiddenback)
	}
	js._show = function($elem,mod) {
		show($elem,function() {
			$elem.stop()[mod](function() {
				$elem.trigger('shown').data('sta','shown')
			})
		})
	}
	js._hide = function($elem,mod) {
		hide($elem,function() {
			$elem.stop()[mod](function() {
				$elem.trigger('hidden').data('sta','hidden')
			})
		})
	}
	js._rowInit = function($elem,options) {
		var styles = {};
		for(key in options){
			styles[key] = $elem.css(key)
		}
		$elem.data('styles',styles)
		js._init($elem,function(){
			$elem.css(options)
		})
	}
	js._rowShow = function($elem) {
		$elem.show()
		show($elem,function(){
			$elem.animate($elem.data('styles'),function() {
				$elem.trigger('shown').data('sta','shown')
			})
		})
	}
	js._rowHide = function($elem,options) {
		hide($elem,function() {
			$elem.animate(options,function() {
				$elem.trigger('hidden').data('sta','hidden')
			})
		})
	}


	//********************************************************
	//获取显示隐藏动画的方法
	function getShowHide($elem,mode){
		if (!mode) {
			mode = 'fade'
		}
		//初始化
		js[mode].init($elem);

		//返回对应的显示隐藏方法
		return {
			show:js[mode].show,
			hide:js[mode].hide
		}
	}

	//封装showHide插件
	$.fn.extend({
		showHide:function(mode){
			//遍历元素,实现隐式迭代
			return this.each(function(){//实现单例模式
				var $elem = $(this);
				var showHideObj = $elem.data('showHideObj');
				if(!showHideObj){
					showHideObj = getShowHide($elem,mode);
					$elem.data('showHideObj',showHideObj);
				}
				//第二次进入该函数则是调用显示隐藏的动画方法
				if(typeof showHideObj[mode] == 'function'){
					showHideObj[mode]($elem)
				}
			})
		}
	})
})(jQuery)