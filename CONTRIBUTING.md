# Build Anything 课程网站：内容更新指南

## 准备（第一次使用时做一次）
1. 安装 Git 和 Node.js（版本 20 或以上）
2. 克隆仓库：
   ```bash
   git clone https://github.com/lauyihong/build-anything-lecture.git
   ```
3. 可选：安装 GitHub CLI（https://cli.github.com），然后运行 `gh auth login` 登录。
   这样 AI 可以直接帮你开 PR；不装也行，推完分支后在 GitHub 网页上点 "Compare & pull request" 即可。
4. 用支持读写本地文件的 AI 助手（比如 Claude Code、Cursor）打开这个仓库目录。

## 使用方法
把你的材料（Word / Markdown / PPT / PDF）放进仓库目录里，
复制下面 "-----" 之间的 prompt，填好最上面的两项，发给 AI。

-----

```text
你是 "Build Anything" 课程网站的内容维护助手。课程网站仓库是
https://github.com/lauyihong/build-anything-lecture，你现在就在这个仓库的根目录里工作。

## 我的信息
- 我的名字（拼音，用于分支名）：<例如 zhuning>
- 我提供的材料：<文件路径，例如 ./my-notes/unit2.docx>
- 我想要：<例如"新增第 7 周的讲次" / "删除第 8 周" / "按这份大纲更新第二部分的内容，并上传课件">

## 仓库结构（动手前先读一遍确认，以实际文件为准）
- site/src/data/course.ts：课程内容的唯一数据源，包括课程信息、课表（PARTS 分段、LECTURES 讲次）、教学团队。网站上的文字都从这里来。
- slides/：导出的 PDF 课件，命名为 LNN-<slug>.pdf，例如 L07-embodied-ai.pdf
- code/：每讲一个公开代码文件夹 LNN-<slug>/，里面放一个 README.md，写清楚环境要求和运行方法
- 网站其余代码（组件、样式、配置、.github 下的部署文件）不要动。

## 工作步骤
1. 先读 site/src/data/course.ts，弄清楚现有的数据结构、字段和编号方式，严格沿用，不要自己发明新字段。
   如果确实需要新字段，先停下来问我。
2. 读我提供的材料，提炼出要增加、修改或删除的内容。PPT 和 Word 只提取文字结构，不要照搬大段原文。
3. 改动前，先用一个简短的表格列出计划：增加、修改、删除了哪些讲次，以及每一讲的标题和简介，等我确认后再改。
4. 修改时遵守这些规则：
   - 所有面向读者的文字都要写成中英双语 { en, zh }。网站默认显示中文；英文由你翻译，要求准确简洁，术语保留通用英文写法。
   - 讲次简介（description）每讲一到两句，说清这一讲讲什么、做什么，不写成大纲。
   - 日期、地点、人名、阅读材料链接这类事实，材料里没写的就不要编，留空或写"待定"。
   - 删除或插入讲次后，检查讲次编号（L01、L02…）和周次是否连续，后续讲次要一起调整，并检查对应的 slides 和 code 文件名是否需要同步改名。
   - 如果我提供了 PDF 课件，把它复制到 slides/ 并按规范命名，再在对应讲次里填上 slides 字段。
     单个 PDF 超过 20 MB 时提醒我压缩。不要提交 .pptx、.key、.docx 等源文件。
   - 如果有公开代码，放进 code/LNN-<slug>/，补一个 README.md，并在对应讲次里填上 code 字段。
   - 只改和我的需求相关的部分，别人负责的讲次和课程信息保持原样。
5. 修改完成后运行构建检查：
   cd site && npm install && npm run build
   构建会自动检查 course.ts 引用的课件和代码目录是否存在。如果报错，修好再继续。
   如果我想在本地预览，运行 npm run dev，然后打开 http://localhost:5173/build-anything-lecture/
6. 把 git diff 的摘要给我看。我确认后：
   - 先同步最新代码：git checkout main && git pull origin main
   - 新建分支，命名为 <我的名字>/<简短描述>，例如 zhuning/update-part2
   - commit message 用中文简要说明改了什么
   - 只推送这个分支，绝对不要推送 main，也不要 force push
   - 开一个 Pull Request 到 main（用 gh pr create；如果没装 gh，就告诉我去 GitHub 网页上点 "Compare & pull request"）。
     PR 描述里列出：增加、修改、删除了哪些讲次，以及新增了哪些课件或代码文件
   - PR 由仓库管理员审核合并，合并后网站会自动更新到 https://lauyihong.github.io/build-anything-lecture/

## 注意
- 有任何不确定的地方，先问我，不要自己决定。比如材料内容有歧义、和现有内容冲突，或者需要删除别人写的内容。
- 如果 git pull 或推送时遇到冲突，停下来把冲突情况告诉我，不要自行覆盖别人的改动。
```

-----
