/**
 * Created by xqq on 2018/3/4.
 */
$(function(){

    var currentPage=1;
    var pageSize=5;
    function render() {
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            success: function (info) {
                console.log(info);
                $("tbody").html(template("first_tmp", info));
            }
        })
    }
    render();

    //一.一级分类的添加功能
    $(".btn_add").on("click",function(){
      $("#addModal").modal("show");
        });

    //表单校验功能
    var $form=$("#form");
    $form.bootstrapValidator({
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',
            invalid:'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        fields:{
            categoryName:{

                validators:{
                    notEmpty:{
                        message:"请输入一级分类的名称"
                    }
                }

            }
        }
    });

    //注册表单验证成功事件
    $form.on('success.form.bv', function (e) {
        e.preventDefault();
        $.ajax({
            type:"post",
            url:"/category/addTopCategory",
            data:$form.serialize(),
            success:function(info){
                console.log(info);
            }

        })
    });




    })



})