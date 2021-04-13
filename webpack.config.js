const path = require("path");

module.exports = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "netjsongraph.js",
    libraryTarget: "umd",
    library: "NetJSONGraph",
    libraryExport: "default"
  },
  cache: {
    type: "filesystem",
    cacheDirectory: path.resolve(__dirname, ".webpack_cache")
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devServer: {
    contentBase: "./",
    historyApiFallback: true,
    inline: true,
    open: true,
    openPage: "./examples/netjsongraph.html"
  },
  module: {
    rules: [
      {
        test: /\.ts/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  }
};
