var gulp = require('gulp'),
    useref = require('gulp-useref'), //парсит специфичные блоки и конкатенирует описанные в них стили и скрипты
    gulpif = require('gulp-if'), //перехват потока
    uglify = require('gulp-uglify'), //минификация js
    minifyCss = require('gulp-clean-css'), //минификация css
    htmlmin = require('gulp-htmlmin'), //минификация html
    del = require('del'), //очистка папки
    imagemin = require('gulp-imagemin'), //сжатие изображений
    ga = require('gulp-ga'), //гугл аналитика
    strip = require('gulp-strip-comments') //удаление комментариев

gulp.task('clear', function () {
	return del(['dist']);
});

gulp.task('html', function () {
    return gulp.src('app/*.php')
        .pipe(useref())
        .pipe(gulpif('*.*', strip()))
        .pipe(gulpif('*.css', minifyCss()))
        .pipe(gulpif('*.php', htmlmin({collapseWhitespace: true})))
        .pipe(gulp.dest('dist'));
});

gulp.task('js', function(){
  return gulp.src('dist/**/*.js')
  .pipe(uglify())
  .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp.src('app/img/*.*')
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('ga', function(){
  return gulp.src('dist/index.php')
  .pipe(ga({url: 'dymchenko-art.ru', uid: 'UA-102034595-1', minify: true}))
  .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('clear', 'html', 'js', 'images', 'ga'));
