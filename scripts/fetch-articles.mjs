// 从云数据库拉取已发布文章，生成本地 md 文件
// 用法：node scripts/fetch-articles.mjs
// 依赖：Node 18+（内置 fetch）
//
// 分类规则：后台分类用 "/" 分层（如 "服务器相关/Clash"），
// 生成到 src/<一级分类>/<二级分类或文章>.md，与本地 md 共存。
// 后台文章 frontmatter 带 source: backend，同步时只清理 backend 文章，保留本地文章。
import { writeFileSync, mkdirSync, rmSync, existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
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
    // 只看 frontmatter（文件开头 --- ... --- 之间）
    const m = content.match(/^---\n([\s\S]*?)\n---/);
    if (!m) return false;
    return /^source:\s*["']?backend["']?\s*$/m.test(m[1]);
  } catch (e) {
    return false;
  }
}

// 递归删除目录里所有 source: backend 的 md 文件，并清理空目录
function cleanBackendFiles(dir) {
  if (!existsSync(dir)) return;
  const entries = readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) {
      cleanBackendFiles(full);
      // 若目录变空则删除
      try {
        if (readdirSync(full).length === 0) rmSync(full, { recursive: true, force: true });
      } catch (e) {}
    } else if (entry.name.endsWith('.md') && isBackendFile(full)) {
      rmSync(full, { force: true });
    }
  }
}

function buildFrontmatter(a) {
  const date = (a.created_at || '').slice(0, 10);
  const cats = parseCategory(a.category);
  const lines = [
    '---',
    `title: "${escapeFrontmatter(a.title)}"`,
    `date: ${date}`,
    `source: backend`,
    `sidebar: false`,
    '---',
    ''
  ];
  if (a.summary) {
    lines.splice(1, 0, `description: "${escapeFrontmatter(a.summary)}"`);
  }
  // 记录原始分类（用于索引）
  if (cats.length > 0) {
    lines.splice(lines.length - 2, 0, `tags:\n  - ${cats.map((c) => escapeFrontmatter(c)).join('\n  - ')}`);
  }
  return lines.join('\n');
}

async function main() {
  console.log('[1/3] 从云数据库拉取文章...');
  const articles = await fetchArticles();
  console.log(`  共 ${articles.length} 篇已发布文章`);

  // 清理之前生成的后台文章（只清 source: backend 的）
  console.log('[1.5/3] 清理旧的后台文章...');
  cleanBackendFiles(SRC_DIR);

  console.log('[2/3] 生成 md 文件...');
  const generated = [];
  for (const a of articles) {
    const cats = parseCategory(a.category);
    // 默认分类「随笔」
    const pathParts = cats.length > 0 ? cats : ['随笔'];
    // 文件路径：src/<一级>/<二级...>/<id-标题>.md
    // 若分类只有一级，则文章直接放该文件夹下
    const dirParts = pathParts;
    const fileName = `${a.id}-${slug(a.title)}.md`;
    const dir = join(SRC_DIR, ...dirParts);
    mkdirSync(dir, { recursive: true });
    const content = buildFrontmatter(a) + '\n<div class="article-source-badge">后台上传</div>\n\n' + (a.content || '');
    const fullPath = join(dir, fileName);
    writeFileSync(fullPath, content, 'utf8');
    generated.push({ id: a.id, title: a.title, category: cats, path: fullPath });
    console.log(`  生成 ${a.category || '随笔'} -> ${fileName}`);
  }

  console.log('[3/3] 完成！');
  console.log(`  共生成 ${generated.length} 篇后台文章`);
  console.log('  注意：后台文章已按分类放入对应文件夹，与本地 md 共存');
}

main().catch((e) => {
  console.error('拉取失败：', e.message);
  process.exit(1);
});
