$(function() {
    getUserInfo()
})
const layer = layui.layer
function getUserInfo(){
    $.ajax({
        type: "GET",
        url:'/my/userinfo',
        headers: {
            Authorization:localStorage.getItem('token'),
        },
        success: function(res){
            console.log(res);
            if(res.status !==0) return layer.msg('获取用户信息失败')
            layer.msg('获取用户信息成功')
            randerAvatar(res.data)
        },

    }) 
}

// 渲染用户信息
const randerAvatar = (user) =>{
    //获取用户名字
    const name = user.nikname || user.username
    console.dir(name);
    $('#welcome').html(`欢迎 ${name}`);
    // 渲染头象
    if(user.user_pic !== null){
        $('.layui-nav-img').attr('src', user.user_pic).show();
        $('.text-avatar').hide

    }else{
        $('.layui-nav-img').attr('src', user.user_pic).hide();
        const firstName =name[0].toUpperCase();
        $('.text-avatar').html(firstName).show()
    }
}
// 退出登录
$("#btnLogout").click(() => {
    layui.layer.confirm(
        "确定退出登录？",
        { icon: 3, title: "" },
        function (index) {
            // 清空本地存储里面的 token
            localStorage.removeItem("token");
            // 重新跳转到登录页面
            location.href = "/login.html";
        }
    );
});