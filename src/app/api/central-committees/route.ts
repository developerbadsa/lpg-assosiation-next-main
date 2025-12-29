import { NextResponse } from 'next/server';
import { laravelFetch, LaravelHttpError } from '@/lib/http/laravelFetch';

export async function GET() {
  try {
    const data = await laravelFetch('/central-committees', { method: 'GET', auth: true });
    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    if (e instanceof LaravelHttpError) {
      return NextResponse.json(
        { message: e.message, errors: e.errors ?? null },
        { status: e.status }
      );
    }
    return NextResponse.json({ message: 'Failed to load committees' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const form = await req.formData();

    const data = await laravelFetch('/central-committees', {
      method: 'POST',
      auth: true,
      body: form,
    });

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    if (e instanceof LaravelHttpError) {
      return NextResponse.json(
        { message: e.message, errors: e.errors ?? null },
        { status: e.status }
      );
    }
    return NextResponse.json({ message: 'Failed to create committee' }, { status: 500 });
  }
}
