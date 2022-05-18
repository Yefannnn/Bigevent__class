$(function () {
    //进入页面就加载文章列表
    artList()
})

let layer = layui.layer

//获取文章列表的请求函数
function artList() {
    $.ajax({
        method: 'GET',
        url: '/my/cate/list',
        success(res) {
            if (res.code !== 0) {
                return layer.msg('请求文章列表失败')
            }
            layer.msg('请求列表成功')
            renderArt(res)
        }
    })
}


//渲染文章列表函数
function renderArt(res) {
    let htmlStr = template('tpl_form', res)
    $('tbody').html(htmlStr)
}


//为添加分类注册点击事件
$('#addArtlist').on('click', function () {
     indexAdd = layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#renderAdd').html()
    });
})

//按下确定之后POST数据
$('body').on('click', '#btn_Save', function () {
    $.ajax({
        method: 'POST',
        url: '/my/cate/add',
        data: $('#art_cateForm').serialize(),
        success(res) {
            console.log(res);
            if (res.code !== 0) {
                return layer.msg('新增失败')
            }
            layer.msg('新增成功')
            //关闭窗口
            layer.close(indexAdd)
            //修改后重新渲染数据
            artList()
            
        }
    })
})