## 数据类型

JavaScript语言的每一个值，都属于某一种数据类型。JavaScript的数据类型，共有六种。（ES6又新增了第七种Symbol类型的值）

- 数值（number）：整数和小数（比如1和3.14）
- 字符串（string）：字符组成的文本（比如"Hello World"）
- 布尔值（boolean）：true（真）和false（假）两个特定值
- undefined：表示“未定义”或不存在，即此处目前没有任何值
- null：表示空缺，即此处应该有一个值，但目前为空
- 对象（object）：各种值组成的集合

##### 对象又可以分成三个子类型。

- 狭义的对象（object）
- 数组（array）
- 函数（function）

狭义的对象和数组是两种不同的数据组合方式，而函数其实是处理数据的方法。JavaScript把函数当成一种数据类型，可以像其他类型的数据一样，进行赋值和传递，这为编程带来了很大的灵活性，体现了JavaScript作为“函数式语言”的本质。

这里需要明确的是，JavaScript的所有数据，都可以视为广义的对象。不仅数组和函数属于对象，就连原始类型的数据（数值、字符串、布尔值）也可以用对象方式调用。

## 原始类型（primitive type）与复杂类型（complex type）
通常，我们将**数值、字符串、布尔，Symbol称为原始类型（primitive type）**的值，即它们是最基本的数据类型，不能再细分了。而将**对象称为复杂类型（complex type）**的值，因为一个对象往往是多个原始类型的值的合成，可以看作是一个存放各种值的容器。至于undefined和null，一般将它们看成两个特殊值。

##### 两者的区别
原始类型的值是固定而简单的值,是存放在栈(stack)中的简单数据段,也就是说,它们的值直接存储在变量访问的位置。原始类型的值是表示Javascript中可用的数据或信息的最底层形式或最简单形式。原始类型的值被称为原始值，是因为它们是不可细化的。
复杂类型得值可以由很多不同类型的javascript对象组成。复杂对象其在内存中的大小是未知的，因为复杂对象可以包含任何值，而不是一个特定的已知值，复杂类型的变量存的是内存地址，这个内存地址指向值。

## typeof和instanceof的作用和区别

typeof运算符可以返回一个值的数据类型，可能有以下结果:
1. 数值、字符串、布尔值分别返回number、string、boolean。
2. 函数返回function。
3. undefined返回undefined。
typeof可以用来检查一个没有声明的变量，而不报错。实际编程中，这个特点通常用在判断语句。


    if (typeof b === "undefined") {  //采用表达式判断
            statement
    }

除此以外，其他情况都返回object。
如果我们希望获取一个对象是否是数组，或判断某个变量是否是某个对象的实例则要选择使用instanceof。instanceof通过返回一个布尔值来判断一个变量是否某个对象的实例。

    [1, 2, 3] instanceof Array   //true

## 如何判断一个变量是否是数字、字符串、布尔、函数

    typeof 123 === 'number'  //判断是否是数字
    typeof '123' === 'string'  //判断是否为字符串
    typeof true ==='boolean'  //判断是否为布尔
    typeof a ==='function'  //判断是否为函数
## NaN 
NaN —— "Not a Number" 表示非数字，数据类型是number，比如你可以用isNaN("blue")，就可以发现返回的事一个true，当然对于其他的数据类型其解析规则和Number()差不多，
**特别之处：**任何NaN的值进行操作都会返回一个NaN,其次，NaN与任何值都不相等即**NaN === NaN也是false**.

## 如何把非数值转化为数值?
用以下三个函数实现：
- Number（）
- parseInt（）
- parseFloat()

##### 用法
1. parseInt和parseFloat函数会忽略空白字符，直至找到第一个非空字符；
2. 如果第一个字符不是数字或者不是为-，则返回NaN；
3. 如果是会继续读取，直至读取到非数字内容为止；
4. 0开头，会解析为八进制，0x开头会解析为十六进制，可以指定第二个参数，直接定义数字类型为2进制、10进制或16进制

## ==与===有什么区别
##### ===是严格意义的相等

##### ==是值相等，**javascript会自动帮我们做隐式类型转换：**


- 如果两个值类型相同，则执行严格相等的运算
- 如果两个值的类型不同


1. 如果一个是null，一个是undefined，那么相等
2. 如果一个是数字，一个是字符串，先将字符串转为数字，然后比较
3. 如果一个值是true/false则将其转为1/0比较
4. 如果一个值是对象，一个是数字或字符串，则尝试使用valueOf和toString转换后比较

## break与continue有什么区别
- break 用于强制退出循环体，执行循环后面的语句
- continue 用于退出本次循环，执行下次循环

## void 0 和 undefined在使用场景上有什么区别
void 0 的返回值就是undefined

    void 0 === undefined //true
void 运算符会对给定的表达式进行计算，然后返回 undefined。
**通常 void 0 会用来获取 undefined。undefined 在局部作用域中可能被重写，但是 void 0 返回的值一定会是 undefined。**
[void 运算符 ——MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/void)

## 代码

    console.log(1+1);       2//两个数字类型的加法运算
    console.log("2"+"4");  '24'//字符串拼接
    console.log(2+"4");    '24'//数字类型会转换为字符串类型，而后拼接
    console.log(+"4");      4//字符串加空字符会转换为数字类型
***
    var a = 1;  //1
    a+++a;  //3
    typeof a+2;//number2
***
     var a = 1;
     var b = 3;
     console.log( a+++b );  4;//因为a++会先执行表达式，执行结束后再将a+1赋值给a，所以在执行a+++b时候，a==1，b==3，所以结果为4
***
    var arr = [3,4,5];
    for(var i=0;i<arr.length;i++){
        console.log(arr[i]*arr[i]);  //输出结果9; 16; 25;
    };
***    
    var obj = {
       name: 'hunger', 
       sex: 'male', 
       age: 28 
    }
    for( var i in obj){
       console.log(i+":"+obj[i]);
    }
***
    var a = 1, b = 2, c = 3;
    var val = typeof a + b || c >0;
    console.log(val) ;          //number2;
    //首先typeof(a) ==  "number";然后b||c>0 == 2;所以val = "number"+2,val == "number2";

    var d = 5;
    var data = d==5 && console.log('bb')
    console.log(data)           //undefined;
    //console.log('bb')先执行输出bb，&&级高于=和==，执行d==5&&console.log('bb')得到undefined，所以data最后赋值为undefined

    var data2 = d = 0 || console.log('haha')
    console.log(data2)          //undefined
    //console.log('haha')先执行输出haha，||优先级高于=，0||console.log('haha')输出undefined,右结合赋值给data2,所以data2最后赋值为undefined
    var x = !!"Hello" + (!"world", !!"from here!!");
    console.log(x)              //2   
    //非空字符串返回true true ===1;   !!表示取了两次反;  !!"Hello"=>1   (!"world", !!"from here!!")=>1;  最后1+1 =2