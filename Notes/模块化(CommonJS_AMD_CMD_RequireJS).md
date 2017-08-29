## 模块化的由来

JS发展初期就是为了实现简单的页面交互逻辑，如今CPU、浏览器性能得到了极大的提升，很多页面逻辑迁移到了客户端（表单验证等），随着web2.0时代的到来，Ajax技术得到广泛应用，jQuery等前端库层出不穷，前端代码日益膨胀。

这时候JavaScript作为嵌入式的脚本语言的定位动摇了，JavaScript却没有为组织代码提供任何明显帮助，甚至没有类的概念，更不用说模块（module）了，JavaScript极其简单的代码组织规范不足以驾驭如此庞大规模的代码。

既然JavaScript不能handle如此大规模的代码，我们可以借鉴一下其它语言是怎么处理大规模程序设计的，在Java中有一个重要的概念——`package`，逻辑上相关的代码组织到同一个包内，包内是一个相对独立的王国，不用担心命名冲突什么的，那么外部如果使用呢？直接`import`对应的package即可

```
import java.util.ArrayList;

```

遗憾的是JavaScript在设计时定位原因，没有提供类似的功能，开发者需要模拟出类似的功能，来隔离、组织复杂的JavaScript代码，我们称为模块化。

一个模块就是实现特定功能的文件，有了模块，我们就可以更方便地使用别人的代码，想要什么功能，就加载什么模块。模块开发需要遵循一定的规范，各行其是就都乱套了

规范形成的过程总是痛苦的，前端的先驱在刀耕火种、茹毛饮血的阶段开始，发展到现在初具规模，我们来简单了解一下这段不凡的历程

### 函数封装

我们都知道函数的一个功能就是对一组实现特定逻辑的语句进行打包，而且JS的作用域是基于函数的，所以我们首先想到的是把函数作为模块化的第一步

```javascript
function fn1(){
  //statement
}

function fn2(){
  //statement
}
```

这样之后我们在使用函数里面的功能的时候只要调用函数即可

但是因为函数的定义是在全局的，**可能会发生命名冲突，污染全局变量，而且模块之间也没有关联**

### 对象

为了解决函数封装的缺点，对象的写法应用而生，如下，我们可以把所有模块成员封装在一个对象中

```javascript
var moduleA = {
  a: 1,
  
  b: 2,
  
  fn1:function() {
    
  },
  
  fn2: function() {
    
  }
}
```

调用的时候只要引用文件，然后

```javascript
moduleA.fn1()
```

这样避免了变量污染，只要保证模块名唯一即可，同时同一模块内的成员也有了关系

看似不错的解决方案，但是也有缺陷，外部可以随意修改内部成员

```
moduleA.b = 50;
```

可能导致意想不到的安全问题

### 立即执行函数

可以通过立即执行函数，来达到隐藏细节的目的

```javascript
var myModule = (function(){
    var a = 1;
    var b = 2;

    function fn1(){

    }

    function fn2(){

    }

    return {
        fn1: fn1,
        fn2: fn2
    };
})();
```

这样在模块外部无法修改我们没有暴露出来的变量、函数

**上述做法就是我们目前实现模块化的基础**，目前，通行的JavaScript模块规范主要有两种：`CommonJS`和`AMD`



## 为什么要使用模块化？

主要目的

- 解决命名冲突
- 依赖管理

其他价值

- 提高代码可读性
- ​

