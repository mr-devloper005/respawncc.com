import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Bookmark, BriefcaseBusiness, FileText, Image as ImageIcon, Megaphone, Search, Sparkles, UserRound } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { SITE_CONFIG } from '@/lib/site-config'
import { getEditableCategory, getEditableExcerpt, getEditablePostImage, postHref } from '@/editable/cards/PostCards'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-4 sm:px-6 lg:px-8'
const iconByTask: Record<TaskKey, typeof FileText> = { article: FileText, listing: BriefcaseBusiness, classified: Megaphone, image: ImageIcon, sbm: Bookmark, pdf: FileText, profile: UserRound }

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  return posts.filter((post) => {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function allPosts(posts: SitePost[], timeSections: HomeTimeSection[]) {
  return dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
}

function safeTitle(post?: SitePost | null) {
  return post?.title?.trim() || 'A fresh opportunity worth exploring'
}

export function EditableHomeHero({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = allPosts(posts, timeSections)
  const feature = pool[0]
  const featureHref = feature ? postHref(primaryTask, feature, primaryRoute) : primaryRoute
  const featureImage = feature ? getEditablePostImage(feature) : '/placeholder.svg?height=900&width=1200'
  const categories = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile').slice(0, 5)

  return (
    <section className="relative isolate overflow-hidden bg-[#071a2b] text-white">
      <div className="absolute -left-36 bottom-[-8rem] h-[25rem] w-[25rem] rotate-45 rounded-[4rem] bg-[#0d7377] opacity-80" />
      <div className="absolute right-[-9rem] bottom-[-15rem] h-[38rem] w-[38rem] rotate-45 rounded-[6rem] bg-[#0d7377] opacity-75" />
      <div className="absolute left-[13%] top-8 h-14 w-7 -rotate-[28deg] rounded-full bg-[#14ffec] opacity-80" />
      <div className="absolute right-[12%] top-16 h-20 w-20 rounded-full border-[14px] border-[#14ffec]/65" />
      <div className="absolute bottom-12 left-1/2 h-16 w-16 rounded-full border-[12px] border-[#14ffec]/70" />

      <div className={`relative grid min-h-[650px] items-center gap-12 py-16 lg:grid-cols-[.92fr_1.08fr] lg:py-20 ${container}`}>
        <div className="relative z-10 max-w-xl">
          <p className="text-sm font-bold text-[#14ffec]">The independent work directory</p>
          <h1 className="editable-display mt-5 text-5xl font-bold leading-[.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">Good work finds<br />good people.</h1>
          <p className="mt-6 max-w-lg text-base leading-8 text-white/68 sm:text-lg">Discover freelance talent, useful offers, and practical opportunities in one lively, easy-to-browse place.</p>
          <form action="/search" className="mt-8 flex max-w-xl items-center rounded-full bg-white p-1.5 text-[#212121] shadow-[0_20px_60px_rgba(0,0,0,.3)]">
            <Search className="ml-4 h-5 w-5 shrink-0 text-[#0d7377]" />
            <input name="q" placeholder="Search people, services, or opportunities" className="min-w-0 flex-1 bg-transparent px-3 py-3 text-sm outline-none placeholder:text-[#788487]" />
            <button className="rounded-full bg-[#0d7377] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#095e61]">Discover</button>
          </form>
          <div className="mt-5 flex flex-wrap gap-2">{categories.map((task) => <Link key={task.key} href={task.route} className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-xs font-semibold text-white/75 transition hover:border-[#14ffec] hover:text-[#14ffec]">{task.label}</Link>)}</div>
        </div>

        <Link href={featureHref} className="group relative mx-auto block w-full max-w-[560px] lg:ml-auto">
          <div className="absolute -inset-3 rotate-3 rounded-[3rem] bg-[#14ffec]/20" />
          <div className="relative aspect-[4/5] max-h-[535px] overflow-hidden rounded-[2.5rem_2.5rem_7rem_2.5rem] border border-white/15 bg-[#323232]">
            <img src={featureImage} alt={safeTitle(feature)} className="h-full w-full object-cover opacity-85 transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(7,26,43,.92))]" />
            <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
              <span className="rounded-full bg-[#14ffec] px-3 py-1 text-[10px] font-bold uppercase tracking-[.18em] text-[#071a2b]">Featured now</span>
              <h2 className="editable-display mt-4 max-w-md text-3xl font-bold leading-tight">{safeTitle(feature)}</h2>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[#14ffec]">View details <ArrowUpRight className="h-4 w-4" /></span>
            </div>
          </div>
        </Link>
      </div>
    </section>
  )
}

export function EditableStoryRail({ primaryRoute }: HomeSectionProps) {
  const tasks = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
  if (!tasks.length) return null
  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`py-16 sm:py-20 ${container}`}>
        <div className="text-center"><p className="text-sm font-bold text-[var(--slot4-accent)]">Choose your path</p><h2 className="editable-display mt-3 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Explore the directory</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--slot4-muted-text)]">Jump into the section that fits what you need today.</p></div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {tasks.map((task, index) => {
            const Icon = iconByTask[task.key]
            return (
              <Link key={task.key} href={task.route} className={`group relative overflow-hidden rounded-[1.4rem] border bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-[0_22px_55px_rgba(7,26,43,.11)] ${index === 1 ? 'border-[var(--slot4-accent)]' : 'border-[var(--editable-border)]'}`}>
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[var(--slot4-accent)] text-white transition group-hover:rotate-3 group-hover:bg-[#071a2b]"><Icon className="h-6 w-6" /></span>
                <h3 className="editable-display mt-6 text-xl font-bold">{task.label}</h3>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">Browse fresh {task.label.toLowerCase()} with clear details and quick ways to connect.</p>
                <ArrowUpRight className="absolute right-6 top-6 h-5 w-5 text-[var(--slot4-accent)] opacity-0 transition group-hover:opacity-100" />
              </Link>
            )
          })}
        </div>
        <div className="mt-8 text-center"><Link href={primaryRoute} className="inline-flex items-center gap-2 text-sm font-bold text-[var(--slot4-accent)]">Browse all updates <ArrowRight className="h-4 w-4" /></Link></div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = allPosts(posts, timeSections).slice(0, 6)
  if (!items.length) return null
  return (
    <section className="bg-white">
      <div className={`py-16 sm:py-24 ${container}`}>
        <div className="text-center"><p className="text-sm font-bold text-[var(--slot4-accent)]">Just added</p><h2 className="editable-display mt-3 text-4xl font-bold tracking-[-.04em] sm:text-5xl">Fresh finds</h2><p className="mx-auto mt-4 max-w-2xl leading-7 text-[var(--slot4-muted-text)]">A changing mix of offers, ideas, and useful work.</p></div>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((post, index) => (
            <Link key={post.id || post.slug || index} href={postHref(primaryTask, post, primaryRoute)} className={`group relative overflow-hidden rounded-[1.25rem] bg-[var(--slot4-media-bg)] ${index === 0 ? 'md:col-span-2 lg:row-span-2' : ''}`}>
              <div className={index === 0 ? 'min-h-[520px] h-full' : 'aspect-[4/3]'}><img src={getEditablePostImage(post)} alt={safeTitle(post)} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" /></div>
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_30%,rgba(7,26,43,.9))]" />
              <div className="absolute inset-x-0 bottom-0 p-5 sm:p-7"><span className="text-xs font-bold uppercase tracking-[.16em] text-[#14ffec]">{getEditableCategory(post)}</span><h3 className={`editable-display mt-2 line-clamp-2 font-bold leading-tight text-white ${index === 0 ? 'text-3xl sm:text-4xl' : 'text-xl'}`}>{safeTitle(post)}</h3></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryTask, primaryRoute, posts, timeSections }: HomeSectionProps) {
  const items = allPosts(posts, timeSections).slice(6, 12)
  if (!items.length) return null
  const lead = items[0]
  return (
    <>
      <section className="bg-[#071a2b] py-14 sm:py-20">
        <div className={`${container}`}>
          <div className="rounded-[2rem] border border-white/15 bg-white/10 p-6 text-white sm:p-10 lg:grid lg:grid-cols-[1.1fr_.9fr] lg:items-center lg:gap-12">
            <div className="overflow-hidden rounded-[1.5rem]"><img src={getEditablePostImage(lead)} alt={safeTitle(lead)} className="aspect-[16/10] h-full w-full object-cover" /></div>
            <div className="mt-8 lg:mt-0"><p className="text-sm font-bold text-[#14ffec]">Editor’s pick</p><h2 className="editable-display mt-3 text-4xl font-bold leading-tight tracking-[-.04em]">{safeTitle(lead)}</h2><p className="mt-5 line-clamp-4 text-base leading-8 text-white/65">{getEditableExcerpt(lead, 240) || 'Open the full post for details, background, and the best way to connect.'}</p><Link href={postHref(primaryTask, lead, primaryRoute)} className="mt-7 inline-flex items-center gap-2 rounded-full bg-[#14ffec] px-6 py-3 text-sm font-bold text-[#071a2b]">Open feature <ArrowRight className="h-4 w-4" /></Link></div>
          </div>
        </div>
      </section>
      {items.length > 1 ? (
        <section className="bg-white"><div className={`py-16 sm:py-24 ${container}`}><div className="flex items-end justify-between gap-5"><div><p className="text-sm font-bold text-[var(--slot4-accent)]">Latest notes</p><h2 className="editable-display mt-2 text-4xl font-bold tracking-[-.04em]">What’s happening now</h2></div><Link href={primaryRoute} className="hidden items-center gap-2 text-sm font-bold text-[var(--slot4-accent)] sm:flex">View all <ArrowRight className="h-4 w-4" /></Link></div><div className="mt-10 grid gap-6 lg:grid-cols-3">{items.slice(1).map((post, index) => <Link key={post.id || post.slug || index} href={postHref(primaryTask, post, primaryRoute)} className={`group overflow-hidden rounded-[1.25rem] border border-[var(--editable-border)] bg-white transition hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(7,26,43,.1)] ${index > 2 ? 'lg:hidden' : ''}`}><img src={getEditablePostImage(post)} alt={safeTitle(post)} className="aspect-[16/10] w-full object-cover transition duration-500 group-hover:scale-[1.03]" /><div className="p-6"><div className="flex items-center gap-2 text-xs font-bold text-[var(--slot4-accent)]"><Sparkles className="h-3.5 w-3.5" /> {getEditableCategory(post)}</div><h3 className="editable-display mt-3 line-clamp-2 text-xl font-bold leading-snug">{safeTitle(post)}</h3><p className="mt-3 line-clamp-2 text-sm leading-6 text-[var(--slot4-muted-text)]">{getEditableExcerpt(post, 115)}</p><span className="mt-5 inline-flex items-center gap-2 text-sm font-bold">Read more <ArrowUpRight className="h-4 w-4 text-[var(--slot4-accent)]" /></span></div></Link>)}</div></div></section>
      ) : null}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-panel-bg)]"><div className={`py-16 sm:py-20 ${container}`}><div className="flex flex-col gap-8 rounded-[2rem] bg-white p-8 shadow-[0_20px_60px_rgba(7,26,43,.07)] sm:p-12 md:flex-row md:items-center md:justify-between"><div><p className="text-sm font-bold text-[var(--slot4-accent)]">Make your next move</p><h2 className="editable-display mt-2 max-w-2xl text-3xl font-bold tracking-[-.04em] sm:text-4xl">Share what you do, or find someone who can help.</h2></div><div className="flex shrink-0 flex-wrap gap-3"><Link href="/create" className="rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-bold text-white">Add a post</Link><Link href="/contact" className="rounded-full bg-[#071a2b] px-6 py-3 text-sm font-bold text-white">Contact us</Link></div></div></div></section>
  )
}
