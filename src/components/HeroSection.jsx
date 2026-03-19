import { useEffect, useRef, useState } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

const stageKeyframes = [
  {
    rotateX: -8,
    rotateY: 0,
    rotateZ: -10,
    translateY: 0,
    scale: 1,
  },
  {
    rotateX: 12,
    rotateY: -30,
    rotateZ: -18,
    translateY: -18,
    scale: 1.08,
  },
  {
    rotateX: -18,
    rotateY: 34,
    rotateZ: 16,
    translateY: -30,
    scale: 1.16,
  },
]

export function HeroSection({ hero }) {
  const homeHref = import.meta.env.BASE_URL
  const sectionRef = useRef(null)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      if (!sectionRef.current) {
        return
      }

      const rect = sectionRef.current.getBoundingClientRect()
      const scrollable = Math.max(rect.height - window.innerHeight, 1)
      const nextProgress = clamp(-rect.top / scrollable, 0, 1)

      setProgress(nextProgress)
    }

    updateProgress()

    window.addEventListener('scroll', updateProgress, { passive: true })
    window.addEventListener('resize', updateProgress)

    return () => {
      window.removeEventListener('scroll', updateProgress)
      window.removeEventListener('resize', updateProgress)
    }
  }, [])

  const stageIndex = progress < 0.34 ? 0 : progress < 0.68 ? 1 : 2
  const currentStage = stageKeyframes[stageIndex]
  const sceneOpacity = 1 - clamp((progress - 0.84) / 0.16, 0, 1)

  return (
    <section className="hero-section hero-section--immersive" ref={sectionRef}>
      <div className="hero-sticky-scene" style={{ opacity: sceneOpacity }}>
        <div className="hero-scene-backdrop">
          <img className="hero-image" src={hero.visual.image} alt={hero.visual.imageAlt} />
          <div className="hero-space-grid" />
          <div className="hero-space-glow hero-space-glow--violet" />
          <div className="hero-space-glow hero-space-glow--amber" />
          <div className="hero-space-ring hero-space-ring--one" />
          <div className="hero-space-ring hero-space-ring--two" />
        </div>

        <div className="hero-copy hero-copy--immersive">
          <p className="section-kicker">{hero.kicker}</p>
          <h1>{hero.title}</h1>
          <p className="hero-summary">{hero.description}</p>
          <div className="hero-actions">
            {hero.actions.map((action) => (
              <a
                key={action.label}
                className={action.kind === 'primary' ? 'cta-button' : 'cta-button cta-button--ghost'}
                href={homeHref}
              >
                {action.label}
              </a>
            ))}
          </div>
        </div>

        <div className="hero-progress-label">
          <span>Scroll to inspect</span>
          <strong>{Math.round(progress * 100)}%</strong>
        </div>

        <div className="hero-feature-stack">
          {hero.featureScenes.map((scene, index) => {
            const isActive = stageIndex === index

            return (
              <article
                className={isActive ? 'hero-feature-card is-active' : 'hero-feature-card'}
                key={scene.title}
              >
                <p>{scene.eyebrow}</p>
                <h2>{scene.title}</h2>
                <span>{scene.description}</span>
              </article>
            )
          })}
        </div>

        <div className="hero-shoe-stage">
          <img
            className="hero-product-image hero-product-image--immersive"
            src={hero.visual.overlayImage}
            alt={hero.visual.overlayAlt}
            style={{
              transform: `perspective(1600px) rotateX(${currentStage.rotateX}deg) rotateY(${currentStage.rotateY}deg) rotateZ(${currentStage.rotateZ}deg) translateY(${currentStage.translateY}px) scale(${currentStage.scale})`,
            }}
          />
          <div className="hero-shoe-shadow" />
        </div>

        <div className="hero-stat-card hero-stat-card--immersive">
          <p>{hero.stats.eyebrow}</p>
          <strong>{hero.stats.value}</strong>
          <span>{hero.stats.caption}</span>
        </div>

        <div className="hero-highlight-rail">
          {hero.highlights.map((highlight) => (
            <div className="hero-highlight-pill" key={highlight}>
              {highlight}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
