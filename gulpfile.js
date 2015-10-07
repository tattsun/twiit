var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var electron = require('electron-connect').server.create();
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');

var config = {
    srcDir: 'src',
    buildDir: 'build'
};

gulp.task('compile', function() {
    return gulp.src(config.srcDir + '/**/*.{js,jsx}')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('all.js'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('start', ['compile'], function() {
    electron.start();
    gulp.watch(config.srcDir + '/**/*.{js,jsx}', ['compile']);
    gulp.watch(['index.js'], electron.restart);
    gulp.watch(['index.html', config.buildDir + '/**/*.{html,js,css}'], electron.reload);
});
