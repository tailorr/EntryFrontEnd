## 函数声明和函数表达式有什么区别
函数声明会被提升到作用域的最前面，即使写代码的时候是写在最后面，也还是会被提升至最前面，在该作用域内的任何地方都能调用。函数表达式，只能在该作用域内该函数的后面调用该函数
## 什么是变量的声明前置？什么是函数的声明前置
**变量声明前置：**JavaScript引擎的工作方式是，先解析代码，获取所有被声明的变量，然后再一行一行地运行。这造成的结果，就是所有的变量的声明语句，都会被提升到代码的头部。
**函数声明前置：**JavaScript引擎将函数名视同变量名，所以采用function命令声明函数时，整个函数会像变量声明一样，被提升到代码头部。比如：

    console.log(a)
    var a = 1
    function b(x){
      console.log(x)
    }
会被js解析成:

    var a
    function b(x){
      console.log(x)
    }
    console.log(a)  //undefined
    a =1
## arguments 是什么
arguments对象是所有函数中可用的局部变量。你可以使用arguments对象在函数中引用函数的参数。此对象包含传递给函数的每个参数的条目，第一个条目的索引从0开始。
## 函数的"重载"怎样实现
重载是函数具有相同的名字，但是由于传入的参数不同，执行不同操作。在js中没有类似其他语言的重载，因为同名函数会被覆盖。但是js可以通过在函数内部对传入参数进行判断来达到重载的目的

    fonction print(name,age,sex) {
        if(name){
          console.log(name);
        }
        if(age){
          console.log(age);
        }
        if(sex){
          console.log(sex);
        }
    }
## 立即执行函数表达式是什么？有什么作用
在Javascript中，一对圆括号()是一种运算符，跟在函数名之后，表示调用该函数。比如，print()就表示调用print函数。

有时，我们需要在定义函数之后，立即调用该函数。这时，你不能在函数的定义之后加上圆括号，这会产生语法错误。例如，

    function(){ /* code */ }();  // SyntaxError: Unexpected token (
产生这个错误的原因是，function这个关键字即可以当作语句，也可以当作表达式。
解决办法就是不让function出现在行首，这就叫做“立即调用的函数表达式”（Immediately-Invoked Function Expression），简称IIFE。

例如：

    (function(){ /* code */ }());
    // 或者
    (function(){ /* code */ })();
- 作用：通常情况下，只对匿名函数使用这种“立即执行的函数表达式”。它的目的有两个：
  1. 不必为函数命名，避免了污染全局变量；
  2. IIFE内部形成了一个单独的作用域，可以封装一些外部无法读取的私有变量

##求n!，用递归来实现
    function recursion(n) {
      if(n<0) return;
      if (n===0||n===1) {
        return 1;
      }
      return n*recursion(n-1);
    }

## 以下代码输出什么？

	function getInfo(name, age, sex){
		console.log('name:',name);
		console.log('age:', age);
		console.log('sex:', sex);
		console.log(arguments);
		arguments[0] = 'valley';
		console.log('name', name);
	}

    getInfo('饥人谷', 2, '男'); 
    //name: 饥人谷
    //age: 2
    //sex: 男
    //['饥人谷', 2, '男']
    //name: valley

    getInfo('小谷', 3);
    //name: 小谷
    //age: 3
    //sex: undefined
    //['小谷', 3, 'undefined']
    //name: valley

    getInfo('男');
    //name: 男
    //age: undefined
    //sex: undefined
    //['男', 'undefined', 'undefined']
    //name: valley

##  写一个函数，返回参数的平方和？

	function sumOfSquares() {
			var result = 0;
			for(var i=0; i<arguments.length; i++){
			  result = result + arguments[i]*arguments[i];
			}
			return result;
		}
	var result = sumOfSquares(2,3,4)
	var result2 = sumOfSquares(1,3)
	console.log(result)  //29
	console.log(result2)  //10
## 如下代码的输出？为什么

    console.log(a);  //undefined  变量提升
    var a = 1;
    console.log(b); //b is not defined

## 如下代码的输出？为什么
	sayName('world');
	sayAge(10);
	function sayName(name){
		console.log('hello ', name);  //hello world
	}
	var sayAge = function(age){
		console.log(age);    //sayAge is not a function(报错)   函数声明会在代码执行前首先读取，而函数表达式要在代码执行到那一句时，函数才被定义（函数声明提升）
	};
***
    var x = 10
    bar() 
    function foo() {
      console.log(x)  //10
    }
    function bar(){
      var x = 30
      foo()
    }
伪代码：

    globalContext = {
        AO:{
            x: 10
            function: foo
            function: bar
        },
        Scope:null
    }

    //foo()声明时
    foo.[[scope]] = globalContext.AO
    //bar声明时
    bar.[[scope]] = globalContext.AO
    //调用bar时,bar的执行上下文
    barContext = {
       AO:{
	     x:30
	     function: foo
       }
       scope:globalContext.AO
    }
    //调用foo时，先从bar的AO中，找不到再从scope中找，这里在barConetext中能够找到，就立即调用。
    //调用时进入foo的执行上下文
    fooContext = {
        AO:{}
        scope:globalContext.AO
    }
    //所以从scope中即globalContext.AO中可以找到x:10。

***
    var x = 10;
    bar() 
    function bar(){
      var x = 30;
      function foo(){
        console.log(x)   //30
      }
      foo();
    }
伪代码:

    globalContext = {
        AO:{
	       x:10
	       bar:function
	    }
	    scope:null
    }
    bar.[[scope]] = globalContext.AO 
	    barContext = {
		  AO:{
	           x:30
	           foo:function
	      }
          bar.[[scope]] = globalContext.AO 
    }
	foo.[[scope]] = barContext.AO
	fooContext = {
	    AO:{}
	    foo.[[scope]] = barContext.AO
    }
    //所以调用foo时会在barContext.AO中找到x:30。
***
    var x = 10;
    bar() 
    function bar(){
      var x = 30;
      (function (){
        console.log(x)  //30
      })()
    }
伪代码：

    因为是立即执行函数，所以相当于
    var x = 30;
    console.log(x);

    所以结果为30;

***
    var a = 1;				//200

    function fn(){
        console.log({1:a}); 	//undefined
        var a = 5;
        console.log({2:a});   //5
        a++;			 		//6	
        var a;
        fn3();
        fn2();				//20
        console.log({3:a});	//20

        function fn2(){
            console.log({4:a});	//6
            a = 20;
        }
    }

    function fn3(){
      console.log({5:a})	//1
      a = 200;
    }

    fn();
    console.log({6:a});		//200
伪代码:

    globalContext = {
      AO:{
        a:200,
        fn:function,
        fn3:function,
      },
        scope:null;
    }
    fn.[[scope]] = globalContext.AO;
    fn3.[[scope]] = globalContext.AO;
    fn3Context = {
      AO:{},
      scope:globalContext.AO,
    }
    fnContext = {
       AO:{
       a:20,
       fn2:function,
    },
       scope:globalContext.AO
    }
    fn2.[[scope]] = fnContext.AO;
    fn2Context = {
      AO:{},
      scope:fnContext.AO
    }


**自己的理解**：作用域链就是先从局部作用域开始查找需要的变量，找到了就不会往外层作用域继续查找，找不到就会继续向上查找，直到全局作用域。函数执行环境是在声明的时候定下来的