import { useRef } from 'react'

export function SecondaryPromoSection({ promo }) {
  const videoRef = useRef(null)
  const hasHoverVideo = Boolean(promo.hoverVideo)
  const homeHref = import.meta.env.BASE_URL

  const playHoverVideo = () => {
    if (!hasHoverVideo || !videoRef.current) {
      return
    }

    videoRef.current.currentTime = 0
    videoRef.current.play().catch(() => {})
  }

  const stopHoverVideo = () => {
    if (!hasHoverVideo || !videoRef.current) {
      return
    }

    videoRef.current.pause()
    videoRef.current.currentTime = 0
  }

  return (
    <section className="secondary-promo">
      <div
        className={`secondary-promo-visual secondary-promo-visual--${promo.tone}`}
        onMouseEnter={playHoverVideo}
        onMouseLeave={stopHoverVideo}
        onFocus={playHoverVideo}
        onBlur={stopHoverVideo}
      >
        <img src={promo.image} alt={promo.imageAlt} />
        {hasHoverVideo ? (
          <video
            ref={videoRef}
            className="secondary-promo-hover-video"
            src={promo.hoverVideo}
            poster={promo.image}
            muted
            loop
            playsInline
            preload="metadata"
            aria-hidden="true"
          />
        ) : null}
      </div>
      <div className="secondary-promo-copy">
        <p className="section-kicker">{promo.kicker}</p>
        <h2>{promo.title}</h2>
        <p>{promo.description}</p>
        <div className="secondary-promo-actions">
          {promo.actions.map((action) => (
            <a
              key={action.label}
              className={action.kind === 'primary' ? 'cta-link' : 'cta-link cta-link--muted'}
              href={homeHref}
            >
              {action.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
