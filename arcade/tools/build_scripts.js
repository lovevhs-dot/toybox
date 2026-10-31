// Copy the Hiragana and Hangul cards (character and reading) for the arcade.
// Usage (from the repo root): node arcade/tools/build_scripts.js
// The apps keep their data inside index.html; this reads it from there so there is one source.
const fs = require('fs');
const vm = require('vm');
function grab(file, name) {
  const html = fs.readFileSync(file, 'utf8');
  const start = html.indexOf(`const ${name} = [`);
  const end = html.indexOf('\n    ];', start);
  if (start < 0 || end < 0) throw new Error(`${name} not found in ${file}`);
  return vm.runInNewContext(html.slice(start + `const ${name} = `.length, end + 6));
}
const hiragana = grab('hiragana/index.html', 'HIRAGANA_DATA').map(x => [x.kana, x.romaji]);
const hangul = grab('hangul/index.html', 'HANGUL_DATA').map(x => [x.char, x.romaji]);
fs.writeFileSync('arcade/data/scripts.js',
  '// Hiragana and Hangul cards for the arcade: [character, reading]. Built from hiragana/ and hangul/\n' +
  '// by arcade/tools/build_scripts.js; edit the apps, not this file.\n' +
  'window.ARCADE_SCRIPTS = ' + JSON.stringify({ hiragana, hangul }) + ';\n');
console.log('hiragana', hiragana.length, 'hangul', hangul.length);
