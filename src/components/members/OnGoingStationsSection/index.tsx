'use client';

import {useMemo} from 'react';
import TablePanel from '@/components/ui/table-panel/TablePanel';
import type {ColumnDef} from '@/components/ui/table-panel/types';
import MeshCorners from '@/components/ui/MeshCorners';

import {MOCK_ON_GOING_STATIONS, type OnGoingStationRow} from './mockOnGoingStations';

function ApplyBadge() {
  return (
    <span className="inline-flex items-center justify-center rounded-[6px] bg-[#FFB800] px-2 py-[3px] text-[9px] font-semibold text-black shadow-sm">
      Apply for Membership
    </span>
  );
}

function OwnerBadge({label}: {label: string}) {
  return (
    <span className="inline-flex h-4 items-center justify-center rounded-full bg-[#EAF7EA] px-2 text-[9px] font-medium text-[#2D8A2D] ring-1 ring-[#2D8A2D]/15">
      {label}
    </span>
  );
}

export default function OnGoingStationsSection() {
  const columns = useMemo<ColumnDef<OnGoingStationRow>[]>(() => [
    {
      id: 'sl',
      header: '#',
      sortable: true,
      sortValue: (r) => r.sl,
      csvHeader: 'SL',
      csvValue: (r) => r.sl,
      headerClassName: 'w-[70px]',
      minWidth: 70,
      cell: (r) => String(r.sl).padStart(2, '0'),
    },
    {
      id: 'ownerName',
      header: 'Owner Name',
      sortable: true,
      sortValue: (r) => r.ownerName,
      csvHeader: 'Owner Name',
      csvValue: (r) => r.ownerName,
      minWidth: 320,
      cell: (r) => (
        <div className="space-y-1 leading-[1.25]">
          <div className="text-inherit">{r.ownerName}</div>
          {r.ownerBadge ? <OwnerBadge label={r.ownerBadge} /> : null}
        </div>
      ),
    },
    {
      id: 'membershipId',
      header: 'Membership ID',
      sortable: true,
      sortValue: (r) => r.membershipId ?? '',
      csvHeader: 'Membership ID',
      csvValue: (r) => r.membershipId ?? '',
      minWidth: 150,
      cell: (r) => (r.membershipId ? <span className="text-inherit">{r.membershipId}</span> : <ApplyBadge />),
    },
    {
      id: 'zone',
      header: 'Zone',
      sortable: true,
      sortValue: (r) => r.zone,
      csvHeader: 'Zone',
      csvValue: (r) => r.zone,
      minWidth: 130,
      cell: (r) => <span className="text-inherit">{r.zone}</span>,
    },
    {
      id: 'district',
      header: 'District',
      sortable: true,
      sortValue: (r) => r.district,
      csvHeader: 'District',
      csvValue: (r) => r.district,
      minWidth: 170,
      cell: (r) => <span className="text-inherit">{r.district}</span>,
    },
    {
      id: 'upazila',
      header: 'Upazila',
      sortable: true,
      sortValue: (r) => r.upazila,
      csvHeader: 'Upazila',
      csvValue: (r) => r.upazila,
      minWidth: 140,
      cell: (r) => <span className="text-inherit">{r.upazila}</span>,
    },
  ], []);

  return (
    <section className="relative overflow-hidden bg-[#F4F9F4] py-14">
      <div className="absolute inset-x-0 top-0 h-[3px] bg-[#6CC12A]" />

      <MeshCorners className="z-0" color="#2D8A2D" opacity={0.18} width={620} height={420} strokeWidth={1} />

      <div className="pointer-events-none absolute inset-0 z-0 bg-[radial-gradient(900px_520px_at_18%_10%,rgba(45,138,45,0.10),transparent_60%),radial-gradient(900px_520px_at_82%_10%,rgba(45,138,45,0.10),transparent_60%)]" />

      <div className="lpg-container relative z-10">
        <div className="mx-auto max-w-[860px] text-center">
          <h2 className="text-[30px] font-semibold tracking-tight text-[#133374] md:text-[36px]">
            List of All LPG Autogas On Going Stations
          </h2>
          <p className="mt-2 text-[11px] leading-relaxed text-[#8A9CB0] md:text-[12px]">
            Lorem ipsum dolor sit amet consectetur. Semper id ipsum adipiscing dictum dictum ullamcorper est arcu.
            Lobortis in pellentesque mi.
          </p>
        </div>

        <div className="mt-10">
          <TablePanel
            rows={MOCK_ON_GOING_STATIONS}
            columns={columns}
            getRowKey={(r) => String(r.sl)}
            exportFileName="on-going-stations.csv"
            searchText={(r) => [r.ownerName, r.membershipId ?? '', r.zone, r.district, r.upazila].join(' ')}
          />
        </div>
      </div>
    </section>
  );
}
