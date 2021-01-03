$(function () {
    var form = layui.form
    var layer = layui.layer

    form.verify({
        nickname: function (value) {
            if (value.length > 6) {
                return'昵称长度必须在 1 ~ 6 个字符之间！'
            }
        }
    })

    initUserInfo()

    function initUserInfo() {
        $.ajax({
            method: "GET",
            url: '/my/userinfo',
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('获取用户信息！')
                }
                // console.log(res);
                //调用form.var()为表单赋值
                form.val('formUserInfo',res.data)
            }
        })
    }

    //重置表单
    $('#btnReset').on('click', function (e) {
        //阻止默认行为
        e.preventDefault()
        initUserInfo()
    })

    //监听表单提交事件
    $('.layui-form').on('submit', function (e) {
        //阻止默认行为
        e.preventDefault()
        //ajax请求
        $.ajax({
            method: 'POST',
            url: "/my/userinfo",
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                   return layer.msg('更新用户信息失败！')
                } 
                layer.msg('更新用户信息成功！')
                // 调用父页面的方法 重新渲染页面
                window.parent.getUserInfo()
            }
        })
    })
})