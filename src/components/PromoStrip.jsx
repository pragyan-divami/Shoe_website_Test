export function PromoStrip({ messages }) {
  return (
    <section className="promo-strip" aria-label="Announcements">
      <div className="shell-container promo-strip-row">
        {messages.map((message) => (
          <p key={message}>{message}</p>
        ))}
      </div>
    </section>
  )
}
