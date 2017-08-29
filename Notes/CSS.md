# CSS 基础
## CSS的全称是什么?
CSS，就是层叠样式表(英文全称：Cascading Style Sheets)，是一种用来表现HTML（标准通用标记语言的一个应用）或XML（标准通用标记语言的一个子集）等文件样式的计算机语言。
## CSS引入方式
- 内联样式(写在html标签的style属性里)，<p style="xxx:xxx;">
- 内部样式（写在<head></head>里面，以<style></style>标签包裹）
- 在 <head> 里面使用 <link rel="stylesheet" href="xxx.css"> 引用外部文件
- `<style>`标签里面通过@import url('http://style.css')引入
### link 和@import 的区别
链接方式（下面用 link 代替）和导入方式（下面用 @import 代替）都是引入外部的 CSS 文件的方式，下面我们来比较这两种方式，并且说明为什么不推荐使用 @import。

- 差别1：ink属于HTML标签，而@import完全是CSS提供的一种方式。
  link标签除了可以加载CSS外，还可以做很多其它的事情，比如定义RSS，定义rel连接属性等，@import就只能加载CSS了。
- 差别2：加载顺序的差别。当一个页面被加载的时候（就是被浏览者浏览的时候），link引用的CSS会同时被加载，而@import引用的CSS会等到页面全部被下载完才被加载。所以有时候浏览@import加载CSS的页面时开始会没有样式（就是闪烁），网速慢的时候还挺明显。
- 差别3：兼容性的差别。由于@import是CSS2.1提出的，所以低版本浏览器不支持，@import只有在IE5以上的才能识别，而link标签无此问题。
- 差别4：使用dom控制样式时的差别。当使用javascript控制dom去改变样式的时候，只能使用link标签，因为@import不是dom可以控制的。
  从上面的分析来看，还是使用link标签比较好。





  [代码规范----Code Guide by @AlloyTeam18](https://alloyteam.github.io/CodeGuide/)
