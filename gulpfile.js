var gulp = require('gulp'),
	sass = require('gulp-sass'),
	concat = require('gulp-concat'),
	jshint = require('gulp-jshint'),
	autoprefixer = require('gulp-autoprefixer'),
	browserSync = require('browser-sync'),
	reload = browserSync.reload;

	//Styles Task
	gulp.task('styles',function(){
		return gulp.src('styles/*scss')
			.pipe(sass().on('error',sass.logError))
			.pipe(concat('style.css'))
			.pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
			.pipe(gulp.dest('styles/'))
			.pipe(reload({stream: true}));
	});	

	//Watch Task
	gulp.task('watch', function(){
		gulp.watch('styles/*scss', ['styles']);
		gulp.watch('scripts/*.js', ['js']);
		gulp.watch("*.html", reload);
	});

	//Jshint Task
	gulp.task('jshint',function(){
		return gulp.src('js/*js')
			.pipe(jshint())
			.pipe(jshint.reporter('jshint-stylish'))
			.pipe(reload({stream: true}));
	});

	//Browser Task
	gulp.task('browser-sync',function(){
		browserSync({
			server: { baseDir: "./"}
		});
	});

	gulp.task('default', ['browser-sync','styles', 'jshint', 'watch']);