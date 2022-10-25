// docs/.vuepress/config.ts
import {defaultTheme} from "vuepress";
import {mediumZoomPlugin} from "@vuepress/plugin-medium-zoom";
import {docsearchPlugin} from "@vuepress/plugin-docsearch";
import {nprogressPlugin} from "@vuepress/plugin-nprogress";
import {rightAnchorPlugin} from "vuepress-plugin-right-anchor";

var config_default = {
    title: "canstor - Demo\u6587\u6863",
    base: "/vuepress/",
    dest: "./dist",
    markdown: {lineNumbers: true},
    head: [
        [
            "link",
            {rel: "icon", href: "/assets/img/logo-nav.png"}
        ]
    ],
    plugins: [
        ["vuepress-plugin-auto-sidebar", {}],
        mediumZoomPlugin({}),
        docsearchPlugin({
            placeholder: "\u641C\u7D22",
            appId: "",
            apiKey: "",
            indexName: ""
        }),
        nprogressPlugin(),
        rightAnchorPlugin,
        {
            showDepth: 1,
            ignore: [
                "/",
                "/api/"
            ],
            expand: {
                trigger: "hover",
                clickModeDefaultOpen: true
            },
            customClass: "your-customClass"
        }
    ],
    theme: defaultTheme({
        logo: "/assets/img/logo-nav.png",
        contributors: false,
        navbar: [
            {text: "\u4E3B\u9875", link: "/"},
            {
                text: "\u4E2A\u4EBA\u4F5C\u54C1\u96C6",
                link: "/\u4E2A\u4EBA\u4F5C\u54C1\u96C6/\u4E2A\u4EBA\u4F5C\u54C1\u96C6.md"
            },
            {
                text: "\u6587\u6863\u76F8\u5173",
                children: [
                    "/\u89E6\u52A8\u51FD\u6570\u76F8\u5173/\u5DF2\u5C01\u88C5\u597D\u7684\u51FD\u6570.md",
                    "/\u6279\u5904\u7406\u76F8\u5173/\u6279\u5904\u7406\u6C47\u603B.md",
                    "/Python\u811A\u672C\u76F8\u5173/\u6279\u91CF\u968F\u673A\u5408\u6210\u6587\u4EF6\u5939\u5185\u7684\u6240\u6709\u56FE\u7247.md",
                    "/Thunderobot-Hackintosh/\u6211\u7684OS.md"
                ]
            },
            {
                text: "\u968F\u7B14",
                children: [
                    "/\u968F\u7B14/\u4EBA\u95F4.md",
                    "/\u968F\u7B14/\u56DE\u671B.md",
                    "/\u968F\u7B14/\u75AB\u60C5\u4E4B\u4E0B.md",
                    "/\u968F\u7B14/\u67AF\u6811\u65F6\u4EE3.md",
                    "/\u968F\u7B14/\u5931\u683C.md"
                ]
            }
        ],
        repo: "https://github.com/chenzk14/vuepress.git",
        sidebar: [
            {text: "\u5173\u4E8E\u6211", link: "/about.md"},
            "/\u89E6\u52A8\u51FD\u6570\u76F8\u5173/\u5DF2\u5C01\u88C5\u597D\u7684\u51FD\u6570",
            "/\u6279\u5904\u7406\u76F8\u5173/\u6279\u5904\u7406\u6C47\u603B.md",
            "/Python\u811A\u672C\u76F8\u5173/\u6279\u91CF\u968F\u673A\u5408\u6210\u6587\u4EF6\u5939\u5185\u7684\u6240\u6709\u56FE\u7247.md",
            "/Thunderobot-Hackintosh/\u6211\u7684OS.md"
        ]
    })
};
export {
    config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTovMi1Qcm9qZWN0RmlsZS9Wc2NvZGVQcm9qZWN0L3Z1ZXByZXNzL2RvY3MvLnZ1ZXByZXNzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFwyLVByb2plY3RGaWxlXFxcXFZzY29kZVByb2plY3RcXFxcdnVlcHJlc3NcXFxcZG9jc1xcXFwudnVlcHJlc3NcXFxcY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi8yLVByb2plY3RGaWxlL1ZzY29kZVByb2plY3QvdnVlcHJlc3MvZG9jcy8udnVlcHJlc3MvY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmYXVsdFRoZW1lIH0gZnJvbSAndnVlcHJlc3MnXHJcbmltcG9ydCB7IG1lZGl1bVpvb21QbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLW1lZGl1bS16b29tJ1xyXG5pbXBvcnQgeyBkb2NzZWFyY2hQbHVnaW4gfSBmcm9tICdAdnVlcHJlc3MvcGx1Z2luLWRvY3NlYXJjaCdcclxuaW1wb3J0IHsgbnByb2dyZXNzUGx1Z2luIH0gZnJvbSAnQHZ1ZXByZXNzL3BsdWdpbi1ucHJvZ3Jlc3MnXHJcbmltcG9ydCB7cmlnaHRBbmNob3JQbHVnaW59IGZyb20gJ3Z1ZXByZXNzLXBsdWdpbi1yaWdodC1hbmNob3InXHJcblxyXG5leHBvcnQgZGVmYXVsdCB7XHJcbiAgICB0aXRsZTogJ2NhbnN0b3IgLSBEZW1vXHU2NTg3XHU2ODYzJyxcclxuICAgIGJhc2U6ICcvdnVlcHJlc3MvJywgLy9cdTk3MDBcdTg5ODFcdThCQkVcdTdGNkVcdTkwRThcdTdGNzJcdTY1ODdcdTY4NjNcdTc2ODRcdTY1ODdcdTRFRjZcdTU0MERcdUZGMEMxLjBcdTcyNDhcdTY3MkMgYmFzZVx1NUI1N1x1NkJCNVx1NEUwMFx1NUI5QVx1NjYyRlx1OTcwMFx1ODk4MVx1NjI1M1x1NTMwNVx1NzY4NFx1NjVGNlx1NTAxOVx1NjI0RFx1NUYwMFx1NTQyRlx1RkYwQ1x1NEUwRFx1OTcwMFx1ODk4MVx1NzY4NFx1NjVGNlx1NTAxOVx1ODk4MVx1NkNFOFx1OTFDQVx1NjM4OVx1RkYwQ1x1NEUwRFx1NzEzNlx1NEY2MG5wbVx1OEREMVx1OTg3OVx1NzZFRVx1NUMzMVx1NEYxQVx1OEZEMFx1ODg0Q1x1NEUwRFx1OEQ3N1x1Njc2NVxyXG4gICAgZGVzdDogJy4vZGlzdCcsXHJcbiAgICBtYXJrZG93bjoge2xpbmVOdW1iZXJzOiB0cnVlfSxcclxuICAgIGhlYWQ6IFtcclxuICAgICAgICBbXHJcbiAgICAgICAgICAgICdsaW5rJywge3JlbDogJ2ljb24nLCBocmVmOiAnL2Fzc2V0cy9pbWcvbG9nby1uYXYucG5nJ31cclxuICAgICAgICBdXSxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgICBbXCJ2dWVwcmVzcy1wbHVnaW4tYXV0by1zaWRlYmFyXCIsIHt9XSxcclxuICAgICAgICBtZWRpdW1ab29tUGx1Z2luKHtcclxuICAgICAgICAgICAgLy8gXHU5MTREXHU3RjZFXHU5ODc5XHJcbiAgICAgICAgfSksXHJcbiAgICAgICAgZG9jc2VhcmNoUGx1Z2luKHtcclxuICAgICAgICBwbGFjZWhvbGRlcjogXCJcdTY0MUNcdTdEMjJcIixcclxuICAgICAgICBhcHBJZDogJycsXHJcbiAgICAgICAgYXBpS2V5OiAnJyxcclxuICAgICAgICBpbmRleE5hbWU6ICcnXHJcbiAgICAgIH0pLFxyXG4gICAgICBucHJvZ3Jlc3NQbHVnaW4oKSxcclxuICAgICAgcmlnaHRBbmNob3JQbHVnaW4sXHJcbiAgICAgICAge1xyXG4gICAgICAgICAgICBzaG93RGVwdGg6IDEsXHJcbiAgICAgICAgICAgIGlnbm9yZTogW1xyXG4gICAgICAgICAgICAgICAgJy8nLFxyXG4gICAgICAgICAgICAgICAgJy9hcGkvJ1xyXG4gICAgICAgICAgICAgICAgLy8gXHU2NkY0XHU1OTFBLi4uXHJcbiAgICAgICAgICAgIF0sXHJcbiAgICAgICAgICAgIGV4cGFuZDoge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlcjogJ2hvdmVyJyxcclxuICAgICAgICAgICAgICAgIGNsaWNrTW9kZURlZmF1bHRPcGVuOiB0cnVlXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGN1c3RvbUNsYXNzOiAneW91ci1jdXN0b21DbGFzcycsfVxyXG4gICAgXSxcclxuICAgIHRoZW1lOiBkZWZhdWx0VGhlbWUoe1xyXG4gICAgICAgIGxvZ286ICcvYXNzZXRzL2ltZy9sb2dvLW5hdi5wbmcnLFxyXG4gICAgICAgIC8vIHNpZGViYXJEZXB0aDogMlxyXG4gICAgICAgIGNvbnRyaWJ1dG9yczogZmFsc2UsXHJcbiAgICAgICAgbmF2YmFyOiBbXHJcbiAgICAgICAgICAgIHt0ZXh0OiAnXHU0RTNCXHU5ODc1JywgbGluazogJy8nfSxcclxuICAgICAgICAgICAge3RleHQ6ICdcdTRFMkFcdTRFQkFcdTRGNUNcdTU0QzFcdTk2QzYnLCBsaW5rOiAnL1x1NEUyQVx1NEVCQVx1NEY1Q1x1NTRDMVx1OTZDNi9cdTRFMkFcdTRFQkFcdTRGNUNcdTU0QzFcdTk2QzYubWQnfSxcclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgICAgdGV4dDogJ1x1NjU4N1x1Njg2M1x1NzZGOFx1NTE3MycsXHJcbiAgICAgICAgICAgICAgICBjaGlsZHJlbjogWycvXHU4OUU2XHU1MkE4XHU1MUZEXHU2NTcwXHU3NkY4XHU1MTczL1x1NURGMlx1NUMwMVx1ODhDNVx1NTk3RFx1NzY4NFx1NTFGRFx1NjU3MC5tZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJy9cdTYyNzlcdTU5MDRcdTc0MDZcdTc2RjhcdTUxNzMvXHU2Mjc5XHU1OTA0XHU3NDA2XHU2QzQ3XHU2MDNCLm1kJyxcclxuICAgICAgICAgICAgICAgICAgICAnL1B5dGhvblx1ODExQVx1NjcyQ1x1NzZGOFx1NTE3My9cdTYyNzlcdTkxQ0ZcdTk2OEZcdTY3M0FcdTU0MDhcdTYyMTBcdTY1ODdcdTRFRjZcdTU5MzlcdTUxODVcdTc2ODRcdTYyNDBcdTY3MDlcdTU2RkVcdTcyNDcubWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcvVGh1bmRlcm9ib3QtSGFja2ludG9zaC9cdTYyMTFcdTc2ODRPUy5tZCcsXHJcbiAgICAgICAgICAgICAgICBdXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHtcclxuICAgICAgICAgICAgICAgIHRleHQ6ICdcdTk2OEZcdTdCMTQnLFxyXG4gICAgICAgICAgICAgICAgY2hpbGRyZW46IFsnL1x1OTY4Rlx1N0IxNC9cdTRFQkFcdTk1RjQubWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcvXHU5NjhGXHU3QjE0L1x1NTZERVx1NjcxQi5tZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgJy9cdTk2OEZcdTdCMTQvXHU3NUFCXHU2MEM1XHU0RTRCXHU0RTBCLm1kJyxcclxuICAgICAgICAgICAgICAgICAgICAnL1x1OTY4Rlx1N0IxNC9cdTY3QUZcdTY4MTFcdTY1RjZcdTRFRTMubWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICcvXHU5NjhGXHU3QjE0L1x1NTkzMVx1NjgzQy5tZCdcclxuICAgICAgICAgICAgICAgIF1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICBdLFxyXG4gICAgICAgIC8vIFx1NEY2MFx1NEU1Rlx1NTNFRlx1NEVFNVx1NzZGNFx1NjNBNVx1NUMwNlx1NUI4M1x1OEJCRVx1N0Y2RVx1NEUzQVx1NEUwMFx1NEUyQSBVUkxcclxuICAgICAgICByZXBvOiAnaHR0cHM6Ly9naXRodWIuY29tL2NoZW56azE0L3Z1ZXByZXNzLmdpdCcsXHJcbiAgICAgICAgc2lkZWJhcjogW1xyXG4gICAgICAgICAgICB7dGV4dDogJ1x1NTE3M1x1NEU4RVx1NjIxMScsIGxpbms6ICcvYWJvdXQubWQnLH0sXHJcbiAgICAgICAgICAgICcvXHU4OUU2XHU1MkE4XHU1MUZEXHU2NTcwXHU3NkY4XHU1MTczL1x1NURGMlx1NUMwMVx1ODhDNVx1NTk3RFx1NzY4NFx1NTFGRFx1NjU3MCcsXHJcbiAgICAgICAgICAgICcvXHU2Mjc5XHU1OTA0XHU3NDA2XHU3NkY4XHU1MTczL1x1NjI3OVx1NTkwNFx1NzQwNlx1NkM0N1x1NjAzQi5tZCcsXHJcbiAgICAgICAgICAgICcvUHl0aG9uXHU4MTFBXHU2NzJDXHU3NkY4XHU1MTczL1x1NjI3OVx1OTFDRlx1OTY4Rlx1NjczQVx1NTQwOFx1NjIxMFx1NjU4N1x1NEVGNlx1NTkzOVx1NTE4NVx1NzY4NFx1NjI0MFx1NjcwOVx1NTZGRVx1NzI0Ny5tZCcsXHJcbiAgICAgICAgICAgICcvVGh1bmRlcm9ib3QtSGFja2ludG9zaC9cdTYyMTFcdTc2ODRPUy5tZCcsXHJcbiAgICAgICAgICAgIC8vICcvXHU0RTJBXHU0RUJBXHU0RjVDXHU1NEMxXHU5NkM2L1x1NEUyQVx1NEVCQVx1NEY1Q1x1NTRDMVx1OTZDNi5tZCdcclxuICAgICAgICBdXHJcbiAgICB9KSxcclxuICB9XHJcblxyXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQWlWLFNBQVMsb0JBQW9CO0FBQzlXLFNBQVMsd0JBQXdCO0FBQ2pDLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVMsdUJBQXVCO0FBQ2hDLFNBQVEseUJBQXdCO0FBRWhDLElBQU8saUJBQVE7QUFBQSxFQUNYLE9BQU87QUFBQSxFQUNQLE1BQU07QUFBQSxFQUNOLE1BQU07QUFBQSxFQUNOLFVBQVUsRUFBQyxhQUFhLEtBQUk7QUFBQSxFQUM1QixNQUFNO0FBQUEsSUFDRjtBQUFBLE1BQ0k7QUFBQSxNQUFRLEVBQUMsS0FBSyxRQUFRLE1BQU0sMkJBQTBCO0FBQUEsSUFDMUQ7QUFBQSxFQUFDO0FBQUEsRUFDTCxTQUFTO0FBQUEsSUFDTCxDQUFDLGdDQUFnQyxDQUFDLENBQUM7QUFBQSxJQUNuQyxpQkFBaUIsQ0FFakIsQ0FBQztBQUFBLElBQ0QsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYTtBQUFBLE1BQ2IsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUFBLElBQ0QsZ0JBQWdCO0FBQUEsSUFDaEI7QUFBQSxJQUNFO0FBQUEsTUFDSSxXQUFXO0FBQUEsTUFDWCxRQUFRO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxNQUVKO0FBQUEsTUFDQSxRQUFRO0FBQUEsUUFDSixTQUFTO0FBQUEsUUFDVCxzQkFBc0I7QUFBQSxNQUMxQjtBQUFBLE1BQ0EsYUFBYTtBQUFBLElBQW1CO0FBQUEsRUFDeEM7QUFBQSxFQUNBLE9BQU8sYUFBYTtBQUFBLElBQ2hCLE1BQU07QUFBQSxJQUVOLGNBQWM7QUFBQSxJQUNkLFFBQVE7QUFBQSxNQUNKLEVBQUMsTUFBTSxnQkFBTSxNQUFNLElBQUc7QUFBQSxNQUN0QixFQUFDLE1BQU0sa0NBQVMsTUFBTSxvRUFBaUI7QUFBQSxNQUN2QztBQUFBLFFBQ0ksTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLFVBQUM7QUFBQSxVQUNQO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNKO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxRQUNJLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxVQUFDO0FBQUEsVUFDUDtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0o7QUFBQSxNQUNKO0FBQUEsSUFDSjtBQUFBLElBRUEsTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLE1BQ0wsRUFBQyxNQUFNLHNCQUFPLE1BQU0sWUFBWTtBQUFBLE1BQ2hDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFFSjtBQUFBLEVBQ0osQ0FBQztBQUNIOyIsCiAgIm5hbWVzIjogW10KfQo=