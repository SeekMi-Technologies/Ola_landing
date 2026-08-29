import type { ReactNode } from 'react'

/**
 * The brand marks used in the footer's social row and on /contact.
 *
 * All eight are single-colour silhouettes carried in `currentColor`, so the
 * caller decides size and ink. They live here rather than beside either
 * caller because both need the same paths and a second copy would drift.
 */
export type BrandId =
  | 'x'
  | 'whatsapp'
  | 'linkedin'
  | 'youtube'
  | 'discord'
  | 'feishu'
  | 'email'
  | 'wechat'

/* Brand names, deliberately untranslated: they read the same in both builds. */
export const BRAND_LABEL: Record<BrandId, string> = {
  x: 'X',
  whatsapp: 'WhatsApp',
  linkedin: 'LinkedIn',
  youtube: 'YouTube',
  discord: 'Discord',
  feishu: 'Feishu',
  email: 'Email',
  wechat: 'WeChat',
}

export const BRAND_MARKS: Record<BrandId, ReactNode> = {
  x: (
    <path d="M18.9 1.9h3.3l-7.2 8.3 8.5 11.3h-6.7l-5.2-6.8-6 6.8H1.3l7.7-8.9L.9 1.9h6.8l4.7 6.2zm-1.2 17.6h1.8L7.7 3.7H5.8z" />
  ),
  whatsapp: (
    <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.23-.64.08-.3-.15-1.26-.46-2.4-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.25-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.87 1.22 3.07c.15.2 2.1 3.2 5.08 4.49.7.3 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42-.08-.12-.28-.2-.57-.35m-5.42 7.4a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26A9.89 9.89 0 0 1 12.05 2c2.64 0 5.12 1.03 6.99 2.9a9.83 9.83 0 0 1 2.89 6.99 9.9 9.9 0 0 1-9.88 9.89m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.69 1.44c6.55 0 11.89-5.33 11.89-11.89a11.82 11.82 0 0 0-3.48-8.41Z" />
  ),
  linkedin: (
    <path d="M6.94 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0ZM7 8.48H3V21h4V8.48Zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68Z" />
  ),
  youtube: (
    <path d="M23.5 6.19a3.02 3.02 0 0 0-2.12-2.14C19.5 3.54 12 3.54 12 3.54s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.19C0 8.07 0 12 0 12s0 3.93.5 5.81a3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14c.5-1.88.5-5.81.5-5.81s0-3.93-.5-5.81ZM9.55 15.57V8.43L15.82 12l-6.27 3.57Z" />
  ),
  discord: (
    <path d="M20.32 4.37a19.79 19.79 0 0 0-4.89-1.52.07.07 0 0 0-.7.04c-.22.37-.45.86-.61 1.25a18.27 18.27 0 0 0-5.49 0c-.16-.4-.4-.88-.62-1.25a.08.08 0 0 0-.08-.04 19.74 19.74 0 0 0-4.88 1.52.07.07 0 0 0-.4.03C.53 9.05-.32 13.58.1 18.06a.08.08 0 0 0 .3.05 19.9 19.9 0 0 0 5.99 3.03.08.08 0 0 0 .09-.03c.46-.63.87-1.3 1.22-1.99a.08.08 0 0 0-.04-.1 13.1 13.1 0 0 1-1.87-.9.08.08 0 0 1 0-.12l.37-.3a.07.07 0 0 1 .08 0 14.2 14.2 0 0 0 12.06 0 .07.07 0 0 1 .08.01l.37.3a.08.08 0 0 1 0 .12c-.6.35-1.22.65-1.88.9a.08.08 0 0 0-.4.1c.36.7.77 1.36 1.23 2a.08.08 0 0 0 .8.02 19.84 19.84 0 0 0 6-3.03.08.08 0 0 0 .04-.05c.5-5.18-.84-9.68-3.55-13.66a.06.06 0 0 0-.03-.03ZM8.02 15.33c-1.18 0-2.16-1.08-2.16-2.42s.96-2.42 2.16-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.34-.96 2.42-2.16 2.42Zm7.97 0c-1.18 0-2.15-1.08-2.15-2.42s.95-2.42 2.15-2.42c1.21 0 2.18 1.1 2.16 2.42 0 1.34-.95 2.42-2.16 2.42Z" />
  ),
  /* Feishu / Lark. The one mark in this set whose identity is the colour
     separation, not the outline: three swooshes (#00d6b9 / #3470ff /
     #123c99) that flatten into an unreadable blob as a single silhouette.
     So it keeps the three shapes and carries them in currentColor at three
     opacities — the same "one hue, three tiers" the illustrations in
     Pillars and HowItWorks use. Traced off public/logos/lark.webp: each
     colour region isolated as its largest connected component,
     boundary-traced, then Douglas-Peucker simplified to ~1.6px. */
  feishu: (
    <>
      <path d="M3.95 0.0L14.5 0.0L14.87 0.14L15.35 0.66L15.73 1.27L16.77 3.38L17.48 5.34L17.96 7.27L16.55 8.02L15.32 9.05L12.45 12.56L10.77 9.19L9.13 6.52L7.68 4.5L6.45 3.0L3.91 0.42L3.84 0.14Z" fillOpacity="0.45" />
      <path d="M0.11 7.12L0.26 7.12L1.9 9.19L3.28 10.69L6.19 13.31L9.24 15.42L11.22 16.5L12.89 17.25L15.39 18.05L16.21 18.09L17.33 17.91L18.34 17.48L19.08 16.97L19.79 16.27L20.57 15.19L19.27 17.53L17.63 19.64L16.58 20.67L15.43 21.61L13.38 22.83L11.18 23.62L9.06 23.95L6.78 23.86L5.22 23.53L4.25 23.2L2.8 22.55L0.97 21.38L0.34 20.81L0.04 20.11L0.0 7.27Z" fillOpacity="0.72" />
      <path d="M20.01 6.84L20.83 6.84L22.02 7.03L23.22 7.45L23.96 7.88L23.25 8.86L22.66 9.98L20.57 15.09L19.79 16.22L19.08 16.92L18.34 17.44L17.33 17.86L16.21 18.05L15.39 18.0L14.12 17.67L12.34 16.97L9.35 15.42L10.29 14.77L11.63 13.55L15.06 9.38L16.1 8.39L17.07 7.73L18.07 7.27L19.01 6.98Z" />
    </>
  ),
  /* No brand here, so an envelope drawn to match the others' weight: body
     and flap as two filled paths rather than a knocked-out crease, which
     turns to mush at 14px. */
  email: (
    <>
      <path d="M22.2 4.6H1.8L12 11.2 22.2 4.6Z" />
      <path d="M1.5 6.5 12 13.3l10.5-6.8V17a2.2 2.2 0 0 1-2.2 2.2H3.7A2.2 2.2 0 0 1 1.5 17V6.5Z" />
    </>
  ),
  wechat: (
    <>
      <path d="M9.1 3C5.2 3 2 5.65 2 8.9c0 1.87 1.06 3.54 2.72 4.62L4 16l2.63-1.35c.78.2 1.6.31 2.47.31l.4-.01a5.1 5.1 0 0 1-.2-1.4c0-3.03 2.94-5.48 6.56-5.48l.55.02C15.87 5.03 12.82 3 9.1 3Z" />
      <path d="M22 13.55c0-2.55-2.55-4.62-5.7-4.62s-5.7 2.07-5.7 4.62c0 2.56 2.55 4.63 5.7 4.63.66 0 1.3-.1 1.9-.27L20.6 19l-.55-1.9c1.2-.85 1.95-2.09 1.95-3.55Z" />
    </>
  ),
}
