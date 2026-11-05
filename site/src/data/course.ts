// 课程内容的唯一数据源：改这里，网站就会更新。
// Single source of truth for course content. Every user-facing string is bilingual.
//
// 带 TODO 的条目是占位内容，上线前请替换。

export type Localized = { en: string; zh: string };

export interface Lecture {
  /** 讲次编号，从 1 开始 */
  number: number;
  /** 上课日期，ISO 格式，如 '2026-03-02'；未定就留空 */
  date?: string;
  title: Localized;
  summary?: Localized;
  /** slides/ 目录下的 PDF 文件名，例如 'lecture-01-intro.pdf'；构建时会检查文件存在 */
  slides?: string;
  /** code/ 目录下的子目录名，例如 'lecture-01-intro'；构建时会检查目录存在 */
  code?: string;
  /** 录像或其他外部链接 */
  video?: string;
}

export interface Person {
  name: Localized;
  role: Localized;
  affiliation: Localized;
  url?: string;
}

export const REPO_URL = 'https://github.com/lauyihong/build-anything-lecture';
export const HOMEPAGE_URL = 'https://lauyihong.github.io/';

export const COURSE = {
  title: { en: 'Build Anything', zh: 'Build Anything' }, // TODO: 中文课名
  // TODO: 一句话介绍
  tagline: {
    en: 'A course on building things end to end.',
    zh: '一门关于从零到一把东西做出来的课程。',
  },
  partner: { en: 'In collaboration with Tsinghua University', zh: '与清华大学合作' },
  term: { en: 'TBD', zh: '待定' }, // TODO: 如 'Spring 2027' / '2027 春季学期'
  location: { en: 'TBD', zh: '待定' }, // TODO: 上课地点 / 线上
  // TODO: 课程简介，每个元素是一段
  about: [
    {
      en: 'Course description coming soon.',
      zh: '课程简介即将发布。',
    },
  ] as Localized[],
  // TODO: 学习目标
  goals: [] as Localized[],
  // TODO: 先修要求
  prerequisites: [] as Localized[],
};

export const LECTURES: Lecture[] = [
  // TODO: 按实际课表填写。示例：
  // {
  //   number: 1,
  //   date: '2027-03-02',
  //   title: { en: 'Introduction', zh: '课程介绍' },
  //   summary: { en: '…', zh: '…' },
  //   slides: 'lecture-01-intro.pdf',
  //   code: 'lecture-01-intro',
  // },
  {
    number: 1,
    title: { en: 'Introduction', zh: '课程介绍' },
  },
];

export const STAFF: Person[] = [
  {
    name: { en: 'Ning Zhu', zh: '朱宁' },
    role: { en: 'Instructor', zh: '主讲' }, // TODO: 确认角色
    affiliation: { en: 'Tsinghua University', zh: '清华大学' },
    url: 'https://www.arch.tsinghua.edu.cn/info/rw_jzx/1404',
  },
  {
    name: { en: 'Jinggu Jia', zh: '贾京谷' }, // TODO: 确认英文名拼写
    role: { en: 'Instructor', zh: '主讲' }, // TODO: 确认角色
    affiliation: { en: 'Tsinghua University', zh: '清华大学' }, // TODO: 确认单位
  },
  {
    name: { en: 'Yifeng Liu', zh: '刘伊丰' },
    role: { en: 'Instructor', zh: '主讲' },
    affiliation: { en: 'MIT Media Lab', zh: 'MIT 媒体实验室' },
    url: HOMEPAGE_URL,
  },
  // TODO: 助教
];
