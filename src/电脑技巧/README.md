---
title: "电脑小技巧"
icon: blog
date: 2026-11-25
dir:
  order: 5
  text: "电脑技巧"
  link: true
  collapsible: false
source: category-page
---

# Windows 系统维护与优化指南

## 1. 防火墙错误修复

**注册表路径：**

```text
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\mpssvc
```

**操作：**
- 找到 `Start`，将数值修改为 `2`（自动启动）。
- 修改后重启电脑。

## 2. 系统文件位置迁移

### 2.1 桌面及文档

**操作：**

右键桌面或文档 → 属性 → 位置 → 移动 → 选择其他磁盘。

### 2.2 Temp 缓存目录

**操作：**

1. 在其他磁盘创建目录：

```text
E:\Temp\User
E:\Temp\Windows
```

2. 打开：此电脑 → 属性 → 高级系统设置 → 环境变量。
3. 修改用户变量：
   - `TEMP`：`E:\Temp\User`
   - `TMP`：`E:\Temp\User`
4. 修改系统变量：
   - `TEMP`：`E:\Temp\Windows`
   - `TMP`：`E:\Temp\Windows`
5. 清理旧缓存：

```text
%LOCALAPPDATA%\Temp
```

6. 重启电脑。

## 3. NVIDIA 显卡缓存清理

**目录：**

```text
C:\Program Files\NVIDIA Corporation\Installer2
```

**操作：**
- 检查并清理不再需要的旧安装缓存。
- 保留 `InstallerCore` 文件夹。
- 不建议直接批量删除其他文件，以免影响驱动回滚。

## 4. Windows 安全中心修复

**注册表路径：**

```text
HKEY_LOCAL_MACHINE\SYSTEM\CurrentControlSet\Services\SecurityHealthService
```

**操作：**
- 找到 `Start`，将数值修改为 `2`。
- 重启电脑。

## 5. 任务栏图标存储位置

```text
%APPDATA%\Microsoft\Internet Explorer\Quick Launch\User Pinned\TaskBar
```

用于查看或备份任务栏固定图标。

## 6. GTX 1050 Ti 视频播放黑屏

**解决方法：禁用 MPO**

**注册表路径：**

```text
HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\Dwm
```

**操作：**

1. 新建 `DWORD（32 位）值`。
2. 名称：`OverlayTestMode`
3. 数值：`5`
4. 重启电脑生效。

**恢复默认：** 删除 `OverlayTestMode`，重启电脑。

## 7. Windows 系统修复

以管理员身份打开 CMD 或 PowerShell，依次执行：

**扫描系统映像：**

```powershell
DISM /Online /Cleanup-Image /ScanHealth
```

**修复系统映像：**

```powershell
DISM /Online /Cleanup-Image /RestoreHealth
```

**扫描并修复系统文件：**

```powershell
sfc /scannow
```

## 8. 注意事项

- 修改注册表前建议备份。
- 删除缓存文件时，正在使用的文件直接跳过。
- 修改环境变量后检查目录及读写权限。
- DISM、SFC 命令需要管理员权限。
- 涉及系统配置修改时，建议提前备份重要数据。

