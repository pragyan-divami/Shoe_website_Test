import { useEffect, useState } from 'react'

const formatCurrency = (value) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value)

function GeneratedProductVisual({ product }) {
  const { generatedVisual } = product

  return (
    <div
      className={`plp-generated-visual plp-generated-visual--${generatedVisual.shape ?? 'blade'}`}
      style={{
        '--plp-gen-base': generatedVisual.palette[0],
        '--plp-gen-accent': generatedVisual.palette[1],
        '--plp-gen-highlight': generatedVisual.palette[2],
        '--plp-gen-glow': generatedVisual.glow,
      }}
    >
      <div className="plp-generated-orb" />
      <div className="plp-generated-shoe">
        <span className="plp-generated-sole" />
        <span className="plp-generated-upper" />
        <span className="plp-generated-cut" />
      </div>
      <div className="plp-generated-grid" />
    </div>
  )
}

function ProductCard({ product, homeHref }) {
  const discountPercentage =
    product.salePrice && product.price > product.salePrice
      ? Math.round(((product.price - product.salePrice) / product.price) * 100)
      : null

  return (
    <a className="plp-card" href={homeHref}>
      <div className="plp-card-media">
        {product.label ? (
          <span className={`plp-card-badge plp-card-badge--${product.badgeTone ?? 'brand'}`}>
            {product.label}
          </span>
        ) : null}
        {product.generatedVisual ? (
          <GeneratedProductVisual product={product} />
        ) : (
          <img src={product.image} alt={product.name} />
        )}
      </div>
      <div className="plp-card-body">
        <h3>{product.name}</h3>
        <p className="plp-card-subtitle">{product.subtitle}</p>
        <p className="plp-card-meta">{product.colorCount} Colours</p>
        <div className="plp-card-pricing">
          <strong>{formatCurrency(product.salePrice ?? product.price)}</strong>
          {product.salePrice ? <span>{formatCurrency(product.price)}</span> : null}
          {discountPercentage ? <em>{discountPercentage}% off</em> : null}
        </div>
      </div>
    </a>
  )
}

function CheckboxOption({ checked, count, label, onToggle }) {
  return (
    <label className="plp-checkbox-option">
      <input checked={checked} onChange={onToggle} type="checkbox" />
      <span>{label}</span>
      <small>{count}</small>
    </label>
  )
}

