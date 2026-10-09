---
title: "雪瞳 SnowEyes：网页敏感信息检测工具"
date: 2026-06-17
lastmod: 2026-06-17
description: "洞悉无形，守护无界。介绍我开源的 SnowEyes：Chrome 扩展 + AI Skill 双形态网页敏感信息检测工具，覆盖 19 类泄漏与指纹识别。"
categories: ["工具教程"]
tags: ["SnowEyes", "敏感信息", "Chrome扩展", "信息收集", "安全工具"]
series: ["安全工具箱"]
toc: true
weight: 1
cover: "/img/covers/snoweyes.svg"
repo: "https://github.com/gg-uu/SnowEyes"
---

**雪瞳 (SnowEyes)** 是我开源的网页敏感信息检测工具，口号是「洞悉无形，守护无界」。它提供两种形态：**Chrome 浏览器扩展** 和 **AI Skill**（OpenCode / Claude Code）。

仓库：https://github.com/gg-uu/SnowEyes

## 为什么做这个工具

授权测试里，敏感信息泄漏几乎每场都会碰到：硬编码 Token、云密钥、身份证号、接口路径、隐藏 JS chunk。人工翻源码效率低，规则又容易误报。SnowEyes 把扫描做成「打开页面就能看」的扩展，同时给 AI 助手一份可复用的 Skill。

## 两种形态

| 特性 | Chrome 扩展 | AI Skill |
| --- | --- | --- |
| 运行环境 | Chromium / Firefox | OpenCode / Claude Code |
| 扫描方式 | DOM + JS 动态渲染 + 深度递归 | webfetch + 正则 |
| 指纹识别 | Header / Cookie / 页面特征 | 页面内容特征 |
| 动态扫描 | MutationObserver | 不支持 |
| 深度 JS | 最大 10 并发，目录树猜解 | 可选递归，最大 5 并发 |
| Webpack | chunk 代码还原 URL | 不支持 |

## Chrome 扩展安装

1. 使用仓库 `extension/` 目录，或下载 [Release](https://github.com/SickleSec/SnowEyes/releases)
2. 打开 `chrome://extensions/`，启用开发者模式
3. 加载已解压的扩展，选择 `extension/`

## 检测能力

19 类敏感信息：

- **路径发现**：域名、API（绝对/相对）、模块路径、JS / Vue / 图片 / 文档
- **凭据泄漏**：用户名密码、Cookie / Token、12 种云服务密钥
- **个人隐私**：手机号、邮箱、身份证号、JWT
- **资源链接**：URL、GitHub 链接、公司机构名称
- **指纹识别**：服务端组件、CDN、框架、构建工具

支持的云密钥包括 AWS、阿里云、腾讯云、京东云、Google API、支付宝、Apple 开发者、微信开放平台、企业微信、GitLab、GitHub。

使用技巧：

- 鼠标悬停查看来源 URL
- 左键单击复制来源 URL
- 右键单击复制结果内容
- Ctrl + 左键在新标签打开来源

## AI Skill

```bash
mkdir -p ~/.claude/skills/sensitive-info-detector
cp skill/SKILL.md ~/.claude/skills/sensitive-info-detector/
```

调用：

```text
/sensitive-info-detector "https://example.com"
```

## 技术要点

- Manifest V3 Service Worker
- MutationObserver 动态 DOM（1s 防抖）
- JS 最大 10 并发，50000 字符分块扫描
- 300+ 行黑白名单，三级假阳性过滤
- Background fetch 失败时在目标 Tab 降级重试
- Webpack chunk 加载代码还原完整 JS URL

扩展规则源自 [SickleSec/SnowEyes](https://github.com/SickleSec/SnowEyes) v0.2.7.3。

## 合规

仅限授权安全评估。没有书面授权，不得对目标系统扫描。
