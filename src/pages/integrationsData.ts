/**
 * The integration catalogue for /integrations.
 *
 * Same logo files the home page's tile wall uses (public/logos), same
 * two-file convention: `logo` is the dark artwork for light grounds,
 * `logoDark` the pale artwork for dark ones. Only MONOCHROME marks need
 * both — a full-colour mark reads on either ground, which is why most
 * entries carry one file. See public/logos/README.md.
 */
export type Integration = {
  name: string
  category: CategoryId
  /** what Ola actually does there — one line, no marketing */
  blurb: string
  logo: string
  logoDark?: string
  /** a wordmark needs a wider box than a square icon at the same height */
  wordmark?: boolean
  /** integration is listed for discovery but is not yet available */
  comingSoon?: boolean
}

export type CategoryId =
  | 'chat'
  | 'code'
  | 'docs'
  | 'growth'
  | 'design'
  | 'money'

export const CATEGORIES: { id: CategoryId; name: string; blurb: string }[] = [
  {
    id: 'chat',
    name: '沟通与协作',
    blurb: '你在哪儿说话，他就在哪儿接活。私聊和群聊都能 @ 他，结果回到同一个会话里。',
  },
  {
    id: 'code',
    name: '研发与代码',
    blurb: '开 issue、追 PR、看日志。研发流程里的事，他能读，也能动手改。',
  },
  {
    id: 'docs',
    name: '文档与知识',
    blurb: '写进知识库，而不是丢回聊天框。整理好的东西留在团队找得到的地方。',
  },
  {
    id: 'growth',
    name: '客户与增长',
    blurb: '客户信息实时录入，竞品动态定时汇总，跟进事项自动变成任务。',
  },
  {
    id: 'design',
    name: '设计与素材',
    blurb: '取设计稿、对规范、把评审意见收敛成一条清单。',
  },
  {
    id: 'money',
    name: '邮件与账务',
    blurb: '发票与费用自动检测记录，邮件跟进写好草稿等你过目。',
  },
]

export const INTEGRATIONS: Integration[] = [
  {
    name: '飞书 / Lark',
    category: 'chat',
    blurb: '私聊、群聊、多维表格、知识库、妙记',
    logo: '/logos/lark.webp',
  },
  {
    name: 'WhatsApp',
    category: 'chat',
    blurb: '配对一次，语音和录音都能发',
    logo: '/logos/whatsapp.webp',
  },
  { name: 'Slack', category: 'chat', blurb: '频道里 @ 他，结果回到频道', logo: '/logos/slack.webp', comingSoon: true },
  {
    name: 'Microsoft Teams',
    category: 'chat',
    blurb: '和飞书里是同一个 Ola',
    logo: '/logos/microsoft-teams.webp',
    comingSoon: true,
  },
  {
    name: 'GitHub',
    category: 'code',
    blurb: '开 issue、追 PR、写 Release Notes',
    logo: '/logos/github.webp',
    logoDark: '/logos/github-dark.webp',
  },
  {
    name: 'Linear',
    category: 'code',
    blurb: '工单分诊，分配给合适的负责人',
    logo: '/logos/linear.webp',
    logoDark: '/logos/linear-dark.webp',
    comingSoon: true,
  },
  { name: 'Langfuse', category: 'code', blurb: '拉链路和日志，定位问题出在哪一步', logo: '/logos/langfuse.webp' },
  {
    name: 'Notion',
    category: 'docs',
    blurb: '会议纪要、日报、决策记录写进库',
    logo: '/logos/notion.webp',
    logoDark: '/logos/notion-dark.webp',
  },
  { name: 'Google Drive', category: 'docs', blurb: '读材料、归档产出、按项目建目录', logo: '/logos/google-drive.webp', comingSoon: true },
  {
    name: 'HubSpot',
    category: 'growth',
    blurb: '客户信息实时录入，跟进不落地',
    logo: '/logos/hubspot.svg',
    logoDark: '/logos/hubspot-dark.svg',
    comingSoon: true,
  },
  { name: 'LinkedIn', category: 'growth', blurb: '找线索、看动态、准备客户背景', logo: '/logos/linkedin.webp', comingSoon: true },
  {
    name: 'X',
    category: 'growth',
    blurb: '竞品动态简报，到点自己开工',
    logo: '/logos/x.webp',
    logoDark: '/logos/x-dark.webp',
    comingSoon: true,
  },
  { name: 'Figma', category: 'design', blurb: '取设计稿，把评审意见收敛成清单', logo: '/logos/figma.webp', comingSoon: true },
  { name: 'Gmail', category: 'money', blurb: '跟进邮件写好草稿，等你过目再发', logo: '/logos/gmail.webp', comingSoon: true },
  {
    name: 'Stripe',
    category: 'money',
    blurb: '发票与费用自动检测并记录',
    logo: '/logos/stripe-wordmark.svg',
    logoDark: '/logos/stripe-wordmark-white.svg',
    wordmark: true,
    comingSoon: true,
  },
]
