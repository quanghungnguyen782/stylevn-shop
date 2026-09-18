import Link from "next/link";
import { ZALO_CONTACT_URL } from "@/lib/constants";
import { IconChat } from "@/components/ui/icons";

export function ZaloFloatingButton() {
  return (
    <Link
      href={ZALO_CONTACT_URL}
      aria-label="Chat Zalo"
      className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-canvas shadow-lg transition-transform duration-200 hover:scale-105"
    >
      <IconChat width={24} height={24} />
    </Link>
  );
}
