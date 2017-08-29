##HTML5是什么？有哪些新特性？有哪些新增标签？如何让低版本的 IE 支持 HTML5新标签

#### HTML5是什么

HTML5是超文本标记语言的第五次重大修改，2014年10月29日标准规范制定完成。

#### 新特性

- 语义特性
  HTML5赋予网页更好的意义和结构。更加丰富的标签将随着对RDFa的，微数据与微格式等方面的支持，构建对程序、对用户都更有价值的数据驱动的Web。
- 本地存储特性
  基于HTML5开发的网页APP拥有更短的启动时间，更快的联网速度，这些全得益于HTML5 APP Cache，以及本地存储功能。Indexed DB（html5本地存储最重要的技术之一）和API说明文档。
- 设备兼容特性
  从Geolocation功能的API文档公开以来，HTML5为网页应用开发者们提供了更多功能上的优化选择，带来了更多体验功能的优势。HTML5提供了前所未有的数据与应用接入开放接口。使外部应用可以直接与浏览器内部的数据直接相连，例如视频影音可直接与microphones及摄像头相联。
- 连接特性
  更有效的连接工作效率，使得基于页面的实时聊天，更快速的网页游戏体验，更优化的在线交流得到了实现。HTML5拥有更有效的服务器推送技术，Server-Sent Event和WebSockets就是其中的两个特性，这两个特性能够帮助我们实现服务器将数据“推送”到客户端的功能。
- 网页多媒体特性
  支持网页端的Audio、Video等多媒体功能， 与网站自带的APPS，摄像头，影音功能相得益彰。
  三维、图形及特效特性（Class: 3D, Graphics & Effects）
  基于SVG、Canvas、WebGL及CSS3的3D功能，用户会惊叹于在浏览器中，所呈现的惊人视觉效果。
- 性能与集成特性
  没有用户会永远等待你的Loading——HTML5会通过XMLHttpRequest2等技术，解决以前的跨域等问题，帮助您的Web应用和网站在多样化的环境中更快速的工作。
- CSS3特性
  在不牺牲性能和语义结构的前提下，CSS3中提供了更多的风格和更强的效果。此外，较之以前的Web排版，Web的开放字体格式（WOFF）也提供了更高的灵活性和控制性

####  新增元素

| 元素         | 描述                                       |
| ---------- | ---------------------------------------- |
| canvas     | 标签定义图形，比如图表和其他图像。该标签基于 JavaScript 的绘图 API |
| audio      | 定义音频内容                                   |
| video      | 定义视频（video 或者 movie）                     |
| source     | 定义多媒体资源 `<video>` 和`<audio>`             |
| embed      | 定义嵌入的内容，比如插件                             |
| track      | 为诸如 `<video>` 和 `<audio>` 元素之类的媒介规定外部文本轨道 |
| datalist   | 定义选项列表。与 input 元素配合使用该元素，来定义 input 可能的值  |
| keygen     | 规定用于表单的密钥对生成器字段                          |
| output     | 定义不同类型的输出，比如脚本的输出                        |
| article    | 定义页面正文内容                                 |
| aside      | 定义页面内容之外的内容                              |
| bdi        | 设置一段文本，使其脱离其父元素的文本方向设置                   |
| command    | 定义命令按钮，比如单选按钮、复选框或按钮                     |
| details    | 用于描述文档或文档某个部分的细节                         |
| dialog     | 定义对话框，比如提示框                              |
| summary    | 标签包含 details 元素的标题                       |
| figure     | 规定独立的流内容（图像、图表、照片、代码等等）                  |
| figcaption | 定义 `<figure>` 元素的标题                      |
| footer     | 定义 section 或 document 的页脚                |
| header     | 定义了文档的头部区域                               |
| mark       | 定义带有记号的文本                                |
| meter      | 定义度量衡。仅用于已知最大和最小值的度量                     |
| nav        | 导航                                       |
| progress   | 定义任何类型的任务的进度                             |
| ruby       | 定义 ruby 注释（中文注音或字符）                      |
| rt         | 定义字符（中文注音或字符）的解释或发音                      |
| rp         | 在 ruby 注释中使用，定义不支持 ruby 元素的浏览器所显示的内容     |
| section    | 定义文档中的节（section、区段）                      |
| time       | 定义日期或时间                                  |
| wbr        | 规定在文本中的何处适合添加换行符                         |

#### 让低版本的 IE 支持 HTML5新标签

1. 使用html5shiv.js

```javascript
<!--[if lt IE 9]>            
<script type="text/javascript" src="scripts/html5shiv.js"></script>
<![endif]-->    
```

***注意**  如果版本小于IE9就引入html5shiv.js，IE9以前的浏览器就能使用h5标签，并使用定义好的样式了。这个标签必须放在head标签内，因为浏览器要在解析之前知道这个元素。

2. 也可以直接声明

```javascript
<!--[if lt IE 9]> 
(function(){if(!/*@cc_on!@*/0)return;var e = "abbr,article,aside,audio,canvas,datalist,details,dialog,eventsource,figure,footer,header,hgroup,mark,menu,meter,nav,output,progress,section,time,video".split(','),i=e.length;while(i--){document.createElement(e[i])}})()
<![endif]-->
```
##  input 有哪些新增类型？

- email
- url
- number
- range
- Date Picker
  - Date
  - month
  - week
  - time
  - datatime





## 浏览器本地存储中 cookie 和 localStorage 有什么区别？ localStorage 如何存储删除数据。

| 特性      | Cookie                                   | localStorage                        |
| ------- | ---------------------------------------- | ----------------------------------- |
| 数据的生命期  | 默认情况下，cookie开始于浏览器启动，结束于浏览器关闭，但是可以手动设置cookie的过期时间，同时，到期后被删除 | 除非被清除，否则永久保存                        |
| 存放数据大小  | 4K左右                                     | 一般为5MB                              |
| 与服务器端通信 | 每次都会携带在HTTP头中，如果使用cookie保存过多数据会带来性能问题    | 仅在客户端（即浏览器）中保存，不参与和服务器的通信           |
| 易用性     | 需要程序员自己封装，源生的Cookie接口不友好                 | 源生接口可以接受，亦可再次封装来对Object和Array有更好的支持 |

```javascript
//localstorage存储删除数据

localStorage.setItem("key", "value")  //存储
localStorage.removeItem("key")	//删除
localStorage.getItem("key")	//获取
localStorage.clear() //清除
```

***参考 **

[详说 Cookie, LocalStorage 与 SessionStorage](http://jerryzou.com/posts/cookie-and-web-storage/)

[在HTML5的时代,重新认识Cookie](https://juejin.im/post/59708bbe518825103c098332)

[题目4](http://js.jirengu.com/xunez/10/edit?html,css,output)

[题目5](http://js.jirengu.com/dupuj)

[题目6](http://js.jirengu.com/zukaz/2/edit?html,css,output)
