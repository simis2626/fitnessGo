var gm = require('gm');
var fs = require('fs');


gm('src/assets/FTlogo.png')
  .resize(48, 48)
  .noProfile()
  .write('src/assets/logo/logo48.png', function (err) {
    if (!err) console.log('done');
    console.log(err);
  });
gm('src/assets/FTlogo.png')
  .resize(64, 64)
  .noProfile()
  .write('src/assets/logo/logo64.png', function (err) {
    if (!err) console.log('done');
    console.log(err);
  });
gm('src/assets/FTlogo.png')
  .resize(96, 96)
  .noProfile()
  .write('src/assets/logo/logo96.png', function (err) {
    if (!err) console.log('done');
    console.log(err);
  });
gm('src/assets/FTlogo.png')
  .resize(128, 128)
  .noProfile()
  .write('src/assets/logo/logo128.png', function (err) {
    if (!err) console.log('done');
    console.log(err);
  });
gm('src/assets/FTlogo.png')
  .resize(240, 240)
  .noProfile()
  .write('src/assets/logo/logo240.png', function (err) {
    if (!err) console.log('done');
    console.log(err);
  });
gm('src/assets/FTlogo.png')
  .resize(512, 512)
  .noProfile()
  .write('src/assets/logo/logo512.png', function (err) {
    if (!err) console.log('done');
    console.log(err);
  });
gm('src/assets/FTlogo.png')
  .resize(1024, 1024)
  .noProfile()
  .write('src/assets/logo/logo1024.png', function (err) {
    if (!err) console.log('done');
    console.log(err);
  });
gm('src/assets/FTlogo.png')
  .resize(768, 768)
  .noProfile()
  .write('src/assets/logo/logo768.png', function (err) {
    if (!err) console.log('done');
    console.log(err);
  });
gm('src/assets/FTlogo.png')
  .resize(24, 24)
  .noProfile()
  .write('src/assets/logo/logo24.png', function (err) {
    if (!err) console.log('done');
    console.log(err);
  });