[参考--前端模块化开发的价值](https://github.com/seajs/seajs/issues/547)



## CommonJS 、CMD、AMD规范分别指什么？有哪些应用

### CommonJS

首先，CommonJS是服务器端模块的规范，Node.js就是基于这个规范。Node.JS首先实现了JS模块化的概念。

根据[CommonJS 规范](http://javascript.ruanyifeng.com/nodejs/commonjs.html)，CommonJS的基本使用主要由以下三个步骤

1. **定义模块**   根据`CommonJS`规范，一个单独的文件就是一个模块。每一个模块都是一个单独的作用域，也就是说，在该模块内部定义的变量，无法被其他模块读取，除非定义为`global`对象的属性。
2. **输出模块**   模块只有一个出口，module.exports对象，这里存放的是模块希望输出的内容
3. **加载模块**   加载模块使用require方法，该方法读取一个文件并且执行，返回文件内部的module.exports对象

举个例子:

 ```javascript
//定义模块 myModule.js
var name =  'tail'

function printName(){
  console.log(name)
}

function printFullName(firstName){
    console.log(firstName + name);
}

//输出模块
module.exports = {
    printName: printName,
    printFullName: printFullName
}

//加载模块
var nameModule = require('./myModule.js') //不同的实现对require时的路径有不同要求，一般情况可以省略js拓展名，可以使用相对路径，也可以使用绝对路径，甚至可以省略路径直接使用模块名（前提是该模块是系统内置模块）

//使用模块
nameModule.printName();
 ```

### AMD

AMD 即`Asynchronous Module Definition`，中文名是**异步模块定义**的意思。它是一个在浏览器端模块化开发的规范

由于不是JavaScript原生支持，使用AMD规范进行页面开发需要用到对应的库函数，也就是大名鼎鼎`RequireJS`，实际上AMD 是RequireJS 在推广过程中对模块定义的规范化的产出

RequireJS 主要解决两个问题

1.  **实现js文件的异步加载，避免网页失去响应；js加载的时候浏览器会停止页面渲染，加载文件越多，页面失去响应时间越长**
2.  **管理模块之间的依赖性，多个js文件可能有依赖关系，被依赖的文件需要早于依赖它的文件加载到浏览器，便于代码的编写和维护。**

```javascript
//定义模块myModule.js
define(['依赖1，依赖2，依赖3']，function(依赖1，依赖2，依赖3){
    var name = 'tail';
    function printName(){
        console.log(name);
    }

    return {
        printName: printName
    };
})

//加载模块
require(['myModule'],function(my){
  my.printName(); });
})
```

#### 语法

requireJS定义了一个函数 define，它是全局变量，用来定义模块

```
define(id?, dependencies?, factory);

```

- id: 定义模块的名字，可选；如果没有提供该参数，模块的名字应该默认为模块加载器请求的指定脚本的名字。
- 依赖dependencies: 是一个当前模块依赖的，已被模块定义的模块标识的数组字面量。 依赖参数是可选的，如果忽略此参数，它应该默认为["require", "exports", "module"]。然而，如果工厂方法的长度属性小于3，加载器会选择以函数的长度属性指定的参数个数调用工厂方法。
- 工厂方法factory，模块初始化要执行的函数或对象。如果为函数，它应该只被执行一次。如果是对象，此对象应该为模块的输出值。

在页面上使用require函数加载模块

```
require([dependencies], function(dependencies){});
```

require()函数接受两个参数

1. 第一个参数是一个数组，表示所依赖的模块
2. 第二个参数是一个回调函数，当前面指定的模块都加载成功后，它将被调用。加载的模块会以参数形式传入该函数，从而在回调函数内部就可以使用这些模块

require()函数在加载依赖的函数的时候是异步加载的，这样浏览器不会失去响应，它指定的回调函数，只有前面的模块都加载成功后，才会运行，解决了依赖性的问题。

### CMD

CMD 即`Common Module Definition`通用模块定义，CMD规范是国内发展出来的，AMD有个requireJS，CMD有个浏览器的实现SeaJS，SeaJS要解决的问题和requireJS一样，只不过在模块定义方式和模块加载（可以说运行、解析）时机上有所不同

#### 语法

Sea.js 推崇一个模块一个文件，遵循统一的写法

**define**

```
define(id?, deps?, factory)

```

因为CMD推崇

1. 一个文件一个模块，所以经常就用文件名作为模块id
2. CMD推崇依赖就近，所以一般不在define的参数中写依赖，在factory中写，factory有三个参数

```
function(require, exports, module)
```

**require**

require 是 factory 函数的第一个参数

```
require(id)
```

require 是一个方法，接受 模块标识 作为唯一参数，用来获取其他模块提供的接口

**exports**

exports 是一个对象，用来向外提供模块接口

**module**

module 是一个对象，上面存储了与当前模块相关联的一些属性和方法

```javascript
//定义模块
define(function(require, exports, module){
  var $ = require('jquery.js')
  $('div').removeClass('active')
})

 //加载模块
seajs.use(['myModule.js'], function(my){
  
})
```

## AMD与CMD区别 

关于这两个的区别网上可以搜出一堆文章，简单总结一下

最明显的区别就是在模块定义时对依赖的处理不同

1. AMD推崇依赖前置，在定义模块的时候就要声明其依赖的模块
2. CMD推崇就近依赖，只有在用到某个模块的时候再去require

这种区别各有优劣，只是语法上的差距，而且requireJS和SeaJS都支持对方的写法

AMD和CMD最大的区别是对依赖模块的执行时机处理不同，注意不是加载的时机或者方式不同

很多人说requireJS是异步加载模块，SeaJS是同步加载模块，这么理解实际上是不准确的，其实加载模块都是异步的，只不过AMD依赖前置，js可以方便知道依赖模块是谁，立即加载，而CMD就近依赖，需要使用把模块变为字符串解析一遍才知道依赖了那些模块，这也是很多人诟病CMD的一点，牺牲性能来带来开发的便利性，实际上解析模块用的时间短到可以忽略

为什么我们说两个的区别是依赖模块执行时机不同，为什么很多人认为ADM是异步的，CMD是同步的（除了名字的原因。。。）

同样都是异步加载模块，AMD在加载模块完成后就会执行该模块，所有模块都加载执行完后会进入require的回调函数，执行主逻辑，这样的效果就是依赖模块的执行顺序和书写顺序不一定一致，看网络速度，哪个先下载下来，哪个先执行，但是主逻辑一定在所有依赖加载完成后才执行

CMD加载完某个依赖模块后并不执行，只是下载而已，在所有依赖模块加载完成后进入主逻辑，遇到require语句的时候才执行对应的模块，这样模块的执行顺序和书写顺序是完全一致的

这也是很多人说AMD用户体验好，因为没有延迟，依赖模块提前执行了，CMD性能好，因为只有用户需要的时候才执行的原因