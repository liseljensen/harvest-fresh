/*global -$ */
'use strict';
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var rename = require('gulp-rename');
var uglify = require('gulp-uglify');
var csso = require('gulp-csso');
var argv = require('yargs').argv;
var gulpif = require('gulp-if');
var inquirer = require('inquirer');
var minifyHTML = require('gulp-minify-html');
var browserSync = require('browser-sync');
var fileinclude = require('gulp-file-include');
var del = require('del');
var reload = browserSync.reload;
var runSequence = require('run-sequence');
var requireDir = require('require-dir');
//var dir = requireDir('gulp-task');

// variables
var production = !!(argv.production);  
var dev = !!(argv.dev);  
var move = !!(argv.move); 
var app = 'app';
var dist = 'dist';
var src = {
  scss : [app+'/style.scss'],
  vendorStyle:[app+'/vendor.scss'],  
  scripts:{
  modernizr:'bower_components/modernizr/modernizr.js',
  vendor:[
  'bower_components/webfontloader/webfontloader.js',
  'bower_components/jquery/dist/jquery.js',
  'bower_components/magnific-popup/dist/jquery.magnific-popup.min.js',
  'bower_components/parsleyjs/dist/parsley.min.js',
  'bower_components/bootstrap-sass-official/assets/javascripts/bootstrap.min.js',
  'bower_components/f9b827d96219ee93cae4/paralax-background.js',
  'bower_components/owl.carousel/dist/owl.carousel.min.js',
  'bower_components/waypoints/lib/jquery.waypoints.js',
  'bower_components/isotope/dist/isotope.pkgd.min.js',
  'bower_components/Tweetie/tweetie.min.js'  
  ],
  main:app+'/scripts/main.js'
  }
};

// Style
gulp.task('styles', function () {
  return gulp.src(src.scss)    
    .pipe(gulpif(dev,$.sourcemaps.init()))
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],
      
    }))
     .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe(gulpif(dev,$.sourcemaps.write()))
    .pipe(gulpif(dev,gulp.dest(app+'/')))
    .pipe(reload({stream: true}))   
    .pipe(gulpif(production,gulp.dest(dist+'/'))) 
    .pipe(gulpif(production,csso()))    
    .pipe(gulpif(production,rename('style.min.css')))
    .pipe(gulpif(production,gulp.dest(dist+'/'))); 
});

// Vendor Style
gulp.task('vendorStyles', function () {
 gulp.src(src.vendorStyle)    
    .pipe(gulpif(dev,$.sourcemaps.init()))
    .pipe($.sass({
      outputStyle: 'nested', // libsass doesn't support expanded yet
      precision: 10,
      includePaths: ['.'],

     
    }))
    .on('error',console.log.bind(console, 'Sass error:')) //Error handling and 
    .pipe($.postcss([
      require('autoprefixer-core')({browsers: ['last 2 version']})
    ]))
    .pipe(gulpif(dev,$.sourcemaps.write()))
    .pipe(gulpif(dev,gulp.dest(app+'/')))
    .pipe(gulpif(production,gulp.dest(dist+'/')))
    .pipe(reload({stream: true}))   
    .pipe(gulpif(production,csso()))    
    .pipe(gulpif(production,rename('vendor.min.css')))
    .pipe(gulpif(production,gulp.dest(dist+'/'))); 
});

gulp.task('images', function () {
  gulp.src(app+'/images/**/*')
    .pipe($.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{cleanupIDs: false}]
    })))
    .pipe(gulp.dest(dist+'/images'));
});

