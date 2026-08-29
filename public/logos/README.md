Drop the official SVGs here, then set `logo` on the matching entry in
src/components/Integrations.tsx:

  feishu.svg    → 飞书 / Lark   https://open.feishu.cn  (品牌资源)
  github.svg    → GitHub        https://github.com/logos
  notion.svg    → Notion        https://notion.so/brand
  langfuse.svg  → Langfuse      https://langfuse.com  (repo /assets)
  whatsapp.svg  → WhatsApp      https://whatsappbrand.com

e.g.  { name: 'GitHub', tint: '#181717', logo: '/logos/github.svg', caps: … }

Until a file is set the card falls back to a brand-coloured initial. These
are other companies' marks — take them from the official brand pages above
rather than redrawing them.

## 命名约定

上游 (homarr-labs/dashboard-icons) 的 `-light` 后缀指「浅色的图标」，
供深色背景使用——和「浅色模式」的直觉相反。为免每次都要重新确认，
本目录按**用途**命名：

| 本目录 | 上游文件 | 内容 | 用在 |
|---|---|---|---|
| `x.webp` | `x.webp` | 深色图形 | 浅色背景（默认） |
| `x-dark.webp` | `x-light.webp` | 浅色图形 | 深色背景 |

## 单文件 vs 双文件

只有**单色**标记需要两份(黑白各一)。**彩色**标记在深浅底上都成立，
上游通常也不提供 `-light` 变体（请求会 404），一份即可。

| | 文件数 | 例 |
|---|---|---|
| 单色 | 2 | Notion（黑框 / 白框） |
| 彩色 | 1 | Lark（青蓝红三色鸟） |

## 两个上游的命名恰好相反

| 来源 | 写法 | `light` 指 |
|---|---|---|
| homarr-labs/dashboard-icons | `x-light.webp` 后缀 | **图形是浅色的** → 放深色底 |
| @lobehub/icons-static-webp | `light/x.webp` 目录 | **浅色主题用** → 图形是深色的 |

更麻烦的是 homarr **同一个仓库里两种后缀混用**：Notion / GitHub 用
`-light`（浅色图形），Linear 用 `-dark`（同样是浅色图形，但反着叫）。

所以链接一律按**内容**验证再入库，不看文件名 —— 采样非透明像素的
平均亮度，接近 0 的放浅底，接近 255 的放深底。
`-color` 系列的 light/dark 两份往往是同一个文件（Langfuse 实测 md5 相同）。
