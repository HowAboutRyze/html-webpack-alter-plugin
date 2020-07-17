const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlWebpackAlterPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    const tags = this.getTags(this.options);
    console.log('[html-webpack-alter-plugin] start');
    // HtmlWebpackPlugin version 4.0.0-beta.5
    if (HtmlWebpackPlugin.getHooks) {
      compiler.hooks.compilation.tap('HtmlWebpackAlterPlugin', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'HtmlWebpackAlterPlugin', (htmlPluginData, callback) => {
            htmlPluginData.headTags.push(...tags);
            if (typeof callback === 'function') {
              callback(null, htmlPluginData)
            }
          }
        )
      });
    } else {
      // HtmlWebpackPlugin version 3.2.0
      compiler.plugin('compilation', compilation => {
        compilation.plugin('html-webpack-plugin-alter-asset-tags', (htmlPluginData, callback) => {
          htmlPluginData.headTags.push(...tags);
          if (typeof callback === 'function') {
            callback(null, htmlPluginData)
          }
        });
      });
    }
  }

  getTags(options) {
    return options.map(tag => {
      switch (tag.type) {
        case 'script': {
          return {
            tagName: 'script',
            attributes: {
              type: 'text/javascript',
            },
            innerHTML: tag.data,
          }
        }
        case 'style': {
          return {
            tagName: 'style',
            attributes: {
              type: 'text/css',
            },
            innerHTML: tag.data,
          }
        }
        default: {
          return {};
        }
      }
    })
  }
}

module.exports = HtmlWebpackAlterPlugin;