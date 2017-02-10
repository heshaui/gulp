/**
 * Created by heshuaishuai on 2016/12/5.
 */

var gulp = require('gulp');//加载gulp模块
var plugins = require('gulp-load-plugins')();//加载gulp-load-plugins插件，自动加载package.json中的插件，省去繁琐的定义
var runSequence = require('run-sequence');//加载run-sequence插件，按顺序执行

//清除上一次构建时生成的资源
gulp.task('clean',function () {
    return gulp.src(
        [
            'rev/**/*.json',
            'js/*-*.js'
        ]
    ).pipe( plugins.clean());


});

//压缩js并生成时间戳
gulp.task('uglifyJs',function () {
    return gulp.src('js/*.js')
        .pipe(plugins.uglify())  //压缩js
        .pipe(plugins.rev())     //生成MD5戳
        .pipe(gulp.dest('js'))
        .pipe(plugins.rev.manifest({merge:true}))  //生成rev的json文件
        .pipe(gulp.dest('rev/js'));
});

//压缩css并生成时间戳
gulp.task('uglifyJs',function () {
    return gulp.src('css/*.css')
        .pipe(plugins.minifyCss())  //压缩css
        .pipe(plugins.rev())        //生成MD5戳
        .pipe(gulp.dest('css'))
        .pipe(plugins.rev.manifest({merge:true}))   //生成rev的json文件
        .pipe(gulp.dest('rev/css'));
});

//将生成MD5戳的js、css文件引入html文件中
gulp.task('pagePath',function () {
    return gulp.src(['rev/**/*.json','*.html'])
        .pipe(plugins.revCollector())
        .pipe(gulp.dest(''))
});


//总接口
gulp.task('default',function () {
    runSequence( //让其按照指定的顺序执行
        'clean',
        ['uglifyJs','minifyCss'],
        'pagePath'
    );
});