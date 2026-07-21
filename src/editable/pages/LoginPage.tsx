import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] gap-0 px-4 py-16 sm:px-6 lg:grid-cols-[1fr_.85fr] lg:px-8">
          <div className="relative flex flex-col justify-center overflow-hidden rounded-t-[2rem] bg-[#071a2b] p-8 text-white lg:rounded-l-[2rem] lg:rounded-tr-none lg:p-14">
            <span className="absolute -right-16 -top-16 h-52 w-52 rounded-full border-[38px] border-[#0d7377]" />
            <p className="relative text-sm font-bold text-[#14ffec]">{pagesContent.auth.login.badge}</p>
            <h1 className="editable-display relative mt-4 max-w-xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl">Welcome back to the directory.</h1>
            <p className="relative mt-5 max-w-lg text-base leading-8 text-white/65">{pagesContent.auth.login.description}</p>
          </div>
          <div className="flex flex-col justify-center rounded-b-[2rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_20px_60px_rgba(7,26,43,.09)] sm:p-10 lg:rounded-r-[2rem] lg:rounded-bl-none">
            <p className="text-sm font-bold text-[var(--slot4-accent)]">Member access</p><h2 className="editable-display mt-2 text-3xl font-bold">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">New here? <Link href="/signup" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.login.createCta}</Link></p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
