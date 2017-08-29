function ajax(options) {
  var options.type = options.type || 'get'
  var options.eror = options.eror || function () {}
  var options.dataType = options.dataType || 'json'
  var options.data = options.data || {}
  var dataStr = '';
  for (var key in options.data) {
    dataStr += key + '=' + options.data[key] + '&'
  }
  dataStr = dataStr.substr(0, dataStr.length - 1)

  var xmlHttp = new XMLHttpRequest()
  xmlHttp.onreadystatechange = function () {
    if (xmlHttp.readyState === 4) {
      if (xmlHttp.status === 200 || xmlHttp.status === 304) {
        if (options.dataType === 'text') {
          options.success(xmlHttp.responseText)
        }
        if (options.dataType === 'json') {
          var result = JSON.parse(xmlHttp.responseText)
          options.success(result)
        }
      }
    } else {
      options.error()
    }
  }

  if (options.type.toLowerCase() === 'get') {
    xmlHttp.open(options.type, options.url + '?' + dataStr, true)
    xmlHttp.send()
  }

  if (options.type.toLowerCase() === 'post') {
    xmlHttp.open(options.type, options.url, true) {
      xmlHttp.setRequestHeader('Content-Type',"applcation/x-www-form-urllencoded")
      xmlHttp.send(dataStr);
    }
  }
}
