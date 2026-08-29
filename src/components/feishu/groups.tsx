/** Abstract marks instead of initials, after Claude Tag's avatars. Two
 *  Latin initials next to a Chinese name never looked like one system, and
 *  romanising the names for the English build made 苏 become "SM" — a label
 *  for a label. A shape carries none of that baggage and still tells the
 *  speakers apart at 36px. */
export type Glyph =
  | 'bowtie'
  | 'squares'
  | 'diamond'
  | 'arch'
  | 'clover'
  | 'chevrons'
  | 'ring'
  | 'cross'

export type Person = { name: string; tone: string; glyph: Glyph }

export type IconKey =
  | 'catchup'
  | 'chart'
  | 'watch'
  | 'issue'
  | 'callprep'
  | 'mic'
  | 'tasks'
  | 'search'
  | 'book'
  | 'morning'
  | 'history'
  | 'draft'
  | 'pickup'
  | 'deepwork'
  | 'recap'

export type Group = {
  id: string
  /** Feishu groups are named, not `#`-prefixed like Slack channels. */
  name: string
  /** Tab label. A verb phrase, not the group name — Claude Tag labels its
   *  use-case tabs by what you get done ("Catch up", "Call prep"), which
   *  reads far better than a channel name. */
  useCase: string
  icon: IconKey
  members: number
  tone: string
  /** The prompt, as plain text so the Prompt card and the chat bubble can
   *  both render it from one source. `@Ola` is turned into a mention chip
   *  at render time. */
  prompt: string
  /** What was already in the group before anyone tagged Ola. Real threads
   *  are never a cold open — the ask only makes sense with the couple of
   *  short messages that provoked it. */
  context: { by: Person; at: string; body: string }[]
  ask: { by: Person; at: string }
  /** The pitch beside the transcript. Claude Tag pairs every use-case tab
   *  with a title and a sentence or two — the mock-up shows what happened,
   *  the blurb says why it matters, and neither carries both jobs well. */
  blurb: { title: string; body: string }
  /** How many messages the answer took, shown as Feishu's reply count. */
  replyCount: number
  /** Ola answers in prose, like anyone else in the group — but the shape
   *  of that prose is copied from Claude Tag's transcripts: a short plan
   *  posted first, then the answer as labelled sections, a meta line, an
   *  attachment or links where the result warrants one. */
  replies: BotMessage[]
  followUp?: { by: Person; at: string; body: string }
}

/** One message from Ola. Several blocks stack inside a single bubble. */
export type BotMessage = { at: string; blocks: Block[] }

export type Block =
  /** The plan, posted before the work — Claude Tag shows this as a ✓ list
   *  captioned "todos as of 1:22 PM". ✱ marks a step still running. */
  | { kind: 'todos'; items: string[]; at: string }
  | { kind: 'text'; lines: string[] }
  /** A bold label over a bullet list — "Decided:" / "Still open:". */
  | { kind: 'section'; label: string; items: string[] }
  /** A compact result table. */
  | { kind: 'table'; head: string[]; rows: string[][] }
  /** A one-line result summary: `草稿 PR #128 · CI 全绿 · +34 −6`. */
  | { kind: 'meta'; text: string }
  /** Inline links under the answer. */
  | { kind: 'links'; items: string[] }

const P = {
  maya: { name: '陈曦', tone: '#8b5e83', glyph: 'bowtie' },
  jordan: { name: '李维', tone: '#4a6b8a', glyph: 'squares' },
  sofia: { name: '苏敏', tone: '#a8674a', glyph: 'diamond' },
  tom: { name: '高远', tone: '#4f6b5a', glyph: 'arch' },
  priya: { name: '许静', tone: '#7a4a6b', glyph: 'clover' },
  leo: { name: '林昊', tone: '#5a5f7a', glyph: 'chevrons' },
  dana: { name: '周然', tone: '#7a6a4a', glyph: 'ring' },
  ravi: { name: '郑川', tone: '#4a7a75', glyph: 'cross' },
} satisfies Record<string, Person>

