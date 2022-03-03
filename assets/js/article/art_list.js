$(function () {
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage
    var p = {
        pagenum: 1,
        pagesize: 2,
        cate_id: '',
        state: ''
    }

    // 过滤器
    template.defaults.imports.dataForm = function (data) {
        var dt = new Date(data)
        var y = padZero(dt.getFullYear())
        var m = padZero(dt.getMonth() + 1)
        var d = padZero(dt.getDate())

        var hh = padZero(dt.getHours())
        var mm = padZero(dt.getMinutes())
        var ss = padZero(dt.getSeconds())

        return y + '-' + m + '-' + d + '' + hh + ':' + mm + ':' + ss
    }

    function padZero(n) {
        return n > 9 ? n : '0' + n
    }

    initTable()
    initCate()

    function initTable() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: p,
            success: function (res) {
                console.log(res)
                if (res.status !== 0) {
                    return layer.msg('获取列表失败！')
                }
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
                renderPage(res.total)
            }
        })
    }

    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取分类失败')
                }
                var htmlStr = template('tpl-cate', res)
                $('[name="cate_id"]').html(htmlStr)
                form.render()
            }
        })
    }
    // 为表单绑定submit事件
    $('#form-screen').on('submit', function (e) {
        e.preventDefault();
        // 获取表中的选中项值
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        // 为查询参数对象 p 中对应的属性赋值
        p.cate_id = cate_id
        p.state = state
        // 重新渲染列表
        initTable()
    })
    // 定义渲染分页的方法
    function renderPage(total) {
        laypage.render({
            elem: 'pageBox' //注意，这里的 test1 是 ID，不用加 # 号
            , count: total //数据总数，从服务端得到
            , limit: p.pagesize
            , curr: p.pagenum
            , limits: [2, 3, 5, 10]
            , layout: ['count', 'limit', 'prev', 'page', 'next', 'skip']
            , jump: function (obj, first) {
                // 把最新的页码值，赋值到p这个查询参数对象中
                p.pagenum = obj.curr // 得到当前页，以便向服务器端请求对应页的数据
                p.pagesize = obj.limit
                if (!first) {
                    initTable()
                }
            }
        });
    }
    // 通过代理的形式，为删除按钮添加点击事件处理函数
    $('body').on('click', '#btn-delete', function() {
        var id = $(this).attr('btn-data')
        var len = $(this).length
        layer.confirm('确认删除吗？', {icon: 3, title:'提示'}, function(index){
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    layer.msg('删除成功！')
                    // 当删除数据完成后，需要判断这一页中，是否还有剩余的数据
                    // 如果没有剩余的数据了，则让页码值 -1 之后，再重新调用 initTable方法
                    if (len === 1) {
                        // 如果len的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        p.pagenum === 1 ? 1 : p.pagenum - 1
                    }
                    initTable()
                } 
            })
            layer.close(index);
          });
    })
})