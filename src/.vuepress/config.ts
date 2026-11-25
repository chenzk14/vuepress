import { defineUserConfig } from "vuepress";
import { hopeTheme } from "vuepress-theme-hope";
import { viteBundler } from '@vuepress/bundler-vite'

export default defineUserConfig({

  bundler: viteBundler({
    viteOptions: {},
    vuePluginOptions: {},
  }),

  lang: "zh-CN",
  title: 'ForMonEv - Blog',
  base: '/', // 部署到云服务域名根路径
  dest: './dist',
  head: [
    [
      // favicon.ico
      'link', { rel: 'icon', href: '/assets/img/logo-nav.png' }
    ],
    [
      // 自动携带 sharecode：站点需要 sharecode 访问，站内跳转时自动附加，避免 403「链接不完整」
      'script', {},
      `(function () {
        function getSC() {
          try {
            var m = location.search.match(/[?&]sharecode=([^&]+)/);
            if (m) { sessionStorage.setItem('wb_sharecode', m[1]); return m[1]; }
            return sessionStorage.getItem('wb_sharecode');
          } catch (e) { return null; }
        }
        var sc = getSC();
        if (!sc) return;
        document.addEventListener('click', function (e) {
          var a = e.target && e.target.closest ? e.target.closest('a') : null;
          if (!a) return;
          var href = a.getAttribute('href') || '';
          if (!href || href.indexOf('http') === 0 || href.indexOf('mailto:') === 0 || href.indexOf('javascript:') === 0 || href.indexOf('#') === 0) return;
          // 站内链接：附加 sharecode
          try {
            var u = new URL(href, location.origin);
            if (u.origin === location.origin) {
              if (!u.searchParams.has('sharecode')) u.searchParams.set('sharecode', sc);
              a.setAttribute('href', u.pathname + u.search + u.hash);
            }
          } catch (err) {}
        }, true);
      })();`
    ]
  ],
  theme: hopeTheme({
    logo: '/assets/img/logo-nav.png',
    navbar: [
      { text: '主页', link: '/', icon: "home" },
      {
        text: '导航',
        icon: "overflow",
        children: [
          { text: '天航 - 14元200G,自用推荐', link: 'http://tianhang.lol/auth/register?code=sXVg' },
          { text: '花瓣 - 灵感素材网站', link: 'https://huaban.com/' },
          { text: '奇迹秀 - 资源导航网站', link: 'https://www.qijishow.com/' },
          { text: 'iconmoon - 矢量图打包成图标字体的网站', link: 'https://icomoon.io/' },
          { text: 'iconfont - 阿里团队图标字体及图标素材下载平台', link: 'https://www.iconfont.cn/' },
        ]
      },
      { text: '动态文章', link: '/动态文章/index.md', icon: "blog" },
      { text: '个人文档记录', link: '/about.md', icon: "stack" },
      { text: '个人作品集', link: '/个人作品集/个人作品集.md', icon: "palette" },
      {
        text: '随笔',
        icon: "note",
        children: ['/随笔/人间.md',
          '/随笔/回望.md',
          '/随笔/疫情之下.md',
          '/随笔/枯树时代.md',
          '/随笔/失格.md'
        ]
      },
      // {text: '关于我', link: '/个人作品集/jl.md',icon:"profile"},
      { text: '更新日志', link: '/更新文档.md', icon: "time" },
    ],

    sidebar: {
      // 动态文章目录
      "/动态文章/": [
        { text: '文章列表', link: '/动态文章/index.md' },
      ],
      // 随笔目录下的页面显示随笔列表侧边栏
      "/随笔/": [
        { text: '人间', link: '/随笔/人间.md' },
        { text: '回望', link: '/随笔/回望.md' },
        { text: '疫情之下', link: '/随笔/疫情之下.md' },
        { text: '枯树时代', link: '/随笔/枯树时代.md' },
        { text: '失格', link: '/随笔/失格.md' },
      ],
      // 其余页面沿用原有侧边栏
      "/": [
      {
        text: "关于我",
        link: "/about.md",
        icon: "people"
      },
      {
        text: "触动精灵函数",
        link: "/触动函数相关/已封装好的函数.md",
        icon: "interact"
      },
      {
        text: "批处理汇总",
        link: '/批处理相关/批处理汇总.md',
        icon: "shell"
      },
      {
        text: 'FFMPEG 常用技巧汇总',
        link: '/ffmpeg/水印添加.md',
        icon: "rank"
      },
      {
        text: 'Clash Verge 使用说明',
        link: '/服务器相关/ClashVerge使用说明.md',
        icon: "safe"
      },
      {
        text: 'Python 脚本',
        collapsible: true,
        icon: "python",
        children: [
          { text: '1. 批量随机合成文件夹内的所有图片', link: '/Python脚本相关/批量随机合成文件夹内的所有图片.md' },
          { text: '2. Selenium脚本开发相关记录', link: '/Python脚本相关/Selenium脚本开发相关记录.md' },
          { text: '3. 文件按行分割', link: '/Python脚本相关/文件按行分割.md' },
        ]
      },
      {
        text: '服务器与代理搭建',
        collapsible: true,
        icon: "network",
        children: [
          { text: '1. CentOS goproxy S5 代理搭建', link: '/服务器相关/CentOS-goproxy-S5代理搭建.md' },
          { text: '2. S5 代理搭建', link: '/服务器相关/S5代理搭建.md' },
          { text: '3. PPTP 搭建', link: '/服务器相关/PPTP搭建.md' },
          { text: '4. V2Ray 一键脚本', link: '/服务器相关/V2Ray一键脚本.md' },
          { text: '5. BBR 安装加速', link: '/服务器相关/BBR安装加速.md' },
          { text: '6. 常用运维命令备忘', link: '/服务器相关/常用运维命令备忘.md' },
        ]
      },
      {
        text: "黑苹果配置",
        link: "/Thunderobot-Hackintosh/我的OS.md",
        icon: "copyright"
      },
      ],
    },

    plugins: {
      icon: {
        assets: "https://at.alicdn.com/t/c/font_2410206_5vb9zlyghj.css",
      },
      git: {
        // 配置项
        createdTime: false,
        updatedTime: true,
        contributors: false,
      },
      docsearch: {
        appId: "O8JC6T6M7T",
          apiKey: "d8a6dfdbcd32d2ded30b707aa2725922",
          indexName: "ForMonEv",
          placeholder: '搜索文档',
          translations: {
            button: {
              buttonText: '搜索文档',
            },
          }
      },
    },
    markdown: {
      // 启用 figure
      figure: true,
      // 启用图片懒加载
      imgLazyload: true,
      // 启用图片标记
      imgMark: true,
      // 启用图片大小
      imgSize: true,
      // 选项卡
      tabs: true,
    },
    repo: "https://github.com/ForMonEv/vuepress.git",
    repoLabel: "GitHub",
    repoDisplay: true,
  }),
  shouldPrefetch: true,
});
