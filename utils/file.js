const fsp = require('node:fs/promises');
const path = require('node:path');

function readDir(dir) {
  return fsp.readdir(dir).then(async files => {
console.log(files);
    const result = {
      directories: [],
      files: []
    };

    await Promise.all(files.map(file => {
      return fsp.stat(path.join(dir, file)).then(stat => {
        // return {
        //   name: file,
        //   isDirectory: stat.isDirectory(),
        //   isFile: stat.isFile()
        // };
        stat.isDirectory() ? result.directories.push(file) : result.files.push(file);
      });
    }));

    return result;
  })

}

module.exports = {
  readDir
}