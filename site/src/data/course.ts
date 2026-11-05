// 课程内容的唯一数据源：改这里，网站就会更新。
// Single source of truth for course content. Every user-facing string is bilingual.
//
// 带 TODO 的条目是占位内容，上线前请替换。

export type Localized = { en: string; zh: string };

export interface Lecture {
  /** 周次，从 1 开始 */
  week: number;
  /** 所属单元编号，对应 UNITS 里的 number */
  unit: number;
  /** 上课日期，ISO 格式，如 '2027-03-02'；未定就留空 */
  date?: string;
  title: Localized;
  /** 课堂内容 */
  summary?: Localized;
  /** 课后任务 */
  homework?: Localized;
  /** slides/ 目录下的 PDF 文件名，例如 'week-01-intro.pdf'；构建时会检查文件存在 */
  slides?: string;
  /** code/ 目录下的子目录名，例如 'week-01-intro'；构建时会检查目录存在 */
  code?: string;
  /** 录像或其他外部链接 */
  video?: string;
}

export interface Unit {
  number: number;
  title: Localized;
  note?: Localized;
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

// 课表参考 2026-10-08 版课程方案整理，日期待定。
export const UNITS: Unit[] = [
  {
    number: 1,
    title: { en: 'Assembling and Simulating a Simple Robot Arm', zh: '简单机械臂的组装与仿真' },
  },
  {
    number: 2,
    title: {
      en: 'Dual-Arm Mobile Robot Assembly and Vision Tasks',
      zh: '带有运动底盘的双机械臂组装与视觉任务训练',
    },
  },
  {
    number: 3,
    title: {
      en: 'Designing and Simulating Open-Source Robot Tasks in Architectural Spaces',
      zh: '空间单元中的开源仿真机器人任务设计与仿真',
    },
  },
  {
    number: 4,
    title: {
      en: 'Designing and Simulating a Service Robot for Architectural Space',
      zh: '一种建筑空间服务机器人的设计与仿真',
    },
    note: {
      en: 'Includes 2–3 salon talks; guest speakers also critique student work.',
      zh: '穿插 2–3 次沙龙讲座，嘉宾演讲后点评学生作业。',
    },
  },
];

export const LECTURES: Lecture[] = [
  // 第一单元
  {
    week: 1,
    unit: 1,
    title: { en: 'Course Introduction & Team Formation', zh: '课程介绍与分组' },
    summary: {
      en: 'Lecture: robotics fundamentals and learning resources, course overview and tasks, team formation.',
      zh: '讲课：机器人基础知识与学习资源，课程与任务介绍，学生分组。',
    },
    homework: {
      en: 'Pick up the kit, set up your computer and install the simulator, watch the assembly tutorial.',
      zh: '领取安装材料，配置电脑并安装仿真软件，观看组装教程。',
    },
  },
  {
    week: 2,
    unit: 1,
    title: { en: 'Robot Arm Assembly', zh: '机械臂组装' },
    summary: {
      en: 'Hands-on: assemble the robot arm in teams, with walkthroughs of key techniques and Q&A.',
      zh: '实操：分组组装机械臂，讲解关键技术点并答疑。',
    },
    homework: {
      en: 'Finish the assembly and try controlling the arm in simulation.',
      zh: '完成安装，并尝试进行仿真控制。',
    },
  },
  {
    week: 3,
    unit: 1,
    title: { en: 'Pick-and-Place Demo & Unit 1 Review', zh: '放置任务演示与第一单元汇报' },
    summary: {
      en: 'Demo: operate the arm to place an object; simulation and training techniques. Second half: team presentations reviewed by invited investors and clients.',
      zh: '演示：操作机械臂完成一次放置物品的操作，讲解仿真与训练技术点。后半节分组汇报，邀请投资人、业主甲方讲评。',
    },
    homework: {
      en: 'Submit the Unit 1 summary: video and lab report.',
      zh: '完成第一单元作业总结，提交视频、实验报告等。',
    },
  },
  // 第二单元
  {
    week: 4,
    unit: 2,
    title: { en: 'Dual-Arm Mobile Robots & Visual Perception', zh: '双臂移动机器人与视觉感知' },
    summary: {
      en: 'Lecture: assembling the dual-arm robot and methods for training visual perception.',
      zh: '讲课：机械臂组装与视觉感知训练方法。',
    },
    homework: {
      en: 'Pick up the kit, finish assembling the arms, read up on visual perception training algorithms.',
      zh: '领取安装材料，完成机械臂组装，阅读视觉感知训练相关算法。',
    },
  },
  {
    week: 5,
    unit: 2,
    title: { en: 'Motion Tuning & Vision Training', zh: '运动调试与视觉识别训练' },
    summary: {
      en: 'Hands-on: tune arm motion and train visual recognition, with walkthroughs of key techniques and Q&A.',
      zh: '实操：机械臂运动调试、视觉识别训练，讲解关键技术点并答疑。',
    },
    homework: {
      en: 'Define a visual recognition task and try writing the algorithm.',
      zh: '设定一个视觉识别任务，尝试编写算法。',
    },
  },
  {
    week: 6,
    unit: 2,
    title: { en: 'Mobile Manipulation Task & Unit 2 Review', zh: '移动搬运任务与第二单元汇报' },
    summary: {
      en: 'Hands-on: debug algorithms with in-class coaching; use visual recognition to move through space and carry objects. Second half: team presentations reviewed by industry experts.',
      zh: '实操：算法调试与课堂辅导，用视觉识别完成空间运动加搬运物品的任务。后半节分组汇报，邀请业内技术专家点评。',
    },
    homework: {
      en: 'Submit the Unit 2 summary: video and lab report.',
      zh: '完成第二单元作业总结，提交视频、实验报告等。',
    },
  },
  // 第三单元
  {
    week: 7,
    unit: 3,
    title: { en: 'Embodied AI & Spatial Perception', zh: '具身智能与空间感知' },
    summary: {
      en: 'Lecture: embodied intelligence and spatial perception and how they relate to architecture; walkthrough of an open-source robot case.',
      zh: '讲课：具身智能与空间感知，及其与建筑学的联系；讲解一个开源机器人案例。',
    },
    homework: {
      en: 'Model your own design project as a simulation environment, including non-visual physical properties such as mass and materials.',
      zh: '对个人作业进行仿真环境建模，考虑质量、材料属性等非视觉物理参数。',
    },
  },
  {
    week: 8,
    unit: 3,
    title: { en: 'Simulating an Open-Source Robot', zh: '开源机器人仿真' },
    summary: {
      en: 'Hands-on: simulate an open-source robot — moving through space, visual perception, object collisions.',
      zh: '实操：开源机器人的仿真，包括空间内的运动、视觉感知、物品碰撞等。',
    },
    homework: {
      en: 'Reproduce an open-source task.',
      zh: '复现一个开源任务。',
    },
  },
  {
    week: 9,
    unit: 3,
    title: { en: 'Reproduction Showcase', zh: '复现成果汇报' },
    summary: {
      en: 'Presentations: show the reproduced tasks and, drawing on all three units, discuss the feasibility of simple embodied spatial functions.',
      zh: '汇报：展示复现任务的成果，结合三个单元的训练，讨论简单具身空间功能的可行性。',
    },
    homework: {
      en: 'Submit the Unit 3 summary: video and simulation project files. Find existing robots with functions similar to your design concept.',
      zh: '完成第三单元作业总结，提交视频、仿真工程文件；根据设计概念，查找类似功能的机器人案例。',
    },
  },
  // 第四单元
  {
    week: 10,
    unit: 4,
    title: { en: 'Case Studies & Brainstorming', zh: '案例分享与头脑风暴' },
    summary: {
      en: 'Lecture: case studies and brainstorming.',
      zh: '讲课：案例分享，头脑风暴。',
    },
    homework: {
      en: 'Propose a design concept and argue its technical feasibility in simulation.',
      zh: '提出设计概念，并进行仿真可行性的技术论证。',
    },
  },
  {
    week: 11,
    unit: 4,
    title: { en: 'Technical Approach Review', zh: '技术路径汇报' },
    summary: {
      en: 'Team presentations: technical approach, boundary conditions of the simulation task, physical parameters, and how results will be validated.',
      zh: '汇报：分组汇报技术路径、仿真任务的边界条件、相关物理参数、结果验证方法。',
    },
    homework: {
      en: 'Develop the design and model the physical modules or how the structure moves.',
      zh: '深化设计方案，对物理模块或结构运动方式进行建模。',
    },
  },
  {
    week: 12,
    unit: 4,
    title: { en: 'Design Development: Control & Feedback', zh: '设计深化：控制与反馈' },
    summary: {
      en: 'Hands-on: review issues in the simulation model and discuss solutions.',
      zh: '实操：梳理仿真模型问题，讨论解决方案。',
    },
    homework: {
      en: 'Develop the design further and model the control and feedback mechanisms.',
      zh: '深化设计方案，对控制与反馈机制进行建模。',
    },
  },
  {
    week: 13,
    unit: 4,
    title: { en: 'Simulation & Tuning', zh: '仿真与调优' },
    summary: {
      en: 'Hands-on: review issues in the simulation model and discuss solutions.',
      zh: '实操：梳理仿真模型问题，讨论解决方案。',
    },
    homework: {
      en: 'Get first simulation results, then optimize and debug.',
      zh: '初步获得仿真结果，进行优化调试。',
    },
  },
  {
    week: 14,
    unit: 4,
    title: { en: 'Refinement', zh: '方案完善' },
    summary: {
      en: 'Hands-on: review issues in the simulation model and discuss solutions.',
      zh: '实操：梳理仿真模型问题，讨论解决方案。',
    },
    homework: {
      en: 'Finalize the design and simulation, prepare presentation materials.',
      zh: '完善设计与仿真任务，准备汇报资料。',
    },
  },
  {
    week: 15,
    unit: 4,
    title: { en: 'Final Presentations & Demos', zh: '期末汇报与演示' },
    summary: {
      en: 'Final presentations and demos.',
      zh: '汇报：最终汇报与演示。',
    },
    homework: {
      en: 'Submit summaries for all units: videos, project files and lab reports.',
      zh: '完成所有课程单元作业总结，提交视频、工程文件、实验报告等。',
    },
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
