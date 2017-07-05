var
  gulp = require('gulp'), //  ПодключилGulp
  concatCss = require('gulp-concat-css'), // Объединяет все css файлы
  cleanCSS = require('gulp-clean-css'), //Минификация файла
  rename = require("gulp-rename"),
  uncss = require('gulp-uncss');
// Объединяет все css файлы которые находятся в папке css,создаем папку out,в ней styles,а в нем файл bundle , а в нем все файлики уже объеденине
gulp.task('default', function() {
  return gulp.src('app/css/*.css')
    .pipe(concatCss("styles/bundle.css"))
    .pipe(cleanCSS({
      compatibility: 'ie8'
    })) // 2й шаг-скчиваем gulp-clean-css, и вставляем код


    .pipe(uncss({
      html: ['app/index.html']
    }))
    .pipe(rename("bundle.min.css")) // 3й шаг-переименовываем файл

    .pipe(gulp.dest('out/'));
});
