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
  /** 讲课（lecture）部分的标题；嘉宾讲座时写专题名称 */
  title: Localized;
  /** 实验（lab）部分的标题，显示为 “Lab 01：标题” */
  lab?: Localized;
  /** 大作业部分的标题，显示为 “大作业：标题” */
  project?: Localized;
  /** 标题下一行的内容简介 */
  description?: Localized;
  /** 嘉宾讲座：填了会在标题下面显示 “嘉宾：名字 · 单位” */
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
  title: { en: 'Designing and Building Robots', zh: '机器人设计与建造' },
  tagline: {
    en: 'Design and build an intelligent robot from scratch.',
    zh: '从零设计和建造一台智能机器人。',
  },
  partner: { en: 'In collaboration with Tsinghua University', zh: '与清华大学合作' },
  term: { en: 'Spring 2027', zh: '2027 春季学期' },
  time: { en: 'Fridays, 1:30–4:55 PM', zh: '每周五 13:30–16:55' },
  location: { en: 'TBD', zh: '待定' }, // TODO: 上课地点 / 线上
  // 课程简介，每个元素是一段
  about: [
    {
      en: 'As machine intelligence advances and mechanical and motor control technologies mature, robots are gradually making their way into everyday life, becoming new users of the built environment.',
      zh: '随着智能水平的提升和机械与电机控制技术的成熟，机器人正逐渐走进人们身边，成为建筑环境中的新用户。',
    },
    {
      en: 'This is a hands-on elective primarily for upper-year students in the School of Architecture. You will design and build, from scratch, an intelligent robot that can see, move and manipulate, and gain an in-depth understanding of how it works in complex environments shared with people.',
      zh: '这是一门主要面向建筑学院高年级学生的实践选修课。你将从零设计和建造一台能看、能动、能操作的智能机器人，并深入了解它如何在与人共处的复杂环境中工作。',
    },
    {
      en: 'The course consists of lectures and labs. The lectures systematically introduce the fundamentals of robot mechanisms, control, perception and learning. In the labs, you will work in teams to build an open-source robot kit, stepping through the frontier progress and learning methods of four directions: hardware design, robot manipulation, navigation and human-robot interaction. After the midterm, each team picks one of these directions for an exploratory final project, while guest speakers bring frontier topics in the corresponding direction each week. The course concludes with a final showcase.',
      zh: '课程由讲授和实验两部分组成。讲授部分将系统介绍机器人的机构、控制、感知与学习等基础知识。实验课上，你们将分组搭建一套开源的机器人套件，依次认识硬件设计、机器人操作、导航和人机交互四个方向上的前沿进展和学习方法。中期之后，各组选定其中一个方向，完成一项探索性的大作业；每周还会有嘉宾带来对应方向的前沿专题。课程以期末展示收尾。',
    },
  ] as Localized[],
  // TODO: 学习目标
  goals: [] as Localized[],
  // TODO: 先修要求
  prerequisites: [] as Localized[],
};

const TBD: Localized = { en: 'TBD', zh: '待定' };

// 课表：16 周。网站上只放标题，每周的具体安排在本地草稿里。
// 前 10 周每次课 = 讲授 + 实验，分组搭建一套标准开源机器人（SO-101 机械臂 + 移动底盘），
// 依次认识四个方向；感知放在 manipulation 之后（参考 MIT 6.4210 的顺序）。
// 控制为先：第 6 周用控制方法、第 7 周用学习方法完成同一个标准任务，学习方法只要求理解，
// 不要求学生训练，课上使用我们提前微调好的策略。标准任务：叠放积木（复用叠叠乐比赛的开发资源）。
// 后 6 周以大作业为主，每周一个嘉宾专题；第 16 周期末展示。
export const PARTS: Part[] = [
  { number: 1, title: { en: 'Foundations: Four Directions, Core Methods', zh: '基础：四个方向与基本方法' } },
  { number: 2, title: { en: 'Exploration: Final Project & Frontier Topics', zh: '探索：大作业与前沿专题' } },
];

const GUEST_TBD: Guest = { name: TBD };

