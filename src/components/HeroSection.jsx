import { useEffect, useRef, useState } from 'react'
import { HeroShoeScene } from './HeroShoeScene.jsx'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

export function HeroSection({ hero }) {
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
  const sceneOpacity = 1 - clamp((progress - 0.84) / 0.16, 0, 1)
  const sceneTranslateY = progress * 96
  const activeScene = hero.featureScenes[stageIndex]

  return (
    <section className="hero-section hero-section--immersive" ref={sectionRef}>
      <div className="hero-sticky-scene" style={{ opacity: sceneOpacity, transform: `translateY(${sceneTranslateY}px)` }}>
        <div className="hero-scene-backdrop">
          <div className="hero-space-grid" />
          <div className="hero-space-glow hero-space-glow--violet" />
          <div className="hero-space-glow hero-space-glow--amber" />
          <div className="hero-space-ring hero-space-ring--one" />
          <div className="hero-space-ring hero-space-ring--two" />
        </div>

        <div className="hero-progress-label">
          <span>Feature</span>
          <strong>{`0${stageIndex + 1}`}</strong>
        </div>

        <div className="hero-shoe-stage">
          <div className="hero-canvas-shell">
            <HeroShoeScene modelUrl={hero.visual.model} progress={progress} />
          </div>
          <span className="visually-hidden">{hero.visual.overlayAlt}</span>
          <div className="hero-shoe-shadow" />
        </div>

        <article className="hero-feature-screen" key={activeScene.title}>
          <p>{activeScene.eyebrow}</p>
          <h1>{activeScene.title}</h1>
          <span>{activeScene.description}</span>
        </article>
      </div>
    </section>
  )
}
