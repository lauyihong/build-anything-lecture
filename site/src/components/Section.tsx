import type { ReactNode } from 'react';

// 与主页 Section 相同的版式：左侧 3 栏小标签，右侧 9 栏内容。
export default function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} className="border-b border-line py-16 md:py-20">
      <div className="container mx-auto px-6 md:px-12 lg:px-24">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-12 md:gap-8">
          <div className="md:col-span-3">
            <h2 className="label md:sticky md:top-32">{title}</h2>
          </div>
          <div className="min-w-0 md:col-span-9">{children}</div>
        </div>
      </div>
    </section>
  );
}
