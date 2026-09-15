import { Link } from 'react-router-dom'

import { FEATURED_IDS, productById } from '../../data/menu'
import { useMenuHref } from '../../hooks/useMenuHref'
import { MenuCard } from '../menu/MenuCard'
import { ArrowUpRightIcon } from '../ui/Icons'

export function FeaturedMenuSection() {
  const menuHref = useMenuHref()

  return (
    <section className="section wrap" id="terlaris">
      <div className="section-head">
        <div>
          <span className="eyebrow">Yang selalu jadi rebutan</span>
          <h2>
            Jagoan di
            <br />
            setiap meja.
          </h2>
        </div>
        <Link className="text-link" to={menuHref()}>
          Lihat Semua Menu <ArrowUpRightIcon />
        </Link>
      </div>
      <div className="product-grid">
        {FEATURED_IDS.map((id) => {
          const item = productById(id)
          if (!item) return null
          return (
            <MenuCard
              key={id}
              item={item}
              variant="home"
              orderHref={menuHref({ category: 'Favorit' })}
            />
          )
        })}
      </div>
    </section>
  )
}
