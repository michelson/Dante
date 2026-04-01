import Link from "next/link";

function filePathToSlug(filePath: string) {
  const normalizedPath = filePath.replace(/\\/g, "/");
  const slug = normalizedPath.replace(/\.mdx?$/, "").replace(/\/index$/, "");
  return slug || "index";
}

function postPathToHref(slugOrFilePath: string) {
  const slug = slugOrFilePath.includes(".md") ? filePathToSlug(slugOrFilePath) : slugOrFilePath;
  return slug === "index" ? "/posts" : `/posts/${slug}`;
}

type SidebarProps = {
  posts: Array<{
    filePath: string;
    slug?: string;
    data: {
      title?: string;
      order?: number;
    };
  }>;
  path?: string;
  currentSlug?: string;
};

export default function Sidebar({ posts, path = "", currentSlug }: SidebarProps) {
  return (
    <aside className="hidden xl:block xl:w-72 xl:flex-none">
      <div className="sticky top-24 space-y-4">
        <div className="rounded-[2rem] border border-black/5 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          <div className="text-xs font-semibold uppercase tracking-[0.22em] text-emerald-600 dark:text-emerald-300">
            Documentation
          </div>
          <h2 className="mt-3 font-display text-3xl leading-none text-slate-950 dark:text-slate-50">
            Dante 3 guides
          </h2>
          <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
            Live examples, renderer notes, parser flows, and extension guides for the
            current editor.
          </p>
        </div>

        <nav className="rounded-[2rem] border border-black/5 bg-white/80 p-3 shadow-sm backdrop-blur dark:border-white/10 dark:bg-white/5">
          {posts.map((post) => {
            const slug = post.slug || filePathToSlug(post.filePath);
            const href = path ? `${path}${postPathToHref(slug)}`.replace("//", "/") : postPathToHref(slug);
            const active = slug === currentSlug;

            return (
              <Link
                key={post.filePath}
                href={href}
                className={`mb-2 block rounded-[1.4rem] px-4 py-3 transition last:mb-0 ${
                  active
                    ? "bg-slate-950 text-white shadow-sm dark:bg-white dark:text-slate-950"
                    : "text-slate-700 hover:bg-slate-900 hover:text-white dark:text-slate-200 dark:hover:bg-white dark:hover:text-slate-950"
                }`}
              >
                <div className="text-[11px] font-semibold uppercase tracking-[0.18em] opacity-70">
                  Guide {post.data.order || "00"}
                </div>
                <div className="mt-1 text-sm font-medium leading-5">
                  {post.data.title || slug}
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </aside>
  );
}