export const GROUPS: Group[] = [
  {
    id: 'catchup',
    useCase: '追进度',
    icon: 'catchup',
    prompt:
      '@Ola 我出差刚回来，这个群这周定了什么、还有什么没定？',
    name: '商业化',
    members: 23,
    tone: '#6b5580',
    context: [
      { by: P.sofia, at: '09:03', body: '报价这版我改成按席位了，文案周五给' },
      { by: P.leo, at: '09:05', body: '旧版入口还留吗？上周说的方案二一直没定' },
    ],
    ask: { by: P.jordan, at: '09:12' },
    blurb: {
      title: '几秒钟追上一整个群',
      body: '出差回来不用从头翻。已经拍板的、还悬着的、等你点头的，分三类给你，每条注明谁说的、什么时候说的。',
    },
    replyCount: 3,
    replies: [
      {
        at: '09:13',
        blocks: [
          {
            "kind": "todos",
            "at": "09:13",
            "items": [
              "从头读完这个群本周的 214 条消息。",
              "分清哪些已经拍板、哪些还悬着。",
              "写成小结。"
            ]
          }
        ],
      },
      {
        at: '09:14',
        blocks: [
          {
            "kind": "section",
            "label": "已定：",
            "items": [
              "报价改成按席位计费 —— 下周一上线，文案周五交。",
              "旧版入口保留到 9 月底，之后下线。"
            ]
          },
          {
            "kind": "section",
            "label": "还没定：",
            "items": [
              "海外定价要不要单独做一套 —— 周三之后没人接话，卡了四天。",
              "谁去跟法务确认合规口径，苏敏提了但没指人。"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'metrics',
    useCase: '查数据',
    icon: 'chart',
    prompt:
      '@Ola 把上周各项目的 trace 质量评分拉一下，掉得最多的排前面。',
    name: '模型质量',
    members: 11,
    tone: '#3a5a80',
    context: [
      { by: P.dana, at: '09:58', body: '检索助手这两天是不是变笨了' },
      { by: P.sofia, at: '10:00', body: '有数吗　我这边看着还行' },
    ],
    ask: { by: P.leo, at: '10:02' },
    blurb: {
      title: '数据直接发到群里',
      body: '让他去查，结果连表格一起发在群里——全组都看得到，谁有疑问当场接着问，不用你转发一遍。',
    },
    replyCount: 2,
    replies: [
      {
        at: '10:03',
        blocks: [
          {
            "kind": "todos",
            "at": "10:04",
            "items": [
              "从 Langfuse 拉了上周四个项目的 trace 评分。",
              "按环比跌幅排序，掉得最多的排前面。"
            ]
          }
        ],
      },
      {
        at: '10:04',
        blocks: [
          {
            "kind": "text",
            "lines": [
              "上周四个项目的质量评分，按环比变化排的。"
            ]
          },
          {
            "kind": "table",
            "head": [
              "项目",
              "上周",
              "环比"
            ],
            "rows": [
              [
                "检索助手",
                "4.12",
                "▼0.63"
              ],
              [
                "文档摘要",
                "4.66",
                "▬0.00"
              ],
              [
                "代码审查",
                "4.58",
                "▲0.11"
              ],
              [
                "客服问答",
                "4.71",
                "▲0.08"
              ]
            ]
          },
          {
            "kind": "text",
            "lines": [
              "只有检索助手明显掉了，且集中在工具调用失败那一段，不是模型本身的问题 —— 失败样本里 78% 是同一个超时。要我把这批 trace 拉出来吗？"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'issue',
    useCase: '提缺陷',
    icon: 'issue',
    prompt:
      '@Ola 上面这个问题帮我提个 Issue，把复现步骤和日志都带上。',
    name: '研发反馈',
    members: 27,
    tone: '#a8544c',
    context: [
      { by: P.priya, at: '11:02', body: '导出 CSV 超过 5 万行就卡住，转圈不动' },
      { by: P.leo, at: '11:04', body: '我这边也复现了，10 万行必挂。日志里一堆超时' },
    ],
    ask: {
      by: P.priya,
      at: '11:07',
    },
    blurb: {
      title: '聊着聊着就把 Issue 提了',
      body: '几个人各说半个 bug，他合成一份完整的 Issue：复现步骤、影响范围、首次出现的版本，还会翻出可能重复的旧单。',
    },
    replyCount: 1,
    replies: [
      {
        at: '11:09',
        blocks: [
          {
            "kind": "text",
            "lines": [
              "提好了。把你俩的描述合成一份，补了环境、版本和三段日志。"
            ]
          },
          {
            "kind": "meta",
            "text": "Issue #412 · bug · 已指派 林昊 · 附 3 段日志"
          },
          {
            "kind": "section",
            "label": "里面写了：",
            "items": [
              "复现步骤：新建导出任务 → 选全部字段 → 行数超过 5 万即挂起。",
              "影响范围：仅 CSV 导出，Excel 导出正常。",
              "首次出现：v5.2.1 之后，v5.2.0 上跑 12 万行没问题。"
            ]
          },
          {
            "kind": "text",
            "lines": [
              "另外 #288 描述的应该是同一个问题，只是当时以为是网络。我在 Issue 里关联了，要不要一起关掉？"
            ]
          },
          {
            "kind": "links",
            "items": [
              "Issue #412",
              "可能重复的 #288"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'sales',
    useCase: '备会面',
    icon: 'callprep',
    prompt:
      '@Ola 我下午两点见陈先生，把他的历史接触记录和还没跟进的待办给我。',
    name: '客户成功',
    members: 21,
    tone: '#3a5a80',
    context: [
      { by: P.ravi, at: '13:05', body: '下午两点陈先生那个会，资料齐了吗' },
      { by: P.ravi, at: '13:08', body: '我记得上次留了尾巴没跟' },
    ],
    ask: {
      by: P.ravi,
      at: '13:11',
    },
    blurb: {
      title: '进会议室之前就准备好了',
      body: '聊过几次、上次结论是什么、哪些待办停着没动，开会前自动汇总。推算出来的信息会标「待确认」，不会混进事实里。',
    },
    replyCount: 1,
    replies: [
      {
        at: '13:14',
        blocks: [
          {
            "kind": "text",
            "lines": [
              "陈先生 · 今天 14:00 —— 跨境电商 SaaS，团队 40 人，卡在多仓库存同步。"
            ]
          },
          {
            "kind": "section",
            "label": "",
            "items": [
              "聊过 4 次，最近一次三周前。",
              "上次结论：先跑一个仓试点，两周内给数据。",
              "没跟进：试点结果、报价单 —— 两条都停了三周。",
              "留意：他上次提过在比另一家，当时判断是压价筹码。",
              "打法：先问试点数据，拿到结果再谈报价，别先报价。"
            ]
          },
          {
            "kind": "text",
            "lines": [
              "团队规模是我从公开渠道推算的，标了「待确认」，别当准数用。"
            ]
          },
          {
            "kind": "links",
            "items": [
              "四次会谈纪要",
              "客户档案"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'watch',
    useCase: '盯群聊',
    icon: 'watch',
    prompt:
      '@Ola 以后每天早上九点，把昨天的报错按项目汇总发这个群。',
    name: '线上告警',
    members: 31,
    tone: '#4f6b52',
    context: [
      { by: P.maya, at: '18:32', body: '又手动翻了一遍日志…' },
      { by: P.jordan, at: '18:36', body: '昨天那批报错有人汇总过吗' },
    ],
    ask: { by: P.priya, at: '18:40' },
    blurb: {
      title: '盯住那些没人顾得上的群',
      body: '交代一次，他就长期守着：汇总报错、按严重程度排序、只有需要你拍板时才 @ 你。没有新情况就不出声。',
    },
    replyCount: 1,
    replies: [
      {
        at: '18:41',
        blocks: [
          {
            "kind": "text",
            "lines": [
              "好，从现在起盯着「线上告警」。每天 09:00 汇总昨天的报错发这个群，只有需要你拍板时才 @ 你。"
            ]
          },
          {
            "kind": "todos",
            "at": "18:41",
            "items": [
              "同一个报错只报一次，不重复刷屏。",
              "数量比前一天翻倍的排最前面。",
              "没有新报错就不发。"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'tasks',
    useCase: '拆任务',
    icon: 'tasks',
    prompt:
      '@Ola 把上面这段 handoff 拆成任务清单，每条一行含负责人和优先级，按职责自动分。',
    name: '项目推进',
    members: 15,
    tone: '#6b5580',
    context: [
      { by: P.dana, at: '14:22', body: '刚开完会，交接我贴群里了' },
      { by: P.dana, at: '14:23', body: '有点长，大家自己看下' },
    ],
    ask: {
      by: P.dana,
      at: '14:31',
    },
    blurb: {
      title: '一段交接，拆成一张表',
      body: '老板甩过来的长消息不用你先整理。每条一行，负责人和优先级都填好，拿不准该派给谁的会标出来问你。',
    },
    replyCount: 2,
    replies: [
      {
        at: '14:32',
        blocks: [
          {
            "kind": "todos",
            "at": "14:33",
            "items": [
              "读完那段 400 字的交接，数出 13 件事。",
              "按各人职责分配负责人和优先级。",
              "写进「推进商业化」任务表。"
            ]
          }
        ],
      },
      {
        at: '14:33',
        blocks: [
          {
            "kind": "text",
            "lines": [
              "13 条都建好了，每条一行。下面是 5 条 P1。"
            ]
          },
          {
            "kind": "table",
            "head": [
              "任务",
              "负责人",
              "截止"
            ],
            "rows": [
              [
                "新服务器挂 worker node",
                "林昊 · 周然",
                "8/5"
              ],
              [
                "报价页文案定稿",
                "苏敏",
                "8/5"
              ],
              [
                "法务合规口径确认",
                "？",
                "8/5"
              ],
              [
                "手册维护交接",
                "周然",
                "8/5"
              ],
              [
                "海外定价方案",
                "？",
                "8/5"
              ]
            ]
          },
          {
            "kind": "text",
            "lines": [
              "截止时间统一设成 8 月 5 日 24:00（北京时间）。有两条我拿不准该派给谁，先标了问号，你补一下。"
            ]
          },
          {
            "kind": "links",
            "items": [
              "打开「推进商业化」"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'pickup',
    useCase: '找待办',
    icon: 'pickup',
    prompt:
      '@Ola 这周群里散着的待办帮我捡一下，别只看我说的。',
    name: '周会跟进',
    members: 14,
    tone: '#6b5580',
    context: [
      { by: P.leo, at: '17:38', body: '这周聊了太多事' },
      { by: P.leo, at: '17:39', body: '总觉得漏了什么，但想不起来' },
    ],
    ask: { by: P.leo, at: '17:41' },
    blurb: {
      title: '捡起那些随口答应的事',
      body: '他会翻遍这周的群，把说完就忘的承诺挑出来——谁答应的、答应了什么、什么时候说的，一条不落。',
    },
    replyCount: 2,
    replies: [
      {
        at: '17:42',
        blocks: [
          {
            "kind": "todos",
            "at": "17:43",
            "items": [
              "翻了本周 7 个群。",
              "挑出被当成闲聊说出口、但其实是承诺的话。",
              "已经建过任务的排除掉了。"
            ]
          }
        ],
      },
      {
        at: '17:43',
        blocks: [
          {
            "kind": "text",
            "lines": ["捡到 5 条，都没人建任务。下面是逾期和快到期的三条。"]
          },
          {
            "kind": "table",
            "head": ["谁答应的", "答应了什么", "什么时候说的"],
            "rows": [
              ["你", "给苏敏报价口径", "周一 · 已逾期 2 天"],
              ["林昊", "补一版压测数据", "周二 · 没说时间"],
              ["周然", "约客户复盘会", "周三 · 本周内"]
            ]
          },
          {
            "kind": "text",
            "lines": [
              "要我建成任务吗？默认派给说这话的人，你可以再改。"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'draft',
    useCase: '拟回复',
    icon: 'draft',
    prompt:
      '@Ola 客户这三条帮我拟个回复，按我平时的语气来，别太官腔。',
    name: '客户对接',
    members: 6,
    tone: '#4a6b8a',
    context: [
      { by: P.dana, at: '09:20', body: '客户昨晚连发了三条' },
      { by: P.dana, at: '09:21', body: '问的其实是同一件事' },
    ],
    ask: { by: P.dana, at: '09:24' },
    blurb: {
      title: '按你的语气拟稿',
      body: '他记得你平时怎么写：不写敬语开头、延迟会主动说原因。拟完还会告诉你为什么这么写，不满意直接说改哪。',
    },
    replyCount: 1,
    replies: [
      {
        at: '09:25',
        blocks: [
          {
            "kind": "text",
            "lines": [
              "三条问的是同一件事 —— 试点数据什么时候给。按你以前回他的写法拟了一版："
            ]
          },
          {
            "kind": "section",
            "label": "草稿：",
            "items": [
              "王工，试点数据这周五之前给到你。上周仓库那边盘点占了两天，耽误了一点。数据出来我直接发群里，有问题我们随时对。"
            ]
          },
          {
            "kind": "text",
            "lines": [
              "你回客户一般不写敬语开头，延迟会主动说原因，所以我照这个来的。语气要调直接跟我说。"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'morning',
    useCase: '看早报',
    icon: 'morning',
    prompt:
      '@Ola 把昨晚各个工具的动静汇总成早报，以后每天九点自动发这儿。',
    name: '每日早报',
    members: 34,
    tone: '#8a5a2b',
    context: [
      { by: P.sofia, at: '08:58', body: '昨晚 GitHub 那波合并有人看了吗' },
      { by: P.jordan, at: '08:59', body: '等早报吧，一条一条翻太累' },
    ],
    ask: { by: P.sofia, at: '09:00' },
    blurb: {
      title: '昨晚发生了什么',
      body: '各个工具的夜间变动汇总成一条，例行同步略过，只留和在做的事相关的，末尾附一句「今天需要你定什么」。',
    },
    replyCount: 2,
    replies: [
      {
        at: '09:01',
        blocks: [
          {
            "kind": "todos",
            "at": "09:02",
            "items": [
              "扫了 GitHub、Notion、Langfuse 昨晚 18:00 之后的全部变动。",
              "只留下和在做的事相关的，例行同步略过。"
            ]
          }
        ],
      },
      {
        at: '09:02',
        blocks: [
          {
            "kind": "section",
            "label": "昨晚发生了什么：",
            "items": [
              "GitHub：合了 6 个 PR，#412 那个导出卡死修好了。",
              "Langfuse：检索助手评分掉到 4.05，连续第三天往下走。",
              "Notion：产品方案 v3 被改了三处，都在定价那一节。"
            ]
          },
          {
            "kind": "section",
            "label": "需要你今天定的：",
            "items": [
              "检索助手要不要回滚上周那次改动 —— 掉了三天，还没人认领。"
            ]
          },
          {
            "kind": "text",
            "lines": [
              "明早九点起自动发。没有新变动就不发，不占你的消息列表。"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'recap',
    useCase: '写日报',
    icon: 'recap',
    prompt:
      '@Ola 今天这个群干了啥、还剩啥，给我个小结。',
    name: '团队日结',
    members: 23,
    tone: '#5a5f7a',
    context: [
      { by: P.dana, at: '18:48', body: '今天过得也太快了' },
    ],
    ask: { by: P.dana, at: '18:50' },
    blurb: {
      title: '一天结束时的收尾',
      body: '今天做完的、还开着的、明天到期的，分三栏。卡了几天没人接的会点出来，明天到期还没指人的会提醒你。',
    },
    replyCount: 1,
    replies: [
      {
        at: '18:51',
        blocks: [
          {
            "kind": "section",
            "label": "今天做完的：",
            "items": [
              "报价页文案定稿，苏敏交了。",
              "#412 导出卡死已合并上线。",
              "客户王工的回复发出去了。"
            ]
          },
          {
            "kind": "section",
            "label": "还开着的：",
            "items": [
              "海外定价方案 —— 今天又没人接，卡第五天了。",
              "压测数据，林昊说补，还没动。"
            ]
          },
          {
            "kind": "section",
            "label": "明天到期：",
            "items": [
              "法务合规口径确认 —— 明天 24:00，现在还没指人。"
            ]
          },
          {
            "kind": "text",
            "lines": ["明早九点我再提醒一次那条到期的。"]
          }
        ],
      },
    ],
  },

  {
    id: 'history',
    useCase: '查决策',
    icon: 'history',
    prompt:
      '@Ola 我们当初为什么选多维表格做 CRM，而不是上一套现成的？',
    name: '新人答疑',
    members: 8,
    tone: '#4f6b5a',
    context: [
      { by: P.ravi, at: '15:40', body: '刚接手 CRM 这块，有个问题想问' },
      { by: P.ravi, at: '15:41', body: '文档里只写了怎么用，没写当初为什么这么选' },
    ],
    ask: {
      by: P.ravi,
      at: '15:43',
    },
    blurb: {
      title: '翻出几个月前的那次讨论',
      body: '新人问「当初为什么这么定」，他能翻到三个月前的两轮讨论，连当时没被解决的保留意见一起交出来。',
    },
    replyCount: 2,
    replies: [
      {
        at: '15:44',
        blocks: [
          {
            "kind": "todos",
            "at": "15:45",
            "items": [
              "翻了三月那两轮技术选型讨论。",
              "对了当时的会议纪要和最后拍板的那条。",
              "把没结论的部分也挑出来了。"
            ]
          }
        ],
      },
      {
        at: '15:45',
        blocks: [
          {
            "kind": "text",
            "lines": [
              "三月中讨论过两轮，最后是苏敏拍的板。当时对比的是一套现成 CRM 和飞书多维表格。"
            ]
          },
          {
            "kind": "section",
            "label": "当时的理由：",
            "items": [
              "客户字段每两周就要改一次，现成 CRM 改字段要走工单，等不起。",
              "数据本来就在飞书里，不想再维护一套同步。",
              "团队当时 12 个人，按席位买不划算。"
            ]
          },
          {
            "kind": "section",
            "label": "当时的保留意见：",
            "items": [
              "林昊担心记录过万之后筛选会变慢 —— 这条到今天还没验证过，你接手可以留意。"
            ]
          },
          {
            "kind": "links",
            "items": [
              "三月技术选型讨论",
              "当时的会议纪要"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'interview',
    useCase: '听录音',
    icon: 'mic',
    prompt:
      '@Ola 这段是我向前辈请教早期打法的录音。完整转写后通读全文，整理成结构化笔记。',
    name: '访谈复盘',
    members: 12,
    tone: '#8a5a2b',
    context: [
      { by: P.leo, at: '09:50', body: '昨天那场聊了两个多小时，信息量很大' },
    ],
    ask: {
      by: P.leo,
      at: '09:53',
    },
    blurb: {
      title: '两小时录音，是读完不是听完',
      body: '逐字转写之后通读全文，不是抓摘要，中段那几个观点不会漏。和你判断不一致的地方会如实留着，不抹平。',
    },
    replyCount: 2,
    replies: [
      {
        at: '10:21',
        blocks: [
          {
            "kind": "todos",
            "at": "10:22",
            "items": [
              "145 分钟全部转写，分说话人、带时间戳。",
              "通读全文，不是抓摘要。",
              "整理成结构化笔记并归位入库。"
            ]
          }
        ],
      },
      {
        at: '10:22',
        blocks: [
          {
            "kind": "section",
            "label": "他给的方法论：",
            "items": [
              "先找 10 个愿意被打扰的人，别做问卷。",
              "定价先按结果收费，跑通再改订阅。",
              "前 50 个客户必须创始人自己签。"
            ]
          },
          {
            "kind": "section",
            "label": "和你判断不一致的地方：",
            "items": [
              "你想先做自助注册，他认为现阶段应该全部手动上门 —— 我如实留着没抹平。"
            ]
          },
          {
            "kind": "meta",
            "text": "8 个核心观点 · 6 条落地启示 · 逐字稿与笔记各一份"
          },
          {
            "kind": "links",
            "items": [
              "逐字稿",
              "结构化笔记"
            ]
          }
        ],
      },
    ],
  },

  {
    id: 'deepwork',
    useCase: '挂后台',
    icon: 'deepwork',
    prompt:
      '@Ola 这 40 份客户访谈纪要，按行业归类，每类提炼共性需求，做成一张表。',
    name: '客户调研',
    members: 9,
    tone: '#4f6b5a',
    context: [
      { by: P.tom, at: '10:04', body: '40 份纪要，人工读一遍得一整天' },
    ],
    ask: { by: P.tom, at: '10:06' },
    blurb: {
      title: '重活挂后台，你该干嘛干嘛',
      body: '四十份纪要要读两个多小时。他先把目标写清楚给你确认，然后自己跑，跑完回来找你，期间不占用对话。',
    },
    replyCount: 2,
    replies: [
      {
        at: '10:07',
        blocks: [
          {
            "kind": "text",
            "lines": ["这活不短，我挂后台跑。先把目标写清楚，你看对不对："]
          },
          {
            "kind": "todos",
            "at": "10:07",
            "items": [
              "40 份逐份读完，不抓摘要。",
              "按行业归类，行业标签从内容里长出来，不预设。",
              "每类提炼共性需求，只留 3 份以上提到的。",
              "结果写进新建的多维表格。"
            ]
          },
          {
            "kind": "text",
            "lines": [
              "没问题我就开跑。期间你该干嘛干嘛，跑完我回来找你。"
            ]
          }
        ],
      },
      {
        at: '12:31',
        blocks: [
          {
            "kind": "text",
            "lines": ["跑完了。40 份读完，归到 6 个行业。"]
          },
          {
            "kind": "table",
            "head": ["行业", "份数", "最高频需求"],
            "rows": [
              ["跨境电商", "9", "多仓库存同步"],
              ["制造", "8", "工单与排产打通"],
              ["专业服务", "7", "项目工时归集"],
              ["零售", "6", "门店日报自动化"]
            ]
          },
          {
            "kind": "text",
            "lines": [
              "跨境电商那组 9 份里有 7 份提到多仓同步，比第二名高一倍。另外 2 份行业拿不准，标了「待确认」没硬归。"
            ]
          },
          {
            "kind": "meta",
            "text": "40 份 · 6 个行业 · 后台跑了 2 小时 24 分"
          }
        ],
      },
    ],
  },

  {
    id: 'leads',
    useCase: '找线索',
    icon: 'search',
    prompt:
      '@Ola 帮我做获客调研，找正在用 Langfuse 的 AI agent 公司。先出方案，我确认再动手。',
    name: '增长获客',
    members: 18,
    tone: '#4a6b8a',
    context: [
      { by: P.jordan, at: '07:52', body: '这周还差 10 个目标客户' },
    ],
    ask: {
      by: P.maya,
      at: '08:01',
    },
    blurb: {
      title: '线索自己长进表里',
      body: '先出方案给你确认，再按你砍剩的渠道扫。同行和研究项目会剔掉，确认后每 30 分钟扫一次，新的直接入表。',
    },
    replyCount: 2,
    replies: [
      {
        at: '08:05',
        blocks: [
          {
            "kind": "todos",
            "at": "08:06",
            "items": [
              "按你确认的方案扫了 Langfuse 公开客户和今年的融资新闻。",
              "GitHub 那条按你说的去掉了。",
              "剔除同行和研究项目后写进「获客线索表」。"
            ]
          }
        ],
      },
      {
        at: '08:06',
        blocks: [
          {
            "kind": "text",
            "lines": [
              "本周扫到 14 家，剔掉 9 家同行和研究项目。下面是标了高优先的 5 家。"
            ]
          },
          {
            "kind": "table",
            "head": [
              "公司",
              "融资",
              "优先级"
            ],
            "rows": [
              [
                "Northwind AI",
                "A 轮 · 今年 3 月",
                "高"
              ],
              [
                "Vertex Agents",
                "种子 · 今年 1 月",
                "高"
              ],
              [
                "Helios Ops",
                "A+ · 去年 11 月",
                "高"
              ],
              [
                "Meridian Labs",
                "未披露",
                "中"
              ],
              [
                "Atlas Retrieval",
                "Pre-A · 今年 5 月",
                "高"
              ]
            ]
          },
          {
            "kind": "text",
            "lines": [
              "确认的话我每 30 分钟扫一次，新的直接入表并通知你。"
            ]
          },
          {
            "kind": "links",
            "items": [
              "打开「获客线索表」"
            ]
          }
        ],
      },
    ],
    followUp: {
      by: P.jordan,
      at: '08:09',
      body: 'GitHub 那路先去掉，搜出来大多是同行不是客户。',
    },
  },

  {
    id: 'wiki',
    useCase: '建手册',
    icon: 'book',
    prompt:
      '@Ola 给产品建个知识库，目标读者是新用户。你先出目录结构方案，我确认后你再建。',
    name: '产品手册',
    members: 64,
    tone: '#6b5580',
    context: [
      { by: P.dana, at: '08:38', body: '新人今天第三次问怎么接入了' },
      { by: P.leo, at: '08:39', body: '文档散在几个地方，我也找不着' },
    ],
    ask: {
      by: P.sofia,
      at: '08:41',
    },
    blurb: {
      title: '先出目录，再动笔',
      body: '结构定错了，内容写得再好也白写。所以他先给目录等你确认，现有文档用移动不用复制——保持单一来源。',
    },
    replyCount: 2,
    replies: [
      {
        at: '08:42',
        blocks: [
          {
            "kind": "todos",
            "at": "08:43",
            "items": [
              "先出目录结构，等你确认再动手写。",
              "把现有 4 篇文档移进空间，不复制。",
              "每页先写标题和分节要点。"
            ]
          }
        ],
      },
      {
        at: '08:43',
        blocks: [
          {
            "kind": "section",
            "label": "目录（等你确认）：",
            "items": [
              "快速上手 · 使用场景 · 实战案例",
              "发布日记 · FAQ · 技术支持 · 关于"
            ]
          },
          {
            "kind": "section",
            "label": "已经做了的：",
            "items": [
              "现有 4 篇是移动进去的，不是复制 —— 保持单一来源，改一处全库同步。",
              "每页写好了标题和分节要点，正文等你点头再填。"
            ]
          }
        ],
      },
    ],
  },
]
