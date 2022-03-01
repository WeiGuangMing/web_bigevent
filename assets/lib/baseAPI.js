// 注意：每次调用 $.get() 或 $.post() $.ajax() 的时候，会先调用ajaxPrefilter这个函数，在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(option) {
    option.url = "http://www.liulongbin.top:3007" + option.url
    // console.log(option)
    // 统一为有权限的接口设置headers属性
    if (option.url.indexOf('/my/') !== -1) {
        option.herders = {Authorization:localStorage.getItem('token') || ''}
    }
    option.complete = function(res) {
        // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
            // 清空本地token值
            localStorage.removeItem('token')
            // 跳转到登录页面
            location.href = '/login.html'
        }
    }
})