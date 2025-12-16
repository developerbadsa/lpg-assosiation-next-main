'use client';

type Props = {
  pageSize: number;
  onPageSizeChange: (n: number) => void;
  query: string;
  onQueryChange: (v: string) => void;
};

export default function MembersTableControls({
  pageSize,
  onPageSizeChange,
  query,
  onQueryChange,
}: Props) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-2 text-[11px] text-[#6F8093]">
        <span>Show</span>
        <select
          value={pageSize}
          onChange={(e) => onPageSizeChange(Number(e.target.value))}
          className="h-8 rounded-[6px] border border-black/10 bg-white px-2 text-[11px] text-[#2B3A4A] shadow-sm outline-none focus:border-[#0B8B4B]"
        >
          {[10, 25, 50, 100].map((n) => (
            <option key={n} value={n}>
              {n}
            </option>
          ))}
        </select>
      </div>

      <label className="flex items-center gap-2 text-[11px] text-[#6F8093]">
        <span>Search:</span>
        <input
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          placeholder=""
          className="h-8 w-full rounded-[6px] border border-black/10 bg-white px-3 text-[11px] text-[#2B3A4A] shadow-sm outline-none focus:border-[#0B8B4B] md:w-[240px]"
        />
      </label>
    </div>
  );
}
