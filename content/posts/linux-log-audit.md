---
title: "Linux 日志审计与攻击溯源实战"
date: 2026-09-05
description: "以 Linux 环境为背景，讲解如何通过 auditd、SSH 登录日志、Web 访问日志等审计数据，定位异常行为并还原攻击链。"
categories: ["安全运维"]
tags: ["日志审计", "auditd", "sshd", "溯源", "应急响应"]
series: ["应急响应手册"]
toc: true
cover: "/img/covers/audit.svg"
draft: true
---

当设备出现异常告警，第一步往往不是直接「杀毒」，而是**看日志、还原时间线**。日志审计是安全运维与应急响应的基本功。这篇文章以 Linux 审计日志为主线，演示攻击溯源的通用思路。

## 审计数据从哪来

| 数据源 | 覆盖内容 |
| --- | --- |
| auditd | 系统调用、文件访问、权限变更 |
| SSH 日志 | 登录尝试、来源 IP、认证结果 |
| Web 访问日志 | HTTP 请求、攻击特征 |
| 系统日志 journal | 服务异常、cron 任务 |

## 定位异常登录

SSH 暴力破解是最常见的入侵入口。先用日志找出高频失败登录的来源：

```bash
# 统计失败登录来源 IP Top 10
grep "Failed password" /var/log/auth.log | awk '{print $(NF-3)}' | sort | uniq -c | sort -nr | head -10

# 查看某 IP 的完整登录行为
grep "192.168.1.100" /var/log/auth.log | grep -E "Accepted|Failed"
```

> 提示：`/var/log/auth.log` 在部分发行版（如 CentOS）位于 `/var/log/secure`。

## 用 auditd 追踪可疑进程

auditd 能记录「谁、什么时候、访问了什么」。查看某 PID 的历史行为：

```bash
# 查询指定 PID 的记录
ausearch -p 12345 -ts today

# 查询特定可执行文件被访问的记录
ausearch -f /etc/passwd

# 查询某用户的所有操作
ausearch -ua username
```

## 还原攻击链

溯源的核心是**把零散日志拼成时间线**。以一个典型场景为例：

```
[00:12:01] SSH 暴力破解成功（来源 45.x.x.x）
[00:15:33] 新增用户 user1 并加入 sudo 组
[00:20:07] 下载可疑脚本到 /tmp
[00:35:44] 修改 crontab 建立持久化
[01:02:10] 外连未知 IP 的 443 端口
```

还原时按时间排序，逐条对应审计记录，就能定位入侵者的完整动作序列。

## 防护建议

1. **开启 auditd** 并配置关键文件监控规则。
2. **SSH 强化**：禁用 root 远程登录、改用密钥认证、限制来源 IP。
3. **日志集中管理**：将日志同步到独立日志服务器或 SIEM，防止被篡改。
4. **定期演练**：预先建立溯源剧本，缩短真实事件的处理时间。

日志审计是一项「平时积累、战时救命」的能力。建议把上述命令整理成自己的速查手册，遇到告警能快速上手。后续我会写更深入的《持久化手法与排查》专题。
