## 浮动
- 浮动元素的特性


1. 浮动元素脱离文档流，遇到父级包含框或者相邻的浮动元素后停下来。
2. 浮动元素在一排显示，没有空隙。
3. 浮动元素运用到内联元素上时可以让其支持宽高，像inline-block一样。
4. 由于脱离文档流，浮动元素无法撑开父级元素的高度。
5. 对其他浮动元素：浮动元素会按照顺序排列下去，若父容器剩余的宽度不够放下下一个浮动元素，那么它将向下移动，若是高度不同，在下移的过程中，浮动元素还有可能会被卡住。
6. 浮动元素会提升层级，文档流中的文字图片内容与浮动元素所占空间重合，文字会围绕浮动元素。

- 清浮动

1. 给浮动元素的父级加高度
2. 给浮动元素的父级也加浮动
3. 给浮动元素的父级加
    ```css
       display: block
    ```
4. 在浮动元素的最后设置空标签，如
    ```css
       <div style="clear:both;"></div>
    ```
5. 给浮动元素下面加
    ```css
        <br clear="all"/> 
    ```
6. 给浮动元素父级加 
    ```css
    .clear{zoom:1}  /*IE6/7下不支持after伪类  需要触发haslayout zoom*/
    .clear:after{content:"";display:block;clear:both;}
    ```
7. 利用BFC特性，使父容器形成一个新的BFC，便具有BFC包含浮动的特质，高度就可以撑起来。

## 定位

**inherit** 规定应该从父元素继承 position 属性的值
**static** 默认值。没有定位，元素出现在正常的流中（忽略 top, bottom, left, right 或者 z-index 声明）。

**relative** 生成相对定位的元素，相对于其正常位置进行定位。还在文档流中，原来所占用的位不会被其它元素所占有。如，"left:20" 会向元素的 LEFT 位置添加 20 像素。

**absolute** 生成绝对定位的元素，相对于 static 定位以外的第一个祖先元素进行定位。如果没有这样的祖先元素，则参照初始块即浏览器视口。
元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。

**fixed** 生成绝对定位的元素，相对于浏览器窗口进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定

**sticky** CSS3新属性，表现类似position:relative和position:fixed的合体，在目标区域在屏幕中可见时，它的行为就像position:relative; 而当页面滚动超出目标区域时，它的表现就像position:fixed，它会固定在目标位置

***注意:**
如果同时定义了left和right值，且width和height有值，那么left生效，right无效，同样，同时定义了top和bottom，top生效

## position:relative和负margin都可以使元素位置发生偏移?二者有什么区别
- position: ralative是相对于自身进行定位，不会脱离文档流，所以不影响其他元素的位置。
- margin: 可以使元素偏移同时还会影响文档流中的其他元素的位置。
## z-index
- z-index 属性指定一个元素的堆叠顺序。因为绝对定位的元素脱离了普通流，所以绝对定位的元素可以覆盖页面上的其它元素。这时可以通过给元素设置z-index属性来控制叠放顺序，拥有更高堆叠顺序的元素总是会处于堆叠顺序较低的元素的前面。

- z-index有三个属性
1. auto 默认。堆叠顺序与父元素相等。
2. number设置元素的堆叠顺序。
3. inherit规定应该从父元素继承 z-index 属性的值。

[深入理解CSS中的层叠上下文和层叠顺序](http://www.zhangxinxu.com/wordpress/2016/01/understand-css-stacking-context-order-z-index/)