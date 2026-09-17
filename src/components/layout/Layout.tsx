import { useEffect, type ReactNode } from 'react'

import { MobileNavigation } from './MobileNavigation'
import { SiteFooter } from './SiteFooter'
import { SiteHeader } from './SiteHeader'
import { WhatsAppButton } from './WhatsAppButton'
import type { PageId } from '../../types/page'

type LayoutProps = {
  page: PageId
  title: string
  children: ReactNode
}

export function Layout({ page, title, children }: LayoutProps) {
  useEffect(() => {
    document.body.dataset.page = page
    document.title = title
  }, [page, title])

  return (
    <>
      <a className="skip" href="#main">
        Lewati ke konten utama
      </a>
      <SiteHeader page={page} />
      {children}
      <SiteFooter variant={page === 'menu' ? 'menu' : 'home'} />
      <WhatsAppButton />
      <MobileNavigation page={page} />
    </>
  )
}
