---
title: "vuln-checklist：渗透报告一键生成漏洞清单 Excel"
date: 2026-06-23
lastmod: 2026-06-23
description: "介绍我开源的 vuln-checklist：把多份渗透测试报告整理成一张标准化 15 列漏洞清单 xlsx，支持 opencode 与 Claude Code。"
categories: ["渗透测试"]
tags: ["vuln-checklist", "渗透测试", "报告", "Excel", "AI Skill"]
series: ["渗透测试方法论"]
toc: true
cover: "/img/covers/checklist.svg"
repo: "https://github.com/gg-uu/vuln-checklist"
---

写完渗透测试报告，甲方还要一份「系统漏洞清单」Excel：统一风险等级、按 URL 拆行、合并多份报告。**vuln-checklist** 把这件事做成 AI Skill，把报告丢给助手即可出表。

仓库：https://github.com/gg-uu/vuln-checklist

## 怎么用

把渗透测试报告发给 AI，或手动调用：

```text
/vuln-checklist
```

支持 PDF、DOC、DOCX、HTML、Markdown、纯文本。无论几份报告，只生成 **一个 xlsx**。

## 功能

- **风险等级映射**：把「严重 / Critical / High」等表述统一成 高危 / 中危 / 低危 / 信息
- **多地址拆分**：未授权、敏感信息泄露、越权类漏洞按 URL 拆成多行
- **标准 15 列**：序号、系统名称、漏洞名称、风险等级、漏洞位置、漏洞详情、漏洞危害、修复建议、渗透测试报告、系统组别、系统负责人、漏洞修复情况、漏洞修复时间、备注、漏洞修复验证情况

## 等级映射

| 标准化 | 匹配的原始等级 |
| --- | --- |
| 高危 | 严重问题、严重、超高危、高危、Critical、High |
| 中危 | 中等问题、中危、Medium |
| 低危 | 风险提示、轻度问题、低危、Low（含空值） |
| 信息 | 信息、提示、Info、Information |

## 触发说法

- 「把这些渗透报告整理成一个漏洞清单」
- 「导出 xlsx 漏洞台账」
- 「统一高/中/低危等级」
- 「一个漏洞有多个 URL，按地址拆分」

## 安装

**opencode**：skill 已在 `.opencode/skills/vuln-checklist/`，重启后生效。

**Claude Code**：

```bash
cp -r .claude/skills/vuln-checklist ~/.claude/skills/vuln-checklist
```

## 文件结构

```text
vuln-checklist/
├── SKILL.md                  # skill 定义与工作流
└── generate_checklist.py     # 风险映射、地址拆分、xlsx 生成
```

台账列固定、等级口径统一，后续复测和修复跟踪才能对得上同一份表。
