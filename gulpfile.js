var gulp = require('gulp');
var electron = require('electron-connect').server.create();
var babelify = require('babelify');
var browserify = require('browserify');
var source = require('vinyl-source-stream')

var config = {
    srcDir: 'src',
    buildDir: 'build'
};

gulp.task('compile', function() {
    return browserify('./src/main.jsx', {debug:true})
        .transform(babelify)
        .bundle()
        .pipe(source('bundle.js'))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('start', ['compile'], function() {
    electron.start();
    gulp.watch(config.srcDir + '/**/*.{js,jsx}', ['compile']);
    gulp.watch(['index.js'], electron.restart);
    gulp.watch(['index.html', config.buildDir + '/**/*.{html,js,css}'], electron.reload);
});
