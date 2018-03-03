$(function(){

    NProgress.configure({ showSpinner: false });
    NProgress.start();
    NProgress.done();
    /*$(document).ajaxStart(function(){
        NProgress.start();
    });

    $(document).ajaxStop(function(){
        setTimeout(function() {
            NProgress.done();
        },500);
    });*/
    //<!--二级菜单的显示与隐藏-->
//<!--思路：找到二级分类的a标签-->
    $(".child").prev().on("click", function () {
        $(this).next().slideToggle();
    });

    //点击.icon_menu侧边栏的显示与隐藏
    $(".icon_menu").on("click",function(){
        //一。侧边栏隐藏
        //二。主体部分的padding为0
        $(".lt_aside").toggleClass("now");
        $(".lt_main").toggleClass("now");
        $(".lt_topbar").toggleClass("now");
    })

    //点击.icon_menu侧边栏的显示与隐藏
    $(".icon_logout").on("click",function(){
        /*模态框显示*/
        $('#logoutModal').modal('show');
    })

    /*点击退出按钮，退出登录*/
    $(".btn_logout").on("click",function(){
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            success:function(info){
                console.log(info);
                if(info.success){
                    location.href="login.html";
                }
            }
        })

    });



});




