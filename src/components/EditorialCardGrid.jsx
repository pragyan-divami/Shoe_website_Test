export function EditorialCardGrid({ section }) {
  return (
    <section className="homepage-section">
      <div className="section-heading">
        <div>
          <p className="section-kicker">{section.kicker}</p>
          <h2>{section.title}</h2>
        </div>
        <p>{section.description}</p>
      </div>

      <div className="editorial-grid">
        {section.cards.map((card) => (
          <article key={card.title} className="editorial-card">
            <div className={`media-panel media-panel--${card.tone}`}>
              <img src={card.image} alt={card.imageAlt} />
            </div>
            <div className="editorial-card-body">
              <p className="editorial-card-tag">{card.tag}</p>
              <h3>{card.title}</h3>
              <p>{card.description}</p>
              <a className="cta-link" href="/">
                {card.cta}
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
