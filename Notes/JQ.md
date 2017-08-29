## **题目1：** jQuery 能做什么？

jQuery 是一个 JavaScript 库，它提供了一些方便使用的 API，能让一些繁复的 JavaScript 工作变得简单，比如：HTML 文档元素的遍历和操作、事件的处理、动画效果、Ajax 请求等。jQuery 将这些功能都封装起来，并且这些功能都是跨浏览器的，让你不用再操心那些细节，不用为浏览器兼容性发愁，轻松愉快的完成你的 web application.

## **题目2：** jQuery 对象和 DOM 原生对象有什么区别？如何转化？

jQuery对象就是通过jQuery包装DOM对象后产生的对象(集合对象)。jQuery对象是jQuery独有的，可以使用jQuery里的方法。
因此jQuery对象和DOM对象是不一样的，不能调用对方定义的方法。
注意！dom对象须使用dom方法，jq对象需使用jq方法

> $(‘#test’).innerHTML会报错，document.getElementById(‘#test’)[0].html()也会报错。

**转化：**

普通的DOM对象可以用`$()`包装起来转换为jQuery对象: $(document.getElementById(‘#test’)).html();	//正常

jQuery对象本身是一个集合，要转换为DOM对象，可通过数组索引取出:[index]和.get(index)

第一种方式：$(‘#test’)[0]
第二种方式：$(‘#test’).get(0)
注： eq(0)返回的还是jQuery对象,eq(0)[0]是DOM对象。

## **题目3：**jQuery中如何绑定事件？`bind`、`unbind`、`delegate`、`live`、`on`、`off`都有什么作用？推荐使用哪种？使用`on`绑定事件使用事件代理的写法？

绑定事件：$('.btn').on('click',function(){绑定的事件})

**$(selector).bind(event,data,function,map)**
> bind() 方法向被选元素添加一个或多个事件处理程序，以及当事件发生时运行的函数。

**$(selector).unbind(event,function,eventObj)**
> unbind() 方法移除被选元素的事件处理程序。
> 该方法能够移除所有的或被选的事件处理程序，或者当事件发生时终止指定函数的运行。
> 该方法也可以通过 event 对象取消绑定的事件处理程序。该方法也用于对自身内部的事件取消绑定（比如当事件已被触发一定次数之后，删除事件处理程序）。

**$(selector).delegate(childSelector,event,data,function)**
> delegate() 方法为指定的元素（属于被选元素的子元素）添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。使用 delegate() 方法的事件处理程序适用于当前或未来的元素（比如由脚本创建的新元素）。

**$(selector).live(event,data,function)**
> live() 方法为被选元素添加一个或多个事件处理程序，并规定当这些事件发生时运行的函数。
> 通过 live() 方法添加的事件处理程序适用于匹配选择器的当前及未来的元素（比如由脚本创建的新元素）。
> live() 方法在 jQuery 版本 1.7 中被废弃，在版本 1.9 中被移除。请使用 on() 方法代替。

**$(selector).on(event,childSelector,data,function,map)**
on() 方法在被选元素及子元素上添加一个或多个事件处理程序。
自 jQuery 版本 1.7 起，on() 方法是 bind()、live() 和 delegate() 方法的新的替代品。该方法给 API 带来很多便利，我们推荐使用该方法，它简化了 jQuery 代码库。

**$(selector).off(event,selector,function(eventObj),map)**
> off() 方法通常用于移除通过 on() 方法添加的事件处理程序。自 jQuery 版本 1.7 起，off() 方法是 unbind()、die() 和 undelegate() 方法的新的替代品。该方法给 API 带来很多便利，我们推荐使用该方法，它简化了 jQuery 代码库。

**使用on事件代理的写法：**
`$('ul').on('click','li',function(){代理的绑定事件})`



***从jQuery 1.7开始，事件绑定只推荐on()、off()这两个方法**

## **题目4：**jQuery 如何展示/隐藏元素？

.show([speed], [callback])：显示元素
.hide([speed], [callback])：隐藏元素
.toggle([speed], [callback]): 显示隐藏元素，隐藏显示元素
.fadeIn([speed], [callback])：淡入显示隐藏元素
.fadeOut([speed], [callback])：淡出隐藏显示元素
.fadeToggle([speed], [callback])：淡入淡出的显示隐藏元素，隐藏显示元素
.fadeTo(speed, opacity，[callback])：淡入淡出效果设置为给定的不透明度
.slideUp([speed], [callback])：以滑动的方式隐藏显示的元素
.slideDown([speed], [callback])：以滑动的方式隐藏显示的元素

speed：规定速度，取值：'slow', 'normal', 'fast'或毫秒
callback：显示或隐藏后执行的函数
opacity：透明度（0~1）

## **题目5：** jQuery 动画如何使用？

jquery动画可使用.animate()方法；
(selector).animate({styles},speed,easing,callback)
必须参数 styles 参数定义形成动画的 CSS 属性。
可选的 speed 参数规定效果的时长。它可以取以下值："slow"、"fast" 或毫秒。
可选的 easing 可选。规定在动画的不同点中元素的速度。默认值是 "swing"。"swing" - 在开头/结尾移动慢，在中间移动快。"linear" - 匀速移动
可选的 callback 参数是动画完成后所执行的函数名称。

当使用 animate() 时，必须使用 Camel 标记法书写所有的属性名，比如，必须使用 paddingLeft 而不是 padding-left，使用 marginRight 而不是 margin-right，等等。只有数字值可创建动画（比如 "margin:30px"）。字符串值无法创建动画（比如 "backgroundColor:red"）

## **题目6：**如何设置和获取元素内部 HTML 内容？如何设置和获取元素内部文本？

$(selector).html(HTMLString)
$(selector).html()
$(selector).text(textString)
$(selector).text()

## **题目7：**如何设置和获取表单用户输入或者选择的内容？如何设置和获取元素属性？

$(selector).val(string)
$(selector).val()
$(selector).attr(attributeName, attributeValue)
$(selector).attr(attributeName)

8.http://jsbin.com/womosum/1/edit?html,css,output

9.http://jsbin.com/falusu/1/edit?html,output

10.http://jsbin.com/caxiwuk/edit?html,css,output