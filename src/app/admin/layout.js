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
    <div className="flex h-screen overflow-hidden bg-foam">
      <Sidebar />
      <div className="flex h-screen flex-1 flex-col overflow-hidden">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto px-8 py-8">{children}</main>
      </div>
    </div>
  );
}