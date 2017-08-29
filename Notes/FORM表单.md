# HTML表单
## Form表单
form表单用于把用户输入的数据提交给后台服务器
name表示提交的表单名称，action表示数据提交的地址，methods表示数据提交的方式，有get和post，默认是get

```html
<form name="myform" action="url" method="get/post"><form>
```
### label标签
`<label>` 标签为 input 元素定义标注（标记）。
label 元素不会向用户呈现任何特殊效果。不过，它为鼠标用户改进了可用性。如果您在 label 元素内点击文本，就会触发此控件。就是说，当用户选择该标签时，浏览器就会自动将焦点转到和标签相关的表单控件上。

### HTML表单有四种
1. `<input>`

2. `<textarea> `

3. `<select>`

4. `<button>`

### input标签

- 单行文本输入框

  ```
  <input name="username" type="text" placeholder="请输入用户名" maxlength=10 />
  <!-- maxlength控制输入的字符最大长度，placeholder设置输入框提示 -->
  ```

- 密码输入框

  ```
  <input name="username" type="password" placeholder="请输入密码“”>
  ```

- 复选框

  ```
  <input name="hobby" type="checkbox"> 读书
  <!-- name用于分组，相同的name表示是同一组多选框 -->
  ```

- 单选框

  ```
  <input name="sex" type="radio">女
  <input name="sex" type="radio">男
  ```
  **radio通过name值来分组，name相同的为一组。**

- file

  ```
  <input name="myfile" type="file" accept="image/png">
  <!-- accept表示可以上传的文件格式  -->
  ```

- 提交输入

  ```
  <input type="submit">
  <!--有提交动作  -->
  ```

- 重置输入

  ```
  <input type="reset" value="reset">
  <!--所有表单重置为初始状态  -->
  ```

- button

  ```
  <input type="button" value="Button" /> 
  <!--没有提交动作  -->
  ```

- hidden

  ```
  <input type="hidden" name=" " value=" ">
  <!--隐藏域，用户看不到，用于暂存数据。或者安全性校验  -->
  ```

#### input里面的name



由于表单提交的数据一般都是以key:value的方式提交，所以input中的name属性主要用来标识提交的数据的key值，好让服务器处理程序分辨。
例如：

```html
<input name=name value=adam><input name=age value=18>
```

则服务器在后台收到的数据格式可能是这样的：

```json
{
  name:adam,
  age:18
}
```
**注意**:只有设置了 name 属性的表单元素才能在提交表单时传递它们的值。
### textarea标签
多行文本输入框

```html
<textarea rows="行数" cols="列数">
    文本
</textarea>
```

### select标签
 创建单选或多选菜单

```html
<select name="city ">
<!-- 下拉选框 -->
    <option value="beijing">北京</option>
    <option value="shanghai" selected>上海</option>
</select>
```

### button标签
```html
<button>提交</button>
```
## placeholder属性的作用

placeholder 是HTML5的新属性
placeholder 属性提供可描述输入字段预期值的提示信息。
该提示会在输入字段为空时显示，并会在字段获得焦点时消失。

**注意**：placeholder 属性适用于以下的 <input> 类型：text, password、 search, url, telephone,以及 email

## type=hidden隐藏域的作用

### 隐藏域具体写法：

> <input type="hidden" name="field＿name" value="value">

### hidden隐藏域无外乎下面六点作用：

- 隐藏域在页面中对于用户是不可见的，在表单中插入隐藏域的目的在于收集或发送信息，以利于被处理表单的程序所使用。浏览者单击发送按钮发送表单的时候，隐藏域的信息也被一起发送到服务器。
- 有些时候我们要给用户一信息，让他在提交表单时提交上来以确定用户身份，如sessionkey，等等．当然这些东西也能用cookie实现，但使用隐藏域就简单的多了．而且不会有浏览器不支持，用户禁用cookie的烦恼。
- 有些时候一个form里有多个提交按钮，怎样使程序能够分清楚到底用户是按那一个按钮提交上来的呢？我们就可以写一个隐藏域，然后在每一个按钮处加上onclick="document.form.command.value="xx""然后我们接到数据后先检查command的值就会知道用户是按的那个按钮提交上来的。
- 有时候一个网页中有多个form，我们知道多个form是不能同时提交的，但有时这些form确实相互作用，我们就可以在form中添加隐藏域来使它们联系起来。
- javascript不支持全局变量，但有时我们必须用全局变量，我们就可以把值先存在隐藏域里，它的值就不会丢失了。
- 还有个例子，比如按一个按钮弹出四个小窗口，当点击其中的一个小窗口时其他三个自动关闭．可是IE不支持小窗口相互调用，所以只有在父窗口写个隐藏域，当小窗口看到那个隐藏域的值是close时就自己关掉

## 所有的表单元素都要放在`<form>`标签里面，这样才能确保数据信息可以提交

