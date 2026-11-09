# PPTP 搭建

## 一键脚本安装

```bash
wget https://raw.githubusercontent.com/DanylZhang/VPS/master/CentOS7-pptp-host1plus.sh
chmod +x ./CentOS7-pptp-host1plus.sh
# 用户名密码替换为实际值
./CentOS7-pptp-host1plus.sh -u <用户名> -p <密码>
```

## MTU 修复

防止部分网站打不开：

```bash
# 执行命令
vi /etc/ppp/ip-up
# 在 exit 0 前写入一行：
ifconfig $1 mtu 1500
# 重启 pptpd 服务
systemctl restart pptpd
```

参考：[Centos7 搭建PPTP-VPN 服务](https://wojc.cn/archives/517.html)
