### HTML、XML、XHTML 有什么区别
1. HTML
  HTML(Hyper Text Mark-up Language)即超文本标记语言或超文本链接标示语言，是目前网络上应用最为广泛的语言，也是构成网页文档的主要语言。它告诉浏览器如何显示内容。

  **HTML主要特点**
  - 简易性：超级文本标记语言版本升级采用超集方式，从而更加灵活方便。
  - 可扩展性：超级文本标记语言的广泛应用带来了加强功能，增加标识符等要求，超级文本标记语言采取子类元素的方式，为系统扩展带来保证。
  - 平台无关性：虽然PC大行其道，但使用MAC等其他机器的大有人在，超级文本标记语言可以使用在多种平台上。
  - 通用性：另外，HTML是网络的通用语言,一种简单、通用的全置标记语言。它允许网页制作人建立文本与图片相结合的复杂页面，这些页面可以被网上任何其他人浏览到，无论使用的是什么类型的电脑或浏览器。

2. XML
  XML即ExtentsibleMarkupLanguage(可扩展标记语言)，是用于网络上数据交换的语言。它没有标签集，也没有语法规则，但是它有句法规则。

  **与HTML的主要区别**
  - 目标 :HTML的设计目标是显示数据并集中于数据外观，而XML的设计目标是描述数据并集中于数据的内容，它的显示形式靠CSS或XSL帮完成。
  - 语法：HTML的标记不是所有的都需要成对出现，XML则要求所有的标记必须成对出现；HTML标记不区分大小写，XML则大小敏感，即区分大小写。
  - 更新：XML允许粒度更新，不必在XML文档每次有局部改变时都发送整个文档的内容，只有改变的元素才必须从服务器发送到客户机，而HTML却不支持这样的功能。
  - 可读性：HTML侧重于网页数据表现形式的定义和描述，欠缺对文档数据含义的确切描述，不能适应对于日益增多的各类信息进行传递与存档的需求。例如<H2>Apple</H2>,在浏览器中显示的Apple，人们并不知道它具体是水果还是一个手机，HTML并不能解释数据Apple的含义；而XML不会给大家这个错觉如果描述的是水果中的苹果的话它会很清楚的这样表示<水果>Apple</水果>。所以说HTML的可读性相对较差。

  - 还有一点就是XML标记由架构或文档的作者定义，并且是无限制的。HTML 标记则是预定义的;HTML 作者只能使用当前 HTML标准所支持的标记。

3. XHTML
  XHTML指可扩展超文本标记语言（EXtensible HyperText Markup Language）,目标是取代HTML.

  **与HTML的主要区别**
  - XHTML是当前HTML版的继承者,由于HTML的语法较为松散,对于许多其他设备的要求较高,因此就出现了由DTD定义规则,语法要求更加严格的XHTML。
  - XHTML与HTML的最大的变化在于所有标签必须闭合。
  - XHTML中所有的标签必须小写。
  - XHTML元素必须被正确地嵌套。
  - XHTML文档必须拥有根元素。

### HTML 语义化

#### 什么是HTML语义化
根据内容的结构化（内容语义化），选择合适的标签（代码语义化）便于开发者阅读和写出更优雅的代码的同时让浏览器的爬虫和机器很好地解析。

#### 为什么要语义化
- 没有CSS的时候，也可以很好的呈现出页面结构、页面内容
- 用户体验：例如title、alt用于解释名词或解释图片信息、label标签的活用
- 有利于SEO: 和搜索引擎之间建立良好的沟通，有助于爬虫抓取更多有效的信息，爬虫依赖于标签来确定上下文和各个关键字的权重
- 考虑到代码的可复用性，可移植性，方便其他设备（如屏幕阅读器、盲人阅读器、移动设备）的解析执行
- 代码可读性强，便于维护

优点:

### 怎样理解内容与样式分离的原则
#### 何为内容与样式分离
对于内容、结构与表现相分离，最早是在软件开发架构理论中提出来的,XHTML的标签只用来定义文档的结构，所有涉及表现的东西通通剥离出来，把它放到一个单独的文件里，这个单独的文件就是CSS。

#### 内容与样式分离的优点
- 数据的多样显示。通过不同的样式表适应不同的设备，做到内容与设备无关
- 使整个站点的视觉一致性变得非常简单，只要修改样式表就可以轻松改版
- 由于结构清晰，数据的集成、更新和处理变得更加方便灵活
- 更有意义的搜索。​
### 常见的meta标签

