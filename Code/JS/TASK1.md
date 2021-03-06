## 综述
- 网页一般由三个部分构成，HTML ,CSS，JAVASCRIPT。其中HTML负责网页的整体结构，CSS负责网页的样式，也就是美化HTML，这两个部分构成了一个静态网页，JAVASCRIPT则负责网页上的一些动画，以及与后端数据的交互部分。

## CSS和JS在网页中的放置位置
一般而言，因为HTML是一种相对松散的文档类型，同时浏览器的容错性又非常高，所以CSS和JS可以放置在页面上的任何位置，甚至可以放到<!DOCTYPE HTML>的外部。
但是在实际使用中，我们习惯上把CSS文件放到head标签内部，这是由浏览器的渲染机制决定的，因为大部分浏览器都是要等HTML和CSS加载完毕后才开始进行网页布局并最终绘制到浏览器窗口；JS则更加的苛刻，因为浏览器的解析器遇到JS脚本后会立刻开始执行JS脚本，这样就会阻塞HTML、CSS的解析，浏览器出现白屏，只有当JS脚本执行完毕，才会继续后面文档的渲染，所以我们一般把JS放到HTML文档的尾部，这样就不会出现白屏现象，用户体验比较好。

## 白屏和FOUC（flash of unstyled content）
**白屏和FOUC（无样式内容闪烁）其实是浏览器渲染机制所固有的特性**
**Webkit内核的浏览器**的渲染过程中页面的绘制要等HTML和CSS都加载完毕才开始，所以在这个加载过程中浏览器会出现白屏现象。
- 如果把样式放在文档底部，对于IE浏览器,在某些场景下(新窗口打开,刷新等)页面会出现白屏,而不是内容逐步展现
- 如果使用 @import 标签,即使 CSS 放入 link, 并且放在头部,也可能出现白屏
- 对于图片和CSS, 在加载时会并发加载(如一个域名下同时加载两个文件). 但在加载 JavaScript 时,会禁用并发,并且阻止其他内容的下载. 所以把 JavaScript 放入页面顶部也会导致白屏现象.

**Gecko内核的浏览器**则是在加载过程中优先渲染HTML部分，在CSS加载的时候再次进行页面的二次渲染，这样渲染到页面上的无样式内容时就会不断的进行页面二次渲染，无样式内容就会闪烁，这就是FOUC现象。
- 如果把样式放在底部,对于IE浏览器,在某些场景下(点击链接,输入URL,使用书签进入等),会出现 FOUC 现象(逐步加载无样式的内容,等CSS加载后页面突然展现样式).对于 Firefox 会一直表现出 FOUC .

## asynnc和defer的作用与区别
**它们的作用主要是作用于script标签。**
1. 对于没有这两个关键字的脚本标签，浏览器会立即加载并执行指定的脚本，即在渲染该script标签之下的文档元素之前，不等待后续载入的文档元素，读到就加载并执行。
2. 有了async后，加载和渲染后续文档的过程会和脚本的 **加载与执行** 同时进行（异步）
3. 如果是defer，加载和渲染后续文档的过程将和脚本的 **加载** 同时进行，但是脚本的执行要等到所有的后续元素解析完毕以后，DOMContentLoaded事件触发之前完成。

**defer 和 async 的区别**
>- defer: 脚本延迟到文档解析和显示后执行，有顺序
- async: 不保证顺序

**注意**
>- defer 属性只被 IE 4 和 Firefox 3.5 更高版本的浏览器所支持，所以它不是一个理想的跨浏览器解决方案。在其他浏览器中，defer属性会被直接忽略，因此<script>标签会以默认的方式处理，也就是说会造成阻塞。然而，如果您的目标浏览器支持的话，这仍然是个有用的解决方案。
- 在有 async 的情况下，JavaScript 脚本一旦下载好了就会执行，所以很有可能不是按照原本的顺序来执行的。如果 JavaScript 脚本前后有依赖性，使用 async 就很有可能出现错误。

## 简述网页的渲染机制

1. 解析 HTML 标签, 构建 DOM 树
2. 解析 CSS 标签, 构建 CSSOM 树
3. 把 DOM 和 CSSOM 组合成 渲染树 (render tree)
4. 在渲染树的基础上进行布局, 计算每个节点的几何结构
5. 把每个节点绘制到屏幕上 (painting)

![](https://ooo.0o0.ooo/2017/06/24/594e410c188ab.png)