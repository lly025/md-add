#! /usr/bin/env node
console.info('start')

const fs = require('fs');
const path = require('path');

// 获取内容
let markdownContent = "## 项目目录结构\n\n"
// 指定一些文件夹或者文件默认的描述
let defaultConfig = {}

/** 获取默认配置 */
function getDefaultConfig () {
  // 获取配置信息
  try {
    // 获取当前目录下的 mdAddConfig.js 配置文件
    const configFilePath = path.join(process.cwd(), 'mdAddConfig.js');
    const defaultConfigFile = fs.readFileSync(configFilePath, "utf8")
    defaultConfig = JSON.parse(defaultConfigFile)
  } catch (error) {
    console.log("读取默认配置文件出错", error);
  }
}

// 添加 @Description 后面的内容到文件名后面
function appendDescriptionToFilename(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const match = content.match(/@Description:\s*([^>]+)-->\n/);
  if (match && match[1]) {
    return match[1].trim();
  }
}

/** 处理文件夹 */
function handleDir (dirPath, filePath, dir, index) {
  // 获取要忽略的文件夹列表
  const ignoreDirs = defaultConfig.ignoreConfig.dir
  // 获取要忽略的路径列表
  const ignorePaths = defaultConfig.ignoreConfig.path
  if (ignoreDirs.includes(dir) || ignorePaths.includes(dirPath.replace(/\\/g, '/')) || ignorePaths.includes(filePath.replace(/\\/g, '/'))) return;
  const defaultDesc = defaultConfig.defaultDescs[dir]
  markdownContent += `${' '.repeat(index * 2)}${defaultConfig.separate}-- ${dir + (defaultDesc ? "（" + defaultDesc + "）" : "")}\n`;
  generateMarkdown(filePath, index + 1); // 递归处理子目录，并增加缩进
}

/** 处理文件 */
function handleFile (dirPath, filePath, file, index) {
  // 获取要忽略的文件列表
  const ignoreFiles = defaultConfig.ignoreConfig.file
  // 获取要忽略的路径列表
  const ignorePaths = defaultConfig.ignoreConfig.path
  if (ignoreFiles.includes(file) || ignorePaths.includes(dirPath.replace(/\\/g, '/')) || ignorePaths.includes(filePath.replace(/\\/g, '/'))) return;
  const defaultDesc = defaultConfig.defaultDescs[file]
  const fileDesc = appendDescriptionToFilename(filePath);
  markdownContent += `${' '.repeat(index * 2)}${defaultConfig.separate}-- ${file + (defaultDesc ? "（" + defaultDesc + "）" : "") + (fileDesc ? "（" + fileDesc + "）" : "")}\n`;
}

/** 生成Markdown */
function generateMarkdown(dirPath, index = 0) {
  const files = fs.readdirSync(dirPath);
  // 遍历文件夹
  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    const stats = fs.statSync(filePath);
    if (stats.isDirectory()) {
      handleDir(dirPath, filePath, file, index)
    }
    if (stats.isFile()) {
      handleFile(dirPath, filePath, file, index)
    }
  });
}

/** 执行 */
function start () {
  getDefaultConfig()
  generateMarkdown('./')
  // 写入文件
  fs.writeFileSync(`${defaultConfig.fileName || 'PROJECTDIRSTRUCTURE'}.md`, markdownContent);
}

start()

console.info('end')