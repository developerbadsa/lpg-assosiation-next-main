import type { CommitteeApiItem, CommitteeRow } from './types';

const LARAVEL_ORIGIN =
  process.env.NEXT_PUBLIC_LARAVEL_ORIGIN ?? 'https://admin.petroleumstationbd.com';

function toAbsoluteUrl(pathOrUrl: string | null | undefined) {
  if (!pathOrUrl) return null;
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;
  const p = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
  return `${LARAVEL_ORIGIN}${p}`;
}

function fallbackAvatar(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(
    name
  )}&size=128&background=E2E8F0&color=0F172A`;
}

function normalizeList(raw: any): CommitteeApiItem[] {
  if (Array.isArray(raw)) return raw as CommitteeApiItem[];
  if (Array.isArray(raw?.data)) return raw.data as CommitteeApiItem[];
  return [];
}

async function readJsonOrThrow(res: Response) {
  const data = await res.json().catch(() => null);
  if (!res.ok) throw new Error(data?.message ?? 'Request failed');
  return data;
}

export const committeeRepo = {
  async list(): Promise<CommitteeRow[]> {
    const res = await fetch('/api/central-committees', { cache: 'no-store' });
    const raw = await readJsonOrThrow(res);
    const list = normalizeList(raw);

    return list.map((m) => {
      const profileImageUrl = toAbsoluteUrl(m.profile_image);
      return {
        id: m.id,

        fullName: m.full_name,
        designation: m.designation,
        companyName: m.company_name,

        positionName: m.position_name,
        positionSlug: m.position_slug,
        positionOrder: Number(m.position_order),

        isActive: Boolean(m.is_active),

        profileImageUrl,
        avatarUrl: profileImageUrl ?? fallbackAvatar(m.full_name),

        facebookUrl: m.facebook_url ?? null,
        linkedinUrl: m.linkedin_url ?? null,
        whatsappUrl: m.whatsapp_url ?? null,
      };
    });
  },

  async remove(id: number): Promise<void> {
    const res = await fetch(`/api/central-committees/${id}`, { method: 'DELETE' });
    await readJsonOrThrow(res);
  },
};
