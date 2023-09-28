import { NextResponse, NextRequest } from "next/server";
import { prisma } from "@/libs/prisma";

export async function GET(request: NextRequest) {
  try {
    const users = await prisma.user.findMany();
    return NextResponse.json({ users }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Algo ocurrio mal", error },
      {
        status: 400,
      }
    );
  }
}
