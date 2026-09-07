'use client';

import { BookOpen, ChevronRight, FileText, Search, ShieldCheck } from 'lucide-react';
import { useMemo, useState } from 'react';

import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const articles = [
  {
    id: 'getting-started',
    title: 'Getting Started',
    summary: 'Portal orientation and authorized system access.',
    sections: ['Access model', 'Organization context', 'Next steps'],
  },
  {
    id: 'architecture',
    title: 'Architecture',
    summary: 'Conceptual system boundaries and information flow.',
    sections: ['Platform layers', 'Data flow', 'Control flow'],
  },
  {
    id: 'hardware-integration',
    title: 'Hardware Integration',
    summary: 'Compute, sensing, power and platform interfaces.',
    sections: ['Integration boundary', 'Device identity', 'Health signals'],
  },
  {
    id: 'software-runtime',
    title: 'Software Runtime',
    summary: 'Runtime supervision, compatibility and lifecycle.',
    sections: ['Runtime model', 'Resource limits', 'Release channels'],
  },
  {
    id: 'networking',
    title: 'Networking',
    summary: 'Authenticated communication and intermittent links.',
    sections: ['Trust boundary', 'Connectivity states', 'Offline operation'],
  },
  {
    id: 'ai-integration',
    title: 'AI Integration',
    summary: 'Bounded reasoning and model integration.',
    sections: ['Model boundary', 'Authorization', 'Observability'],
  },
  {
    id: 'vates-integration',
    title: 'VATES Integration',
    summary: 'Perception outputs and world-model contributions.',
    sections: ['Observations', 'Freshness', 'Confidence'],
  },
  {
    id: 'sofia-integration',
    title: 'SOFIA Integration',
    summary: 'Reasoning, agents and orchestration boundaries.',
    sections: ['Reasoning context', 'Agent boundaries', 'Auditability'],
  },
  {
    id: 'operations',
    title: 'Operations',
    summary: 'Health monitoring, events and operator workflows.',
    sections: ['System state', 'Exceptions', 'Activity'],
  },
  {
    id: 'maintenance',
    title: 'Maintenance',
    summary: 'Scheduled work, diagnostics and audit history.',
    sections: ['Maintenance state', 'Diagnostics', 'Return to service'],
  },
  {
    id: 'security',
    title: 'Security',
    summary: 'Identity, authorization and secure software lifecycle.',
    sections: ['Identity', 'Access control', 'Software integrity'],
  },
] as const;

