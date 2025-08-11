import { NextResponse } from 'next/server';
import { createClient } from 'microcms-js-sdk';

export async function GET() {
  const serviceDomain = process.env.MICROCMS_SERVICE_DOMAIN;
  const apiKey = process.env.MICROCMS_API_KEY;

  const envOk = Boolean(serviceDomain) && Boolean(apiKey);

  let connection: 'ok' | 'ng' | 'skipped' = 'skipped';
  let totalCount: number | null = null;
  let message: string | null = null;

  if (envOk) {
    try {
      const client = createClient({ serviceDomain: serviceDomain as string, apiKey: apiKey as string });
      const res = await client.getList({ endpoint: 'blogs', queries: { limit: 1 } });
      connection = 'ok';
      totalCount = res.totalCount ?? null;
    } catch (e: any) {
      connection = 'ng';
      message = e?.message || 'unknown error';
    }
  }

  return NextResponse.json({
    env: {
      MICROCMS_SERVICE_DOMAIN: Boolean(serviceDomain),
      MICROCMS_API_KEY: Boolean(apiKey),
    },
    connection,
    totalCount,
    message,
  });
}


