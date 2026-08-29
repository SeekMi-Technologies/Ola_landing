/**
 * /login copy.
 *
 * Chinese is the source; English comes from src/translations.ts. The help
 * line is split into a lead and a link label because the walker matches
 * whole text nodes — written as one sentence with an <a> in the middle it
 * would be three nodes and none of them would translate.
 */
export const LOGIN = {
  title: '进入你们团队的工作区',
  /* The line under the heading, the way the workspace's own sign-in card
     carries one. */
  lead: '输入公司的 Ola 网址',
  fieldLabel: '公司网址',
  placeholder: 'your-team',
  cta: '继续',
  helpLead: '不知道网址？',
  helpLink: '联系我们',
}