export function DocumentationBrowser() {
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState<string>('getting-started');
  const visibleArticles = useMemo(
    () =>
      articles.filter((article) =>
        `${article.title} ${article.summary} ${article.sections.join(' ')}`
          .toLowerCase()
          .includes(query.trim().toLowerCase()),
      ),
    [query],
  );
  const hasMatches = visibleArticles.length > 0;
  const selected =
    visibleArticles.find((article) => article.id === selectedId) ??
    visibleArticles[0] ??
    articles[0];

  return (
    <div className="border border-white/10 bg-[#0e1115] lg:grid lg:min-h-[680px] lg:grid-cols-[250px_minmax(0,1fr)_210px]">
      <aside className="border-b border-white/10 lg:border-b-0 lg:border-r">
        <div className="border-b border-white/10 p-4">
          <label htmlFor="docs-search" className="sr-only">
            Search documentation
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-white/55" />
            <Input
              id="docs-search"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search documentation"
              className="h-10 rounded-none border-white/10 bg-black/20 pl-10 text-white"
            />
          </div>
        </div>
        <nav
          aria-label="Documentation categories"
          className="max-h-72 overflow-y-auto p-2 lg:max-h-[612px]"
        >
          {visibleArticles.map((article) => (
            <button
              key={article.id}
              type="button"
              onClick={() => setSelectedId(article.id)}
              className={cn(
                'flex w-full items-center justify-between border-l-2 px-3 py-3 text-left text-[11px] font-medium transition',
                selected.id === article.id
                  ? 'border-red-500 bg-white/5 text-white'
                  : 'border-transparent text-white/55 hover:bg-white/3 hover:text-white/72',
              )}
              aria-current={selected.id === article.id ? 'page' : undefined}
            >
              {article.title}
              <ChevronRight className="size-3.5 text-white/55" />
            </button>
          ))}
          {visibleArticles.length === 0 ? (
            <p className="p-4 text-xs text-white/55">
              No documentation categories match this search.
            </p>
          ) : null}
        </nav>
      </aside>
      <article className="px-5 py-8 sm:px-8 lg:px-10 lg:py-10">
        {hasMatches ? (
          <>
            <div className="flex items-center gap-3">
              <BookOpen className="size-5 text-red-500" />
              <span className="font-mono text-[8px] uppercase tracking-[0.16em] text-white/55">
                PRAETORIAN documentation
              </span>
            </div>
            <h2 className="mt-6 text-3xl font-semibold tracking-[-0.04em] text-white">
              {selected.title}
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/60">
              {selected.summary} This initial documentation explains the intended interface
              and integration concepts without representing deployed customer
              infrastructure.
            </p>
            <div className="mt-9 rounded-none border-l-2 border-sky-400 bg-sky-950/10 p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.11em] text-sky-200/75">
                Development documentation
              </p>
              <p className="mt-2 text-xs leading-5 text-sky-100/50">
                Validate all procedures, configuration values and compatibility guidance
                against the approved production documentation service.
              </p>
            </div>
            <div className="mt-10 space-y-10">
              {selected.sections.map((section, index) => (
                <section key={section} id={`${selected.id}-${index + 1}`}>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-[9px] text-red-500">0{index + 1}</span>
                    <h3 className="text-lg font-semibold text-white/80">{section}</h3>
                  </div>
                  <p className="mt-4 max-w-3xl text-sm leading-7 text-white/55">
                    PRAETORIAN treats {section.toLowerCase()} as an explicit system concern.
                    Interfaces expose current state, relevant context and a traceable
                    boundary so authorized teams can reason about behavior without relying
                    on hidden assumptions.
                  </p>
                  {index === 1 ? (
                    <div className="mt-5 border border-white/8 bg-black/25 p-4 font-mono text-[10px] leading-6 text-white/55">
                      <span className="text-red-400">BOUNDARY</span> → authenticated request
                      → validated contract → observable result
                    </div>
                  ) : null}
                </section>
              ))}
            </div>
            <div className="mt-12 flex items-start gap-3 border-t border-white/10 pt-6 text-xs leading-5 text-white/55">
              <ShieldCheck className="mt-0.5 size-4 shrink-0" /> Security-sensitive
              integration details belong in access-controlled, reviewed documentation—not in
              public frontend source.
            </div>
          </>
        ) : (
          <div role="status" className="grid min-h-64 place-content-center text-center">
            <Search className="mx-auto size-6 text-red-500" />
            <h2 className="mt-5 text-lg font-semibold text-white">
              No matching documentation
            </h2>
            <p className="mt-2 text-sm text-white/55">
              Try a broader architecture, integration or operations term.
            </p>
          </div>
        )}
      </article>
      <aside
        className={cn(
          'hidden border-l border-white/10 p-5',
          hasMatches ? 'lg:block' : 'lg:hidden',
        )}
      >
        <p className="font-mono text-[8px] font-semibold uppercase tracking-[0.16em] text-white/55">
          On this page
        </p>
        <ol className="mt-5 space-y-3">
          {selected.sections.map((section, index) => (
            <li key={section}>
              <a
                href={`#${selected.id}-${index + 1}`}
                className="flex items-start gap-2 text-[11px] leading-5 text-white/55 transition hover:text-white"
              >
                <FileText className="mt-0.5 size-3 shrink-0" />
                {section}
              </a>
            </li>
          ))}
        </ol>
      </aside>
    </div>
  );
}
