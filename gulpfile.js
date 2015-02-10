var gulp = require('gulp'),
	sequence = require('run-sequence'),
	clean = require('gulp-clean'),
	sass = require('gulp-sass'),
	prefix = require('gulp-autoprefixer'),
	cssmin = require('gulp-cssmin'),
	rename = require('gulp-rename'),
	plumber = require('gulp-plumber'),
	concat = require('gulp-concat'),
 	uglify = require('gulp-uglify');
 	beauty = require('gulp-cssbeautify');

var folders = {
	clean: ['dist/js/*.js','dist/css/*.css','src/css/*.css'],
	src: {
		sass: 'src/scss',
		css: 'src/css',
		js:  'src/js'
	},
	dist: {
		css: 'dist/css',
		js: 'dist/js'
	}
}

gulp.task('clean',function(){
	return gulp.src(folders.clean).pipe(clean())
})

gulp.task('sass', function () {
	return gulp.src(folders.src.sass + '/*.scss')
		.pipe(plumber())
		.pipe(
			sass({
				errLogToConsole: true
			})
		)
		.pipe(prefix({
			browsers: ['> 5%','last 10 versions','ie 8', 'ie 9']
		}))
		.pipe(beauty({
			indent: '	',
			openbrace: 'end-of-line',
            autosemicolon: true
		}))
		.pipe(gulp.dest(folders.src.css))
})

gulp.task('sass-dev', function () {
	return gulp.src(folders.src.sass + '/camel.scss')
		.pipe(plumber())
		.pipe(
			sass({
				errLogToConsole: true
			})
		)
		.pipe(prefix({
			browsers: ['> 5%','last 10 versions','ie 8', 'ie 9']
		}))
		.pipe(beauty({
			indent: '	',
			openbrace: 'end-of-line',
            autosemicolon: true
		}))
		.pipe(gulp.dest(folders.src.css))
})

gulp.task('css-min', function () {
	return gulp.src(folders.src.css + '/*.css')
		.pipe(cssmin())
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest(folders.dist.css))
})

gulp.task('js-min', function(){
	return gulp.src(folders.src.js + '/*.js')
	.pipe(uglify())
	.pipe(rename({suffix: '.min'}))
	.pipe(gulp.dest(folders.dist.js))
})

gulp.task('js-concat',function(){
	return gulp.src([
		'dist/js/camel.core.min.js',
		'dist/js/!(camel.core).min.js'
	])
	.pipe(concat('camel.min.js'))
	.pipe(gulp.dest(folders.dist.js))
})

gulp.task('default', function () {
	gulp.watch(folders.src.sass + '/*.scss', ['sass'])
	gulp.watch(folders.src.js + '/*.js', ['js-min'])
})

gulp.task('build', function () {
	sequence(
		'clean',
		'sass',
		'css-min',
		'js-min',
		'js-concat'
	)
})

gulp.task('release', function () {
	sequence(
		'clean',
		'sass-dev',
		'css-min',
		'js-min',
		'js-concat'
	);
});
