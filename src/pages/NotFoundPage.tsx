import PageHero from '../components/PageHero'

/**
 * 404.
 *
 * The router used to fall back to the home page for anything it did not
 * recognise, which meant a mistyped URL, or a link to one of the pages that
 * have since been removed, silently rendered the home page at that address.
 * Now unknown paths land here and say so.
 */
export default function NotFoundPage() {
  return (
    <main>
      <PageHero title="这个页面不在了" blurb="链接可能过期了，或者地址打错了。下面几个地方大概是你要找的。" />

      <section className="bg-bone pb-16 pt-12 md:pb-24 md:pt-16">
        <div className="shell flex flex-wrap items-center gap-4">
          <a href="/" className="btn btn-primary">
            回首页
          </a>
          <a href="/product" className="btn btn-ghost">
            看功能
          </a>
          <a href="/contact" className="btn btn-ghost">
            联系我们
          </a>
        </div>

        {/* For whatever is reading this without a browser: the two files
            that describe the whole site. A crawler or agent that lands here
            with a plain GET sees HTML, so the pointers 404.md carries have
            to be in the HTML as well. */}
        <p className="shell mt-10 text-[13px] leading-[1.7] text-ink/45">
          完整的页面清单在
          <a href="/sitemap.xml" className="underline underline-offset-2 hover:text-ink">
            站点地图
          </a>
          ；给 AI 助手的说明在
          <a href="/llms.txt" className="underline underline-offset-2 hover:text-ink">
            llms.txt
          </a>
          。
        </p>
      </section>
    </main>
  )
}
