$.ajaxPrefilter(function (jun) {
    jun.url = 'http://ajax.frontend.itheima.net' + jun.url



    //统一由权限的接口 设置 headers 请求头
    if (jun.url.indexOf('/my/') != -1) {
        jun.headers = {
            Authorization: localStorage.getItem('token') || ''
        }
    }


    // 全局统一挂载 complete 回调函数
    jun.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token')
            location.href = 'denglu.html'   
        }
    }
}) 