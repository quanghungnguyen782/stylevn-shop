import { Drawer } from "@/components/ui/Drawer";
import { FilterPanelContent } from "@/components/plp/FilterPanelContent";
import { Button } from "@/components/ui/Button";
import type { PriceRange } from "@/types/filters";

interface FilterDrawerMobileProps {
  open: boolean;
  onClose: () => void;
  resultCount: number;
  selectedBrands: string[];
  onToggleBrand: (slug: string) => void;
  gender: string | null;
  onSelectGender: (gender: string | null) => void;
  priceRange: PriceRange | null;
  onSelectPriceRange: (range: PriceRange | null) => void;
}

export function FilterDrawerMobile({
  open,
  onClose,
  resultCount,
  ...panelProps
}: FilterDrawerMobileProps) {
  return (
    <Drawer open={open} onClose={onClose} side="left" title="Bộ Lọc">
      <div className="px-5 py-4">
        <FilterPanelContent {...panelProps} />
      </div>
      <div className="sticky bottom-0 border-t border-line bg-surface px-5 py-4">
        <Button variant="primary" size="lg" className="w-full" onClick={onClose}>
          Xem {resultCount} Kết Quả
        </Button>
      </div>
    </Drawer>
  );
}
