/**
 * /product copy.
 *
 * What this page is FOR. The site already has a page for most of what a
 * product page usually holds — the home page sells the idea and runs the
 * demo, /how walks the five steps of one job, /integrations lists the
 * tools, while /enterprise covers rollout. The one thing none of them
 * The one thing none of them carries is the full list of what he can
 * actually do: the home page's capability section shows six, the demo
 * plays fifteen as a toy. So this page is the catalogue — twenty
 * capabilities in four groups — plus the two things a buyer asks straight
 * after: why he can really act, and what an admin controls.
 *
 * An earlier version of this page was a second home page: the same demo,
 * the same group/DM split, the same three-layer story /how already tells.
 * That is the thing to keep out.
 *
 * Chinese is the source; English comes from src/translations.ts. The
 * capability names are the demo's own chip labels, so both pages call the
 * same thing by the same name — and the walker keys on the string, so
 * reusing one costs no new translation.
 */

export const HERO = {
  eyebrow: 'Ola 产品',
  title: '把工作交给 AI 同事',
  /* No blurb and no CTA: the heading stands on its own, and PageHero drops
     its second column when nothing is passed for one. */
}

/* The catalogue. Four groups of five, all of them things the site already
   claims somewhere — the demo's scenarios, the home page's capability
   cards, the FAQ. Nothing new is promised here. */
export const CATALOGUE = {
  title: 'Ola 能接住的工作',
  groups: [
    {
      art: 'read',
      name: '看清事情进展',
      blurb: '不必先整理信息，直接问结果',
      items: [
        { title: '追进度', body: '分清已经完成、仍在推进和等你决定的事项' },
        { title: '查决策', body: '找回几个月前的讨论、依据与当时的取舍' },
        { title: '听录音', body: '转写并理解完整内容，提取结论与待办' },
        { title: '盯群聊', body: '持续跟进，只在需要你拍板时提醒' },
        { title: '找待办', body: '从本周对话中找回没有落地的承诺' },
      ],
    },
    {
      art: 'act',
      name: '把下一步落到位',
      blurb: '不只给建议，也会把动作做下去',
      items: [
        { title: '提缺陷', body: '把零散反馈整理成一份清楚、可执行的 Issue' },
        { title: '拆任务', body: '把长消息拆成任务，补上负责人和优先级' },
        { title: '建手册', body: '先给目录和方向，确认后再完成初稿' },
        { title: '找线索', body: '按确认的来源持续搜索，新线索自动入表' },
        { title: '拟回复', body: '按你的语气起草，并说明关键取舍' },
      ],
    },
    {
      art: 'self',
      name: '主动推进工作',
      blurb: '按时开始，长任务自己跑完',
      items: [
        { title: '看早报', body: '把各工具的夜间变化汇成一条早报' },
        { title: '写日报', body: '把已完成、进行中和明日到期的事项分开列清' },
        { title: '备会面', body: '会前自动整理上次结论与未完成事项' },
        { title: '挂后台', body: '长任务不占对话，完成后主动回来通知' },
        { title: '设一次，长期跑', body: '设定一次，日报、周报按时送达' },
      ],
    },
    {
      art: 'memory',
      name: '记住团队上下文',
      blurb: '不必反复说明，交接也不断档',
      items: [
        { title: '记得当初为什么那么定', body: '上个月拍板的理由，今天仍能随时找回' },
        { title: '人走了，记性留下', body: '人员交接不必把上下文重新讲一遍' },
        { title: '群里的活全群可见', body: '任何人都能接着推进，不必重复转发' },
        { title: '私聊只属于你', body: '私聊内容不会回到群里' },
        { title: '团队技能写一次', body: '把规范沉淀下来，每个人的 Ola 都能复用' },
      ],
    },
  ],
}

/* Six of the nine cards here used to be Pillars' capability cards copied
   word for word, under a heading about administration. What is left is the
   three things an admin actually sets, each in one line — and the third is
   no longer 团队技能, which the catalogue above already lists. The facts are
   the FAQ's: four roles, deletes needing a second person, changes taking
   effect without a re-login, every change audited. */
export const MANAGE = {
  title: '管理权始终在你手里',
  lead: '配置一次，团队成员只要 @ Ola 就能开始',
  cta: '看看全部能力',
  toolsLead: '连接后，Ola 就会用这些工具',
  /* Full-colour marks only, so the strip needs no light/dark pair. */
  tools: [
    { name: '飞书', logo: '/logos/lark.webp' },
    { name: 'Slack', logo: '/logos/slack.webp' },
    { name: 'Microsoft Teams', logo: '/logos/microsoft-teams.webp' },
    { name: 'WhatsApp', logo: '/logos/whatsapp.webp' },
    { name: 'GitHub', logo: '/logos/github.webp' },
    { name: 'Linear', logo: '/logos/linear.webp' },
    { name: 'Notion', logo: '/logos/notion.webp' },
    { name: 'Google Drive', logo: '/logos/google-drive.webp' },
    { name: 'Gmail', logo: '/logos/gmail.webp' },
    { name: 'Figma', logo: '/logos/figma.webp' },
    { name: 'HubSpot', logo: '/logos/hubspot.svg' },
    { name: 'Langfuse', logo: '/logos/langfuse.webp' },
  ],
  cards: [
    {
      art: 'perPerson',
      title: '按人分配权限',
      body: '谁能使用哪些集成，由管理员统一决定',
    },
    {
      art: 'revoke',
      title: '随时收回访问权限',
      body: '在设置里收紧或断开，修改立即生效，无需重新登录',
    },
    {
      art: 'second',
      title: '关键删除需二次批准',
      body: '发起人不能批准自己的删除，每次变更都留下审计记录',
    },
  ],
}

/* Attributions are placeholders on purpose — see the note in the page. */
export const QUOTES_TITLE = '来自客户的反馈'

export const QUOTES = [
  {
    quote:
      '以前跨系统的工作总要靠人协调，团队花在交接上的时间常常比做事还多。现在一句话就能推进工作，大家终于能把精力放回客户和业务增长。',
    who: 'CEO',
    org: 'Royalroad Trading Co., Ltd.',
  },
  {
    quote:
      '它不会绕开我们已有的权限和审批流程。员工看不到的内容，Ola 也看不到；需要确认的动作，会在执行前停下来。',
    who: '行政负责人',
    org: 'Gingiris Ltd.',
  },
]
