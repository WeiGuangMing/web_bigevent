$(function () {
    var layer = layui.layer;

    // 退出登录功能
    $('#btn-tuichu').on('click', function () {
        layer.confirm('确认退出登录吗？', { icon: 3, title: '提示' }, function (index) {
            //do something
            // 清空本地token
            localStorage.removeItem('token')
            // 跳转页面到登录页面
            location.href = '/login.html'
            layer.close(index);
        });
    })

    getUserInfo()
    // console.log(localStorage.getItem('token'))
    // 渲染头像和名称
})
function getUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        headers: { Authorization: localStorage.getItem('token') || "" },
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            renderAvatar(res.data)
        },
        // 不论失败还是成功都会调用complete回调函数
        // complete: function(res) {
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
        //         // 清空本地token值
        //         localStorage.removeItem('token')
        //         // 跳转到登录页面
        //         location.href = '/login.html'
        //     }
        // }
    })
}
function renderAvatar(user) {
    // console.log(user)
    // 如果nickname不为空那么优先显示nickname后者显示username
    var name = user.nickname || user.username
    // 渲染名称
    $('.text-name').html('欢迎&nbsp;&nbsp;' + name)
    // 按需渲染用户的头像
    if (user.user_pic === null) {
        // 渲染昵称首字母文本头像
        $('.text-avatar').html(name[0].toUpperCase()).show()
        $('.layui-nav-img').hide()
    } else {
        // 渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show
        $('.text-avatar').hide()
    }
}
