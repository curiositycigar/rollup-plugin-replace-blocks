# rollup-plugin-replace-blocks

# Usage
## Origin code
The code between the two comments will be removed
```
  //replace-block:begin
    var a = 1;
    console.log(a);
  //replace-block:end
```
## Gulp config
```
  import removeBlocks from 'rollup-plugin-replace-blocks';

  export default {
    input: 'src/index.js',
    output: {
      dir: 'output',
    },
    plugins: [
      removeBlocks(),
    ]
  };
```
# Options
none
