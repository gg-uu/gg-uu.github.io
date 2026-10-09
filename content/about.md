---
title: "关于"
description: "GG-Sec 博客作者与内容规划"
toc: false
layout: "about"
---

你好，我是 **gg-uu**，网络安全 / 信息安全从业者。

这个博客用来系统化沉淀技术笔记与开源工具，面向长期写作。当前公开内容以已发布项目为主：**SnowEyes（雪瞳）** 网页敏感信息检测，以及 **vuln-checklist** 渗透报告漏洞清单生成。

## 内容结构

| 分类 | 覆盖范围 |
| --- | --- |
| 漏洞分析 | 成因、检测、利用边界与编码层防护 |
| 工具教程 | Nmap、nuclei、审计工具等实操手册 |
| 渗透测试 | 授权范围内的流程、报告与方法论 |
| 安全运维 | 日志审计、溯源、应急响应 |

专题（series）把同一主题的文章串成可连续阅读的路径，分类和标签负责横向检索。

## 写作原则

- **面向实战**：步骤、命令、检查项可以直接落地。
- **合规为先**：攻防内容以防御视角与授权测试为前提。
- **可检索**：每篇文章带分类、标签、摘要，支持全站搜索。
- **持续更新**：作为个人知识库长期维护。

## 如何写一篇新文章

在 `content/posts/` 下新建 Markdown，或运行 `hugo new posts/文章名.md`。

```markdown
---
title: "文章标题"
date: 2026-10-08
lastmod: 2026-10-08
description: "列表与搜索用的简介"
categories: ["漏洞分析"]
tags: ["SQL注入", "防护"]
series: ["漏洞分析笔记"]
toc: true
weight: 0
cover: ""
---
```

推送到 `main` 后，GitHub Actions 会构建并发布到 GitHub Pages。

## 联系

- GitHub：https://github.com/gg-uu
- 仓库：https://github.com/gg-uu/gg-uu.github.io
- RSS：`/index.xml`
