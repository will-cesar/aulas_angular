const gulp = require('gulp');
const exec = require('child_process').exec;


gulp.task('default', ['ionic-compile-and-sign-key']);

gulp.task('ionic-compile-and-sign-key', function (cb) {
  compileIonic()
    .then(() => {
      return copy()
    })
    .then(() => {
      return callJarsigner()
    })
    .then(() => {
      return callZipalign()
    })
    .catch((err)=>{
      console.log(err)
    })
});

function compileIonic() {
  return new Promise((resolve, reject) => {
    console.log("Compilação iniciada");
    exec('ionic --no-interactive cordova build android --prod --release', function (err, stdout, stderr) {
      console.log(stdout)
      if (err != null) {
        return reject('');
      } else {
        console.log("Compilação finalizada!")
        return resolve()
      }
    })
  })
}

function copy() {
  return new Promise((resolve, reject) => {
    console.log("Copiando arquivos...")
    gulp.src('./platforms/android/app/build/outputs/apk/release/app-release-unsigned.apk')
      .pipe(gulp.dest('./'), resolve());
  });
};

function callJarsigner(element) {
  return new Promise((resolve, reject) => {
    console.log("Chamando Jarsigner...");
    exec('jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore app-release-unsigned.apk alias_name -storepass 123456', function (err, stdout, stderr) {
      if (err != null) {
        reject('JARSIGNER');
      } else {
        console.log("Jarsigner finalizado!")
        resolve()
      }
    })
  })
}


function callZipalign(element) {
  return new Promise((resolve, reject) => {
    console.log("Chamando zipalign...");
    exec('zipalign -v 4 app-release-unsigned.apk Racarejo.apk', function (err, stdout, stderr) {
      if (err != null) {
        reject('zipalign');
      } else {
        console.log("Zipalign finalizado!")
        resolve()
      }
    })
  })
}