$(function () {
    //登录后获取用户的个人信息
    getuserInfo()
})

let layer = layui.layer

//定义获取用户的个人信息
function getuserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success(res) {
            if (res.code !== 0) {
                return layer.msg('用户信息获取失败')
            }
            layer.msg('用户信息获取成功')
            // console.log(res);
            renderAvatar(res)
        }
    })
}


//渲染用户的头像和名称
function renderAvatar(res) {
    //按需选择渲染的名称
    let name = res.data.nickname || res.data.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    //按需选择头像
    if (res.data.user_pic == null) {
        let firstname = name[0].toUpperCase()
        $('.text-avatar').html(firstname).show()
        $('.layui-nav-img').hide()
    }else {
        $('.text-avatar').hide()
        $('.layui-nav-img').attr('src',res.data.user_pic).show()
    }
}

//为退出添加点击事件
$('#exits').on('click',function () {
    layer.confirm('确定要退出吗?', {icon: 3, title:'提示'}, function(index){
        location.href = '../../login.html'
        localStorage.removeItem('token')
        layer.close(index);
      });
})