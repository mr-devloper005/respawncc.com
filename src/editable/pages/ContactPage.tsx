'use client'

import { Building2, FileText, Image as ImageIcon, Mail, MapPin, Phone, Sparkles, Bookmark } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { getProductKind } from '@/design/factory/get-product-kind'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'

const tone = {
  shell: 'bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]',
  panel: 'border border-[var(--editable-border)] bg-[var(--slot4-surface-bg)]',
  soft: 'border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)]',
  muted: 'text-[var(--slot4-muted-text)]',
  action: 'bg-[var(--slot4-accent-fill)] text-[var(--slot4-on-accent)] hover:opacity-90',
}

function getLanes(kind: ReturnType<typeof getProductKind>) {
  if (kind === 'directory') {
    return [
      { icon: Building2, title: 'Business onboarding', body: 'Add listings, verify operational details, and bring your business surface live quickly.' },
      { icon: Phone, title: 'Partnership support', body: 'Talk through bulk publishing, local growth, and operational setup questions.' },
      { icon: MapPin, title: 'Coverage requests', body: 'Need a new geography or category lane? We can shape the directory around it.' },
    ]
  }
  if (kind === 'editorial') {
    return [
      { icon: FileText, title: 'Editorial submissions', body: 'Pitch essays, columns, and long-form ideas that fit the publication.' },
      { icon: Mail, title: 'Newsletter partnerships', body: 'Coordinate sponsorships, collaborations, and issue-level campaigns.' },
      { icon: Sparkles, title: 'Contributor support', body: 'Get help with voice, formatting, and publication workflow questions.' },
    ]
  }
  if (kind === 'visual') {
    return [
      { icon: ImageIcon, title: 'Creator collaborations', body: 'Discuss gallery launches, creator features, and visual campaigns.' },
      { icon: Sparkles, title: 'Licensing and use', body: 'Reach out about usage rights, commercial requests, and visual partnerships.' },
      { icon: Mail, title: 'Media kits', body: 'Request creator decks, editorial support, or visual feature placement.' },
    ]
  }
  return [
    { icon: Bookmark, title: 'Collection submissions', body: 'Suggest resources, boards, and links that deserve a place in the library.' },
    { icon: Mail, title: 'Resource partnerships', body: 'Coordinate curation projects, reference pages, and link programs.' },
    { icon: Sparkles, title: 'Curator support', body: 'Need help organizing shelves, collections, or profile-connected boards?' },
  ]
}

export default function ContactPage() {
  const { recipe } = getFactoryState()
  const productKind = getProductKind(recipe)
  const lanes = getLanes(productKind)

  return (
    <EditableSiteShell className={tone.shell}>
      <main className="bg-[var(--slot4-page-bg)]">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-4 py-16 sm:px-6 sm:py-20 lg:grid-cols-[0.9fr_1.1fr] lg:items-start lg:px-8">
          <div className="rounded-[1.75rem] bg-[#071a2b] p-6 text-white shadow-[0_24px_70px_rgba(7,26,43,.16)] sm:p-8 lg:p-10">
            <p className="text-sm font-bold text-[#14ffec]">{pagesContent.contact.eyebrow}</p>
            <h1 className="editable-display mt-4 text-5xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl">Let’s make the next connection easier.</h1>
            <p className="mt-5 max-w-2xl text-sm leading-8 text-white/65">{pagesContent.contact.description}</p>
            <div className="mt-8 space-y-4">
              {lanes.map((lane) => (
                <div key={lane.title} className="rounded-[1.25rem] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <lane.icon className="h-5 w-5 text-[#14ffec]" />
                  <h2 className="editable-display mt-3 text-xl font-semibold">{lane.title}</h2>
                  <p className="mt-2 text-sm leading-7 text-white/60">{lane.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className={`rounded-[1.75rem] p-7 shadow-[0_24px_70px_rgba(7,26,43,.18)] ${tone.panel}`}>
            <p className="text-sm font-bold text-[var(--slot4-accent)]">Tell us what you need</p>
            <h2 className="editable-display mt-2 text-3xl font-bold">{pagesContent.contact.formTitle}</h2>
            <EditableContactLeadForm />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
