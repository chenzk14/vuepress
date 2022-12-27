import {defaultTheme} from 'vuepress'
import {docsearchPlugin} from '@vuepress/plugin-docsearch'
// import {searchPlugin} from '@vuepress/plugin-search'

export default {
    title: 'Canstor - 博客',
    base: '/vuepress/', //需要设置部署文档的文件名，1.0版本 base字段一定是需要打包的时候才开启，不需要的时候要注释掉，不然npm跑项目就会运行不起来
    dest: './dist',
    markdown: {lineNumbers: true},
    head: [
        [
            // favicon.ico
            'link', {rel: 'icon', href: 'https://pic.imgdb.cn/item/63aa4eb908b6830163f86f4c.png'}
        ]],
    plugins: [
        ["vuepress-plugin-auto-sidebar", {}],

        docsearchPlugin({
            placeholder: "搜索",
            appId: '',
            apiKey: '',
            indexName: ''
        }),

        // searchPlugin({
        //     locales: {
        //         '/': {
        //             placeholder: '搜索',
        //         },
        //     },
        // }),

    ],
    theme: defaultTheme({
        logo: '/assets/img/logo-nav.png',
        sidebarDepth: 2,
        contributors: false,
        navbar: [
            {text: '主页', link: '/'},
            {
                text: '导航',
                children: [
                    {text: '机场1 - 还比较稳定,自用推荐', link: 'https://teacat1.com/#/register?code=couo3bID'},
                    {text: '花瓣 - 灵感素材网站', link: 'https://huaban.com/'},
                    {text: '奇迹修 - 资源导航网站', link: 'https://www.qijishow.com/'},
                    {text: 'iconmoon - 矢量图打包成图标字体的网站', link: 'https://icomoon.io/'},
                    {text: 'iconfont - 阿里团队图标字体及图标素材下载平台', link: 'https://www.iconfont.cn/'},
                ]
            },

            {text: '个人作品集', link: '/个人作品集/个人作品集.md'},
            {text: '个人文档记录', link: '/about.md'},
            {
                text: '随笔',
                children: ['/随笔/人间.md',
                    '/随笔/回望.md',
                    '/随笔/疫情之下.md',
                    '/随笔/枯树时代.md',
                    '/随笔/失格.md'
                ]
            },
        ],
        // 你也可以直接将它设置为一个 URL
        repo: 'https://github.com/chenzk14/vuepress.git',
        sidebar: [
            {text: '关于我', link: '/about.md',},
            '/触动函数相关/已封装好的函数.md',
            '/批处理相关/批处理汇总.md',

            {
                text: 'Python',
                collapsible: true,
                children: [
                    {text: '1. 批量随机合成文件夹内的所有图片', link: '/Python脚本相关/批量随机合成文件夹内的所有图片.md'},
                    {text: '2. Selenium脚本开发相关记录', link: '/Python脚本相关/Selenium脚本开发相关记录.md'},
                    {text: '3. 文件按行分割', link: '/Python脚本相关/文件按行分割.md'},
                ]
            },

            {
                text: 'FFMPEG',
                collapsible: true,
                children: [
                    {text: '1. 水印添加', link: '/ffmpeg/水印添加.md'}
                ]
            },

            '/Thunderobot-Hackintosh/我的OS.md',
        ]
    }),
  }

