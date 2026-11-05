import { LECTURES, REPO_URL, type Lecture } from '../data/course';
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

export default function Schedule() {
  const t = useT();
  const lang = useLang();
  const th = 'label pb-3 pr-4 text-left text-[10px] font-normal';

  return (
    <table className="w-full border-collapse">
      <thead>
        <tr className="border-b border-line-strong">
          <th className={`${th} w-12`}>{t(UI.colNumber)}</th>
          <th className={`${th} hidden w-36 md:table-cell`}>{t(UI.colDate)}</th>
          <th className={th}>{t(UI.colTopic)}</th>
          <th className={`${th} hidden w-40 md:table-cell`}>{t(UI.colMaterials)}</th>
        </tr>
      </thead>
      <tbody>
        {LECTURES.map((l) => (
          <tr key={l.number} className="border-b border-line align-top transition-colors hover:bg-panel">
            <td className="py-5 pr-4 font-mono text-xs text-muted">{String(l.number).padStart(2, '0')}</td>
            <td className="hidden py-5 pr-4 font-mono text-xs text-muted md:table-cell">
              {l.date ? formatDate(l.date, lang) : t(UI.tbd)}
            </td>
            <td className="py-5 pr-4">
              <span className="mb-1 block font-medium">{t(l.title)}</span>
              {l.summary && <span className="block text-sm font-light leading-relaxed text-muted">{t(l.summary)}</span>}
              <div className="mt-2 space-y-2 md:hidden">
                <span className="block font-mono text-xs text-subtle">{l.date ? formatDate(l.date, lang) : t(UI.tbd)}</span>
                <Materials lecture={l} />
              </div>
            </td>
            <td className="hidden py-5 md:table-cell">
              <Materials lecture={l} />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
