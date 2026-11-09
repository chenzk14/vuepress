---
icon: safe
order: 7
---

# Clash Verge 使用说明

[Clash Verge Rev](https://github.com/clash-verge-rev/clash-verge-rev) 是基于 Tauri 的 Clash 图形化代理客户端（Windows / macOS / Linux），本文记录日常使用的常用设置。

## 推荐机场

| 机场 | 套餐说明 | 价格 | 注册链接 |
| --- | --- | --- | --- |
| 天航 | 月付 140G | 最低 14 元/月 | [注册地址](https://www.tianhang.lol/auth/register?code=sXVg) |
| 一分 | 月付 / 次结，超低价 | - | [注册地址](https://xn--4gqx1hgtfdmt.com/#/register?code=MPqHediA) |

::: tip 提示
注册后复制订阅链接，按下方「基本使用流程」导入即可。
:::

## 1. 基本使用流程

1. **导入订阅**：左侧「订阅」→ 粘贴机场订阅链接
2. **选择节点**：左侧「代理」→ 选择代理组中的节点
3. **开启代理**：左侧「设置」→ 打开「系统代理」开关，即可让浏览器/软件走代理
4. **测试连通**：左侧「测试」→ 测试延迟确认节点可用

## 2. 代理模式说明

在左侧「代理」页面顶部可以切换三种模式：**规则 / 全局 / 直连**。

| 模式 | 说明 | 适用场景 |
| --- | --- | --- |
| **规则（Rule）** | 按订阅配置里的分流规则自动判断：国内网站直连、国外网站走代理 | 日常使用（**默认推荐**） |
| **全局（Global）** | 所有流量强制走代理节点，不分流 | 测试节点、访问对出口 IP 要求严格的网站 |
| **直连（Direct）** | 所有流量都不走代理，全部直连 | 临时断开代理但保持客户端运行 |

::: tip 理解要点
- **模式**决定进入 Clash 的流量“怎么走”（代理 / 直连）
- **系统代理 / 虚拟网卡开关**决定“哪些流量进入 Clash”
- 两者配合使用：日常 = 系统代理 + 规则模式；接管全部软件 = 虚拟网卡 + 规则模式
:::

## 3. 系统代理与绕过设置

开启「系统代理」后，系统 HTTP/HTTPS 流量会走 Clash。**绕过（Bypass）** 列表中的地址不走代理，直连访问。

设置位置：`设置 → 系统代理旁的齿轮图标（代理设置）→ 代理绕过`

绕过列表使用 **分号 `;`** 分隔，支持 `*` 通配符。

### 3.1 默认绕过（保留即可）

```ini
localhost;127.*;192.168.*;10.*;172.16.*;172.17.*;172.18.*;172.19.*;172.20.*;172.21.*;172.22.*;172.23.*;172.24.*;172.25.*;172.26.*;172.27.*;172.28.*;172.29.*;172.30.*;172.31.*;<local>
```

常用条目说明：

| 条目 | 作用 |
| --- | --- |
| `localhost` / `127.*` | 本机回环地址，走代理会导致本地服务异常 |
| `192.168.*` / `10.*` | 局域网设备（路由器管理页、NAS、共享打印机等） |
| `172.16.* ~ 172.31.*` | 内网网段（部分公司/虚拟机网络） |
| `<local>` | 所有无法路由的本地地址（Windows 专用标记） |
| `*.company.com` | 示例：公司内网域名直连（按需添加） |

::: tip 使用建议
- 访问路由器后台、内网 NAS 打不开时，优先检查对应网段是否在绕过列表
- 开发调试本机服务（如 `localhost:8080`）务必保留 `localhost;127.*` 绕过
:::

### 3.2 腾讯系（QQ / 微信 / 腾讯云 / 腾讯文档）

```ini
*.qq.com;*.tencent.com;*.wechat.com;*.servicewechat.com;*.gtimg.com;*.qpic.cn;*.myqcloud.com;*.qcloud.com
```

### 3.3 阿里系（淘宝 / 支付宝 / 钉钉 / 阿里云 / 高德）

```ini
*.taobao.com;*.tmall.com;*.alipay.com;*.alibaba.com;*.1688.com;*.aliyun.com;*.aliyuncs.com;*.dingtalk.com;*.youku.com;*.amap.com;*.alicdn.com;*.tbcdn.cn;*.ele.me
```

### 3.4 字节系（抖音 / 今日头条 / 西瓜视频 / 飞书）

```ini
*.douyin.com;*.iesdouyin.com;*.douyinpic.com;*.douyinstatic.com;*.douyinvod.com;*.byteimg.com;*.bytedance.com;*.toutiao.com;*.pstatp.com;*.ixigua.com;*.snssdk.com;*.zjcdn.com;*.feishu.cn
```

::: warning 注意
TikTok（`tiktok.com`）、飞书国际版（`larksuite.com`）等**海外域名需要走代理，不要加入绕过列表**，否则无法访问。
:::

### 3.5 一键合并版（默认 + 腾讯 + 阿里 + 字节）

```ini
localhost;127.*;192.168.*;10.*;172.16.*;172.17.*;172.18.*;172.19.*;172.20.*;172.21.*;172.22.*;172.23.*;172.24.*;172.25.*;172.26.*;172.27.*;172.28.*;172.29.*;172.30.*;172.31.*;<local>;*.qq.com;*.tencent.com;*.wechat.com;*.servicewechat.com;*.gtimg.com;*.qpic.cn;*.myqcloud.com;*.qcloud.com;*.taobao.com;*.tmall.com;*.alipay.com;*.alibaba.com;*.1688.com;*.aliyun.com;*.aliyuncs.com;*.dingtalk.com;*.youku.com;*.amap.com;*.alicdn.com;*.tbcdn.cn;*.ele.me;*.douyin.com;*.iesdouyin.com;*.douyinpic.com;*.douyinstatic.com;*.douyinvod.com;*.byteimg.com;*.bytedance.com;*.toutiao.com;*.pstatp.com;*.ixigua.com;*.snssdk.com;*.zjcdn.com;*.feishu.cn
```

## 4. 虚拟网卡（TUN 模式）

**虚拟网卡 = TUN 模式**。开启后 Clash 会创建一块虚拟网卡接管系统的**全部流量**，包括不支持代理设置的程序（命令行工具、游戏、部分客户端软件）。

### 4.1 与系统代理的区别

| 对比项 | 系统代理 | 虚拟网卡（TUN） |
| --- | --- | --- |
| 接管范围 | 仅遵守系统代理设置的程序 | 全部流量（强制接管） |
| 适用场景 | 日常浏览器上网 | 游戏、命令行、不认代理的软件 |
| 依赖条件 | 无 | 需要安装系统服务 / 管理员权限 |

### 4.2 开启方法

1. `设置 → 服务模式` → 安装服务（需管理员权限，安装一次即可）
2. 打开「虚拟网卡（TUN 模式）」开关
3. 开启 TUN 后**可以关掉系统代理**，避免流量被处理两次

::: warning 注意事项
- TUN 模式下如果断网，先关闭 TUN 排查是否为服务异常
- 部分 VPN / 虚拟机网络与 TUN 冲突，二选一使用
- 服务模式更新客户端版本后若 TUN 失效，重新安装一次服务即可
:::

## 5. 常见问题

- **端口冲突**：Clash 默认混合端口 `7897`，如被占用可在 `设置 → 端口设置` 修改
- **外部控制**：RESTful API 默认 `127.0.0.1:9097`，供面板（如 yacd）连接使用
- **订阅更新**：订阅卡片右键 → 「更新」，或开启自动更新
