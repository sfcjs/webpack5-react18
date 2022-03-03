const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const configFactory = require("./webpack.config");
const rootPath = (name) => require("path").join(__dirname, `../${name}`);

process.env.BABEL_ENV = "development";

const config = configFactory("development");

const serve = new WebpackDevServer(
  {
    static: {
      directory: rootPath("public"),
    },
    port: 9999,
    compress: true,
    open: true,
    hot: true,
  },
  webpack(config)
);

serve.start().then((err) => {
  console.log(!!err);
});
