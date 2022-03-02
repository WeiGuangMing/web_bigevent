$(function () {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        pass: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ]
    })
    $('#resetForm').on('submit', function (e) {
        e.preventDefault();
        var formData = $('#resetForm').serializeArray()
        resetPassWord(layer, formData)
    })
})
// 重置密码
function resetPassWord(layer, formData) {
    $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: $('#resetForm').serialize(),
        success: function (res) {
            // console.log(res)
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            if (res.oldPwd !== formData[0].oldPwd) {
                return layer.msg('原密码不正确！')
            } else if (formData[1].newPwd !== formData[2].rePwd) {
                return layer.msg('二次密码与上次不一致！')
            }
            // } else if (res.oldPwd === formData[1].newPwd) {
            //     return layer.msg('新密码不能与原密码相同')
            // }
            layer.msg(res.message)
            // 重置表单 要将jq对象转换为DOM对象才能使用reset方法
            $('#resetForm')[0].reset()
        }
    })

}