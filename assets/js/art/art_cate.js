$(function () {

    //进入页面就加载文章列表
    artList()

    let layer = layui.layer
    let form = layui.form

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
                // console.log(res);
                renderArt(res)
            }
        })
    }


    //渲染文章列表函数
    function renderArt(res) {
        let htmlStr = template('tpl_form', res)
        $('tbody').html(htmlStr)
    }



    //layer.form中的配置对象
    let option = {
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#renderAdd').html()
    }


    //判断按钮类别
    let type = null

    //为添加分类注册点击事件
    $('#addArtlist').on('click', function () {
        type = 0
        option.title = '添加文章分类'
        indexAdd = layer.open(option);
        Post()

    })


    //通过事件委托的形式， 为编辑按钮绑定事件
    $('tbody').on('click', '#btn_exits', function () {
        // console.log(this);
        //更改配置对象
        type = 1
        option.title = '编辑文章分类'
        // $('body #btn_Save').attr('id', 'btn_edit')
        //点击编辑后，弹出修改弹出层
        indexExits = layer.open(option);
        id = $(this).attr('data-id')
        Post()

    })

    //根据不同按钮，发起不同的请求函数
    function Post() {
        //添加功能
        if (type === 0) {
            //重置按钮 =》 置空
            $('#reset').on('click',function () {
                $('#art_cateForm').reset()
            })
           
            // 确认按钮 =》 发起新增请求
            $('body').on('click', '#btn_Save', function () {
                $.ajax({
                    method: 'POST',
                    url: '/my/cate/add',
                    data: $('#art_cateForm').serialize(),
                    success(res) {
                        // console.log(res);
                        if (res.code !== 0) {
                            return layer.msg('新增失败')
                        }
                        layer.msg('新增成功')
                        //关闭窗口
                        layer.close(indexAdd)
                        //修改后重新渲染数据
                        artList()
                        type = -1
                    }
                })
            })
        }
        if (type === 1) {
            $.ajax({
                method: 'GET',
                url: '/my/cate/info' + '?id=' + id,
                success(res) {
                    // console.log(res);
                    form.val('art_cateForm', res.data)
                }
            })
            //重置按钮 =》 回显数据
            $('body').on('click', '#reset', function () {

                $(this).attr('type', 'button')
                $.ajax({
                    method: 'GET',
                    url: '/my/cate/info' + '?id=' + id,
                    success(res) {
                        // console.log(res);
                        form.val('art_cateForm', res.data)
                    }
                })
            })
            //确认修改之后，发起修改请求
            $('body').on('click', '#btn_Save', function () {
                $.ajax({
                    method: 'PUT',
                    url: '/my/cate/info',
                    data: $('#art_cateForm').serialize(),
                    success(res) {
                        if (res.code !== 0) {
                            return leyer.msg('修改失败')
                        }
                        // console.log(res);
                        let htmlStr = template('tpl_form', res.data)
                        $('tbody').html(htmlStr)
                        artList()
                        //关闭窗口
                        layer.close(indexExits)
                        type = -1
                    }
                })
            })
        }
    }


    //删除功能
    $('body').on('click', '#delbtn', function () {
        let id = $(this).attr('data-id')
        $({
            method: 'DELETE',
            url: '/my/cate/del',
            data: {
                id
            },
            success(res) {
                if (res.code !== 0) {
                    return layer.msg('删除失败')
                }
                artList()
            }
        })
    })


})