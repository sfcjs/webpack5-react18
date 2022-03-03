const webpack = require("webpack");
const configFactory = require("./webpack.config");
const fs = require("fs-extra");
const paths = require("./paths");

process.env.NODE_ENV = "production";

const config = configFactory("production");
webpack(config).run((err, stats) => {
  if (!err) {
    fs.copySync(paths.appPublic, paths.appBuild, {
      dereference: true,
      filter: (file) => file !== paths.appHtml,
    });
    console.log(">>> 打包成功");
  } else {
    console.log(">>> 打包失败");
  }
});
