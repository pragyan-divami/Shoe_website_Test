export function UtilityBar({ links }) {
  return (
    <div className="utility-bar">
      <div className="shell-container utility-bar-row">
        <p className="utility-copy">Fast dispatch. Free exchanges. Concierge fit support.</p>
        <nav aria-label="Utility">
          <ul className="utility-links">
            {links.map((link) => (
              <li key={link}>
                <a href="/">{link}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )
}
