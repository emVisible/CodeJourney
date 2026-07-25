import { NextResponse } from 'next/server';
import prisma from '@/prisma/prisma';
import { MCP_Repo } from '@prisma/client';

export async function POST(request: Request) {
  try {
    let orderByClause = {};
    let res: MCP_Repo[] = []
    const { type } = await request.json();

    if (type === 'featured') {
      orderByClause = { star: 'desc' };
    } else if (type === 'latest') {
      orderByClause = { update: 'desc' };
    } else {
      return NextResponse.json({ error: 'Invalid type' }, { status: 400 });
    }

    res = await prisma.mCP_Repo.findMany({
      orderBy: orderByClause,
      take: 8,
    });
    return NextResponse.json(res);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
