### text-align: center的作用是什么，作用在什么元素上？能让什么元素水平居中
text-align CSS属性定义行内内容（例如文字）如何相对它的块父元素对齐，text-align并不控制块元素自己的对齐，只控制它的行内内容的对齐。

1. text-align:center的意思是块级元素中的行内内容居中。
2. 作用在block-level元素上(包括了block和inline-block);
3. 能让block-level的元素中的行内元素，替换元素和inline-block元素居中。

### IE 盒模型和W3C盒模型的区别
- IE盒模型：width/height包括border、padding、content的width/height
- W3C盒模型：width/height只包括content的width/height

**注意**
1. ie678怪异模式（不添加 doctype）使用 ie 盒模型，宽度=边框+padding+内容宽度
2. chrome， ie9+, ie678(添加 doctype) 使用标准盒模型， 宽度= 内容宽度

###{ box-sizing: border-box;}的作用
指定使用IE盒模型，通常一个块级元素实际所占宽高度=（margin）+ 边框宽度(border-width) + 内边距（padding）+ 高度（height） / 宽度（width），如果设置了border-box， 实际所占宽高度=设置的高度 /设置的宽度 + 外边距（margin）

### line-height: 2和line-height: 200%有什么区别?
- line-height: 200%是根据父元素的字体大小计算出行高，并且子元素依然沿用这个计算后的行高。
- line-height: 2 则是根据子元素自己字体的大小去乘以2来计算行高。

### inline-block

- **特性**

   - 不占据一整行
   - 不设置宽高的话，宽度由内容撑开
   - 可设置`padding`、`margin`、`border`，而且会占据在文档流中的空间
   - 水平排列按照`base-line`对齐，且元素之间会存在一个'空'元素的缝隙就像文字之间的间隙一样
   - 设置`text-align`属性有效
   - 会形成一个BFC

   ​

- **去除缝隙**

1. 简单一点的方法就是就是改变HTML的结构，标签不换行，比如下面这样
```html
<span>xxx</span><span>yyy</span>
```
2. 利用HTML注释
```html
<div class="demo">
       <span>饥人谷</span><!-- 
       --><span>饥人谷</span><!-- 
       --><span>饥人谷</span><!-- 
       --><span>饥人谷</span>
 </div>
```
2.  也可以将设置了inline-block元素的父元素设置font-size:0;然后在给设置了inline-block的元素重新设置一个font-size。

- **高度不一样的inline-block元素如何顶端对齐**
```html
//把应用 inline-block的元素加上 
{
    display: inline-block; 
    vertical-align: top;
}
```

### CSS sprites
CSS Sprites是一种网页图片的处理方式。它允许你将一个页面涉及到的所有零星图片都包含到一张大图中去，这样一来，当访问该页面时，载入的图片就不会像以前那样一幅一幅地慢慢显示出来了。对于当前网络流行的速度而言，不高于200KB的单张图片的所需载入时间基本是差不多的，所以无需顾忌这个问题。加速的关键，不是减小文件大小，而是减少个数。传统切图讲究精细，图片规格越小越好，重量越小越好，其实规格大小无所谓，计算机统一都按byte计算。客户端每显示一张图片都会向服务器发送请求。所以，图片越多请求次数越多，造成延迟的可能性也就越大。



**潜伏题：**

域名发散和域名收敛

### 让一个元素"看不见"有几种方式？有什么区别?

1. visibility：hidden；
  元素在页面消失后，其占据的空间依旧会保留着，适用于那些元素隐藏后不希望页面布局会发生变化的场景,绑定的事件不会触发。

2. opacity：0；
  这种方法和visibility:hidden的一个共同点是元素隐藏后依旧占据着空间，但我们都知道，设置透明度为0后，元素只是隐身了，它依旧存在页面中,元素绑定的事件还是会触发

3. display：none；
  元素在页面山彻底消失，元素本来占据的位置会被其他元素占有，但是还存在DOM树中，浏览器会重新进行页面渲染,绑定的事件不会触发。

4. background-color：rgba（0，0，0，0.2）

   设置背景色透明度

**潜伏题：**

 jQuery是如何实现获取一个元素的正常宽高的。