# 前端安全—XSS

## 概念

**跨站脚本**（英语：Cross-site scripting，通常简称为：XSS）是一种网站应用程序的安全漏洞攻击，是[代码注入](https://zh.wikipedia.org/wiki/%E4%BB%A3%E7%A2%BC%E6%B3%A8%E5%85%A5)的一种。它允许恶意用户将代码注入到网页上，其他用户在观看网页时就会受到影响。这类攻击通常包含了[HTML](https://zh.wikipedia.org/wiki/HTML)以及用户端[脚本语言](https://zh.wikipedia.org/wiki/%E8%85%B3%E6%9C%AC%E8%AA%9E%E8%A8%80)。

**XSS**攻击通常指的是通过利用网页开发时留下的漏洞，通过巧妙的方法注入恶意指令代码到网页，使用户加载并执行攻击者恶意制造的网页程序。这些恶意网页程序通常是[JavaScript](https://zh.wikipedia.org/wiki/JavaScript)，但实际上也可以包括[Java](https://zh.wikipedia.org/wiki/Java)，[VBScript](https://zh.wikipedia.org/wiki/VBScript)，[ActiveX](https://zh.wikipedia.org/wiki/ActiveX)，[Flash](https://zh.wikipedia.org/wiki/Flash)或者甚至是普通的[HTML](https://zh.wikipedia.org/wiki/HTML)。攻击成功后，攻击者可能得到更高的权限（如执行一些操作）、私密网页内容、[会话](https://zh.wikipedia.org/wiki/%E4%BC%9A%E8%AF%9D)和[cookie](https://zh.wikipedia.org/wiki/Cookie)等各种内容。------------ [wikipedia](https://zh.wikipedia.org/wiki/%E8%B7%A8%E7%B6%B2%E7%AB%99%E6%8C%87%E4%BB%A4%E7%A2%BC)

XSS的目标是让**其他站点的js文件运行在目标站点的上**，这主要发生在页面渲染阶段。在该阶段发生了某些非预期的脚本行为，该脚本可能来自用户的输入，也可能来自域外的其他js文件，不一而足。XSS的发生起源来自于用户输入，因此XSS根据用户输入数据以何种形式、何时触发XSS、是否有后端服务器的参与划分为三种类型，分别是（ Reflected XSS）反射型XSS、（Stored XSS）持久型XSS和（DOM-based or local XSS）DOM XSS。

- **反射型XSS**

基于反射型的XSS攻击，原理是网站站点的服务端返回脚本，网站用户在客户端触发执行从而发起Web攻击 。

当用户点击一个恶意链接，或者提交一个表单，或者进入一个恶意网站时，注入脚本进入被攻击者的网站。Web服务器将注入脚本，比如一个错误信息，搜索结果等 返回到用户的浏览器上。浏览器会执行这段脚本，因为，它认为这个响应来自可信任的服务器。

- **存储型XSS**

注入型脚本永久存储在目标服务器上。当浏览器请求数据时，脚本从服务器上传回并执行。

- **基于DOM的XSS**

被执行的恶意脚本会修改页面脚本结构。





## XSS 的成因以及如何避免

之所以恶意脚本能直接执行，有两个可能

1. **后台模板问题**

```
<p>
评论内容：<?php echo $content; ?>
</p>

```

$content 的内容，没有经过任何过滤，原样输出。

要解决这个原因，只需要后台输出的时候，将可疑的符号 < 符号变成 `&lt;` （HTML实体）就行。

2. **前端代码问题**

```
$p.html(content)
```

或者

```
$p = $('<p>'+ content +'</p>')

```

content 内容又被原样输出了。解决办法就是不要自己拼 HTML，尽量使用 text 方法。如果一定要使用 HTML，就把可疑符号变成 HTML 实体。



3. **其它**

- 将重要的cookie标记为http only

这样的话当浏览器向Web服务器发起请求的时就会带上cookie字段，但是在脚本中却不能访问这个cookie，这样就避免了XSS攻击利用JavaScript的document.cookie获取cookie

- 使用XSS Filter

输入过滤，对用户提交的数据进行有效性验证，仅接受指定长度范围内并符合我们期望格式的的内容提交，阻止或者忽略除此外的其他任何数据。



***参考**

[XSS 和 CSRF 攻击的一些非常规防御方法](http://www.imooc.com/article/18069)

[CSRF 详解与攻防实战](http://www.tuicool.com/articles/Z3eYraY)