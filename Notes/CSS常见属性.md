## HTML元素类型
HTML元素又分为块级（block-level）元素与行内（内联、inline-level）元素
  - 常见的块级元素
    div p hr form h1~h6 ul ol dl li table tr td th pre 
  - 常见的行内元素
    strong em span a br img button input label select textarea code script

#### 行内元素与块级元素的区别

    1. 块级元素默认撑满屏幕宽度，内行内元素只占据自身宽度空间
    2. 行内元素和inline-block元素水平方向上默认情况下是按基线对齐。
    3. 块级元素可以包含块级和行内，而行内元素只能够包含文本和行内
    4. 块级元素可以设置宽高，行内元素不能设置宽高,行内元素的高度是由line-height来决定，宽度由具体的内容来决定，设置height和width无效。
    5. 块级元素padding、margin可以设置，内联元素不能设置上下padding、margin，行内元素设置上下padding看起来有效（撑开了边框和背景色），但是实际上不会撑开元素的高度
    6. 多个行内元素可以并排显示

#### 元素居中
  - 块级元素水平居中只要设置margin: 0 auto,
  - 行内元素居中需要设置text-align: center;

## CSS继承
继承就是父元素的样式传递到了子元素上。

#### 一、 不可继承的属性

  - `display`
  - 文本属性
    `vertical-align text-decoration text-shadow white-space unicode-bidi`
  - 盒模型属性
    `width height margin margin-top margin-right margin-bottom margin-left border border-style border-top-style border-right-style border-bottom-style border-left-style border-width border-top-width border-right-right border-bottom-width border-left-width border-color border-top-color border-right-color border-bottom-color border-left-color border-top border-right border-bottom border-left padding padding-top padding-right padding-bottom padding-left`
  - 背景属性
    `background background-color background-image background-repeat background-position background-attachment`
  - 定位属性
    `float clear position top right bottom left min-width min-height max-width max-height overflow clip z-index`
  - 生成内容属性
    `content counter-reset counter-increment`
  - 轮廓样式属性
    `outline-style outline-width outline-color outline`
  - 页面样式属性
    `size page-break-before page-break-after`
  - 声音样式属性
    `pause-before pause-after pause cue-before cue-after cue play-during`

#### 二、可继承的属性

  - 字体属性
    `font font-family font-weight font-size font-style font-variant font-stretch font-size-adjust`
  - 文本属性
    `text-indent text-align line-height word-spacing letter-spacing text-transform direction color`
  - 元素可见属性
    `visibility`
  - 表格布局属性
    `caption-side border-collapse border-spacing empty-cells table-layout`
  - 列表布局属性
    `list-style-type list-style-image list-style-position list-style`
  - 生成内容属性
    `quotes`
  - 光标属性
    `cursor`
  - 页面样式属性
    `page page-break-inside windows orphans`
  - 声音样式属性
    `speak speak-punctuation speak-numeral speak-header speech-rate volume voice-family pitch pitch-range stress richness azimuth elevation`



## 单行文本溢出
  ```css
p {
  white-space：nowrap;
  overflow: hideen;
  text-overflow: elliaps;
}
  ```
  ## px，em，rem的区别
  - px: 绝对单位
  - em: 相对单位，相对于父元素字体大小
  - rem: 相对单位，相对于网页根字体（html的字体大小）大小

  ## 解释下面代码的作用?为什么要加引号? 字体里\5b8b\4f53代表什么?
    body {
    	font: 12px/1.5 tahoma,arial,'Hiragino Sans GB','\5b8b\4f53',sans-serif;
    }
  **解释：**设置字体大小12px，行高1.5，字体取值依次是tahoma , arial , Hiragino Sans GB，宋体，sans-serif。
当文字是中文时，会加引号这个名称不加引号会被识别成多个元素。
`\5b8b\4f53`是Unicode码， 宋体，使用Unicode是因为网页或css编码是utf-8，直接写成中文，浏览器有可能不能识别，所以要写成Unicode编码。