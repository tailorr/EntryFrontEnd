function jsonp(options) {
    var options.success = options.success || function() {}
    var options.error = options.error || function() {}
    var options.data = options.data || {}
    var options.callback = options.callback || 'callback'
    var options.url = options.url || ''

    document.createElement('script')
    script.setAttribute('src', options.url + '?callback=' + options.callback)
    document.head.appendChild(script)
    document.head.removeChild(script)

    options.success && options.success()
}