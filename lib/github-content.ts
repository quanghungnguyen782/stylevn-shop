const PRODUCTS_PATH = "data/products.json";

function githubHeaders(accept: string) {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error("Missing GITHUB_TOKEN env var");
  return {
    Authorization: `token ${token}`,
    Accept: accept,
  };
}

function repoUrl(): string {
  const repo = process.env.GITHUB_REPO;
  if (!repo) throw new Error("Missing GITHUB_REPO env var");
  return `https://api.github.com/repos/${repo}/contents/${PRODUCTS_PATH}`;
}

/**
 * `data/products.json` is already over GitHub's 1 MB inline-content cap for
 * the Contents API (confirmed: the file is ~1.04 MB) — the default response
 * comes back with `content: "", encoding: "none"` above that size, while
 * `sha`/`size` metadata are always present regardless of file size. So this
 * is deliberately TWO requests: one default-media-type GET for `sha`, one
 * with `Accept: application/vnd.github.raw+json` (GitHub's documented path
 * for 1-100 MB files) for the actual file text. Getting this wrong means
 * silently writing back an empty/corrupted file.
 */
export async function getProductsFile(): Promise<{ content: string; sha: string }> {
  const [metaRes, rawRes] = await Promise.all([
    fetch(repoUrl(), { headers: githubHeaders("application/vnd.github+json"), cache: "no-store" }),
    fetch(repoUrl(), { headers: githubHeaders("application/vnd.github.raw+json"), cache: "no-store" }),
  ]);

  if (!metaRes.ok) throw new Error(`GitHub metadata fetch failed: ${metaRes.status}`);
  if (!rawRes.ok) throw new Error(`GitHub raw content fetch failed: ${rawRes.status}`);

  const meta = await metaRes.json();
  const content = await rawRes.text();
  return { content, sha: meta.sha as string };
}

export class ProductsFileConflictError extends Error {
  constructor() {
    super("Ai đó vừa sửa file sản phẩm trước bạn — vui lòng tải lại trang và thử lại.");
    this.name = "ProductsFileConflictError";
  }
}

export async function putProductsFile(newContent: string, sha: string, commitMessage: string): Promise<void> {
  // Buffer handles UTF-8 (Vietnamese diacritics) correctly — never use
  // browser btoa()/atob() here, which mangle anything outside Latin1.
  const encoded = Buffer.from(newContent, "utf-8").toString("base64");

  const res = await fetch(repoUrl(), {
    method: "PUT",
    headers: {
      ...githubHeaders("application/vnd.github+json"),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: commitMessage,
      content: encoded,
      sha, // conditional write — GitHub rejects with 409 if the file moved since we read it
    }),
  });

  if (res.status === 409) {
    throw new ProductsFileConflictError();
  }
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`GitHub commit failed: ${res.status} ${body}`);
  }
}
