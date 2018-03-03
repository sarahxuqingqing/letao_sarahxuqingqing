/**
 * Created by xqq on 2018/3/3.
 */
$(function(){

    //一.表单校验的功能
    $(".form-horizontal").bootstrapValidator({
        //二.指定校验图标
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
        },

        //一.指定校验字段
        fields:{
            //校验用户名
            username:{
                validators:{
                    notEmpty:{
                        message:"用户名不能为空"
                    },
                    stringLength: {
                        min: 2,
                        max: 6,
                        message: '用户名长度必须在2到6之间'
                    },
                    callback:{
                        message:"用户名不存在"
                    }
                }
            },
            password:{
                validators:{
                    notEmpty:{
                        message:"密码不能为空"
                    },
                    stringLength: {
                        min: 6,
                        max: 12,
                        message: '用户名长度必须在6到12之间'
                    },
                    callback:{
                        message:"密码错误"
                    }
                }
            }
        }
    });


    //二.需要给表单注册一个校验成功的事件
    $(".form-horizontal").on('success.form.bv', function (e) {
        e.preventDefault();
        //console.log($('.form-horizontal').serialize())
        $.ajax({
            type:"post",
            url:"/employee/employeeLogin",
            dataType:"json",
            data:$(".form-horizontal").serialize(),
            success:function(info){
                console.log(info);
                if(info.error===1000){
                    $(".form-horizontal").data("bootstrapValidator").updateStatus("username", "INVALID", "callback");
                };
                if(info.error===1001){
                    $(".form-horizontal").data("bootstrapValidator").updateStatus("password", "INVALID", "callback");
                };
                if(info.success==true){
                    location.href="index.html"
                };
            }
        })

    })
})

   //三.重置表单
    $("[type='reset']").on("click",function(e){
    //e.preventDefault();
    $(".form-horizontal").data('bootstrapValidator').resetForm();
})