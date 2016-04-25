// var gulp = require('gulp');
//
// gulp.task('default', function() {
//   // place code for your default task here
// });

var gulp = require('gulp');
var sass = require('gulp-sass');

var config = {
    bootstrapDir: './app/bower_components/bootstrap-sass',
    publicDir: './app/static',
};

gulp.task('css', function() {
    return gulp.src('./app/css/app.scss')
    .pipe(sass({
        includePaths: [config.bootstrapDir + '/assets/stylesheets'],
    }))
    .pipe(gulp.dest(config.publicDir + '/css'));
});
