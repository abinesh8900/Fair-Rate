//list dependences
const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("node-sass"));
const prefix = require("gulp-autoprefixer");
const minify = require("gulp-clean-css");
const terser = require("gulp-terser");
const imagemin = require("gulp-imagemin");
const imagewebp = require("gulp-webp");
const browserSync = require("browser-sync").create();

//crearte functions

// scss
function compilescss() {
  return src("src/scss/*.scss")
    .pipe(sass())
    .pipe(prefix())
    .pipe(minify())
    .pipe(dest("dist/css"));
}

// creat watchtask
function jsmin() {
  return src("src/js/*.js").pipe(terser()).pipe(dest("dist/js"));
}

//compress images

function compressImg() {
  return src("src/images/*{jpg,png}")
    .pipe(imagemin())
    .pipe(dest("dist/images"));
}

//webp images
function webpImage() {
  return src("dist/images/*{jpg,png}")
    .pipe(imagewebp())
    .pipe(dest("dist/images"));
}

//browserSync
function browserSyncServer(cb) {
  browserSync.init({
    server: {
      baseDir: ".",
    },
  });
  cb();
}

function browserSyncRelode(cb) {
  browserSync.reload();
  cb();
}

//check  watchtask
function watchTask() {
  watch("*.html", browserSyncRelode);
  watch("src/scss/**/*.scss", series(compilescss, browserSyncRelode));
  watch("src/js/**/*.js", series(jsmin, browserSyncRelode));
  watch("src/js/**/*.jpg,png}", compressImg);
  watch("dist/images/*.{jpg,png}", webpImage);
}
// default gulp

exports.default = series(
  compilescss,
  jsmin,
  compressImg,
  webpImage,
  browserSyncServer,
  watchTask
);
