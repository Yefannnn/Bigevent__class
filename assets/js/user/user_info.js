$(function () {


    form.verify({
        nickname: function (value) { //value：表单的值、item：表单的DOM对象
            if (value.length < 6 && value.length > 1) {
                return '请输入1~6位昵称';
            }
        }
    })

    initUserInfo()


})

let form = layui.form
//初始化用户信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(res) {
            console.log(res);
            if (res.code !== 0) {
                return layer.msg('获取初始化信息失败')
            }
            layer.msg('获取初始化信息成功')
            form.val('from_userinfo', res.data);
        }
    })
}

//重置按钮  btn_reset 绑定点击事件
$('#btn_reset').on('click', function (e) {
    e.preventDefault()
    initUserInfo()
})

// 监听表单的提交事件
$('#user_info_form').on('submit', function (e) {
    e.preventDefault()
    //提交之后，将表单的数据打包发给后端
    $.ajax({
        method: 'PUT',
        url: '/my/userinfo',
        data: $(this).serialize(),
        success(res) {
            console.log(res);
            if (res.code !== 0) {
                return layer.msg('修改失败')
            }
            layer.msg('修改成功')
            //用户信息修改成功之后，重新获取用户信息并渲染
            window.parent.getuserInfo()
        }
    })
})