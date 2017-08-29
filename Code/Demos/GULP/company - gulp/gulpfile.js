var gulp = require('gulp')

//插件引入
var plugins = require('gulp-load-plugins')() //模块管理插件
    // var minifycss = require('gulp-minify-css'), // CSS压缩
    //     uglify = require('gulp-uglify'), // js压缩
    //     concat = require('gulp-concat'), // 合并文件
    //     rename = require('gulp-rename'), // 重命名
    //     clean = require('gulp-clean'), //清空文件夹
    //     minhtml = require('gulp-htmlmin'), //html压缩
    //     jslint = require('gulp-jslint'), //js代码规范性检查
    //     imagemin = require('gulp-imagemin') //图片压缩


gulp.task('html', function() {
    console.log(plugins)

    gulp.src('./src/*.html')
        .pipe(plugins.htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest('dist'))
})
gulp.task('css', function() {
    gulp.src('./src/css/*.css')
        .pipe(plugins.minifyCss())
        .pipe(plugins.concat('all.js'))
        .pipe(plugins.rename('main.css'))
        .pipe(gulp.dest('dist/style'))
})

gulp.task('clean', function() {
    gulp.src('dist')
        .pipe(plugins.clean())
})

gulp.task('image', function() {
    gulp.src('./src/images/*')
        .pipe(plugins.imagemin())
        .pipe(gulp.dest('./dist/img'))
})

gulp.task('js', function() {
    gulp.src('./src/js/*.js')
        .pipe(plugins.jslint())
        .pipe(plugins.concat('all.js'))
        .pipe(plugins.uglify())
        .pipe(plugins.rename('main.js'))
        .pipe(gulp.dest('./dist/script'))

})

gulp.task('default', ['html', 'css', 'js', 'image'])