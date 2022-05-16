$(function () {
    //点击’去注册账号‘ 链接【
    $('#link_login').on('click', function () {
        $('.regbox').show()
        $('.loginbox').hide()
    })
    //点击 去登陆 链接
    $('#link_reg').on('click', function () {
        $('.regbox').hide()
        $('.loginbox').show()
    })
})