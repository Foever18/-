$(function() {
    $('#link_reg').click(
        ()=>{
            $('.login-box').hide()
            $('.reg-box').show()
        }
    );
    $('#link_login').click(
        ()=>{
            $('.login-box').show()
            $('.reg-box').hide()
        }
    )
    // 先获取form
    let form= layui.form

    // 定义表单的验证规则
    form.verify({
        pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        // 确认密码规则
        repwd:function(val){
            let pwd =$('.reg-box [name=password]').val();
            if(val != pwd){
                return '两次输入的密码不一致'
            }
        }
    })

    const baseUrl = "http://www.liulongbin.top:3007";
    // 导入layui插件
    const layer =layui.layer
    // 监听注册列表的请求事件
    $('#form_reg').on('submit',function(e){
        // 阻止表单的默认事件
        e.preventDefault()
        // 提交ajax请求
        $.ajax({
            type: 'POST',
            url:"/api/reguser",
            data:{
               username:$('#form_reg [name=username]').val(),
               password:$('#form_reg [name=password]').val()
            },
            success:(res)=>{
                if(res.status !=0) return layer.msg('注册失败')
                layer.msg('注册成功')
                $('#link_login').click()
            }
        })
    })

    // 监听登录表单的提交事件
    $('#form_login').on('submit',function(e){
        e.preventDefault()
        $.ajax({
            type: 'POST',
            url:"/api/login",
            data:$(this).serialize(),
            success: function (res){
                console.log(res);
                if(res.status !=0) return layer.msg('登录失败')
                layer.msg('登录成功')
                // 把数据存储到本地
                localStorage.setItem("token", res.token);
                // 跳转到主页
                location.href = "/index.html";
            }
        })
    })
})