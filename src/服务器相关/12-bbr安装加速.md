---
title: "BBR安装加速"
date: 2026-11-25
source: backend
---

<div class="article-source-badge">后台上传</div>

## 一键安装

```bash
wget --no-check-certificate https://github.com/teddysun/across/raw/master/bbr.sh && chmod +x bbr.sh && ./bbr.sh
```

## 验证

安装完成后重启系统，执行以下命令检查 BBR 是否开启（返回 `bbr` 即成功）：

```bash
sysctl net.ipv4.tcp_congestion_control
```
