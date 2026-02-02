import { AdminGuard } from "./AdminGuard";
import { AdminShell } from "./AdminShell";

export const metadata = {
  title: "Admin",
  description: "Notaxia admin dashboard",
  robots: "noindex, nofollow",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminGuard>
      <AdminShell>{children}</AdminShell>
    </AdminGuard>
  );
}
