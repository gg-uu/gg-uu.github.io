# GG-Sec 安全技术博客

基于 **Hugo** 的纯静态网络安全技术博客，面向长期写作：漏洞分析、工具教程、渗透测试、应急响应。通过 GitHub Actions 部署到 GitHub Pages。

## 访问地址

https://gg-uu.github.io/

## 功能

- 纯静态页面，访问快
- 代码高亮（Chroma · dracula）+ 一键复制
- 文章目录、置顶、封面、阅读时长、相关文章
- 分类 / 标签 / **专题（series）** 三维内容管理
- 归档时间线 + 分类环形图 + 发布节奏图
- 全站搜索（Fuse.js，`Ctrl+K` / `/`）
- 友链、统计、关于页
- 深色 / 亮色主题

## 内容怎么管

| 维度 | 用途 | 路径 |
| --- | --- | --- |
| 分类 categories | 大主题：漏洞分析、工具教程、渗透测试、安全运维 | `/categories/` |
| 专题 series | 同一主题按顺序读完 | `/series/` |
| 标签 tags | 技术点检索 | `/tags/` |
| 归档 | 按时间浏览 | `/archives/` |

文章写在 `content/posts/`，新建：

```markdown
---
title: "文章标题"
date: 2026-10-08
lastmod: 2026-10-08
description: "列表与搜索简介"
categories: ["漏洞分析"]
tags: ["SQL注入", "防护"]
series: ["漏洞分析笔记"]
toc: true
weight: 0
cover: ""
---
```

`weight > 0` 置顶，数字越小越靠前。

## 本地预览

```bash
# 启动开发服务器
hugo server -D
```

## 部署

推送到 `main` 即自动构建：

```bash
git add .
git commit -m "更新文章"
git push origin main
```

仓库 Settings → Pages → Source 设为 **GitHub Actions**。
