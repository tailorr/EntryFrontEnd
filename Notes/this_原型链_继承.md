**问题1：** apply、call 、bind有什么作用，什么区别

apply()、call()方法在指定this值和参数的情况下调用函数，或者说在调用函数时动态的指定执行上下文和参数。

bind()是ES5的新方法，该方法创建一个新的函数(称为绑定函数)，当被调用时，第一个参数决定了运行时的this，之后传入的参数将会作为函数执行时的实参来使用。

**相同：**三者都是用来改变函数的this对象的指向的；第一个参数都是this要指向的对象，也就是想指定的上下文；都可以利用后续参数传参；

**不同：**bind返回对应的函数，便于稍后调用；apply，call则是立即调用。apply参数是数组对象或类数组形式，call参数是参数列表。

```javascript
//apply/call/bind的使用
var bar = {
  param: value
}
var foo = {
  getParam:function(){
        return this.param
    },
  getSum:function(a,b){
      return this.param + a + b
  }
}

foo.getX.bind(bar)()
foo.getX.apply(bar)
foo.getSum.call(bar,1,2)
foo.getSum.apply(bar,[1,2])
foo.getSum.bind(bar,1,2)()
```

参考[Javascript深入call和apply的模拟实现](https://github.com/mqyqingfeng/Blog/issues/11)

## 问题2： 以下代码输出什么?

```javascript
var john = { 
  firstName: "John" 
}
function func() { 
  alert(this.firstName + ": hi!")
}
john.sayHi = func
john.sayHi()
//输出 John:hi!
```

## 问题3： 下面代码输出什么，为什么

```javascript
func() 
function func() { 
  alert(this)
}
//输出window
//未指定this，this值为underfined，在非严格模式下，指定this为underfined，则会自动指向全局对象（浏览器中为window对象）
```

## 问题4：下面代码输出什么

```javascript
document.addEventListener('click', function(e){
    console.log(this);
    setTimeout(function(){
        console.log(this);
    }, 200);
}, false);
//输出document    绑定事件中this指向事件源
//输出window      setTimeout中的this指向全局对象window
```

## 问题5：下面代码输出什么，why

```javascript
var john = { 
  firstName: "John" 
}

function func() { 
  alert( this.firstName )
}
func.call(john)
// 输出 John  call方法把this指定为John
```

## 问题6： 以下代码有什么问题，如何修改

```javascript
var module= {
  bind: function(){
    $btn.on('click', function(){
      console.log(this) 
      this.showMsg();
    })
  },

  showMsg: function(){
    console.log('饥人谷');
  }
}  
 //  this.showMsg() this指 $btn 没有showMsg() 报错  
 //  修改后
var module= {
  bind: function(){
    var self = this
    $btn.on('click', function(){
      <!-- console.log(this)  -->
      self.showMsg();
    })
  },

  showMsg: function(){
    console.log('饥人谷');
  }
}
```

**问题7：**有如下代码，解释`Person`、 `prototype`、`__proto__`、`p`、`constructor`之间的关联。

```javascript
function Person(name){
    this.name = name;
}
Person.prototype.sayName = function(){
    console.log('My name is :' + this.name);
}
var p = new Person("若愚")
p.sayName();

//p是Person的实例，拥有Person原型链上的属性和方法
//每个对象都有prototype属性指针指向它们的原型对象
Person.prototype.constructor === Person

//同时原型对象的constructor属性指针指向prototype属性所在的对象
p.__proto__ === Person.prototype
p.__proto__.constructor === Person//实现实例与构造函数之间的链接
Person.__proto__ === Function.prototype
Function.__proto__ === Object.prototype
//同时每个对象都通过 __proto__ 属性来实现原型链，将实例和构造函数的原型对象链接起来
```

**问题8：** 上例中，对对象 p可以这样调用 `p.toString()`。`toString`是哪里来的? 画出原型图?并解释什么是原型链。

```javascript
js通过原型链实现继承，原型链通过_proto_实现链接；
如下图:
p ==> 实例
p.__proto__ ==> Person.prototype
p.__proto__(Person.prototype).__proto__ ===> Object.prototype toSting()
```

![](https://ws1.sinaimg.cn/large/d40e9753gy1fhlitfc9ltj20f20dywfc.jpg)

![](https://ws1.sinaimg.cn/large/d40e9753gy1fhlkos31skj20se0nlmxq.jpg)

**原型链：**JavaScript 对象有一个指向一个原型对象的链。当试图访问一个对象的属性时，它不仅仅在该对象上搜寻，还会搜寻该对象的原型，以及该对象的原型的原型，依此层层向上搜索，直到找到一个名字匹配的属性或到达原型链的末尾。这些原型组成的关系就成为原型链

**问题9：**对`String`做扩展，实现如下方式获取字符串中频率最高的字符

```javascript
String.prototype.getMostOften = function(){
  let frequency = {},
      key,
      max = 0,
      maxKey;
  for(let i = 0; i<this.length; i++){
    key = this[i]
    if(frequency[key]) {
      frequency[key]++
    } else {
      frequency[key] = 1
    }
  }
  for(let key in frequency){
    if(frequency[key]>max){
      max = frequency[key]
      maxKey = key
    }
  }
  return maxKey
}
var str = 'ahbbccdeddddfg';
var ch = str.getMostOften();
console.log(ch); //d , 因为d 出现了5次
```

**问题10：** `instanceOf`有什么作用？内部逻辑是如何实现的？

> instanceof 运算符用来测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性。
>
> instanceof 运算符用来检测 constructor.prototype 是否存在于参数 object 的原型链上。

```javascript
//实现逻辑
function instanceOf(){
  let oldProto = obj.__proto__
  do{
    if(oldProto===Fn.prototype){
      return true
    }else{
      oldProto = oldProto.__proto__
    }
  }while(oldProto)
  return false
}
```



### 继承相关问题

**问题11：**继承有什么作用?

继承可以减少重复的代码，把公用的方法属性放在父类，子类可以直接使用，并且子类也可以很方便扩展添加新的方法或者属性，不会影响到父类。提高复用，减少代码冗余。

**问题12：** 下面两种写法有什么区别?

```javascript
//方法1
function People(name, sex){
    this.name = name;
    this.sex = sex;
    this.printName = function(){
        console.log(this.name);
    }
}
var p1 = new People('饥人谷', 2)

//方法2
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}

Person.prototype.printName = function(){
    console.log(this.name);
}
var p1 = new Person('若愚', 27);
```

方法1中每次新建一个对象实例，这个实例上都会有一个printName方法，新建多个对象的话，会多次创建这个方法；
方法2中把printName方法挂载到Person.prototype上，无论新建多少个实例对象，每个实例对象的`__proto__`都指向Person.prototype。

**问题13：** `Object.create` 有什么作用？兼容性如何？

```javascript
Object.create() 方法使用指定的原型对象和其属性创建了一个新的对象。
Object.create(proto, [ propertiesObject ])
proto：一个对象，作为新创建对象的原型。或者为null。

propertiesObject：可选。该参数对象是一组属性与值，该对象的属性名称将是新创建的对象的属性名称，值是属性描述符（这些属性描述符的结构与Object.defineProperties()的第二个参数一样）。注意：该参数对象不能是 undefined，另外只有该对象中自身拥有的可枚举的属性才有效，也就是说该对象的原型链上属性是无效的。

相当于
Object.create = function(prop){
  function F(){}
  F.prototype = prop
  return new F;
}
```

**问题14：** `hasOwnProperty`有什么作用？ 如何使用？

```javascript
//hasOwnProperty是JavaScript中唯一一个只涉及对象自身属性而不会遍历原型链的方法。
//它可以判断一个对象是否包含自定义属性和方法而不是原型链上的属性和方法

const a = {prop:'exist'}
a.hasOwnProperty('prop') //true
a.hasOwnProperty('toString') //false
```

**问题15：**如下代码中`call`的作用是什么?

```javascript
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}
function Male(name, sex, age){
    Person.call(this, name, sex);    //这里的 call 有什么作用
    this.age = age;
}

//call的作用是执行Person，并且将调用这个函数实例对象作为this传入，这样实例对象上就会有name和sex属性
//Person.call(this,name,sex) ==> this.name =name;this.sex=sex;
```

**问题16：** 补全代码，实现继承 

```
function Person(name, sex){
    this.name = name;
    this.sex = sex;
}

Person.prototype.getName = function(){
    console.log(this.name)
};    

function Male(name, sex, age){
   Person.call(this,name,sex)
   this.age = age
}

Male.prototype = Object.create(Person.prototype)
Male.prototype.constructor = Male

Male.prototype.getAge = function(){
    console.log(this.age)
};

var ruoyu = new Male('若愚', '男', 27);
ruoyu.printName();
```