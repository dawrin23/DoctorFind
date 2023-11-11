import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma";
import { Prisma } from "@prisma/client";

interface Params {
  params: { id: string };
}

export async function GET(request: Request, { params }: Params) {
  //buscar el otp y el usuario
  
}

export async function DELETE(request: Request, { params }: Params) {
  try {
    const deleteOtp = await prisma.otp.delete({
      where: {
        authorId: Number(params.id),
      },
    });

    if (!deleteOtp) {
      return NextResponse.json(
        {
          message: "Otp not found",
        },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(deleteOtp);
  } catch (error) {
    console.log(error);
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "Otp not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { password, confirmPassword } = await request.json();

    const updatepassword = await prisma.user.update({
      where: {
        id: Number(params.id),
      },
      data: {
        password,
      },
    });

    return NextResponse.json(
      {
        message: "Password correctly updated",
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      if (error.code === "P2025") {
        return NextResponse.json(
          {
            message: "User not found",
          },
          {
            status: 404,
          }
        );
      }

      return NextResponse.json(
        {
          message: error.message,
        },
        {
          status: 500,
        }
      );
    }
  }
}
