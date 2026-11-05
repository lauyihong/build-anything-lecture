import { createContext, useContext } from 'react';
import type { Localized } from './data/course';

export type Lang = 'en' | 'zh';

export const UI = {
  about: { en: 'About', zh: '课程简介' },
  schedule: { en: 'Schedule', zh: '课程安排' },
  code: { en: 'Code', zh: '代码' },
  staff: { en: 'Staff', zh: '教学团队' },
  goals: { en: 'Learning goals', zh: '学习目标' },
  prerequisites: { en: 'Prerequisites', zh: '先修要求' },
  term: { en: 'Term', zh: '学期' },
  time: { en: 'Time', zh: '时间' },
  location: { en: 'Location', zh: '地点' },
  repo: { en: 'GitHub', zh: 'GitHub' },
  colWeek: { en: 'Wk', zh: '周' },
  colLecture: { en: 'Lecture', zh: '课程内容' },
  readings: { en: 'Readings', zh: '阅读材料' },
  guestLecture: { en: 'Guest Lecture', zh: '嘉宾讲座' },
  slidesLink: { en: 'Slides', zh: '课件' },
  codeLink: { en: 'Code', zh: '代码' },
  videoLink: { en: 'Video', zh: '录像' },
  notPosted: { en: 'Not posted yet', zh: '尚未发布' },
  scheduleNote: {
    en: 'Note: The schedule is subject to change and will be updated with slides and code as the course progresses.',
    zh: '注：课表可能会有调整，课件和代码会随课程进度陆续更新。',
  },
  colDate: { en: 'Date', zh: '日期' },
  colTopic: { en: 'Topic', zh: '主题' },
  slides: { en: 'slides', zh: '课件' },
  tbd: { en: 'TBD', zh: '待定' },
  codeIntro: {
    en: 'All public code for the course lives in the code/ directory of the repository, one folder per lecture.',
    zh: '课程所有公开代码都在仓库的 code/ 目录下，每讲一个文件夹。',
  },
  browseCode: { en: 'Browse code on GitHub', zh: '在 GitHub 上浏览代码' },
  backHome: { en: 'Yifeng Liu', zh: '刘伊丰' },
  switchLang: { en: '中文', zh: 'EN' },
  switchLangLabel: { en: 'Switch to Chinese', zh: '切换到英文' },
  toDark: { en: 'Switch to dark mode', zh: '切换到暗色模式' },
  toLight: { en: 'Switch to light mode', zh: '切换到亮色模式' },
  openMenu: { en: 'Open navigation menu', zh: '打开导航菜单' },
  closeMenu: { en: 'Close navigation menu', zh: '关闭导航菜单' },
  license: {
    en: 'Slides and code are shared for educational use.',
    zh: '课件与代码仅供学习交流使用。',
  },
} satisfies Record<string, Localized>;

export const LangContext = createContext<Lang>('en');

/** 返回一个取当前语言文本的函数：t(UI.about) 或 t(lecture.title) */
export function useT() {
  const lang = useContext(LangContext);
  return (s: Localized) => s[lang];
}

export function useLang() {
  return useContext(LangContext);
}

const STORAGE_KEY = 'bal-lang';

export function initialLang(): Lang {
  const param = new URLSearchParams(window.location.search).get('lang');
  if (param === 'en' || param === 'zh') return param;
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'zh') return saved;
  } catch {
    /* storage unavailable */
  }
  // 默认中文；英文需要手动切换或带 ?lang=en
  return 'zh';
}

export function saveLang(lang: Lang) {
  try {
    localStorage.setItem(STORAGE_KEY, lang);
  } catch {
    /* storage unavailable */
  }
}
