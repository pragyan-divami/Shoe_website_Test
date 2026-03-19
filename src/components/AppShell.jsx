import { Footer } from './Footer.jsx'
import { MainHeader } from './MainHeader.jsx'
import { UtilityBar } from './UtilityBar.jsx'

export function AppShell({
  activeMenu,
  children,
  footerColumns,
  megaMenuGroups,
  onMenuChange,
  primaryNavItems,
  promoMessages,
  utilityLinks,
}) {
  return (
    <div className="app-shell">
      <UtilityBar links={utilityLinks} />
      <MainHeader
        activeMenu={activeMenu}
        items={primaryNavItems}
        onMenuChange={onMenuChange}
      />
      {children}
      <Footer columns={footerColumns} />
    </div>
  )
}
