// 课程内容的唯一数据源：改这里，网站就会更新。
// Single source of truth for course content. Every user-facing string is bilingual.
//
// 带 TODO 的条目是占位内容，上线前请替换。

export type Localized = { en: string; zh: string };

export interface Link {
  label: string;
  url?: string;
}

export interface Guest {
  name: Localized;
  affiliation?: Localized;
  url?: string;
}

export interface Lecture {
  /** 讲次编号，显示为 L01、L02… */
  id: string;
  /** 周次 */
  week: number;
  /** 所属 Part，对应 PARTS 里的 number */
  part: number;
  /** 上课日期，ISO 格式，如 '2027-03-02'；未定就留空 */
  date?: string;
  title: Localized;
  /** 标题下一行的内容简介 */
  description?: Localized;
  /** 嘉宾讲座：填了会显示为 “Guest Lecture: 名字” */
  guest?: Guest;
  readings?: Link[];
  /** slides/ 目录下的 PDF 文件名，例如 'L01-intro.pdf'；没填时显示为灰色占位 [Slides] */
  slides?: string;
  /** code/ 目录下的子目录名，例如 'L01-intro'；没填时显示为灰色占位 [Code] */
  code?: string;
  /** 录像链接，填了才显示 [Video] */
  video?: string;
  /** 加粗显示的作业 / 截止信息，例如 { en: 'HW1 assigned', zh: '布置作业 1' } */
  assignment?: Localized;
}

export interface Part {
  number: number;
  title: Localized;
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
  term: { en: 'Spring 2027', zh: '2027 春季学期' },
  time: { en: 'Fridays, 1:30–4:55 PM', zh: '每周五 13:30–16:55' },
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

const TBD: Localized = { en: 'TBD', zh: '待定' };

// 课表骨架：15 周、4 个 Part，内容待定。
export const PARTS: Part[] = [
  { number: 1, title: TBD },
  { number: 2, title: TBD },
  { number: 3, title: TBD },
  { number: 4, title: TBD },
];

export const LECTURES: Lecture[] = [
  { id: 'L01', week: 1, part: 1, title: TBD },
  { id: 'L02', week: 2, part: 1, title: TBD },
  { id: 'L03', week: 3, part: 1, title: TBD },
  { id: 'L04', week: 4, part: 2, title: TBD },
  { id: 'L05', week: 5, part: 2, title: TBD },
  { id: 'L06', week: 6, part: 2, title: TBD },
  { id: 'L07', week: 7, part: 3, title: TBD },
  { id: 'L08', week: 8, part: 3, title: TBD },
  { id: 'L09', week: 9, part: 3, title: TBD },
  { id: 'L10', week: 10, part: 4, title: TBD },
  { id: 'L11', week: 11, part: 4, title: TBD },
  {
    id: 'L12',
    week: 12,
    part: 4,
    title: TBD, // TODO: 讲座题目
    guest: {
      name: { en: 'Ning Zhu', zh: '朱宁' },
      affiliation: { en: 'Tsinghua University', zh: '清华大学' },
      url: 'https://www.arch.tsinghua.edu.cn/info/rw_jzx/1404',
    },
  },
  { id: 'L13', week: 13, part: 4, title: TBD },
  { id: 'L14', week: 14, part: 4, title: TBD },
  { id: 'L15', week: 15, part: 4, title: TBD },
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
