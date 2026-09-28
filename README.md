# GG-Sec 安全技术博客

基于 **Hugo** 的纯静态网络安全技术博客，通过 GitHub Actions 自动构建并部署到 GitHub Pages。

## 访问地址

https://gg-uu.github.io/

## 功能特性

- 纯静态页面，访问速度快（零外部依赖，ECharts 等全部本地化/纯 CSS 实现）
- 赛博朋克二次元 Hero 背景 + 深色/亮色主题切换
- 原生代码高亮（Chroma · dracula）+ 一键复制按钮
- 文章目录（TOC）、置顶、封面图、最后修改时间
- 分类/标签系统 + 分类环形统计图 + 归档发布统计柱状图
- 全站全文搜索（Fuse.js，快捷键 `Ctrl+K` / `/`）
- 评论系统（Waline / Twikoo，可选配置）

## 如何写一篇新文章

在 `content/posts/` 下新建 Markdown 文件（或运行 `hugo new posts/文章名.md`），格式如下：

```markdown
---
title: "文章标题"
date: 2026-09-28
lastmod: 2026-09-28        # 可选，最后修改时间
description: "文章简介（用于列表与搜索）"
categories: ["漏洞分析"]    # 所属分类
tags: ["SQL注入", "防护"]   # 标签
toc: true                   # 显示右侧文章目录
weight: 1                   # 可选，>0 则置顶，数字越小越靠前
cover: "/img/hero-bg.jpg"   # 可选，封面图（列表卡片显示）
---

正文内容，支持 Markdown、代码块、图片、表格等。
```

## 评论系统（可选）

在 `hugo.toml` 中配置，二选一：

```toml
[params.comment]
  provider = 'waline'   # waline | twikoo，留空则不启用
[params.waline]
  serverURL = 'https://你的-waline-地址/'
# 或
[params.twikoo]
  envId = 'https://你的-twikoo-地址/'
```

单篇文章关闭评论：front matter 写 `comment: false`。

## 本地预览

```bash
hugo server -D
```

## 部署

推送到 `main` 分支即自动构建部署：

```bash
git add .
git commit -m "更新文章"
git push origin main
```

> 首次部署需在仓库 Settings → Pages 中将 Source 设为 **GitHub Actions**。
