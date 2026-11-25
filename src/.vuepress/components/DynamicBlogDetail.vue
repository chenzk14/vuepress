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
    <div v-else class="dyn-wrap">
      <article class="dyn-article">
        <header class="dyn-header">
          <div class="dyn-header-top">
            <h1 class="dyn-title">{{ article.title }}</h1>
            <a class="dyn-back" href="/动态文章/index.html">← 返回列表</a>
          </div>
          <div class="dyn-meta">
            <span class="dyn-cat">{{ article.category || '随笔' }}</span>
            <span>{{ fmt(article.created_at) }}</span>
            <span v-if="article.owner_name">· {{ article.owner_name }}</span>
          </div>
        </header>
        <div v-if="article.cover" class="dyn-cover">
          <img :src="article.cover" :alt="article.title">
        </div>
        <div class="dyn-content" v-html="renderedContent"></div>
      </article>

      <aside class="dyn-toc" v-if="toc.length > 0">
        <div class="dyn-toc-title">目录</div>
        <ul class="dyn-toc-list">
          <li
            v-for="(h, idx) in toc"
            :key="idx"
            :class="'dyn-toc-item level-' + h.level"
          >
            <a :href="'#' + h.id" @click.prevent="scrollTo(h.id)">{{ h.text }}</a>
          </li>
        </ul>
      </aside>
    </div>
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
      cloud: null,
      toc: [],
      renderedContent: ''
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
        if (this.article) {
          this.buildContent(this.article.content)
        }
      }
      this.loading = false
    },
    getArticleId() {
      const m = window.location.search.match(/[?&]id=(\d+)/)
      return m ? m[1] : null
    },
    // 提取标题生成 TOC，并给标题加锚点 id
    buildContent(md) {
      const toc = []
      let html = this.escapeHtml(md || '')

      // 代码块先占位保护（避免代码里的 # 被当成标题）
      const codeBlocks = []
      html = html.replace(/```([\s\S]*?)```/g, (_, code) => {
        codeBlocks.push(code)
        return '\u0000CODE' + (codeBlocks.length - 1) + '\u0000'
      })

      // 标题（从高到低处理，避免 ## 被 # 误匹配）
      const headingRules = [
        { re: /^### (.*)$/gm, tag: 'h3', level: 3 },
        { re: /^## (.*)$/gm, tag: 'h2', level: 2 },
        { re: /^# (.*)$/gm, tag: 'h1', level: 1 }
      ]
      headingRules.forEach(rule => {
        html = html.replace(rule.re, (match, text) => {
          const id = this.slug(text) + '-' + toc.length
          toc.push({ text: text.trim(), level: rule.level, id })
          return `<${rule.tag} id="${id}">${text}</${rule.tag}>`
        })
      })

      // 恢复代码块
      html = html.replace(/\u0000CODE(\d+)\u0000/g, (_, i) => {
        return '<pre><code>' + codeBlocks[Number(i)] + '</code></pre>'
      })

      // 行内代码
      html = html.replace(/`([^`]+)`/g, '<code>$1</code>')
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

      this.toc = toc
      this.renderedContent = html
    },
    slug(text) {
      return text
        .trim()
        .toLowerCase()
        .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
        .replace(/^-+|-+$/g, '') || 'section'
    },
    scrollTo(id) {
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
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
.dyn-detail { max-width: 960px; margin: 0 auto; padding: 0 8px; }
.dyn-loading, .dyn-error { text-align: center; padding: 48px 0; color: var(--vp-c-text-2, #6b7280); }
.dyn-retry {
  display: inline-block; margin-top: 8px; padding: 6px 16px; border: 1px solid #ddd;
  border-radius: 6px; background: #fff; cursor: pointer; font-size: 14px;
  color: inherit; text-decoration: none;
}
.dyn-wrap { display: flex; gap: 32px; align-items: flex-start; }
.dyn-article { flex: 1; min-width: 0; max-width: 760px; }
.dyn-header { margin-bottom: 20px; }
.dyn-header-top { display: flex; align-items: center; justify-content: space-between; gap: 16px; }
.dyn-title { margin: 0; font-size: 28px; font-weight: 700; line-height: 1.3; flex: 1; }
.dyn-back {
  flex-shrink: 0; display: inline-block; padding: 6px 14px; border: 1px solid #ddd;
  border-radius: 6px; background: #fff; font-size: 13px; color: var(--vp-c-text-2, #6b7280);
  text-decoration: none; white-space: nowrap; transition: all .15s;
}
.dyn-back:hover { border-color: var(--vp-c-brand, #3e63dd); color: var(--vp-c-brand, #3e63dd); }
.dyn-meta { display: flex; gap: 12px; align-items: center; font-size: 13px; color: var(--vp-c-text-3, #9ca3af); margin-top: 10px; }
.dyn-cat { padding: 1px 10px; border-radius: 20px; background: rgba(62,99,221,.1); color: #3e63dd; font-size: 12px; }
.dyn-cover { margin-bottom: 20px; }
.dyn-cover img { width: 100%; border-radius: 12px; display: block; }
.dyn-content { font-size: 16px; line-height: 1.8; }
.dyn-content :deep(img) { max-width: 100%; border-radius: 8px; }
.dyn-content :deep(pre) { background: #f6f8fa; padding: 14px; border-radius: 8px; overflow-x: auto; }
.dyn-content :deep(code) { font-family: ui-monospace, Consolas, monospace; font-size: 14px; }
.dyn-content :deep(h1), .dyn-content :deep(h2), .dyn-content :deep(h3) {
  scroll-margin-top: 70px;
}

/* 右侧目录 */
.dyn-toc {
  width: 200px; flex-shrink: 0; position: sticky; top: 80px;
  border-left: 1px solid var(--vp-c-divider, #e5e7eb); padding-left: 16px;
  max-height: calc(100vh - 100px); overflow-y: auto;
}
.dyn-toc-title { font-size: 13px; font-weight: 600; color: var(--vp-c-text-2, #6b7280); margin-bottom: 8px; }
.dyn-toc-list { list-style: none; margin: 0; padding: 0; }
.dyn-toc-item { margin: 4px 0; line-height: 1.4; }
.dyn-toc-item a {
  font-size: 13px; color: var(--vp-c-text-2, #6b7280); text-decoration: none;
  display: block; transition: color .15s;
}
.dyn-toc-item a:hover { color: var(--vp-c-brand, #3e63dd); }
.dyn-toc-item.level-1 a { font-weight: 600; }
.dyn-toc-item.level-2 a { padding-left: 10px; }
.dyn-toc-item.level-3 a { padding-left: 20px; font-size: 12px; }

@media (max-width: 768px) {
  .dyn-toc { display: none; }
}
</style>
