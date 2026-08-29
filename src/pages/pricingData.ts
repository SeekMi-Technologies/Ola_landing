/**
 * /pricing content.
 *
 * Three plans and the FAQ under them. The reference site's add-ons, footnote
 * and 61-row comparison matrix used to live here as unrendered data; they
 * were another company's copy and are gone.
 */

export type Plan = {
  id: string
  name: string
  blurb: string
  price: string
  unit: string
  allowance: string
  cta: string
  ctaNote?: string
  current?: boolean
  /** Enterprise's CTA is the quiet one in the Figma */
  ctaQuiet?: boolean
  groups: { title: string; items: string[] }[]
}

export const PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    blurb: '用真实工作试试 Ola',
    price: '$0',
    unit: '每月',
    allowance: '每月 1,000 额度',
    cta: '联系销售',
    groups: [
      {
        title: '包含',
        items: ['完整助手，所有集成', '后台任务与定时巡检', '团队记忆'],
      },
    ],
  },
  {
    id: 'pro',
    name: 'Pro',
    blurb: '让团队开始把事做完',
    price: '$20',
    unit: '每月',
    allowance: '每月 10,000 额度',
    cta: '联系销售',
    groups: [
      {
        title: '包含',
        items: ['Free 全部功能', '每月额度是 Free 的 10 倍', '优先支持'],
      },
    ],
  },
  {
    id: 'max',
    name: 'Max',
    blurb: '为高频运行的团队准备',
    price: '$100+',
    unit: '每月起',
    allowance: '每月 100,000 额度',
    cta: '联系销售',
    groups: [
      {
        title: '包含',
        items: ['Pro 全部功能', '每月额度是 Pro 的 10 倍', '优先支持'],
      },
    ],
  },
]

export const FAQS = [
  {
    q: 'Free、Pro 和 Max 有什么区别？',
    a: '三档都包含完整助手、全部集成、后台任务与团队记忆。区别主要在每月积分与支持：Free 每月 1,000 积分；Pro 每月 10,000 积分并提供优先支持；Max 每月 100,000 积分起，适合高频使用的团队。',
  },
  {
    q: '积分如何消耗？',
    a: '积分用于计量 Ola 完成任务时的服务用量。任务涉及的推理、工具调用和执行规模不同，消耗的积分也会不同。',
  },
  {
    q: '可以随时升级或降级方案吗？',
    a: '可以。升级后即可获得更高的月度额度；降级会在当前计费周期结束后生效，期间不会中断使用。',
  },
  {
    q: '未使用的积分会结转到下个月吗？',
    a: '不会。每月积分会在新的计费周期开始时刷新，未使用的部分不会结转。',
  },
]
