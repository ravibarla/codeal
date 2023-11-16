import gulp from "gulp";
// import {GulpClient} from gulp
// import s1 from "sass"
import sass from "gulp-sass";
import cssnano from "gulp-cssnano";
import rev from "gulp-rev";
gulp.task("css", function () {
  console.log("minifying css.....");
  gulp.src("./assets/sass/**/*.sass")
    .pipe(sass())
    .pipe(cssnano())
    .pipe(gulp.dest("./assets.css"));

  return gulp.src("./assets/**/*.css")
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
