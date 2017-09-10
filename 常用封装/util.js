const Util = {
    on: (element, eventType, selector, fn) => {
        element.addEventListener(eventType, e => {
            let el = e.target; // The original target is usually the innermost element
            while (!el.matches(selector)) {
                if (el === element) {
                    //Query (silence) fail:  Reach the element itself => do nothing
                    el = null;
                    break;
                }
                el = el.parentNode;
            }
            el && fn.call(fn, e, el); // exp: element.onlick = (e, el) => { /* do sth ..*/}
        });
    },
    every: (nodeList, fn) => {
        nodeList.forEach((node, index) => {
            fn.call(null, node, index);
        });
    },
    index: element => {
        let index;
        element.parentNode.children.forEach((node, idx) => {
            index = node === element ? idx : -1;
        });
        return index;
    },
    append: (parent, children) => {
        children = typeof children.length === "undefined" ? [children] : children;
        children.forEach(node => parent.appendChild(node));
        return parent;
    },
    prepend: (parent, children) => {
        children = typeof children.length === "undefined" ? [children] : children;
        for (let i = children.length; i > 0; i--) {
            parent.firstChild ?
                parent.insertBefore(children[i]) :
                parent.appendChild(children[i]);
        }
        return parent;
    },
    // https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template
    create: (html, children) => {
        const tpl = document.createElement("template");
        tpl.innerHTML = html.trim(); // WARNING!: potential XSS danger, please make sure yor code is pure, and otherwise just sanitize it
        let node = tpl.content.firstChild;
        if (children) {
            DOMUtil.append(node, children);
        }
        return node;
    },
    removeChildren: element => {
        while (element.hasChildNodes()) {
            element.removeChild(element.lastChild);
        }
        return element;
    },
    uniqueClass: (element, className) => {
        dom.every(element.parentNode.children, el => {
            el.classList.remove(className);
        });
        element.classList.add(className);
        return element;
    },
    ajax: (opts) => {
        let settings = {
            url: "",
            type: "get",
            data: {},
            dataType: "json",
            succ: function() {},
            error: function() {}
        };

        //覆盖默认设置
        Object.assign(settings, opts); //ES5方法

        //拼接参数
        let arr = [];
        for (let attr in settings.data) {
            arr.push(
                encodeURIComponent(attr) + "=" + encodeURIComponent(settings.data[attr])
            );
        }

        //创建AJAX对象,兼容低版本IE
        let xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");

        //设置请求完成回调
        if (typeof xhr.onload === "undefined") {
            xhr.onreadystatechange = ready;
        } else {
            xhr.onload = ready;
        }

        function ready() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    switch (settings.dataType.toLowerCase()) {
                        case "text":
                            settings.succ(xhr.responseText);
                            break;
                        case "json":
                            settings.succ(JSON.parse(xhr.responseText));
                            break;
                        case "xml":
                            settings.succ(xhr.responseXML);
                    }
                } else if (xhr.status == 404) {
                    settings.error(xhr.status);
                }
            }
        }

        //处理请求方式
        if (settings["type"].toLowerCase() === "get") {
            xhr.open(settings.type, settings.url + "?" + arr.join("$"), true);
            xhr.send();
        } else {
            xhr.open(settings.type, settings.url, true);
            xhr.setRequestHeadr("Content-Type", "application/x-www-form-urlencoded");
            xhr.send(arr.join("&"));
        }
    },
    jsonp: (options) => {
        let url = options.url
        let data = options.data

        let oBody = document.getElementsByTagName('body')[0]
        let oScript = document.createElement('script')

        let callbackName = 'cb' + (~~(Math.random() * 0xffffff)).toString(16)
        window[callbackName] = result => {
            options.success && options.success(result)
        }
        data[options.callback] = callbackName

        oScript.setAttribute('src', url + '?' + format(data))
        oBody.append(oScript)

        function format(data) {
            let str = ''
            for (var attr in data) {
                str += encodeURIComponent(attr) + '=' + encodeURIComponent(data[attr]) + '&'
            }
        }

        // jsonp({
        //     url: 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
        //     type: 'get',
        //     data: {
        //         wd: 'jsonp'
        //     },
        //     callback: 'cb',
        //     success: function(data) { console.log(data) }
        // });
    }

}