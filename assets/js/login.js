$(function () {

    let layer = layui.layer
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



    //调用layui 中的 form属性这个对象
    let form = layui.form
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        // 校验两次密码是否一致
        repwd: function (value) {
            let pwd = $('.regbox  [name=password]').val()
            if (pwd !== value) return '两次密码输入不一致'
        }
    })


    //注册模块发请求模块

    $('#form_reg').on('submit', (e) => {
        //阻止默认的提交行为
        e.preventDefault()
        //准备好需要上传的数据
        let data = {
            username: $('.regbox [name=username]').val(),
            password: $('.regbox [name=password]').val(),
            repassword: $('.regbox [name=repassword]').val()
        }

        //发起注册请求
        $.ajax({
            method: 'POST',
            url: '/api/reg',
            data,
            success(res) {
                // console.log(res);
                if (res.code !== 0) {
                    return layer.msg('本次请求失败')
                }
                layer.msg('注册成功，请登录')
                setTimeout(() => {
                    $('#link_reg').click()
                }, 1000)
            }
        })
    })

    //登录请求模块
    $('#form_login').on('submit', (e) => {
        // let fd = new FormData($('#form_login'))
        // console.log(fd);
        //阻止默认的跳转
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $('#form_login').serialize(),
            
            success(res) {
                if (res.code !== 0) {
                    return layer.msg('本次登录失败')
                }
                layer.msg('本次登录成功')
                console.log(res);
                //保存令牌
                localStorage.setItem('token',res.token)
                //跳转后台主页
                location.href = '../../index.html'
            }
        })
    })
})