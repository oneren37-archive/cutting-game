const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    open: true,
    host: "localhost",
  },
  mode: "development",
  plugins: [
    new HtmlWebpackPlugin({
      template: "./static/index.html",
    }),
  ],
  module: {
    // rules: [
    //   {
    //     test: /\.(js|jsx)$/i,
    //     loader: "babel-loader",
    //   },
    //   {
    //     test: /\.css$/i,
    //     use: [stylesHandler, "css-loader"],
    //   },
    //   {
    //     test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
    //     type: "asset",
    //   },
    // ],
  },
};

module.exports = () => config;