import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SidebarTrigger } from "@/components/ui/sidebar"

import { useLocation } from "react-router"

export default function SiteHeader() {

  let location = useLocation();

  const getPageTitle = () => {
    const path = location.pathname.split('/').filter(Boolean).pop() || 'dashboard';
    return path.charAt(0).toUpperCase() + path.slice(1);
  };

  return (
    <header
      className="dbHeader flex h-(--header-height) shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height) min-h-40">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <Separator orientation="vertical" className="mx-2 data-[orientation=vertical]:h-4" />
        <h1 className="text-base font-semibold">{getPageTitle()}</h1>
        <div className="ml-auto flex items-center gap-2">
        </div>
      </div>
    </header>
  );
}
