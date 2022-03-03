$(function () {
    var layer = layui.layer
    initArtCateList()
    var form = layui.form
    form.verify({
        number: [
            /^[A-Za-z0-9]{1,15}$/
            , '分类别名必须是1-15位的字母和数字'
        ]
    })
    // 获取文章分类的列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }

    var indexAdd = null
    $('#btnAddCate').on('click', function () {
        indexAdd = layer.open({
            type: 1,
            title: '添加文章分类',
            content: $('#dialog-add').html(),
            area: ['500px', '250px']
        });
    })

    // 通过代理的形式，为form-data 表单绑定 submit事件
    $('body').on('submit', '#form-data', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                initArtCateList()
                layer.msg(res.message)
                // 根据索引，关闭弹出层
                layer.close(indexAdd)
            }
        })
    })

    var indexModify = null
    $('body').on('click', '#btn-modify', function () {
        var id = $(this).attr('number')
        indexModify = layer.open({
            type: 1,
            title: '修改文章分类',
            content: $('#form-modify').html(),
            area: ['500px', '250px']
        });
        $.ajax({
            method: 'GET',
            url: '/my/article/cates/' + id,
            success: function (res) {
                form.val('modify-data', res.data)
            }
        })
    })

    $('body').on('submit', '#modify-data', function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新分类数据失败！')
                }
                initArtCateList()
                layer.msg('更新分类数据成功！')
                layer.close(indexModify)
            }
        })
    })

    $('body').on('click', '#btn-delete', function () {
        var id = $(this).attr('number')
        layer.confirm('确认删除吗？', { icon: 3, title: '提示' }, function (index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    if (res.status !== 0) {
                        return layer.msg('删除失败！')
                    }
                    initArtCateList()
                    layer.msg('删除成功！')
                    layer.close(index);
                }
            })
        });
    })
})