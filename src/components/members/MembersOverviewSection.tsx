'use client';

import { useEffect, useMemo, useState } from 'react';
import MembersTable from './MembersTable';
import MembersTableControls from './MembersTableControls';
import MembersPagination from './MembersPagination';
import { MOCK_MEMBERS, type Member } from './mockMembers';

type SortKey = keyof Pick<Member, 'sl' | 'ownerName' | 'memberId' | 'zone' | 'district' | 'upazila'> | 'stations';
type SortDir = 'asc' | 'desc';

function MeshCorners() {
  return (
    <div className="pointer-events-none absolute inset-0">
      <svg className="absolute left-0 top-0 h-[240px] w-[340px] opacity-[0.22]" viewBox="0 0 340 240" fill="none">
        <path d="M18 18L120 70L56 138L180 170L280 110L322 40" stroke="#2D8A2D" strokeWidth="1" />
        <path d="M18 18L56 138L110 210L180 170L222 220L322 180" stroke="#2D8A2D" strokeWidth="1" />
        <path d="M120 70L180 170L280 110" stroke="#2D8A2D" strokeWidth="1" />
        {[
          [18, 18],
          [120, 70],
          [56, 138],
          [180, 170],
          [280, 110],
          [322, 40],
          [110, 210],
          [222, 220],
          [322, 180],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#2D8A2D" opacity="0.5" />
        ))}
      </svg>

      <svg className="absolute right-0 top-0 h-[240px] w-[340px] opacity-[0.22]" viewBox="0 0 340 240" fill="none">
        <path d="M322 18L220 70L284 138L160 170L60 110L18 40" stroke="#2D8A2D" strokeWidth="1" />
        <path d="M322 18L284 138L230 210L160 170L118 220L18 180" stroke="#2D8A2D" strokeWidth="1" />
        <path d="M220 70L160 170L60 110" stroke="#2D8A2D" strokeWidth="1" />
        {[
          [322, 18],
          [220, 70],
          [284, 138],
          [160, 170],
          [60, 110],
          [18, 40],
          [230, 210],
          [118, 220],
          [18, 180],
        ].map(([cx, cy], i) => (
          <circle key={i} cx={cx} cy={cy} r="3" fill="#2D8A2D" opacity="0.5" />
        ))}
      </svg>
    </div>
  );
}

function exportAsCsv(rows: Member[]) {
  const header = ['SL', 'Owner Name', 'ID', 'Station Name', 'Zone', 'District', 'Upazila'];
  const data = rows.map((r) => [
    r.sl,
    r.ownerName,
    r.memberId,
    r.stations.join(' | '),
    r.zone,
    r.district,
    r.upazila,
  ]);

  const csv = [header, ...data]
    .map((line) =>
      line
        .map((v) => {
          const s = String(v ?? '');
          const escaped = s.replaceAll('"', '""');
          return /[",\n]/.test(escaped) ? `"${escaped}"` : escaped;
        })
        .join(',')
    )
    .join('\n');

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);

  const a = document.createElement('a');
  a.href = url;
  a.download = 'members-export.csv';
  a.click();

  URL.revokeObjectURL(url);
}

function compare(a: Member, b: Member, key: SortKey) {
  if (key === 'stations') return a.stations.join(' ').localeCompare(b.stations.join(' '));
  const av = a[key];
  const bv = b[key];
  if (typeof av === 'number' && typeof bv === 'number') return av - bv;
  return String(av).localeCompare(String(bv));
}

export default function MembersOverviewSection() {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('sl');
  const [sortDir, setSortDir] = useState<SortDir>('asc');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return MOCK_MEMBERS;

    return MOCK_MEMBERS.filter((m) => {
      const hay = [
        m.ownerName,
        m.memberId,
        m.zone,
        m.district,
        m.upazila,
        ...m.stations,
      ]
        .join(' ')
        .toLowerCase();

      return hay.includes(q);
    });
  }, [query]);

  const sorted = useMemo(() => {
    const arr = [...filtered];
    arr.sort((a, b) => {
      const c = compare(a, b, sortKey);
      return sortDir === 'asc' ? c : -c;
    });
    return arr;
  }, [filtered, sortKey, sortDir]);

  const pageCount = Math.max(1, Math.ceil(sorted.length / pageSize));

  useEffect(() => {
    if (page > pageCount) setPage(pageCount);
  }, [page, pageCount]);

  const startIdx = (page - 1) * pageSize;
  const endIdx = Math.min(sorted.length, startIdx + pageSize);
  const pageRows = sorted.slice(startIdx, endIdx);

  function onSort(nextKey: SortKey) {
    if (nextKey === sortKey) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
      return;
    }
    setSortKey(nextKey);
    setSortDir('asc');
  }

  return (
    <section className="relative overflow-hidden bg-[#F4F9F4] py-14">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[#6CC12A]" />
      <MeshCorners />

      <div className="lpg-container relative">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="text-[30px] font-semibold tracking-tight text-[#133374] md:text-[36px]">
            Overview of All Members
          </h2>
          <p className="mt-2 text-[11px] leading-relaxed text-[#8A9CB0] md:text-[12px]">
            Lorem ipsum dolor sit amet consectetur. Vitae ornare cursus justo libero venenatis donec.
          </p>
        </div>

        <div className="mt-10 rounded-[18px] bg-white/80 p-5 shadow-[0_18px_55px_rgba(0,0,0,0.08)] backdrop-blur md:p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="text-[13px] font-semibold text-[#2D8A2D]">
              Total Members :{' '}
              <span className="text-[#133374]">{sorted.length}</span>
            </div>

            <button
              type="button"
              onClick={() => exportAsCsv(sorted)}
              className="inline-flex h-9 items-center justify-center gap-2 rounded-[6px] bg-[#0B8B4B] px-4 text-[12px] font-medium text-white shadow-sm transition hover:brightness-110 active:brightness-95"
            >
              <span className="inline-flex h-4 w-4 items-center justify-center">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" aria-hidden="true">
                  <path d="M7 3h10a2 2 0 0 1 2 2v14H5V5a2 2 0 0 1 2-2Z" stroke="currentColor" strokeWidth="1.8" />
                  <path d="M8 8h8M8 12h8M8 16h8" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </span>
              Export to Excel
            </button>
          </div>

          <div className="mt-4">
            <MembersTableControls
              pageSize={pageSize}
              onPageSizeChange={(n) => {
                setPageSize(n);
                setPage(1);
              }}
              query={query}
              onQueryChange={(v) => {
                setQuery(v);
                setPage(1);
              }}
            />
          </div>

          <div className="mt-4">
            <MembersTable
              rows={pageRows}
              sortKey={sortKey}
              sortDir={sortDir}
              onSort={onSort}
            />
          </div>

          <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <p className="text-[11px] text-[#7B8EA3]">
              Showing {sorted.length === 0 ? 0 : startIdx + 1} to {endIdx} of {sorted.length} entries
            </p>

            <MembersPagination
              page={page}
              pageCount={pageCount}
              onPageChange={setPage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
