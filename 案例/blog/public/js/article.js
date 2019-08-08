/*
* @Author: TomChen
* @Date:   2019-03-13 18:10:45
* @Last Modified by:   TomChen
* @Last Modified time: 2019-03-13 18:52:43
*/
;(function($){
	ClassicEditor
	.create(document.querySelector('#content'),{
		language:'zh-cn',
		ckfinder:{
			uploadUrl:'/article/uploadImage'
		}
	})
	.then(editor=>{
		window.editor = editor
	})
	.catch(err=>{
		console.log(err)
	})
})(jQuery);