# 机器人设计与建造

Designing and Building Robots

与清华大学合作的课程。本仓库存放课程网站、课件和公开代码。
A course in collaboration with Tsinghua University. This repository holds the course website, slides and public code.

**课程网站 / Website:** https://lauyihong.github.io/build-anything-lecture/

**协作者请先读 / Contributors:** [内容更新指南 CONTRIBUTING.md](CONTRIBUTING.md)。仓库里配好了 Claude Code skill `update-course`，把材料交给 AI 就能按规则更新网站并提交 PR。

## 目录 / Layout

```
slides/   导出的 PDF 课件 / exported PDF slides
code/     每讲的公开代码 / public code, one folder per lecture
site/     课程网站源码 (Vite + React + Tailwind) / website source
```

## 更新课程内容 / Updating the course

课程信息、课表和教学团队都在一个文件里：[`site/src/data/course.ts`](site/src/data/course.ts)。所有文本都是中英双语的 `{ en, zh }`。

发布一讲的流程：

1. 把 PDF 放进 `slides/`，例如 `slides/L01-intro.pdf`
2. 把代码放进 `code/L01-intro/`
3. 在 `course.ts` 对应那一讲里填上 `slides` 和 `code`
4. 推送到 `main`，GitHub Actions 会自动构建并部署（约 1 分钟）

协作者请不要直接推送 `main`，按 [CONTRIBUTING.md](CONTRIBUTING.md) 新建分支并提交 Pull Request。

## 本地预览 / Local preview

```bash
cd site
npm install
npm run dev      # http://localhost:5173/build-anything-lecture/
npm run build    # 类型检查 + 构建，并检查引用的课件和代码是否存在
```

网站不依赖任何外部 CDN（字体也打包在站内），在国内网络下也能正常加载。

## 首次部署 / First-time setup

在仓库 **Settings → Pages → Build and deployment → Source** 里选 **GitHub Actions**。
