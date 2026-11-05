import { LECTURES, REPO_URL, UNITS, type Lecture, type Localized } from '../data/course';
import { UI, useLang, useT, type Lang } from '../i18n';

const link =
  'font-mono text-xs text-muted underline decoration-line-strong underline-offset-2 transition-colors hover:text-strong hover:decoration-current';

function formatDate(iso: string, lang: Lang) {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(lang === 'zh' ? 'zh-CN' : 'en-US', {
    month: 'short',
    day: 'numeric',
    weekday: 'short',
  }).format(new Date(y, m - 1, d));
}

function Materials({ lecture }: { lecture: Lecture }) {
  const t = useT();
  const base = import.meta.env.BASE_URL;
  const items = [
    lecture.slides && { label: t(UI.slides), href: `${base}slides/${lecture.slides}` },
    lecture.code && { label: t(UI.code), href: `${REPO_URL}/tree/main/code/${lecture.code}` },
    lecture.video && { label: t(UI.video), href: lecture.video },
  ].filter((x): x is { label: string; href: string } => Boolean(x));

  if (!items.length) return <span className="font-mono text-xs text-subtle">{t(UI.comingSoon)}</span>;
  return (
    <div className="flex flex-wrap gap-3">
      {items.map((i) => (
        <a key={i.label} href={i.href} target="_blank" rel="noreferrer" className={link}>
          {i.label}
        </a>
      ))}
    </div>
  );
}

const UNIT_NAMES = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];

function unitLabel(n: number, first: number, last: number, lang: Lang) {
  const weeks = first === last ? `${first}` : `${first}–${last}`;
  return lang === 'zh'
    ? `第${UNIT_NAMES[n - 1] ?? n}单元 · 第 ${weeks} 周`
    : `Unit ${n} · Week${first === last ? '' : 's'} ${weeks}`;
}

function LectureRow({ lecture: l }: { lecture: Lecture }) {
  const t = useT();
  const lang = useLang();
  const date = l.date ? formatDate(l.date, lang) : t(UI.tbd);
  const after = (s: Localized) => (
    <span className="mt-2 block text-sm font-light leading-relaxed text-muted">
      <span className="mr-2 font-mono text-[10px] uppercase tracking-wider text-subtle">{t(UI.afterClass)}</span>
      {t(s)}
    </span>
  );

  return (
    <tr className="border-b border-line align-top transition-colors hover:bg-panel">
      <td className="py-5 pr-4 font-mono text-xs text-muted">{String(l.week).padStart(2, '0')}</td>
      <td className="hidden py-5 pr-4 font-mono text-xs text-muted md:table-cell">{date}</td>
      <td className="py-5 pr-4">
        <span className="mb-1 block font-medium">{t(l.title)}</span>
        {l.summary && <span className="block text-sm font-light leading-relaxed text-body">{t(l.summary)}</span>}
        {l.homework && after(l.homework)}
        <div className="mt-3 space-y-2 md:hidden">
          <span className="block font-mono text-xs text-subtle">{date}</span>
          <Materials lecture={l} />
        </div>
      </td>
      <td className="hidden py-5 md:table-cell">
        <Materials lecture={l} />
      </td>
    </tr>
  );
}

export default function Schedule() {
  const t = useT();
  const lang = useLang();
  const th = 'label pb-3 pr-4 text-left text-[10px] font-normal';

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-line-strong">
          <th className={`${th} w-12`}>{t(UI.colWeek)}</th>
          <th className={`${th} hidden w-36 md:table-cell`}>{t(UI.colDate)}</th>
          <th className={th}>{t(UI.colTopic)}</th>
          <th className={`${th} hidden w-32 md:table-cell`}>{t(UI.colMaterials)}</th>
        </tr>
      </thead>
      {UNITS.map((u) => {
        const lectures = LECTURES.filter((l) => l.unit === u.number);
        if (!lectures.length) return null;
        const weeks = lectures.map((l) => l.week);
        return (
          <tbody key={u.number}>
            <tr className="border-b border-line-strong">
              <td colSpan={4} className="pb-4 pt-10">
                <span className="label block text-[10px]">
                  {unitLabel(u.number, Math.min(...weeks), Math.max(...weeks), lang)}
                </span>
                <span className="mt-1 block text-lg font-medium text-strong">{t(u.title)}</span>
                {u.note && <span className="mt-1 block text-sm font-light text-muted">{t(u.note)}</span>}
              </td>
            </tr>
            {lectures.map((l) => (
              <LectureRow key={l.week} lecture={l} />
            ))}
          </tbody>
        );
      })}
    </table>
  );
}
