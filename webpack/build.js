const webpack = require("webpack");
const configFactory = require("./webpack.config");

process.env.NODE_ENV = "production";

const config = configFactory("production");
webpack(config).run((err, stats) => {
  if (!err) {
    return console.log(">>> 打包成功");
  }
  console.log("🚀 ~ file: build.js ~ line 9 ~ webpack ~ err, stats", err, stats);
});
