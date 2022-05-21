$(function () {
    let layer = layui.layer
    let form = layui.form
    let laypage = layui.laypage
    //定义查询的参数对象
    let q = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    //获取所有文章数据
    getArtdata()
    initList()

    //定义获取所有文章数据的函数
    function getArtdata() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success(res) {
                if (res.code !== 0) {
                    return layer.msg('获取失败')
                }
                // 成功之后将数据渲染到页面
                let htmlStr = template('tpl_art', res)
                // console.log(htmlStr);
                $('tbody').html(htmlStr)
                initPage(res.total)
            }
        })
    }

    //过滤器----时间美化
    template.defaults.imports.datatime = function (value) {
        let time = new Date(value)
        let y = time.getFullYear()
        let m = time.getMonth() + 1
        let d = time.getDate()
        let hh = time.getHours()
        let mm = time.getMinutes()
        let ss = time.getSeconds()
        return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
    }


    //初始化分类列表
    function initList() {
        $.ajax({
            method: 'GET',
            url: '/my/cate/list',
            success(res) {
                if (res.code !== 0) {
                    return layer.msg('获取分类失败')
                }
                console.log(res);
                //调用模板引擎，将分类数据渲染到页面
                let htmlStr = template('tpl_cate', res)
                // console.log(htmlStr);
                $('[name=cate_id]').html(htmlStr)
                form.render()
            }
        })
    }

    //筛选功能
    $('#form-search').on('submit', function (e) {
        e.preventDefault()
        // 获取表单中选中项的值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 q 中对应的属性赋值
        q.cate_id = cate_id
        q.state = state
        // 根据最新的筛选条件，重新渲染表格的数据
        getArtdata()
    })


    //分页功能
    function initPage(num) {
        laypage.render({
            elem: 'pageCate',
            count: num,
            limit: q.pagesize,
            curr: q.pagenum,
            jump(obj, first) {
                // console.log(obj.curr);
                q.pagenum = obj.curr
                if (!first) {
                    getArtdata()
                }
            }
        });
    }


    //为编辑按钮添加事件
    $('tbody').on('click','#btn_Edit', function () {
        // console.log($(this).attr('data-id'));
        localStorage.setItem('id',$(this).attr('data-id'))
        location.href = '../../../art/art_pub.html'
    })

})