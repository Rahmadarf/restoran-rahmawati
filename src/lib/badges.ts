import type { MenuItem } from '../types/menu'

/** Label badge pada kartu; favorit memakai penanda ✦. */
export const badgeLabel = (item: MenuItem) =>
  item.badge === 'Favorit' ? '✦ Favorit' : item.badge

/** Badge aksen dipakai untuk favorit dan penanda pedas. */
export const badgeIsAccent = (item: MenuItem) =>
  item.badge === 'Favorit' || item.badge === 'Pedas'
