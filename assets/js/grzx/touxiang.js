$(function () {
    var layer = layui.layer
    // 1.1 获取裁剪区域的 DOM 元素
    var $image = $('#image')
    // 1.2 配置选项
    const options = {
        // 纵横比
        aspectRatio: 1,
        // 指定预览区域
        preview: '.img-preview'
    }

    // 1.3 创建裁剪区域
    $image.cropper(options)


    $('#xiaojun').on('click', function () {
        $('#file').click()
    })

    //绑定 change 事件
    $('#file').on('change', function (e) {
        var filelist = e.target.files
        if (filelist.length === 0) {
            return layer.msg('请选择照片！')
        }

        //拿到选择文件
        var file = e.target.files[0]
        //转化文件路径
        var imgURL = URL.createObjectURL(file)
        //重新初始化裁剪区域
        $image
            .cropper('destroy')      // 销毁旧的裁剪区域
            .attr('src', imgURL)  // 重新设置图片路径
            .cropper(options)        // 重新初始化裁剪区域
    })

    // 为确定按钮绑定点击事件
    $('#btnUpload').on('click', function () {
        //拿到裁剪的图片
        var dataURL = $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 100,
                height: 100
            })
            .toDataURL('image/png')       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
        //上传头像
        $.ajax({
            method: 'POST',
            url: '/my/update/avatar',
            data:{
                avatar:dataURL
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('更换头像失败！')
                }
                layer.msg('更换头像成功！')
                window.parent.getUserInfo()
            }
        })
    })
})