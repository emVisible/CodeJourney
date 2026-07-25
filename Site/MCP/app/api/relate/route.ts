import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import { MCP_Repo } from '@prisma/client';

export async function POST(request: Request) {
  try {
    let res: MCP_Repo[] = []
    const { search } = await request.json();
    res = await prisma.$queryRaw`
        SELECT * FROM "MCP_Repo"
        WHERE to_tsvector('english', "desc") @@ to_tsquery('english', ${search})
        ORDER BY ts_rank(to_tsvector('english', "desc"), to_tsquery('english', ${search})) DESC
        LIMIT 4;
      `;
    return NextResponse.json(res)
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
