import { defaultTheme } from 'vuepress'
import { mediumZoomPlugin } from '@vuepress/plugin-medium-zoom'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { nprogressPlugin } from '@vuepress/plugin-nprogress'

export default {
    title: 'canstor - Demo文档',
    base: '/vuepress/', //需要设置部署文档的文件名，1.0版本 base字段一定是需要打包的时候才开启，不需要的时候要注释掉，不然你npm跑项目就会运行不起来
    dest: './dist',
    markdown: {lineNumbers: true},
    head: [
        [
            'link', {rel: 'icon', href: '/assets/img/logo-nav.png'}
        ]],
    plugins: [
        ["vuepress-plugin-auto-sidebar", {}],
        mediumZoomPlugin({
            // 配置项
        }),
        docsearchPlugin({
            placeholder: "搜索",
            appId: '',
            apiKey: '',
            indexName: ''
        }),
        nprogressPlugin(),
    ],
    theme: defaultTheme({
        logo: '/assets/img/logo-nav.png',
        sidebarDepth: 2,
        contributors: false,
        navbar: [
            {text: '主页', link: '/'},
            {text: '个人作品集', link: '/个人作品集/个人作品集.md'},
            {
                text: '文档相关',
                children: ['/触动函数相关/已封装好的函数.md',
                    '/批处理相关/批处理汇总.md',
                    '/Python脚本相关/批量随机合成文件夹内的所有图片.md',
                    '/Thunderobot-Hackintosh/我的OS.md',
                ]
            },
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
            '/触动函数相关/已封装好的函数',
            '/批处理相关/批处理汇总.md',
            '/Python脚本相关/批量随机合成文件夹内的所有图片.md',
            '/Thunderobot-Hackintosh/我的OS.md',
            // '/个人作品集/个人作品集.md'
        ]
    }),
  }

