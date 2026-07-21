'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, Search, X, ArrowUpRight, Plus } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const navItems = useMemo(
    () => SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').map((task) => ({ label: task.label, href: task.route })),
    []
  )
  const featured = navItems.slice(0, 4)

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/95 text-[var(--editable-nav-text)] backdrop-blur-xl">
      <nav className="mx-auto flex min-h-[78px] w-full max-w-[var(--editable-container)] items-center gap-5 px-4 sm:px-6 lg:px-8">
        <Link href="/" className="group flex shrink-0 items-center gap-3" aria-label={`${SITE_CONFIG.name} home`}>
          <span className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-[var(--editable-border)] bg-white shadow-[4px_4px_0_#14ffec] transition group-hover:-translate-y-0.5">
            <img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" />
          </span>
          <span className="editable-display max-w-[210px] truncate text-2xl font-bold tracking-[-0.04em]">{SITE_CONFIG.name}</span>
        </Link>

        <div className="mx-auto hidden items-center gap-1 lg:flex">
          <Link href="/" className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pathname === '/' ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'hover:bg-[var(--slot4-panel-bg)]'}`}>Home</Link>
          {featured.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
            return <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-semibold transition ${active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'hover:bg-[var(--slot4-panel-bg)]'}`}>{item.label}</Link>
          })}
          <Link href="/contact" className={`rounded-full px-4 py-2 text-sm font-semibold transition ${pathname === '/contact' ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-accent)]' : 'hover:bg-[var(--slot4-panel-bg)]'}`}>Contact</Link>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <Link href="/search" className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] transition hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-accent)]" aria-label="Search"><Search className="h-4 w-4" /></Link>
          {session ? (
            <>
              <Link href="/create" className="hidden items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--slot4-accent)] sm:inline-flex"><Plus className="h-4 w-4" /> Create</Link>
              <button type="button" onClick={logout} className="hidden text-sm font-semibold text-[var(--slot4-muted-text)] hover:text-[var(--slot4-accent)] sm:block">Logout</button>
            </>
          ) : (
            <Link href="/signup" className="hidden items-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[var(--slot4-accent)] sm:inline-flex">Get started <ArrowUpRight className="h-4 w-4" /></Link>
          )}
          <button type="button" onClick={() => setOpen((value) => !value)} className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--editable-border)] lg:hidden" aria-label="Toggle menu">{open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}</button>
        </div>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-4 py-5 lg:hidden">
          <form action="/search" className="mb-4 flex items-center gap-3 rounded-full border border-[var(--editable-border)] px-4 focus-within:border-[var(--slot4-accent)]">
            <Search className="h-4 w-4 text-[var(--slot4-accent)]" />
            <input name="q" type="search" placeholder="Search the directory" className="min-w-0 flex-1 bg-transparent py-3 text-sm outline-none" />
          </form>
          <div className="grid grid-cols-2 gap-2">
            {[{ label: 'Home', href: '/' }, ...navItems, { label: 'Contact', href: '/contact' }, ...(session ? [{ label: 'Create', href: '/create' }] : [{ label: 'Login', href: '/login' }, { label: 'Sign up', href: '/signup' }])].map((item) => (
              <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="rounded-xl bg-[var(--slot4-panel-bg)] px-4 py-3 text-sm font-semibold hover:bg-[var(--slot4-accent-soft)] hover:text-[var(--slot4-accent)]">{item.label}</Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  )
}
