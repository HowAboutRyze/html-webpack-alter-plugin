const HtmlWebpackPlugin = require('html-webpack-plugin');

class HtmlWebpackAlterPlugin {
  constructor(options) {
    this.options = options;
    this.posMap = {
      'head': 'headTags',
      'body': 'bodyTags',
    };
  }

  apply(compiler) {
    const tags = this.getTags(this.options.content);
    const alterPosition = this.posMap[this.options.position];
    console.log('[html-webpack-alter-plugin] start');
    // HtmlWebpackPlugin version 4.0.0-beta.5
    if (HtmlWebpackPlugin.getHooks) {
      compiler.hooks.compilation.tap('HtmlWebpackAlterPlugin', (compilation) => {
        HtmlWebpackPlugin.getHooks(compilation).alterAssetTagGroups.tapAsync(
          'HtmlWebpackAlterPlugin', (htmlPluginData, callback) => {
            htmlPluginData[alterPosition].push(...tags);
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
          htmlPluginData[alterPosition].push(...tags);
          if (typeof callback === 'function') {
            callback(null, htmlPluginData)
          }
        });
      });
    }
  }

  getTags(content) {
    return content.map(tag => {
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