import type { ReactNode } from 'react';
import { LECTURES, PARTS, REPO_URL, type Lecture } from '../data/course';
import { UI, useLang, useT, type Lang } from '../i18n';

// 结构参考 MIT 6.7920 的课表：按 Part 分段，每讲一格，
// “L01. 标题” 后面依次是简介、阅读材料、[Slides] [Code] 链接和作业。视觉沿用本站风格。

const CN_NUM = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

function formatDate(iso: string, lang: Lang) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', { month: '2-digit', day: '2-digit' }).format(
    new Date(y, m - 1, d),
  );
}

function BracketLink({ href, children }: { href?: string; children: ReactNode }) {
  const t = useT();
  if (!href) {
    return (
      <span className="cursor-default text-subtle" title={t(UI.notPosted)} aria-disabled="true">
        [{children}]
      </span>
    );
  }
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-strong hover:decoration-current">
      [{children}]
    </a>
  );
}

function LectureCell({ lecture: l }: { lecture: Lecture }) {
  const t = useT();
  const colon = useLang() === 'zh' ? '：' : ': ';
  const base = import.meta.env.BASE_URL;

  return (
    <>
      <p className="mb-1 font-medium text-strong">
        {l.id}. {l.guest ? `${t(UI.guestLecture)}${colon}${t(l.guest.name)}` : t(l.title)}
      </p>
      {l.guest && (
        <p className="font-light text-muted">
          {l.guest.url ? (
            <a href={l.guest.url} target="_blank" rel="noreferrer" className="text-strong underline decoration-line-strong underline-offset-2 transition-colors hover:decoration-current">
              {l.guest.affiliation ? t(l.guest.affiliation) : l.guest.url}
            </a>
          ) : (
            l.guest.affiliation && t(l.guest.affiliation)
          )}
          {' · '}
          {t(l.title)}
        </p>
      )}
      {l.description && <p className="font-light text-body">{t(l.description)}</p>}
      {l.readings && l.readings.length > 0 && (
        <p className="font-light text-muted">
          {t(UI.readings)}:{' '}
          {l.readings.map((r, i) => (
            <span key={i}>
              {i > 0 && ', '}
              {r.url ? (
                <a href={r.url} target="_blank" rel="noreferrer" className="text-strong underline decoration-line-strong underline-offset-2 transition-colors hover:decoration-current">
                  {r.label}
                </a>
              ) : (
                r.label
              )}
            </span>
          ))}
        </p>
      )}
      <p className="mt-2 flex flex-wrap gap-x-3 font-mono text-xs">
        <BracketLink href={l.slides && `${base}slides/${l.slides}`}>{t(UI.slidesLink)}</BracketLink>
        <BracketLink href={l.code && `${REPO_URL}/tree/main/code/${l.code}`}>{t(UI.codeLink)}</BracketLink>
        {l.video && <BracketLink href={l.video}>{t(UI.videoLink)}</BracketLink>}
      </p>
      {l.assignment && <p className="mt-2 font-medium text-strong">{t(l.assignment)}</p>}
    </>
  );
}

export default function Schedule() {
  const t = useT();
  const lang = useLang();
  const th = 'label pb-3 pr-4 text-left text-[10px] font-normal';

  return (
    <>
      <p className="mb-6 text-sm font-light text-muted">{t(UI.scheduleNote)}</p>
      <table className="w-full border-collapse text-sm leading-relaxed">
        <thead>
          <tr className="border-b border-line-strong">
            <th className={`${th} w-12`}>{t(UI.colWeek)}</th>
            <th className={`${th} w-20`}>{t(UI.colDate)}</th>
            <th className={th}>{t(UI.colLecture)}</th>
          </tr>
        </thead>
        {PARTS.map((p) => {
          const lectures = LECTURES.filter((l) => l.part === p.number);
          if (!lectures.length) return null;
          const label = lang === 'zh' ? `第${CN_NUM[p.number - 1] ?? p.number}部分` : `Part ${p.number}`;
          return (
            <tbody key={p.number}>
              <tr className="border-b border-line-strong">
                <td colSpan={3} className="pb-4 pt-10">
                  <span className="label block text-[10px]">{label}</span>
                  <span className="mt-1 block text-lg font-medium text-strong">{t(p.title)}</span>
                </td>
              </tr>
              {lectures.map((l) => (
                <tr key={l.id} className="border-b border-line align-top transition-colors hover:bg-panel">
                  <td className="py-5 pr-4 font-mono text-xs text-muted">{String(l.week).padStart(2, '0')}</td>
                  <td className="py-5 pr-4 font-mono text-xs text-muted">{l.date ? formatDate(l.date, lang) : t(UI.tbd)}</td>
                  <td className="py-5">
                    <LectureCell lecture={l} />
                  </td>
                </tr>
              ))}
            </tbody>
          );
        })}
      </table>
    </>
  );
}
