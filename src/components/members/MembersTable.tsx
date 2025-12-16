'use client';

import type { Member } from './mockMembers';

type SortKey = keyof Pick<Member, 'sl' | 'ownerName' | 'memberId' | 'zone' | 'district' | 'upazila'> | 'stations';
type SortDir = 'asc' | 'desc';

type Props = {
  rows: Member[];
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
};

function SortMark({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span className={`ml-2 inline-flex items-center opacity-${active ? '100' : '60'}`}>
      <svg width="10" height="10" viewBox="0 0 24 24" aria-hidden="true">
        <path
          d="M8 10l4-4 4 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active && dir === 'asc' ? 1 : 0.5}
        />
        <path
          d="M16 14l-4 4-4-4"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          opacity={active && dir === 'desc' ? 1 : 0.5}
        />
      </svg>
    </span>
  );
}

function Th({
  label,
  k,
  sortKey,
  sortDir,
  onSort,
  className = '',
}: {
  label: string;
  k: SortKey;
  sortKey: SortKey;
  sortDir: SortDir;
  onSort: (key: SortKey) => void;
  className?: string;
}) {
  const active = sortKey === k;
  return (
    <th
      scope="col"
      className={`whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold text-white ${className}`}
    >
      <button type="button" onClick={() => onSort(k)} className="inline-flex items-center">
        {label}
        <SortMark active={active} dir={sortDir} />
      </button>
    </th>
  );
}

export default function MembersTable({ rows, sortKey, sortDir, onSort }: Props) {
  return (
    <div className="overflow-hidden rounded-[12px] border border-black/10 bg-white">
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full border-collapse">
          <thead className="bg-[#0B8B4B]">
            <tr>
              <Th label="SL#" k="sl" sortKey={sortKey} sortDir={sortDir} onSort={onSort} className="w-[70px]" />
              <th scope="col" className="whitespace-nowrap px-4 py-3 text-left text-[11px] font-semibold text-white w-[90px]">
                Photo
              </th>
              <Th label="Owner Name" k="ownerName" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <Th label="ID" k="memberId" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <Th label="Station Name" k="stations" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <Th label="Zone" k="zone" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <Th label="District" k="district" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
              <Th label="Upazila" k="upazila" sortKey={sortKey} sortDir={sortDir} onSort={onSort} />
            </tr>
          </thead>

          <tbody>
            {rows.map((m) => (
              <tr key={m.sl} className="border-t border-black/5">
                <td className="px-4 py-3 text-[11px] text-[#3C4B5A]">{String(m.sl).padStart(2, '0')}</td>

                <td className="px-4 py-3">
                  <div className="h-9 w-9 overflow-hidden rounded-full bg-black/5 ring-1 ring-black/10">
                    <img
                      src={m.photoUrl}
                      alt={m.ownerName}
                      className="h-full w-full object-cover"
                      loading="lazy"
                    />
                  </div>
                </td>

                <td className="px-4 py-3 text-[11px]">
                  <span className="text-[#2B5DAA]">{m.ownerName}</span>
                </td>

                <td className="px-4 py-3 text-[11px] text-[#2B5DAA]">{m.memberId}</td>

                <td className="px-4 py-3 text-[11px]">
                  <div className="space-y-1">
                    {m.stations.map((s, idx) => (
                      <div key={idx} className="text-[#2B5DAA]">
                        {s}
                      </div>
                    ))}
                  </div>
                </td>

                <td className="px-4 py-3 text-[11px] text-[#3C4B5A]">{m.zone}</td>
                <td className="px-4 py-3 text-[11px] text-[#3C4B5A]">{m.district}</td>
                <td className="px-4 py-3 text-[11px] text-[#3C4B5A]">{m.upazila}</td>
              </tr>
            ))}

            {rows.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-10 text-center text-[12px] text-[#7B8EA3]">
                  No matching members found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
