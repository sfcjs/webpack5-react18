const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = (name) => require("path").join(__dirname, `../${name}`);

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";

  return {
    mode: "production",
    cache: true,
    performance: false,
    entry: rootPath("src/index.js"),
    output: {
      path: rootPath("build"),
      filename: isEnvProduction ? "static/js/[name].[contenthash:8].js" : "static/js/bundle.js",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: ["@babel/plugin-transform-runtime", "@babel/plugin-proposal-class-properties", "styled-jsx/babel"].filter(Boolean),
            },
          },
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: rootPath("public/index.html"),
        filename: "index.html",
        inject: "body",
        minify: {
          removeComments: true,
        },
      }),
    ].filter(Boolean),
    optimization: {
      minimize: isEnvProduction,
    },
  };
};
