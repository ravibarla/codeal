import gulp from "gulp";
import cssnano from "gulp-cssnano";
import rev from "gulp-rev";
import dartSass from "sass";
import gulpSass from "gulp-sass";
const sass = gulpSass(dartSass);
gulp.task("css", function () {
  console.log("minifying css.....");
  gulp
    .src("./assets/sass/**/*.sass")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css"));

  return gulp
    .src("./assets/**/*.css")
    .pipe(rev())
    .pipe(gulp.dest("./public/assets"))
    .pipe(
      rev.manifest({
        cwd: "public",
        merge: true,
      })
    )
    .pipe(gulp.dest("./public/assets"));
});
