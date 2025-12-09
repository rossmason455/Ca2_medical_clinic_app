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

const data = {
  user: {
    name: "Dr. Ross",
    email: "ross@example.com",
    avatar: "/avatars/doctor.jpg",
  },
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

export default function AppSidebar({ onLogin, loggedIn, ...props }) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader className="!p-0">
        <SidebarMenu >
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-0 min-h-40 justify-center"
            >
              <a href="#">
                   <img
      src="public/images/Gemini_Generated_Image_wny4u5wny4u5wny4.png"
      alt="Medi Direct+ Logo"
      className="w-60 h-60" 
    />

              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} onLogin={onLogin} />
      </SidebarFooter>
    </Sidebar>
  );
}
