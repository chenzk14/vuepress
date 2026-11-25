---
title: 文章详情
sidebar: false
toc: false
---

<DynamicBlogDetail />

<script setup>
import { onMounted } from 'vue'
import DynamicBlogDetail from '../.vuepress/components/DynamicBlogDetail.vue'
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
