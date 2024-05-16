export const dynamic = 'force-dynamic' // defaults to auto

import { NextResponse, NextRequest} from 'next/server';

export async function GET(request: NextRequest) {
    const page = request.nextUrl.searchParams.get('page') || 1;
    const size = request.nextUrl.searchParams.get('size') || 5;
    const sort = request.nextUrl.searchParams.get('sort') || "lastupdated";
    const order = request.nextUrl.searchParams.get('order') || "desc";

    const text = request.nextUrl.searchParams.get('text') || '';

    const data = await fetch(`${process.env.API_URL}/posts/search?text=${text}&page=${page}&size=${size}&sort=${sort}&order=${order}`, { cache: 'no-store' });
    const json = await data.json();
    if (!data.ok) {
      return NextResponse.json({ error: "Some thing went wrong" }, { status: data.status });
    }
    return NextResponse.json(json);
}
 