const utilityActions = ['Search', 'Favourites', 'Bag', 'Profile']

export function MainHeader({ activeMenu, items, onMenuChange }) {
  const homeHref = import.meta.env.BASE_URL

  return (
    <header className="main-header">
      <div className="shell-container main-header-row">
        <a className="brand-mark" href={homeHref} aria-label="Go to homepage">
          <span className="brand-mark-badge">S</span>
          <span className="brand-mark-text">
            <strong>Stride State</strong>
            <small>Performance footwear</small>
          </span>
        </a>

        <nav className="desktop-nav" aria-label="Primary">
          {items.map((item) => (
            <button
              key={item.id}
              className={item.id === activeMenu ? 'nav-link is-active' : 'nav-link'}
              type="button"
              onClick={() => onMenuChange(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header-actions">
          {utilityActions.map((action) => (
            <button key={action} className="icon-action" type="button">
              <span aria-hidden="true">{action.slice(0, 1)}</span>
              <span className="visually-hidden">{action}</span>
            </button>
          ))}
          <button className="mobile-menu-trigger" type="button">
            Menu
          </button>
        </div>
      </div>
    </header>
  )
}
