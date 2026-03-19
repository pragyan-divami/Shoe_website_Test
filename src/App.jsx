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
  productListingPage,
  promoMessages,
  utilityLinks,
} from './data/siteContent.js'
import './styles/app-shell.css'

const getCurrentPage = () => (window.location.hash === '#/men/shoes' ? 'men-shoes' : 'home')

function App() {
  const [activeMenu, setActiveMenu] = useState(primaryNavItems[0].id)
  const [currentPage, setCurrentPage] = useState(getCurrentPage)

  useEffect(() => {
    const handleHashChange = () => {
      const page = getCurrentPage()

      setCurrentPage(page)
      setActiveMenu(page === 'men-shoes' ? 'men' : primaryNavItems[0].id)
    }

    window.addEventListener('hashchange', handleHashChange)
    handleHashChange()

    return () => {
      window.removeEventListener('hashchange', handleHashChange)
    }
  }, [])

  const handleMenuChange = (menuId) => {
    setActiveMenu(menuId)

    if (menuId === 'men') {
      window.location.hash = '/men/shoes'
      return
    }

    window.location.hash = ''
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
      {currentPage === 'men-shoes' ? (
        <ProductListingPage pageData={productListingPage} />
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
