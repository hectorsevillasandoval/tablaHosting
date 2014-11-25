var gulp = require('gulp'),
 	stylus = require('gulp-stylus'),
 	nib = require('nib'),
 	watch = require('gulp-watch'),
 	uncss = require('gulp-uncss'),
 	connect = require('gulp-connect'),
 	htmlmin = require('gulp-html-minifier'),
    compressor = require('gulp-compressor');


//tareas
gulp.task('stylus', function () {
    'use strict';
gulp.src('Stylus/main.styl')
		.pipe(stylus({use: [nib()], compress:true}))
		.pipe(gulp.dest('../public/css'))
		.pipe(connect.reload());
	
});


gulp.task('imagemin', function() {
    // content
    return gulp.src('img/*')
    	.pipe(newer('../public/img/'))
    	.pipe(imagemin({progressive: true}))
    	.pipe(gulp.dest('../public/img/'))
    	.pipe(connect.reload());
});

gulp.task('minify', function() {
  gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('../public/'))
    .pipe(connect.reload());
});



//vigilando archivos
gulp.task('watch', function() {
    // content
    gulp.watch('stylus/*.styl', ['stylus']);
    gulp.watch('js/*.js', ['uglify','concat']);
    gulp.watch('img/*', ['imagemin']);
    gulp.watch('*.html', ['minify']);
    gulp.watch('../public/css/main.css', ['uncss']);
});
gulp.task('uncss', function() {
    // content
    gulp.src('../public/css/main.css')
        .pipe(uncss({html: ['index.html']}))
        /*.pipe(compressor())*/
        .pipe(gulp.dest('../public/uncss/'));
});

gulp.task('connect', function() {
    // content
    connect.server({
    	root: '../public/',
    	port: 8800,
        livereload: true
    });
});
gulp.task('default', ['connect','watch']);