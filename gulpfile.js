var
  gulp = require('gulp'), //  ПодключилGulp
  concatCss = require('gulp-concat-css'), // Объединяет все css файлы
  cleanCSS = require('gulp-clean-css'), //Минификация файла
  uncss = require('gulp-uncss'), //Убираеь лишние файлы
  concat = require('gulp-concat'),
  tinypng = require('gulp-tinypng-compress'),
  autoprefixer = require('gulp-autoprefixer'),
  htmlmin = require('gulp-htmlmin'),
  uglyfly = require('gulp-uglyfly');


  gulp.task('htmlmin', function() {
    return gulp.src('app/*.html')
      .pipe(htmlmin({collapseWhitespace: true}))
      .pipe(gulp.dest('dist/'));
  });

// Объединяет все css файлы которые находятся в папке css,создаем папку out,в ней styles,а в нем файл bundle , а в нем все файлики уже объеденине
gulp.task('css', function() {
  return gulp.src('app/css/*.css')
  .pipe(autoprefixer(['last 20 versions', '> 1%', 'ie 8', 'ie 7']))
    .pipe(concatCss("bundle.min.css"))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    })) // 2й шаг-скчиваем gulp-clean-css, и вставляем

    .pipe(gulp.dest('dist/css'));
});

gulp.task('scripts', function() {
  return gulp.src('app/js/*.js')
    .pipe(concat('all.js'))
    .pipe(uglyfly())
    .pipe(gulp.dest('dist/js'));
});

gulp.task('scriptsvender', function() {
  return gulp.src('app/js/vendor/*.js')
    .pipe(concat('allvendor.js'))
    .pipe(uglyfly())
    .pipe(gulp.dest('dist/js/vendor/'));
});


gulp.task('img', function() {
  return gulp
    .src('app/img/**/*')
    .pipe(tinypng({
      key: '71Xi1KT3S-G5Ils19meQ5tAnKDGvp22f'
    }))
    .pipe(gulp.dest('dist/img'));
});

gulp.task('default', ['css', 'scripts', 'scriptsvender', 'htmlmin', 'img']);
