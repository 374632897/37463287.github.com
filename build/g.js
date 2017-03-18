const {
  join,
  parse
} = require('path');

const {
  readdirSync,
  readFile,
  writeFile,
} = require('fs');

const marked  = require('marked');
const { getPostTemplate, getTrouble } = require('./template');

const BASE_DIR = join(__dirname, '../my-trouble');
const SOURCE   = join(BASE_DIR, './source');
const DEST     = join(BASE_DIR, './posts');
const INDEX    = join(BASE_DIR, './index.html');
const HOST     = 'https://noteawesome.com/my-trouble/';

function logError (err) { if (err) console.error(err) }

function handleDir (files) {
  const basenames = [];
  files.forEach(item => {
    const basename = parse(item).name;
    basenames.push(basename);
    readFile(join(SOURCE, item), (err, data) => {
      if (err) return logError(err);
      marked(data.toString(), (err, html) => {
        if (err) return logError(err);
        writeFile(join(DEST, basename + '.html'), getPostTemplate({ title: basename, content: html }), logError);
      });
    });
  });
  generateIndexs(basenames);
}

function getIndexes (ary) {
  return ary.map(item => {
    return `<li alt = '${item}' title = '${item}''><a href = "${HOST + item}.html" >${item}</a></li>`;
  }).join('\r\n\t');
}
function generateIndexs (ary) {
  const indexes = getIndexes(ary);
  const html = getTrouble(indexes);
  writeFile(INDEX, html, logError);
}

handleDir(readdirSync(SOURCE));
