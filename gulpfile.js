var gulp 	   = require('gulp'),
	jshint     = require('gulp-jshint'),
	uglify     = require('gulp-uglify'),
	rename     = require('gulp-rename'),
	concat     = require('gulp-concat'),
	notify     = require('gulp-notify'),
	livereload = require('gulp-livereload'),
	babel      = require('gulp-babel'),
	del        = require('del');

gulp.task('scripts', function() {
  return gulp.src('src/**/*.js')
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest('dist'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('clean', function() {
    return del(['dist']);
});

gulp.task('default', ['clean'], function() {
    gulp.start('scripts');
});

gulp.task('watch', function() {

	// Watch .js files
	gulp.watch('src/**/*.js', ['scripts']);

	// Create LiveReload server
	livereload.listen();

	// Watch any files in dist/, reload on change
	gulp.watch(['dist/**']).on('change', livereload.changed);
});