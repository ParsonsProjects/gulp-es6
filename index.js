import fs from 'fs';
import { uniq } from 'lodash';

let hooks = {};

const walkSync = (dir, filelist) => {
  const files = fs.readdirSync(dir);
  filelist = filelist || [];

  files.forEach((file) => {
    if (fs.statSync(dir + file).isDirectory()) {
      filelist = walkSync(dir + file + '/', filelist);
    } else {
      filelist.push(dir + file);
    }
  });

  return filelist;
};

const readFile = (file) => {
  const contents = fs.readFileSync(file, 'utf8');
  const hooks = contents.match(/\.hook-[^\(|;|{]+/g);
  return [].concat.apply([], hooks);
};

const findHooks = (file) => {
  const contents = fs.readFileSync(file, 'utf8');
  const hooks = contents.match(/\.hook-[^\(|;|{]+/g);
  return hooks;
};

const createSnippet = (hook) => {
  hooks[hook.replace('.', '').trim()] = {
    'prefix': '.hook-',
    'body': [
      `${hook.trim()}() {`,
      '\t$0',
      '}'
    ],
    'description': `Hook ${hook.trim()}`
  };
};

(() => {
  const files = walkSync('C:/Deskbox/V10/01.1 Core Mobile/src/', []);
  const array = files.filter(findHooks).map(readFile);
  uniq([].concat.apply([], array)).forEach(createSnippet);
  console.log(hooks);
})();

