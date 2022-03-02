$(function () {
    var form = layui.form
    var layer = layui.layer;
    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return '昵称长度要在 1 ~ 6 个字符之间'
            }
        }
    })

    initUserInfo()

    // 初始化用户信息
    function initUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户列表信息失败！')
                }
                form.val("fm", res.data)
            }
        })
    }

    // 重置用户信息
    $('#btnReset').on('click', function(e) {
        // 阻止默认行为
        e.preventDefault();
        initUserInfo()
    })

    // 监听表单的提交事件
    $('.layui-form').on('submit', function(e) {
        // 阻止默认行为
        e.preventDefault()
        var formData = form.val("fm");
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: formData,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                layer.msg('更新用户信息成功！')
                // 调用父页面中的方法，重新渲染用户的头像和用户的信息
                window.parent.getUserInfo()
            }
        })
    })
})