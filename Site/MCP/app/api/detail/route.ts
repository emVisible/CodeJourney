import { NextResponse } from "next/server";
import prisma from "@/prisma/prisma";

export async function POST(request: Request) {
  try {
    const { repo } = await request.json();
    const rawData = await prisma.mCP_Repo.findUnique({
      where: { repo },
      include: {
        readme: true
      },
    });

    if (!rawData) return NextResponse.json({ error: "Repo not found in database" }, { status: 404 });

    return NextResponse.json(rawData);

  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
