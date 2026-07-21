import type { Metadata } from 'next'
import Link from 'next/link'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalSignupForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/signup', title: 'Sign up', description: pagesContent.auth.signup.metadataDescription })
}

export default function SignupPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-12rem)] max-w-[var(--editable-container)] gap-0 px-4 py-16 sm:px-6 lg:grid-cols-[.85fr_1fr] lg:px-8">
          <div className="flex flex-col justify-center rounded-t-[2rem] border border-[var(--editable-border)] bg-white p-7 shadow-[0_20px_60px_rgba(7,26,43,.09)] sm:p-10 lg:rounded-l-[2rem] lg:rounded-tr-none">
            <p className="text-sm font-bold text-[var(--slot4-accent)]">New here?</p><h1 className="editable-display mt-2 text-3xl font-bold">{pagesContent.auth.signup.formTitle}</h1>
            <EditableLocalSignupForm />
            <p className="mt-6 text-sm text-[var(--slot4-muted-text)]">Already have an account? <Link href="/login" className="font-semibold text-[var(--slot4-accent)] underline-offset-4 hover:underline">{pagesContent.auth.signup.loginCta}</Link></p>
          </div>
          <div className="relative flex flex-col justify-center overflow-hidden rounded-b-[2rem] bg-[#071a2b] p-8 text-white lg:rounded-r-[2rem] lg:rounded-bl-none lg:p-14">
            <span className="absolute -right-16 -bottom-16 h-52 w-52 rounded-full border-[38px] border-[#0d7377]" />
            <p className="relative text-sm font-bold text-[#14ffec]">{pagesContent.auth.signup.badge}</p>
            <h2 className="editable-display relative mt-4 max-w-xl text-4xl font-bold leading-[1.02] tracking-[-0.045em] sm:text-6xl">Join the useful side of the web.</h2>
            <p className="relative mt-5 max-w-lg text-base leading-8 text-white/65">{pagesContent.auth.signup.description}</p>
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
