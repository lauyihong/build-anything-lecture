# Slides / 课件

导出的 PDF 课件放在这里，命名为 `week-NN-<slug>.pdf`，例如 `week-01-intro.pdf`。

放好文件后，在 `site/src/data/course.ts` 对应那一周里写上 `slides: 'week-01-intro.pdf'`，网站上就会出现课件链接。如果填了文件名但文件不存在，构建会直接报错。

- 单个文件尽量控制在 20 MB 以内（GitHub 超过 50 MB 会警告，超过 100 MB 会拒收）。PowerPoint 和 Keynote 导出时可以选“压缩图片”或“降低文件大小”。
- 只提交 PDF；`.pptx` 和 `.key` 源文件已经写进 `.gitignore`。

---

Exported PDF slides go here, named `week-NN-<slug>.pdf`. Reference the file name from `site/src/data/course.ts` and the site links to it; the build fails if a referenced file is missing.
