$(function () {
    const layer = layui.layer
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $("#image");
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: ".img-preview",
  };

  // ?1.3 创建裁剪区域
  $image.cropper(options);
  
//   模拟点击文件选择框
$('#buttonChooseImg').on('click', function(e) {
    $('#file').click()
})

//? 2.设置图片
$('#file').change(function(e) {
    let fileList = e.target.files
    if(fileList.length === 0) return layer.msg('请上传图片后操作')
    let file = e.target.files[0]
    let imgURL = URL.createObjectURL(file)
    $image
    .cropper("destroy") // 销毁旧的裁剪区域
    .attr("src", imgURL) // 重新设置图片路径
    .cropper(options); // 重新初始化裁剪区域
})

// ?3.上传图片
//  为确定按钮绑定点击事件
$("#btnUpload").click((e)=>{
    // 转化图片为字符串
    const dataURL = $image.cropper("getCroppedCanvas", {
        // 创建一个 Canvas 画布
        width: 100,
        height: 100,
    })
    .toDataURL("image/png");
    
    // *3.1发送ajax请求
    $.ajax({
        type: "POST",
        url:"/my/update/avatar",
        data:{
            avatar:dataURL
        },
        success: function (res){
            console.log(res);
            if(res.status !== 0) return layer.msg('上传头像失败')
            layer.msg('上传头像成功')
            window.parent.getUserInfo()
        }
    })
})
});
