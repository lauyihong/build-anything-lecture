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

function BracketLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="text-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-strong hover:decoration-current">
      [{children}]
    </a>
  );
}

function LabCell({ lecture: l }: { lecture: Lecture }) {
  const t = useT();
  const colon = useLang() === 'zh' ? '：' : ': ';
  return (
    <>
      {l.lab && (
        <p className="font-medium text-strong">
          Lab {l.id.slice(1)}. {t(l.lab)}
        </p>
      )}
      {l.project && (
        <p className="font-medium text-strong">
          {t(UI.project)}
          {colon}
          {t(l.project)}
        </p>
      )}
    </>
  );
}

function LectureCell({ lecture: l }: { lecture: Lecture }) {
  const t = useT();
  const colon = useLang() === 'zh' ? '：' : ': ';
  const base = import.meta.env.BASE_URL;

  return (
    <>
      <p className="font-medium text-strong">
        {l.id}. {t(l.title)}
      </p>
      {l.guest && (
        <p className="font-light text-muted">
          {t(UI.guestLecture)}
          {colon}
          {l.guest.url ? (
            <a
              href={l.guest.url}
              target="_blank"
              rel="noreferrer"
              className="text-strong underline decoration-line-strong underline-offset-2 transition-colors hover:decoration-current"
            >
              {t(l.guest.name)}
            </a>
          ) : (
            t(l.guest.name)
          )}
          {l.guest.affiliation && ` · ${t(l.guest.affiliation)}`}
        </p>
      )}
      {/* 窄屏没有 Lab 列，实验和大作业显示在课程内容下面 */}
      <div className="md:hidden">
        <LabCell lecture={l} />
      </div>
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
      {(l.slides || l.code || l.video) && (
        <p className="mt-2 flex flex-wrap gap-x-3 font-mono text-xs">
          {l.slides && <BracketLink href={`${base}slides/${l.slides}`}>{t(UI.slidesLink)}</BracketLink>}
          {l.code && <BracketLink href={`${REPO_URL}/tree/main/code/${l.code}`}>{t(UI.codeLink)}</BracketLink>}
          {l.video && <BracketLink href={l.video}>{t(UI.videoLink)}</BracketLink>}
        </p>
      )}
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
            <th className={`${th} hidden w-2/5 md:table-cell`}>{t(UI.colLab)}</th>
          </tr>
        </thead>
        {PARTS.map((p) => {
          const lectures = LECTURES.filter((l) => l.part === p.number);
          if (!lectures.length) return null;
          const weeks = lectures.map((l) => l.week);
          const range = `${Math.min(...weeks)}–${Math.max(...weeks)}`;
          const label =
            lang === 'zh'
              ? `第${CN_NUM[p.number - 1] ?? p.number}部分 · 第 ${range} 周`
              : `Part ${p.number} · Weeks ${range}`;
          return (
            <tbody key={p.number}>
              <tr className="border-b border-line-strong">
                <td colSpan={4} className="pb-4 pt-10">
                  <span className="label block text-[10px]">{label}</span>
                  <span className="mt-1 block text-lg font-medium text-strong">{t(p.title)}</span>
                </td>
              </tr>
              {lectures.map((l) => (
                <tr key={l.id} className="border-b border-line align-top transition-colors hover:bg-panel">
                  <td className="py-5 pr-4 font-mono text-xs text-muted">{String(l.week).padStart(2, '0')}</td>
                  <td className="py-5 pr-4 font-mono text-xs text-muted">{l.date ? formatDate(l.date, lang) : t(UI.tbd)}</td>
                  <td className="py-5 pr-4">
                    <LectureCell lecture={l} />
                  </td>
                  <td className="hidden py-5 md:table-cell">
                    <LabCell lecture={l} />
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