function FilterSection({
  counts,
  expanded,
  group,
  onApplyPrice,
  onPriceInputChange,
  onToggleExpand,
  onToggleOption,
  priceInputs,
  selectedFilters,
}) {
  const selectedValues = selectedFilters[group.id] ?? []

  return (
    <section className="plp-filter-section">
      <button
        aria-expanded={expanded}
        className="plp-filter-heading"
        onClick={() => onToggleExpand(group.id)}
        type="button"
      >
        <span>{group.label}</span>
        <span>{expanded ? '−' : '+'}</span>
      </button>

      {expanded ? (
        <div className="plp-filter-body">
          {group.type === 'chip-grid' ? (
            <div className="plp-size-grid">
              {group.options.map((option) => (
                <button
                  key={option}
                  className={selectedValues.includes(option) ? 'plp-size-chip is-selected' : 'plp-size-chip'}
                  onClick={() => onToggleOption(group.id, option)}
                  type="button"
                >
                  {option}
                </button>
              ))}
            </div>
          ) : null}

          {group.type === 'range' ? (
            <div className="plp-price-range">
              <div className="plp-price-inputs">
                <label>
                  <span>Min</span>
                  <input
                    inputMode="numeric"
                    onChange={(event) => onPriceInputChange('min', event.target.value)}
                    placeholder={String(group.min)}
                    value={priceInputs.min}
                  />
                </label>
                <label>
                  <span>Max</span>
                  <input
                    inputMode="numeric"
                    onChange={(event) => onPriceInputChange('max', event.target.value)}
                    placeholder={String(group.max)}
                    value={priceInputs.max}
                  />
                </label>
              </div>
              <button className="plp-apply-button" onClick={onApplyPrice} type="button">
                Apply
              </button>
            </div>
          ) : null}

          {group.type === 'checkbox' ? (
            <div className="plp-checkbox-list">
              {group.options.map((option) => (
                <CheckboxOption
                  key={option}
                  checked={selectedValues.includes(option)}
                  count={counts[group.id]?.[option] ?? 0}
                  label={option}
                  onToggle={() => onToggleOption(group.id, option)}
                />
              ))}
            </div>
          ) : null}

          {group.type === 'swatch' ? (
            <div className="plp-swatch-list">
              {group.options.map((option) => (
                <button
                  key={option.value}
                  className={
                    selectedValues.includes(option.value) ? 'plp-swatch-option is-selected' : 'plp-swatch-option'
                  }
                  onClick={() => onToggleOption(group.id, option.value)}
                  type="button"
                >
                  <span style={{ backgroundColor: option.swatch }} />
                  <strong>{option.label}</strong>
                  <small>{counts[group.id]?.[option.value] ?? 0}</small>
                </button>
              ))}
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  )
}

function FilterRail(props) {
  const {
    counts,
    expandedGroups,
    filters,
    hasActiveFilters,
    onApplyPrice,
    onPriceInputChange,
    onResetFilters,
    onToggleExpand,
    onToggleOption,
    priceInputs,
    selectedFilters,
  } = props

  return (
    <aside className="plp-filter-rail">
      <div className="plp-filter-rail-header">
        <div>
          <p className="section-kicker">Refine</p>
          <h2>Filters</h2>
        </div>
        <button className="plp-link-button" onClick={onResetFilters} type="button">
          {hasActiveFilters ? 'Clear all' : 'Reset'}
        </button>
      </div>

      {filters.map((group) => (
        <FilterSection
          counts={counts}
          expanded={expandedGroups[group.id]}
          group={group}
          key={group.id}
          onApplyPrice={onApplyPrice}
          onPriceInputChange={onPriceInputChange}
          onToggleExpand={onToggleExpand}
          onToggleOption={onToggleOption}
          priceInputs={priceInputs}
          selectedFilters={selectedFilters}
        />
      ))}
    </aside>
  )
}

export function ProductListingPage({ pageData }) {
  const homeHref = import.meta.env.BASE_URL
  const [filtersVisible, setFiltersVisible] = useState(true)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)
  const [selectedSort, setSelectedSort] = useState(pageData.sortOptions[0])
  const [selectedQuickCategory, setSelectedQuickCategory] = useState(pageData.page.quickCategories[0])
  const [selectedFilters, setSelectedFilters] = useState({})
  const [priceInputs, setPriceInputs] = useState({ min: '', max: '' })
  const [priceRange, setPriceRange] = useState({ min: null, max: null })
  const [expandedGroups, setExpandedGroups] = useState(() =>
    Object.fromEntries(pageData.filters.map((group, index) => [group.id, index < 6])),
  )

  useEffect(() => {
    const closeDrawer = () => setMobileFiltersOpen(false)

    window.addEventListener('resize', closeDrawer)

    return () => {
      window.removeEventListener('resize', closeDrawer)
    }
  }, [])

  const toggleOption = (groupId, option) => {
    setSelectedFilters((current) => {
      const currentValues = current[groupId] ?? []
      const nextValues = currentValues.includes(option)
        ? currentValues.filter((value) => value !== option)
        : [...currentValues, option]

      if (nextValues.length === 0) {
        const { [groupId]: _removed, ...rest } = current
        return rest
      }

      return {
        ...current,
        [groupId]: nextValues,
      }
    })
  }

  const filteredProducts = pageData.products.filter((product) => {
    if (selectedQuickCategory !== 'All' && product.quickCategory !== selectedQuickCategory) {
      return false
    }

    if (priceRange.min !== null && product.price < priceRange.min) {
      return false
    }

    if (priceRange.max !== null && product.price > priceRange.max) {
      return false
    }

    return Object.entries(selectedFilters).every(([groupId, values]) => {
      const productValues = product.facets[groupId] ?? []

      return values.some((value) => productValues.includes(value))
    })
  })

  const sortedProducts = [...filteredProducts].sort((left, right) => {
    if (selectedSort === 'Price: Low to High') {
      return (left.salePrice ?? left.price) - (right.salePrice ?? right.price)
    }

    if (selectedSort === 'Price: High to Low') {
      return (right.salePrice ?? right.price) - (left.salePrice ?? left.price)
    }

    if (selectedSort === 'Newest') {
      return left.createdRank - right.createdRank
    }

    if (selectedSort === 'Bestselling') {
      return right.popularity - left.popularity
    }

    return right.popularity - left.popularity
  })

  const counts = pageData.filters.reduce((result, group) => {
    if (group.type === 'range') {
      return result
    }

    const groupCounts = {}

    const options = group.type === 'swatch' ? group.options.map((option) => option.value) : group.options

    options.forEach((option) => {
      groupCounts[option] = pageData.products.filter((product) => {
        if (selectedQuickCategory !== 'All' && product.quickCategory !== selectedQuickCategory) {
          return false
        }

        return (product.facets[group.id] ?? []).includes(option)
      }).length
    })

    return {
      ...result,
      [group.id]: groupCounts,
    }
  }, {})

  const activeFilterChips = Object.entries(selectedFilters).flatMap(([groupId, values]) =>
    values.map((value) => ({ groupId, value })),
  )

  const hasActiveFilters =
    activeFilterChips.length > 0 ||
    selectedQuickCategory !== 'All' ||
    priceRange.min !== null ||
    priceRange.max !== null

  const clearFilters = () => {
    setSelectedFilters({})
    setSelectedQuickCategory('All')
    setPriceInputs({ min: '', max: '' })
    setPriceRange({ min: null, max: null })
  }

  return (
    <main className="page-content page-content--plp">
      <section className="plp-shell">
        <div className="plp-header">
          <div>
            <p className="section-kicker">{pageData.page.eyebrow ?? 'Performance Catalog'}</p>
            <h1>
              {pageData.page.title} <span>({sortedProducts.length})</span>
            </h1>
          </div>
          <div className="plp-actions">
            <button
              className="plp-action-button"
              onClick={() => setFiltersVisible((current) => !current)}
              type="button"
            >
              {filtersVisible ? 'Hide Filters' : 'Show Filters'}
            </button>
            <button
              className="plp-action-button plp-action-button--mobile"
              onClick={() => setMobileFiltersOpen(true)}
              type="button"
            >
              Filters
            </button>
            <label className="plp-sort-control">
              <span>Sort By</span>
              <select onChange={(event) => setSelectedSort(event.target.value)} value={selectedSort}>
                {pageData.sortOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>

        <div className="plp-shortcuts" role="list" aria-label="Quick categories">
          {pageData.page.quickCategories.map((category) => (
            <button
              className={selectedQuickCategory === category ? 'plp-shortcut is-selected' : 'plp-shortcut'}
              key={category}
              onClick={() => setSelectedQuickCategory(category)}
              type="button"
            >
              {category}
            </button>
          ))}
        </div>

        {hasActiveFilters ? (
          <div className="plp-active-filters" aria-label="Applied filters">
            {selectedQuickCategory !== 'All' ? (
              <button className="plp-filter-chip" onClick={() => setSelectedQuickCategory('All')} type="button">
                {selectedQuickCategory} ×
              </button>
            ) : null}
            {activeFilterChips.map((chip) => (
              <button
                className="plp-filter-chip"
                key={`${chip.groupId}-${chip.value}`}
                onClick={() => toggleOption(chip.groupId, chip.value)}
                type="button"
              >
                {chip.value} ×
              </button>
            ))}
            {priceRange.min !== null || priceRange.max !== null ? (
              <button
                className="plp-filter-chip"
                onClick={() => {
                  setPriceInputs({ min: '', max: '' })
                  setPriceRange({ min: null, max: null })
                }}
                type="button"
              >
                {`${priceRange.min ? formatCurrency(priceRange.min) : 'Min'} - ${
                  priceRange.max ? formatCurrency(priceRange.max) : 'Max'
                } ×`}
              </button>
            ) : null}
          </div>
        ) : null}

        <div className="plp-layout">
          {filtersVisible ? (
            <FilterRail
              counts={counts}
              expandedGroups={expandedGroups}
              filters={pageData.filters}
              hasActiveFilters={hasActiveFilters}
              onApplyPrice={() =>
                setPriceRange({
                  min: priceInputs.min ? Number(priceInputs.min) : null,
                  max: priceInputs.max ? Number(priceInputs.max) : null,
                })
              }
              onPriceInputChange={(field, value) =>
                setPriceInputs((current) => ({
                  ...current,
                  [field]: value.replace(/[^\d]/g, ''),
                }))
              }
              onResetFilters={clearFilters}
              onToggleExpand={(groupId) =>
                setExpandedGroups((current) => ({
                  ...current,
                  [groupId]: !current[groupId],
                }))
              }
              onToggleOption={toggleOption}
              priceInputs={priceInputs}
              selectedFilters={selectedFilters}
            />
          ) : null}

          <section className="plp-results">
            <div className="plp-results-summary">
              <p>{sortedProducts.length} products</p>
              <a href={homeHref}>Back to homepage</a>
            </div>

            <div className="plp-grid">
              {sortedProducts.map((product) => (
                <ProductCard homeHref={homeHref} key={product.id} product={product} />
              ))}
            </div>
          </section>
        </div>
      </section>

      <div className={mobileFiltersOpen ? 'plp-mobile-drawer is-open' : 'plp-mobile-drawer'} aria-hidden={!mobileFiltersOpen}>
        <div className="plp-mobile-backdrop" onClick={() => setMobileFiltersOpen(false)} />
        <div className="plp-mobile-panel">
          <div className="plp-mobile-panel-header">
            <h2>Filters</h2>
            <button className="plp-link-button" onClick={() => setMobileFiltersOpen(false)} type="button">
              Close
            </button>
          </div>
          <FilterRail
            counts={counts}
            expandedGroups={expandedGroups}
            filters={pageData.filters}
            hasActiveFilters={hasActiveFilters}
            onApplyPrice={() =>
              setPriceRange({
                min: priceInputs.min ? Number(priceInputs.min) : null,
                max: priceInputs.max ? Number(priceInputs.max) : null,
              })
            }
            onPriceInputChange={(field, value) =>
              setPriceInputs((current) => ({
                ...current,
                [field]: value.replace(/[^\d]/g, ''),
              }))
            }
            onResetFilters={clearFilters}
            onToggleExpand={(groupId) =>
              setExpandedGroups((current) => ({
                ...current,
                [groupId]: !current[groupId],
              }))
            }
            onToggleOption={toggleOption}
            priceInputs={priceInputs}
            selectedFilters={selectedFilters}
          />
          <div className="plp-mobile-panel-footer">
            <button
              className="cta-link cta-link--muted"
              onClick={clearFilters}
              type="button"
            >
              Clear all
            </button>
            <button className="cta-link" onClick={() => setMobileFiltersOpen(false)} type="button">
              Apply filters
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
