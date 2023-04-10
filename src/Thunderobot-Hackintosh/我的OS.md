# 黑苹果

## **我的 EFI文件**

安装过程不做说明，网上一大把,可参考这位博主的博客:  [国光](https://apple.sqlsec.com/2-%E5%90%AF%E5%8A%A8%E7%9B%98%E5%88%B6%E4%BD%9C/2-1.html)

和我一样配置的小伙伴可以参考我的源下载EFI (已适配 **Macos-12.x Monterey**)：[雷神911-Air电竞版](https://github.com/chenzk14/Thunderobot-Hackintosh)

### 我的配置

::: tip 配置
**雷神911air 电竞版 144HZ屏 - 1050ti -UHD630 -i7 - 8代U**
:::

### **你可能需要的工具**
#### 以下是一些常用工具的说明
| 工具  | 下载地址 | 说明 |
|:-----------:|:-----------:|:--|
|   镜像下载  |   [黑果小兵的部落阁](https://blog.daliansky.net/)   | -  |
|   OCAuxiliaryTools  |  [OCAuxiliaryTools](https://github.com/ic005k/OCAuxiliaryTools)    | -   |
|   OpenCore Configurator（MacOs版）  |  [OpenCore Configurator](https://macoshome.com/hackintosh/htools/2100.html#Down)    |  -  |
|  网卡驱动   |   [openintelwireless](https://github.com/OpenIntelWireless/itlwm)   |   intel网卡驱动建议使用`Itlwn`配合`HeliPort`使用, `AirportItlwm`暂不成熟，路由器上行过大容易出现断流重连的问题，只能期待开发者做得更好吧！ |
|   声卡驱动  |  [AppleALC](https://github.com/acidanthera/AppleALC)    | [ALC_ID速查表](https://www.bilibili.com/read/cv13613833/)   |
|   蓝牙驱动  |  [IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware)| `BigSur`以下的系统，建议 `IntelBluetoothFirmware.kext` 和 `IntelBluetoothInjector.kext` 配合使用 `Monterey` 以上的系统，由于底层更改，建议`IntelBluetoothFirmware.kext` 和 `BlueToolFixup.kext` 配合使用 |
|  Clash下载地址   |   [Clash for windows](https://github.com/Fndroid/clash_for_windows_pkg)   |  -  |
|   OC主题 png 转 icns 工具  |    [Icnspack-Builder](https://github.com/chris1111/Icnspack-Builder)  |  -  |
| Mac软件安装 | [MacW](https://www.macw.com/) | - |
### **当前EFI问题**
::: danger 问题
1. 无法隔空投送（建议更换博通网卡，免驱动）
:::
