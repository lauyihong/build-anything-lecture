# “机器人设计与建造”课程网站：内容更新指南

课程网站的内容（课表、讲次、课件、公开代码）由大家一起维护。你不需要懂前端，把材料交给 AI 助手，它会按仓库里写好的规则修改，并帮你提交一个 Pull Request，由管理员审核合并。合并后网站自动更新：https://lauyihong.github.io/build-anything-lecture/

## 准备（第一次使用时做一次）

1. 安装 Git 和 Node.js（版本 20 或以上）。
2. 确认你已经被加为仓库协作者（GitHub 会发邀请邮件，接受即可）。没有的话请联系管理员。
3. 克隆仓库：
   ```bash
   git clone https://github.com/lauyihong/build-anything-lecture.git
   ```
4. 推荐：安装 GitHub CLI（https://cli.github.com ），然后运行 `gh auth login` 登录。这样 AI 可以直接帮你开 PR。不装也行，推完分支后在 GitHub 网页上点 "Compare & pull request" 即可。
5. 推荐使用 [Claude Code](https://claude.com/claude-code)。其他能读写本地文件的 AI 助手（比如 Cursor）也可以，用法见下面。

## 使用方法

1. 把你的材料（Word / Markdown / PPT / PDF）放进仓库里的 `_materials/` 文件夹（没有就新建一个）。这个文件夹不会被提交。
2. 在仓库目录里打开 AI 助手，告诉它你想做什么：

   **Claude Code**：仓库里已经配好了 `update-course` 这个 skill，直接说需求即可，比如：

   ```
   /update-course 按 _materials/unit2.docx 更新第二部分的内容，并上传 _materials/L04.pdf 作为第 4 讲的课件
   ```

   不加 `/update-course`、直接用中文描述需求，一般也会自动用上这个 skill。

   **其他 AI 助手**（Codex、Cursor、Copilot 等）：大多会自动读取仓库根目录的 `AGENTS.md`，从那里找到规则。保险起见，第一句话可以明确让它先读规则文件：

   ```
   请先阅读 .claude/skills/update-course/SKILL.md，严格按照里面的步骤工作。
   我的需求：按 _materials/unit2.docx 更新第二部分的内容，并上传 _materials/L04.pdf 作为第 4 讲的课件。
   ```

3. AI 会先列一个修改计划给你确认，改完后给你看改动摘要，你确认后它会新建分支、推送并开 PR。全程不会直接改动 main。

## 规则在哪里

AI 遵守的全部规则（数据结构、双语要求、命名规范、提交流程）都写在 [`.claude/skills/update-course/SKILL.md`](.claude/skills/update-course/SKILL.md)。需要调整规则时改这一个文件即可。
