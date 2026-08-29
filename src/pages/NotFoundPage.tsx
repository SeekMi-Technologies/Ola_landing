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
      </section>
    </main>
  )
}
