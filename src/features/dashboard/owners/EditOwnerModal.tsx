'use client';

import { useEffect, useMemo, useState } from 'react';
import Modal from '@/components/ui/modal/Modal';
import type { OwnerRow, OwnerStatus } from './types';

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

export default function EditOwnerModal({
  open,
  owner,
  busy,
  onClose,
  onSave,
}: {
  open: boolean;
  owner: OwnerRow | null;
  busy: boolean;
  onClose: () => void;
  onSave: (input: { address: string; status: OwnerStatus; rejectionReason: string }) => void;
}) {
  const [address, setAddress] = useState('');
  const [status, setStatus] = useState<OwnerStatus>('UNVERIFIED');
  const [rejectionReason, setRejectionReason] = useState('');

  useEffect(() => {
    if (!open || !owner) return;
    setAddress(owner.address ?? '');
    setStatus(owner.status ?? 'UNVERIFIED');
    setRejectionReason('');
  }, [open, owner]);

  const showRejection = useMemo(() => status === 'REJECTED', [status]);

  return (
    <Modal open={open} title="Edit Owner" onClose={onClose} maxWidthClassName="max-w-[640px]">
      <div className="p-6 space-y-4">
        <div className="grid gap-3 md:grid-cols-[160px_1fr] items-center">
          <div className="text-[11px] font-semibold text-[#2B3A4A] md:text-right">Owner</div>
          <div className="text-[12px] text-[#133374] font-semibold">{owner?.ownerName ?? '-'}</div>
        </div>

        <div className="grid gap-3 md:grid-cols-[160px_1fr] items-center">
          <div className="text-[11px] font-semibold text-[#2B3A4A] md:text-right">Status</div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as OwnerStatus)}
            className={cx(
              'h-9 w-full rounded-[8px] border border-black/10 bg-[#F7F9FC] px-3 text-[12px]',
              'text-[#2B3A4A] outline-none focus:border-[#009970]'
            )}
          >
            <option value="UNVERIFIED">UNVERIFIED</option>
            <option value="VERIFIED">VERIFIED</option>
            <option value="REJECTED">REJECTED</option>
          </select>
        </div>

        <div className="grid gap-3 md:grid-cols-[160px_1fr] items-center">
          <div className="text-[11px] font-semibold text-[#2B3A4A] md:text-right">Address</div>
          <input
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="h-9 w-full rounded-[8px] border border-black/10 bg-[#F7F9FC] px-3 text-[12px] text-[#2B3A4A] outline-none focus:border-[#009970]"
          />
        </div>

        {showRejection && (
          <div className="grid gap-3 md:grid-cols-[160px_1fr] items-center">
            <div className="text-[11px] font-semibold text-[#2B3A4A] md:text-right">Reason</div>
            <input
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="Rejection reason (optional)"
              className="h-9 w-full rounded-[8px] border border-black/10 bg-[#F7F9FC] px-3 text-[12px] text-[#2B3A4A] outline-none focus:border-[#009970]"
            />
          </div>
        )}

        <div className="pt-2 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="h-9 rounded-[8px] bg-[#F1F3F6] px-6 text-[12px] font-semibold text-[#2B3A4A] disabled:opacity-60"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={() => onSave({ address, status, rejectionReason })}
            disabled={busy}
            className="h-9 rounded-[8px] bg-[#009970] px-8 text-[12px] font-semibold text-white shadow-sm hover:brightness-110 active:brightness-95 disabled:opacity-60"
          >
            {busy ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
