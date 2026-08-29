/**
 * Chinese → English. Keys must match the rendered source exactly after
 * whitespace collapsing, which is why a few carry a space where JSX wraps
 * a line.
 *
 * Register follows claude.com/product/tag: short declaratives, em-dash
 * asides, concrete nouns, and "it" for the agent — English does not carry
 * 他 gracefully, and Claude Tag calls its own teammate "it" throughout.
 * Strings that embed a runtime value (composer placeholder, reply count,
 * todo timestamp, FAQ count) are handled by patterns in i18n.tsx.
 */
export const ENGLISH: Record<string, string> = {
  /* ---------- nav ---------- */
  /* '功能' → 'Features' is defined once, down in the pricing block; the
     nav reuses it. */
  '方案': 'Solutions',
  '集成': 'Integrations',
  '付费': 'Pricing',
  'FAQ': 'FAQ',
  '登录': 'Log in',
  '申请使用': 'Request access',
  'Ola 都能帮你做什么': 'What Ola handles for you',
  '选择语言': 'Select language',
  '简体中文': '简体中文',

  /* ---------- hero ---------- */
  /* Three fragments rather than two, so the English build can break after
     "New". They do not map word for word — 你的 is not "Your New" on its
     own — but the concatenation is what has to read correctly, and Chinese
     word order will not split at the same points English does.

     The trailing space on 新 is load-bearing: JSX drops the whitespace
     between text and the highlighted span, and without it English reads
     "FavoriteHire". It sits on this half so the space stays outside the
     green box. */
  '你的': 'Your New',
  '新': 'Favorite ',
  '同事': 'Hire',
  '主动干活的队友，就在你原本工作的地方 —— 飞书、Lark、WhatsApp、Slack、Teams。':
    'Your proactive teammate, right where you already work. It lives in Feishu, Lark, WhatsApp, Slack and Teams.',

  /* ---------- demo: tabs ---------- */
  '追进度': 'Catch up',
  '查数据': 'Pull numbers',
  '盯群聊': 'Monitor channels',
  '找线索': 'Find leads',
  '建手册': 'Build docs',
  '查决策': 'Trace decisions',
  '提缺陷': 'File issues',
  '听录音': 'Digest recordings',
  '拆任务': 'Split handoffs',
  '备会面': 'Call prep',
  '看早报': 'Morning briefing',
  '拟回复': 'Draft replies',
  '找待办': 'Catch loose ends',
  '挂后台': 'Run long tasks',
  '写日报': 'Daily recap',

  /* ---------- demo: chrome ---------- */
  '提示词': 'Prompt',
  '消息': 'Messages',
  '日程': 'Schedule',
  '任务': 'Tasks',
  '会议': 'Meetings',
  '工作台': 'Workspace',
  '智能体': 'AGENT',

  /* ---------- demo: group names ---------- */
  '商业化': 'go-to-market',
  '模型质量': 'model-quality',
  '线上告警': 'prod-alerts',
  '增长获客': 'growth',
  '产品手册': 'product-docs',
  '新人答疑': 'onboarding',
  '研发反馈': 'eng-tickets',
  '访谈复盘': 'interview-notes',
  '项目推进': 'delivery',
  '客户成功': 'customer-success',
  '每日早报': 'daily-briefing',
  '客户对接': 'acme-account',
  '周会跟进': 'weekly-review',
  '客户调研': 'customer-research',
  '团队日结': 'daily-wrap',

  /* ---------- demo: catch up ---------- */
  '报价这版我改成按席位了，文案周五给':
    'Latest pricing draft moves to per-seat. Copy lands Friday.',
  '旧版入口还留吗？上周说的方案二一直没定':
    'Are we keeping the old entry point? Option two from last week is still open.',
  '我出差刚回来，这个群这周定了什么、还有什么没定？':
    'Just back from a trip — what got decided here this week and what’s still open?',
  '从头读完这个群本周的 214 条消息。': 'Read this week’s 214 messages from the top.',
  '分清哪些已经拍板、哪些还悬着。': 'Sorted what’s settled from what’s still pending.',
  '写成小结。': 'Wrote the summary.',
  '已定：': 'Decided:',
  '报价改成按席位计费 —— 下周一上线，文案周五交。':
    'Pricing moves to per-seat — ships Monday, copy due Friday.',
  '旧版入口保留到 9 月底，之后下线。':
    'The old entry point stays until the end of September, then goes.',
  '还没定：': 'Still open:',
  '海外定价要不要单独做一套 —— 周三之后没人接话，卡了四天。':
    'Whether overseas pricing gets its own model — nobody has picked it up since Wednesday, four days stalled.',
  '谁去跟法务确认合规口径，苏敏提了但没指人。':
    'Who chases Legal on the compliance wording. Sarah raised it but never assigned it.',

  /* ---------- demo: pull numbers ---------- */
  '检索助手这两天是不是变笨了': 'Has the retrieval assistant gotten worse these last two days?',
  '有数吗 我这边看着还行': 'Any numbers on that? Looks fine from where I sit.',
  '把上周各项目的 trace 质量评分拉一下，掉得最多的排前面。':
    'Pull last week’s trace quality scores by project, biggest drop first.',
  '从 Langfuse 拉了上周四个项目的 trace 评分。':
    'Pulled last week’s trace scores for all four projects from Langfuse.',
  '按环比跌幅排序，掉得最多的排前面。': 'Ranked by week-over-week change, steepest drop first.',
  '上周四个项目的质量评分，按环比变化排的。':
    'Last week’s quality scores across the four projects, ordered by week-over-week change.',
  '项目': 'Project',
  '上周': 'Last week',
  '环比': 'WoW',
  '检索助手': 'Retrieval',
  '文档摘要': 'Summarizer',
  '代码审查': 'Code review',
  '客服问答': 'Support Q&A',
  '只有检索助手明显掉了，且集中在工具调用失败那一段，不是模型本身的问题 —— 失败样本里 78% 是同一个超时。要我把这批 trace 拉出来吗？':
    'Only Retrieval moved, and it’s concentrated in failed tool calls rather than the model itself — 78% of the failures are the same timeout. Want me to pull those traces?',

  /* ---------- demo: monitor channels ---------- */
  '又手动翻了一遍日志…': 'Went through the logs by hand again…',
  '昨天那批报错有人汇总过吗': 'Did anyone summarize yesterday’s errors?',
  '以后每天早上九点，把昨天的报错按项目汇总发这个群。':
    'From now on, post a summary of yesterday’s errors by project in this channel at 9am.',
  '好，从现在起盯着「线上告警」。每天 09:00 汇总昨天的报错发这个群，只有需要你拍板时才 @ 你。':
    'On it — watching prod-alerts from now on. I’ll post yesterday’s errors here at 09:00 daily and only tag you when something needs your call.',
  '同一个报错只报一次，不重复刷屏。': 'Each distinct error reported once, no repeats.',
  '数量比前一天翻倍的排最前面。': 'Anything that doubled overnight goes to the top.',
  '没有新报错就不发。': 'Nothing new, nothing posted.',

  /* ---------- demo: find leads ---------- */
  '这周还差 10 个目标客户': 'Still ten target accounts short this week.',
  '帮我做获客调研，找正在用 Langfuse 的 AI agent 公司。先出方案，我确认再动手。':
    'Run lead research for me — AI agent companies using Langfuse. Give me the plan first, I’ll confirm before you start.',
  '扫了 Langfuse 公开客户和今年的融资新闻。':
    'Scanned Langfuse’s public customers and this year’s funding news.',
  'GitHub 那条按你说的去掉了。': 'Dropped the GitHub angle as you asked.',
  '动手之前先说方案。打算扫三个来源：':
    'The plan before I start. Three sources:',
  '扫描来源': 'Sources to scan',
  'Langfuse 官网公开的客户名单': 'Langfuse’s published customer list',
  '今年的融资新闻里提到 Langfuse 的公司': 'Companies naming Langfuse in this year’s funding news',
  'GitHub 上引用了 Langfuse 的仓库': 'GitHub repos that depend on Langfuse',
  '同行和研究项目会剔掉，剩下的写进「获客线索表」。要删要加你说一声。':
    'Competitors and research projects get filtered out; the rest goes to the Leads table. Say if you want a source dropped or added.',
  '剔除同行和研究项目后写进「获客线索表」。':
    'Filtered out competitors and research projects, wrote the rest to the Leads table.',
  '本周扫到 14 家，剔掉 9 家同行和研究项目。下面是标了高优先的 5 家。':
    'Found 14 this week and cut 9 competitors and research projects. Here are the 5 marked high priority.',
  '融资': 'Funding',
  '优先级': 'Priority',
  'A 轮 · 今年 3 月': 'Series A · March',
  '种子 · 今年 1 月': 'Seed · January',
  'A+ · 去年 11 月': 'Series A+ · Nov last year',
  '未披露': 'Undisclosed',
  '高': 'High',
  '中': 'Med',
  'Pre-A · 今年 5 月': 'Pre-A · May',
  '确认的话我每 30 分钟扫一次，新的直接入表并通知你。':
    'Say the word and I’ll scan every 30 minutes, write new ones straight to the table and ping you.',
  '打开「获客线索表」': 'Open the Leads table',
  'GitHub 那路先去掉，搜出来大多是同行不是客户。':
    'Drop the GitHub angle — it surfaces competitors, not customers.',

  /* ---------- demo: build docs ---------- */
  '新人今天第三次问怎么接入了': 'Third time today a new hire has asked how to get set up.',
  '文档散在几个地方，我也找不着': 'The docs are scattered — I can’t find them either.',
  '给产品建个知识库，目标读者是新用户。你先出目录结构方案，我确认后你再建。':
    'Build a product wiki aimed at new users. Give me the structure first, then build it once I confirm.',
  '先出目录结构，等你确认再动手写。': 'Drafted the structure, holding on the writing until you confirm.',
  '把现有 4 篇文档移进空间，不复制。': 'Moved the 4 existing docs into the space — moved, not copied.',
  '每页先写标题和分节要点。': 'Every page has a title and section outline so far.',
  '目录（等你确认）：': 'Structure, pending your OK:',
  '快速上手 · 使用场景 · 实战案例': 'Getting started · Use cases · Walkthroughs',
  '发布日记 · FAQ · 技术支持 · 关于': 'Changelog · FAQ · Support · About',
  '已经做了的：': 'Already done:',
  '现有 4 篇是移动进去的，不是复制 —— 保持单一来源，改一处全库同步。':
    'The 4 existing docs were moved rather than copied — single source, so one edit updates everywhere.',
  '每页写好了标题和分节要点，正文等你点头再填。':
    'Titles and section outlines are in. I’ll fill the body once you sign off.',

  /* ---------- demo: trace decisions ---------- */
  '刚接手 CRM 这块，有个问题想问': 'Just picked up the CRM work — one question.',
  '文档里只写了怎么用，没写当初为什么这么选':
    'The docs cover how to use it, not why we chose it.',
  '我们当初为什么选多维表格做 CRM，而不是上一套现成的？':
    'Why did we build the CRM on Feishu Base instead of buying one off the shelf?',
  '翻了三月那两轮技术选型讨论。': 'Went back through both March rounds of the tooling debate.',
  '对了当时的会议纪要和最后拍板的那条。':
    'Cross-checked the meeting notes against the message that settled it.',
  '把没结论的部分也挑出来了。': 'Pulled out the parts that never got resolved.',
  '三月中讨论过两轮，最后是苏敏拍的板。当时对比的是一套现成 CRM 和飞书多维表格。':
    'Two rounds in mid-March, and Sarah made the call. The comparison was an off-the-shelf CRM against Feishu Base.',
  '当时的理由：': 'The reasoning at the time:',
  '客户字段每两周就要改一次，现成 CRM 改字段要走工单，等不起。':
    'Customer fields changed every two weeks, and a schema change in the packaged CRM meant filing a ticket and waiting.',
  '数据本来就在飞书里，不想再维护一套同步。':
    'The data already lived in Feishu; nobody wanted to maintain another sync.',
  '团队当时 12 个人，按席位买不划算。':
    'The team was 12 people — per-seat pricing didn’t pencil out.',
  '当时的保留意见：': 'The objection nobody settled:',
  '林昊担心记录过万之后筛选会变慢 —— 这条到今天还没验证过，你接手可以留意。':
    'Marcus worried filtering would slow past ten thousand records. That was never tested — worth watching now that it’s yours.',
  '三月技术选型讨论': 'March tooling debate',
  '当时的会议纪要': 'Meeting notes',

  /* ---------- demo: file issues ---------- */
  '导出 CSV 超过 5 万行就卡住，转圈不动':
    'CSV export hangs past 50k rows — just spins.',
  '我这边也复现了，10 万行必挂。日志里一堆超时':
    'Reproduced here too. 100k fails every time, and the logs are full of timeouts.',
  '上面这个问题帮我提个 Issue，把复现步骤和日志都带上。':
    'File an issue for the bug in this thread, with repro steps and the logs.',
  '提好了。把你俩的描述合成一份，补了环境、版本和三段日志。':
    'Filed. Merged both your reports into one, and added environment, version and three log excerpts.',
  'Issue #412 · bug · 已指派 林昊 · 附 3 段日志':
    'Issue #412 · bug · assigned to Marcus · 3 log excerpts',
  '里面写了：': 'What’s in it:',
  '复现步骤：新建导出任务 → 选全部字段 → 行数超过 5 万即挂起。':
    'Repro: new export job → select all fields → hangs above 50k rows.',
  '影响范围：仅 CSV 导出，Excel 导出正常。':
    'Scope: CSV export only. Excel export is fine.',
  '首次出现：v5.2.1 之后，v5.2.0 上跑 12 万行没问题。':
    'First seen after v5.2.1. v5.2.0 handled 120k rows without complaint.',
  '另外 #288 描述的应该是同一个问题，只是当时以为是网络。我在 Issue 里关联了，要不要一起关掉？':
    '#288 looks like the same bug, filed back when we assumed it was the network. I’ve linked them — want to close it out together?',
  'Issue #412': 'Issue #412',
  '可能重复的 #288': 'Possible duplicate #288',

  /* ---------- demo: digest recordings ---------- */
  '昨天那场聊了两个多小时，信息量很大':
    'Yesterday’s session ran over two hours and was dense.',
  '这段是我向前辈请教早期打法的录音。完整转写后通读全文，整理成结构化笔记。':
    'This is a recording of me asking a mentor about early go-to-market. Transcribe it in full, read the whole thing, then turn it into structured notes.',
  '145 分钟全部转写，分说话人、带时间戳。':
    'Transcribed all 145 minutes, split by speaker with timestamps.',
  '通读全文，不是抓摘要。': 'Read it end to end rather than skimming for a summary.',
  '整理成结构化笔记并归位入库。': 'Wrote structured notes and filed them in the wiki.',
  '他给的方法论：': 'His method:',
  '先找 10 个愿意被打扰的人，别做问卷。':
    'Find ten people who’ll take your call. Don’t send a survey.',
  '定价先按结果收费，跑通再改订阅。':
    'Charge on outcomes first; move to subscription once it works.',
  '前 50 个客户必须创始人自己签。':
    'The founder signs the first fifty customers personally.',
  '和你判断不一致的地方：': 'Where he disagreed with you:',
  '你想先做自助注册，他认为现阶段应该全部手动上门 —— 我如实留着没抹平。':
    'You want self-serve signup first; he thinks everything should be hand-sold at this stage. Left as said rather than smoothed over.',
  '8 个核心观点 · 6 条落地启示 · 逐字稿与笔记各一份':
    '8 key points · 6 things to act on · transcript and notes, one each',
  '逐字稿': 'Transcript',
  '结构化笔记': 'Structured notes',

  /* ---------- demo: split handoffs ---------- */
  '刚开完会，交接我贴群里了': 'Just out of the meeting — handoff is in the thread.',
  '有点长，大家自己看下': 'It’s long. Have a read.',
  '把上面这段 handoff 拆成任务清单，每条一行含负责人和优先级，按职责自动分。':
    'Break the handoff above into a task list — one row each with owner and priority, assigned by who does what.',
  '读完那段 400 字的交接，数出 13 件事。':
    'Read the 400-word handoff and counted 13 distinct items.',
  '按各人职责分配负责人和优先级。': 'Assigned owners and priorities by role.',
  '写进「推进商业化」任务表。': 'Wrote them to the go-to-market task table.',
  '13 条都建好了，每条一行。下面是 5 条 P1。':
    'All 13 created, one row each. Here are the 5 marked P1.',
  '负责人': 'Owner',
  '截止': 'Due',
  '新服务器挂 worker node': 'Attach worker node to new server',
  '林昊 · 周然': 'Marcus · Rachel',
  '报价页文案定稿': 'Finalize pricing page copy',
  '法务合规口径确认': 'Confirm compliance wording with Legal',
  '手册维护交接': 'Hand over docs maintenance',
  '海外定价方案': 'Overseas pricing model',
  '截止时间统一设成 8 月 5 日 24:00（北京时间）。有两条我拿不准该派给谁，先标了问号，你补一下。':
    'All due 5 August, 24:00 Beijing time. Two I couldn’t place — marked with a question mark for you to fill in.',
  '打开「推进商业化」': 'Open the task table',

  /* ---------- demo: call prep ---------- */
  '下午两点陈先生那个会，资料齐了吗': 'The 2pm with Mr. Chen — do we have everything?',
  '我记得上次留了尾巴没跟': 'Pretty sure we left something hanging last time.',
  '我下午两点见陈先生，把他的历史接触记录和还没跟进的待办给我。':
    'I’m meeting Mr. Chen at 2 — pull his history with us and anything still outstanding.',
  '陈先生 · 今天 14:00 —— 跨境电商 SaaS，团队 40 人，卡在多仓库存同步。':
    'Mr. Chen · 2pm today — cross-border e-commerce SaaS, 40 people, stuck on multi-warehouse inventory sync.',
  '聊过 4 次，最近一次三周前。': 'Four conversations so far, the last three weeks ago.',
  '上次结论：先跑一个仓试点，两周内给数据。':
    'Last agreed: pilot one warehouse, numbers back within two weeks.',
  '没跟进：试点结果、报价单 —— 两条都停了三周。':
    'Not followed up: pilot results and the quote — both untouched for three weeks.',
  '留意：他上次提过在比另一家，当时判断是压价筹码。':
    'Watch: he mentioned evaluating a competitor last time. Read then was leverage, not a real threat.',
  '打法：先问试点数据，拿到结果再谈报价，别先报价。':
    'Play: ask for the pilot numbers first, price only once you have them. Don’t lead with the quote.',
  '团队规模是我从公开渠道推算的，标了「待确认」，别当准数用。':
    'Headcount is my estimate from public sources — marked unconfirmed, so don’t quote it as fact.',
  '四次会谈纪要': 'All four meeting notes',
  '客户档案': 'Account record',

  /* ---------- demo: morning briefing ---------- */
  '昨晚 GitHub 那波合并有人看了吗': 'Did anyone look at last night’s merges on GitHub?',
  '等早报吧，一条一条翻太累': 'I’ll wait for the briefing — going through them one by one is a slog.',
  '把昨晚各个工具的动静汇总成早报，以后每天九点自动发这儿。':
    'Summarize last night’s activity across our tools into a briefing, and post it here at 9am daily from now on.',
  '扫了 GitHub、Notion、Langfuse 昨晚 18:00 之后的全部变动。':
    'Swept every change in GitHub, Notion and Langfuse since 18:00 last night.',
  '只留下和在做的事相关的，例行同步略过。':
    'Kept what touches live work and skipped the routine syncs.',
  '昨晚发生了什么：': 'Overnight:',
  'GitHub：合了 6 个 PR，#412 那个导出卡死修好了。':
    'GitHub — 6 PRs merged, including the fix for the #412 export hang.',
  'Langfuse：检索助手评分掉到 4.05，连续第三天往下走。':
    'Langfuse — Retrieval down to 4.05, third day of decline.',
  'Notion：产品方案 v3 被改了三处，都在定价那一节。':
    'Notion — three edits to product plan v3, all in the pricing section.',
  '需要你今天定的：': 'Needs your call today:',
  '检索助手要不要回滚上周那次改动 —— 掉了三天，还没人认领。':
    'Whether to roll back last week’s Retrieval change — three days of decline and nobody has picked it up.',
  '明早九点起自动发。没有新变动就不发，不占你的消息列表。':
    'Posting automatically from 9am tomorrow. Quiet nights get no message.',

  /* ---------- demo: draft replies ---------- */
  '客户昨晚连发了三条': 'The customer sent three messages last night.',
  '问的其实是同一件事': 'All asking the same thing, really.',
  '客户这三条帮我拟个回复，按我平时的语气来，别太官腔。':
    'Draft a reply to these three. Use my usual voice — nothing stiff.',
  '三条问的是同一件事 —— 试点数据什么时候给。按你以前回他的写法拟了一版：':
    'All three ask the same thing: when the pilot numbers land. Here’s a draft in the way you’ve answered him before.',
  '草稿：': 'Draft:',
  '王工，试点数据这周五之前给到你。上周仓库那边盘点占了两天，耽误了一点。数据出来我直接发群里，有问题我们随时对。':
    'Mr. Wang — you’ll have the pilot numbers by Friday. Stocktake at the warehouse ate two days last week, which set us back a little. I’ll post them here as soon as they’re in, and we can go through anything that looks off.',
  '你回客户一般不写敬语开头，延迟会主动说原因，所以我照这个来的。语气要调直接跟我说。':
    'You don’t open with pleasantries and you explain delays without being asked, so I wrote it that way. Say the word if you want the tone shifted.',

  /* ---------- demo: catch loose ends ---------- */
  '这周聊了太多事': 'Too much went through here this week.',
  '总觉得漏了什么，但想不起来': 'Sure I’ve missed something, can’t think what.',
  '这周群里散着的待办帮我捡一下，别只看我说的。':
    'Round up the to-dos scattered through this week’s messages — not just mine.',
  '翻了本周 7 个群。': 'Went through 7 channels from this week.',
  '挑出被当成闲聊说出口、但其实是承诺的话。':
    'Picked out the lines that were said in passing but were really commitments.',
  '已经建过任务的排除掉了。': 'Excluded anything already tracked as a task.',
  '捡到 5 条，都没人建任务。下面是逾期和快到期的三条。':
    'Found 5, none of them tracked. Here are the three overdue or nearly there.',
  '谁答应的': 'Who',
  '答应了什么': 'Committed to',
  '什么时候说的': 'When',
  '给苏敏报价口径': 'Pricing wording for Sarah',
  '周一 · 已逾期 2 天': 'Monday · 2 days overdue',
  '补一版压测数据': 'Load-test numbers',
  '周二 · 没说时间': 'Tuesday · no date given',
  '约客户复盘会': 'Book the customer retro',
  '周三 · 本周内': 'Wednesday · this week',
  '要我建成任务吗？默认派给说这话的人，你可以再改。':
    'Want these as tasks? I’ll assign each to whoever said it, and you can move them.',

  /* ---------- demo: run long tasks ---------- */
  '40 份纪要，人工读一遍得一整天': '40 write-ups — reading them by hand is a full day.',
  '这 40 份客户访谈纪要，按行业归类，每类提炼共性需求，做成一张表。':
    'Take these 40 customer interview write-ups, group them by industry, pull the common needs from each group, and put it in a table.',
  '这活不短，我挂后台跑。先把目标写清楚，你看对不对：':
    'This one’s long, so I’ll run it in the background. Here’s the goal as I read it — check me:',
  '40 份逐份读完，不抓摘要。': 'Read all 40 in full rather than skimming.',
  '按行业归类，行业标签从内容里长出来，不预设。':
    'Group by industry, with the labels coming out of the content instead of a fixed list.',
  '每类提炼共性需求，只留 3 份以上提到的。':
    'Pull the shared needs per group, keeping only what shows up in three or more.',
  '结果写进新建的多维表格。': 'Write the result to a new Base table.',
  '没问题我就开跑。期间你该干嘛干嘛，跑完我回来找你。':
    'If that’s right I’ll start. Carry on with your day — I’ll come back when it’s done.',
  '跑完了。40 份读完，归到 6 个行业。':
    'Done. All 40 read, sorted into 6 industries.',
  '行业': 'Industry',
  '份数': 'Count',
  '最高频需求': 'Most common need',
  '跨境电商': 'Cross-border e-comm',
  '多仓库存同步': 'Multi-warehouse sync',
  '制造': 'Manufacturing',
  '工单与排产打通': 'Work orders ↔ scheduling',
  '专业服务': 'Professional services',
  '项目工时归集': 'Project time tracking',
  '零售': 'Retail',
  '门店日报自动化': 'Automated store reports',
  '跨境电商那组 9 份里有 7 份提到多仓同步，比第二名高一倍。另外 2 份行业拿不准，标了「待确认」没硬归。':
    '7 of the 9 cross-border write-ups raise multi-warehouse sync — twice the next most common. Two I couldn’t place, marked unconfirmed rather than forced into a group.',
  '40 份 · 6 个行业 · 后台跑了 2 小时 24 分':
    '40 write-ups · 6 industries · 2h 24m in the background',

  /* ---------- demo: daily recap ---------- */
  '今天过得也太快了': 'Where did today go.',
  '今天这个群干了啥、还剩啥，给我个小结。':
    'Wrap up what this channel got done today and what’s left.',
  '今天做完的：': 'Done today:',
  '报价页文案定稿，苏敏交了。': 'Pricing page copy finalized — Sarah delivered.',
  '#412 导出卡死已合并上线。': 'The #412 export hang is merged and live.',
  '客户王工的回复发出去了。': 'Reply to Mr. Wang went out.',
  '还开着的：': 'Still open:',
  '海外定价方案 —— 今天又没人接，卡第五天了。':
    'Overseas pricing — nobody picked it up again today, day five.',
  '压测数据，林昊说补，还没动。':
    'Load-test numbers. Marcus said he’d add them, hasn’t started.',
  '明天到期：': 'Due tomorrow:',
  '法务合规口径确认 —— 明天 24:00，现在还没指人。':
    'Compliance wording with Legal — due 24:00 tomorrow, still unassigned.',
  '明早九点我再提醒一次那条到期的。':
    'I’ll raise the one that’s due again at 9am.',

  /* ---------- demo: blurbs ----------
     Titles expand the tab label the way Claude Tag's do ("Catch up" →
     "Catch up fast"); bodies stay to two sentences. */
  '几秒钟追上一整个群': 'Catch up in seconds',
  '出差回来不用从头翻。已经拍板的、还悬着的、等你点头的，分三类给你，每条注明谁说的、什么时候说的。':
    'Back from a trip and nothing to scroll through. Settled, still open, and waiting on you — sorted into three, each line noting who said it and when.',
  '数据直接发到群里': 'Numbers, posted in the thread',
  '让他去查，结果连表格一起发在群里——全组都看得到，谁有疑问当场接着问，不用你转发一遍。':
    'Ask and the answer lands in the channel, table and all. The whole team sees it and can keep asking right there — nothing to forward.',
  '聊着聊着就把 Issue 提了': 'File the issue from the thread',
  '几个人各说半个 bug，他合成一份完整的 Issue：复现步骤、影响范围、首次出现的版本，还会翻出可能重复的旧单。':
    'Two people each describe half a bug; Ola merges them into one issue with repro steps, scope and the version it first appeared in — then digs up the older ticket that looks like a duplicate.',
  '进会议室之前就准备好了': 'Briefed before you walk in',
  '聊过几次、上次结论是什么、哪些待办停着没动，开会前自动汇总。推算出来的信息会标「待确认」，不会混进事实里。':
    'How many times you have spoken, what was agreed last time, what has been sitting untouched since — pulled together before the meeting. Anything inferred is marked unconfirmed rather than passed off as fact.',
  '盯住那些没人顾得上的群': 'Watch what nobody has time for',
  '交代一次，他就长期守着：汇总报错、按严重程度排序、只有需要你拍板时才 @ 你。没有新情况就不出声。':
    'Say it once and it keeps watching: errors summarized, ranked by severity, and you only get tagged when something needs your call. Quiet days stay quiet.',
  '一段交接，拆成一张表': 'A handoff, turned into a table',
  '老板甩过来的长消息不用你先整理。每条一行，负责人和优先级都填好，拿不准该派给谁的会标出来问你。':
    'No need to tidy the long message first. One row per item with owner and priority filled in, and anything it cannot place is flagged for you rather than guessed.',
  '捡起那些随口答应的事': 'Catch what was promised in passing',
  '他会翻遍这周的群，把说完就忘的承诺挑出来——谁答应的、答应了什么、什么时候说的，一条不落。':
    'It reads back through the week and pulls out the commitments made in passing and forgotten since — who promised what, and when they said it.',
  '按你的语气拟稿': 'Drafted in your voice',
  '他记得你平时怎么写：不写敬语开头、延迟会主动说原因。拟完还会告诉你为什么这么写，不满意直接说改哪。':
    'It knows how you write — no formal opener, delays explained without being asked. It tells you why it chose that tone, and you say what to change.',
  '昨晚发生了什么': 'What happened overnight',
  '各个工具的夜间变动汇总成一条，例行同步略过，只留和在做的事相关的，末尾附一句「今天需要你定什么」。':
    'Every overnight change across your tools in one message, routine syncs skipped and only live work kept — closing with what needs deciding today.',
  '一天结束时的收尾': 'How the day closed out',
  '今天做完的、还开着的、明天到期的，分三栏。卡了几天没人接的会点出来，明天到期还没指人的会提醒你。':
    'Done, still open, and due tomorrow — in three columns. Anything stalled for days gets named, and anything due tomorrow without an owner gets raised.',
  '翻出几个月前的那次讨论': 'Find the decision from months back',
  '新人问「当初为什么这么定」，他能翻到三个月前的两轮讨论，连当时没被解决的保留意见一起交出来。':
    'A new hire asks why it was built this way, and Ola surfaces both rounds of the debate from three months ago — including the objection that was never resolved.',
  '两小时录音，是读完不是听完': 'Two hours of audio, read not skimmed',
  '逐字转写之后通读全文，不是抓摘要，中段那几个观点不会漏。和你判断不一致的地方会如实留着，不抹平。':
    'Transcribed in full, then read end to end rather than skimmed for a summary, so the points buried mid-conversation survive. Where it disagrees with you, it says so instead of smoothing it over.',
  '重活挂后台，你该干嘛干嘛': 'Long jobs run in the background',
  '四十份纪要要读两个多小时。他先把目标写清楚给你确认，然后自己跑，跑完回来找你，期间不占用对话。':
    'Forty write-ups take over two hours to read. It states the goal, waits for your nod, then works without tying up the conversation and comes back when it is done.',
  '线索自己长进表里': 'Leads that fill their own table',
  '先出方案给你确认，再按你砍剩的渠道扫。同行和研究项目会剔掉，确认后每 30 分钟扫一次，新的直接入表。':
    'It proposes the approach first, then works the channels you left standing. Competitors and research projects are filtered out, and once approved it scans every 30 minutes and writes new finds straight to the table.',
  '先出目录，再动笔': 'Structure first, then the writing',
  '结构定错了，内容写得再好也白写。所以他先给目录等你确认，现有文档用移动不用复制——保持单一来源。':
    'Get the structure wrong and the best writing is wasted, so it hands you the outline before it starts. Existing docs are moved rather than copied, keeping one source of truth.',

  /* ---------- how it works ---------- */
  /* Two short sentences, after the reference's 「Plug-and-play. Live in two
     minutes.」 — a claim and a promise, where the old line only restated
     the steps below it. */
  '连接工具，交给 Ola，几分钟后拿到结果。':
    'Connect your tools, hand it to Ola, and get the result in minutes.',
  '沟通入口': 'Where you talk to it',
  '已连接工具': 'Connected tools',
  '私聊': 'DMs',
  '群聊': 'Channels',
  '多维表格': 'Base',
  '知识库': 'Wiki',
  '已完成任务': 'Completed task',
  '业务周报已交付': 'Weekly business report delivered',
  '已发送到「业务结果」群': 'Sent to the #business-results channel',
  '刚刚完成': 'Completed just now',
  '执行中枢': 'Work hub',
  '私聊和群聊都能找到 Ola': 'Reach Ola in DMs or channels',
  '也能操作多维表格与知识库': 'Also works directly in Base and Wiki',
  /* Imperative titles and outcome-shaped bodies, after the reference's
     onboarding: "Add to Slack or Teams" / "Connect your tools" / "Assign
     your first job". The previous three ended on an administrative chore —
     syncing a directory — so the section closed on paperwork rather than
     on the thing the reader came for. The admin approval is still stated,
     as a clause inside step one, because the docs are emphatic that it is
     where teams get stuck. */
  '装上': 'Install',
  '加到飞书或 Lark': 'Add it to Feishu or Lark',
  '从应用市场装上。管理员点两次授权、过一次审，他就出现在工作区里，像任何一位新同事。':
    'Install it from the app directory. Two grants and one admin approval later it shows up in the workspace, like any new teammate.',
  '接通': 'Connect',
  '接上你的工具': 'Connect your tools',
  'GitHub、Notion、Langfuse 各连一次。每接一个，他就多一件能动手做的事，不只是能看。':
    'Link GitHub, Notion and Langfuse once each. Every connection is one more thing it can act on, not just read.',
  '交活': 'Assign',
  '交给他第一件活': 'Assign your first job',
  '挑一件平时要占你一整周的事。他做完，然后你可以让他每周自己再做一遍。':
    'Pick something that normally eats your week. It does the job — then runs it every week on its own if you want.',

  /* ---------- workspace ---------- */
  /* One node now, not three. The heading used to be split so a <span>
     could tint the middle clause navy; with the tint gone the split
     only made the English depend on three fragments concatenating. */
  '群聊使用团队上下文，结果全群共享；私聊只属于你，内容不会回到群里。':
    'Channels use team context and share the result with everyone. DMs belong to you, and never return to a channel.',
  '团队上下文，共同推进': 'Team context, shared momentum',
  '#项目推进': '#project-delivery',
  '6 位成员': '6 members',
  '@Ola 汇报本周还没完成的事项。': '@Ola, report what is still open this week.',
  '已整理 6 项，并同步到团队任务表。': 'Six items found and synced to the team task list.',
  /* Was a quoted reply; now an event line in the thread's closing strip,
     mirroring the private panel's lock note. */
  '林昊 接手了第 3 项': 'Marcus picked up item three',
  '结果全群可见': 'Visible to everyone',
  '任何人都能继续': 'Anyone can continue',
  '个人上下文，彼此隔离': 'Personal context, kept separate',
  '你与 Ola': 'You and Ola',
  '仅你可见': 'Only you can see this',
  '准备我明天的客户会议。': 'Prepare me for tomorrow’s customer meeting.',
  '材料已整理，只在这次私聊中可见。': 'Everything is ready, visible only in this DM.',
  '不会带回任何群聊': 'Never carried into a channel',
  '只服务你': 'Works only for you',
  '私人内容不共享': 'Private content stays private',

  /* ---------- people ----------
     Romanised so an English reader can hold the names, and the avatar
     avatars carry an abstract mark rather than initials, so only the full
     names need translating — and they are not transliterated. A romanised
     陈曦 is still a Chinese name wearing Latin letters; the English build
     gets names an American reader would actually meet at work. Anywhere a
     name appears inside a sentence has to follow, which is why several
     lines below say Sarah or Marcus rather than the pinyin. */
  '陈曦': 'Emily Carter',
  '李维': 'Daniel Reed',
  '苏敏': 'Sarah Klein',
  '林昊': 'Marcus Webb',
  /* Avatar initials in the workspace roster. The English build gives
     these two American names, so the Han surnames on their avatars
     have to follow — a 林 chip next to "Marcus picked up item three"
     reads as two different people. */
  '林': 'MW',
  '苏': 'SK',
  '周然': 'Rachel Nolan',
  '高远': 'Tom Becker',
  '许静': 'Anna Doyle',
  '郑川': 'Chris Vaughn',

  /* ---------- workspace console ---------- */
  '你': 'You',
  '飞书': 'Feishu',

  /* ---------- pillars ---------- */

  /* Six capability cards, in Claude Tag's register: a noun-phrase title and
     one or two tight sentences. Bodies stay under 25 words — the earlier
     three-card version ran to full paragraphs and said less. */
  '有自己的账号': 'Its own account',
  '不借用任何人的身份。权限由管理员统一配，没给的他直接拒绝。':
    'It never borrows anyone’s login. Admins grant access centrally, and anything outside that it refuses outright.',
  '跨天、跨人的记忆': 'Memory across days and people',
  '上个月为什么那么定，今天还记得。有人离开，记忆留下。':
    'Why the team decided what it did last month is still there today. People move on; the memory stays.',
  '群里的共享资源': 'A shared resource in the channel',
  '他干的活全群可见，谁都能接着往下问，不用你转发一遍。':
    'Everyone sees the work, not just whoever asked, and anyone can pick up the thread. Nothing to forward.',
  '不用一问一答地等': 'No waiting turn by turn',
  '想到什么发什么，零散的几句他自己拼成一件事，按顺序做完。':
    'Send things as they occur to you. Ola stitches the fragments into one task and works them in the order you gave.',
  '重活挂后台': 'Long jobs run in the background',
  '长任务不占对话。你该干嘛干嘛，跑完他回来找你。':
    'A long task never ties up the conversation. Carry on with your day; it comes back when it’s done.',
  '设一次，长期跑': 'Set it once, it keeps running',
  '每天早报、每周汇总，到点自己开工，不用你记得提醒他。':
    'A morning briefing, a weekly roll-up — it starts on schedule without anyone remembering to ask.',

  /* ---------- control ---------- */
  '高风险操作先确认；没有权限的内容，Ola 既看不到，也动不了。':
    'High-risk actions wait for approval. If you cannot access it, neither can Ola.',

  '不可逆操作': 'Irreversible action',
  '先确认，再执行。': 'Confirm first. Then act.',

  'Ola 请求批准': 'Ola requests approval',
  '等待确认': 'Awaiting you',
  '删除「Q3 客户调研」表中 128 行记录': 'Delete 128 rows from the Q3 Research table',
  '返回修改': 'Send back',
  '批准并执行': 'Approve and run',

  '默认最小权限': 'Least privilege by default',
  '你看不到的，': 'If you cannot see it,',
  'Ola 也看不到。': 'neither can Ola.',
  '所有访问都沿用公司现有的身份和权限。':
    'Every request follows your company’s existing identity and permissions.',

  '权限按人开放': 'Access granted per person',
  '随时可以收回': 'Revocable at any time',
  '数据不用于模型训练': 'Never training data',

  /* ---------- integrations ---------- */

  /* ---------- /integrations page ---------- */

  '搜索集成': 'Search integrations',
  '全部集成': 'All integrations',
  '个集成': 'integrations',
  '连上一次，团队里每个人的 Ola 都能用。管理员可以按人指定谁能用哪一个。':
    'Connect once and every teammate\u2019s Ola can use it. Admins decide, per person, who gets which.',
  '没有匹配的集成。换个词试试，或者直接告诉我们你想接什么。':
    'Nothing matched. Try another word, or just tell us what you want connected.',

  '沟通与协作': 'Chat and collaboration',
  '你在哪儿说话，他就在哪儿接活。私聊和群聊都能 @ 他，结果回到同一个会话里。':
    'It picks up work wherever you talk. @ it in a DM or a channel; the result comes back to the same thread.',
  '研发与代码': 'Code and engineering',
  '开 issue、追 PR、看日志。研发流程里的事，他能读，也能动手改。':
    'Open issues, chase PRs, read logs. It can act on the engineering flow, not just look at it.',
  '文档与知识': 'Docs and knowledge',
  '写进知识库，而不是丢回聊天框。整理好的东西留在团队找得到的地方。':
    'Written into the wiki, not dropped back in chat. What it organizes stays where the team can find it.',
  '客户与增长': 'Customers and growth',
  '客户信息实时录入，竞品动态定时汇总，跟进事项自动变成任务。':
    'Customer records filed as they happen, competitor moves rolled up on schedule, follow-ups turned into tasks.',
  '设计与素材': 'Design and assets',
  '取设计稿、对规范、把评审意见收敛成一条清单。':
    'Pull the file, check it against the spec, and boil review comments down to one list.',
  '邮件与账务': 'Email and billing',
  '发票与费用自动检测记录，邮件跟进写好草稿等你过目。':
    'Invoices and expenses caught and filed; follow-up email drafted and waiting for your read.',

  '飞书 / Lark': 'Feishu / Lark',
  '私聊、群聊、多维表格、知识库、妙记': 'DMs, channels, Base, Wiki, Minutes',
  '配对一次，语音和录音都能发': 'Pair once — voice notes and recordings included',
  '频道里 @ 他，结果回到频道': '@ it in a channel; the result lands there',
  '和飞书里是同一个 Ola': 'The same Ola as in Feishu',
  '开 issue、追 PR、写 Release Notes': 'Opens issues, chases PRs, writes release notes',
  '工单分诊，分配给合适的负责人': 'Triages tickets to the right owner',
  '拉链路和日志，定位问题出在哪一步': 'Pulls traces and logs to find which step broke',
  '会议纪要、日报、决策记录写进库': 'Minutes, daily notes and decisions written into the wiki',
  '读材料、归档产出、按项目建目录': 'Reads source files, archives output, files it by project',
  '客户信息实时录入，跟进不落地': 'Customer records filed live, so follow-ups do not slip',
  '找线索、看动态、准备客户背景': 'Finds leads, tracks moves, preps customer background',
  '竞品动态简报，到点自己开工': 'A competitor briefing that starts itself on schedule',
  '取设计稿，把评审意见收敛成清单': 'Pulls the file and boils review comments into a list',
  '跟进邮件写好草稿，等你过目再发': 'Drafts the follow-up and waits for your read',
  '发票与费用自动检测并记录': 'Catches and files invoices and expenses',

  '联系我们': 'Contact us',

  /* ---------- /product page ---------- */
  'Ola 产品': 'Ola Product',

  '看看全部能力': 'See every capability',
  /* '每天早报、每周汇总…' is already defined by the Pillars card. */
  '团队技能写一次': 'Write a team skill once',

  '快速上手': 'Quickstart guide',

  '更新日志': 'Changelog',

  /* ---------- /login ---------- */
  '）': ')',
  '和': ' and ',
  /* '了解更多' / '服务条款' / '隐私政策' / '。' / '登录' are all already
     defined by the nav and footer — one key, one English value. */

  /* ---------- /about ---------- */

  '不是插件，是同事': 'Not a plugin, a colleague',

  /* The Control section splits this across a <br> into two keys; as one
     sentence it is a different node and needs its own entry. */
  '你看不到的，Ola 也看不到。': 'If you cannot see it, neither can Ola.',

  /* ---------- /blog ---------- */

  '同一个 Ola，两种信息边界': 'One Ola, two information boundaries',

  '分享': 'Share',

  /* '博客' / '产品' / '安全' come from the footer columns, and the
     permissions paragraph from /about — one key, one English value. */

  /* ---------- /how ---------- */

  '团队技能': 'Team skills',

  '定时任务': 'Scheduled jobs',
  /* '看看全部能力' comes from /product, and the two integration lines
     from /integrations — one key, one English value. */

  /* ---------- /compare ---------- */

  /* One node here, so the per-word keys from /product do not apply. */

  /* ---------- /customers ---------- */
  '电商': 'E-commerce',
  /* '制造' is already defined by the demo scenarios and '研发' by the
     footer's use-case column — one key, one English value. */

  /* ---------- /enterprise ---------- */
  /* Trailing space on purpose: the Chinese runs straight into the tinted
     <span>, English needs a word gap. Without it the h1 read
     "work toone colleague". */
  '销售': 'Sales',

  /* ---------- pricing ---------- */
  '免费': 'Free',
  '想先试试的个人和小团队。所有功能、所有集成，先用起来。':
    'For individuals and small teams kicking the tyres. Everything is switched on.',
  '额度与用量': 'Credit and usage',
  '无需信用卡，无需销售来电': 'No card, no sales call',
  '功能': 'Features',
  '飞书、GitHub、Notion、Langfuse': 'Feishu, GitHub, Notion, Langfuse',
  '团队': 'Team',
  '企业': 'Enterprise',
  '定制': 'Custom',
  '联系销售': 'Contact sales',
  /* Trailing spaces are deliberate: the Chinese fragments butt straight up
     against the links, English needs the gap. The walker keeps a value's own
     whitespace, so the space has to live in the translation. */
  '还有疑问？看看': 'Still have questions? Read the ',
  '常见问题': 'FAQ',
  '，或者': ', or ',
  '联系销售团队': 'talk to sales',
  '。': '.',

  /* ---------- faq ---------- */
  '还有什么想问的？': 'Anything else?',
  '关于 Ola 的身份、权限边界和接入方式，这里有你最关心的答案。':
    'Who Ola is, what it can and cannot touch, and how to get it running.',
  'Ola 到底是什么？': 'What exactly is Ola?',
  'Ola 是你团队的一个新成员。他有自己的飞书账号，管理员给他配群聊、配权限、配文档访问，就像新同事入职第一天一样。他不挂在任何人名下，也不需要你先登录、先授权才能用。':
    'Ola is a new member of your team. It has its own Feishu account, and an admin sets up its channels, permissions and document access the way they would for anyone starting on day one. It is not attached to any individual, and nobody has to log in or authorize anything for it to work.',
  'Ola 和个人 AI 助手有什么区别？': 'How is Ola different from a personal AI assistant?',
  '一个简单的类比——单机游戏和多人游戏。个人助手是单机模式，寄生在你的账号里，借你的身份和权限，只替你一个人做事，你换工具它就没了。Ola 是多人模式，是团队里一位独立的队友，有自己的账号、权限和身份。':
    'Think single-player versus multiplayer. A personal assistant is single-player: it lives inside your account, borrows your identity and your permissions, works for you alone, and disappears when you switch tools. Ola is multiplayer — an independent teammate with its own account, its own permissions and its own identity.',
  'Ola 在哪些地方可以用？': 'Where can I use Ola?',
  '飞书、Lark 和 WhatsApp。国内团队用飞书，香港及海外团队用 Lark，两条路径的能力完全一致。WhatsApp 配对一次之后，私聊、群聊、发语音、传录音都可以，和飞书里是同一个 Ola——权限、记忆、任务全部打通。':
    'Feishu, Lark and WhatsApp. Mainland teams use Feishu; Hong Kong and international teams use Lark, with identical capabilities either way. Pair WhatsApp once and you get DMs, groups, voice notes and audio uploads — the same Ola as in Feishu, sharing one set of permissions, memory and tasks.',
  'Ola 能连接哪些工具？': 'What does Ola connect to?',
  '飞书、GitHub、Notion、Langfuse。在飞书里他能处理文档、任务、日历、消息、多维表格和知识库；在 GitHub 里能做代码库问答、代码统计、PR 管理和提 Issue；Notion 侧是文档同步和自动化流程；Langfuse 侧是质量评分、深度分析和实时监控。':
    'Feishu, GitHub, Notion and Langfuse. In Feishu it handles docs, tasks, calendar, messages, Base and Wiki. In GitHub it answers questions about the codebase, reports on activity, manages PRs and files issues. Notion covers doc sync and automation; Langfuse covers quality scoring, deep analysis and live monitoring.',
  '接入要多久？': 'How long does setup take?',
  '大约五分钟，四步：连接飞书或 Lark、批准权限、同步通讯录、关联你的身份。飞书是一键开启，Lark 需要手动粘贴 App ID 和 App Secret。Ola 是企业自建应用，授权提交后需要发布并经企业管理员审批。':
    'About five minutes, in four steps: connect Feishu or Lark, approve permissions, sync the directory, claim your identity. Feishu switches on in one click; Lark needs an App ID and App Secret pasted in. Ola installs as a custom enterprise app, so once submitted it has to be published and approved by an admin.',
  '接入时最容易卡在哪一步？': 'Where do teams get stuck?',
  '应用发布时的「可用范围」没选「所有成员」。选成部分成员的话，大部分员工在群里 @ 不到 Ola，通讯录也同步不出成员——看起来像是连上了，但功能对多数人不可用。在飞书开发者后台的应用发布页确认这一项即可。':
    'Leaving availability set to anything other than all members when publishing the app. Restrict it and most people cannot tag Ola in a channel and the directory sync returns almost nobody — it looks connected but works for hardly anyone. Check that field on the release page in the Feishu developer console.',
  'Ola 会不会未经允许就动我的数据？': 'Will Ola touch my data without asking?',
  '不会。他对每个操作先按风险等级判定：读资料、查信息这类低风险操作直接执行，不打扰你；删除、覆盖、移动、批量修改、对外发布这类不可逆或影响面大的操作，会先弹一张确认卡把动作列清楚，你确认后才动手。一条指令里的多项确认会合并成一张卡，不会反复打断你。':
    'No. Every action is graded by risk first. Low-risk work — reading, looking things up — runs without bothering you. Anything irreversible or wide-reaching, such as deleting, overwriting, moving, bulk-editing or publishing externally, stops and shows you a card listing exactly what it will do. Several confirmations in one instruction are merged into a single card rather than a stream of interruptions.',
  '权限是怎么划分的？': 'How do permissions work?',
  '四种角色：访客、成员、管理员、所有者。数据权限按操作域拆开——查看、跨人检索、编辑、删除分别授权，范围从「仅自己相关」到「全部」。删除等高风险操作需要第二人审批，发起人不能批准自己的删除请求。所有权限由管理员在控制台调整，改动即时生效、无需重新登录，每次变更都留审计记录。':
    'Four roles: viewer, member, admin, owner. Data permissions split by operation — read, cross-person search, edit and delete are granted separately, with scopes running from own-records-only to everything. High-risk actions such as deletion require a second person; whoever requested it cannot approve their own. Admins adjust all of this from the console, changes take effect immediately without re-login, and every change is written to an audit log.',
  '为什么 Ola 看不到我自己的日历、任务和文件？':
    'Why can’t Ola see my calendar, tasks and files?',
  '因为他是你的同事，不是你账号的插件。他只有自己账号的权限，看不到你个人手动创建的数据——就像同事不知道你桌上的便签一样。要让他看到，把 Ola 所在的群加入知识库权限范围，或者把文档分享给他。最省事的办法是直接让他帮你创建。':
    'Because it is a colleague, not a plugin inside your account. It has only its own account’s permissions, so anything you created by hand is invisible to it — the same way a colleague cannot read the sticky notes on your desk. To share, add Ola’s channel to the wiki’s permissions or share the document with it directly. The easiest route is to have it create the thing for you in the first place.',
  '为什么不用一问一答地等他？': 'Why don’t I have to wait for a reply before sending more?',
  '因为 Ola 有消息队列，不像传统 bot 那样阻塞等待。你可以连着发好几条，零散的信息他会自己拼成完整的任务理解，多条任务按你交代的顺序逐个处理，不会乱序也不会漏。发完就可以走开，处理完他主动把结果推给你。':
    'Ola queues messages instead of blocking on each one the way a traditional bot does. Send several in a row and it assembles the fragments into a single understanding of the task, then works through multiple tasks in the order you gave them — nothing reordered, nothing dropped. Send and walk away; it pushes the results back when they’re ready.',
  '很重的活可以让他后台跑吗？': 'Can it run heavy work in the background?',
  '可以，直接跟他说「后台建立任务」。一小时的录音要转录、一大批数据要整理，这些不是几秒能完成的，Ola 会挂到后台自己跑，不占用对话。干完主动回来推结果给你。也可以设定时任务，比如每天早上推 AI 新闻早报、每周五把本周 PR 汇总成周报发到群里。':
    'Yes — just tell it to create a background task. An hour of audio to transcribe, a pile of data to sort through: none of that finishes in seconds, so Ola runs it in the background without tying up the conversation and comes back with the result. You can also set recurring jobs, such as an AI news briefing every morning or a Friday summary of the week’s PRs posted to the channel.',
  '私聊内容会被同事看到吗？': 'Can colleagues see my DMs with Ola?',
  '不会，记忆按人隔离。与 Ola 的私聊内容只属于你本人，团队公共内容另算，任何人无法读取你的私人上下文。群里 @ 他，他用团队的上下文回答，信息对群里所有人可见；私聊找他，他只服务你一个人。':
    'No — memory is isolated per person. What you say in a DM belongs to you alone, kept separate from shared team content, and nobody can read your private context. Tag it in a channel and it answers with team context that everyone can see; message it directly and it works for you alone.',
  '发了消息他一直不回怎么办？': 'What if it doesn’t reply?',
  '不用重发。通常是网络波动导致响应中断，或者他在「闷头思考」、回复还没生成出来。直接发一句「进行到哪里了」，Ola 会汇报当前进度并把回复补给你。如果隔几分钟还没动静，再问一次；多次无响应请联系管理员。':
    'Don’t resend. Usually the connection wobbled mid-response, or it is still thinking and the reply hasn’t landed yet. Just ask where it’s got to and Ola will report progress and finish the answer. If it’s still quiet after a few minutes, ask again; if that repeats, contact your admin.',
  '编辑过的消息他为什么读不到？': 'Why can’t it see my edited message?',
  'Ola 目前只响应消息发送时的内容，不支持编辑后重新读取。原因是允许编辑重读会导致消息时序混乱和对话上下文污染。需要改提问的话，重新发一条 @Ola 就行。':
    'Ola reads a message as it was sent and does not re-read edits. Allowing that would scramble message order and pollute the conversation context. To change the question, send a new message and tag it again.',

  /* ---------- footer ---------- */
  '产品': 'Features',
  '定价': 'Pricing',
  '使用场景': 'Use cases',
  '增长': 'Growth',
  '研发': 'Engineering',
  '客服': 'Support',
  '资源': 'Resources',
  '部分应用正在接入中，': 'Some apps are still being connected — ',
  '查看每个工具的状态': 'see the status of each tool',
  '文档': 'Docs',
  '公司': 'Company',
  '帮助与支持': 'Help and support',
  '安全': 'Security',
  '法务': 'Legal',
  /* '更新日志' is already defined by the footer column. */
  'Ola 首页': 'Ola home',

  /* ---------- /about: the team's own voice ---------- */
  '团队规模': 'Team size',
  '待补充': 'To be added',

  /* /login — the workspace-URL step */
  '继续': 'Continue',
  '进入你们团队的工作区': 'Go to your team\u2019s workspace',
  '输入公司的 Ola 网址': 'Enter your company\u2019s Ola URL',
  '公司网址': 'Company URL',
  '不知道网址？': 'Do not know the URL? ',

  /* /contact, the three onward cards — the top bar's own destinations */
  '他能接哪些活，完整的一份清单。': 'Everything he can take on, the whole list.',
  '你在用的工具，他已经连上了哪些。': 'Which of the tools you use he is already connected to.',
  '一个团队一个月要花多少，先算清楚。': 'What a team costs per month, worked out.',

  /* /contact */
  '怎么找我们': 'How to reach us',
  '说说你们团队现在卡在哪，我们一起看看 Ola 能不能接住':
    'Tell us where your team is stuck and we will work out together whether Ola can take it',
  '地址待补充': 'Address to be added',

  /* ---------- /enterprise ---------- */

  '谁能用': 'Who can use it',
  '四种角色': 'Four roles',
  '访客、成员、管理员、所有者': 'Guest, member, admin, owner',
  '随时收回': 'Revocable at any time',
  '查看、跨人检索、编辑、删除分别授权':
    'View, cross-person search, edit and delete are granted separately',
  '发起人不能批准自己的删除请求': 'Nobody approves their own delete request',

  /* ---------- /how ---------- */
  '理解': 'Understand',
  '执行': 'Act',
  '交付': 'Deliver',

  /* ---------- /terms and /privacy ----------
     Product statements translate normally. The 「待法务确认」 lines say the
     same thing in both builds: this clause is not written yet. */

  /* terms */

  /* privacy */
  '不用于模型训练': 'Not used for model training',

  /* /integrations, the "not listed" card */
  '没找到？': 'Not listed?',
  '告诉我们你还想接什么': 'Tell us what else you use',

  /* ---------- pricing, aligned to /pricing's own plan table ---------- */

  '每月 1,000 额度': '1,000 credits per month',
  '每月额度': 'Monthly credits',
  '每月': 'per month',
  '每月起': 'per month, starting at',
  '用真实工作试试 Ola': 'Try Ola on real work',
  '让团队开始把事做完': 'For teams ready to get real work done',
  '为高频运行的团队准备': 'For teams that run on Ola every day',
  '包含': 'Included',
  '完整助手，所有集成': 'The full assistant, every integration',
  '后台任务与定时巡检': 'Background tasks and scheduled runs',
  '团队记忆': 'Team memory',

  '已经准备好让 Ola 天天干活的团队。': 'For a team getting real work done.',
  '每月 10,000 额度': '10,000 credits per month',
  '是 Free 的 10 倍': '10x the Free allowance',
  'Free 全部功能': 'Everything in Free',
  '每月额度是 Free 的 10 倍': '10x the Free monthly allowance',
  '优先支持': 'Priority support',

  '整个团队都靠他推进工作的公司。': 'For teams that run on it.',
  '每月 100,000 额度': '100,000 credits per month',
  '是 Pro 的 10 倍': '10x the Pro allowance',
  'Pro 全部功能': 'Everything in Pro',
  '每月额度是 Pro 的 10 倍': '10x the Pro monthly allowance',

  /* /product, the admin cards. Shorter than the paragraphs they replaced —
     one line each. */

  '你看不到的': 'What you cannot',
  '低风险': 'Low risk',
  '等你点头': 'Waits for your nod',

  /* ---------- /product: the capability catalogue ---------- */
  /* The fifteen capability names themselves (追进度, 提缺陷, 看早报 …) are the
     home demo's chip labels and already have entries above. */

  '逐字转写之后通读全文，不是抓摘要':
    'Transcribes it, then reads the whole thing rather than skimming for a summary',
  '翻遍这周的群，把说完就忘的承诺挑出来':
    'Reads the week\u2019s chats and pulls out the promises everyone forgot',

  '几个人各说半个 bug，他合成一份完整的 Issue':
    'Several people describe half a bug each; he assembles one complete issue',

  '各个工具的夜间变动汇总成一条': 'Overnight changes across every tool, in one note',
  '做完的、还开着的、明天到期的，分三栏':
    'Done, still open, and due tomorrow — in three columns',

  '记得当初为什么那么定': 'Remembers why it was decided that way',
  '人走了，记性留下': 'People leave, the memory stays',
  '群里的活全群可见': 'Work in a group is visible to the group',
  '谁都能接着往下问，不用你转发一遍': 'Anyone can pick it up from there — no forwarding',
  '私聊只属于你': 'A DM is yours alone',

  /* ---------- /product ---------- */
  '把工作交给 AI 同事': 'Give the work to an AI teammate',
  'Ola 能接住的工作': 'Work Ola can take on',
  '看清事情进展': 'See what is moving',
  '不必先整理信息，直接问结果': 'Ask for the answer without first sorting the information',
  '分清已经完成、仍在推进和等你决定的事项':
    'Separates what is done, in motion, and waiting for your decision',
  '找回几个月前的讨论、依据与当时的取舍':
    'Finds the discussion, reasoning, and trade-offs from months ago',
  '转写并理解完整内容，提取结论与待办':
    'Transcribes and understands the full recording, then pulls out decisions and to-dos',
  '持续跟进，只在需要你拍板时提醒':
    'Keeps following along and only alerts you when a decision is yours to make',
  '从本周对话中找回没有落地的承诺':
    'Finds the commitments from this week’s conversations that have not yet happened',

  '把下一步落到位': 'Make the next step happen',
  '不只给建议，也会把动作做下去': 'More than advice — it carries the action through',
  '把零散反馈整理成一份清楚、可执行的 Issue':
    'Turns scattered feedback into a clear, actionable issue',
  '把长消息拆成任务，补上负责人和优先级':
    'Turns a long message into tasks, with owners and priorities filled in',
  '先给目录和方向，确认后再完成初稿':
    'Starts with the outline and direction, then writes the draft after approval',
  '按确认的来源持续搜索，新线索自动入表':
    'Searches the sources you approve and sends new leads straight into the sheet',
  '按你的语气起草，并说明关键取舍':
    'Drafts in your voice and explains the key choices',

  '主动推进工作': 'Keep work moving',
  '按时开始，长任务自己跑完': 'Starts on schedule and runs long tasks to completion',
  '把各工具的夜间变化汇成一条早报':
    'Turns overnight changes across your tools into one morning briefing',
  '把已完成、进行中和明日到期的事项分开列清':
    'Lists what is done, in progress, and due tomorrow separately',
  '会前自动整理上次结论与未完成事项':
    'Prepares the last decisions and unfinished work before the meeting',
  '长任务不占对话，完成后主动回来通知':
    'Runs long work outside the chat and comes back when it is finished',
  '设定一次，日报、周报按时送达':
    'Set it once, and daily and weekly updates arrive on time',

  '记住团队上下文': 'Remember the team context',
  '不必反复说明，交接也不断档': 'No need to repeat yourself, even when work changes hands',
  '上个月拍板的理由，今天仍能随时找回':
    'The reasoning behind last month’s decision is still there when you need it',
  '人员交接不必把上下文重新讲一遍':
    'A handover does not mean explaining the context from scratch',
  '任何人都能接着推进，不必重复转发':
    'Anyone can carry it forward without another round of forwarding',
  '私聊内容不会回到群里': 'Private-chat content never goes back into the group',
  '把规范沉淀下来，每个人的 Ola 都能复用':
    'Capture the standard once, and everyone’s Ola can reuse it',

  '管理权始终在你手里': 'You keep control',
  '配置一次，团队成员只要 @ Ola 就能开始':
    'Set it up once, then anyone on the team can get started by @-mentioning Ola',
  '连接后，Ola 就会用这些工具': 'Once connected, Ola knows how to use these tools',
  '按人分配权限': 'Set access by person',
  '谁能使用哪些集成，由管理员统一决定':
    'Admins decide who can use which integrations',
  '随时收回访问权限': 'Revoke access at any time',
  '在设置里收紧或断开，修改立即生效，无需重新登录':
    'Tighten or disconnect access in settings; changes take effect immediately',
  '关键删除需二次批准': 'Critical deletions need a second approval',
  '发起人不能批准自己的删除，每次变更都留下审计记录':
    'Requesters cannot approve their own deletions, and every change is recorded',
  '来自客户的反馈': 'What customers tell us',
  '以前跨系统的工作总要靠人协调，团队花在交接上的时间常常比做事还多。现在一句话就能推进工作，大家终于能把精力放回客户和业务增长。':
    'Work across systems once needed someone to coordinate it, and teams often spent more time on handoffs than the work itself. Now one sentence moves work forward, so people can focus on customers and growth again.',
  '它不会绕开我们已有的权限和审批流程。员工看不到的内容，Ola 也看不到；需要确认的动作，会在执行前停下来。':
    'It does not bypass the permissions and approvals we already have. What an employee cannot see, Ola cannot see; any action that needs confirmation stops before it runs.',

  '行政负责人': 'Head of Operations',

  /* ---------- /product, the permissions section ---------- */

  /* ---------- headings ----------
     Modelled on claude.com's own CJK build. Three rules, applied everywhere:
       1. a page heading names the page — 料金プラン, 最適な思考 — and only the
          home page sells; 5-14 characters, one line, never hand-broken
       2. no heading ends in 。 — claude.com carries none, and Ola was mixing
          the two within a single page
       3. the subhead beside it stays under 30 characters and drops the 。 too */
  '免费开始，准备好了再付费': 'Start free, pay when you are ready',

  '装上就能用，两分钟上线': 'Installed and running in two minutes',
  '始终由你掌控': 'You stay in control',
  '不只是连上工具，他真的会用': 'Not just connected to your tools — he uses them',
  '价格常见问题': 'Pricing FAQs',
  'Free、Pro 和 Max 有什么区别？': 'What’s the difference between Free, Pro, and Max?',
  '三档都包含完整助手、全部集成、后台任务与团队记忆。区别主要在每月积分与支持：Free 每月 1,000 积分；Pro 每月 10,000 积分并提供优先支持；Max 每月 100,000 积分起，适合高频使用的团队。':
    'All three plans include the full assistant, every integration, background tasks, and team memory. They differ mainly in monthly credits and support: Free includes 1,000 credits, Pro includes 10,000 credits with priority support, and Max starts at 100,000 credits for teams that use Ola heavily.',
  '积分如何消耗？': 'How are credits used?',
  '积分用于计量 Ola 完成任务时的服务用量。任务涉及的推理、工具调用和执行规模不同，消耗的积分也会不同。':
    'Credits measure the service used while Ola completes work. Usage varies with the reasoning, tool calls, and execution involved in each task.',
  '可以随时升级或降级方案吗？': 'Can I change plans at any time?',
  '可以。升级后即可获得更高的月度额度；降级会在当前计费周期结束后生效，期间不会中断使用。':
    'Yes. An upgrade gives you a higher monthly allowance right away; a downgrade takes effect at the end of the current billing period, without interrupting your use in the meantime.',
  '未使用的积分会结转到下个月吗？': 'Do unused credits roll over to the next month?',
  '不会。每月积分会在新的计费周期开始时刷新，未使用的部分不会结转。':
    'No. Monthly credits refresh at the start of each new billing period, and unused credits do not carry over.',

  /* ---------- the four interior page heroes ---------- */

  /* ---------- /contact ---------- */
  /* '联系我们' and '飞书' already have entries above. */

  '微信': 'WeChat',
  '邮件': 'Email',

  '想先随便问问的话，微信最省事。': 'Easiest if you just want to ask something first.',
  '在微信上联系我们': 'Reach us on WeChat',

  '要走采购或安全评估流程的话，邮件最合适。':
    'Best if you have a procurement or security review to run.',
  '用邮件联系我们': 'Reach us by email',

  '也可以先自己看看': 'Or have a look around first',

  /* ---------- 404 ---------- */
  '这个页面不在了': 'This page is gone',
  '链接可能过期了，或者地址打错了。下面几个地方大概是你要找的。':
    'The link may have expired, or the address is off by a character. One of these is probably what you were after.',
  '回首页': 'Back to home',
  '看功能': 'See what it does',
}
