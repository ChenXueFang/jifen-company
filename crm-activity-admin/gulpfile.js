//gulp 正式站 生成 zip文件，
var fs = require("fs");
var chalk = require("chalk");

function getPackageJsonVersion() {
  // 这里我们直接解析 json 文件而不是使用 require，这是因为 require 会缓存多次调用，这会导致版本号不会被更新掉
  return JSON.parse(fs.readFileSync("./package.json", "utf8")).version;
}

var gulp = require("gulp");
var zip = require("gulp-zip");
var filename = new Date().toLocaleString().replace(/:/g, "");
console.log(
  chalk.yellow("  Tip: zipName.\n" + " " + filename + getPackageJsonVersion())
);

//创建一个文件到V.txt 到 dist 目录
fs.writeFile("./dist/ver.txt", "版本号:" + getPackageJsonVersion(), function(
  err
) {
  if (err) return console.error(err);
  console.log("写入文件成功");
});

gulp.task("zip", async function() {
  await gulp
    .src(["dist/**", "README.md"])
    .pipe(zip(`Philips_production_${filename}_v${getPackageJsonVersion()}.zip`))
    .pipe(gulp.dest("dist1"));
});
