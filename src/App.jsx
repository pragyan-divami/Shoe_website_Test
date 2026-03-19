import { useEffect, useState } from 'react'
import { AppShell } from './components/AppShell.jsx'
import { CampaignBand } from './components/CampaignBand.jsx'
import { EditorialCardGrid } from './components/EditorialCardGrid.jsx'
import { HeroSection } from './components/HeroSection.jsx'
import { ProductListingPage } from './components/ProductListingPage.jsx'
import { SecondaryPromoSection } from './components/SecondaryPromoSection.jsx'
import { SportCategoryGrid } from './components/SportCategoryGrid.jsx'
import {
  footerColumns,
  homepage,
  megaMenuGroups,
  primaryNavItems,
  productListingPages,
  promoMessages,
  utilityLinks,
} from './data/siteContent.js'
import './styles/app-shell.css'

const pageByHash = {
  '#/men/shoes': 'men',
  '#/women/shoes': 'women',
  '#/kids/shoes': 'kids',
  '#/flight-lab/negen': 'lab',
}

const getCurrentPage = () => pageByHash[window.location.hash] ?? 'home'

function App() {
  const [activeMenu, setActiveMenu] = useState(primaryNavItems[0].id)
  const [currentPage, setCurrentPage] = useState(getCurrentPage)

  useEffect(() => {
    const handleHashChange = () => {
      const page = getCurrentPage()

      setCurrentPage(page)
      setActiveMenu(page === 'home' ? primaryNavItems[0].id : page)
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId)

    if (menuId === 'men') window.location.hash = '/men/shoes'
    else if (menuId === 'women') window.location.hash = '/women/shoes'
    else if (menuId === 'kids') window.location.hash = '/kids/shoes'
    else if (menuId === 'lab') window.location.hash = '/flight-lab/negen'
    else window.location.hash = ''

  }

  return (
    <AppShell
      activeMenu={activeMenu}
      footerColumns={footerColumns}
      megaMenuGroups={megaMenuGroups}
      onMenuChange={handleMenuChange}
      primaryNavItems={primaryNavItems}
      promoMessages={promoMessages}
      utilityLinks={utilityLinks}
    >
      {currentPage !== 'home' ? (
        <ProductListingPage pageData={productListingPages[currentPage]} />
      ) : (
        <main className="page-content">
          <HeroSection hero={homepage.hero} />
          <SecondaryPromoSection promo={homepage.secondaryPromo} />
          <EditorialCardGrid section={homepage.featured} />
          <SportCategoryGrid section={homepage.sportGrid} />
          {homepage.campaigns.map((campaign) => (
            <CampaignBand key={campaign.title} campaign={campaign} />
          ))}
        </main>
      )}
    </AppShell>
  )
}

export default App
