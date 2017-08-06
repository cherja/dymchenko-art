var gulp = require('gulp'),
  useref = require('gulp-useref'), //парсит специфичные блоки и конкатенирует описанные в них стили и скрипты
  gulpif = require('gulp-if'), //перехват потока
  uglify = require('gulp-uglify'), //минификация js
  minifyCss = require('gulp-clean-css'), //минификация css
  htmlmin = require('gulp-htmlmin'), //минификация html
  del = require('del'), //очистка папки
  tinypng = require('gulp-tinypng-compress'), //сжатие изображений
  ga = require('gulp-ga'), //гугл аналитика
  strip = require('gulp-strip-comments'), //удаление комментариев
  autoprefixer = require('gulp-autoprefixer'),
  favicons = require('gulp-favicons')

gulp.task('clear', function() {
  return del(['dist']);
});

gulp.task('html', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpif('*.*', strip()))
    .pipe(gulpif('*.html', htmlmin({
      collapseWhitespace: true
    })))
    .pipe(gulp.dest('dist'));
});

gulp.task('js', function() {
  return gulp.src('dist/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

gulp.task('css', function() {
  return gulp.src('dist/**/*.css')
    .pipe(autoprefixer(['last 20 versions', '> 1%', 'ie 8', 'ie 7']))
    .pipe(minifyCss())
    .pipe(gulp.dest('dist'));
});

gulp.task('images', function() {
  return gulp
    .src('app/img/**/*')
    .pipe(tinypng({
      key: '71Xi1KT3S-G5Ils19meQ5tAnKDGvp22f'
    }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('favicons', function() {
  return gulp.src("app/icon.svg")
    .pipe(favicons({
      appName: "Dymchenko Art",
      appDescription: "Photografer",
      developerName: "Cherja",
      developerURL: "http://cherja.ru/",
      path: "favicons/",
      url: "http://dymchenko-art.ru/",
      orientation: "portrait",
      html: "dist/index.html",
      lang: "ru_RU"
    }))
    .pipe(gulp.dest("dist/favicons"));
});

gulp.task('ga', function() {
  return gulp.src('dist/index.html')
    .pipe(ga({
      url: 'dymchenko-art.ru',
      uid: 'UA-102034595-1',
      minify: true
    }))
    .pipe(gulp.dest('dist'));
});

gulp.task('build', gulp.series('clear', 'html', 'js', 'css', 'images', 'favicons', 'ga'));
