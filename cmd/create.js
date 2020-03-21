const { existsSync: exists, mkdirSync: mkdir, writeFileSync: writeFile } = require('fs');
const { relative, resolve } = require('path');

const USAGE = `
Usage:
  npm run create CATEGORY MY_PACKAGE
`.trim();

// Parse Args
const [, , category, ...names] = process.argv;
const name = names
	// join names with a dash
	.join('-')
	// trim leading non-letter characters and trailing spacing
	.replace(/^[^A-z]+|\s+$/g, '')
	// replace non-word characters with dashes
	.replace(/[\W]+/g, '-')
	// reduce non-word characters to single dashes
	.replace(/-{2,}/g, '-')
	// replace camel-casing with kebab-casing
	.replace(/[a-z][A-Z]/g, $0 => $0[0] + '-' + $0[1].toLowerCase())
	// replace remaining upper-casing with lower-casing
	.toLowerCase();
const fnName = name.replace(/-[a-z]/g, $0 => $0[1].toUpperCase());

// get current date
const date = new Date(Date.now()).toLocaleDateString('en-US', {
	weekday: 'narrow',
	year: 'numeric',
	month: 'long',
	day: 'numeric'
}).slice(3);

// Handle invalid arguments
if (process.argv.length < 4) {
	console.log(`${USAGE}\n`);

	process.exit(0);
}

const pathToCategoryDir = resolve('packages', category);

if (!exists(pathToCategoryDir)) {
	mkdir(pathToCategoryDir);
}

const pathToDestDir = resolve('packages', category, name);

if (exists(pathToDestDir)) {
	console.error(`Error: A directory already exists at "${relative('.', pathToDestDir)}".\n`);

	process.exit(1);
}

const pathToDestSrcDir = resolve('packages', category, name, 'src');
mkdir(pathToDestDir);
mkdir(pathToDestSrcDir);

const pathToDestTs = resolve(pathToDestSrcDir, 'index.ts');
const pathToDestTestTs = resolve(pathToDestSrcDir, 'index.test.ts');
const pathToDestPackage = resolve(pathToDestDir, 'package.json');
const pathToDestReadme = resolve(pathToDestDir, 'README.md');
const pathToDestChangelog = resolve(pathToDestDir, 'CHANGELOG.md');

const getTs = ({ fnName }) => `function ${fnName} () {}

export default ${fnName};
`;

const getTestTs = ({ fnName, name, }) => `import ${fnName} from '.';

describe('${name}', () => {
	test('exists', () => {
		expect(${fnName}).toBe(${fnName});
	});
});
`;

const getPackage = ({ category, name }) => `{
  "name": "@jsxtools/${name}",
  "version": "1.0.0",
  "description": "DESCRIPTION",
  "author": "Jonathan Neal <jonathantneal@hotmail.com>",
  "license": "CC0-1.0",
  "repository": "jsxtools/frontend",
  "homepage": "https://github.com/jsxtools/frontend/tree/master/packages/${category}/${name}#readme",
  "bugs": "https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:${name}",
  "main": "index.js",
  "module": "index.mjs",
  "typings": "index.d.ts",
  "files": [
    "index.d.ts",
    "index.js",
    "index.mjs"
  ],
  "publishConfig": {
    "access": "public"
  }
}
`;
const getReadme = ({ name }) => `# ${name} [<img src="https://avatars.githubusercontent.com/u/52989093" alt="" width="90" height="90" align="right">][frontend]

[<img alt="npm version" src="https://img.shields.io/npm/v/@jsxtools/${name}.svg" height="20">](https://www.npmjs.com/package/@jsxtools/${name})
[<img alt="build status" src="https://img.shields.io/travis/jsxtools/frontend/master.svg" height="20">](https://travis-ci.org/github/jsxtools/frontend)
[<img alt="issue tracker" src="https://img.shields.io/github/issues/jsxtools/frontend/${name}.svg" height="20">](https://github.com/jsxtools/frontend/issues?q=is:issue+is:open+label:${name})
[<img alt="pull requests" src="https://img.shields.io/github/issues-pr/jsxtools/frontend/${name}.svg" height="20">](https://github.com/jsxtools/frontend/pulls?q=is:pr+is:open+label:${name})

**${name}** DESCRIPTION

## Installation

\`\`\`sh
npm install @jsxtools/${name}
\`\`\`

## Usage

\`\`\`js
import ${fnName} from '@jsxtools/${name}';

${fnName}();
\`\`\`

[frontend]: https://github.com/jsxtools/frontend
`;

const getChangelog = ({ date, name }) => `# Changes to ${name}

### 1.0.0 (${date})

- Initial version
`;

writeFile(pathToDestTs, getTs({ fnName, name }));
writeFile(pathToDestTestTs, getTestTs({ fnName, name }));
writeFile(pathToDestPackage, getPackage({ category, fnName, name }));
writeFile(pathToDestReadme, getReadme({ fnName, name }));
writeFile(pathToDestChangelog, getChangelog({ date, name }));

console.log(`"${name}" has been written to "${relative('.', pathToDestDir)}".\n`);
