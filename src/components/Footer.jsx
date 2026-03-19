export function Footer({ columns }) {
  return (
    <footer className="site-footer">
      <div className="shell-container site-footer-grid">
        {columns.map((column) => (
          <section key={column.title} className="footer-column">
            <h2>{column.title}</h2>
            <ul>
              {column.links.map((link) => (
                <li key={link}>{link}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <div className="site-footer-bottom">
        <div className="shell-container site-footer-bottom-row">
          <p>Designed for editorial commerce flows, not brand imitation.</p>
          <div className="site-footer-meta">
            <span>India-ready logistics content</span>
            <span>Responsive shell tokens enabled</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
