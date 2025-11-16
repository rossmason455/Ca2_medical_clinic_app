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
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">Medi Direct+</span>
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