// Lint JS
gulp.task('lint', function() {
  return gulp.src(app+'/scripts/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Main Js
gulp.task('mainScripts', function(){
  return gulp.src(src.scripts.main)
    .pipe(concat('main.js'))    
    .pipe(gulpif(dev,gulp.dest(app+'/js/')))
    .pipe(gulpif(production,gulp.dest(dist+'/js/')))
    .pipe(rename('main.min.js'))
    .pipe(uglify())
    .pipe(gulpif(dev,gulp.dest(app+'/js/')))
    .pipe(gulpif(production,gulp.dest(dist+'/js/')));
});

// Vendor js
gulp.task('vendorScripts', function(){
  return gulp.src(src.scripts.vendor)
    .pipe(concat('vendor.js'))    
    .pipe(gulpif(dev,gulp.dest(app+'/js/vendor/')))
    .pipe(gulpif(production,gulp.dest(dist+'/js/vendor/')))
    .pipe(rename('vendor.min.js'))
    .pipe(uglify())
    .pipe(gulpif(dev,gulp.dest(app+'/js/vendor/')))
    .pipe(gulpif(production,gulp.dest(dist+'/js/vendor/')));
});


// modernizr
gulp.task('modernizr', function(){
  return gulp.src(src.scripts.modernizr)   
    .pipe(uglify())
    .pipe(gulpif(dev,gulp.dest(app+'/js/vendor/')))
    .pipe(gulpif(production,gulp.dest(dist+'/js/vendor/')));
});



// HTML and  others Copy
gulp.task('htmlCopy',function(){
  var opts = {
    conditionals: true,
    spare:true,
    empty :true
  };
 return gulp.src([app+'/*.html'])
 .pipe(fileinclude({
      prefix: '@@'
    }))
 .pipe(gulpif(production,minifyHTML(opts))) 
 .pipe(gulp.dest(dist));
});

gulp.task('extras', function () {
  return gulp.src([
    app+'/*.*',
    '!'+app+'/*.html',
    '!'+app+'/*.scss'
  ], {
    dot: true
  }).pipe(gulp.dest(dist));
});

gulp.task('phpScripts', function () {
  return gulp.src([    
    app+'/php/**/*.php'
  ], {
    dot: true
  }).pipe(gulp.dest(dist+'/php'));
});

gulp.task('bower_fonts',function(){
  return gulp.src(['bower_components/fontawesome/fonts/*.*',
    'bower_components/bootstrap-sass-official/assets/fonts/bootstrap/*.*',
    'app/iconic/fonts/*.*'])
  .pipe(gulpif(dev,gulp.dest(app+'/fonts/'))) 
  .pipe(gulpif(production,gulp.dest(dist+'/fonts/')))  
});
gulp.task('dist_fonts',function(){
  return gulp.src(app+'/fonts/*.*')
  .pipe(gulp.dest(dist+'/fonts/')) 
});


// gulp serve
gulp.task('serve', ['styles','vendorStyles','modernizr','vendorScripts','mainScripts', 'bower_fonts'], function () {
  browserSync({
    notify: false,
    port: 9000,
     server: {
      baseDir: [app],      
      routes: {
        '/bower_components': 'bower_components'
      },
    }
  });

  // watch for changes
  gulp.watch([
    app+'/*.html',
    app+'*.html',
    app+'/scripts/**/*.js',
    app+'/images/**/*',
    app+'/**/*.css',
  ]).on('change', reload);
  gulp.watch(app+'/**/*.scss', ['styles','vendorStyles']);
  //gulp.watch(app+'/scripts/**/*.js', ['mainScripts','lint']);
  gulp.watch(app+'/js/**/*.js', ['mainScripts']);
});
// Live Serve Added After build
gulp.task('serve:dist', function () {
  browserSync({
    notify: false,
    port: 9000,
     server: {
      baseDir: [dist+'/'],
    } 
  });

});

// Gulp Clean
gulp.task('clean', function(){
  del([
    dist+'/',
    app+'/js',
    app+'/style.css',
    app+'/vendor.css',
    'main/','dist/',
    'main.zip'
    ])
});


gulp.task('build',['modernizr','vendorScripts','mainScripts','styles','vendorStyles','images','extras','htmlCopy','bower_fonts', 'phpScripts'],function(){
  return gulp.src(dist+'/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('default',['clean'],function(){
console.log('App Clean complete');
console.log('Check readme.md');
});



