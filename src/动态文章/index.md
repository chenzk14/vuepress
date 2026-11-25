---
title: 动态文章
---

# 动态文章

这里展示通过「网页后台」在线发布的文章，内容实时从云端加载，无需重新构建站点。

<DynamicBlogList />

<script setup>
import { onMounted } from 'vue'
onMounted(() => {
  if (!window.WorkBuddyCloud && !document.getElementById('wb-cloud-sdk')) {
    const s = document.createElement('script')
    s.id = 'wb-cloud-sdk'
    s.src = '/workbuddy-cloud-sdk.global.js'
    s.onload = () => window.dispatchEvent(new Event('wb-cloud-sdk-ready'))
    document.head.appendChild(s)
  }
})
</script>
