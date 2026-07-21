import { ArrowUpRight, Compass, Layers3, Sparkles } from 'lucide-react'
import Link from 'next/link'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const icons = [Compass, Layers3, Sparkles]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)]">
        <section className="relative overflow-hidden bg-[#071a2b] text-white">
          <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border-[54px] border-[#0d7377]" />
          <div className="absolute -bottom-40 -left-24 h-80 w-80 rotate-45 rounded-[4rem] bg-[#0d7377]/75" />
          <div className="relative mx-auto max-w-[var(--editable-container)] px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
            <p className="text-sm font-bold text-[#14ffec]">{pagesContent.about.badge}</p>
            <h1 className="editable-display mt-5 max-w-4xl text-5xl font-bold leading-[.98] tracking-[-.05em] sm:text-6xl lg:text-7xl">A clearer way to discover useful work.</h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-white/65">{pagesContent.about.description}</p>
            <Link href="/contact" className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#14ffec] px-6 py-3 text-sm font-bold text-[#071a2b]">Start a conversation <ArrowUpRight className="h-4 w-4" /></Link>
          </div>
        </section>
        <section className="mx-auto max-w-[var(--editable-container)] px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div><p className="text-sm font-bold text-[var(--slot4-accent)]">Why {SITE_CONFIG.name}</p><h2 className="editable-display mt-3 text-4xl font-bold tracking-[-.04em]">Built around simple, useful discovery.</h2><div className="mt-6 space-y-4 text-base leading-8 text-[var(--slot4-muted-text)]">{pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</div></div>
            <div className="grid gap-5 sm:grid-cols-2">
              {pagesContent.about.values.map((value, index) => { const Icon = icons[index] || Sparkles; return <article key={value.title} className={`rounded-[1.4rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_16px_45px_rgba(7,26,43,.06)] ${index === 0 ? 'sm:col-span-2' : ''}`}><span className="flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]"><Icon className="h-5 w-5" /></span><h3 className="editable-display mt-5 text-xl font-bold">{value.title}</h3><p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p></article> })}
            </div>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
