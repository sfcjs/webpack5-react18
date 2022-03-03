const webpack = require("webpack");
const configFactory = require("./webpack.config");

process.env.NODE_ENV = "production";

const config = configFactory("production");
webpack(config).run((err, stats) => {
  if (!err) {
    console.log(">>> 打包成功");
  } else {
    console.log(">>> 打包失败");
  }
});
