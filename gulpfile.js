var gulp = require('gulp');
var electron = require('electron-connect').server.create();
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');

var config = {
    srcDir: 'src',
    buildDir: 'build'
};

gulp.task('compile', function() {
    return gulp.src(config.srcDir + "/**/*.{js,jsx}")
        .pipe(babel())
        .pipe(gulp.dest(config.buildDir));

});

gulp.task('start', ['compile'], function() {
    electron.start();
    gulp.watch(config.srcDir + '/**/*.{js,jsx}', ['compile']);
    gulp.watch(['index.js'], electron.restart);
    gulp.watch(['index.html', config.buildDir + '/**/*.{html,js,css}'], electron.reload);
});
