import { SiteBanner } from "@/components/site-banner"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <SiteBanner />
      <div className="relative flex flex-1 flex-col">
        <SiteHeader overlay />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </div>
    </>
  )
}
