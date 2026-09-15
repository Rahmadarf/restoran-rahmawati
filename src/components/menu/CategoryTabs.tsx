import { CATEGORIES } from '../../data/categories'
import type { CategoryFilter } from '../../types/menu'

type CategoryTabsProps = {
  category: CategoryFilter
  onSelect: (category: CategoryFilter) => void
}

export function CategoryTabs({ category, onSelect }: CategoryTabsProps) {
  return (
    <div className="category-sticky">
      <nav
        className="wrap category-tabs"
        aria-label="Kategori menu"
        data-component="CategoryTabs"
      >
        {CATEGORIES.map((item) => (
          <button
            key={item.value}
            type="button"
            aria-pressed={item.value === category}
            data-category-filter={item.value}
            onClick={() => onSelect(item.value)}
          >
            {item.label}
          </button>
        ))}
      </nav>
    </div>
  )
}
