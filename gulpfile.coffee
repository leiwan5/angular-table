gulp = require 'gulp'
gutil = require 'gulp-util'
concat = require 'gulp-concat'
coffee = require 'gulp-coffee'
jade = require 'gulp-jade'
connect = require 'gulp-connect'
less = require 'gulp-less'
sourcemaps = require 'gulp-sourcemaps'

gulp.task 'build:lib:less', ->
	gulp.src ['src/css/main.less']
		.pipe sourcemaps.init()
		.pipe less().on('error', gutil.log)
		.pipe concat('angular-table.css')
		.pipe sourcemaps.write()
		.pipe gulp.dest 'build/'

gulp.task 'build:lib:coffee', ->
	gulp.src ['src/js/main.coffee', 'src/js/**/*.coffee']
		.pipe sourcemaps.init()
		.pipe coffee().on('error', gutil.log)
		.pipe concat('angular-table.js')
		.pipe sourcemaps.write()
		.pipe gulp.dest 'build/'

gulp.task 'build:demos:coffee', ->
	gulp.src 'src/demos/**/*.coffee'
		.pipe sourcemaps.init()
		.pipe coffee().on('error', gutil.log)
		.pipe sourcemaps.write()
		.pipe gulp.dest 'build/demos'

gulp.task 'build:demos:jade', ->
	gulp.src 'src/demos/**/index.jade'
		.pipe jade(pretty: true).on('error', gutil.log)
		.pipe gulp.dest 'build/demos'

gulp.task 'build:demos:less', ->
	gulp.src 'src/demos/**/*.less'
		.pipe sourcemaps.init()
		.pipe less().on('error', gutil.log)
		.pipe sourcemaps.write()
		.pipe gulp.dest 'build/demos'

gulp.task 'copy:demos:lib', ->
	gulp.src 'src/demos/**/*.less'

gulp.task 'server', ->
	connect.server
		livereload: true
		port: 7890

gulp.task 'copy:demos:lib', ->
	gulp.src 'src/demos/lib/**/*'
		.pipe gulp.dest 'build/demos'

gulp.task 'livereload', ->
	gulp.src 'build/**/*'
		.pipe connect.reload()

gulp.task 'watch', ->
	gulp.watch ['src/js/main.coffee', 'src/js/**/*.coffee'], ['build:lib:coffee']
	gulp.watch ['src/css/main.less'], ['build:lib:less']
	gulp.watch ['src/demos/**/*.jade'], ['build:demos:jade']
	gulp.watch ['src/demos/**/*.less'], ['build:demos:less']
	gulp.watch ['src/demos/**/*.coffee'], ['build:demos:coffee']
	gulp.watch ['src/demos/lib/**/*'], ['copy:demos:lib']
	gulp.watch ['build/**/*'], ['livereload']

gulp.task 'default', ['copy:demos:lib', 'server', 'watch']

