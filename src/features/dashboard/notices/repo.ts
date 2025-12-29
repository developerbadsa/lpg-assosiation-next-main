import type { NoticeAttachment, NoticeDetails, NoticeRow } from './types';

const LARAVEL_ORIGIN =
  process.env.NEXT_PUBLIC_LARAVEL_ORIGIN ?? 'https://admin.petroleumstationbd.com';

function toAbsoluteUrl(pathOrUrl: string | null | undefined) {
  if (!pathOrUrl) return '';
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const p = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${LARAVEL_ORIGIN}${p}`;
}

async function readJsonOrThrow(res: Response) {
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? 'Request failed');
  return data;
}

function normalizeList(raw: any) {
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw?.data)) return raw.data;
  return [];
}

function pickDate(v?: string | null) {
  if (!v) return '';
  const s = String(v);
  const m = s.match(/^(\d{4}-\d{2}-\d{2})/);
  return m ? m[1] : s;
}

/**
 * Supports:
 * - Your actual details response:
 *   attachments: [{ file_url, original_name, file_type, file_size, id }]
 * - fallback old shapes (strings / url/path)
 */
function normalizeAttachments(raw: any): NoticeAttachment[] {
  if (!raw) return [];

  // Best case: objects like your response
  if (Array.isArray(raw) && raw.length && typeof raw[0] === 'object') {
    return raw
      .map((a: any, i: number) => {
        const fileUrl = a?.file_url ?? a?.url ?? a?.path ?? a?.file ?? '';
        if (!fileUrl) return null;

        const name =
          a?.original_name ??
          a?.name ??
          `Attachment ${i + 1}`;

        return {
          id: a?.id ?? `${i + 1}`,
          name: String(name),
          url: toAbsoluteUrl(String(fileUrl)),
          fileType: a?.file_type ?? null,
          fileSize: typeof a?.file_size === 'number' ? a.file_size : null,
        } satisfies NoticeAttachment;
      })
      .filter(Boolean) as NoticeAttachment[];
  }

  // String array fallback: ["path1", "path2"]
  if (Array.isArray(raw) && raw.every((x) => typeof x === 'string')) {
    return raw.map((p: string, i: number) => ({
      id: `${i + 1}`,
      name: `Attachment ${i + 1}`,
      url: toAbsoluteUrl(p),
      fileType: null,
      fileSize: null,
    }));
  }

  // {data:[...]} fallback
  if (Array.isArray(raw?.data)) return normalizeAttachments(raw.data);

  return [];
}

export type CreateNoticeInput = {
  title: string;
  content: string;
  audience: string;
  publishDate?: string;
  attachments: File[];
};

export const noticesRepo = {
  async list(): Promise<NoticeRow[]> {
    const res = await fetch('/api/notices', { cache: 'no-store' });
    const raw = await readJsonOrThrow(res);
    const list = normalizeList(raw);

    return list.map((n: any, idx: number) => ({
      id: String(n.id),
      sl: idx + 1,
      title: n.title ?? '',
      publishDate: pickDate(n.publish_date ?? n.created_at ?? ''),
    }));
  },

  async getDetails(id: string): Promise<NoticeDetails> {
    const res = await fetch(`/api/notices/${encodeURIComponent(id)}`, {
      cache: 'no-store',
    });
    const raw = await readJsonOrThrow(res);

    // your API returns the object directly (not {data:...})
    const n = (raw?.data ?? raw) as any;

    return {
      id: String(n.id),
      title: n.title ?? '',
      slug: n.slug ?? '',
      content: n.content ?? '',
      publishDate: pickDate(n.publish_date ?? n.created_at ?? ''),
      isActive: typeof n.is_active === 'boolean' ? n.is_active : Boolean(n.is_active),
      displayOrder: typeof n.display_order === 'number' ? n.display_order : Number(n.display_order ?? 0),
      attachments: normalizeAttachments(n.attachments),
    };
  },

  async create(input: CreateNoticeInput) {
    const fd = new FormData();
    fd.set('title', input.title);
    fd.set('content', input.content);
    fd.set('audience', input.audience);

    if (input.publishDate) fd.set('publish_date', input.publishDate);

    for (const f of input.attachments) {
      // Laravel expects attachments[]
      fd.append('attachments[]', f);
    }

    const res = await fetch('/api/notices', { method: 'POST', body: fd });
    return readJsonOrThrow(res);
  },

  async remove(id: string): Promise<void> {
    const res = await fetch(`/api/notices/${encodeURIComponent(id)}`, {
      method: 'DELETE',
    });
    await readJsonOrThrow(res);
  },
};
