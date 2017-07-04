var
  gulp = require('gulp'), //  Gulp
  sass = require('gulp-sass'), //  Компилирует SASS
  browserSync = require('browser-sync'), //  Для hot-reload
  concat = require('gulp-concat'), //  Объединяет файлы
  uglify = require('gulp-uglifyjs'), //  Минифицирует js
  csso = require('gulp-csso'), //  Минифицирует css
  del = require('del'), //  Удаляет файлы
  tinypng = require('gulp-tinypng-compress'), //  Минифицирует изображения (нужна регистрация на сайте)
  autoprefixer = require('gulp-autoprefixer'), //  Подставляет префиксы для css
  uncss = require('gulp-uncss'), //  Отсеивает неиспользуемые стили
  rev = require('gulp-rev-append-all'), //  Версионирование файлов
  htmlmin = require('gulp-html-minifier'); //  Минифицирует HTML

//  Запуск локального сервера с hot-reload
gulp.task('browser-sync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    },
    notify: false
  });
});

//  Объединяем все saas-файлы в css/main.css
gulp.task('main_css', function() {
  return gulp
    .src('app/sass/*.sass')
    .pipe(sass())
    .pipe(autoprefixer(['last 20 versions', '> 1%', 'ie 8', 'ie 7']))
    .pipe(concat('main.css'))
    .pipe(gulp.dest('app/css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//  Объединяем стили плагинов в css/vendor.css
gulp.task('vendor_css', function() {
  return gulp
    .src('app/libs/**/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('app/css/'));
});

//  Транспилируем и минифицируем main.js
gulp.task('main_js', function() {
  return gulp
    .src('app/js/main.js')
    .pipe(uglify())
    .pipe(gulp.dest('app/js/'));
});

//  Минифицируем и объединяем скрипты плагинов в js/vendor.js
gulp.task('vendor_js', function() {
  return gulp
    .src('app/libs/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(uglify())
    .pipe(gulp.dest('app/js'));
});

//  Очистка папки продакшена
gulp.task('clean', function() {
  return del.sync('dist');
});

//  Минификация, отсеивание и перенос стилей
gulp.task('css-prod', ['main_css', 'vendor_css'], function() {
  return gulp
    .src('app/css/*.css')
    .pipe(uncss({
      html: ['app/**/*.html']
    }))
    .pipe(csso())
    .pipe(gulp.dest('dist/css'));
});

//  Переносим скрипты
gulp.task('js-prod', ['main_js', 'vendor_js'], function() {
  return gulp
    .src('app/js/**/*')
    .pipe(gulp.dest('dist/js'));
});

//  Переносим шрифты
gulp.task('fonts', function() {
  return gulp
    .src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'));
});

//  Минифицируем, версионируем подключаемые файлы и переносим html
gulp.task('html', function() {
  return gulp
    .src('app/*.html')
    .pipe(rev())
    .pipe(htmlmin({
      collapseWhitespace: true
    }))
    .pipe(gulp.dest('dist'));
});

//  Минификация и перенос картинок
gulp.task('img', function() {
  return gulp
    .src('app/img/**/*')
    .pipe(tinypng({
      key: '71Xi1KT3S-G5Ils19meQ5tAnKDGvp22f'
    })) // Токен, выданный после регистрации на tinypng
    .pipe(gulp.dest('dist/img'));
});

//  Дефолтный таск, слежение за файлами
gulp.task('default', ['browser-sync', 'main_css', 'vendor_css', 'vendor_js'], function() {
  gulp.watch('app/sass/**/*.sass', ['main_css']);
  gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
});

//  Сборка в продакшен
gulp.task('build', ['clean', 'css-prod', 'js-prod', 'fonts', 'html', 'img']);

//  Сборка в прдакшен, если картинки не менялись с прошлого раза
gulp.task('build-noimg', ['css-prod', 'js-prod', 'fonts', 'html']);
