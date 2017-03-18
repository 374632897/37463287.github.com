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
const getHtml = require('./template');

const BASE_DIR = join(__dirname, '../my-trouble');
const SOURCE   = join(BASE_DIR, './source');
const DEST     = join(BASE_DIR, './posts');
const HOST     = 'https://noteawesome.com/';

function logError (err) { if (err) console.error(err) }

function handleDir (files) {
  files.forEach(item => {
    const basename = parse(item).name;
    readFile(join(SOURCE, item), (err, data) => {
      if (err) return logError(err);
      marked(data.toString(), (err, html) => {
        if (err) return logError(err);
        writeFile(join(DEST, basename + '.html'), getHtml({ title: basename, content: html }), logError);
      });
    });
  });
}

handleDir(readdirSync(SOURCE));
