import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-[600px] flex-col items-center px-4 py-24 text-center md:px-8">
      <p className="font-display text-6xl">404</p>
      <h1 className="mt-4 text-xl">Không tìm thấy trang bạn cần.</h1>
      <p className="mt-2 text-sm text-muted">
        Trang có thể đã bị xóa hoặc đường dẫn không chính xác.
      </p>
      <Button href="/" variant="primary" size="lg" className="mt-8">
        Về Trang Chủ
      </Button>
    </div>
  );
}
