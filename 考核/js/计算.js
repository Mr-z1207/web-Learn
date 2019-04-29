var in1 = document.getElementById('in1');
var in2 = document.getElementById('in2');
var in3 = document.getElementById('in3');
var in4 = document.getElementById('in4');
var in5 = document.getElementById('in5');
var in6 = document.getElementById('in6');
var butt = document.getElementById('butt');

butt.onclick = function() {
	var num1 = parseFloat(in1.value);
	var num2 = parseFloat(in2.value);
	var num3 = parseFloat(in3.value);
	var num4 = parseFloat(in4.value);
	var num5 = parseFloat(in5.value);
	if (isNaN(num1)) {
		alert("第一输入框请输入正确的数字，例如“1，2，3…………”")
	}else if (isNaN(num2)) {
		alert("第二输入框请输入正确的数字，例如“1，2，3…………”")
	}else if (isNaN(num3)) {
		alert("第三输入框请输入正确的数字，例如“1，2，3…………”")
	}else if (isNaN(num4)) {
		alert("第四输入框请输入正确的数字，例如“1，2，3…………”")
	}else if (isNaN(num5)) {
		alert("第五输入框请输入正确的数字，例如“1，2，3…………”")
	}else{
		in6.value=num1+num2-num3*num4/num5 ;
	}
}