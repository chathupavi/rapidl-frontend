import Sidebar from "@/components/admin/Sidebar";
import AdminHeader from "@/components/admin/AdminHeader";

export const metadata = {
  title: {
    template: "%s | Admin — Rapid Laundromat",
    default: "Admin Panel | Rapid Laundromat",
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
  },
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-gray-50 text-[#07111f]">
      

      <Sidebar />

      {/* =====================================================
          MAIN APPLICATION AREA
      ===================================================== */}
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        
        {/* Header */}
        <AdminHeader />

        {/* Page Content */}
        <main className="min-h-0 flex-1 overflow-y-auto">
          <div className="w-full px-5 py-6 sm:px-6 lg:px-8 lg:py-8">
            {children}
          </div>
        </main>
        
      </div>
      
    </div>
  );
}