```html
<form action="url" method="get/post">
    <div class="username">
        <label for="username">姓名</label>
        <!-- 如果您在label 元素内点击文本，就会触发name与for相同的控件 -->
        <input type="text" name="username" placeholder="请输入用户名">
       <!-- placeholder提示用户输入内容，focus的时候消失，blur的时候显示 -->
    </div>
    <div class="password">
        <label for="password">密码</label>
        <input type="password" name="password" placeholder="请输入密码">
    </div>
    <div class="hobby">
        <label for="hobby">爱好</label>
        <input name="hobby" type="checkbox" checked> dance
        <input name="hobby" type="checkbox"> swim
        <!-- name相同的为同一组，checked表示默认选中 -->
    </div>
    <div class="sex">
        <label>性别</label>
        <input type="radio" name="sex" value="男" checked> 男
        <input type="radio" name="sex" value="女"> 女
        <!-- name相同的为同一组，checked表示默认选中 -->
    </div>
    <textarea rows="10" cols="20">
    <!-- 多行文本输入框，没有value -->
    </textarea >
    <div class=" city ">
        <select name="city ">
        <!-- 下拉选框 -->
            <option value="beijing">北京</option>
            <option value="shanghai" selected>上海</option>
            <!-- selected表示默认选中此项 -->
        </select>
    </div>
    <input type="file " name="myfile " accept="image/png">
    <!-- 文件上传 accept控制可以上传的文件格式 -->
  
    <input type="hidden" name="csrf" value="12345623fafdffdd">
  	<!-- hidden：不显示在页面上的控件，但它的值会被提交到服务器。 -->
  
    <input type="button" value="Button">
    <!-- 没有提交动作 -->

    <input type="submit" value="Submit">
    <!-- 点击会提交 -->

    <input type="reset" value="Reset">
    <!-- 重置所有输入 -->

   <div class="button">
       <button>提交</button>
   </div>
</form>
```
## GET和 POST方式的区别

HTTP定义了与服务器交互的不同方法，最基本的方法有4种，分别是GET，POST，PUT，DELETE。URL全称是资源描述符，我们可以这样认为：一个URL地址，它用于描述一个网络上的数据，而HTTP中的GET，POST，PUT，DELETE就对应着对这个数据的查，改，增，删4个操作。到这里，大家应该有个大概的了解了，GET一般用于获取/查询数据，而POST一般用于更新数据。

##### 原理不同

- GET用于信息获取，而且应该是安全的和幂等的

1. 这里的安全是说GET操作不会修改数据，只会查询数据，不会改变服务器资源状态。
2. 幂等意味着对同一URL的多个请求应该返回同样的结果。这里我再解释一下幂等这个概念：

> 　　幂等（idempotent、idempotence）是一个数学或计算机学概念，常见于抽象代数中。
> 　　幂等有以下几种定义：
> 　　对于单目运算，如果一个运算对于在范围内的所有的一个数多次进行该运算所得的结果和进行一次该运算所得的结果是一样的，那么我们就称该运算是幂等的。比如绝对值运算就是一个例子，在实数集中，有abs(a)=abs(abs(a))。
> 　　对于双目运算，则要求当参与运算的两个值是等值的情况下，如果满足运算结果与参与运算的两个值相等，则称该运算幂等，如求两个数的最大值的函数，有在在实数集中幂等，即max(x,x) = x。

- 运用在这里，**幂等就是不管你操作多少次，结果都一样，**比如你 get index，不过你 get 多少次，都是获取 index。但是 post 就不幂等，因为 post第一次是新建一个post，第二次是新建第二个。


- POST请求可能改变服务器上的资源

##### 表象不同

1. GET 请求的数据会拼接到action属性所指的URL地址之后，比如jirengu.com？username=tail&password=123456
   POST则是把提交的数据打包到HTTP包的包体中，也就是HTML HEADER内一起传送到action属性所指的URL地址。
2. GET与POST 提交的数据大小理论上没有限制，但是由于GET是通过URL提交数据，那么GET提交数据的大小就由URL决定了，理论上URL长度也没有限制，URL长度取决于浏览器对其的限制。POST数据起限制作用的是服务器的处理能力。

[参考资料：浅谈HTTP中Get与Post的区别](http://www.cnblogs.com/hyddd/archive/2009/03/31/1426026.html)

##### 其他

- GET后退按钮/刷新无害，POST数据会被重新提交（浏览器应该告知用- 户数据会被重新提交）。
- GET书签可收藏，POST为书签不可收藏。
- GET能被缓存，POST不能缓存 。
- GET历史参数保留在浏览器历史中。POST参数不会保存在浏览器历史中。
- GET编码类型application/x-www-form-url，POST编码类型application/x-www-form-urlencoded 或 multipart/form-data。为二进制数据使用多重编码。
- GET只允许 ASCII 字符。POST没有限制。也允许二进制数据