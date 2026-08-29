/**
 * /contact — structure after Figma node 519:17628 (reference layout).
 *
 * That page is a channel picker: five tiles across a dark band, one of them
 * selected, a primary button underneath whose label follows the selection,
 * and a numbered "how to install it" list below that changes with it too.
 * The same shape works for "contact us" — pick where you want to talk, and
 * the button and the steps follow.
 *
 * Chinese is the source; English comes from src/translations.ts.
 *
 * Two channels only — email and WeChat, in that order. Feishu, WhatsApp and
 * Discord were removed: no account exists behind them. Both remaining
 * channels carry a real address; nothing here is invented. With only two
 * left the page shows them both open rather than making you pick one.
 */

import { CONTACT_EMAIL } from '../links'
import type { BrandId } from '../components/brandMarks'

export const HERO = { title: '联系我们' }

export const PICKER = {
  title: '怎么找我们',
  lead: '说说你们团队现在卡在哪，我们一起看看 Ola 能不能接住',
}

export type Channel = {
  id: BrandId
  /* The label above the address. 邮件 / 微信 both translate. */
  label: string
  note: string
  howTitle: string
  /* The actual address. A channel without one renders a visible 「待补充」
     slot rather than a link that goes nowhere. */
  handle?: string
}

export const CHANNELS: Channel[] = [
  {
    id: 'email',
    label: '邮件',
    note: '要走采购或安全评估流程的话，邮件最合适。',
    howTitle: '用邮件联系我们',
    handle: CONTACT_EMAIL,
  },
  {
    id: 'wechat',
    label: '微信',
    note: '想先随便问问的话，微信最省事。',
    howTitle: '在微信上联系我们',
    handle: 'Ww_Ziheng',
  },
]

/* The three destinations the top bar carries, in the same order. Every one
   is a page that exists — no placeholder hrefs. */
export const NEXT = {
  title: '也可以先自己看看',
  items: [
    {
      tone: 'signal' as const,
      title: '功能',
      body: '他能接哪些活，完整的一份清单。',
      href: '/product',
    },
    {
      tone: 'clay' as const,
      title: '集成',
      body: '你在用的工具，他已经连上了哪些。',
      href: '/integrations',
    },
    {
      tone: 'gold' as const,
      title: '定价',
      body: '一个团队一个月要花多少，先算清楚。',
      href: '/pricing',
    },
  ],
}
