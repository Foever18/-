$(function () {
  const layer = layui.layer;
  const form = layui.form;
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
  let indexAdd = null;
  $("#btnAddCate").click(() => {
    indexAdd = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "添加文章分类",
      content: $("#dialog-add").html(),
    });
  });

  //   ?添加分类
  // 添加事件委托
  $("body").on("submit", "#form-add", function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "/my/article/addcates",
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) return layer.msg("文件添加失败");
        layer.msg("文件添加成功");
        initArtCateList();
        layer.close(indexAdd);
      },
    });
  });

  //? 通过代理方式，为 btn-edit 按钮绑定点击事件
  let indexEdit = null;
  $("tbody").on("click", ".btn-edit", function () {
    // 弹出修改文章分类的弹窗
    indexEdit = layer.open({
      type: 1,
      area: ["500px", "250px"],
      title: "修改文章分类",
      content: $("#dialog-edit").html(),
    });
    // 发送ajax请求id数据，并渲染
    $.ajax({
      type: "GET",
      url:"/my/article/cates/" + $(this).attr("data-id") ,
      success: function (res) {
        if(res.status !== 0) return layer.msg("获取数据失败")
        layer.msg("获取数据成功")
        form.val('form-edit',res.data)
      }
    })
  });

  // 更新文章分类
$("body").on("submit", "#form-edit", function (e) {
  e.preventDefault();
  $.ajax({
      method: "POST",
      url: "/my/article/updatecate",
      data: $(this).serialize(),
      success: (res) => {
          if (res.status !== 0) {
              return layer.msg("更新分类数据失败！");
          }
          layer.msg("更新分类数据成功！");
          layer.close(indexEdit);
          initArtCateList();
      },
  });
});

// 删除文章分类
$('tbody').on('click','.btn-delete',function(e) {
  const id = $(this).attr('data-id');
  layer.confirm("确定删除吗？", { icon: 3, title: "提示" }, function (index) {
    $.ajax({
      type: "GET",
      url: "/my/article/deletecate/" + id,
      success:function (res){
        if (res.status !== 0) return layer.msg("删除数据失败");
        layer.msg("删除数据失败")
        initArtCateList()
      }
    })
  })
})
});
