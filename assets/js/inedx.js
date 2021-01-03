$(function () {
    // 调用 getUserInfo 获取用户基本信息
    getUserInfo()

    var layer = layui.layer

    // 点击按钮，实现退出功能
    $('#btnLogout').on('click', function () {
        // 提示用户是否确认退出
        layer.confirm('确定退出登录?', { icon: 3, title: '提示' },function (index) {
            // 清空本地存储中的 token
            localStorage.removeItem('token')
            // 重新跳转到登录页面
            location.href = 'denglu.html'

            // 关闭询问框
            layer.close(index)
        })
    })
})

//获取用户的基本信息
function getUserInfo() { 
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // headers 就是请求头配置对象
        // headers: {
        //     Authorization: localStorage.getItem('token') || ''
        // },
        success: function (res) {
            if (res.status !== 0) {
                return layui.layer.msg('获取用户信息失败！')
            }
            // 调用 renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        },
        complete: function (res) {
            if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
                //强制清空
                localStorage.removeItem('token')
                //强行跳转登录页面
                location.href = 'denglu.html'
            }
        }
    })
}

//渲染用户的头像
function renderAvatar(user) {
    //获取用户名字
    var name = user.nickname || user.username
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    if (user.user_pic !== null) {
        $('.layui-nav-img')
            .attr('src', user.user_pic)
            .show()
        $('.text-avatar').hide()
    } else {
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar')
            .html(first)
            .show()
    }
}