[参考文档](https://segmentfault.com/a/1190000002407912)
><meta> 元素可提供有关页面的元信息（meta-information），比如针对搜索引擎和更新频度的描述和关键词。
><meta> 标签位于文档的头部，不包含任何内容。<meta> 标签的属性定义了与文档相关联的名称/值对。

##### 必要属性
|   属性    |     值     |             描述             |
| :-----: | :-------: | :------------------------: |
| content | some text | 定义与http-equiv或name属性相关的元信息 |
##### 可选属性

|     属性     |                    值                     |          描述           |
| :--------: | :--------------------------------------: | :-------------------: |
| http-equiv | content-type / expire / refresh / set-cookie | 把content属性关联到HTTP头部。  |
|    name    | author / description / keywords / generator / revised / others | 把 content 属性关联到一个名称。  |
|  content   |                some text                 | 定义用于翻译 content 属性值的格式 |

### SEO优化

[参考文档](https://msdn.microsoft.com/zh-cn/library/ff724016)

[HTML head 头标签](http://fex.baidu.com/blog/2014/10/html-head-tags/?qq-pf-to=pcqq.c2c)



|                    标签                    |                    功能                    |
| :--------------------------------------: | :--------------------------------------: |
| <meta name="keywords" content="your tags"> |        为搜索引擎提供参考，网页内容所包含的核心搜索关键词。        |
| <meta name="description" content="150 words" /> | 为搜索引擎提供参考，网页的描述信息;搜索引擎采纳后，作为搜索结果中的页面摘要(snippet)显示 |
| <meta http-equiv="refresh" content="0;url=" /> | 页面重定向和刷新content内的数字代表时间（秒），既多少时间后刷新。如果加url,则会重定向到指定网页（搜索引擎能够自动检测，也很容易被引擎视作误导而受到惩罚） |
| <meta name="author" content="author name" /> |                  定义网页作者                  |



- 移动设备

viewport：能优化移动浏览器的显示。如果不是响应式网站，不要使用initial-scale或者禁用缩放。

注意，很多人使用initial-scale=1到非响应式网站上，这会让网站以100%宽度渲染，用户需要手动移动页面或者缩放。如果和initial-scale=1同时使用user-scalable=no或maximum-scale=1，则用户将不能放大/缩小网页来看到全部的内容。

大部分4.7-5寸设备的viewport宽设为360px；5.5寸设备设为400px；iphone6设为375px；ipone6 plus设为414px。
<meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/><!-- `width=device-width` 会导致 iPhone 5 添加到主屏后以 WebApp 全屏模式打开页面时出现黑边 -->


|                    标签                    |                    功能                    |
| :--------------------------------------: | :--------------------------------------: |
| <meta name="viewport" content="width=device-width, initial-scale=1.0,maximum-scale=1.0, user-scalable=no"/> |            移动端适配，能优化移动浏览器的显示             |
| <meta name="apple-mobile-web-app-capable" content="yes" /> |          WebApp全屏模式：伪装app，离线应用。          |
| <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" /> | 隐藏状态栏/设置状态栏颜色：只有在开启WebApp全屏模式时才生效。content的值为default / black /black-translucent |
| <meta content="email=no" name="format-detection" /> |                  忽略识别邮箱                  |
| <meta content="telephone=no" name="format-detection" /> |              忽略数字自动识别为电话号码               |

[其他-参考文档](http://fex.baidu.com/blog/2014/10/html-head-tags/?qq-pf-to=pcqq.c2c)

<!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
<meta name="HandheldFriendly" content="true">
<!-- 微软的老式浏览器 -->
meta name="MobileOptimized" content="320">
<!-- uc强制竖屏 -->
<meta name="screen-orientation" content="portrait">
<!-- QQ强制竖屏 -->
<meta name="x5-orientation" content="portrait">
<!-- UC强制全屏 -->
<meta name="full-screen" content="yes">
<!-- QQ强制全屏 -->
<meta name="x5-fullscreen" content="true">
<!-- UC应用模式 -->
<meta name="browsermode" content="application">
<!-- QQ应用模式 -->
<meta name="x5-page-mode" content="app">
<!-- windows phone 点击无高光 -->
<meta name="msapplication-tap-highlight" content="no">

### 网页相关

|                    标签                    |                    功能                    |
| :--------------------------------------: | :--------------------------------------: |
|         <meta charset='utf-8' />         |                   编码方式                   |
| <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" /> |           优先使用 IE 最新版本和 Chrome           |
| <meta http-equiv="X-UA-Compatible" content="IE=6" > |                   IE版本                   |
| <meta name="renderer" content="webkit\|ie-comp\|ie-stand"> | 浏览器内核控制：国内浏览器很多都是双内核（webkit和Trident），webkit内核高速浏览，IE内核兼容网页和旧版网站。而添加meta标签的网站可以控制浏览器选择何种内核渲染。 |
| <meta http-equiv="Pragma" content="no-cache"> |  禁止浏览器从本地计算机的缓存中访问页面内容：这样设定，访问者将无法脱机浏览。  |
| <meta name="msapplication-TileColor" content="#000"/> |              Windows8 磁贴颜色               |
| <meta name="msapplication-TileImage" content="icon.png"/> |              Windows8 磁贴图标               |

###  DOCTYPE 声明

[What is DOCTYPE?](https://stackoverflow.com/questions/414891/what-is-doctype)

#### 文档声明的作用

声明叫做文件类型定义（DTD），声明的作用为了告诉浏览器该文件的类型，让浏览器解析器知道应该用哪个规范来解析文档。声明必须在 HTML 文档的第一行。

#### 严格模式和混杂模式指什么? 作用?

- 严格模式：又称标准模式，是指浏览器按照 W3C 标准解析代码。
- 混杂模式：又称怪异模式或兼容模式，是指浏览器用自己的方式解析代码。

**作用**

就是让浏览器进入标准模式，使用最新的 HTML5标准来解析渲染页面；如果不写，浏览器就会进入混杂模式，而这是我们要避免的

#### 常用的 DOCTYPE 声明

- HTML 5

  > <!DOCTYPE html>

- HTML 4.01 Strict

  > 该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）

- HTML 4.01 Transitional

  > 该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。

- HTML 4.01 Frameset

  > 该 DTD 等同于 HTML 4.01 Transitional，但允许框架集内容。

- XHTML 1.0 Strict

  > 该 DTD 包含所有 HTML 元素和属性，但不包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。
- XHTML 1.0 Transitional
  > 该 DTD 包含所有 HTML 元素和属性，包括展示性的和弃用的元素（比如 font）。不允许框架集（Framesets）。必须以格式正确的 XML 来编写标记。
- XHTML 1.0 Frameset
  > 该DTD 等同于 XHTML 1.0 Transitional，但允许框架集内容。
- XHTML 1.1
  >该 DTD 等同于 XHTML 1.0 Strict，但允许添加模型（例如提供对东亚语系的 ruby 支持）

### 浏览器乱码的原因是什么？如何解决
- 文件保存的格式与meta中指定的解析格式不一样
- 没有指定meta的charset


**解决办法：**指定正确的charset值 保存的文件一定要清楚其编码方式

**常见编码集：**UTF-8 UTF-16 GBK Unicode

**注意:**
1. 只有非英文和阿拉伯数字以外的字符才会出现乱码。
2. 不同编码集中字符占用的byte值不一样。

### 常见的浏览器有哪些，什么内核

这边的内核专指管理浏览器渲染行为的内核

- Trident：IE浏览器使用的内核,该内核程序在1997年的IE4中首次被采用，是微软在Mosaic代码的基础之上修改而来的，并沿用到目前的IE8。Trident实际上是一款开放的内核，其接口内核设计的相当成熟，因此才有许多采用IE内核而非IE的浏览器涌现（如 Maxthon、The World 、TT、GreenBrowser、AvantBrowser等）。此外，为了方便也有很多人直接简称其为IE内核（当然也不排除有部分人是因为不知道内核名称而只好如此说）。
- Gecko：Netscape6开始采用的内核，后来的Mozilla FireFox也采用了该内核，Gecko的特点是代码完全公开，因此，其可开发程度很高，全世界的程序员都可以为其编写代码，增加功能。因为这是个开源内核，因此受到许多人的青睐，Gecko内核的浏览器也很多，这也是Geckos内核虽然年轻但市场占有率能够迅速提高的重要原因。
- Presto： 目前Opera采用的内核，该内核在2003年的Opera7中首次被使用，该款引擎的特点就是渲染速度的优化达到了极致，也是目前公认网页浏览速度最快的浏览器内核，然而代价是牺牲了网页的兼容性。
- Webkit：苹果公司自己的内核，也是苹果的Safari浏览器使用的内核。 Webkit引擎包含WebCore排版引擎及JavaScriptCore解析引擎，均是从KDE的KHTML及KJS引擎衍生而来，它们都是自由软件，在GPL条约下授权，同时支持BSD系统的开发。所以Webkit也是自由软件，同时开放源代码。在安全方面不受IE、Firefox的制约，所以Safari浏览器在国内还是很安全的。
- KHTML：KHTML，是HTML网页排版引擎之一，由KDE所开发。KDE系统自KDE2版起，在档案及网页浏览器使用了KHTML引擎。该引擎以C++编程语言所写，并以LGPL授权，支援大多数网页浏览标准。由于微软的Internet Explorer的占有率相当高，不少以FrontPage制作的网页均包含只有IE才能读取的非标准语法，为了使KHTML引擎可呈现的网页达到最多，部分IE专属的语法也一并支援。KHTML拥有速度快捷的优点，但对错误语法的容忍度则比Mozilla产品所使用的Gecko引擎小。

国内双核浏览器默认内核模式如下：

1. 搜狗高速浏览器、QQ浏览器：IE内核（兼容模式）
2. 360极速浏览器、遨游浏览器：Webkit内核（极速模式）