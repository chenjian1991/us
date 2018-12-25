//引入gulp包
var gulp = require('gulp');

var connect = require('gulp-connect');
var proxy = require('http-proxy-middleware');
var uglify=require('gulp-uglify');

//引入gulp-load-plugins之后，使用其他模块方法，只需要在其方法前加上“$.
//$ = require('gulp-load-plugins')();

//使用connect启动一个Web服务器
gulp.task('connect', function (done) {
    connect.server({
        root: './',
		livereload: true,
		open:true,
        port: 8080,
        // host:'192.168.1.42',
        middleware: function (connect, opt) {
            return [
                proxy('/api', {
     target: 'http://www.test_uat.55.exchange:5555/',
     // target: 'https://www.55.com',
     changeOrigin: true,
     // pathRewrite: {
     //  '^/api': ''
     // }
                }),
                proxy('/broker', {
     target: 'http://www.test_uat.55.exchange:5555/',
     // target: 'https://www.55.com',
     changeOrigin: true,
     // pathRewrite: {
     //  '^/broker': ''
     // }
                }),
                proxy('/quote', {
     target: 'http://www.test_uat.55.exchange:5555/',
     // target: 'https://www.55.com',
     changeOrigin: true,
     // pathRewrite: {
     //  '^/quote': ''
     // }
                }),
            ]
        }
    });
    done();
});
//压缩js
gulp.task('jsmin',function(done){
    gulp.src('static/web/js/page/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('static/web/js/page/'));
    gulp.src('static/web/js/page_new/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('static/web/js/page_new/'));
    gulp.src('static/web/js/lib/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('static/web/js/lib/'));
    done()
});

//默认任务
// gulp.task('default',gulp.series('connect'));//按顺序执行
gulp.task('default',gulp.series('connect'));//按顺序执行