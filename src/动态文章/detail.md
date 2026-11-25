---
title: 文章详情
---

<DynamicBlogDetail />

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
