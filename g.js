const fs = require('fs');
const path = require('path');
const marked = require('marked');

const BASE_DIR = path.join(__dirname, './my-trouble');
const SOURCE = path.join(BASE_DIR, './source');
const DEST = path.join(BASE_DIR, './posts');

const p = {};
'readdir, readFile'.split(', ').forEach(item => {
  p[item] = function (pathname) {
    return new Promise((resolve, reject) => {
      fs[item](pathname, (err, data) => {
        if (err) {
          reject(err);
        }
        resolve(data);
      });
    });
  }
});
p.readdir(SOURCE).then(data => {
  handleDir(data);
});

function handleDir (files) {
  files.forEach(item => {
    const basename = path.parse(item).name;
    p.readFile(path.join(SOURCE, item)).then(data => {
      marked(data.toString(), (err, html) => {
        if (err) {
          return console.error(err, err.stack);
        }
        fs.writeFile(path.join(DEST, basename + '.html'), getHtml({ title: basename, content: html }));
      });
      // p.writeFile(path.join(DEST, basename + '.html', data.toString()))
    });
  });
}

// fs.readdir(SOURCE, function (err, files) {
//   if (err) return console.error(err, err.stack);
//   files.forEach(function (item) {
//     var basename = path.parse(item).name;
//     // fs.
//     // fs.writeFile(path.join(DEST, basename + '.html'))
//     // console.log(basename);
//   });
// });

// function readdir () {}

// console.log(path.join(SOURCE, './测试.md'));
// // console.log(fs.readFileSync(path.join(SOURCE, './测试.md')).toString());
// marked(fs.readFileSync(path.join(SOURCE, './测试.md')).toString(), function (err, data) {
//   if (err) {
//     console.log(err);
//     console.log(err.stack);
//   }
//   console.log(data);
//   // console.log(err, data);
// });

function getHtml (data) {
  console.log(data);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${data.title}</title>
</head>
<body>
  ${data.content}
</body>
</html>
  `
}

// console.log(Promise);
