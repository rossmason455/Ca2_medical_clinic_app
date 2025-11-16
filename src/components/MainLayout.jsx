import { SidebarProvider } from "@/components/ui/sidebar";
import SideBar from '@/components/SideBar';
export default function MainLayout({ children }) {


    return (
        <>       
          
              <div className="flex min-h-screen">
                <SidebarProvider> 
      <SideBar />  

      </SidebarProvider>        
      <main className="flex-1 p-4">{children}</main>
    </div>
        </>

    )

}