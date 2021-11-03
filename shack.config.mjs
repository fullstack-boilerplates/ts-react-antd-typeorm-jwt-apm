import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import { CleanWebpackPlugin } from 'clean-webpack-plugin'
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

export default {
  entry: ['./src/web/index.tsx'],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      }, {
        test: /\.(png|jpe?g|gif|ttf|woff2?|eot|svg)$/i,
        use: [
          {
            loader: 'file-loader',
          },
        ],
      },
      {
        test: /\.(m|c)?(t|j)sx?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
            plugins: [
              "@babel/plugin-transform-runtime",
              [
                "auto-import", {
                  "declarations": [
                    { "default": "React", "path": "react" }
                  ]
                }
              ],
            ]
          }
        }
      }, {
        test: /[\/|\\]apis[\/|\\].*\.((m|c)?jsx?|tsx?)$/,
        use: {
          loader: '@shack-js/loader-fetch',
          options: {
            apiPrefix: '/apis',
            backendFolder: 'src/apis',
            sourceType: 'module'
          }
        }
      }
    ]
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".mjs", ".cjs"]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: join(dirname(fileURLToPath(import.meta.url)), 'src', 'web', 'index.html'),
    }),
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
  ],
  output: {
    path: join(dirname(fileURLToPath(import.meta.url)), 'dist', '.web'),
    filename: '[name].[contenthash].js',
    publicPath: '/',
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
  }
}