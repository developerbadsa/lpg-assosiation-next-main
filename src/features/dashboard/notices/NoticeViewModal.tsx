'use client';

import Modal from '@/components/ui/modal/Modal';
import Loader from '@/components/shared/Loader';
import { useNoticeDetails } from './queries';

function cx(...v: Array<string | false | null | undefined>) {
  return v.filter(Boolean).join(' ');
}

function isImageFile(a: { fileType?: string | null; url: string }) {
  const t = (a.fileType ?? '').toLowerCase();
  if (t) return ['jpg', 'jpeg', 'png', 'webp', 'gif', 'svg'].includes(t);

  const u = a.url.toLowerCase();
  return /\.(jpg|jpeg|png|webp|gif|svg)(\?|#|$)/.test(u);
}

function fmtBytes(n?: number | null) {
  if (!n || n <= 0) return '';
  const kb = n / 1024;
  if (kb < 1024) return `${kb.toFixed(0)} KB`;
  const mb = kb / 1024;
  return `${mb.toFixed(1)} MB`;
}

export default function NoticeDetailsModal({
  open,
  noticeId,
  onClose,
}: {
  open: boolean;
  noticeId: string | null;
  onClose: () => void;
}) {
  const q = useNoticeDetails(noticeId, open);

  return (
    <Modal
      open={open}
      title="Notice Details"
      onClose={onClose}
      maxWidthClassName="max-w-[920px]"
    >
      <div className="p-5">
        {q.isLoading ? <Loader label="Loading..." size="sm" /> : null}

        {q.isError ? (
          <div className="rounded-[8px] border border-red-200 bg-red-50 p-3 text-[12px] text-red-700">
            {(q.error as Error)?.message ?? 'Failed to load notice details.'}
          </div>
        ) : null}

        {q.data && !q.isLoading && !q.isError ? (
          <div className="space-y-4">
            {/* Header */}
            <div>
              <div className="text-[12px] font-semibold text-[#0F172A]">
                {q.data.title}
              </div>

              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-[#64748B]">
                <span>Publish Date: {q.data.publishDate || '—'}</span>
                <span>Status: {q.data.isActive ? 'Active' : 'Inactive'}</span>
                <span>Order: {Number.isFinite(q.data.displayOrder) ? q.data.displayOrder : '—'}</span>
              </div>

              {q.data.slug ? (
                <div className="mt-1 text-[11px] text-[#64748B]">
                  Slug: <span className="text-[#0F172A]">{q.data.slug}</span>
                </div>
              ) : null}
            </div>

            {/* Content */}
            <div className="rounded-[8px] border border-black/10 bg-[#F8FAFC] p-3">
              <div className="text-[11px] font-semibold text-[#334155]">Content</div>
              <p className="mt-1 whitespace-pre-wrap text-[12px] leading-relaxed text-[#0F172A]">
                {q.data.content || '—'}
              </p>
            </div>

            {/* Attachments */}
            <div>
              <div className="text-[11px] font-semibold text-[#334155]">Attachments</div>

              {q.data.attachments.length === 0 ? (
                <div className="mt-1 text-[12px] text-[#64748B]">No attachments.</div>
              ) : (
                <div className="mt-2 space-y-2">
                  {q.data.attachments.map((a, idx) => {
                    const preview = isImageFile(a);

                    return (
                      <div
                        key={`${a.url}-${idx}`}
                        className="flex items-center justify-between gap-3 rounded-[8px] border border-black/10 bg-white px-3 py-2"
                      >
                        <div className="flex min-w-0 items-center gap-3">
                          {preview ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={a.url}
                              alt={a.name}
                              className="h-10 w-10 shrink-0 rounded-[6px] object-cover ring-1 ring-black/10"
                              loading="lazy"
                            />
                          ) : (
                            <div className="grid h-10 w-10 shrink-0 place-items-center rounded-[6px] bg-black/5 text-[10px] text-[#64748B] ring-1 ring-black/10">
                              FILE
                            </div>
                          )}

                          <div className="min-w-0">
                            <div className="truncate text-[12px] text-[#0F172A]">{a.name}</div>
                            <div className="truncate text-[10px] text-[#64748B]">
                              {fmtBytes(a.fileSize) ? `${fmtBytes(a.fileSize)} • ` : ''}
                              {a.url}
                            </div>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <a
                            href={a.url}
                            target="_blank"
                            rel="noreferrer"
                            className={cx(
                              'inline-flex h-7 items-center justify-center rounded-[6px] px-3 text-[11px] font-semibold',
                              'bg-[#12306B] text-white hover:brightness-110'
                            )}
                          >
                            Open
                          </a>

                          <a
                            href={a.url}
                            download
                            className={cx(
                              'inline-flex h-7 items-center justify-center rounded-[6px] px-3 text-[11px] font-semibold',
                              'bg-[#009970] text-white hover:brightness-110'
                            )}
                          >
                            Download
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </Modal>
  );
}
