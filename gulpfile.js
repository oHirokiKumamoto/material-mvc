var gulp    = require('gulp');
var webpack = require('gulp-webpack');
var less    = require('gulp-less');
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

gulp.task('build', function () {
    return gulp.src(config.entry)
        .pipe(webpack(config))
        .pipe(gulp.dest("./www/js"));
});

gulp.task('less', function() {
  return gulp.src("./less/*.less")
    .pipe(less())
    .pipe(gulp.dest('./www/css'));
});
