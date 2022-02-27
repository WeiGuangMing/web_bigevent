$(function () {
    var Reg = /^[A-Za-z0-9]+$/;
    // var userDl = $("#user-dl").val()
    // var passwordDl = $("#password-dl").val()
    // var userZc = $("#user-zc").val()
    // var passwordZc = $("#password-zc").val()
    // var repasswordZc = $("#repassword-zc").val()
    $("#login_item_zc").on('click', 'a', function () {
        $("#login-form").hide()
        $("#login-form1").show()
    })
    $("#login_item_dl").on('click', 'a', function () {
        $("#login-form").show()
        $("#login-form1").hide()
    })

    // 登录效验
    $("#login-form").on("submit", function (e) {
        var userDl = $("#user-dl").val()
        var passwordDl = $("#password-dl").val()
        var data = $(this).serialize()
        e.preventDefault()
        if (Reg.test(userDl) && Reg.test(passwordDl) && userDl.length > 5 && userDl.length <= 10 && passwordDl.length > 5 && passwordDl.length <= 15) {
            $.ajax({
                method: 'POST',
                url: '/api/login',
                data: data,
                success: function(res) {
                    if (res.status === 0) {
                        $(".alert-success").html(res.message)
                        $(".alert-success").show()
                        setTimeout(function () {
                            $(".alert-success").hide()
                        }, 2000)
                        // 将登录成功得到的 token 字符串，保存到localStorage中
                        localStorage.setItem('token', res.token)
                        location.href = '/index.html'
                        // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTIyNDMsInVzZXJuYW1lIjoid2dtMTIzIiwicGFzc3dvcmQiOiIiLCJuaWNrbmFtZSI6IiIsImVtYWlsIjoiIiwidXNlcl9waWMiOiIiLCJpYXQiOjE2NDU5NjM0MzMsImV4cCI6MTY0NTk5OTQzM30.EmkMvOC7HyyUigRuWWhClCFxuOHt8icbrdr066-Nzks
                    }
                }
            })
        } else {
            $(".alert-danger").show()
            setTimeout(function () {
                $(".alert-danger").hide()
            }, 2000)
        }
    })

    // 注册效验
    $("#login-form1").on("submit", function (e) {
        var userZc = $("#user-zc").val()
        var passwordZc = $("#password-zc").val()
        var repasswordZc = $("#repassword-zc").val()
        e.preventDefault()
        if (Reg.test(userZc) && Reg.test(passwordZc) && Reg.test(repasswordZc) && userZc.length > 5 && userZc.length <= 10 && passwordZc.length > 5 && passwordZc.length <= 15 && repasswordZc.length > 5 && repasswordZc.length <= 15 && passwordZc === repasswordZc) {
            $.ajax({
                method: 'POST',
                url: '/api/reguser',
                data: { username: userZc, password: passwordZc },
                success: function (res) {
                    console.log(res)
                    if (res.status === 0) {
                        $(".alert-success").html(res.message)
                        $(".alert-success").show()
                        setTimeout(function () {
                            $(".alert-success").hide()
                        }, 2000)
                    }
                },
            })
        } else {

            $(".alert-danger").html("注册失败！")
            $(".alert-danger").show()
            setTimeout(function () {
                $(".alert-danger").hide()
            }, 2000)

        }
    })
})