$.ajaxPrefilter(function (option) {
    //option就是ajax请求中的每一项
    let baseapi = 'http://www.liulongbin.top:3008';
    option.url = baseapi + option.url
})