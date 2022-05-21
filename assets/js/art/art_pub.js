$(function () {
    edits()
    //渲染分类列表
    getCates()

    // 裁剪区域-------------------------------------
    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 400,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)

    //绑定选择封面的按钮
    $('#choosefile').on('click', function () {
        $('#coverFile').click()
    })

    //监听隐藏表单域的change事件
    $('#coverFile').on('change', function (e) {
        let files = e.target.files
        if (files.length <= 0) {
            return layer.msg('请选择相应的文件')
        }
        // 根据文件，创建对应的 URL 地址
        var newImgURL = URL.createObjectURL(files[0])
        // 为裁剪区域重新设置图片
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })



    //定义文章的状态
    let art_state = '已发布'
    $('#btnSave2').on('click', function () {
        //修改状态
        art_state = '草稿'
    })

    //表单提交模块----------------------------------------------------
    $('#form_pubArt').on('submit', function (e) {
        e.preventDefault()
        //创建formData收集表单数据
        let fd = new FormData($(this)[0])
        state = art_state
        fd.append('state', art_state)

        //添加图片参数
        $image
            .cropper('getCroppedCanvas', {
                // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function (blob) {
                // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                // 5. 将文件对象，存储到 fd 中
                fd.append('cover_img', blob)
                // 6. 发起 ajax 数据请求
                if (!localStorage.getItem('id')) {
                    $.ajax({
                        method: 'POST',
                        url: '/my/article/add',
                        data: fd,
                        // 注意：如果向服务器提交的是 FormData 格式的数据，
                        // 必须添加以下两个配置项
                        processData: false,
                        contentType: false,
                        success(res) {
                            console.log(res);
                            if (res.code !== 0) {
                                return layer.msg('上传文章失败')
                            }
                            // 发布文章成功后，跳转到文章列表页面
                            location.href = '../../../art/art_list.html'
                        }
                    })
                } 
                else {
                    let id = localStorage.getItem('id')
                    fd.append('id',id)
                    $.ajax({
                        method: 'PUT',
                        url: '/my/article/info',
                        data: fd,
                        processData: false,
                        contentType: false,
                        success(res) {
                            if (res.code !== 0) {
                                return layer.msg('更新请求失败')
                            }
                            location.href = '../../../art/art_list.html'
                            localStorage.removeItem('id')
                        }
                    })
                }
            })
    })

})







let layer = layui.layer
let form = layui.form
// 初始化富文本编辑器
initEditor()

//定义获取 文章分类的函数
function getCates() {
    $.ajax({
        method: 'GET',
        url: '/my/cate/list',
        success(res) {
            // console.log(res);
            //调用模板引擎，渲染下拉类别分类
            let htmlStr = template('tpl_cates', res)
            $('[name=cate_id]').html(htmlStr)
            form.render()
        }
    })
}



//进入页面之后，判断本地是否有id 值
function edits() {
    //如果有 id 号，就拿着id 去获取所有的文章数据
    if (localStorage.getItem('id')) {
        var id = localStorage.getItem('id')
        $.ajax({
            method: 'GET',
            url: '/my/article/info?id=' + id,
            success(res) {
                console.log(res);
                if (res.code !== 0) {
                    return layer.msg('回显数据获取失败')
                }
                // //回显数据获取成功之后，依次填入数据
                // // 回显标题
                $('[name=title]').val(res.data.title)
                // // 回显分类
                // console.log(res.data.cate_id);
                $('[name=cate_id]').val(res.data.cate_id)
                // // 回显内容
                // console.log($('[name=content]')[0]);
                // $('#text_area').html(res.data.content)
                // $('#text_area').innerHTML = '121212'

                //使用layui.form.val 来回显
                form.val('form_pub', res.data)  
            }
        })
    }
}