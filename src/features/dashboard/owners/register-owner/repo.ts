import type { RegisterOwnerInput, RegisterOwnerResult } from './types';

async function readJsonOrThrow(res: Response) {
  const data = await res.json().catch(() => null);
  if (!res.ok) {
    const msg =
      data?.message ||
      (data?.errors ? Object.values(data.errors).flat().join(' ') : null) ||
      res.statusText ||
      'Request failed';
    throw new Error(msg);
  }
  return data;
}

export async function registerOwnerRepo(input: RegisterOwnerInput): Promise<RegisterOwnerResult> {
  const res = await fetch('/api/station-owners/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(input),
  });

  const data = await readJsonOrThrow(res);

  const ownerId =
    data?.station_owner?.id ?? data?.station_owner?.data?.id ?? data?.station_owner?.station_owner?.id;

  return { id: String(ownerId ?? data?.user?.id ?? '') };
}
