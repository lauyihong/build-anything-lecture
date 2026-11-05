import { useEffect, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import Navbar from './components/Navbar';
import Schedule from './components/Schedule';
import Section from './components/Section';
import { COURSE, HOMEPAGE_URL, REPO_URL, STAFF, type Localized } from './data/course';
import { LangContext, UI, initialLang, saveLang, type Lang } from './i18n';

const THEME_KEY = 'bal-theme';

const pillLink =
  'border-b border-line-strong pb-1 font-mono text-xs uppercase tracking-wider transition-colors hover:border-strong';
const textLink =
  'font-medium text-strong underline decoration-1 underline-offset-4 transition-opacity hover:opacity-70';

function List({ items, t }: { items: Localized[]; t: (s: Localized) => string }) {
  return (
    <ul className="list-disc space-y-2 pl-5 font-light leading-relaxed text-body marker:text-subtle">
      {items.map((i, idx) => (
        <li key={idx}>{t(i)}</li>
      ))}
    </ul>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang>(initialLang);
  const [isDark, setIsDark] = useState(() => document.documentElement.dataset.theme === 'dark');
  const t = (s: Localized) => s[lang];

  useEffect(() => {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = `${t(COURSE.title)} · ${t(COURSE.partner)}`;
  }, [lang]);

  // 没有手动选过主题时跟随系统。
  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const sync = () => {
      let saved: string | null = null;
      try {
        saved = localStorage.getItem(THEME_KEY);
      } catch {
        /* storage unavailable */
      }
      if (!saved) setIsDark(media.matches);
    };
    media.addEventListener('change', sync);
    return () => media.removeEventListener('change', sync);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light';
  }, [isDark]);

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    try {
      localStorage.setItem(THEME_KEY, next ? 'dark' : 'light');
    } catch {
      /* storage unavailable */
    }
  };

  const toggleLang = () => {
    const next = lang === 'en' ? 'zh' : 'en';
    setLang(next);
    saveLang(next);
  };

  return (
    <LangContext.Provider value={lang}>
      <div id="top" className="min-h-screen bg-page text-ink">
        <Navbar isDark={isDark} onToggleTheme={toggleTheme} onToggleLang={toggleLang} />

        <main>
          {/* Hero：版式与主页一致 */}
          <header className="border-b border-line pb-12 pt-28 md:pt-36">
            <div className="container mx-auto px-6 md:px-12 lg:px-24">
              <div className="grid grid-cols-1 items-start gap-x-8 gap-y-6 md:grid-cols-12">
                <div className="md:col-span-9 md:col-start-4">
                  <p className="label mb-3">{t(COURSE.partner)}</p>
                  <h1 className="text-4xl font-medium leading-tight text-strong md:text-5xl">{t(COURSE.title)}</h1>
                </div>

                <div className="flex flex-col gap-6 md:col-span-3">
                  <dl className="space-y-3">
                    <div>
                      <dt className="label text-[10px]">{t(UI.term)}</dt>
                      <dd className="mt-1 text-sm">{t(COURSE.term)}</dd>
                    </div>
                    <div>
                      <dt className="label text-[10px]">{t(UI.location)}</dt>
                      <dd className="mt-1 text-sm">{t(COURSE.location)}</dd>
                    </div>
                  </dl>
                  <div className="flex flex-wrap items-center gap-4">
                    <a href="#schedule" className={pillLink}>
                      {t(UI.slides)}
                    </a>
                    <a href="#code" className={pillLink}>
                      {t(UI.code)}
                    </a>
                    <a href={REPO_URL} target="_blank" rel="noreferrer" className={pillLink}>
                      {t(UI.repo)}
                    </a>
                  </div>
                </div>

                <div className="md:col-span-9">
                  <p className="text-xl font-light leading-relaxed text-body md:text-2xl">{t(COURSE.tagline)}</p>
                </div>
              </div>
            </div>
          </header>

          <Section id="about" title={t(UI.about)}>
            <div className="space-y-6 text-lg font-light leading-relaxed text-body">
              {COURSE.about.map((p, i) => (
                <p key={i}>{t(p)}</p>
              ))}
            </div>
            {COURSE.goals.length > 0 && (
              <div className="mt-10">
                <h3 className="label mb-4">{t(UI.goals)}</h3>
                <List items={COURSE.goals} t={t} />
              </div>
            )}
            {COURSE.prerequisites.length > 0 && (
              <div className="mt-10">
                <h3 className="label mb-4">{t(UI.prerequisites)}</h3>
                <List items={COURSE.prerequisites} t={t} />
              </div>
            )}
          </Section>

          <Section id="schedule" title={t(UI.schedule)}>
            <Schedule />
          </Section>

          <Section id="code" title={t(UI.code)}>
            <p className="mb-6 text-lg font-light leading-relaxed text-body">{t(UI.codeIntro)}</p>
            <pre className="mb-6 overflow-x-auto border border-line bg-panel p-4 font-mono text-sm text-body">
              <code>git clone {REPO_URL}.git</code>
            </pre>
            <a href={`${REPO_URL}/tree/main/code`} target="_blank" rel="noreferrer" className={`${textLink} inline-flex items-center gap-1`}>
              {t(UI.browseCode)}
              <ArrowUpRight className="h-4 w-4" aria-hidden />
            </a>
          </Section>

          <Section id="staff" title={t(UI.staff)}>
            <ul className="grid grid-cols-1 gap-8 sm:grid-cols-2">
              {STAFF.map((p) => (
                <li key={p.name.en}>
                  {p.url ? (
                    <a href={p.url} target="_blank" rel="noreferrer" className={`${textLink} text-lg`}>
                      {t(p.name)}
                    </a>
                  ) : (
                    <span className="text-lg font-medium text-strong">{t(p.name)}</span>
                  )}
                  <p className="mt-1 text-sm text-muted">{t(p.role)}</p>
                  <p className="font-mono text-xs text-subtle">{t(p.affiliation)}</p>
                </li>
              ))}
            </ul>
          </Section>
        </main>

        <footer className="py-16">
          <div className="container mx-auto flex flex-col gap-4 px-6 md:flex-row md:items-end md:justify-between md:px-12 lg:px-24">
            <div>
              <div className="mb-1 text-lg font-bold tracking-tight">{t(COURSE.title)}</div>
              <div className="label text-[10px]">{t(COURSE.partner)}</div>
            </div>
            <div className="flex flex-col gap-2 md:items-end">
              <div className="flex gap-6">
                <a href={HOMEPAGE_URL} className="text-sm text-muted transition-colors hover:text-strong">
                  {t(UI.backHome)}
                </a>
                <a href={REPO_URL} target="_blank" rel="noreferrer" className="text-sm text-muted transition-colors hover:text-strong">
                  GitHub
                </a>
              </div>
              <div className="font-mono text-[10px] uppercase tracking-widest text-subtle">{t(UI.license)}</div>
            </div>
          </div>
        </footer>
      </div>
    </LangContext.Provider>
  );
}
