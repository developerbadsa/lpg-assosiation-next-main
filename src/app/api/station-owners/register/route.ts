import { NextResponse } from 'next/server';
import { laravelFetch, LaravelHttpError } from '@/lib/http/laravelFetch';

export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
  try {
    const body = (await req.json().catch(() => null)) as
      | {
          stationOwnerName: string;
          email: string;
          phone: string;
          password: string;
          confirmPassword: string;
          residentialAddress: string;
        }
      | null;

    if (!body) return NextResponse.json({ message: 'Invalid JSON body' }, { status: 400 });

    // 1) create user (public)
    const reg = await laravelFetch<any>('/register', {
      method: 'POST',
      auth: false,
      body: JSON.stringify({
        full_name: body.stationOwnerName,
        email: body.email,
        phone_number: body.phone,
        password: body.password,
        password_confirmation: body.confirmPassword,
      }),
    });

    const userId = reg?.user?.id;
    if (!userId) return NextResponse.json({ message: 'Register succeeded but user id missing' }, { status: 500 });

    // 2) create station owner record (admin auth)
    const owner = await laravelFetch<any>('/station-owners', {
      method: 'POST',
      auth: true,
      body: JSON.stringify({
        user_id: userId,
        address: body.residentialAddress,
      }),
    });

    return NextResponse.json({ id: owner?.id ?? userId, owner }, { status: 201 });
  } catch (e) {
    if (e instanceof LaravelHttpError) {
      // IMPORTANT: 422 like "email taken" must return 422 (not 500)
      return NextResponse.json({ message: e.message, errors: e.errors ?? null }, { status: e.status });
    }
    console.error(e);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
