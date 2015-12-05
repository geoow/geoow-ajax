import gulp from 'gulp';
import babel from 'gulp-babel';
import uglify from 'gulp-uglify';
import concat from 'gulp-concat';
import rename from 'gulp-rename';

import scriptPaths from '../paths/scripts.json';

gulp.task('scripts', scriptsTask);

function scriptsTask ()
{
    return gulp.src(scriptPaths.js)
        .pipe(babel())
        .pipe(concat(scriptPaths.destinations.js))
        .pipe(gulp.dest('.'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('.'));
}