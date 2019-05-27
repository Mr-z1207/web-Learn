function Tab(aBtn,aCont) {
		this.aBtn = document.querySelectorAll(aBtn)
		this.aCont = document.querySelectorAll(aCont)
		this.init()
		this.clickBtn()
	}
	Tab.prototype.init = function() {
		this.aBtn[0].className = "check"
		this.aCont[0].style.display= "block"
	}
	Tab.prototype.clickBtn = function() {
		for (var i = 0; i < this.aBtn.length; i++) {
			this.aBtn[i].index = i
			var _this = this
			this.aBtn[i].onclick = function() {
				_this.change(this)
			}
		}
	}
	Tab.prototype.change = function(oBtn) {
		for (var i = 0; i < this.aBtn.length; i++) {
			this.aBtn[i].className = "";
			this.aCont[i].style.display= "none"
		}
		oBtn.className = "check"
		this.aCont[oBtn.index].style.display= "block"
	}