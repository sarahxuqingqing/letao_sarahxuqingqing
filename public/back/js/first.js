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
            if(info.success){
                $("#addModal").modal("hide");
                currentPage:1;
                render();

                //把模态框中的数据重置
                $form.data("bootstrapValidator").resetForm();
                //$form是一个JQuery对象，没有reset方法
                //但是dom对象有reset方法，所以需要把form这个对象取出来，才能调用reset方法
                $form[0].reset();
            }
            }

        })
    });
    });