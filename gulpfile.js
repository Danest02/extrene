const gulp = require('gulp');
const sass = require('gulp-sass');
const postcss = require('gulp-postcss');
const cssnano = require('gulp-cssnano');
const autoprefixer = require('autoprefixer');
const pug = require('gulp-pug');
const rename = require("gulp-rename");
// const squoosh = require('gulp-libsquoosh');
const babel = require('gulp-babel');
const terser  =  require ( 'gulp-terser' ) ;
const concat = require('gulp-concat');


// TODO--- PUG 

const minified = false;
gulp.task("pugPages", () => {
    return (
        gulp
            .src("./src/pug/*.pug")
            .pipe(
                pug({
                    pretty: minified ? false : true,
                })
            )
            .pipe(rename({
                extname: ".php"
            }))
            .pipe(gulp.dest("./public"))
    );
});



// TODO--- CSS OMNIBUS

gulp.task("cssOmnibus", () => {
    var procesadores = [autoprefixer, cssnano];
    return gulp
        .src("./src/scss/scss omnibus/styles.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(procesadores))
        .pipe(purgecss({
            content: ["./public/*.html"],
            css: ["./public/styles.css"],
            safelist: [
            ],
            FontFace: true,
            variables: false,
        })
        )
        .pipe(gulp.dest("./public/"));
});

gulp.task("cssPages", () => {
    var procesadores = [autoprefixer, cssnano];
    return gulp
        .src("./src/scss/scss pages/*.scss")
        .pipe(sass().on("error", sass.logError))
        .pipe(postcss(procesadores))
        .pipe(purgecss({
            content: ["./public/*.html"],
            css: ["./public/styles.css"],
            safelist: [
            ],
            FontFace: true,
            variables: false,
        })
        )
        .pipe(gulp.dest("./public/"));
});

// TODO--- COMPILAR JS CON BABEL

gulp.task("babel", () => {
    return gulp
        .src("./src/js/*.js")
        .pipe(concat("scripts-min.js"))
        .pipe(
            babel({
                presets: ["@babel/env"],
            })
        )
        .pipe(terser())
        .pipe(gulp.dest("./public"));
});




// TODO--- MINIFICAR IMAGENES DEFAULT

gulp.task("imagemin", () => {
    return gulp
        .src("src/galery/images/default/*")
        .pipe(squoosh({
            encodeOptions: {
                //   oxipng: {},
                webp: {},
                //   avif: {},
                //   mozjpg: {},
            },
            preprocessOptions: {
                quant: {
                    habilitado: true,
                    numColors: 128,
                },
                resize: {
                    enabled: false,
                    width: 400,
                    // width: Math.round(src.width / 2),
                    // height: Math.round(src.height / 2),
                },
            },
        })
        )
        .pipe(gulp.dest("public/galery/images/default/"));
});


// TODO--- MINIFICAR IMAGENES 720

gulp.task("imagemin720", () => {
    return gulp
        .src("src/galery/images/720/*")
        .pipe(squoosh({
            encodeOptions: {
                webp: {},
            },
            preprocessOptions: {
                quant: {
                    habilitado: true,
                    numColors: 128,
                },
                resize: {
                    enabled: true,
                    width: 400,
                },
            },
        })
        )
        .pipe(gulp.dest("public/galery/images/720/"));
});





gulp.task("default", () => {
    gulp.watch("./src/pug/*.pug", gulp.series("pugPages"));
    gulp.watch("./src/scss/scss omnibus/**/*.scss", gulp.series("cssOmnibus"));
    gulp.watch("./src/scss/scss pages/*.scss", gulp.series("cssPages"));
    gulp.watch("./src/js/*.js", gulp.series("babel"));
});

