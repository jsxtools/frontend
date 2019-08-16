const gzipSize = require('gzip-size');
const fs = require('fs');

const indexJs = fs.readFileSync('index.js', 'utf8');
const readmeMd = fs.readFileSync('README.md', 'utf8');
const indexJsSize = gzipSize.sync(indexJs);

const readmeMdUpdated = readmeMd.replace(/<strong size>[\W\w]*<\/strong>/g, `<strong size>${indexJsSize} bytes</strong>`);

fs.writeFileSync('README.md', readmeMdUpdated);
