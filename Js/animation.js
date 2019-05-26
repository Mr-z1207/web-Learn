function animation(obj,options,lianer,fn) {
		if (lianer == undefined) {
			lianer = true
		}
		clearInterval(obj.timer)
		obj.timer = setInterval(function() {
			var allStop = true
			for(attr in options){
				var stop = false
				var current = parseFloat(getComputedStyle(obj,false)[attr])
				if (attr == "opacity") {
					current = current * 100
				}
				var iSpeed = 0;
				if (lianer) {
					if (current < options[attr]) {
						iSpeed = 5
					} else {
						iSpeed = -5
					}
					if (Math.abs((options[attr] - current)) < Math.abs(iSpeed)) {
						if (attr == "opacity") {
							obj.style[attr] = options[attr]/100
						}else{
							obj.style[attr] = options[attr] + "px"
						}
						stop = true
					}else{
						allStop = false
					}
				} else {
					var iSpeed = (options[attr] - current)/10;
					iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed)
					if (!iSpeed) {
						stop = true
					}else{
						allStop = false
					}
				}
				if (!stop) {
					if (attr == "opacity") {
						obj.style[attr] = (current + iSpeed)/100
					}else{
						obj.style[attr] = current + iSpeed + "px"
					}
				}
			}
			if (allStop) {
				clearInterval(obj.timer)
				if (typeof fn == "function") {
					fn()
				}
			}
		},50)
	}