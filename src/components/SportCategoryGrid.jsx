export function SportCategoryGrid({ section }) {
  return (
    <section className="homepage-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{section.kicker}</p>
          <h2>{section.title}</h2>
        </div>
        <p>{section.description}</p>
      </div>

      <div className="sport-grid">
        {section.categories.map((category) => (
          <article key={category.title} className="sport-card">
            <div className={`sport-card-visual sport-card-visual--${category.tone}`}>
              <img src={category.image} alt={category.imageAlt} />
            </div>
            <div className="sport-card-body">
              <h3>{category.title}</h3>
              <p>{category.description}</p>
              <a className="cta-link" href="/">
                {category.cta}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
