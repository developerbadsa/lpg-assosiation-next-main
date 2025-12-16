'use client';

function getItems(page: number, pageCount: number) {
  if (pageCount <= 7) return Array.from({ length: pageCount }, (_, i) => i + 1);

  const items: (number | '...')[] = [];
  const left = Math.max(1, page - 2);
  const right = Math.min(pageCount, page + 2);

  items.push(1);
  if (left > 2) items.push('...');

  for (let p = left; p <= right; p++) {
    if (p !== 1 && p !== pageCount) items.push(p);
  }

  if (right < pageCount - 1) items.push('...');
  items.push(pageCount);

  return items;
}

export default function MembersPagination({
  page,
  pageCount,
  onPageChange,
}: {
  page: number;
  pageCount: number;
  onPageChange: (p: number) => void;
}) {
  const items = getItems(page, pageCount);

  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        disabled={page <= 1}
        onClick={() => onPageChange(page - 1)}
        className="h-7 rounded-[6px] border border-black/10 bg-white px-3 text-[11px] text-[#6F8093] disabled:opacity-60"
      >
        Previous
      </button>

      <div className="flex items-center gap-1">
        {items.map((it, idx) =>
          it === '...' ? (
            <span key={`e-${idx}`} className="px-2 text-[11px] text-[#6F8093]">
              ...
            </span>
          ) : (
            <button
              key={it}
              type="button"
              onClick={() => onPageChange(it)}
              className={`h-7 min-w-7 rounded-[6px] border px-2 text-[11px] ${
                it === page
                  ? 'border-[#0B8B4B] bg-[#0B8B4B] text-white'
                  : 'border-black/10 bg-white text-[#6F8093] hover:border-[#0B8B4B]/40'
              }`}
            >
              {String(it).padStart(2, '0')}
            </button>
          )
        )}
      </div>

      <button
        type="button"
        disabled={page >= pageCount}
        onClick={() => onPageChange(page + 1)}
        className="h-7 rounded-[6px] border border-black/10 bg-white px-3 text-[11px] text-[#6F8093] disabled:opacity-60"
      >
        Next
      </button>
    </div>
  );
}
