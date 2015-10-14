var gulp = require('gulp');
var electron = require('electron-connect').server.create();
var source = require('vinyl-source-stream');
var babel = require('gulp-babel');

var config = {
    srcDir: 'src',
    buildDir: 'build',
    sources: ["src/**/*.{js,jsx}", "!src/**/flycheck_*.{js,jsx}"]
};

gulp.task('compile', function() {
    return gulp.src(config.sources)
        .pipe(babel())
        .pipe(gulp.dest(config.buildDir));
});

gulp.task('start', ['compile'], function() {
    electron.start();
    gulp.watch(config.sources, ['compile']);
    gulp.watch(['main.js'], electron.restart);
    gulp.watch(['index.html', config.buildDir + '/**/*.{html,js,css}', 'style.css'], electron.reload);
});
