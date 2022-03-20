const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const configFactory = require("./webpack.config");
const rootPath = (name) => require("path").join(__dirname, `../${name}`);
const chalk = require("react-dev-utils/chalk");

process.env.BABEL_ENV = "development";

const config = configFactory("development");

const serve = new WebpackDevServer(
  {
    static: {
      directory: rootPath("public"),
    },
    port: 9999,
    compress: true,
    open: false,
    hot: true,
    proxy: {
      "/api": {
        target: "http://47.101.165.153/",
      },
    },
    client: {
      reconnect: true,
    },
  },
  webpack(config)
);
const localIPv4 = WebpackDevServer.internalIPSync("v4");
const localIPv6 = WebpackDevServer.internalIPSync("v6");

serve.start().then((err, info) => {
  if (!err) {
    console.log(chalk.green("Compiled successfully.\n"));
    console.log(chalk.green(`Local: http://localhost:${serve.options.port}`));
    console.log(chalk.green(`On Your Network: http://${localIPv4}:${serve.options.port}`));
  }
});
