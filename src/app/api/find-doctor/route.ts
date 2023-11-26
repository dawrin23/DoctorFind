import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET(request: Request, res: Response) {


  const doctorFound = await prisma.userDoctor.findMany();

  if (!doctorFound) {
    return NextResponse.json(
      {
        message: "No hay doctores registrados",
      },
      {
        status: 404,
      }
    );
  } else {
    return NextResponse.json({
      // message: 'Doctor found',
      doctorFound,
    });
  }
}
