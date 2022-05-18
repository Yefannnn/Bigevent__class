$(function () {
    //给三个密码框添加表单验证
    let form = layui.form
    //导入layer模块
    let layer = layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            let pwd = $('[name=new_pwd]').val()
            if (pwd !== value) {
                return '两次输入密码不一致'
            }
        }
    })
})


//拿到密码之后发起请求
$('#form_pwd').on('submit', function (e) {
    e.preventDefault()
    $.ajax({
        method: 'PATCH',
        url: '/my/updatepwd',
        data: $(this).serialize(),
        success(res) {
            console.log(res);
            if (res.code !== 0) {
                return layer.msg('修改失败err:' + res.message)
            }
            //请求成功后提示用户并重置表单
            layer.msg('密码修改成功')
            console.log($('.layui-form')[0]);
            $('.layui-form')[0].reset()
        }
    })
})
//重置密码
$('#btn_reset').on('click', function () {
    $('.layui-form')[0].reset()
})