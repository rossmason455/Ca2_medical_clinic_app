import { IconCirclePlusFilled, IconMail } from "@tabler/icons-react";
import { Link } from 'react-router';
import { useLocation } from 'react-router'
import { Button } from "@/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export default function NavMain({
    items
}) {

    let location = useLocation();

     // Function to check if a navigation item is active based on current pathname
     // Special case: if on '/dashboard' and url is '/', consider active (possibly for root redirect)
     // Otherwise, if url is not '/dashboard' and pathname includes the url, consider active
     const checkActive = (url) => {
    if(location.pathname === '/dashboard' && url === '/')
    {
      console.log("You are in dashboard")
      return true
    }
    else if(url !== '/dashboard' && location.pathname.includes(url)) {
      console.log("You are somwhere else")
      return true
    }

    return false
  };
    
  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          <SidebarMenuItem className="flex items-center gap-2 mb-10">
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild tooltip={item.title} isActive={checkActive(item.url)} >
                <Link className="sideBarText p-10 mb-5" to={item.url}  >
                   {item.icon && <item.icon />}
                  <span className="font-bold">{item.title}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