export const LECTURES: Lecture[] = [
  {
    id: 'L01',
    week: 1,
    part: 1,
    title: { en: 'Robotics at a Glance: Four Directions', zh: '机器人概览：四个方向' },
    lab: { en: 'Kit Check-in, Setup & Team Formation', zh: '领取套件，配置环境，分组' },
  },
  {
    id: 'L02',
    week: 2,
    part: 1,
    title: { en: 'Hardware: Mechanisms, Actuators & Sensors', zh: '硬件：机构、驱动与传感器' },
    lab: { en: 'Assembling the Follower Arm', zh: '组装从臂' },
  },
  {
    id: 'L03',
    week: 3,
    part: 1,
    title: { en: 'Control & Kinematics Basics', zh: '控制与运动学基础' },
    lab: { en: 'Leader Arm, Calibration & Teleoperation', zh: '组装主臂，标定与遥操作' },
  },
  {
    id: 'L04',
    week: 4,
    part: 1,
    title: { en: 'Manipulation: Pick and Place with Known Poses', zh: '操作：已知位置下的抓取与放置' },
    lab: { en: 'Scripted Pick and Place at Fixed Positions', zh: '在固定位置编程完成抓取与放置' },
  },
  {
    id: 'L05',
    week: 5,
    part: 1,
    title: { en: 'Perception: From Known Poses to Seeing', zh: '感知：从“已知位置”到“自己看见”' },
    lab: { en: 'Camera Setup & Vision-Guided Grasping', zh: '加装相机，视觉引导抓取' },
  },
  {
    id: 'L06',
    week: 6,
    part: 1,
    title: { en: 'Control Methods: Perception in the Loop', zh: '控制方法：把感知接进控制回路' },
    lab: { en: 'Block Stacking with Control', zh: '用控制方法叠放积木' },
  },
  {
    id: 'L07',
    week: 7,
    part: 1,
    title: { en: 'Learning Methods: Imitation Learning & Foundation Models', zh: '学习方法：模仿学习与基础模型' },
    lab: { en: 'Block Stacking with a Pre-trained Policy: Control vs. Learning', zh: '用预训练策略叠放积木，对比控制与学习' },
  },
  {
    id: 'L08',
    week: 8,
    part: 1,
    title: { en: 'Navigation: Mapping, Localization & Planning', zh: '导航：建图、定位与规划' },
    lab: { en: 'Mobile Base Assembly & Basic Navigation', zh: '装上移动底盘，遥控与简单导航' },
  },
  {
    id: 'L09',
    week: 9,
    part: 1,
    title: { en: 'HRI: Robots in Shared Spaces', zh: '人机交互：共享空间中的机器人' },
    lab: { en: 'Building a Simple Interactive Behavior', zh: '实现一个简单的交互行为' },
  },
  {
    id: 'L10',
    week: 10,
    part: 1,
    title: { en: 'Asking a Good Question', zh: '如何提出一个好问题' },
    lab: { en: 'Midterm Showcase & Project Proposals', zh: '中期展示与开题' },
  },
  {
    id: 'L11',
    week: 11,
    part: 2,
    title: { en: 'Frontiers in Hardware Design', zh: '硬件设计前沿' },
    guest: GUEST_TBD,
    project: { en: 'Refining the Question & Evaluation Plan', zh: '确定问题与评估方式' },
  },
  {
    id: 'L12',
    week: 12,
    part: 2,
    title: { en: 'Frontiers in Manipulation', zh: '操作前沿' },
    guest: GUEST_TBD,
    project: { en: 'First Prototype on the Robot', zh: '第一版原型上真机' },
  },
  {
    id: 'L13',
    week: 13,
    part: 2,
    title: { en: 'Frontiers in Navigation', zh: '导航前沿' },
    guest: GUEST_TBD,
    project: { en: 'Check-in & Iteration', zh: '中期检查与迭代' },
  },
  {
    id: 'L14',
    week: 14,
    part: 2,
    title: { en: 'Frontiers in Human-Robot Interaction', zh: '人机交互前沿' },
    guest: GUEST_TBD,
    project: { en: 'Experiments & Evaluation', zh: '实验与评估' },
  },
  {
    id: 'L15',
    week: 15,
    part: 2,
    title: { en: 'Embodied Foundation Models', zh: '具身智能基础模型' },
    guest: GUEST_TBD,
    project: { en: 'Polishing & Showcase Prep', zh: '完善与展示准备' },
  },
  { id: 'L16', week: 16, part: 2, title: { en: 'Final Showcase', zh: '期末展示' } },
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
