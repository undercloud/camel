var gulp = require('gulp'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	uglify = require('gulp-uglify');

gulp.task('styles', function () {
	gulp.src('src/css/*.scss')
		.pipe(plumber())
		.pipe(sass())
		.pipe(prefix('last 2 version', 'ie 8'))
		.pipe(gulp.dest('src/css/'));
});

gulp.task('css-min', function () {
	gulp.src('src/css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('js-min', function(){
	gulp.src('src/js/*.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest('dist/js'))
});

gulp.task('default', function () {
	gulp.watch('src/scss/*.scss', ['styles']);
	gulp.watch('src/js/*.js', ['js-min']);
});

gulp.task('build', function () {
	gulp.run('styles');
	gulp.run('css-min');
	gulp.run('js-min');
});
