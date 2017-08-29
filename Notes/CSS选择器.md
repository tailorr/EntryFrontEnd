## class 和 id 的使用场景
- class:一个标签可以有多个class且同一个class可以用到不同的标签上，多用于多个标签样式相似或完全相同时。
- id:是整个页面中唯一的一个,可以用作命名空间

## CSS常见的几种选择器

1. 基础选择器

2. 组合选择器
  **E,F**多元素选择器，用,分隔，同时匹配元素E或元素F
  **E F**后代选择器，用空格分隔，匹配E元素所有的后代（不只是子元素、子元素向下递归）元素F
  **E>F**子元素选择器，用>分隔，匹配E元素的所有直接子元素
  **E+F**直接相邻选择器，匹配E元素之后的相邻的同级元素F
  **E~F**普通相邻选择器（弟弟选择器），匹配E元素之后的同级元素F（无论直接相邻与否）
  **.class1.class2** id和class选择器和选择器连写的时候中间没有分隔符，. 和 # 本身充当分隔符的元素
  **element#id** id和class选择器和选择器连写的时候中间没有分隔符，. 和 # 本身充当分隔符的元素
3. 属性选择器
  **E[attr]** 匹配所有具有属性attr的元素，div[id]就能取到所有有id属性的div
  **E[attr = value]** 匹配属性attr值为value的元素，div[id=test],匹配id=test的div
  **E[attr ~= value]** 匹配所有属性attr具有多个空格分隔、其中一个值等于value的元素
  **E[attr ^= value]** 匹配属性attr的值以value**开头**的元素
  **E[attr $= value]** 匹配属性attr的值以value**结尾**的元素
  **E[attr *= value]**匹配属性attr的值**包含**value的元素

4. 伪类选择器
  **E:first-child** 匹配作为长子（第一个子女）的元素E
  **E:link** 匹配所有未被点击的链接
  **E:visited** 匹配所有已被点击的链接
  **E:active** 匹配鼠标已经其上按下、还没有释放的E元素
  **E:hover** 匹配鼠标悬停其上的E元素
  **E:focus** 匹配获得当前焦点的E元素
  **E:lang(c)** 匹配lang属性等于c的E元素
  **E:enabled** 匹配表单中可用的元素
  **E:disabled** 匹配表单中禁用的元素
  **E:checked** 匹配表单中被选中的radio或checkbox元素
  **E::selection** 匹配用户当前选中的元素
  **E:root** 匹配文档的根元素，对于HTML文档，就是HTML元素
  **E:nth-child(n)** 匹配其父元素的第n个子元素，第一个编号为1
  **E:nth-last-child(n)** 匹配其父元素的倒数第n个子元素，第一个编号为1
  **E:nth-of-type(n)** 与:nth-child()作用类似，但是仅匹配使用同种标签的元素
  **E:nth-last-of-type(n)** 与:nth-last-child() 作用类似，但是仅匹配使用同种标签的元素
  **E:last-child** 匹配父元素的最后一个子元素，等同于:nth-last-child(1)
  **E:first-of-type**匹配父元素下使用同种标签的第一个子元素，等同于:nth-of-type(1)
  **E:last-of-type**匹配父元素下使用同种标签的最后一个子元素，等同于:nth-last-of-type(1)
  **E:only-child**匹配父元素下仅有的一个子元素，等同于:first-child:last-child或 :nth-child(1):nth-last-child(1)
  **E:only-of-type**匹配父元素下使用同种标签的唯一一个子元素，等同于:first-of-type:last-of-type或 :nth-of-type(1):nth-last-of-type(1)
  **E:empty**匹配一个不包含任何子元素的元素，文本节点也被看作子元素
  **E:not(selector)**匹配不符合当前选择器的任何元素

5. 伪元素选择器
  **E::first-line**匹配 E 元素内容的第一行
  **E::first-letter**匹配E元素内容的第一个字母
  **E::before**在E元素之前插入生成的内容
  **E::after**在E元素之后插入生成内容

## 选择器的优先级是怎样的?对于复杂场景如何计算优先级?
- !important:在属性后面使用！important会覆盖页面内任何位置定义的元素样式
- 内联样式
- ID选择器
- CLASS选择器
- 伪类选择器
- 属性选择器
- 标签选择器
- 通配符选择器
- 浏览器自定义
  一般而言，选择器越特殊，它的优先级越高。也就是选择器指向的月精准，定位就越准确。

