import { createReadStream, cpSync, existsSync, statSync } from 'node:fs';
import path from 'node:path';
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { LECTURES } from './src/data/course';

const ROOT = path.resolve(__dirname, '..');
const SLIDES_DIR = path.join(ROOT, 'slides');
const CODE_DIR = path.join(ROOT, 'code');

/**
 * 课件 PDF 放在仓库根目录的 slides/ 下（方便在 GitHub 上直接浏览），
 * 这个插件在开发时直接提供这些文件，构建时复制到 dist/slides/，
 * 并检查 course.ts 里引用的课件和代码目录是否真实存在，避免网站上出现坏链接。
 */
function courseMaterials(): Plugin {
  return {
    name: 'course-materials',
    buildStart() {
      const missing: string[] = [];
      for (const l of LECTURES) {
        if (l.slides && !existsSync(path.join(SLIDES_DIR, l.slides))) missing.push(`slides/${l.slides}`);
        if (l.code && !existsSync(path.join(CODE_DIR, l.code))) missing.push(`code/${l.code}/`);
      }
      if (missing.length) {
        this.error(`course.ts 引用了不存在的文件：\n  ${missing.join('\n  ')}`);
      }
    },
    configureServer(server) {
      server.middlewares.use(`${server.config.base}slides`, (req, res, next) => {
        const rel = decodeURIComponent((req.url ?? '/').split('?')[0]);
        const file = path.join(SLIDES_DIR, rel);
        if (!file.startsWith(SLIDES_DIR + path.sep) || !existsSync(file) || !statSync(file).isFile()) {
          return next();
        }
        if (file.endsWith('.pdf')) res.setHeader('Content-Type', 'application/pdf');
        createReadStream(file).pipe(res);
      });
    },
    writeBundle(options) {
      const out = path.join(options.dir ?? path.resolve(__dirname, 'dist'), 'slides');
      cpSync(SLIDES_DIR, out, {
        recursive: true,
        filter: (src) => path.basename(src) !== 'README.md',
      });
    },
  };
}

export default defineConfig({
  // 发布在 https://lauyihong.github.io/build-anything-lecture/
  base: '/build-anything-lecture/',
  plugins: [react(), tailwindcss(), courseMaterials()],
});
