

**题目1：** jQuery 中， $(document).ready()是什么意思？

`$(document).ready()`表示当DOM准备就绪时，指定一个函数来执行。与JavaScript提供了window.onload事件的区别：

> The ready event occurs after the HTML document has been loaded, while the onload event occurs later, when all content (e.g. images) also has been loaded.
>
> The onload event is a standard event in the DOM, while the ready event is specific to jQuery. The purpose of the ready event is that it should occur as early as possible after the document has loaded, so that code that adds functionality to the elements in the page doesn't have to wait for all content to load.
> 简单来说 `window.onload`是当页面呈现时用来执行这个事件，直到所有的东西，如图像已被完全接收前，此事件不会被触发
> `$(document).ready()`只要DOM结构已完全加载时，脚本就可以运行。传递处理函数给.ready()方法，能保证DOM准备好后就执行这个函数
>
> 所以onload比$().ready()要慢

**题目2：** `$node.html()`和`$node.text()`的区别?

`$node.html()`，返回所选择元素内的html内容，包含html标签和文本内容;`$node.text()`，返回所选择元素内的文本内容，不包含html标签，只包含文本内容

- `$node.html()`如果结果是多个进行赋值操作的时候会给每个结果都赋值
- `$node.html()`如果结果是多个，获取值的时候，返回结果集中的第一个对象的相应值
- `$node.text()`获取匹配元素集合中每个元素的合并文本，包含他们的后代

**题目3：** $.extend 的作用和用法? 

extend的作用主要就是合并对象，对对象进行扩展操，基本语法如下 :
```
jQuery.extend([deep,] target [, object1 ][, objectN ] )
```


```javascript
jQuery.extend(target,object1,  object2...objectN)	
//合并 object1, object2... objectN 到 target 对象，如果只有一个参数，则该 target 对象会被合并到 jQuery 对象中。
```
------

```javascript
var obj1 = {
    name: 'Tom',
    age: 21
}

var obj2 = {
    name: 'Jerry',
    sex: 'boy'
}

$.extend(obj1, obj2);  //{name: "Jerry", age: 21, sex: "boy"}

obj1	//{name: "Jerry", age: 21, sex: "boy"}
obj2 	//{name: "Jerry", sex: "boy"}
```

上面的代码意思是将 obj2 对象合并到 obj1 对象中，但这种方法会 改变 obj1 对象的结构。

------

```javascript
var obj1 = {
    name: 'Tom',
    age: 21
}

var obj2 = {
    name: 'Jerry',
    sex: 'boy'
}

$.extend({}, obj1, obj2); // { name: "Jerry", age: 21, sex: "boy" }

obj1 // { name: "Tom", age: 21 }
obj2 // { name: "Jerry", sex: "boy" }
```

用这种方法，相当于把obj1和obj2合并后的结果赋值给一个新建的对象。不会改变obj1的对象结构


### 深拷贝

```javascript
[deep], target, object1 [, objectN])
```

该方法多了一个类型为 boolean 的 [deep] 传参，当其为 true 时，将 object1 , objectN 深度复制 后合并到 target 中。

```javascript
var obj = {
   name: 'lilei',
   age: 25,
   number :[3,4,5]
}          
var obj1 = {}
var obj2 = {}
$.extend(obj1,obj)
$.extend(true,obj2,obj) 
obj.number[0] = 100 
console.log(obj1.number[0])//100
console.log(obj2.number[0])//3
```

obj2经过obj深拷贝后的结果，所以obj2内的对象不再因obj的改变而改变。

**题目4：** jQuery 的链式调用是什么？

链式调用就是分步骤地对jQuery对象实现各种操作。
它的原理在于每一步的jQuery操作，返回的都是一个jQuery对象，所以不同操作可以连在一起。优点在于：
1.代码更精简。链式调用能大大精简代码量，多项操作一行代码一气呵成；
2.优化性能。使用链式调用，所有操作代码共享一个jQuery对象，省去了逐步查询DOM元素的性能损耗。

**题目5：** jQuery 中 data 函数的作用

```javascript
jQuery.data( element, key, value )
//element是要存储数据的DOM对象；
//key是存储的数据名
//value是新数据值
```

jQuery.data() 方法允许我们在DOM元素上附加任意类型的数据,避免了循环引用的内存泄漏风险。如果 DOM 元素是通过 jQuery 方法删除的或者当用户离开页面时，jQuery 同时也会移除添加在上面的数据。我们可以在一个元素上设置不同的值，并获取这些值：

