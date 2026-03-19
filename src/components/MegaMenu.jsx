export function MegaMenu({ activeMenu, groups }) {
  const menu = groups[activeMenu] ?? groups.default
  const homeHref = import.meta.env.BASE_URL

  return (
    <section className="mega-menu" aria-label={`${menu.label} menu`}>
      <div className="shell-container mega-menu-grid">
        {menu.columns.map((column) => (
          <div key={column.heading} className="mega-menu-column">
            <p>{column.heading}</p>
            <ul>
              {column.links.map((link) => (
                <li key={link}>
                  <a href={homeHref}>{link}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <aside className="mega-menu-feature">
          <p className="section-kicker">{menu.feature.kicker}</p>
          <h2>{menu.feature.title}</h2>
          <p>{menu.feature.description}</p>
          <a className="feature-link" href={homeHref}>
            {menu.feature.cta}
          </a>
        </aside>
      </div>
    </section>
  )
}
