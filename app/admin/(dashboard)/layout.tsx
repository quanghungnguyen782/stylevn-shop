import Link from "next/link";
import type { ReactNode } from "react";
import { LogoutButton } from "@/components/admin/LogoutButton";

// Only wraps the logged-in dashboard pages (route group, doesn't affect URLs)
// — /admin/login stays outside this group so it renders without this chrome.
// Auth gating itself happens in proxy.ts, not here.
export default function AdminDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen">
      <header className="border-b border-line">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-4 py-4 md:px-8">
          <nav className="flex gap-6 text-sm uppercase tracking-wide">
            <Link href="/admin/san-pham" className="hover:text-accent">
              Sản Phẩm
            </Link>
            <Link href="/admin/hang-hieu" className="hover:text-accent">
              Hàng Hiệu
            </Link>
          </nav>
          <LogoutButton />
        </div>
      </header>
      <main className="mx-auto max-w-[1200px] px-4 py-8 md:px-8">{children}</main>
    </div>
  );
}
