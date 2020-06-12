const { createFilter } = require('@rollup/pluginutils');
const MagicString = require('magic-string');

module.exports = function replaceBlocks(options = {}) {
  const filter = createFilter(options.include, options.exclude);
  const sourcemap = options.sourcemap === true;

  return {
    name: 'helloworld',

    transform(code, id) {
      if (!filter(id)) return;

      let codeStr = `${code}`;
      const magic = new MagicString(codeStr);
      codeStr = codeStr.replace(/\/\/replace-block:begin[\w\W]*\/\/replace-block:end/gi, function (match, offset) {
        const start = offset;
        const end = offset + match.length;
        magic.overwrite(start, end, '');
        return '';
      });

      const resultCode = magic.toString();
      let resultMap = false;
      if (sourcemap === true) {
        resultMap = magic.generateMap({
          hires: true,
        });
      }
      return {
        code: resultCode,
        map: resultMap,
      };
    },
  };
}
