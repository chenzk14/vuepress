// 从云数据库拉取已发布文章，生成本地 md 文件
// 用法：node scripts/fetch-articles.mjs
// 依赖：Node 18+（内置 fetch）
import { writeFileSync, mkdirSync, rmSync, readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const TARGET_DIR = join(ROOT, 'src', '动态文章', 'posts');

const ENDPOINT = 'https://blog-articles-32153.app.workbuddy.host';
const PUBLISHABLE_KEY = 'wbpk_WqP1SbYX2hJnsmuLngvzLI_llgq32Cu47i8NHlY65lPKaBEef1sXWE3';

function slug(text) {
  return String(text || '')
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fa5]+/g, '-')
    .replace(/^-+|-+$/g, '') || 'untitled';
}

function escapeFrontmatter(s) {
  return String(s == null ? '' : s).replace(/"/g, '\\"').replace(/\n/g, '\\n');
}

async function fetchArticles() {
  const url = `${ENDPOINT}/.cloud/database/rest/articles?select=id,title,summary,content,category,cover,owner_name,created_at,updated_at&data_env=eq.prod&status=eq.published&order=created_at.desc`;
  const res = await fetch(url, {
    headers: {
      'x-wb-webapp-access-key': PUBLISHABLE_KEY,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`拉取文章失败: HTTP ${res.status} ${await res.text()}`);
  }
  return await res.json();
}

function buildFrontmatter(a) {
  const date = (a.created_at || '').slice(0, 10);
  const lines = [
    '---',
    `title: "${escapeFrontmatter(a.title)}"`,
    `date: ${date}`,
    `category: ${a.category || '随笔'}`,
    `sidebar: false`,
    '---',
    ''
  ];
  if (a.summary) {
    // 摘要作为 frontmatter 的描述
    lines.splice(1, 0, `description: "${escapeFrontmatter(a.summary)}"`);
  }
  return lines.join('\n');
}

async function main() {
  console.log('[1/3] 从云数据库拉取文章...');
  const articles = await fetchArticles();
  console.log(`  共 ${articles.length} 篇已发布文章`);

  // 清空并重建 posts 目录
  if (existsSync(TARGET_DIR)) {
    rmSync(TARGET_DIR, { recursive: true, force: true });
  }
  mkdirSync(TARGET_DIR, { recursive: true });

  console.log('[2/3] 生成 md 文件...');
  const listItems = [];
  for (const a of articles) {
    const name = `${a.id}-${slug(a.title)}.md`;
    const content = buildFrontmatter(a) + (a.content || '');
    writeFileSync(join(TARGET_DIR, name), content, 'utf8');
    const date = (a.created_at || '').slice(0, 10);
    listItems.push(`- [${a.title}](./posts/${name}) · ${date}${a.category ? ' · ' + a.category : ''}`);
    console.log(`  生成 ${name}`);
  }

  console.log('[3/3] 生成列表页 index.md...');
  const indexPath = join(ROOT, 'src', '动态文章', 'index.md');
  let indexContent = `---\ntitle: 动态文章\nsidebar: false\ntoc: false\n---\n\n# 动态文章\n\n这里展示通过「网页后台」在线发布的文章。\n\n`;
  if (listItems.length === 0) {
    indexContent += '暂无文章。\n';
  } else {
    indexContent += listItems.join('\n') + '\n';
  }
  writeFileSync(indexPath, indexContent, 'utf8');
  console.log(`  更新 ${indexPath}`);
  console.log('\n完成！');
}

main().catch((e) => {
  console.error('拉取失败：', e.message);
  process.exit(1);
});
