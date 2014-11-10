var gulp = require('gulp'),
	sass = require('gulp-ruby-sass'),
	prefix = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber');

gulp.task('styles', function () {
	gulp.src('./src/stylesheets/**/*.scss')
		.pipe(plumber())
		.pipe(sass({
			noCache: true,
			lineNumbers: true
		}))
		.pipe(prefix('last 2 version', 'ie 8'))
		.pipe(gulp.dest('./src/css'));
});

gulp.task('css-min', function () {
	gulp.src('./src/css/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('./dist/css'));
});

gulp.task('default', function () {
	gulp.watch('./src/stylesheets/**/*.scss', ['styles']);
});

gulp.task('build', function () {
	gulp.run('styles');
	gulp.run('css-min');
});