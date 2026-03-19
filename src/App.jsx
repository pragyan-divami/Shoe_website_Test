import { useState } from 'react'
import { AppShell } from './components/AppShell.jsx'
import { CampaignBand } from './components/CampaignBand.jsx'
import { EditorialCardGrid } from './components/EditorialCardGrid.jsx'
import { HeroSection } from './components/HeroSection.jsx'
import { SecondaryPromoSection } from './components/SecondaryPromoSection.jsx'
import { SportCategoryGrid } from './components/SportCategoryGrid.jsx'
import {
  footerColumns,
  homepage,
  megaMenuGroups,
  primaryNavItems,
  promoMessages,
  utilityLinks,
} from './data/siteContent.js'
import './styles/app-shell.css'

function App() {
  const [activeMenu, setActiveMenu] = useState(primaryNavItems[0].id)

  return (
    <AppShell
      activeMenu={activeMenu}
      footerColumns={footerColumns}
      megaMenuGroups={megaMenuGroups}
      onMenuChange={setActiveMenu}
      primaryNavItems={primaryNavItems}
      promoMessages={promoMessages}
      utilityLinks={utilityLinks}
    >
      <main className="page-content">
        <HeroSection hero={homepage.hero} />
        <SecondaryPromoSection promo={homepage.secondaryPromo} />
        <EditorialCardGrid section={homepage.featured} />
        <SportCategoryGrid section={homepage.sportGrid} />
        {homepage.campaigns.map((campaign) => (
          <CampaignBand key={campaign.title} campaign={campaign} />
        ))}
      </main>
    </AppShell>
  )
}

export default App
