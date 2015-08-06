var gulp    = require('gulp');
var webpack = require('gulp-webpack');
var cordova = require('gulp-cordova');

var config  = {
  entry: './src/main.js',
  output: {
    filename: 'main.js'
  },
  resolve: {
    root: '/src/'
  },
  module: {
    loaders: [{
      test:     /\.js$/,
      exclude:  /node_modules/,
      loader:  'babel-loader'
    }]
  }
};

var mvcPluginUrl = 'http://gitbucket.tok.access-company.com:8080/git/hiroki.kumamoto/cordova-plugin-mvc.git';

gulp.task('cordova:prepare', function() {
  gulp.src('.').pipe(
    cordova([
      ['platforms', 'add', 'android', 'ios'],
      ['plugin', 'add', 'cordova-plugin-crosswalk-webview',
                        mvcPluginUrl]
    ], { verbose: true}));
});

gulp.task('cordova:build', function() {
  gulp.src('.').pipe(
    cordova([
      ['build', 'ios', 'android'],
    ], { verbose: true}));
});

gulp.task('cordova:run_android', function() {
  gulp.src('.').pipe(
    cordova([
      ['run', 'android'],
    ], { verbose: true}));
});

gulp.task('cordova:run_ios', function() {
  gulp.src('.').pipe(
    cordova([
      ['run', 'ios'],
    ], { verbose: true}));
});

gulp.task('webpack', function () {
    return gulp.src(config.entry)
        .pipe(webpack(config))
        .pipe(gulp.dest("./www/js"));
});

