;(function($){
    var $btn = $('button')
    // console.log($btn)
    $btn.eq(0).on('click',function() {
       $.ajax({
        url:"/users/34/books/8989",
        type:"get",
        success:function(res) {
            console.log(res)
        }
       })
    })
    $btn.eq(1).on('click',function() {
        $.ajax({
        url:"/",
        type:"post",
        success:function(res) {
            console.log(res)
        }
       })
    })
    $btn.eq(2).on('click',function() {
       $.ajax({
        url:"/",
        type:"put",
        success:function(res) {
            console.log(res)
        }
       })
    })
    $btn.eq(3).on('click',function() {
        $.ajax({
        url:"/",
        type:"delete",
        success:function(res) {
            console.log(res)
        }
       })
    })
})(jQuery)