'use strict';

var gulp = require('gulp'),
	stylus = require('gulp-stylus'),
	browserify = require('browserify'),
	source = require('vinyl-source-stream'),
	uglify = require('gulp-uglify'),
	gulpif = require('gulp-if'),
	buffer = require('vinyl-buffer');

var config = {
	npmSrc: './node_modules',
	stylusSrc: './src/stylus',
	cssDir: './public/stylesheets',
	jsSrc: './src/javascripts',
	jsDir: './public/javascripts',
	env: process.env.NODE_ENV || 'development'
};

gulp.task('styles', function() {
	var isProd = config.env === 'production';

	return gulp.src(config.stylusSrc + '/style.styl')
		.pipe(stylus({
			compress: (isProd) ? true : false
		}))
		.pipe(gulp.dest(config.cssDir));
});

gulp.task('scripts', function() {
	return browserify(config.jsSrc + '/script.js')
		.bundle()
		.pipe(source('bundle.js'))
		.pipe(buffer())
		.pipe(gulpif(config.env === 'production', uglify()))
		.pipe(gulp.dest(config.jsDir));
});


gulp.task('watch-resources', function() {
	var watchFiles = [
		config.stylusSrc + '/**/*.styl',
		config.jsSrc + '/**/*.js'
	];
	gulp.watch(watchFiles, ['build']); 
});

gulp.task('build', ['scripts', 'styles']);
  gulp.task('default', ['build']);
gulp.task('watch', ['default', 'watch-resources']);
