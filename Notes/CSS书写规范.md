#### HTML和 CSS的书写规范

###### HTML:
1. 标签名必须使用小写字母。
2. 对于无需自闭合的标签，不允许自闭合。
3. 对 HTML5 中规定允许省略的闭合标签，不允许省略闭合标签。
4. 一次缩进2个空格，不要使用 tab 或者混合 tab 和空格的缩进。
5. class 必须单词全字母小写，单词间以 - 分隔。
6. 标签的使用应该遵循标签的语义。
7. 标签的使用应尽量简洁，减少不必要的标签。
8. 属性值必须用双引号包围。
9. 布尔类型的属性，建议不添加属性值。
10. 引入 CSS 时必须指明 rel="stylesheet"。

***下面是常见标签语义***
- p - 段落

- h1,h2,h3,h4,h5,h6 - 层级标题

- strong,em - 强调

- ins - 插入

- del - 删除

- abbr - 缩写

- code - 代码标识

- cite - 引述来源作品的标题

- q - 引用

- blockquote - 一段或长篇引用

- ul - 无序列表

- ol - 有序列表

- dl,dt,dd - 定义列表

  ​


###### CSS
1. 选择器与 { 之间必须包含空格。
2. 属性名与之后的 : 之间不允许包含空格， : 与 属性值 之间必须包含空格。
3. 在可以使用缩写的情况下，尽量使用属性缩写。
4. 属性书写顺序
  建议同一rule-set下的属性在书写时应按功能进行分组，并以 **Formatting Model（布局方式、位置） > Box Model（尺寸） > Typographic（文本相关） > Visual（视觉效果）**的顺序书写，以提高代码的可读性。
5. 数值为0时不带单位
6. 复合样式使用缩写
7. 统一使用小写



***注意**
- Formatting Model 相关属性包括：position / top / right / bottom / left / float / display / overflow 等
- Box Model 相关属性包括：border / margin / padding / width / height 等
- Typographic 相关属性包括：font / line-height / text-align / word-wrap 等
- Visual 相关属性包括：background / color / transition / list-style 等
