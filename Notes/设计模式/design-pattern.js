//单例模式的定义是产生一个类的唯一实例，但js本身是一种“无类”语言。
//很多讲js设计模式的文章把{}当成一个单例来使用也勉强说得通。因为js生成对象的方式有很多种，我们来看下另一种更有意义的单例。
//有这样一个常见的需求， 点击某个按钮的时候需要在页面弹出一个遮罩层。 比如web.qq.com点击登录的时候.
var singleton = function(fn) {
    var result;
    return function() {
        return result || (result = fn.apply(this, arguments));
    }
}

var createMask = singleton(function() {

    return document.body.appendChild(document.createElement('div'));

})



//通过这段代码, 在firefox, chrome等浏览器里，可以完美模拟new.

function A(name) {
    this.name = name;
}

function ObjectFactory() {

    var obj = {},

        Constructor = Array.prototype.shift.call(arguments);

    obj.__proto__ = typeof Constructor.prototype === 'number' ? Object.prototype : Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;

}

var a = ObjectFactory(A, 'svenzeng');

alert(a.name); //svenzeng
//这段代码来自es5的new和构造器的相关说明， 
//可以看到，所谓的new， 本身只是一个对象的复制和改写过程， 而具体会生成什么是由调用ObjectFactory时传进去的参数所决定的。


//观察者模式


var Events = function() {
    var listen, log, obj, one, remove, trigger, __this;
    obj = {};
    __this = this;

    listen = function(key, eventfn) { //把简历扔盒子, key就是联系方式.
        var stack, _ref; //stack是盒子
        stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
        return stack.push(eventfn);
    };

    one = function(key, eventfn) {
        remove(key);
        return listen(key, eventfn);
    };

    remove = function(key) {
        var _ref;
        return (_ref = obj[key]) != null ? _ref.length = 0 : void 0;
    };

    trigger = function() { //面试官打电话通知面试者
        var fn, stack, _i, _len, _ref, key;
        key = Array.prototype.shift.call(arguments);
        stack = (_ref = obj[key]) != null ? _ref : obj[key] = [];
        for (_i = 0, _len = stack.length; _i < _len; _i++) {
            fn = stack[_i];
            if (fn.apply(__this, arguments) === false) {
                return false;
            }
        }

        return {
            listen: listen,
            one: one,
            remove: remove,
            trigger: trigger
        }
    }

}

function CustomType() {
    this.name = "tugenhua";
};
CustomType.prototype.getName = function() {
    return this.name;
}
var application = (function() {
    // 定义私有
    var privateA = "aa";
    // 定义私有函数
    function A() {};

    // 实例化一个对象后，返回该实例，然后为该实例增加一些公有属性和方法
    var object = new CustomType();

    // 添加公有属性
    object.A = "aa";
    // 添加公有方法
    object.B = function() {
            return privateA;
        }
        // 返回该对象
    return object;
})()

//工厂模式
function CreatePerson(options) {
    var person = {
        name: options.name || 'tail'
    }
    person.getName: function() {
        console.log(this.name)
    }
    return person
}
var person1 = CreatePerson({ name: 'xxxxxxxxxx' })
var person2 = CreatePerson({ name: 'yyyyyyyyyyyyyy' })

//构造函数模式
function CreatePerson(name) {
    this.name = name
}
CreatePerson.prototype = {
    getName: function() {
        console.log(this.name)
    }
}

var son = new CreatePerson('tail')



//混合模式 ==>继承的实现
var CreatePerson = function(name) {
    this.name = name
}
CreatePerson.prototype = {
    getName: function() {
        console.log(this.name)
    }
}

var CreateStudent = function(name, age) {
    CreatePerson.call(this, name)
    this.age = age
}

// CreateStudent.prototype = Object.create(CreatePerson.prototype)   //ES5方法
CreateStudent.prototype = create(CreatePerson.prototype)

function create(parentObj) { //兼容IE
    function F() {}
    F.prototype = parentObj
    return new F()
}

CreateStudent.prototype = {
    constructor: CreateStudent, //纠正构造函数指向
    getAge: function() {
        console.log(this.age)
    }
}

var student = new CreateStudent("pig", 28)
console.log(student)


//模块模式

var CreateWork = (function() {
    var name = "tail"

    function getName() {
        console.log(name)
    }


    return {
        name: name,
        getName: getName
    }
})()


//单例模式
var singleton = (function() {
    var instance

    function init(name) {
        //私有变量、私有属性
        return {
            //公有变量、公有属性
            getName: function() {
                console.log(name)
            }
        }
    }

    return {
        CreatePerson: function(name) {
            if (!instance) {
                instance = init(name)
            }
            return instance
        }
    }
})()


var person1 = singleton.CreatePerson('tail')
var person2 = singleton.CreatePerson('tail_01')


//发布订阅模式
var EventCenter = (function() {
    var event = {}

    //发布
    function on(e, handler) {
        event[e] = event[e] || []
        event[e].push({
            handler: handler
        })
    }

    //订阅
    function fire(e, arguments) {
        if (!event[e]) return
        for (var i = 0; i < event[e].length; i++) {
            event[e][i].handler(arguments);
        }
    }

    function off(e) {
        delete event[e]
    }
    return {
        on: on,
        fire: fire,
        off: off
    }
})()

EventCenter.on('my_event', function(data) {
    console.log('my_event received...');
});
EventCenter.on('my_event', function(data) {
    console.log('my_event2 received...');
});
EventCenter.fire('my_event');
EventCenter.on('change', function(val) {
    console.log('change...  now val is ' + val);
});
EventCenter.fire('change', '饥人谷');
EventCenter.off('change');