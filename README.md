# html-webpack-alter-plugin

A plugin can alter the template when using html-webpack-plugin.

## Installation

```bash
 npm i --save-dev html-webpack-alter-plugin
```

## Usage

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackAlterPlugin = require('html-webpack-alter-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new HtmlWebpackAlterPlugin([
      {
        type: 'script',
        data: 'window.__MY_GLOBAL__={ name: "xiao ming", age: 18 };',
      },
      {
        type: 'style',
        data: '.red-text { color: red; }',
      }
    ]),
  ],
};
```

`npm run build` and you will get the html file like this:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <title>React App</title>
    <script type="text/javascript">window.__MY_GLOBAL__={name:"xiao ming",age:18}</script><style>.red-text{color:red}</style>
  </head>
  </head>
  <body>
  </body>
</html>
```
