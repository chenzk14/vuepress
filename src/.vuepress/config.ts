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
  base: '/vuepress/', // GitHub Pages 子路径部署
  dest: './dist',
  head: [
    [
      // favicon.ico
      'link', { rel: 'icon', href: '/vuepress/assets/img/logo-nav.png' }
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
      { text: '个人文档记录', link: '/about.md', icon: "stack" },
      { text: '个人作品集', link: '/个人作品集/16-个人作品集.md', icon: "palette" },
      // {text: '关于我', link: '/个人作品集/jl.md',icon:"profile"},
      { text: '更新日志', link: '/更新文档.md', icon: "time" },
    ],

    // 自动侧边栏：按文件夹结构自动生成，后台新增分类自动出现
    // 一级目录分类（单文件）由 fetch 脚本把文章内容写入 README 并设置 dir.link，实现单链接项
    sidebar: 'structure',
    sidebarSorter: ['readme', 'order', 'filename', 'title'],

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
