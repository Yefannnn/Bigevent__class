$(function () {
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)




    //点击上传图片按钮
    $('#select_pic').on('click', function () {
        //手动点击文件上传
        $('#select_upload').click()
    })

    //为文件选择框绑定 change 事件
    $('#select_upload').on('change', function (e) {
        //拿到所有的文件对象
        //判断是否有
        let filelist = e.target.files
        if (filelist.length <= 0) {
            return layer.msg('请您输入有效图片')
        }
        //如果有文件，就将新的文件转化成url编码格式的路径->裁剪区域
        let file = e.target.files[0]
        let imgURL = URL.createObjectURL(file)
        // 3. 重新初始化裁剪区域
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', imgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域



        //为按钮绑定点击事件
        $('#btn_upload').on('click', function () {
            //确定上传之后，将裁剪区的图片转换成base64格式的文件
            var dataURL = $image
                .cropper('getCroppedCanvas', {
                    // 创建一个 Canvas 画布
                    width: 100,
                    height: 100
                })
                .toDataURL('image/png')
            //拿到生成好的文件，发起请求
            $.ajax({
                method: 'PATCH',
                url: '/my/update/avatar',
                data: {
                    avatar: dataURL
                },
                success(res) {
                    if (res.code !== 0) {
                        return layer.msg('上传失败' + res.message)
                    }
                    layer.msg('上传成功')
                    //更改成功之后调用函数进行渲染
                    window.parent.getuserInfo()
                   
                }
            })
        })



    })
})