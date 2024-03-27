> md-add生成项目结构

## 安装

```bash
npm install md-add

or

yarn add md-add
```

## 使用

```bash
md-add
```

## 说明

```bash
本地创建mdAddConfig.js文件，里面填写配置

fileName：输出的md文件名

separate：分隔符

defaultDescs：配置一些文件夹、文件名称的默认信息
	defaultDescs: {
		".vscode": "vscode配置目录",
		"public": "公共资源目录",
		"scripts": "脚本目录",
		"src": "项目文件目录",
		"types": "项目类型目录",
		"package.json": "项目配置文件",
		"README.md": "项目说明"
	}

ignoreConfig：配置需要忽略的文件夹、文件以及路径信息
	ignoreConfig: {
		"dir": [".git", "node_modules", "dist"],	// 忽略的目录
		"file": [],	// 忽略的文件
		"path": []	// 忽略的路径
	}

```

## 备注

```bash

文件里面有类似的备注，则会匹配@Description:后面的描述作为文件的默认信息

<!--
 * @Author: 作者
 * @Date: 时间
 * @Description: 我这里是描述
-->

or

<!--
 * @Description: 我这里是描述
-->

```
