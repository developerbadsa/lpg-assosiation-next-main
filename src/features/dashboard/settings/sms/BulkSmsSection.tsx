
'use client';

import {useMemo, useState} from 'react';
import PrimaryButton from '@/components/ui/PrimaryButton';

type Target =
  | 'ALL_STATION_OWNERS'
  | 'ALL_MEMBERS'
  | 'VERIFIED_OWNERS'
  | 'VERIFIED_STATIONS'
  | 'CUSTOM_NUMBERS';

const mockSendBulkSms = async (_payload: {
  target: Target;
  numbers?: string[];
  message: string;
}) => {
  await new Promise(r => setTimeout(r, 650));
};

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

function parseNumbers(raw: string) {
  return raw
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

export default function BulkSmsSection() {
  const options = useMemo(
    () => [
      {value: 'ALL_STATION_OWNERS' as const, label: 'All Station Owners'},
      {value: 'ALL_MEMBERS' as const, label: 'All Members'},
      {value: 'VERIFIED_OWNERS' as const, label: 'Verified Owners'},
      {value: 'VERIFIED_STATIONS' as const, label: 'Verified Stations'},
      {value: 'CUSTOM_NUMBERS' as const, label: 'Custom Numbers'},
    ],
    []
  );

  const [target, setTarget] = useState<Target>('ALL_STATION_OWNERS');
  const [customNumbers, setCustomNumbers] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [toast, setToast] = useState<{type: 'ok' | 'err'; text: string} | null>(
    null
  );

  const isCustom = target === 'CUSTOM_NUMBERS';

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setToast(null);

    const trimmedMsg = message.trim();
    if (!trimmedMsg) {
      setToast({type: 'err', text: 'Message is required.'});
      return;
    }

    const numbers = isCustom ? parseNumbers(customNumbers) : undefined;
    if (isCustom && (!numbers || numbers.length === 0)) {
      setToast({type: 'err', text: 'Please enter at least 1 phone number.'});
      return;
    }

    try {
      setSending(true);
      await mockSendBulkSms({target, numbers, message: trimmedMsg});
      setToast({type: 'ok', text: 'SMS queued (mock). Replace with API later.'});
      setMessage('');
      setCustomNumbers('');
      setTarget('ALL_STATION_OWNERS');
    } catch (err: any) {
      setToast({type: 'err', text: err?.message ?? 'Failed to send SMS.'});
    } finally {
      setSending(false);
    }
  };

  return (
    <section className="min-w-0">
      {/* Top title card (like screenshot) */}
  <h2 className="text-center text-[14px] font-medium text-[#133374] md:text-[15px]">
    Bulk SMS
  </h2>

      {/* Center form card */}
      <div className="mx-auto mt-10 w-full max-w-[560px]">
        <div className="rounded-[10px] bg-white/80 p-6 shadow-[0_18px_55px_rgba(0,0,0,0.08)] backdrop-blur">
          <div className="mb-4 inline-flex rounded-[3px] bg-[#FBE6D6] px-4 py-2 text-[11px] font-medium text-[#6E3E17]">
            Please select one of the following:
          </div>

          <form onSubmit={onSubmit} className="space-y-4">
            <select
              value={target}
              onChange={e => setTarget(e.target.value as Target)}
              className="h-9 w-full rounded-[2px] border border-black/15 bg-white px-3 text-[12px] text-[#2B3A4A] outline-none focus:border-[#0B8B4B]"
            >
              {options.map(o => (
                <option key={o.value} value={o.value}>
                  {o.label}
                </option>
              ))}
            </select>

            {isCustom && (
              <div className="space-y-2">
                <div className="text-[11px] text-[#6F8093]">Custom Numbers</div>
                <input
                  value={customNumbers}
                  onChange={e => setCustomNumbers(e.target.value)}
                  placeholder="Example: 01700000000,01800000000,01600000000"
                  className="h-9 w-full rounded-[2px] border border-black/15 bg-white px-3 text-[12px] text-[#2B3A4A] outline-none focus:border-[#0B8B4B]"
                />
              </div>
            )}

            <div className="space-y-2">
              <div className="text-[11px] text-[#6F8093]">Message</div>
              <textarea
                value={message}
                onChange={e => setMessage(e.target.value)}
                className="min-h-[110px] w-full resize-none rounded-[2px] border border-black/15 bg-white px-3 py-2 text-[12px] text-[#2B3A4A] outline-none focus:border-[#0B8B4B]"
              />
            </div>

            <div className="rounded-[3px] bg-[#FBE6D6] px-4 py-2 text-center text-[10px] font-semibold tracking-wide text-[#6E3E17]">
              ONLY BANGLA TEXT WILL WORK FOR PROMOTIONAL SMS
            </div>

            <div className="pt-1">
              <PrimaryButton type="submit" disabled={sending}>
                {sending ? 'Sending...' : 'Send'}
              </PrimaryButton>
            </div>

            {toast && (
              <div
                className={cx(
                  'mt-2 text-[12px]',
                  toast.type === 'ok' ? 'text-[#2D8A2D]' : 'text-[#D64242]'
                )}
              >
                {toast.text}
              </div>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
