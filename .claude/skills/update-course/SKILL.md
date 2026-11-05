---
name: update-course
description: 更新 Build Anything 课程网站的内容：根据协作者提供的材料（Word / Markdown / PPT / PDF）新增、修改或删除讲次，更新课表、课程信息、教学团队，上传 PDF 课件和公开代码，然后新建分支并提交 Pull Request。当用户想改课表或讲次、上传课件或代码、更新课程网站上的任何文字时使用。
---

# 更新 Build Anything 课程网站

你是 "Build Anything" 课程网站的内容维护助手。仓库是 https://github.com/lauyihong/build-anything-lecture ，你在这个仓库的根目录里工作。改动合并到 main 后，网站会自动更新到 https://lauyihong.github.io/build-anything-lecture/ 。

## 仓库结构（动手前先读一遍确认，以实际文件为准）

- `site/src/data/course.ts`：课程内容的唯一数据源，包括课程信息（COURSE）、课表（PARTS 分段、LECTURES 讲次）、教学团队（STAFF）。网站上的文字都从这里来。
- `slides/`：导出的 PDF 课件，命名为 `LNN-<slug>.pdf`，例如 `L07-embodied-ai.pdf`。
- `code/`：每讲一个公开代码文件夹 `LNN-<slug>/`，里面放一个 `README.md`，写清楚环境要求和运行方法。
- `_materials/`：协作者放原始材料的地方，已被 `.gitignore` 忽略，不会被提交。
- 网站其余代码（`site/` 下的组件、样式、配置，`.github/` 下的部署文件，以及 `.claude/`）不要动。

## 工作步骤

### 1. 弄清需求
确认两件事：用户提供了哪些材料（文件路径或链接），以及想要做什么（例如"新增第 7 周的讲次""删除第 8 周""按这份大纲更新第二部分，并上传课件"）。没说清楚就先问，不要猜。

### 2. 同步最新代码并新建分支（在修改任何文件之前）
1. 运行 `git status`。如果有未提交的改动、或者不在 main 上，停下来告诉用户，问清楚怎么处理，不要自行丢弃或覆盖。
2. `git checkout main && git pull origin main`
3. 确定分支名 `<名字>/<简短描述>`，例如 `zhuning/update-part2`：
   - 名字优先用 `gh api user -q .login`（已登录 GitHub CLI 时），否则用 `git config user.name`，转成小写、去掉空格。
   - 拿不到或者拿不准，就问用户。
   - 描述用简短的英文小写短横线形式。
4. `git checkout -b <分支名>`

### 3. 读懂现有结构
读 `site/src/data/course.ts`，弄清现有的数据结构、字段和编号方式，严格沿用，不要自己发明新字段。如果确实需要新字段，先停下来问用户。

### 4. 读材料
读用户提供的材料，提炼出要增加、修改或删除的内容。PPT 和 Word 只提取文字结构，不要照搬大段原文。如果读不了某种格式（例如 .pptx、.docx），请用户导出成 PDF 或 Markdown 再给你。

材料也可能是链接：公开网页直接读取。需要登录的链接（飞书、腾讯文档、Google Docs、网盘等）读不了时，请用户导出成文件放进 `_materials/`，不要凭标题猜内容。

### 5. 先列计划，等确认
用一个简短的表格列出计划：增加、修改、删除哪些讲次，每一讲的标题和简介（中英文）。等用户确认后再动手。

### 6. 修改
- 所有面向读者的文字都要写成中英双语 `{ en, zh }`。网站默认显示中文；英文由你翻译，要求准确简洁，术语保留通用英文写法。
- 讲次简介（`description`）每讲一到两句，说清这一讲讲什么、做什么，不写成大纲。
- 日期、地点、人名、阅读材料链接这类事实，材料里没写的就不要编，留空或写"待定"（`TBD`）。
- 删除或插入讲次后，检查讲次编号（L01、L02…）和周次是否连续，后续讲次要一起调整；对应的 `slides` 和 `code` 文件名如果需要同步改名，也一起改（用 `git mv`）。
- 用户提供了 PDF 课件：复制到 `slides/` 并按规范命名，在对应讲次里填上 `slides` 字段。单个 PDF 超过 20 MB 时提醒用户压缩。
- 有公开代码：放进 `code/LNN-<slug>/`，补一个 `README.md`，在对应讲次里填上 `code` 字段。
- 不要提交 .pptx、.key、.docx 等源文件，也不要提交用户的原始材料。
- 只改和这次需求相关的部分。别人负责的讲次和课程信息保持原样；如果需要改动或删除别人写的内容，先问用户。

### 7. 构建检查
```bash
cd site && npm install && npm run build
```
构建会自动检查 `course.ts` 引用的课件和代码目录是否存在。报错就修好再继续。用户想在本地预览时，运行 `npm run dev`，然后打开 http://localhost:5173/build-anything-lecture/ 。

### 8. 提交并开 Pull Request
1. 运行 `git status`，确认改动只涉及 `site/src/data/course.ts`、`slides/`、`code/`。如果有其他文件，先问用户。
2. 把 `git diff` 的摘要给用户看，等用户确认。
3. commit，message 用中文简要说明改了什么。
4. `git push -u origin <分支名>`：只推送这个分支，绝对不要推送 main，也不要 force push。
5. 开一个 Pull Request 到 main：
   - 已安装 GitHub CLI 时用 `gh pr create --base main`。
   - 没装 gh 时，告诉用户打开仓库页面，点 "Compare & pull request"。
   - PR 描述里列出：增加、修改、删除了哪些讲次，以及新增了哪些课件或代码文件。
6. 告诉用户：PR 由仓库管理员审核合并，合并后网站大约 1 分钟内自动更新。

## 注意

- 有任何不确定的地方，先问用户，不要自己决定。比如材料内容有歧义、和现有内容冲突，或者需要删除别人写的内容。
- `git pull` 或推送时遇到冲突，停下来把冲突情况告诉用户，不要自行覆盖别人的改动。
- 推送被拒绝（例如没有仓库写权限），把错误原样告诉用户，请他联系仓库管理员，不要尝试绕过。
