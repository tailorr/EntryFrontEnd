# ES6中的super关键字
1. 子类必须在constructor方法中调用super方法，否则新建子类实例时会报错。这是因为子类没有自己的this对象，而是继承父类的this对象，然后对其进行加工。如果不调用super方法，子类就得不到this对象。



2. ES5 的继承，实质是先创造子类的实例对象this，然后再将父类的方法添加到this上面（Parent.apply(this)）。ES6 的继承机制完全不同，实质是先创造父类的实例对象this（所以必须先调用super方法），然后再用子类的构造函数修改this。
3. 如果子类没有定义constructor方法，这个方法会被默认添加，代码如下。也就是说，不管有没有显式定义，任何一个子类都有constructor方法。
4. 另一个需要注意的地方是，在子类的构造函数中，只有调用super之后，才可以使用this关键字，否则会报错。这是因为子类实例的构建，是基于对父类实例加工，只有super方法才能返回父类实例。

super可以当做对象使用，也可以当做函数使用，两种情况的用法完全不同

- 当做函数使用

  当做函数使用的super关键字，代表的是父类的构造函数，ES6要求，子类的构造函数必须执行一次super函数,而且super只能用在子类的构造函数之中，用在其它地方会报错的
```js
class A{}
class B extends A {
  constructor () {
    super();//代表父类A上的constructor
  }
}
```
但是这里需要注意的是super虽然代表了父类的构造函数，但是返回的是子类的实例，就是说super内部的this指向子类，所以super()在这里相当于A.prototype.constructor.call(this).
- 当做对象使用
  super当做对象时，在普通方法中，指向父类的原型对象；在静态方法中，指向父类
```js
class A {
  p(){
    return 2
  }
}
class B extens A{
  constructor() {
    super()
    console.log(super.p())  // 2
  }
}
let b = new B()
```
上面的代码中，子类B当中的super.p(),就是将super当作一个对象使用。这时，super在普通方法中，指向的是A.prototype,super.p()就相当于A.prototype.p()。



这里需要注意，由于super指向父类的原型对象，所以定义在父类实例上的方法或属性，是无法通过super调用的。

```js
class A {
  constructor() {
    this.p = 2;
  }
}

class B extends A {
  get m() {
    return super.p;
  }
}

let b = new B();
b.m // undefined
```
上面代码中，p是父类A实例的属性，super.p就引用不到它。



如果属性定义在父类的原型对象上，super就可以取到。
```js
class A {}
A.prototype.x = 2;

class B extends A {
  constructor() {
    super();
    console.log(super.x) // 2
  }
}

let b = new B();
```
ES6 规定，通过super调用父类的方法时，super会绑定子类的this。