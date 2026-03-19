export function CampaignBand({ campaign }) {
  return (
    <section className={`campaign-band campaign-band--${campaign.tone}`}>
      <div className="campaign-band-copy">
        <p className="section-kicker">{campaign.kicker}</p>
        <h2>{campaign.title}</h2>
        <p>{campaign.description}</p>
        <a className="cta-link" href="/">
          {campaign.cta}
        </a>
      </div>
      <div className={`campaign-panel campaign-panel--${campaign.tone}`}>
        <img src={campaign.image} alt={campaign.imageAlt} />
      </div>
    </section>
  )
}
