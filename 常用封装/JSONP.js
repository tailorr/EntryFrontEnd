jsonp({
    url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
    type: 'get',
    data: {
        wd: 'jsonp'
    },
    callback: 'cb',
    success: function(data) { console.log(data) }
});

function jsonp(options) {
    let url = options.url
    let data = options.data

    let oBody = document.getElementsByTagName('body')[0]
    let oScript = document.createElement('script')

    let callbackName = 'cb' + (~~(Math.random() * 0xffffff)).toString(16)
    window[callbackName] = function(result) {
        options.success(result)
    }
    data[options.callback] = callbackName

    oScript
        .setAttribute('src', url + '?' + format(data))
    oBody.append(oScript)
}

function format(data) {
    let str = ''
    for (var p in data) {
        str += encodeURIComponent(p) + '=' + encodeURIComponent(data[p]) + '&'
    }
}