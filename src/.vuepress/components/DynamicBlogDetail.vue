<template>
  <div class="dyn-detail">
    <div v-if="loading" class="dyn-loading">正在加载文章...</div>
    <div v-else-if="error" class="dyn-error">
      <p>加载失败：{{ error }}</p>
      <button class="dyn-retry" @click="load">重试</button>
    </div>
    <div v-else-if="!article" class="dyn-error">
      <p>文章不存在或未发布</p>
      <a class="dyn-retry" href="/动态文章/index.html">返回列表</a>
    </div>
    <article v-else class="dyn-article">
      <header class="dyn-header">
        <h1 class="dyn-title">{{ article.title }}</h1>
        <div class="dyn-meta">
          <span class="dyn-cat">{{ article.category || '随笔' }}</span>
          <span>{{ fmt(article.created_at) }}</span>
          <span v-if="article.owner_name">· {{ article.owner_name }}</span>
        </div>
      </header>
      <div v-if="article.cover" class="dyn-cover">
        <img :src="article.cover" :alt="article.title">
      </div>
      <div class="dyn-content" v-html="renderMarkdown(article.content)"></div>
      <footer class="dyn-footer">
        <a class="dyn-retry" href="/动态文章/index.html">← 返回列表</a>
      </footer>
    </article>
  </div>
</template>

<script>
export default {
  name: 'DynamicBlogDetail',
  data() {
    return {
      loading: true,
      error: '',
      article: null,
      cloud: null
    }
  },
  mounted() {
    this.initCloud()
    if (this.cloud) {
      this.load()
    } else {
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
        this.error = 'SDK 未加载'
        return
      }
      this.loading = true
      this.error = ''
      const id = this.getArticleId()
      if (!id) {
        this.error = '缺少文章 ID'
        this.loading = false
        return
      }
      const res = await this.cloud.database
        .from('articles')
        .select('id, title, summary, content, category, cover, created_at, owner_name')
        .eq('id', id)
        .eq('status', 'published')
        .eq('data_env', 'prod')
        .maybeSingle()
      if (res.error) {
        this.error = res.error.message || res.error.code || '未知错误'
      } else {
        this.article = res.data || null
      }
      this.loading = false
    },
    getArticleId() {
      const m = window.location.search.match(/[?&]id=(\d+)/)
      return m ? m[1] : null
    },
    renderMarkdown(md) {
      if (!md) return ''
      // 简单的 Markdown 渲染（转义 HTML 后处理常见语法）
      let html = this.escapeHtml(md)
      // 代码块
      html = html.replace(/```([\s\S]*?)```/g, (_, code) => '<pre><code>' + code + '</code></pre>')
      // 行内代码
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
      // 标题
      html = html.replace(/^### (.*)$/gm, '<h3>$1</h3>')
      html = html.replace(/^## (.*)$/gm, '<h2>$1</h2>')
      html = html.replace(/^# (.*)$/gm, '<h1>$1</h1>')
      // 加粗
      html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
      // 斜体
      html = html.replace(/\*([^*]+)\*/g, '<em>$1</em>')
      // 图片
      html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
      // 链接
      html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      // 无序列表
      html = html.replace(/^- (.*)$/gm, '<li>$1</li>')
      html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>')
      // 段落
      html = html.replace(/\n{2,}/g, '</p><p>')
      html = '<p>' + html + '</p>'
      return html
    },
    escapeHtml(s) {
      return String(s == null ? '' : s)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
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
.dyn-detail { max-width: 760px; margin: 0 auto; padding: 0 8px; }
.dyn-loading, .dyn-error { text-align: center; padding: 48px 0; color: var(--vp-c-text-2, #6b7280); }
.dyn-retry {
  display: inline-block; margin-top: 8px; padding: 6px 16px; border: 1px solid #ddd;
  border-radius: 6px; background: #fff; cursor: pointer; font-size: 14px;
  color: inherit; text-decoration: none;
}
.dyn-header { margin-bottom: 20px; }
.dyn-title { margin: 0 0 10px; font-size: 28px; font-weight: 700; line-height: 1.3; }
.dyn-meta { display: flex; gap: 12px; align-items: center; font-size: 13px; color: var(--vp-c-text-3, #9ca3af); }
.dyn-cat { padding: 1px 10px; border-radius: 20px; background: rgba(62,99,221,.1); color: #3e63dd; font-size: 12px; }
.dyn-cover { margin-bottom: 20px; }
.dyn-cover img { width: 100%; border-radius: 12px; display: block; }
.dyn-content { font-size: 16px; line-height: 1.8; }
.dyn-content :deep(img) { max-width: 100%; border-radius: 8px; }
.dyn-content :deep(pre) { background: #f6f8fa; padding: 14px; border-radius: 8px; overflow-x: auto; }
.dyn-content :deep(code) { font-family: ui-monospace, Consolas, monospace; font-size: 14px; }
.dyn-footer { margin-top: 32px; padding-top: 16px; border-top: 1px solid var(--vp-c-divider, #e5e7eb); }
</style>
