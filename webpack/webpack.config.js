const HtmlWebpackPlugin = require("html-webpack-plugin");
const rootPath = (name) => require("path").join(__dirname, `../${name}`);
const WebpackBar = require("webpackbar");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
const TerserPlugin = require("terser-webpack-plugin");

module.exports = (webpackEnv) => {
  const isEnvDevelopment = webpackEnv === "development";
  const isEnvProduction = webpackEnv === "production";
  return {
    mode: "production",
    cache: true,
    performance: false,
    entry: rootPath("src/index.js"),
    // externals: ["react", "react-dom"],
    output: {
      path: rootPath("build"),
      publicPath: isEnvProduction ? "." : "",
      filename: isEnvProduction ? "static/js/[name].[contenthash:8].js" : "static/js/bundle.js",
      chunkFilename: isEnvProduction ? "static/js/[name].[contenthash:8].chunk.js" : isEnvDevelopment && "static/js/[name].chunk.js",
    },
    infrastructureLogging: {
      level: "none",
    },
    stats: "errors-only",
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
      isEnvProduction && new CleanWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: rootPath("public/index.html"),
        filename: "index.html",
        inject: "body",
        minify: {
          removeComments: true,
        },
      }),
      new WebpackBar(),
      // isEnvProduction && new BundleAnalyzerPlugin(),
    ].filter(Boolean),
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          extractComments: false,
        }),
      ],
      splitChunks: isEnvProduction
        ? {
            cacheGroups: {
              node_modules: {
                test: /[\\/]node_modules[\\/]/,
                name: "node_modules",
                chunks: "initial",
                priority: -10,
              },
            },
          }
        : {},
    },
  };
};
