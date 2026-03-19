export function HeroSection({ hero }) {
  return (
    <section className="hero-section">
      <div className="hero-copy">
        <p className="section-kicker">{hero.kicker}</p>
        <h1>{hero.title}</h1>
        <p className="hero-summary">{hero.description}</p>
        <div className="hero-actions">
          {hero.actions.map((action) => (
            <a
              key={action.label}
              className={action.kind === 'primary' ? 'cta-button' : 'cta-button cta-button--ghost'}
              href="/"
            >
              {action.label}
            </a>
          ))}
        </div>
        <ul className="hero-highlights">
          {hero.highlights.map((highlight) => (
            <li key={highlight}>{highlight}</li>
          ))}
        </ul>
      </div>

      <div className="hero-visual">
        <img
          className="hero-image"
          src={hero.visual.image}
          alt={hero.visual.imageAlt}
        />
        <div className="hero-stat-card">
          <p>Race-ready cushioning</p>
          <strong>38%</strong>
          <span>lighter upper package</span>
        </div>
        <figure className="hero-product-card">
          <img
            className="hero-product-image"
            src={hero.visual.overlayImage}
            alt={hero.visual.overlayAlt}
          />
        </figure>
      </div>
    </section>
  )
}
