<template>
  <div class="dyn-blog-list">
    <div v-if="loading" class="dyn-loading">正在加载文章...</div>
    <div v-else-if="error" class="dyn-error">
      <p>加载失败：{{ error }}</p>
      <button class="dyn-retry" @click="load">重试</button>
    </div>
    <div v-else-if="articles.length === 0" class="dyn-empty">暂无文章</div>
    <div v-else class="dyn-grid">
      <a
        v-for="a in articles"
        :key="a.id"
        class="dyn-card"
        :href="'/动态文章/detail.html?id=' + a.id"
      >
        <div class="dyn-card-cover" v-if="a.cover">
          <img :src="a.cover" :alt="a.title" loading="lazy">
        </div>
        <div class="dyn-card-body">
          <h3 class="dyn-card-title">{{ a.title }}</h3>
          <p class="dyn-card-summary">{{ a.summary || excerpt(a.content) }}</p>
          <div class="dyn-card-meta">
            <span class="dyn-cat">{{ a.category || '随笔' }}</span>
            <span>{{ fmt(a.created_at) }}</span>
          </div>
        </div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DynamicBlogList',
  data() {
    return {
      loading: true,
      error: '',
      articles: [],
      cloud: null
    }
  },
  mounted() {
    this.initCloud()
    if (this.cloud) {
      this.load()
    } else {
      // 等待 SDK 就绪
      window.addEventListener('wb-cloud-sdk-ready', this.onSdkReady)
    }
  },
  beforeUnmount() {
    window.removeEventListener('wb-cloud-sdk-ready', this.onSdkReady)
  },
  methods: {
    onSdkReady() {
      this.initCloud()
      if (this.cloud) this.load()
    },
    initCloud() {
      // 动态加载 SDK（避免重复引入）
      if (window.WorkBuddyCloud && window.WorkBuddyCloud.createWorkBuddyCloud) {
        this.cloud = window.WorkBuddyCloud.createWorkBuddyCloud({
          endpoint: "https://blog-articles-32153.app.workbuddy.host",
          oauthRelayBaseUrl: "https://www.workbuddy.cn/v2/as/genie-baas/oauth",
          publishableKey: "wbpk_WqP1SbYX2hJnsmuLngvzLI_llgq32Cu47i8NHlY65lPKaBEef1sXWE3"
        })
      }
    },
    async load() {
      if (!this.cloud) {
        // SDK 尚未加载完成，等待后重试
        this.error = 'SDK 未加载'
        return
      }
      this.loading = true
      this.error = ''
      const res = await this.cloud.database
        .from('articles')
        .select('id, title, summary, content, category, cover, created_at')
        .eq('status', 'published')
        .eq('data_env', 'prod')
        .order('created_at', { ascending: false })
      if (res.error) {
        this.error = res.error.message || res.error.code || '未知错误'
      } else {
        this.articles = res.data || []
      }
      this.loading = false
    },
    excerpt(content) {
      if (!content) return ''
      const plain = content.replace(/[#*>`\-\n\r]/g, ' ').trim()
      return plain.length > 120 ? plain.slice(0, 120) + '...' : plain
    },
    fmt(s) {
      if (!s) return ''
      const d = new Date(s)
      const p = n => (n < 10 ? '0' : '') + n
      return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`
    }
  }
}
</script>

<style scoped>
.dyn-blog-list { max-width: 900px; margin: 0 auto; padding: 0 8px; }
.dyn-loading, .dyn-empty, .dyn-error { text-align: center; padding: 48px 0; color: var(--vp-c-text-2, #6b7280); }
.dyn-retry {
  margin-top: 8px; padding: 6px 16px; border: 1px solid #ddd; border-radius: 6px;
  background: #fff; cursor: pointer; font-size: 14px;
}
.dyn-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(260px, 1fr)); gap: 16px; }
.dyn-card {
  display: flex; flex-direction: column; border: 1px solid var(--vp-c-divider, #e5e7eb);
  border-radius: 12px; overflow: hidden; text-decoration: none; color: inherit;
  background: var(--vp-c-bg, #fff); transition: transform .15s, box-shadow .15s;
}
.dyn-card:hover { transform: translateY(-3px); box-shadow: 0 6px 18px rgba(0,0,0,.08); }
.dyn-card-cover img { width: 100%; height: 160px; object-fit: cover; display: block; }
.dyn-card-body { padding: 14px 16px; flex: 1; display: flex; flex-direction: column; }
.dyn-card-title { margin: 0 0 8px; font-size: 17px; font-weight: 600; line-height: 1.4; }
.dyn-card-summary { margin: 0 0 12px; font-size: 13px; color: var(--vp-c-text-2, #6b7280); line-height: 1.6; flex: 1; }
.dyn-card-meta { display: flex; justify-content: space-between; align-items: center; font-size: 12px; color: var(--vp-c-text-3, #9ca3af); }
.dyn-cat {
  padding: 1px 8px; border-radius: 20px; background: rgba(62,99,221,.1); color: #3e63dd; font-size: 12px;
}
</style>
