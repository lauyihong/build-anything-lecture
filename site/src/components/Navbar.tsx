import { useState } from 'react';
import { ArrowRight, Menu, Moon, Sun, X } from 'lucide-react';
import { COURSE } from '../data/course';
import { UI, useT } from '../i18n';

interface Props {
  isDark: boolean;
  onToggleTheme: () => void;
  onToggleLang: () => void;
}

const LINKS = [
  { id: 'about', label: UI.about },
  { id: 'schedule', label: UI.schedule },
  { id: 'code', label: UI.code },
  { id: 'staff', label: UI.staff },
];

const iconButton =
  'inline-flex h-10 shrink-0 items-center justify-center rounded-full border border-line-strong transition-colors hover:bg-hover focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current';

export default function Navbar({ isDark, onToggleTheme, onToggleLang }: Props) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-40 w-full border-b border-line bg-nav backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between px-6 py-4 md:px-12">
        <a
          href="#top"
          onClick={() => setOpen(false)}
          className="font-mono text-sm font-bold uppercase tracking-tight transition-opacity hover:opacity-70"
        >
          {t(COURSE.title)}
        </a>

        <div className="ml-auto flex items-center gap-3 md:gap-8">
          <div className="hidden gap-8 md:flex">
            {LINKS.map((l) => (
              <a key={l.id} href={`#${l.id}`} className="label text-ink transition-colors hover:text-muted">
                {t(l.label)}
              </a>
            ))}
          </div>

          <button
            type="button"
            className="p-2 md:hidden"
            aria-label={t(open ? UI.closeMenu : UI.openMenu)}
            aria-expanded={open}
            onClick={() => setOpen(!open)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          <button
            type="button"
            onClick={onToggleLang}
            aria-label={t(UI.switchLangLabel)}
            title={t(UI.switchLangLabel)}
            className={`${iconButton} min-w-10 px-3 font-mono text-xs`}
          >
            {t(UI.switchLang)}
          </button>
          <button
            type="button"
            onClick={onToggleTheme}
            aria-label={t(isDark ? UI.toLight : UI.toDark)}
            title={t(isDark ? UI.toLight : UI.toDark)}
            aria-pressed={isDark}
            className={`${iconButton} w-10`}
          >
            {isDark ? <Sun className="h-4 w-4" aria-hidden /> : <Moon className="h-4 w-4" aria-hidden />}
          </button>
        </div>
      </div>

      {open && (
        <div className="absolute left-0 top-full flex w-full flex-col gap-4 border-b border-line-strong bg-page p-6 shadow-sm md:hidden">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              onClick={() => setOpen(false)}
              className="flex items-center justify-between pb-2 font-mono text-sm uppercase"
            >
              {t(l.label)}
              <ArrowRight className="h-3 w-3" />
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
