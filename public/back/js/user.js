/**
 * Created by xqq on 2018/3/4.
 */
$(function(){

    var currentPage= 1;
    var pageSize= 5;
    function render(){
        $.ajax({
            type: "get",
            url: "/user/queryUser",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
            $("tbody").html(template("user_tmp",info));

              /* 渲染分页*/
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,
                    currentPage:currentPage,
                    totalPages: Math.ceil(info.total/pageSize),
                    onPageClicked:function(a,b,c,p){
                        currentPage=p;
                        render();
                    }
                });


            }
        })
    }
    render();

    //给表格中所有的按钮，注册点击事件
    $("tbody").on("click",".btn",function(){
        $("#userModal").modal("show");
        //获取到对应的id
        var id=$(this).parent().data("id");
        var isDelete=$(this).hasClass("btn-danger")?1:0;
        //给确定按钮注册事件
        $(".btn_confirm").off().on("click",function(){

            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                  id:id,
                  isDelete:isDelete,
                },
                success:function(info){
                    console.log(info);
                    if(info.success){
                        //关闭模态框
                        //重新渲染页面
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            })

        })

    })




})