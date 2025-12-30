import { NextResponse, type NextRequest } from 'next/server';
import { laravelFetch } from '@/lib/http/laravelFetch';

type Ctx = { params: Promise<{ id: string }> };

export async function DELETE(_req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  const data = await laravelFetch<any>(`/gas-stations/${id}`, {
    method: 'DELETE',
    auth: true,
  });

  return NextResponse.json(data ?? { ok: true });
}

export async function PUT(req: NextRequest, ctx: Ctx) {
  const { id } = await ctx.params;

  const body = await req.json().catch(() => null);
  if (!body) return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });

  // Laravel-compatible update (POST + _method=PUT)
  const data = await laravelFetch<any>(`/gas-stations/${id}?_method=PUT`, {
    method: 'POST',
    auth: true,
    body: JSON.stringify(body),
  });

  return NextResponse.json(data);
}