## a:link, a:hover, a:active, a:visited 的顺序是怎样的？ 为什么？
权重顺序依次变大，浏览器是按照就近原则来解释的，也就是从下到上。
鼠标经过的“未访问链接”同时拥有a:link、a:hover两种属性，后面的属性会覆盖前面的属性定义；鼠标经过的“已访问链接”同时拥有a:visited、a:hover两种属性，后面的属性会覆盖前面的属性定义。

**巧记**
*一个老外总结了便于记忆的“爱恨原则”（LoVe/HAte），即四种伪类的首字母:LVHA。即a:link、a:visited、a:hover、a:active*

## 以下选择器分别是什么意思?
    /*id选择器，匹配id值为header的元素*/
    #header{  
    }
    /*class选择器，匹配class值为header的所有元素*/
    .header{   
    }
    /* 后代选择器，匹配class为header的元素内包裹的class为logo的元素*/
    .header .logo{
    }
    /*匹配class包含header和mobile的元素*/
    .header.mobile{
    }
     /*匹配class为header的元素内包裹的p和h3元素*/
    .header p, .header h3{
    }
    /*匹配id为header的元素内包裹的class为nav内的所有直接li元素*/
    #header .nav>li{
    }
    /*匹配id为header的元素内包裹的a元素鼠标悬停时候的样式*/
    #header a:hover{
    }
    /*匹配id为header的元素内包裹的class为logo**之后**的所有同级p元素*/
    #header .logo~p{
    }
    /*匹配id为header的元素内包裹的type属性为text的input元素*/
    #header input[type="text"]{
    }

## 伪类选择器
- E:first-child: 匹配元素E的第一个子元素
- E:link: 匹配素有未被点击的链接
- E:visited : 匹配所有已经被点击的链接
- E:active : 匹配鼠标已经在其上按下，但是还没有释放的E元素
- E:hover : 匹配鼠标悬停其上的E元素
- E:hover: 匹配获得焦点的E元素
- E:lang(c): 匹配lang属性为c的元素
- E:enabled: 匹配表单中的可用元素
- E:disabled: 匹配表单中不可用元素
- E:checked: 匹配表单中被选中的radio或checkbox元素
- E:selection: 匹配用户当前选择的元素
- E:root:匹配文档的根元素
- E:nth-child(n): 匹配父元素的第n个子元素，这个元素必须是E，若该子元素不是E，则选择符无效。该选择符允许使用一个乘法因子(n)来作为换算方式，比如我们想选中所有的偶数子元素E，那么选择符可以写成：E:nth-child(2n)
- E:nth-last-child(n): 匹配属于父元素的倒数第n个子元素，这个元素必须是E
- E:nth-of-type(n): 匹配属于父元素的第 n 个E元素
- E:nth-last-of-type(n) :匹配属于父元素的倒数第n个E元素
- E:first-child: 匹配父元素的第一个子元素，这个元素必须是E
- E:last-child : 匹配父元素的最后一个子元素，这个元素必须是E
- E:first-of-type :匹配父元素中的第一个E元素
- E:last-of-type : 匹配父元素中的最后一个E元素
- E:only-child : 匹配父元素下仅有的一个子元素，这个元素必须是E
- E:only-of-type : 匹配父元素下的*唯一*子元素E

## div:first-child、div:first-of-type、div :first-child和div :first-of-type的作用和区别 （注意空格的作用）
div:first-child 伪类选择器，匹配div的父元素下的第一个子元素，而且这个子元素必须是div，若不是则选择无效
div :first-child  匹配div子元素中的第一个元素
div:first-of-type 伪类选择器，匹配div的父元素下的第一个div元素
div :first-of-type 匹配div子元素中的同类型元素的第一个元素


## 解析下输出样式的原因。

- 代码


    <style>
    .item1:first-child{
      color: red;
    }
    .item1:first-of-type{
      background: blue;
    }
    </style>
    <div class="ct">
        <p class="item1">aa</p>
        <h3 class="item1">bb</h3>
        <h3 class="item1">ccc</h3>
    </div>

- 输出结果
  ![](http://upload-images.jianshu.io/upload_images/3746979-592ba364c58484e9.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/1240)

##### 原因分析

- STEP1：找到class为item1父元素div，然后设置其第一个class为item1子元素的字体颜色为red，所以aa颜色为red；
- STEP2：找到class为item1父元素div，然后设置其第一个class为item1的每种元素的第一个元素的背景颜色为blue，所以p、第一个h3的背景颜色为blue；