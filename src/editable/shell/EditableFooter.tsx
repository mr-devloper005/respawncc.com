'use client'

import Link from 'next/link'
import { ArrowUpRight, Mail } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

export function EditableFooter() {
  const taskLinks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  const { session, logout } = useEditableLocalAuthSession()

  return (
    <footer className="bg-[var(--editable-footer-bg)] text-white">
      <div className="border-b border-white/10">
        <div className="mx-auto flex max-w-[var(--editable-container)] flex-col gap-6 px-4 py-10 sm:px-6 md:flex-row md:items-center md:justify-between lg:px-8">
          <div><p className="text-sm font-semibold text-[#14ffec]">Ready when you are</p><h2 className="editable-display mt-1 text-3xl font-bold">Find your next useful connection.</h2></div>
          <Link href="/create" className="inline-flex w-fit items-center gap-2 rounded-full bg-[#14ffec] px-6 py-3 text-sm font-bold text-[#071a2b] transition hover:-translate-y-0.5">Share a post <ArrowUpRight className="h-4 w-4" /></Link>
        </div>
      </div>
      <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-4 py-14 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.35fr_.8fr_.8fr_1.2fr] lg:px-8">
        <div>
          <Link href="/" className="inline-flex items-center gap-3"><span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white"><img src="/favicon.png" alt={`${SITE_CONFIG.name} logo`} className="h-full w-full object-cover" /></span><span className="editable-display text-2xl font-bold">{SITE_CONFIG.name}</span></Link>
          <p className="mt-5 max-w-sm text-sm leading-7 text-white/60">{globalContent.footer?.description || SITE_CONFIG.description}</p>
        </div>
        <div><h3 className="text-sm font-bold">Explore</h3><div className="mt-5 grid gap-3">{taskLinks.slice(0, 4).map((task) => <Link key={task.key} href={task.route} className="text-sm text-white/60 transition hover:text-[#14ffec]">{task.label}</Link>)}</div></div>
        <div><h3 className="text-sm font-bold">More</h3><div className="mt-5 grid gap-3"><Link href="/about" className="text-sm text-white/60 hover:text-[#14ffec]">About</Link><Link href="/contact" className="text-sm text-white/60 hover:text-[#14ffec]">Contact</Link>{session ? <><Link href="/create" className="text-sm text-white/60 hover:text-[#14ffec]">Create</Link><button type="button" onClick={logout} className="text-left text-sm text-white/60 hover:text-[#14ffec]">Logout</button></> : <><Link href="/login" className="text-sm text-white/60 hover:text-[#14ffec]">Login</Link><Link href="/signup" className="text-sm text-white/60 hover:text-[#14ffec]">Sign up</Link></>}</div></div>
        <div><h3 className="text-sm font-bold">Stay in the loop</h3><p className="mt-5 text-sm leading-7 text-white/60">Browse new opportunities and useful updates as they arrive.</p><form action="/search" className="mt-5 flex overflow-hidden rounded-xl bg-white/10"><input name="q" placeholder="What are you looking for?" className="min-w-0 flex-1 bg-transparent px-4 py-3 text-sm text-white outline-none placeholder:text-white/35" /><button className="px-4 text-[#14ffec]" aria-label="Search"><Mail className="h-4 w-4" /></button></form></div>
      </div>
      <div className="border-t border-white/10"><div className="mx-auto flex max-w-[var(--editable-container)] flex-col gap-2 px-4 py-5 text-xs text-white/45 sm:flex-row sm:justify-between sm:px-6 lg:px-8"><span>© {new Date().getFullYear()} {SITE_CONFIG.name}. All rights reserved.</span><span>Made for curious, independent work.</span></div></div>
    </footer>
  )
}
