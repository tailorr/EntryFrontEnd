**题目1：** 如何全局安装一个 node 应用?

> npm i -g package-name  //全局安装
>
> npm i package-name	//局部安装

一般来说，每个模块都可以全局安装，也可以本地安装，全局安装是指将一个模块安装到系统目录中，任何位置都可以调用，全局安装一般适用于工具模块，比如gulp/webpack等，本地安装指的是安装到项目目录下，只有在项目目录下可以调用

题目2：** package.json 有什么作用？

一般来说，项目的根目录下，都会有一个package.json文件，定义了项目所需的各种依赖模块、项目的配置信息(比如名称、版本、许可证等元数据)。可以使用npm init 命令来生成此文件

[package.json详解](http://javascript.ruanyifeng.com/nodejs/packagejson.html)



**题目3：** `npm install --save app` 与 `npm install --save-dev app`有什么区别?

两者都会在项目下的node_modules下安装package。

 `npm install --save app`安装的是项目依赖。

 `npm install --save app`安装的是项目的开发依赖，整个项目的运行并不需要这些依赖，所以最后上线的文件不会包括这些依赖。



**题目4：** `node_modules`的查找路径是怎样的?

先从当前目录的node_modules 文件夹中查找,如果找到了就停止,否则就继续查找上层目录的node_modules文件夹,直至找到或者查到根路径为止。



**题目5：** npm3与 npm2相比有什么改进？yarn和 npm 相比有什么优势? (选做题目)

- npm3相较于npm2而言优化了依赖包的管理。解决了windows上npm包目录太深的问题。
- npm3的对npm2优化点在于对于以字母序安装npm包的时候，优先安装在node_modules第一层级目录。这样做的好处是如果后续包有相关依赖则不需要重复安装。

**yarn和 npm 相比有什么优势?**

1. Yarn 有一个锁定文件 (lock file) 记录了被确切安装上的模块的版本号。每次只要新增了一个模块，Yarn 就会创建（或更新）yarn.lock 这个文件。这么做就保证了，每一次拉取同一个项目依赖时，使用的都是一样的模块版本
2. Yarn在拉取包的时候，是采用了并行安装，所以相较于npm的列队安装的速度会快很多。

**题目6：** webpack是什么？和其他同类型工具比有什么优势？

> webpack是一款模块加载器兼资源打包工具，它能把各种资源，例如JS（含JSX）、coffee、样式（含less/sass）、图片等都作为模块来使用和处理。

**优势**

- 代码拆分

Webpack 有两种组织模块依赖的方式，同步和异步。异步依赖作为分割点，形成一个新的块。在优化了依赖树后，每一个异步区块都作为一个文件被打包。

- Loader

Webpack 本身只能处理原生的 JavaScript模块，但是 loader 转换器可以将各种类型的资源转换成 javascript模块。这样，任何资源都可以成为 Webpack 可以处理的模块。

- 智能解析

Webpack 有一个智能解析器，几乎可以处理任何第三方库，无论它们的模块形式是 CommonJS、 AMD 还是普通的 js文件。甚至在加载依赖的时候，允许使用动态表达式 `require("./templates/" + name + ".jade")`。

- 插件系统

Webpack 还有一个功能丰富的插件系统。大多数内容功能都是基于这个插件系统运行的，还可以开发和使用开源的 Webpack 插件，来满足各式各样的需求。

- 快速运行

Webpack 使用异步 I/O 和多级缓存提高运行效率，这使得 Webpack 能够以令人难以置信的速度快速增量编译。

[webpack](https://segmentfault.com/a/1190000006178770)

题目7：**npm script是什么？如何使用？

npm scripts容许你在package.json文件的scripts字段定义脚本命令

> {
>
> ​	"scripts":{
>
> ​		"build": "node build.js",	//执行npm run build 等价于node build.js
>
> ​		"start": "node start.js"		//执行npm run start等价于node start.js
>
> ​	}
>
> }



**题目8：** 使用 webpack 替换 入门-任务15中模块化使用的 requriejs

[代码链接](https://github.com/tailorr/DEMOS/tree/master/webpack/company%20-%20webpack)



**题目9：**gulp是什么？使用 gulp 实现图片压缩、CSS 压缩合并、JS 压缩合并

gulp是前端开发过程中对代码进行构建的工具，是自动化项目的构建利器；她不仅能对网站资源进行优化，而且在开发过程中很多重复的任务能够使用正确的工具自动完成；使用她，我们不仅可以很愉快的编写代码，而且大大提高我们的工作效率。

gulp是基于Nodejs的自动任务运行器， 她能自动化地完成 javascript/coffee/sass/less/html/image/css 等文件的的测试、检查、合并、压缩、格式化、浏览器自动刷新、部署文件生成，并监听文件在改动后重复指定的这些步骤。在实现上，她借鉴了Unix操作系统的管道（pipe）思想，前一级的输出，直接变成后一级的输入，使得在操作上非常简单。

[代码](https://github.com/tailorr/DEMOS/tree/master/gulp/company%20-%20gulp)

1.gulp安装

>npm install -g gulp

2.安装插件

> npm install --save-dev gulp			//本地安装gulp
>
> npm install --save-dev gulp-load-plugins	//安装模块化管理插件
>
> npm install --save-dev gulp-imagemin	//压缩图片
>
> npm install --save-dev gulp-minify-css	//压缩CSS
>
> npm install --save-dev gulp-ruby-sass	//SASS编译
>
> npm install --save-dev gulp-jslint		//JS代码检测
>
> npm install --save-dev gulp-uglify		//JS压缩
>
> npm install --save-dev gulp-concat		//文件合并
>
> npm install --save-dev gulp-rename		//文件重命名
>
> npm install --save-dev gulp-sprite		//sprite
>
> npm install --save-dev gulp-htmlmin	//html压缩
>
> npm install --save-dev gulp-clean		//清空文件夹
>
> npm install --save-dev gulp-browser-sync	//修改文件后浏览器自动刷新
>
> npm install --save-dev gulp-shell		//执行shell命令
>
> npm install --save-dev gulp-ssh		//远程操作机器
>
> npm install --save-dev gulp-sequence	//task顺序执行

也可以通过package.json安装



**题目10：** 开发一个 node 命令行天气应用用于查询用户当前所在城市的天气，发布到 npm 上去。可以通过如下方式安装使用(可使用api.jirengu.com里提供的查询天气接口) (选做题目)

[天气查询](https://github.com/tailorr/DEMOS/tree/master/npm_tools/weath)
