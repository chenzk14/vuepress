# CentOS goproxy S5 代理搭建

## 1. 查看系统版本

```bash
cat /etc/redhat-release
```

## 2. PPPoE 拨号配置（按需）

```bash
# PPPoE 拨号账号初始化（替换为实际账号密码）
nsd-setup-ppp <拨号账号> <拨号密码>
# 或者使用交互式配置
pppoe-setup
```

## 3. 安装 wget

```bash
yum install wget
```

## 4. 安装 goproxy（自动安装脚本）

```bash
curl -L https://mirrors.host900.com/snail007/goproxy/install_auto.sh | bash
```

## 5. 手动下载 goproxy（可选）

```bash
cd /root/proxy/
wget https://mirrors.host900.com/https://github.com/snail007/goproxy/releases/download/v10.5/proxy-linux-amd64.tar.gz
```

## 6. 防火墙操作

```bash
# 开启防火墙
systemctl start firewalld

# 关闭防火墙
systemctl stop firewalld
```

::: tip 绑定端口
注意：S5 代理实际运行在 **16688** 端口，18080 是管理后台端口，两个端口都要放行，否则外部连不上。
:::

```bash
firewall-cmd --zone=public --add-port=18080/tcp --permanent
firewall-cmd --zone=public --add-port=16688/tcp --permanent
firewall-cmd --reload
```

## 7. 启动 S5 代理

```bash
proxy socks -t tcp -p "0.0.0.0:16688" --forever --log proxy.log --daemon
```

## 8. 部署 ipClient

```bash
cd /home
mkdir ipclient
cd ipclient
mkdir log
mkdir configs
```

- 修改 `proxyName=""` 后上传文件
- `config.toml` 上传到 `configs` 文件夹
- `ipClient` 二进制放置 `/home` 文件夹下

给执行权限：

```bash
chmod 777 ipClient
```

后台启动：

```bash
nohup ./ipClient >/dev/null 2>&1 &
nohup ./chat >/dev/null 2>&1 &
```

## 9. sudo 免密配置

::: warning
不要直接编辑 `/etc/sudoers`（语法错误会导致无法获得 root 权限），使用 `visudo` 或写入 `/etc/sudoers.d/`：
:::

```bash
echo "vultr ALL=(ALL:ALL) ALL" | sudo tee /etc/sudoers.d/vultr
echo "vultr ALL=(ALL:ALL) NOPASSWD:ALL" | sudo tee -a /etc/sudoers.d/vultr
```

## 10. 日志与进程管理

```bash
# 查看日志
tail -100f /home/ipclient/log/ipclient.log

# 查看运行状态和进程端口
ps -ax | grep ipClient

# 杀掉进程（PID 替换为实际进程号）
kill -9 <PID>
```

## 11. 网络修复

```bash
ip addr
vi /etc/sysconfig/network-scripts/ifcfg-eth0
service network restart
```

## 12. 关闭 S5（ss5）

```bash
/etc/rc.d/init.d/ss5 stop
```

## 13. yum 缓存维护

```bash
yum clean all
yum makecache
yum update
```
