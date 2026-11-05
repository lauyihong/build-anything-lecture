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
  /** 讲课（lecture）部分的标题；嘉宾讲座填 guest，这里写讲座题目 */
  title: Localized;
  /** 实验（lab）部分的标题，显示为 “Lab 01：标题” */
  lab?: Localized;
  /** 大作业部分的标题，显示为 “大作业：标题” */
  project?: Localized;
  /** 标题下一行的内容简介 */
  description?: Localized;
  /** 嘉宾讲座：填了会显示为 “Guest Lecture: 名字” */
  guest?: Guest;
  readings?: Link[];
  /** slides/ 目录下的 PDF 文件名，例如 'L01-intro.pdf'；填了才显示 [Slides] */
  slides?: string;
  /** code/ 目录下的子目录名，例如 'L01-intro'；填了才显示 [Code] */
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

// 页面板块开关：内容准备好之前先隐藏
export const SECTIONS = {
  code: false,
  staff: false,
};

export const COURSE = {
  title: { en: 'Build Anything', zh: 'Build Anything' }, // TODO: 中文课名
  tagline: {
    en: 'Build robots that work in architectural space, from scratch.',
    zh: '在建筑空间里，从零搭建会工作的机器人。',
  },
  partner: { en: 'In collaboration with Tsinghua University', zh: '与清华大学合作' },
  term: { en: 'Spring 2027', zh: '2027 春季学期' },
  time: { en: 'Fridays, 1:30–4:55 PM', zh: '每周五 13:30–16:55' },
  location: { en: 'TBD', zh: '待定' }, // TODO: 上课地点 / 线上
  // 课程简介，每个元素是一段
  about: [
    {
      en: 'A hands-on elective for students in the School of Architecture, centered on robots that work in architectural space. In the first ten weeks, each session pairs a lecture with a lab: working in teams, students build a standard open-source robot from scratch and pick up the essentials of mechanical structure, electronics and control, perception, and simulation along the way. The last six weeks are devoted to a final project, in which each team designs and realizes a robot task in a real or simulated architectural space, alongside guest lectures on frontier topics from researchers and practitioners.',
      zh: '这是一门面向建筑学院学生的动手实践选修课，关注能在建筑空间中工作的机器人。前十周，每次课由讲授和实验两部分组成：同学们分组从零搭建一套标准的开源机器人，在动手的过程中理解机械结构、电子与控制、感知和仿真的基础知识。后六周以大作业为主，各组在真实或仿真的建筑空间里设计并实现一个机器人任务；同时我们会邀请来自学界和业界的嘉宾，带来前沿专题讲座。',
    },
  ] as Localized[],
  // TODO: 学习目标
  goals: [] as Localized[],
  // TODO: 先修要求
  prerequisites: [] as Localized[],
};

const TBD: Localized = { en: 'TBD', zh: '待定' };

// 课表：16 周。前 10 周每次课 = 讲授 + 实验（分组搭建一套标准开源机器人）；
// 后 6 周以大作业为主，配合嘉宾前沿专题讲座。具体内容待定。
export const PARTS: Part[] = [
  { number: 1, title: { en: 'Build: Lecture + Lab', zh: '动手搭建：讲授 + 实验' } },
  { number: 2, title: { en: 'Final Project & Frontier Topics', zh: '大作业与前沿专题' } },
];

const GUEST_TBD: Guest = { name: TBD };

export const LECTURES: Lecture[] = [
  { id: 'L01', week: 1, part: 1, title: TBD, lab: TBD },
  { id: 'L02', week: 2, part: 1, title: TBD, lab: TBD },
  { id: 'L03', week: 3, part: 1, title: TBD, lab: TBD },
  { id: 'L04', week: 4, part: 1, title: TBD, lab: TBD },
  { id: 'L05', week: 5, part: 1, title: TBD, lab: TBD },
  { id: 'L06', week: 6, part: 1, title: TBD, lab: TBD },
  { id: 'L07', week: 7, part: 1, title: TBD, lab: TBD },
  { id: 'L08', week: 8, part: 1, title: TBD, lab: TBD },
  { id: 'L09', week: 9, part: 1, title: TBD, lab: TBD },
  { id: 'L10', week: 10, part: 1, title: TBD, lab: TBD },
  { id: 'L11', week: 11, part: 2, title: TBD, guest: GUEST_TBD, project: TBD },
  { id: 'L12', week: 12, part: 2, title: TBD, guest: GUEST_TBD, project: TBD },
  { id: 'L13', week: 13, part: 2, title: TBD, guest: GUEST_TBD, project: TBD },
  { id: 'L14', week: 14, part: 2, title: TBD, guest: GUEST_TBD, project: TBD },
  { id: 'L15', week: 15, part: 2, title: TBD, guest: GUEST_TBD, project: TBD },
  { id: 'L16', week: 16, part: 2, title: TBD, guest: GUEST_TBD, project: TBD },
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
