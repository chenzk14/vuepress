// 从云数据库拉取已发布文章和分类配置，生成本地 md 文件
// 用法：node scripts/fetch-articles.mjs
// 依赖：Node 18+（内置 fetch）
//
// 1. 拉取 categories 表（分类的显示名、排序、图标）
// 2. 为每个分类生成 README.md 目录页（frontmatter 含 title/order/icon）
// 3. 拉取已发布文章，按分类放进对应文件夹
// 后台文章 frontmatter 带 source: backend，同步时只清理 backend 文件，保留本地文件。
import { writeFileSync, mkdirSync, rmSync, existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SRC_DIR = join(ROOT, 'src');

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

// 统一请求封装
async function cloudGet(path) {
  const url = `${ENDPOINT}${path}`;
  const res = await fetch(url, {
    headers: {
      'x-wb-webapp-access-key': PUBLISHABLE_KEY,
      'Accept': 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error(`请求失败: HTTP ${res.status} ${await res.text()}`);
  }
  return await res.json();
}

// 拉取分类配置
async function fetchCategories() {
  return await cloudGet('/.cloud/database/rest/categories?select=folder,name,sort_order,icon&data_env=eq.prod&order=sort_order.asc');
}

// 拉取已发布文章
async function fetchArticles() {
  return await cloudGet('/.cloud/database/rest/articles?select=id,title,summary,content,category,cover,owner_name,created_at,updated_at&data_env=eq.prod&status=eq.published&order=created_at.desc');
}

// 解析分类 "A/B/C" -> ["A", "B", "C"]
function parseCategory(category) {
  return String(category || '')
    .split('/')
    .map((s) => s.trim())
    .filter(Boolean);
}

// 判断一个 md 文件是否是后台生成（frontmatter 含 source: backend）
function isBackendFile(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return false;
    return /^source:\s*["']?backend["']?\s*$/m.test(m[1]);
  } catch (e) {
    return false;
  }
}

// 判断是否是脚本生成的目录页（frontmatter 含 source: category-page）
function isCategoryPage(filePath) {
  try {
    const content = readFileSync(filePath, 'utf8');
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return false;
    return /^source:\s*["']?category-page["']?\s*$/m.test(m[1]);
  } catch (e) {
    return false;
  }
}

// 递归清理后台生成的文件（backend 文章 + 目录页），保留本地文件
function cleanGeneratedFiles(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanGeneratedFiles(full);
      try {
        if (readdirSync(full).length === 0) rmSync(full, { recursive: true, force: true });
      } catch (e) {}
    } else if (entry.name.endsWith('.md') && (isBackendFile(full) || isCategoryPage(full))) {
      rmSync(full, { force: true });
    }
  }
}

function buildArticleFrontmatter(a) {
  const date = (a.created_at || '').slice(0, 10);
  const cats = parseCategory(a.category);
  const lines = [
    '---',
    `title: "${escapeFrontmatter(a.title)}"`,
    `date: ${date}`,
    `source: backend`,
    '---',
    ''
  ];
  if (a.summary) {
    lines.splice(1, 0, `description: "${escapeFrontmatter(a.summary)}"`);
  }
  return lines.join('\n');
}

// 生成目录页 README.md
// 注意：index: false 让 README 不生成独立页面，仅作为侧边栏分类配置载体
function buildCategoryPage(cat) {
  const lines = [
    '---',
    `title: "${escapeFrontmatter(cat.name)}"`,
    `icon: ${cat.icon || 'folder'}`,
    `index: false`,
    'dir:',
    `  order: ${cat.sort_order ?? 0}`,
    `  text: "${escapeFrontmatter(cat.name)}"`,
    `source: category-page`,
    '---',
    '',
    `# ${cat.name}`,
    '',
    ''
  ];
  return lines.join('\n');
}

async function main() {
  console.log('[1/4] 从云数据库拉取分类配置...');
  const categories = await fetchCategories();
  console.log(`  共 ${categories.length} 个分类`);

  console.log('[2/4] 清理旧的后台生成文件...');
  cleanGeneratedFiles(SRC_DIR);

  console.log('[3/4] 生成分类目录页...');
  for (const cat of categories) {
    const dir = join(SRC_DIR, cat.folder);
    mkdirSync(dir, { recursive: true });
    const page = buildCategoryPage(cat);
    writeFileSync(join(dir, 'README.md'), page, 'utf8');
    console.log(`  目录页 ${cat.folder} -> "${cat.name}" (order=${cat.sort_order}, icon=${cat.icon})`);
  }

  console.log('[4/4] 拉取文章并生成 md...');
  const articles = await fetchArticles();
  console.log(`  共 ${articles.length} 篇已发布文章`);
  for (const a of articles) {
    const cats = parseCategory(a.category);
    const pathParts = cats.length > 0 ? cats : ['随笔'];
    const fileName = `${a.id}-${slug(a.title)}.md`;
    const dir = join(SRC_DIR, ...pathParts);
    mkdirSync(dir, { recursive: true });
    const content = buildArticleFrontmatter(a) + '\n<div class="article-source-badge">后台上传</div>\n\n' + (a.content || '');
    writeFileSync(join(dir, fileName), content, 'utf8');
    console.log(`  文章 ${a.category || '随笔'} -> ${fileName}`);
  }

  console.log('\n完成！');
}

main().catch((e) => {
  console.error('拉取失败：', e.message);
  process.exit(1);
});
