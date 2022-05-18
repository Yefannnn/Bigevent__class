$.ajaxPrefilter(function (option) {
    //option就是ajax请求中的每一项
    let baseapi = 'http://www.liulongbin.top:3008';
    option.url = baseapi + option.url

    //为所有需要权限的请求添加请求头
    if (option.url.indexOf('/my/') !== -1) {
        option.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }

    //每次发起ajax请求的时候都去判断一下是否用户持有令牌，如果没有令牌就强制让它调回主页
    option.complete = function (res) {
        console.log(res);
        if (res.responseJSON.code === 1 && res.responseJSON.message === '身份认证失败！') {
            location.href = '../../login.html'
            localStorage.removeItem('token')
        }
    }
})