# Hackintosh

## **我的 EFI文件**

安装过程不做说明，网上一大把,安装可参考这位博主的博客:  [国光](https://apple.sqlsec.com/2-%E5%90%AF%E5%8A%A8%E7%9B%98%E5%88%B6%E4%BD%9C/2-1.html)

详细的releases可以参考我的源(适配到 **Macos-13.0**)：[雷神911-Air电竞版](https://github.com/chenzk14/Thunderobot-Hackintosh)

### 我的配置
::: tip 配置
**雷神911air电竞版144HZ屏 - 1050ti -UHD630** 
:::

### **你可能需要的工具**
::: tip 工具参考
1. **镜像下载**：可参考 [黑果小兵的部落阁](https://blog.daliansky.net/)

2. **OC编辑器（Windows版）**：[OCAuxiliaryTools](https://github.com/ic005k/OCAuxiliaryTools)

3. **OC编辑器（MacOs版）**：[OpenCore Configurator](https://macoshome.com/hackintosh/htools/2100.html#Down)

4. **网卡驱动**：[openintelwireless](https://github.com/OpenIntelWireless/itlwm)

  > intel网卡驱动建议使用`Itlwn`配合`HeliPort`使用, `AirportItlwm`暂不成熟，路由器上行过大容易出现断流重连的问题，只能期待开发者做得更好吧！

5. **声卡驱动**：[AppleALC](https://github.com/acidanthera/AppleALC)

  >ALC_ID速查表：https://www.bilibili.com/read/cv13613833/

6. **蓝牙驱动**：[IntelBluetoothFirmware](https://github.com/OpenIntelWireless/IntelBluetoothFirmware)

  > `BigSur`建议 `IntelBluetoothFirmware.kext` 和 `IntelBluetoothInjector.kext` 配合使用

  > `Monterey`由于底层更改，建议`IntelBluetoothFirmware.kext` 和 `BlueToolFixup.kext` 配合使用

7. **Clash下载地址**：[Clash for windows](https://github.com/Fndroid/clash_for_windows_pkg)

8. **OC主题 png 转 icns 工具**：[Icnspack-Builder](https://github.com/chris1111/Icnspack-Builder)

~~9. **MAC软件下载**:https://macwk.com/~~
::: 
### **当前EFI问题**
::: warning 问题
1. 无法隔空投送（建议更换博通网卡，免驱动）

2. 触控板四指无法唤出启动器

3. 2K、4K视频播放时容易出现断层的现象，暂未找到问题，有了解的可以帮帮忙
:::