```javascript
$( "body" ).data( "foo", 52 );
$( "body" ).data( "bar", { myType: "test", count: 40 } );
$( "body" ).data( { baz: [ 1, 2, 3 ] } );
$( "body" ).data( "foo" ); // 52
$( "body" ).data(); // { foo: 52, bar: { myType: "test", count: 40 }, baz: [ 1, 2, 3 ] }
```



**题目6：**

- 写出以下功能对应的 jQuery 方法：
  - 给元素 `$node` 添加 class `active`，给元素 $noed 删除 class `active`       

    ```javascript
    $node.addClass('active')
    $noed.removeClass('active')
    ```

    ​

  - 展示元素`$node`, 隐藏元素`$node`

    ```
    $node.show(time,allback)
    $node.hide(1000,callback)
    ```

  - 获取元素$node 的 属性: id、src、title， 修改以上属性

    ```
    //获取属性，一个参数
    $node.attr('id')
    $node.attr('src')
    $node.attr('title')

    /修改属性，两个参数
    $node.attr('id','xxx')
    $node.attr('src','xxx')
    $node.attr('title','xxx')
    ```

    ​

  - 给$node 添加自定义属性`data-src`

    ```
    $node.attr('data-src', 'xxxxxx')
    ```

  - 在`$ct `内部最开头添加元素$node

    ```
    $ct.prepend($node)
    $node.prepend($ct)
    ```

  - 在`$ct `内部最末尾添加元素$node

    ```
    $ct.append($node)
    $node.appendTo($ct)
    ```

  - 删除$node

    ```
    $node.remove()	//$node上面的属性、事件之类的删除之后不保存
    $node.detach()	//$node上面的属性、事件之类的删除之后保存
    ```

  - 把`$ct`里内容清空

    ```
    $ct.empty()
    ```

  - 在`$ct `里设置 html `<div class="btn"></div>`

    ```
    $ct.html('<div class="btn"></div>')
    ```

  - 获取、设置$node 的宽度、高度(分别不包括内边距、包括内边距、包括边框、包括外边距)

    ```javascript
    $node.width()	//content width
    $node.height()	//content height
    $node.innerWidth()	//padding width
    $node.innerHeight()	//padding height
    $node.outerWidth()	//border width
    $node.outerHeight()	//border height
    $node.outerWidth(true)	//margin width
    $node.outerHeight(true)	//margin height
    ```

  - 获取窗口滚动条垂直滚动距离

    ```
    $(window).scrollTop()
    ```

  - 获取$node 到根节点水平、垂直偏移距离

    ```
    $node.offset()
    ```

    ​

  - 修改$node 的样式，字体颜色设置红色，字体大小设置14px

    ```
    $node.css({'color':red, 'font-size':14px})
    ```

  - 遍历节点，把每个节点里面的文本内容重复一遍

    ```javascript
    <ul id="i">
    	<li>123</li>
    	<li>456</li>
    	<li>798</li>
    </ul>

    <script>
    $().each(function(index){
      var text = $(this).text()
      $(this).text(text+text)
    })
    </script>
    ```

    ​

  - 从$ct 里查找 class 为 `.item`的子元素

    ```
    $ct.find('.item')
    ```

  - 获取$ct 里面的所有孩子

    ```
    $ct.children()
    ```

  - 对于$node，向上找到 class 为'.ct'的父亲，在从该父亲找到'.panel'的孩子

    ```
    $node.parents('.ct').find('.panel')
    ```

  - 获取选择元素的数量

    ```
    $node.parents().length
    $node.parents().size()
    ```

  - 获取当前元素在兄弟中的排行

    ```html
    <ul id="ct6">
    	<li></li>
    	<li></li>
    	<li class="p"></li>
    	<li></li>
    </ul>

    <script>
    	$('#ct6').find('.p').index()
    </script>
    ```

**题目7：**

- 用jQuery实现以下操作
  - 当点击`$btn `时，让 $btn 的背景色变为红色再变为蓝色
  - 当窗口滚动时，获取垂直滚动距离
  - 当鼠标放置到`$div` 上，把`$div` 背景色改为红色，移出鼠标背景色变为白色
  - 当鼠标激活 input 输入框时让输入框边框变为蓝色，当输入框内容改变时把输入框里的文字小写变为大写，当输入框失去焦点时去掉边框蓝色，控制台展示输入框里的文字
  - 当选择 select 后，获取用户选择的内容

  https://jsbin.com/lujewuf/edit?html,output

  https://github.com/tailorr/loadMore