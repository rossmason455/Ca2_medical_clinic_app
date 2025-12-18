import * as React from "react";
import {
  IconHome2,
  IconStethoscope,
  IconClipboardCheck,
  IconPill,
  IconEmergencyBed,
  IconFile,
} from "@tabler/icons-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

import NavMain from "@/components/NavMain.jsx";
import NavUser from "@/components/NavUser.jsx";

// Default data for sidebar navigation items and fallback user information
const data = {
  user: {
    name: "Dr. Ross",
    email: "ross@example.com",
    avatar: "/avatars/doctor.jpg",
  },
  // Navigation items for the main sections of the medical clinic app
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: IconHome2,
    },
    {
      title: "Doctors",
      url: "/doctors",
      icon: IconStethoscope,
    },
    {
      title: "Patients",
      url: "/patients",
      icon: IconEmergencyBed,
    },
    {
      title: "Appointments",
      url: "/appointments",
      icon: IconClipboardCheck,
    },
    {
      title: "Prescriptions",
      url: "/prescriptions",
      icon: IconPill,
    },
    {
      title: "Diagnoses",
      url: "/diagnoses",
      icon: IconFile,
    },

  ],
};

// Main sidebar component for the medical clinic application
export default function AppSidebar({ onLogin, user, ...props }) {
  // onLogin: callback function for login actions
  // loggedIn: boolean indicating if user is logged in
  // user: current user object, falls back to default if not provided
  // ...props: additional props passed to the Sidebar component
  return (
    // Sidebar component with offcanvas collapse mode for mobile responsiveness
    <Sidebar collapsible="offcanvas" {...props}>
      {/* Header section containing the app logo */}
      <SidebarHeader className="!p-0">
        <SidebarMenu >
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              // Custom className to override default padding for the menu button slot and set minimum height and centering
              className="data-[slot=sidebar-menu-button]:!p-0 min-h-40 justify-center"
            >
              <a href="#">
                {/* App logo image for Medi Direct+ */}
                <img
                  src="public/images/Gemini_Generated_Image_p6r1m0p6r1m0p6r1.png"
                  alt="Medi Direct+ Logo"
                  className="w-60 h-60" 
                />

              </a>

              
            </SidebarMenuButton>
            
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      {/* Main content area with navigation menu */}
      <SidebarContent>
        <NavMain items={data.navMain} />
        
      </SidebarContent>
      {/* Footer section with user navigation, using provided user or default fallback */}
      <SidebarFooter>
        
        <NavUser user={user || data.user} onLogin={onLogin}  />
      </SidebarFooter>
    </Sidebar>
  );
}
