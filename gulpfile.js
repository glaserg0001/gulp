'use strict';

var gulp			= require('gulp'),
browserSync		= require('browser-sync').create(),
gulpIf				= require('gulp-if'),
autoprefixer	= require('gulp-autoprefixer'),
sourcemaps		= require('gulp-sourcemaps'),
cleanCss			= require('gulp-clean-css'), // Минификация CSS-файлов
uglify				= require('gulp-uglify'), // Подключаем gulp-uglify (для сжатия JS)
rename				= require('gulp-rename'), // Подключаем библиотеку для переименования файлов
del						= require('del'), // Подключаем библиотеку для удаления файлов и папок
imagemin			= require('gulp-imagemin'), // Подключаем библиотеку для работы с изображениями
pngquant			= require('imagemin-pngquant'), // Подключаем библиотеку для работы с png
cache					= require('gulp-cache'), // Подключаем библиотеку кеширования
pug						= require('gulp-pug'), // Pug
stylus				= require('gulp-stylus'), // Stylus
plumber				= require('gulp-plumber'), // Обработка ошибок (error handling)
concat				= require('gulp-concat'); // Объединение файлов


var isDevelop: true;
var reload = browserSync.reload;

var paths = {
	pug: './app/pug/pages/*.pug',
	app: './app'
}



gulp.task('serve', function () {
	browserSync({
		server: {
			baseDir: path.app
		},
		notify: false
	});
});

gulp.task('html', function () {
	return gulp.src(paths.pug)
    .pipe(pug({pretty: true}))
    .pipe(gulp.dest(paths.app))
    // .pipe(browserSync.stream());
});

gulp.task('css', function () {
	return gulp.src(paths.app.common.css.src)
	.pipe(plumber())
	.pipe(concat('common.styl'))
	.pipe(stylus())
	.pipe(autoprefixer())
	.pipe(gulp.dest(paths.app.common.css.dest))
	.pipe(rename({suffix: '.min'}))
	.pipe(csso())
	.pipe(gulp.dest(paths.app.common.css.dest))
	// .pipe(browserSync.stream());
});