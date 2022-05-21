$(function () {
  const layer = layui.layer;
  const initArtCateList = () => {
    $.ajax({
      type: "GET",
      url: "/my/article/cates",
      success: function (res) {
        if (res.status !== 0) return layer.msg("获取数据失败");
        layer.msg("获取数据成功");
        const htmlStr = template("tpl-table", res);
        $("tbody").empty().html(htmlStr);
      },
    });
  };
  initArtCateList();
// ?添加弹窗
let indexAdd = null
  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $('#dialog-add').html(),
    });
  });

//   ?添加分类
// 添加事件委托
$('body').on('submit',"#form-add",function(e){
    e.preventDefault();
    $.ajax({
        type: "POST",
        url:"/my/article/addcates",
        data: $(this).serialize(),
        success: function (res){
            if(res.status !== 0) return layer.msg('文件添加失败');
            layer.msg('文件添加成功')
            initArtCateList()
            layer.close(indexAdd)
        }
    })
})
});
